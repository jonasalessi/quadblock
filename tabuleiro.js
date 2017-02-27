function Tabuleiro(vctx) {
    var ctx = vctx;
    var block = [];
    var cenario = [[-1,1,1,1,1,0,0,0,0,0,1,1,1,1],[-1,1,1,1,1,0,0,0,0,0,1,1,1,1],[-1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1]
                              ,[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1]
                              ,[1,1,1,1,1,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,1,1,1,1]];
    
    var jogador1 = new Jogador('black', 100, 100, this);
    var jogador2 = new Jogador('white', 100, 10, this);
    var block = [];
    this.carregarBlocks = function carregarBlocks() {
        totalBlockX = cenario.length;
        totalBlockY = cenario[0].length;
        block = [];
        for (var x = 0; x < cenario.length ; x++ ) {
            for (var y = 0; y < cenario[x].length; y++) {
                var cor = 'black';
                if (cenario[x][y] == 1) {
                    cor = 'white';
                }
                block.push(new Block(x, y, cor));
            }
        }
    }
    
    this.draw = function draw() {
        ctx.clearRect(0, 0, larguraCanvas, alturaCanvas);
        // draw cenario
        var total = block.length;
        for (var i = 0; i < total ; i++ ) {
            ctx.fillStyle = block[i].cor;
            ctx.strokeStyle = block[i].borda;
            ctx.strokeRect(block[i].x, block[i].y, block[i].largura, block[i].altura);
            ctx.fillRect(block[i].x, block[i].y, block[i].largura, block[i].altura);
        }
        // draw jogadores
        jogador1.draw(ctx);
        jogador2.draw(ctx);
    }
    
    this.atualizar = function atualizar(dt) {
        jogador1.movimentar(dt);
        jogador2.movimentar(dt); 
        var total = block.length;
        for (var i = 0; i < total; i++) {
            quantidadeBulletEmMovimento = 0;
            jogador1.verificarColisaoBlock(block[i]);
            jogador2.verificarColisaoBlock(block[i]);
            jogador1.verificarLimite(block[i]);
            jogador2.verificarLimite(block[i]);
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