
class Bullet {

    constructor(angle, id) {
        this._x = 0;
        this._y = 0;
        this._dx = 0;
        this._dy = 0;
        this._radius = 2;
        this._moving = false;
        this._alive = true;
        this._angle = angle;
        this._id = id;
    }

     shoot(vdx, vdy, vx , vy) {
        this._dx = vdx;
        this._dy = vdy;
        this._x = vx;
        this._y = vy;
        this._radius = 5;
        this._moving = true;
    }
        
    draw(ctx, cor) {
        if (!this._alive) {
            return;
        }
        ctx.beginPath();
        if (!this._moving) {
            ctx.fillStyle = cor == 'black' ? 'white' : 'black';
        } else {
            ctx.fillStyle = cor;
        }
        ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
    
    isMoving() {
        return this._moving;
    }
    
    
    checkLimitScenario() {
        if (!this.isMoving()) {
            return;
        }
        if (this._x < 0 || this._x > larguraCanvas || this._y > alturaCanvas || this._y < 0) {
            this.finish();
        }
    }
    
    finish() {
        this._x = 0;
        this._y = 0;
        this._dx = 0;
        this._dy = 0;
        this._radius = 2;
        this._moving = false;
        this._alive = false;
    }
    
    enableBullet() {
        this._alive = true;
    }
    
    isAlive() {
        return this._alive;
    }
    
    isHitBlock(block) {
        if (this._x >= block.x && this._x <= (block.x + block.largura) 
            && this._y >= block.y && this._y <= (block.y + block.altura)) {
            return true;
        }
        return false;
    }
    
    isHitPlayer(jogador) {
        if (this._x >= jogador.getX() && this._x <= (jogador.getX() + jogador.getLargura() + this._radius)
            && this._y >= jogador.getY() && this._y <= (jogador.getY() + jogador.getAltura() + this._radius)) {
            return true;
        }
        return false;
    }
    
    moveAngle(vx , vy) {
        if (!this._alive) {
            return;
        }
        if (this._moving) {
          if (this._dx > 0) {
                this._x = this._x + Math.ceil((dt * this._dx * fps) / 1000);
            }else if(this._dx < 0){
                this._x = this._x + Math.floor((dt * this._dx * fps) / 1000);
            } else if (this._dy > 0) {
                this._y = this._y + Math.ceil((dt * this._dy * fps) / 1000);
            } else if (this._dy < 0){
                this._y =  this._y + Math.floor((dt * this._dy * fps) / 1000);
            }
        } else {
            let radiano = this._angle * (Math.PI / 180);
            this._x = vx;
            this._y = vy;
            this._x = (Math.cos(radiano) * 8) + this._x;
            this._y = (Math.sin(radiano) * 8) + this._y;
        }
    }
    
    // get Id() {
    //     return this._id;
    // }
    
    increaseAngle() {
        this._angle += 20;
        this._angle %= 370;
    }
}