// Predefinição do primeiro zumbi

var vezes = 3
const local = document.querySelector('.mapa')
const mapa_altura = +window.getComputedStyle(mapa).height.split('px')[0];

var zumbisArray = document.querySelectorAll('.zumbi')

// Spawn

zumbisSpawn()
function zumbisSpawn() {
    let spawnados = 0
    while (spawnados < vezes) {
        let local_spawn = Math.floor(Math.random() * 4)
        const zumbi = document.createElement('div')
        zumbi.classList.add('zumbi')
        zumbi.setAttribute('vida', primeiro_zumbi_vida)
        zumbi.style.top = `${mapa_altura * 0.50}px`
        zumbi.style.left = `${((local_spawn * 200) * spawnados)}px`
        local.appendChild(zumbi)
        spawnados++
        zumbisArray = document.querySelectorAll('.zumbi')
    }
}

// --------------------------------

const counter = document.querySelector('.hud .contador')

const player_tamanho = player.clientHeight

let zumbi_top = 0
let zumbi_left = 0

// Movimento

setInterval(() => {
    counter.textContent = `Zumbis: ${zumbisArray.length}`

    zumbisArray.forEach((zumbi) => {

        player_top = +window.getComputedStyle(player).top.split('px')[0];
        player_left = +window.getComputedStyle(player).left.split('px')[0];

        zumbi_top = +window.getComputedStyle(zumbi).top.split('px')[0];
        zumbi_left = +window.getComputedStyle(zumbi).left.split('px')[0];

        if (zumbi_top > player_top + 40) {
            // Cima
            zumbi.style.top = `${zumbi_top - primeiro_zumbi_Pixel}px`
        }

        if (zumbi_top < player_top - 40) {
            // Baixo
            zumbi.style.top = `${zumbi_top + primeiro_zumbi_Pixel}px`
        }

        if (zumbi_left < player_left - 40) {
            // Direita
            zumbi.style.left = `${zumbi_left + primeiro_zumbi_Pixel}px`
        }

        if (zumbi_left > player_left + 40) {
            // Esquerda
            zumbi.style.left = `${zumbi_left - primeiro_zumbi_Pixel}px`
        }

        if (zumbi.getAttribute('vida') <= 0) {
            zumbi.parentNode.removeChild(zumbi);
            zumbi.setAttribute('vida', 'morto');
            zumbisArray = document.querySelectorAll('.zumbi');
            pontuacao += primeiro_zumbi_valor
        }

        // Rotaciona o zumbi na direção do player

        let deltaX = zumbi_left - player_left;
        let deltaY = zumbi_top - player_top;

        let angulo = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

        zumbi.style.rotate = `${angulo}deg`
    })
}, primeiro_zumbi_Speed)