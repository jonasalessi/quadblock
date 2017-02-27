class Block {
    
    constructor(vx, vy, vcor) {
        this._x = vx;
        this._y = vy;
        this._cor = vcor;
        this._borda = vcor == 'black' ? 'white' : 'black';
    }

    get cor() {
        return this._cor;
    }

    get borda() {
        return this._borda;
    }

    get largura() {
        return larguraCanvas / totalBlockX;
    }

    get altura() {
        return alturaCanvas / totalBlockY;
    }

    get x() {
        return this._x * this.largura;
    }

    get y() {
        return this._y * this.altura;
    }


    set cor(cor) {
        this._cor = cor;
    }

    set borda(vborda) {
        this._borda = vborda;
    }
}