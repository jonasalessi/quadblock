function Tabuleiro(vctx) {
    var ctx = vctx;
    var bloco = [];
    var cenario = [[-1,1,1,1,1,0,0,0,0,0,1,1,1,1],[-1,1,1,1,1,0,0,0,0,0,1,1,1,1],[-1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1]
                              ,[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1]
                              ,[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1]];
    
    var jogador1 = new Jogador('black', 100, 100);
    var jogador2 = new Jogador('white', 100, 10);
    var bloco = [];
 
    this.carregarBlocos = function carregarBlocos() {
        totalBlocoX = cenario.length;
        totalBlocoY = cenario[0].length;
        bloco = [];
        for (var x = 0; x < cenario.length ; x++ ) {
            for (var y = 0; y < cenario[x].length; y++) {
                var cor = 'black';
                if (cenario[x][y] == 1) {
                    cor = 'white';
                }
                bloco.push(new Bloco(x, y, cor));
            }
        }
    }
    
    this.pintar = function pintar() {
        ctx.clearRect(0, 0, larguraCanvas, alturaCanvas);
        // pintar cenario
        var total = bloco.length;
        for (var i = 0; i < total ; i++ ) {
            ctx.fillStyle = bloco[i].getCor();
            ctx.strokeStyle = bloco[i].getBorda();
            ctx.strokeRect(bloco[i].getX(), bloco[i].getY(), bloco[i].getLargura(), bloco[i].getAltura());
            ctx.fillRect(bloco[i].getX(), bloco[i].getY(), bloco[i].getLargura(), bloco[i].getAltura());
        }
        // pintar jogadores
        jogador1.pintar(ctx);
        jogador2.pintar(ctx);
    }
    
    this.atualizar = function atualizar(dt) {
        jogador1.movimentar(dt);
        jogador2.movimentar(dt); 
        var total = bloco.length;
        for (var i = 0; i < total; i++) {
            quantidadeBalaEmMovimento = 0;
            jogador1.verificarColisaoBloco(bloco[i]);
            jogador2.verificarColisaoBloco(bloco[i]);
            jogador1.verificarLimite(bloco[i]);
            jogador2.verificarLimite(bloco[i]);
        }
        if (jogador1.isAcerteiJogador(jogador2)) {
            reiniciarJogo = true;
            somGameOver.play();
        }
        if (jogador2.isAcerteiJogador(jogador1)) {
            reiniciarJogo = true;
            somGameOver.play();
        }
    }
    
    this.onKeyDown = function onKeyDown(e) {
        switch(e.keyCode) {
            case 37:
                jogador1.esquerda();
                break;
            case 39:
                jogador1.direita();
                break;
            case 40:
                jogador1.baixo();
                break;
            case 38:
                jogador1.cima();
                break;
            case 65:
                jogador2.esquerda();
                break;
            case 68:
                jogador2.direita();
                break;
            case 83:
                jogador2.baixo();
                break;
            case 87:
                jogador2.cima();
                break;
        }
    }
    
    this.onKeyUp = function onKeyUp(e) {
        var key = e.keyCode;
        if (key == 71) {
            jogador2.atirar();
            return;
        }
        if (key == 32) {
            jogador1.atirar();
            return;
        }
        if ((key >= 37 && key <=40) || key == 32) {
            jogador1.cancelarMovimento();
        } else if (key == 83 || key == 68 || key == 87 || key == 65 || key == 71) {
            jogador2.cancelarMovimento();
        }
    }
    

}