const teclas = {};
const camera = document.querySelector('.camera')
document.addEventListener('keydown', (tecla) => { teclas[tecla.key] = true })

var dano_arma = 1

var municao_texto = document.getElementById('municao_atual')
var municao_max_texto = document.getElementById('municao_max')

var pode_atirar = false

// Movimentação e limitações

setInterval(() => {
    player_top = +window.getComputedStyle(player).top.split('px')[0];
    player_left = +window.getComputedStyle(player).left.split('px')[0];
    camera.scrollIntoView({ behavior: "smooth", block: "center" });

    /*
                Movimentação e delimitação da camera.
        Define até onde a camera pode seguir o player.
    */

    if (player_top > (camera.clientHeight / 2) - player.clientHeight &&
        player_top < mapa_Height - (camera.clientHeight / 2)) {
        camera.style.top = `${player_top}px`
    }

    if (player_left > (camera.clientWidth / 2) - player.clientWidth &&
        player_left < limite_do_mapa - (camera.clientWidth / 2) - player.clientWidth) {
        camera.style.left = `${player_left}px`
    }


    /*
                Movimentação do player
        Define que o personagem só se move se ele estiver dentro dos limites do mapa
    */

    if (player_top > 0 &&
        player_left > 0 &&
        player_top < mapa_Height &&
        player_left < limite_do_mapa - 100) {

        player_rotate = +window.getComputedStyle(player).rotate.split('deg')[0];

        if (teclas['w'] || teclas['ArrowUp']) {
            player.style.rotate = "270deg"
            player.style.top = `${player_top - velocidade_player}px`
        }

        if (teclas['a'] || teclas['ArrowLeft']) {
            player.style.rotate = "180deg"
            player.style.left = `${player_left - velocidade_player}px`
        }
        if (teclas['s'] || teclas['ArrowDown']) {
            player.style.rotate = "90deg"
            player.style.top = `${player_top + velocidade_player}px`
        }

        if (teclas['d'] || teclas['ArrowRight']) {
            player.style.rotate = "0deg"
            player.style.left = `${player_left + velocidade_player}px`
        }

        if (teclas['s'] && teclas['d'] ||
            teclas['ArrowDown'] && teclas['ArrowRight']) {

            player.style.rotate = "45deg"
        }

        if (teclas['s'] && teclas['a'] ||
            teclas['ArrowDown'] && teclas['ArrowLeft']) {

            player.style.rotate = "135deg"
        }

        if (teclas['w'] && teclas['d'] ||
            teclas['ArrowUp'] && teclas['ArrowRight']) {

            player.style.rotate = "315deg"
        }

        if (teclas['w'] && teclas['a'] ||
            teclas['ArrowUp'] && teclas['ArrowLeft']) {

            player.style.rotate = "225deg"
        }

        // Animação

        if (teclas["w"] || teclas['ArrowUp'] ||
            teclas["s"] || teclas['ArrowDown'] ||
            teclas["a"] || teclas['ArrowLeft'] ||
            teclas["d"] || teclas['ArrowRight']) {

            player.style.background = `url('src/assets/player_andando_${arma_equipada}.webp') center / contain no-repeat`
        }
    }


    /*
                Limites do mapa.
        Define até onde o player pode ir.
    */

    if (player_top <= 0) {
        player.style.top = `10px`
    }

    if (player_top >= mapa_Height - player_tamanho) {
        player.style.top = `${mapa_Height - (player_tamanho + 5)}px`
    }

    if (player_left <= 0) {
        player.style.left = `10px`
    }

    if (player_left >= limite_do_mapa - 100) {
        player.style.left = `${limite_do_mapa - 150}px`
    }


    /*
        Define que o player só pode atirar depois que sair da safe-zone
    */

    if (player_left <= parede_largura &&
        player_top <= parede_altura) {
        pode_atirar = false
    }
    else { pode_atirar = true }
}, 90)


// Spawn do Tiro e rotação

