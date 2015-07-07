var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var larguraCanvas = canvas.offsetWidth;  
var alturaCanvas = canvas.offsetHeight;
var totalBlocoX;
var totalBlocoY;
var tabuleiro;

var somTiro;
var somGameOver;
var somFundo;
var fps ;
var ultimoTempo;
var dt ; 
var acumulador;
var reiniciarJogo = false;

function loop() {
    if (somFundo.paused) {
        somFundo.play();
    }
   var agora = new Date().getTime();
   var passou = agora - ultimoTempo;
   ultimoTempo = agora;
   acumulador += passou;
   while (acumulador >= dt) {
      tabuleiro.atualizar();
       if (reiniciarJogo) {
            break;
       }
      acumulador -= dt;
   }
    larguraCanvas = canvas.offsetWidth;  
    alturaCanvas = canvas.offsetHeight;
    canvas.height = alturaCanvas;
    canvas.width = larguraCanvas;
    tabuleiro.pintar();
    if (reiniciarJogo) {
        somFundo.pause();
        reiniciar();        
    } else {
        setTimeout(loop, 1000/fps);
    }
}

this.reiniciar = function reiniciar() {
    fps = 120;
    ultimoTempo;
    dt = 1000 / fps; 
    acumulador = 0;
    tabuleiro = new Tabuleiro(context);
    tabuleiro.carregarBlocos();
    context.fillStyle = "red";
    context.font = "bold 56px serif";
    var texto = reiniciarJogo == false ? "Iniciando jogo ..." : "Game over :(";
    context.fillText(texto, (larguraCanvas/ 4), alturaCanvas / 2);
    reiniciarJogo = false;
    ultimoTempo = new Date().getTime();
    window.addEventListener('keydown', tabuleiro.onKeyDown,true);
    window.addEventListener('keyup', tabuleiro.onKeyUp, true);
    somTiro = new Audio('music/tiro.ogg');
    somGameOver = new Audio('music/gameOver.ogg');
    somFundo = new Audio('music/soundFundo.mp3');
    somTiro.volume = 0.7;
    somGameOver.volume = 0.9;
    somFundo.volume = 0.5
    setTimeout(loop, 1000);
}

this.reiniciar();