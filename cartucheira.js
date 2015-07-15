var quantidadeBalaEmMovimento = 0;

function Cartucheira() {
    var bala = [];
    var contadorGiro = fps / 15;
    var contadorRecarga = fps / 20;
        
    for (var i = 0; i < 5;i++) {
        bala.push(new Bala(i * 72));
    }
    
    this.pegarBala = function pegarBala() {
        var total = bala.length;
        for (var i = 0; i < total; i++) {
            if (!bala[i].isMovimento() && bala[i].isAtiva()) {
                contadorRecarga = 20;
                return bala[i];
            }
        }
        return null;
    }
    
    this.movimentar = function movimentar(centroX, centroY) {
        var total = bala.length;
        contadorGiro -= 1;
        for (var i = 0; i < total; i++) {
            if (contadorGiro == 0) {
                bala[i].incrementarAngulo();
            }
            bala[i].movimentarAngulo(centroX, centroY);
            bala[i].verificarLimiteCenario();
        }
         if (contadorGiro == 0) {
                contadorRecarga -= 0.5;
                contadorGiro = fps / 15;
          }
          if (contadorRecarga == 0) {
              contadorRecarga = fps / 20;
              carregarUmaBala();  
          }
    }
    
    function carregarUmaBala() {
        var total = bala.length;
        for (var i = 0; i < total; i++) {
            if (!bala[i].isMovimento() && !bala[i].isAtiva()) {
                bala[i].ativarBala();
                break;
            }
        }
    }
    
    this.verificarColisaoBloco = function verificarColisaoBloco(corJogador, bloco) {
        var total = bala.length;
        for (var i = 0; i < total; i++) {
            if (!bala[i].isMovimento()) {
                continue;
            } 
            quantidadeBalaEmMovimento += 1;
            if (corJogador == bloco.getCor()) {
                if (bala[i].isColidiuComBloco(bloco)) {
                    bloco.setCor(corJogador == 'black' ? 'white': 'black');
                    bloco.setBorda(corJogador == 'white' ? 'white': 'black');
                }
            }
        }
    }
    
    this.isAcerteiJogador = function isAcerteiJogador(jogador) {
        var total = bala.length;
        for (var i = 0; i < total; i++) {
            if (bala[i].isMovimento() && bala[i].isAtingiuJogador(jogador)) {
                console.log('Morreu! ' + jogador.getCor());
                return true;
            }
        }
        return false;
    }
      
    this.pintar = function pintar(ctx, cor) {
        var total = bala.length;
        for (var i = 0; i < total; i++) { 
            bala[i].pintar(ctx, cor);
        }
    }

}