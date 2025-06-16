const player = document.querySelector('.player');
const velocidade_player = 30;

var player_vida = 100;
var player_vida_maximo;
var player_top = +window.getComputedStyle(player).top.split('px')[0];
var player_left = +window.getComputedStyle(player).left.split('px')[0];
var player_rotate = +window.getComputedStyle(player).rotate.split('deg')[0];

var pontuacao = 0

const velocidade_tiro = 100;
// Quantos pixels ele anda por vez


var primeiro_zumbi_Pixel = 18;
// Quantos pixels ele anda por vez
var primeiro_zumbi_Speed = 195;
// Velocidade em que o setInterval de movimento é atualizado
var primeiro_zumbi_ataque = 1005;
// Velocidade em que o setInterval de ataque é atualizado
var primeiro_zumbi_dano = 4;
var primeiro_zumbi_vida = 4;
// Vida do zumbi
var primeiro_zumbi_valor = 10
// Quantos pontos vale cada zumbi derrotado



// AUDIOS

const audio_erro = new Audio('jogo_assets/assets/audios/erro_sound.aac');
const audio_loja = new Audio('jogo_assets/assets/audios/loja_sound.aac');
audio_loja.volume = 0.15;

const audio_fuzil_disparo = new Audio('jogo_assets/assets/audios/ak47_disparo_sound.aac');
audio_fuzil_disparo.volume = 0.07;
const audio_fuzil_reload = new Audio('jogo_assets/assets/audios/ak47_reload_sound.aac');
audio_fuzil_reload.volume = 0.6;

const audio_shotgun_disparo = new Audio('jogo_assets/assets/audios/shotgun_disparo_sound.aac');
audio_shotgun_disparo.volume = 0.4;
const audio_shotgun_reload = new Audio('jogo_assets/assets/audios/shotgun_reload_sound.aac');
audio_shotgun_reload.volume = 0.3;

const audio_pistola_disparo = new Audio('jogo_assets/assets/audios/pistola_disparo_sound.aac');
audio_pistola_disparo.volume = 0.2;
const audio_pistola_reload = new Audio('jogo_assets/assets/audios/pistola_reload_sound.aac');
audio_pistola_reload.volume = 0.15;

const audio_desert_eagle_disparo = new Audio('jogo_assets/assets/audios/desert_eagle_disparo_sound.aac');
audio_desert_eagle_disparo.volume = 0.1;
const audio_desert_eagle_reload = audio_pistola_reload

const audio_player_dano = new Audio('jogo_assets/assets/audios/player_dano_sound.aac');
audio_player_dano.volume = 0.15;
const audio_player_passos = new Audio('jogo_assets/assets/audios/player_passos_sound.aac');
audio_player_passos.volume = 0.05;

const audio_zumbi_passos = new Audio('jogo_assets/assets/audios/zumbi_passos_sound.aac');
audio_zumbi_passos.volume = 0.06;
var audio_zumbi_fala = new Audio();
audio_zumbi_fala.volume = 0.01;

// Dá play nas musicas de background

const musicaVitrine = document.querySelector('.musicaVitrine')
const musicaNomeVitrine = document.getElementById('musicaNome')

const musicasBackgroundName = ['Hellstorm', 'Implicit Eyes', 'Infamous King', 'Pain Valley'];
const musicasVolumes = {
    Hellstorm: 0.3,
    'Implicit Eyes': 0.4,
    'Infamous King': 0.5,
    'Pain Valley': 0.5,
}

let background = Math.floor(Math.random() * musicasBackgroundName.length)

const musica_0 = new Audio(`jogo_assets/assets/musicas/Hellstorm.aac`);
const musica_1 = new Audio(`jogo_assets/assets/musicas/Implicit Eyes.aac`);
const musica_2 = new Audio(`jogo_assets/assets/musicas/Infamous King.aac`);
const musica_3 = new Audio(`jogo_assets/assets/musicas/Pain Valley.aac`);

musicaBackgroundPlay()
function musicaBackgroundPlay() {
    // para todas as musicas antes de tocar
    for(let i = 0; i < musicasBackgroundName.length; i++){
        eval(`musica_${i}`).pause()
        eval(`musica_${i}`).currentTime = 0
    }

    if (background === musicasBackgroundName.length) { background = 0 }

    musicaBackground = eval(`musica_${background}`)
    musicaBackground.volume = musicasVolumes[musicasBackgroundName[background]]
    musicaBackground.play()

    const duracaoMusica = musicaBackground.duration * 1000 || 500


    // Nome da musica na 'vitrine'
    musicaNomeVitrine.innerText = musicasBackgroundName[background]
    musicaVitrine.classList.add('show')
    setTimeout(()=>{musicaVitrine.classList.remove('show')}, 10000)


    // Muda para a proxima musica
    setTimeout(() => {
        background++
        musicaBackgroundPlay()
    }, duracaoMusica)
}