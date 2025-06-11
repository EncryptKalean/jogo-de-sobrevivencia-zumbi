const loja_icone = document.querySelector('.lojaIcone');
const loja = document.querySelector('.lojaBackground');
const abas = document.querySelectorAll('.aba');
const armas_aba = document.querySelector('.pagina_armas');
const municoes_aba = document.querySelector('.pagina_municoes');
const categorias_loja = document.querySelector('.categorias_loja');

const preco_arma = {
    preco_fuzil: 100,
    preco_pistola: 30
}

const preco_municao ={
    preco_fuzil: 30,
    preco_pistola: 10
}

var stock;
var arma_fireRate;
var categoria;
let myInterval;


// Modo de disparo que se molda de acordo com a arma escolhida

function tiroAlternado(arma) {
    const cartuchoAtual = armas_cartucho[`${arma}_cartucho`]

    myInterval = setInterval(() => {
        if (pode_atirar && cartucho > 0) {
            if (teclas["Enter"] || teclas[" "]) {
                const div = document.createElement('div')
                div.classList.add('tiro')

                document.body.appendChild(div).style.rotate = `${player_rotate}deg`

                cartucho--

                // Esses ifs servem para mudar o ponto de origem da criação da bala. Assim sempre vai dar a impressão de que a bala sai do cano da arma

                if (player_rotate < 180 && player_rotate >= 0 || player_rotate > 270 && player_rotate < 360) {
                    // Direita e Baixo
                    div.style.top = `${player_top + (player_height * 0.75)}px`
                    div.style.left = `${player_left + (player_height * 0.30)}px`
                }

                if (player_rotate >= 180 && player_rotate <= 270) {
                    // Esquerda e Cima
                    div.style.top = `${player_top + (player_height * 0.20)}px`
                    div.style.left = `${player_left + (player_height * 0.80)}px`
                }
            }
        }

        // Recarregar
        if (teclas['r'] && cartucho <= 0 && stock > 0) {
            cartucho = cartuchoAtual
            armas_maximo[`${arma}_maximo`] = armas_maximo[`${arma}_maximo`] - cartuchoAtual
            stock = armas_maximo[`${arma}_maximo`]
        }

        municao_texto.textContent = cartucho
        municao_max_texto.textContent = stock

        console.log(armas_maximo['fuzil_maximo'])
    }, arma_fireRate)
}


// Abre/fecha a loja ao apertar no icone

loja_icone.addEventListener('click', () => {
    const right = window.getComputedStyle(loja).right.split('px')[0]
    if (right < 0) {
        loja.style.right = '0'
    }
    else { loja.style.right = '-50%' }
})


// Muda a categoria da loja de acordo com a aba

categorias_loja.addEventListener('click', (click) => {
    const aba = click.target.closest('.aba')

    if (!aba.classList.contains('selecionado')) {
        abas.forEach((aba) => { aba.classList.remove('selecionado') })
        aba.classList.add('selecionado')
    }

    categoria = aba.getAttribute('tipo')

    if (categoria === 'armas') {
        municoes_aba.style.display = 'none'
        armas_aba.style.display = 'block'
    }

    if (categoria === 'municoes') {
        municoes_aba.style.display = 'block'
        armas_aba.style.display = 'none'
    }
})


// Funções da aba de armas

armas_aba.addEventListener('click', (click) => {
    const arma = click.target.closest('.arma-container').getAttribute('arma');
    const preco = click.target.closest('.arma-container').getAttribute('preco');

    if (pontuacao >= preco) {

        if (arma === 'pistola') {
            player.style.width = '100px'
        }

        else if (arma === 'fuzil') {
            player.style.width = '130px'
        }

        arma_equipada = arma
        dano_arma = armas_dano[`${arma}_dano`]
        cartucho = armas_cartucho[`${arma}_cartucho`]
        stock = armas_maximo[`${arma}_maximo`]
        arma_fireRate = armas_fireRate[`${arma}_fireRate`]

        clearInterval(myInterval)
        player.style.background = `url('src/assets/player_parado_${arma_equipada}.webp') center / contain no-repeat`
        tiroAlternado(arma)
    }

    else {
        audio_erro.play()
    }
})


// Funções da aba de munições

municoes_aba.addEventListener('click', (click) => {
    const municao = click.target.closest('.municao-container').getAttribute('municao');
    const preco = click.target.closest('.municao-container').getAttribute('preco');

    if (pontuacao >= preco) {
    }
    else {
        audio_erro.play()
    }
})


// Registro das armas na loja

const precosArmaArray = document.querySelectorAll('.pagina_armas .preco')
const precosMunicaoArray = document.querySelectorAll('.pagina_municoes .preco')

precosArmaArray.forEach((el) => {
    const div = el.closest('.arma-container');
    const arma = el.closest('.arma-container').getAttribute('arma');
    el.closest('.arma-container').setAttribute('preco', preco_arma[`preco_${arma}`]);
    const preco = el.closest('.arma-container').getAttribute('preco');
    el.textContent = `preço: ${preco}`;
    div.querySelector('.nome').textContent = arma
})

precosMunicaoArray.forEach((el) => {
    const div = el.closest('.municao-container');
    const municao = el.closest('.municao-container').getAttribute('municao');
    el.closest('.municao-container').setAttribute('preco', preco_municao[`preco_${municao}`]);
    const preco = el.closest('.municao-container').getAttribute('preco');
    el.textContent = `preço: ${preco}`;
    div.querySelector('.nome').textContent = `munição de ${municao}`
})