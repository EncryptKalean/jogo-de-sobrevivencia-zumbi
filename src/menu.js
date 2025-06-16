const menu = document.querySelector('.sobre_Menu')
const transition = +window.getComputedStyle(menu).transition.split('s')[0] * 1000
const aviso_Mobile = document.getElementById('aviso_Mobile')
const how_to_play = document.getElementById('como_Jogar_Menu')
const abrir_menu_btn = document.getElementById('sobre')
const fechar_menu_btn = document.getElementById('fechar_Menu')
const fechar_aviso_btn = document.getElementById('fechar_Alerta')
const abrir_htp_btn = document.getElementById('como_Jogar')
const fechar_htp_btn = document.getElementById('fechar_como_jogar')

abrir_menu_btn.addEventListener('click', ()=>{
    menu.style.display = 'block'

    setTimeout(()=>{
        menu.style.opacity = '1'
    }, 100)
})

fechar_menu_btn.addEventListener('click',()=>{
    menu.style.opacity = '0'

    setTimeout(()=>{
        menu.style.display = 'none'
    }, transition)
})

fechar_aviso_btn.addEventListener('click',()=>{
    aviso_Mobile.style.opacity = '0'
    
    setTimeout(()=>{
        aviso_Mobile.style.display= 'none'
    }, 1000)
})

abrir_htp_btn.addEventListener('click', ()=>{
    how_to_play.style.display = 'block'

    setTimeout(()=>{
        how_to_play.style.opacity = '1'
    }, 100)
})

fechar_htp_btn.addEventListener('click',()=>{
    how_to_play.style.opacity = '0'

    setTimeout(()=>{
        how_to_play.style.display = 'none'
    }, transition)
})



// ------------- Musica Menu

const video = document.querySelector('iframe')
const parag = document.getElementById('numeroMusica')

const musicas = [
    'xgI6G6d37Ak', 'CHCg4czQNj0', 'msFnkpU5cys', 'E4mQgU8GUHU', 'UNZsTNE0kD8', 'LIFxo0csurg'
]

const musicaAtual = Math.floor(Math.random() * musicas.length)

video.src = `https://www.youtube.com/embed/${musicas[musicaAtual]}`

parag.innerText = `${musicaAtual + 1}° de ${musicas.length}`