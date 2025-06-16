const barra_vida = document.querySelector('.vida')
const barra_vida_fora = document.querySelector('.vidaLimite')
const barra_vida_tamanho = +window.getComputedStyle(barra_vida_fora).width.split('px')[0];
const tela_Morte = document.querySelector('.tela_de_morte')
const contagem_morte = document.getElementById('morte_contagem')
var vivo = true
let contagem = 10;

player_vida_maximo = player_vida

// Ataque

setInterval(() => {
    zumbisArray.forEach((zumbi) => {
        let area_player = player.getBoundingClientRect();
        let area_zumbi = zumbi.getBoundingClientRect();

        if (player_vida >= 0 &&
            area_player.left <= area_zumbi.right &&
            area_player.right >= area_zumbi.left &&
            area_player.top <= area_zumbi.bottom &&
            area_player.bottom >= area_zumbi.top) {

            player_vida -= primeiro_zumbi_dano
            audio_player_dano.play()
        }

        barra_vida.style.width = `${(player_vida * 100) / player_vida_maximo}%`
    })

    if (player_vida <= 0) {
        vivo = false

        tela_Morte.style.display = 'block'

        setTimeout(() => {
            contagem_morte.innerText = `voltando para o menu em: ${contagem}`

            tela_Morte.style.opacity = '100%'

            setInterval(() => {
                if (contagem === 0) {
                    window.location.assign('../index.html');
                }

                contagem--

                contagem_morte.innerText = `voltando para o menu em: ${contagem}`

            }, 1000)
        }, 100)
    }
}, primeiro_zumbi_ataque)
