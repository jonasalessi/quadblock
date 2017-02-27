var quantidadeBulletEmMovimento = 0;

function Cartucheira(blockName) {
    var bala = [];
    var contadorGiro = fps / 15;
    var contadorRecarga = fps / 20;
    for (var i = 0; i < 5;i++) {
        bala.push(new Bullet(i * 72, `${blockName}-${i}`));
    }
    
    this.pegarBullet = function pegarBullet() {
        var total = bala.length;
        for (var i = 0; i < total; i++) {
            if (!bala[i].isMoving() && bala[i].isAlive()) {
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
                bala[i].increaseAngle();
            }
            bala[i].moveAngle(centroX, centroY);
            bala[i].checkLimitScenario();
        }
         if (contadorGiro == 0) {
                contadorRecarga -= 0.5;
                contadorGiro = fps / 15;
          }
          if (contadorRecarga == 0) {
              contadorRecarga = fps / 20;
              carregarUmaBullet();  
          }
    }
    
    function carregarUmaBullet() {
        var total = bala.length;
        for (var i = 0; i < total; i++) {
            if (!bala[i].isMoving() && !bala[i].isAlive()) {
                bala[i].enableBullet();
                break;
            }
        }
    }
    
    this.verificarColisaoBlock = function verificarColisaoBlock(corJogador, block) {
        var total = bala.length;
        for (var i = 0; i < total; i++) {
            if (!bala[i].isMoving()) {
                continue;
            } 
            quantidadeBulletEmMovimento += 1;
            if (corJogador == block.cor) {
                if (bala[i].isHitBlock(block)) {
                    block.cor = (corJogador == 'black' ? 'white': 'black');
                    block.borda = (corJogador == 'white' ? 'white': 'black');
                }
            }
        }
    }
    
    this.isAcerteiJogador = function isAcerteiJogador(jogador) {
        var total = bala.length;
        for (var i = 0; i < total; i++) {
            if (bala[i].isMoving() && bala[i].isHitPlayer(jogador)) {
                console.log('Morreu! ' + jogador.getCor());
                return true;
            }
        }
        return false;
    }
      
    this.draw = function draw(ctx, cor) {
        var total = bala.length;
        for (var i = 0; i < total; i++) { 
            bala[i].draw(ctx, cor);
        }
    }

}