class Particle {
    constructor(px,py) {
        this.x = px;
        this.y = py;
        this.life = rnd(50,100)/100;
        var angle = Math.random() * (2*Math.PI);
        this.vx = (rnd(1,20) / 10) * Math.cos(angle);
        this.vy = (rnd(1,20) / 10) * Math.sin(angle);
        this.radius = rnd(1,3);
    }

    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= dt;
    }

    draw(pCtx) {
        drawParticles(pCtx,this.x,this.y,this.radius,"orange");
    }
}

class ParticleEmitter {
    constructor(px,py) {
        this.lstParticles = [];
        this.x = px;
        this.y = py;
    }

    add() {
        var p = new Particle(this.x + rnd(-5,5), this.y + rnd(-5,5));
        this.lstParticles.push(p);
    }

    update(dt) {
        for (var index=this.lstParticles.length - 1;index>=0;index--) {
            var p = this.lstParticles[index];
            p.update(dt);
            if(p.life <= 0) {
                this.lstParticles.splice(index, 1);
            }
        }
    }

    draw(pCtx) {
        this.lstParticles.forEach(p => {
            p.draw(pCtx);
        });
    }
}