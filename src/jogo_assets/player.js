const teclas = {};
const camera = document.querySelector('.camera')
document.addEventListener('keydown', (tecla) => { teclas[tecla.key] = true })


// Movimentação e limitações

setInterval(() => {
    player_top = +window.getComputedStyle(player).top.split('px')[0];
    player_left = +window.getComputedStyle(player).left.split('px')[0];

    /*
            Movimentação do player
    Define que o personagem só se move se ele estiver dentro dos limites do mapa
    */

    if (player_top > 0 &&
        player_left > 0 &&
        player_top < mapa_Height &&
        player_left < limite_do_mapa - 100 &&
        vivo) {

        player_rotate = +window.getComputedStyle(player).rotate.split('deg')[0];

        if (teclas['w'] || teclas['ArrowUp'] || teclas['setaCima'] || teclas['cimaDireita'] || teclas['cimaEsquerda']) {
            player.style.rotate = "270deg"
            player.style.top = `${player_top - velocidade_player}px`
        }

        if (teclas['a'] || teclas['ArrowLeft'] || teclas['setaEsquerda'] || teclas['cimaEsquerda'] || teclas['baixoEsquerda']) {
            player.style.rotate = "180deg"
            player.style.left = `${player_left - velocidade_player}px`
        }
        if (teclas['s'] || teclas['ArrowDown'] || teclas['setaBaixo'] || teclas['baixoDireita'] || teclas['baixoEsquerda']) {
            player.style.rotate = "90deg"
            player.style.top = `${player_top + velocidade_player}px`
        }

        if (teclas['d'] || teclas['ArrowRight'] || teclas['setaDireita'] || teclas['cimaDireita'] || teclas['baixoDireita']) {
            player.style.rotate = "0deg"
            player.style.left = `${player_left + velocidade_player}px`
        }

        if (teclas['s'] && teclas['d'] ||
            teclas['ArrowDown'] && teclas['ArrowRight'] ||
            teclas['baixoDireita']) {

            player.style.rotate = "45deg"
        }

        if (teclas['s'] && teclas['a'] ||
            teclas['ArrowDown'] && teclas['ArrowLeft'] ||
            teclas['baixoEsquerda']) {

            player.style.rotate = "135deg"
        }

        if (teclas['w'] && teclas['d'] ||
            teclas['ArrowUp'] && teclas['ArrowRight'] ||
            teclas['cimaDireita']) {

            player.style.rotate = "315deg"
        }

        if (teclas['w'] && teclas['a'] ||
            teclas['ArrowUp'] && teclas['ArrowLeft'] ||
            teclas['cimaEsquerda']) {

            player.style.rotate = "225deg"
        }

        // Animação

        if (teclas["w"] || teclas['ArrowUp'] ||
            teclas["s"] || teclas['ArrowDown'] ||
            teclas["a"] || teclas['ArrowLeft'] ||
            teclas["d"] || teclas['ArrowRight'] ||
            teclas["setaCima"] || teclas['cimaDireita'] ||
            teclas["setaBaixo"] || teclas['cimaEsquerda'] ||
            teclas["setaEsquerda"] || teclas['baixoEsquerda'] ||
            teclas["setaDireita"] || teclas['baixoDireita']) {

            player.style.background = `url('jogo_assets/assets/player/player_andando_${arma_equipada}.webp') center / contain no-repeat`

            audio_player_passos.play()
        }
    }


    /*
        Define que a camera vai parar de seguir o player quando bater nos cantos da tela
    */

    if (player_top > (camera.clientHeight / 2) - player.clientHeight &&
        player_top < mapa_Height - (camera.clientHeight / 4) && comecou) {
        camera.style.top = `${player_top}px`
    }

    if (player_left > (camera.clientWidth / 3) &&
        player_left < limite_do_mapa - (camera.clientWidth / 1.65) && comecou) {
        camera.style.left = `${player_left}px`
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

        telhado_inicio.style.opacity = '0'
        loja_icone.style.display = 'block'
    }
    else {
        telhado_inicio.style.opacity = '1'
        loja_icone.style.display = 'none'
        loja.style.right = '-60%'
    }

    pode_atirar = comecou
}, 90)


// Camera

setInterval(() => { camera.scrollIntoView({ block: "center" }); }, 20)