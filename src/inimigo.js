// Predefinição do primeiro inimigo

const vezes = 3
const body = document.body

// Spawn

let foi = 0
while (foi < vezes) {
    const zumbi = document.createElement('div')
    zumbi.classList.add('inimigo')
    zumbi.setAttribute('vida', 5)
    zumbi.style.top = `80%`
    zumbi.style.left = `${foi * 500}px`
    body.appendChild(zumbi)
    foi++
}

// --------------------------------

const counter = document.querySelector('.hud h1')

var enemys = document.querySelectorAll('.inimigo')
const player_tamanho = player.clientWidth

let inimigo_top = 0
let inimigo_left = 0

// Movimento

enemys.forEach((inimigo) => {
    setInterval(() => {
        enemys = document.querySelectorAll('.inimigo')
        counter.textContent = enemys.length

        player_top = +window.getComputedStyle(player).top.split('px')[0];
        player_left = +window.getComputedStyle(player).left.split('px')[0];

        inimigo_top = +window.getComputedStyle(inimigo).top.split('px')[0];
        inimigo_left = +window.getComputedStyle(inimigo).left.split('px')[0];

        if (inimigo_top > player_top + player_tamanho) {
            // Cima
            inimigo.style.top = `${inimigo_top - velocidade_inimigo_Pixel}px`
        }

        if (inimigo_top < player_top - player_tamanho) {
            // Baixo
            inimigo.style.top = `${inimigo_top + velocidade_inimigo_Pixel}px`
        }

        if (inimigo_left < player_left - player_tamanho) {
            // Direita
            inimigo.style.left = `${inimigo_left + velocidade_inimigo_Pixel}px`
        }

        if (inimigo_left > player_left + player_tamanho) {
            // Esquerda
            inimigo.style.left = `${inimigo_left - velocidade_inimigo_Pixel}px`
        }

        if (inimigo.getAttribute('vida') <= 0) {
            inimigo.parentNode.removeChild(inimigo)
            inimigo.setAttribute('vida', 'morto')
        }

    }, velocidade_inimigo_Speed)
})