document.addEventListener('keyup', (tecla) => {
    // Remove animação
    player.style.background = `url('src/assets/player_parado_${arma_equipada}.webp') center / contain no-repeat`

    player_height = +window.getComputedStyle(player).height.split('px')[0];

    const div = document.createElement('div')
    div.classList.add('tiro')

    let tecla_solta = tecla.key

    // Limpa o teclas[]

    if (teclas[tecla_solta]) {
        delete teclas[tecla_solta]
    }


    // Pistola

    if (arma_equipada == 'pistola' && cartucho > 0 && pode_atirar) {
        dano_arma = armas_dano['pistola_dano']
        if (tecla_solta === "Enter" || tecla_solta === " ") {

            document.body.appendChild(div).style.rotate = `${player_rotate}deg`

            cartucho--

            // Esses ifs servem para mudar o ponto de origem da criação da bala. Assim sempre vai dar a impressão de que a bala sai do cano da arma

            if (player_rotate < 180 && player_rotate >= 0 || player_rotate > 270 && player_rotate < 360) {
                // Direita e Baixo
                div.style.top = `${player_top + (player_height * 0.75)}px`
                div.style.left = `${player_left + (player_height * 0.30)}px`
            }

            if (player_rotate >= 180 && player_rotate <= 270) {
                // Esquerda e Cima
                div.style.top = `${player_top + (player_height * 0.20)}px`
                div.style.left = `${player_left + (player_height * 0.80)}px`
            }
        }
    }


    // Recarregar
    if (arma_equipada == 'pistola') {
        if (tecla_solta === 'r' && cartucho <= 0 && armas_maximo['pistola_maximo'] > 0) {
            cartucho = armas_cartucho['pistola_cartucho']
            armas_maximo['pistola_maximo'] = armas_maximo['pistola_maximo'] - armas_cartucho['pistola_cartucho']
            municao_texto.textContent = armas_cartucho['pistola_cartucho']

        }

        municao_texto.textContent = cartucho
        municao_max_texto.textContent = armas_maximo['pistola_maximo']
    }

})


// Movimentação e limitação do tiro

setInterval(() => {
    let tiroArray = document.querySelectorAll('.tiro');

    if (tiroArray.length > 0) {
        tiroArray.forEach((tiro) => {

            let tiro_left = +window.getComputedStyle(tiro).left.split('px')[0];
            let tiro_top = +window.getComputedStyle(tiro).top.split('px')[0];
            let rotate = +window.getComputedStyle(tiro).rotate.split('deg')[0];

            if (rotate < 90 || rotate > 270) {
                tiro.style.left = `${tiro_left + velocidade_tiro}px`
                // Direita 0
            }

            if (rotate < 180 && rotate > 0) {
                tiro.style.top = `${tiro_top + velocidade_tiro}px`
                // Baixo 90
            }

            if (rotate > 90 && rotate < 270) {
                tiro.style.left = `${tiro_left - velocidade_tiro}px`
                // Esquerda 180
            }

            if (rotate > 180 && rotate < 360) {
                tiro.style.top = `${tiro_top - velocidade_tiro}px`
                // Cima 270
            }


            // Destroi ao sair do mapa

            if (tiro_left >= mapa_Width ||
                tiro_top >= mapa_Height ||
                tiro_left < 0 ||
                tiro_top < 0 ||
                tiro_left <= parede_largura &&
                tiro_top <= parede_altura) {
                tiro.parentNode.removeChild(tiro)
            }


            // Verifica se atingiu algum zumbi

            zumbisArray.forEach((zumbi) => {
                let hitBox_tiro = tiro.getBoundingClientRect();
                let hitBox_zumbi = zumbi.getBoundingClientRect();

                if (hitBox_tiro.left < hitBox_zumbi.right &&
                    hitBox_tiro.right > hitBox_zumbi.left &&
                    hitBox_tiro.top < hitBox_zumbi.bottom &&
                    hitBox_tiro.bottom > hitBox_zumbi.top) {

                    tiro.parentNode.removeChild(tiro)

                    zumbi.setAttribute('vida', zumbi.getAttribute('vida') - dano_arma)
                }
            })
        })
    }
}, 180)


/*
    Coisas que não precisam atualizar muito rapido
    ex: A pontuação
*/
setInterval(() => {

    // Atualização dos pontos
    const pontos_obj = document.querySelector('.pontuacao')

    pontos_obj.textContent = `Pontos: ${pontuacao}`

    // Reinicia caso o player morra
    if (zumbisArray.length <= 0 && podeReiniciar) {
        podeReiniciar = false
        reiniciar()
    }

}, 1000)