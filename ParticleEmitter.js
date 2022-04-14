class Particle {
    constructor(px,py) {
        this.x = px;
        this.y = py;
        this.life = rnd(50,100)/100;
        var angle = Math.random() * (2*Math.PI);
        this.vx = (rnd(1,20) / 10) * Math.cos(angle);
        this.vy = (rnd(1,20) / 10) * Math.sin(angle);
        this.radius = rnd(0.5,1);
    }

    drawParticles(pCtx,pX,pY,pRadius,pColor="white",pBorder="white") {
        pCtx.beginPath();
        pCtx.strokeStyle = pBorder;
        pCtx.arc(pX,pY,pRadius,0,2*Math.PI);
        pCtx.fillStyle = pColor;
        pCtx.fill();
        pCtx.stroke();
    }

    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= dt;
    }

    draw(pCtx,pInner,pOutter) {
        this.drawParticles(pCtx,this.x,this.y,this.radius,pInner,pOutter);
    }
}

class ParticleEmitter {
    constructor(px,py,pInner,pOutter) {
        this.lstParticles = [];
        this.x = px;
        this.y = py;
        this.inner = pInner;
        this.outter = pOutter;
    }

    add(pNbParts) {
        for(let i=0;i<=pNbParts;i++) {
            var p = new Particle(this.x + rnd(-5,5), this.y + rnd(-5,5));
            this.lstParticles.push(p);
        }
        
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
            p.draw(pCtx,this.inner,this.outter);
        });
    }
}