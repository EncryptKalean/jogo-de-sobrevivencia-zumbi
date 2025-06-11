var podeReiniciar = true

function reiniciar(){

    player.style.top = `${parede_top - 80}px`
    player.style.left = `${parede_left - 150}px`

    vezes += 2
    primeiro_zumbi_vida += 1
    primeiro_zumbi_dano += 1
    primeiro_zumbi_Pixel += 2
    primeiro_zumbi_Speed -= 5
    zumbisSpawn()
    podeReiniciar = true
}