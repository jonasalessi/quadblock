function Jogador(vcor, vx, vy, vtabuleiro) {
    var x = vx;
    var y = vy;
    var tabuleiro = vtabuleiro;
    var xUltimoBlockValido = null;
    var yUltimoBlockValido = null;
    var dx = 0;
    var dy = 0;
    var ultimoDx = 0;
    var ultimoDy = 0;
    var cartucheira = new Cartucheira(vcor);
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
        return (larguraCanvas / totalBlockX) / 1.7;
    }
    
    this.getAltura = function getAltura() {
        return (alturaCanvas / totalBlockY) / 1.4;
    }
    
    this.draw = function draw(ctx) {
        ctx.fillStyle = cor;
        ctx.fillRect(x, y, this.getLargura(), this.getAltura());
        cartucheira.draw(ctx, cor);
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
    
    this.verificarColisaoBlock = function verificarColisaoBlock(block) {
        cartucheira.verificarColisaoBlock(cor, block);
    }
    
    this.isAcerteiJogador = function isAcerteiJogador(jogador) {
        return cartucheira.isAcerteiJogador(jogador);
    }
    
    this.verificarLimite = function verificarLimite(block) {
        var minhaLargura = this.getLargura();
        var minhaAltura = this.getAltura();
        if (block.cor != cor) {
            if (x <= -minhaLargura) {
                x = totalBlockX * block.largura;
            } else if (y <= -minhaAltura) {
                y = totalBlockY * block.altura;
            } else if (y >= (minhaAltura + alturaCanvas)) {
                y = 0;
            } else if (x >= (minhaLargura + larguraCanvas)) {
                x = 0;
            } 
            yUltimoBlockValido = block.y;
            xUltimoBlockValido = block.x;
            return;
        }
        var xMeio = x + (minhaLargura / 2);
        var yMeio = y + (minhaAltura / 2);
        var larguraBlock = block.largura;
        var alturaBlock = block.altura;
        var xBlockMeio = block.x + (larguraBlock / 2);
        var yBlockMeio = block.y + (alturaBlock / 2)
        var catetoX = xMeio > xBlockMeio ? xMeio - xBlockMeio : xBlockMeio - xMeio;
        var catetoY = yMeio > yBlockMeio ? yMeio - yBlockMeio : yBlockMeio - yMeio;
        var somaMetadeX = (larguraBlock / 2) + (minhaLargura / 2);
        var somaMetadeY = (alturaBlock / 2) + (minhaAltura / 2);
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
                
            if (quantidadeBulletEmMovimento == 0) {
                if (xUltimoBlockValido != null){
                    x = xUltimoBlockValido;
                }
                 if (yUltimoBlockValido != null){
                    y = yUltimoBlockValido;
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
        var bala = cartucheira.pegarBullet();
        if (bala == null) {
            console.log("Sem municacao");
            return;    
        }
        if (somTiro.paused == false) {
            somTiro.pause();
        }
        bala.shoot(ultimoDx * razaoCentesima , ultimoDy * razaoCentesima, x + (this.getLargura() / 2), y);
        somTiro.play();
    }

}