// Movimentação

document.addEventListener('keydown', (tecla) => {
    player_top = +window.getComputedStyle(player).top.split('px')[0];
    player_left = +window.getComputedStyle(player).left.split('px')[0];

    if (tecla.key === "w") {
        player.style.rotate = "-90deg"
        player.style.top = `${player_top - velocidade_player}px`
    }

    else if (tecla.key === "s") {
        player.style.rotate = "90deg"
        player.style.top = `${player_top + velocidade_player}px`
    }

    if (tecla.key === "a") {
        player.style.rotate = "180deg"
        player.style.left = `${player_left - velocidade_player}px`
    }

    else if (tecla.key === "d") {
        player.style.rotate = "0deg"
        player.style.left = `${player_left + velocidade_player}px`
    }
})



// Criação do Tiro

document.addEventListener('keyup', (tecla) => {
    player_rotate = +window.getComputedStyle(player).rotate.split('deg')[0];
    player_top = +window.getComputedStyle(player).top.split('px')[0];
    player_left = +window.getComputedStyle(player).left.split('px')[0];

    const div = document.createElement('div')
    div.classList.add('tiro')

    if (tecla.key === "Enter" || tecla.key === " ") {
        document.body.appendChild(div).style.rotate = `${player_rotate}deg`
        div.style.top = `${player_top + 40}px`
        div.style.left = `${player_left + 40}px`
    }
})



// Movimentação do tiro

setInterval(() => {
    let tiroArray = document.querySelectorAll('.tiro');

    if (tiroArray.length > 0) {
        tiroArray.forEach((tiro) => {

            let tiro_left = +window.getComputedStyle(tiro).left.split('px')[0];
            let tiro_top = +window.getComputedStyle(tiro).top.split('px')[0];
            let rotate = +window.getComputedStyle(tiro).rotate.split('deg')[0];

            let largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            let altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

            if (rotate < 90 && rotate > -90) {
                tiro.style.left = `${tiro_left + velocidade_tiro}px`
                // Direita 0
            }

            if (rotate < 180 && rotate > 0) {
                tiro.style.top = `${tiro_top + velocidade_tiro}px`
                // Baixo 90
            }

            if (rotate < -90 || rotate > 90) {
                tiro.style.left = `${tiro_left - velocidade_tiro}px`
                // Esquerda 180
            }

            if (rotate < 0 && rotate > -180) {
                tiro.style.top = `${tiro_top - velocidade_tiro}px`
                // Cima -90
            }

            if (tiro_left >= largura || tiro_top >= altura || tiro_left < 0 || tiro_top < 0) {
                tiro.parentNode.removeChild(tiro)
            }

            // Verifica se a bala atingiu algum inimigo
            enemys.forEach((inimigo)=>{
                let area = tiro.getBoundingClientRect();
                let areaE = inimigo.getBoundingClientRect();

                if (area.left < areaE.right &&
                    area.right > areaE.left &&
                    area.top < areaE.bottom &&
                    area.bottom > areaE.top) 
                {
                    tiro.parentNode.removeChild(tiro)
                inimigo.setAttribute('vida', inimigo.getAttribute('vida') - 1)
            }
            })
        })
    }
}, 100)