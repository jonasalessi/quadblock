function Bloco(vx, vy, vcor) {
    var x = vx;
    var y = vy;
    var cor = vcor;
    var borda = vcor == 'black' ? 'white' : 'black';
    
    this.getCor = function getCor() {
        return cor;
    }
    
    this.getBorda = function getBorda() {
        return borda;
    }
    
    this.getLargura = function getLargura() {
        return  larguraCanvas / totalBlocoX;
    }
    
    this.getAltura = function getAltura() {
        return alturaCanvas / totalBlocoY;
    }
    
    this.getX = function getX() {
        return x * this.getLargura();
    }
    
    this.getY = function getY() {
        return y * this.getAltura();
    }
    
    this.setCor = function setCor(vcor) {
        cor = vcor;
    }
    
    this.setBorda = function setBorda(vborda) {
        borda = vborda;
    }
}