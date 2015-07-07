function Bala(ang) {
    var x = 0;
    var y = 0;
    var dx = 0;
    var dy = 0;
    var raio = 2;
    var movimento = false;
    var ativa = true;
    var angulo = ang;
  
    this.disparar = function disparar(vdx, vdy, vx , vy) {
        dx = vdx;
        dy = vdy;
        x = vx;
        y = vy;
        raio = 5;
        movimento = true;
    }
        
    this.pintar = function pintar(ctx, cor) {
        if (!ativa) {
            return;
        }
        ctx.beginPath();
        if (!movimento) {
            ctx.fillStyle = cor == 'black' ? 'white' : 'black';
        } else {
            ctx.fillStyle = cor;
        }
        ctx.arc(x, y, raio, 0, 2 * Math.PI, false);
        ctx.fill();
    }
    
    this.isMovimento = function isMovimento() {
        return movimento;
    }
    
    
    this.verificarLimiteCenario = function verificarLimiteCenario() {
        if (x < 0 || x > larguraCanvas || y > alturaCanvas || y < 0) {
            this.terminar();
        }
    }
    
    this.terminar = function terminar() {
        x = 0;
        y = 0;
        dx = 0;
        dy = 0;
        raio = 2;
        movimento = false;
        ativa = false;
    }
    
    this.ativarBala = function ativarBala() {
        ativa = true;
    }
    
    this.isAtiva = function isAtiva() {
        return ativa;
    }
    
    this.isColidiuComBloco = function isColidiuComBloco(bloco) {
        if (x >= bloco.getX() && x <= (bloco.getX() + bloco.getLargura()) 
            && y >= bloco.getY() && y <= (bloco.getY() + bloco.getAltura())) {
            return true;
        }
        return false;
    }
    
    this.isAtingiuJogador = function isAtingiuJogador(jogador) {
        if (x >= jogador.getX() && x <= (jogador.getX() + jogador.getLargura() + raio)
            && y >= jogador.getY() && y <= (jogador.getY() + jogador.getAltura() + raio)) {
            return true;
        }
        return false;
    }
    
    this.movimentarAngulo = function movimentarAngulo(vx , vy, radiano) {
        if (!ativa) {
            return;
        }
        if (movimento) {
          if (dx > 0) {
                x = x + Math.ceil((dt * dx * fps) / 1000);
            }else if(dx < 0){
                x = x + Math.floor((dt * dx * fps) / 1000);
            } else if (dy > 0) {
                y = y + Math.ceil((dt * dy * fps) / 1000);
            } else if (dy < 0){
                y =  y + Math.floor((dt * dy * fps) / 1000);
            }
        } else {
            var radiano = angulo * (Math.PI / 180);
            x = vx;
            y = vy;
            x = (Math.cos(radiano) * 8) + x;
            y = (Math.sin(radiano) * 8) + y;
        }
    }
    
    this.getId = function getId() {
        return id;
    }
    
    this.incrementarAngulo = function incrementarAngulo() {
        angulo += 20;
        angulo %= 370;
    }
      
}