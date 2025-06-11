const player = document.querySelector('.player');
const velocidade_player = 30;
const velocidade_tiro = 100;
// Quantos pixels ele anda por vez

var player_vida = 100;
var player_top = +window.getComputedStyle(player).top.split('px')[0];
var player_left = +window.getComputedStyle(player).left.split('px')[0];
var player_rotate = +window.getComputedStyle(player).rotate.split('deg')[0];

var pontuacao = 0

// Armas
var cartucho = 10

var arma_equipada = 'pistola'

const armas_dano = {
    pistola_dano: 1,
    fuzil_dano: 0.5
}

const armas_cartucho = {
    pistola_cartucho: 10,
    fuzil_cartucho: 20
}

var armas_maximo = {
    pistola_maximo: 50,
    fuzil_maximo: 100
}

const armas_fireRate = {
    pistola_fireRate: 1000000,
    fuzil_fireRate: 250
}
// ---------------------------------

var primeiro_zumbi_Pixel = 20;
// Quantos pixels ele anda por vez
var primeiro_zumbi_Speed = 200;
// Velocidade em que o setInterval de movimento é atualizado
var primeiro_zumbi_ataque = 1000;
// Velocidade em que o setInterval de ataque é atualizado
var primeiro_zumbi_dano = 5;
// Quantos % cada ataque tira da vida
var primeiro_zumbi_vida = 5;
// Vida do zumbi
const primeiro_zumbi_valor = 10
// Quantos pontos vale cada zumbi derrotado


// AUDIOS
const audio_erro = new Audio('src/assets/audios/erro_sound.aac')