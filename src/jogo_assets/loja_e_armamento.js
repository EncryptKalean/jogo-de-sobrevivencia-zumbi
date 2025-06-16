const loja_icone = document.querySelector('.lojaIcone');
const loja = document.querySelector('.lojaBackground');
const abas = document.querySelectorAll('.aba');
const armas_aba = document.querySelector('.pagina_armas');
const municoes_aba = document.querySelector('.pagina_municoes');
const melhorias_aba = document.querySelector('.pagina_melhorias');
const categorias_loja = document.querySelector('.categorias_loja');
const paginasArray = document.querySelectorAll('.paginas')
const municao_texto = document.getElementById('municao_atual')
const municao_max_texto = document.getElementById('municao_max')

var cartucho = 10

var arma_equipada = 'pistola'

const pontos_obj = document.querySelector('.pontuacao')

var dano_arma = 1

var pode_atirar = false


// ARMAS

const armas_dano = {
    pistola_dano: 1,
    fuzil_dano: 0.5,
    desert_eagle_dano: 1.5,
    shotgun_dano: 2.5,
}

const armas_cartucho = {
    pistola_cartucho: 10,
    fuzil_cartucho: 20,
    desert_eagle_cartucho: 10,
    shotgun_cartucho: 7,
}

var armas_maximo = {
    pistola_maximo: 50,
    fuzil_maximo: 100,
    desert_eagle_maximo: 50,
    shotgun_maximo: 28,
}

const armas_fireRate = {
    fuzil_fireRate: 250,
    shotgun_fireRate: 400,
}

const preco_arma = {
    preco_fuzil: 100,
    preco_pistola: 30,
    preco_desert_eagle: 70,
    preco_shotgun: 130,
}

const preco_municao = {
    preco_fuzil: 30,
    preco_pistola: 10,
    preco_desert_eagle: 20,
    preco_shotgun: 30,
}

// MELHORIAS

var preco_melhoria = {
    preco_vida_maxima: 100,
    preco_vida: 20,
    preco_mais_pontos: 200
}

const melhorias = {
    vida_maxima: "player_vida_maximo += player_vida_maximo * 0.10;     barra_vida_fora.style.width = `${+window.getComputedStyle(barra_vida_fora).width.split('px')[0] * 1.05}px`",
    vida_maxima_aumento_preco: 50,

    vida: "player_vida += player_vida_maximo * 0.25",
    vida_aumento_preco: 10,

    mais_pontos: "primeiro_zumbi_valor += primeiro_zumbi_valor * 0.2",
    mais_pontos_aumento_preco: 100
}

const Regeneracao = 10

const melhorias_descricao = {
    vida_maxima: 'Aumenta sua vida maxima em 10%',
    vida: `Regenera ${Regeneracao}% da sua vida maxima`,
    mais_pontos: `20% mais pontos`
}


var stock;
var arma_fireRate;
var categoria;
let myInterval;


// Modo de disparo que se molda de acordo com a arma escolhida (Só com armas automaticas)

