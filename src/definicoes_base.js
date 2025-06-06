const player = document.querySelector('img')
const velocidade_player = 50
const velocidade_tiro = 50
const velocidade_inimigo_Pixel = 20
const velocidade_inimigo_Speed = 200
const velocidade_inimigo_ataque = 2000


var player_top = +window.getComputedStyle(player).top.split('px')[0];
var player_left = +window.getComputedStyle(player).left.split('px')[0];
var player_rotate = +window.getComputedStyle(player).rotate.split('deg')[0];