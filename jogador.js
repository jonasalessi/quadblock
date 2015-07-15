function Jogador(vcor, vx, vy, vtabuleiro) {
    var x = vx;
    var y = vy;
    var tabuleiro = vtabuleiro;
    var xUltimoBlocoValido = null;
    var yUltimoBlocoValido = null;
    var dx = 0;
    var dy = 0;
    var ultimoDx = 0;
    var ultimoDy = 0;
    var cartucheira = new Cartucheira();
    var cor = vcor;
    var afastar = 2;
    // 150%, será incrementado 150% da velocidade do jogador sobre a velocidade da bala
    var razaoCentesima = (150 / 100);
         
    this.getCor = function getCor() {
        return cor;
    } 
    
     this.getX = function getX() {
        return x;
    } 
     
    this.getY = function getY() {
        return y;
    }
    
    this.getVelocidade = function getVelocidade() {
       var tamQuadrado =  this.getLargura() * this.getAltura();
        return 0.002 * tamQuadrado;
    }
    
    this.getLargura = function getLargura() {
        return (larguraCanvas / totalBlocoX) / 1.7;
    }
    
    this.getAltura = function getAltura() {
        return (alturaCanvas / totalBlocoY) / 1.4;
    }
    
    this.pintar = function pintar(ctx) {
        ctx.fillStyle = cor;
        ctx.fillRect(x, y, this.getLargura(), this.getAltura());
        cartucheira.pintar(ctx, cor);
    }

    this.movimentar = function movimentar() {
        var velocidade = this.getVelocidade();
        if (dx > 0) {
            if (dx < velocidade) {
                dx += 0.1;
            }
            x += Math.ceil((dt * dx * fps) / 1000);
        }else if (dx < 0) {
            if (dx > -velocidade) {
                dx -= 0.1;
            }
            x += Math.floor((dt * dx * fps) / 1000);
        }
        if (dy > 0) {
            if (dy < velocidade) {
                dy += 0.1;
            }
            y += Math.ceil((dt * dy * fps) / 1000);
        } else if (dy < 0) {
            if (dx > -velocidade) {
                dy -= 0.1;
            }
            y += Math.floor((dt * dy * fps) / 1000);
        }
        cartucheira.movimentar(x + (this.getLargura() / 2), y + (this.getAltura() / 2));
    }
    
    this.verificarColisaoBloco = function verificarColisaoBloco(bloco) {
        cartucheira.verificarColisaoBloco(cor, bloco);
    }
    
    this.isAcerteiJogador = function isAcerteiJogador(jogador) {
        return cartucheira.isAcerteiJogador(jogador);
    }
    
    this.verificarLimite = function verificarLimite(bloco) {
        var minhaLargura = this.getLargura();
        var minhaAltura = this.getAltura();
        if (bloco.getCor() != cor) {
            if (x <= -minhaLargura) {
                x = totalBlocoX * bloco.getLargura();
            } else if (y <= -minhaAltura) {
                y = totalBlocoY * bloco.getAltura();
            } else if (y >= (minhaAltura + alturaCanvas)) {
                y = 0;
            } else if (x >= (minhaLargura + larguraCanvas)) {
                x = 0;
            } 
            yUltimoBlocoValido = bloco.getY();
            xUltimoBlocoValido = bloco.getX();
            return;
        }
        var xMeio = x + (minhaLargura / 2);
        var yMeio = y + (minhaAltura / 2);
        var larguraBloco = bloco.getLargura();
        var alturaBloco = bloco.getAltura();
        var xBlocoMeio = bloco.getX() + (larguraBloco / 2);
        var yBlocoMeio = bloco.getY() + (alturaBloco / 2)
        var catetoX = xMeio > xBlocoMeio ? xMeio - xBlocoMeio : xBlocoMeio - xMeio;
        var catetoY = yMeio > yBlocoMeio ? yMeio - yBlocoMeio : yBlocoMeio - yMeio;
        var somaMetadeX = (larguraBloco / 2) + (minhaLargura / 2);
        var somaMetadeY = (alturaBloco / 2) + (minhaAltura / 2);
        if (catetoX <= somaMetadeX && catetoY <= somaMetadeY) {
            if (ultimoDx > 0) {
                x -= afastar;
                dx = 0;
                dy = 0;
            } else if (ultimoDx < 0) {
                x += afastar;
                dx = 0;
                dy = 0;
            } else if (ultimoDy > 0) {
                y -= afastar;
                dy = 0;
                dx = 0;
            } else if (ultimoDy < 0) {
                y += afastar;
                dy = 0;
                dx = 0;
            }  else {
                
            if (quantidadeBalaEmMovimento == 0) {
                if (xUltimoBlocoValido != null){
                    x = xUltimoBlocoValido;
                }
                 if (yUltimoBlocoValido != null){
                    y = yUltimoBlocoValido;
                }
            }
        }
            dx = 0;
            dy = 0;
        } 
    }

    this.direita = function direita() {
        if (dx != 0) {
            return;
        }
        var velocidade = this.getVelocidade();
        dx = velocidade;
        ultimoDx = velocidade;
        ultimoDy = 0;
    }

    this.esquerda = function esquerda() {
        if (dx != 0) {
            return;
        }
        var velocidade = this.getVelocidade();
        dx = -velocidade;
        ultimoDx = -velocidade;
        ultimoDy = 0;
    }

    this.cima = function cima() {
        if (dy != 0) {
            return;
        }
        var velocidade = this.getVelocidade();
        dy = -velocidade;
        ultimoDy = -velocidade;
        ultimoDx = 0;
    }

    this.baixo = function baixo() {
         if (dy != 0) {
            return;
        }
        var velocidade = this.getVelocidade();
        dy = velocidade;
        ultimoDy = velocidade;
        ultimoDx = 0;
    }
    
    this.cancelarMovimento = function cancelarMovimento() {
        dx = 0;
        dy = 0;
    }

    this.atirar = function atirar() {
        if (ultimoDx == 0 && ultimoDy == 0) {
            return;
        }
        var bala = cartucheira.pegarBala();
        if (bala == null) {
            console.log("Sem municacao");
            return;    
        }
        if (somTiro.paused == false) {
            somTiro.pause();
        }
        bala.disparar(ultimoDx * razaoCentesima , ultimoDy * razaoCentesima, x + (this.getLargura() / 2), y);
        somTiro.play();
    }

}