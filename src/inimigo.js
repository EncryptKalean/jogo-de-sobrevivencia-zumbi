// Predefinição do primeiro zumbi

const vezes = 3
const local = document.querySelector('.mapa')

// Spawn

let spawnados = 0
while (spawnados < vezes) {
    const zumbi = document.createElement('div')
    zumbi.classList.add('zumbi')
    zumbi.setAttribute('vida', 5)
    zumbi.style.top = `${limite_do_mapa * 0.50}px`
    zumbi.style.left = `${spawnados * 500}px`
    local.appendChild(zumbi)
    spawnados++
}

// --------------------------------

const counter = document.querySelector('.hud .contador')

var zumbisArray = document.querySelectorAll('.zumbi')
const player_tamanho = player.clientHeight

let zumbi_top = 0
let zumbi_left = 0

// Movimento

setInterval(() => {
    counter.textContent = zumbisArray.length;

    zumbisArray.forEach((zumbi) => {

        player_top = +window.getComputedStyle(player).top.split('px')[0];
        player_left = +window.getComputedStyle(player).left.split('px')[0];

        zumbi_top = +window.getComputedStyle(zumbi).top.split('px')[0];
        zumbi_left = +window.getComputedStyle(zumbi).left.split('px')[0];

        if (zumbi_top > player_top + player_tamanho) {
            // Cima
            zumbi.style.top = `${zumbi_top - velocidade_zumbi_Pixel}px`
        }

        if (zumbi_top < player_top - player_tamanho) {
            // Baixo
            zumbi.style.top = `${zumbi_top + velocidade_zumbi_Pixel}px`
        }

        if (zumbi_left < player_left - player_tamanho) {
            // Direita
            zumbi.style.left = `${zumbi_left + velocidade_zumbi_Pixel}px`
        }

        if (zumbi_left > player_left + player_tamanho) {
            // Esquerda
            zumbi.style.left = `${zumbi_left - velocidade_zumbi_Pixel}px`
        }

        if (zumbi.getAttribute('vida') <= 0) {
            zumbi.parentNode.removeChild(zumbi);
            zumbi.setAttribute('vida', 'morto');
            zumbisArray = document.querySelectorAll('.zumbi');
        }

        // Rotaciona o zumbi na direção do player

        let deltaX = zumbi_left - player_left;
        let deltaY = zumbi_top - player_top;

        let angulo = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

        zumbi.style.rotate = `${angulo}deg`
    })
}, velocidade_zumbi_Speed)