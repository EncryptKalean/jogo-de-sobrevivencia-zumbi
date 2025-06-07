const player = document.querySelector('.player');
const velocidade_player = 30;
const velocidade_tiro = 100;
// Quantos pixels ele anda por vez

var player_vida = 100;
var player_top = +window.getComputedStyle(player).top.split('px')[0];
var player_left = +window.getComputedStyle(player).left.split('px')[0];
var player_rotate = +window.getComputedStyle(player).rotate.split('deg')[0];

const velocidade_zumbi_Pixel = 20;
// Quantos pixels ele anda por vez
const velocidade_zumbi_Speed = 200;
// Velocidade em que o setInterval de movimento é atualizado
const velocidade_zumbi_ataque = 1000;
// Velocidade em que o setInterval de ataque é atualizado
const primeiro_zumbi_dano = 5;