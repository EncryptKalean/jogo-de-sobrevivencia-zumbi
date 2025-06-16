var comecou = true
const porta_abrir = document.querySelector('.porta')
var podeReiniciar = true

function reiniciar() {






    setTimeout(() => {
    }, 200)
}


// 

pausa()

function pausa() {
    vivo = false
    // "vivo = false" Serve para que o player não se mexa quando for teleportado para o inicio
    comecou = false
    
    let tempo = 15
    porta_abrir.style.rotate = '-90deg'

    camera.style.top = `0px`
    camera.style.left = `0px`
    player.style.top = `100px`
    player.style.left = `100px`

    let intervalo = setInterval(() => {
        if (tempo == 0) {

            vezes += 2
            primeiro_zumbi_vida += 1
            primeiro_zumbi_dano += 1
            primeiro_zumbi_Pixel += 2
            primeiro_zumbi_Speed -= 5
            primeiro_zumbi_ataque -= 5;
            podeReiniciar = true
            
            zumbisSpawn()
            
            comecou = true
            porta_abrir.style.rotate = '0deg'
            
            clearInterval(intervalo)
        }
        else {
            vivo = true
            tempo--

            counter.textContent = tempo
        }
    }, 1000)
}


/*
    Coisas que não precisam atualizar muito rapido
    ex: A pontuação
*/

setInterval(() => {
    // Atualização dos pontos
    pontos_obj.textContent = `Pontos: ${pontuacao}`

    // Reinicia caso o player ganhe
    if (zumbisArray.length <= 0 && podeReiniciar) {
        podeReiniciar = false
        comecou = false
        pausa()
    }

    audio_player_passos.pause()

}, 1000)