function tiroAlternado(arma) {
    const cartuchoAtual = armas_cartucho[`${arma}_cartucho`]
    const audioDisparo = eval(`audio_${arma}_disparo`)
    const audioReload = eval(`audio_${arma}_reload`)
    const audioDuration = parseInt(audioReload.duration) * 1000

    myInterval = setInterval(() => {
        if (pode_atirar && cartucho > 0) {
            if (teclas["Enter"] || teclas[" "]) {
                console.log('automatico Tiro')

                const div = document.createElement('div')
                div.classList.add('tiro')

                document.body.appendChild(div).style.rotate = `${player_rotate}deg`
                audioDisparo.currentTime = 0.15
                audioDisparo.play()

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
        if (teclas['r'] && cartucho <= 0 && stock > 0) {
            console.log('automatico reload')
            audioReload.currentTime = 0.2
            audioReload.play()
            setTimeout(() => {
                cartucho = cartuchoAtual
                armas_maximo[`${arma}_maximo`] -= cartuchoAtual
                stock = armas_maximo[`${arma}_maximo`]
            }, audioDuration)
        }

        municao_texto.textContent = cartucho
        municao_max_texto.textContent = stock

    }, arma_fireRate)
}

// Tiro de armas semi-automaticas

document.addEventListener('keyup', (tecla) => {
    // Remove animação
    player.style.background = `url('jogo_assets/assets/player/player_parado_${arma_equipada}.webp') center / contain no-repeat`

    player_height = +window.getComputedStyle(player).height.split('px')[0];

    const div = document.createElement('div')
    div.classList.add('tiro')

    let tecla_solta = tecla.key

    // Limpa o teclas[]

    if (teclas[tecla_solta]) {
        delete teclas[tecla_solta]
    }

    // Pistola

    player_rotate = +window.getComputedStyle(player).rotate.split('deg')[0];

    
    if (arma_equipada == 'pistola' || arma_equipada == 'desert_eagle') {
        const audioDisparo = eval(`audio_${arma_equipada}_disparo`)

        if (cartucho > 0 && pode_atirar) {
            dano_arma = armas_dano[`${arma_equipada}_dano`]
            
            if (tecla_solta === "Enter" || tecla_solta === " ") {
                
                document.body.appendChild(div).style.rotate = `${player_rotate}deg`
                audioDisparo.currentTime = 0.1
                audioDisparo.play()
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
    }
    

    // Recarregar
    if (arma_equipada === 'pistola' || arma_equipada === 'desert_eagle') {
        const audioReload = eval(`audio_${arma_equipada}_reload`)

        if (tecla_solta === 'r' && cartucho <= 0 && armas_maximo[`${arma_equipada}_maximo`] > 0) {
            audioReload.play()
            setTimeout(() => {
                cartucho = armas_cartucho[`${arma_equipada}_cartucho`]
                armas_maximo[`${arma_equipada}_maximo`] -= armas_cartucho[`${arma_equipada}_cartucho`]
                municao_texto.textContent = armas_cartucho[`${arma_equipada}_cartucho`]
            }, parseInt(audio_pistola_reload.duration) * 1000)
        }

        municao_max_texto.textContent = armas_maximo[`${arma_equipada}_maximo`]
        municao_texto.textContent = cartucho
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
                tiro_top < 0) {
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


// Abre/fecha a loja ao apertar no icone

loja_icone.addEventListener('click', () => {
    const right = window.getComputedStyle(loja).right.split('px')[0]
    if (right < 0) {
        loja.style.right = '0'
    }
    else { loja.style.right = '-50%' }
})


// Muda a categoria da loja de acordo com a aba

categorias_loja.addEventListener('click', (click) => {
    const aba = click.target.closest('.aba')

    if (!aba.classList.contains('selecionado')) {
        abas.forEach((aba) => {
            aba.classList.remove('selecionado')
        })
        aba.classList.add('selecionado')
    }

    categoria = aba.getAttribute('tipo')

    paginasArray.forEach((pag) => {
        pag.style.display = 'none'
    })

    document.querySelector(`.pagina_${categoria}`).style.display = 'block'
})


// Funções da aba de armas

armas_aba.addEventListener('click', (click) => {
    const arma = click.target.closest('.arma-container').getAttribute('arma');
    const preco = click.target.closest('.arma-container').getAttribute('preco');

    if (pontuacao >= preco) {

        function tamanhoSprite(tipo) {

            const tamanho = {
                pistola: 100,
                fuzil: 130,
                desert_eagle: 100,
                shotgun: 130,
            }

            return tamanho[tipo]
        }

        player.style.width = `${tamanhoSprite(arma)}px`

        arma_equipada = arma
        dano_arma = armas_dano[`${arma}_dano`]
        cartucho = armas_cartucho[`${arma}_cartucho`]
        stock = armas_maximo[`${arma}_maximo`]
        arma_fireRate = armas_fireRate[`${arma}_fireRate`]

        pontuacao -= preco

        clearInterval(myInterval)
        player.style.background = `url('jogo_assets/assets/player/player_parado_${arma_equipada}.webp') center / contain no-repeat`
        audio_loja.play()

        if (arma != 'pistola' && arma != 'desert_eagle') {
            tiroAlternado(arma)
        }
    }

    else {
        audio_erro.play()
    }

    pontos_obj.textContent = `Pontos: ${pontuacao}`
})


// Funções da aba de munições

municoes_aba.addEventListener('click', (click) => {
    const municao = click.target.closest('.municao-container').getAttribute('municao');
    const preco = click.target.closest('.municao-container').getAttribute('preco');

    if (pontuacao >= preco) {
        armas_maximo[`${municao}_maximo`] += armas_cartucho[`${municao}_cartucho`]

        pontuacao -= preco

        audio_loja.play()

    }
    else {
        audio_erro.play()
    }

    municao_max_texto.textContent = armas_maximo[`${municao}_maximo`]
    pontos_obj.textContent = `Pontos: ${pontuacao}`
})


// Funções da aba de melhorias

melhorias_aba.addEventListener('click', (click) => {
    const melhoria = click.target.closest('.melhoria-container').getAttribute('melhoria');
    const preco = click.target.closest('.melhoria-container').getAttribute('preco');

    if (pontuacao >= preco) {
        if (melhoria === 'vida' && player_vida >= player_vida_maximo - player_vida_maximo * `0.${Regeneracao}`) {
            audio_erro.play()
        }
        else {
            pontuacao -= preco

            eval(melhorias[melhoria])

            preco_melhoria[`preco_${melhoria}`] += melhorias[`${melhoria}_aumento_preco`]

            carregandoLoja()

            audio_loja.play()
        }
    }
    else {
        audio_erro.play()
    }

    pontos_obj.textContent = `Pontos: ${pontuacao}`
})


// Registro das armas na loja
carregandoLoja()
function carregandoLoja() {
    const precosArmaArray = document.querySelectorAll('.pagina_armas .preco')
    const precosMunicaoArray = document.querySelectorAll('.pagina_municoes .preco')
    const precosMelhoriaArray = document.querySelectorAll('.pagina_melhorias .preco')

    precosArmaArray.forEach((el) => {
        const div = el.closest('.arma-container');
        const arma = el.closest('.arma-container').getAttribute('arma');
        el.closest('.arma-container').setAttribute('preco', preco_arma[`preco_${arma}`]);
        const preco = el.closest('.arma-container').getAttribute('preco');
        el.textContent = `$${preco}`;
        div.querySelector('.nome').textContent = arma
        div.querySelector('.dano').textContent = `dano: ${armas_dano[`${arma}_dano`]}`
        div.querySelector('.cartucho').textContent = `cartucho: ${armas_cartucho[`${arma}_cartucho`]}`
    })

    precosMunicaoArray.forEach((el) => {
        const div = el.closest('.municao-container');
        const municao = el.closest('.municao-container').getAttribute('municao');
        el.closest('.municao-container').setAttribute('preco', preco_municao[`preco_${municao}`]);
        const preco = el.closest('.municao-container').getAttribute('preco');
        el.textContent = `$${preco}`;
        div.querySelector('.nome').textContent = `munição de ${municao}`
        div.querySelector('.quantidade').textContent = `quantidade: ${armas_cartucho[`${municao}_cartucho`]}`
    })

    precosMelhoriaArray.forEach((el) => {
        const div = el.closest('.melhoria-container');
        const melhoria = el.closest('.melhoria-container').getAttribute('melhoria');
        el.closest('.melhoria-container').setAttribute('preco', preco_melhoria[`preco_${melhoria}`]);
        const preco = el.closest('.melhoria-container').getAttribute('preco');
        el.textContent = `$${preco}`;
        div.querySelector('.nome').textContent = melhorias_descricao[melhoria]
    })
}