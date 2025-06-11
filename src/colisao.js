let parede_left = +window.getComputedStyle(paredeV).left.split('px')[0];
let parede_altura = +window.getComputedStyle(paredeV).height.split('px')[0];

let parede_top = +window.getComputedStyle(paredeH).top.split('px')[0];
let parede_largura = +window.getComputedStyle(paredeH).width.split('px')[0];

let porta = document.querySelector('.porta')
let porta_top = +window.getComputedStyle(porta).top.split('px')[0];
let porta_left = +window.getComputedStyle(porta).left.split('px')[0];
let colidiu_com_a_porta = false

let bombero_top = +window.getComputedStyle(document.querySelector('.cenario_dois')).top.split('px')[0];
let bombero_height = +window.getComputedStyle(document.querySelector('.cenario_dois')).height.split('px')[0];

let cenario_um_left = +window.getComputedStyle(document.querySelector('.cenario_um')).left.split('px')[0];
let cenario_um_height = +window.getComputedStyle(document.querySelector('.cenario_um')).height.split('px')[0];

setInterval(() => {

    // Enquanto o player estiver dentro da area verde
    if (player_top < parede_altura) {
        if (player_left >= parede_left - 100 && player_left < parede_left) {
            player.style.left = `${player_left - 30}px`
        }

        if (player_left > parede_left - 20 && player_left < parede_left + 20) {
            player.style.left = `${player_left + 30}px`
        }
    }

    if (player_left < parede_largura && !colidiu_com_a_porta) {
        if (player_top >= parede_top - 100 && player_top < parede_top) {
            player.style.top = `${player_top - 30}px`
        }

        if (player_top > parede_top - 10 && player_top < parede_top + 25) {
            player.style.top = `${player_top + 30}px`
        }
    }

    // Verificação dos cenarios

    let recuo = bombero_top - bombero_height - 120

    if (player_top > bombero_top - bombero_height - 100) {
        player.style.top = `${recuo}px`
    }

    if (player_top < cenario_um_height &&
        player_left > cenario_um_left - 100) {
        player.style.top = `${player_top + 10}px`
        player.style.left = `${player_left - 10}px`
    }
}, 90)


/*
        Colisão dos zumbis e Colisão do player com a porta
    Deixei o intervalo alto para não pesar muito no sistema
*/

setInterval(() => {

    // Verificação da porta

    if (player_left > porta_left &&
        player_left < porta_left + 100 &&
        player_top < porta_top + 100) {
        colidiu_com_a_porta = true
    }
    else { colidiu_com_a_porta = false }

    
    // Verificação dos zumbis

    zumbisArray.forEach((zumbi) => {

        zumbi_top = +window.getComputedStyle(zumbi).top.split('px')[0];
        zumbi_left = +window.getComputedStyle(zumbi).left.split('px')[0];

        if (parede_altura > zumbi_top - 20 &&
            parede_largura > zumbi_left) {
            zumbi.style.top = `${zumbi_top + 40}px`
        }

        if (zumbi_left < parede_largura + 50 &&
            parede_altura - 10 > zumbi_top) {
            zumbi.style.left = `${zumbi_left + 40}px`
        }

    })
}, 300)