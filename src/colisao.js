let parede_left = +window.getComputedStyle(paredeV).left.split('px')[0];
let parede_altura = +window.getComputedStyle(paredeV).height.split('px')[0];

let parede_top = +window.getComputedStyle(paredeH).top.split('px')[0];
let parede_largura = +window.getComputedStyle(paredeH).width.split('px')[0];

let porta = document.querySelector('.porta')
let colidiu_com_a_porta = false

setInterval(() => {

    // Enquanto o player estiver dentro da area verde
    if (player_top < parede_altura && !colidiu_com_a_porta) {
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

        if (player_top > parede_top - 20 && player_top < parede_top + 20) {
            player.style.top = `${player_top + 30}px`
        }
    }
}, 90)


/*
        Colisão dos zumbis e Colisão do player com a porta
    Deixei o intervalo em 500ms para não pesar muito no sistema
*/

setInterval(() => {
    // Verificação da porta
    let area = player.getBoundingClientRect();
    let areaPorta = porta.getBoundingClientRect();

    if (area.left < areaPorta.right &&
        area.right > areaPorta.left &&
        area.top < areaPorta.bottom &&
        area.bottom > areaPorta.top) {
        colidiu_com_a_porta = true
    } else { colidiu_com_a_porta = false }

    // Verificação dos zumbis
    zumbisArray.forEach((zumbi) => {
        zumbi_top = +window.getComputedStyle(zumbi).top.split('px')[0];
        zumbi_left = +window.getComputedStyle(zumbi).left.split('px')[0];

        if (zumbi_top < parede_altura + 150) {
            zumbi.style.top = `${parede_altura + 50}px`
        }
    })
}, 500)