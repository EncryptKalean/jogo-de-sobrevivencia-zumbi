const maximo_de_vida = document.querySelector('.vidaFora').clientWidth
let dano = maximo_de_vida * 0.10 //O dano está 10% da vida maxima
const barra_vida = document.querySelector('.vida')


// Ataque

enemys.forEach((inimigo) => {
    setInterval(() => {
        let vida_porcentagem = barra_vida.clientWidth
        if (vida_porcentagem > dano) {
            let area = player.getBoundingClientRect();
            let areaE = inimigo.getBoundingClientRect();

            if (area.left < areaE.right &&
                area.right > areaE.left &&
                area.top < areaE.bottom &&
                area.bottom > areaE.top) {

                barra_vida.style.width = `${vida_porcentagem - dano}px`
            }
        } else {
            barra_vida.style.width = 0
        }
    }, velocidade_inimigo_ataque)
})