const limite_do_mapa = 4000

var mapa = document.querySelector('.mapa')
mapa.style.width = `${limite_do_mapa}px`
mapa.style.height = `${limite_do_mapa / 2}px`

var mapa_Height = +window.getComputedStyle(mapa).height.split('px')[0];
var mapa_Width = +window.getComputedStyle(mapa).width.split('px')[0];

var paredeV = document.querySelector('.paredeVertical')
var paredeH = document.querySelector('.paredeHorizontal')