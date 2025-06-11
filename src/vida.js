const barra_vida = document.querySelector('.vida')

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
        }

        barra_vida.style.width = `${player_vida}%`
    })

    if(player_vida <= 0){
        // window.location.reload();
    }
}, primeiro_zumbi_ataque)