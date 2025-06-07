const teclas = {};
const camera = document.querySelector('.camera')
document.addEventListener('keydown', (tecla) => { teclas[tecla.key] = true })


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
        player_top < limite_do_mapa - (camera.clientHeight / 2)) {
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
        player_top < limite_do_mapa &&
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

            player.classList.add('andando')
        }
    }


    /*
                Limites do mapa.
        Define até onde o player pode ir.
    */

    if (player_top <= 0) {
        player.style.top = `10px`
    }

    if (player_top >= limite_do_mapa - player_tamanho) {
        player.style.top = `${limite_do_mapa - (player_tamanho + 5)}px`
    }

    if (player_left <= 0) {
        player.style.left = `10px`
    }

    if (player_left >= limite_do_mapa - 100) {
        player.style.left = `${limite_do_mapa - 150}px`
    }
}, 90)


setInterval(() => {
    // Remove animação
    player.classList.remove('andando')
}, 1000)


// Spawn do Tiro e rotação

document.addEventListener('keyup', (tecla) => {
    player_height = +window.getComputedStyle(player).height.split('px')[0];

    const div = document.createElement('div')
    div.classList.add('tiro')

    let tecla_solta = tecla.key

    // Limpa o teclas[]

    if (teclas[tecla_solta]) {
        delete teclas[tecla_solta]
    }

    if (tecla_solta === "Enter" || tecla_solta === " ") {

        document.body.scrollTop + 1000

        document.body.appendChild(div).style.rotate = `${player_rotate}deg`

        // Esses if aqui em baixo serve para mudar o ponto em que a bala é criado. Assim sempre vai dar a impressão de que a bala sai do cano da arma

        if (player_rotate < 180 && player_rotate >= 0 || player_rotate > 270 && player_rotate < 360) {
            // Direita e Baixo
            div.style.top = `${player_top + (player_height * 0.75)}px`
            div.style.left = `${player_left + (player_height * 0.25)}px`
        }

        if (player_rotate >= 180 && player_rotate <= 270) {
            // Esquerda e Cima
            div.style.top = `${player_top + (player_height * 0.25)}px`
            div.style.left = `${player_left + (player_height * 0.75)}px`
        }
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

            if (tiro_left >= limite_do_mapa ||
                tiro_top >= limite_do_mapa ||
                tiro_left < 0 ||
                tiro_top < 0) {
                tiro.parentNode.removeChild(tiro)
            }

            // Verifica se atingiu algum zumbi

            zumbisArray.forEach((zumbi) => {
                let area = tiro.getBoundingClientRect();
                let areaE = zumbi.getBoundingClientRect();

                if (area.left < areaE.right &&
                    area.right > areaE.left &&
                    area.top < areaE.bottom &&
                    area.bottom > areaE.top) {
                    tiro.parentNode.removeChild(tiro)
                    zumbi.setAttribute('vida', zumbi.getAttribute('vida') - 1)
                }
            })
        })
    }
}, 200)