class Bullet extends Sprite {
    constructor(px,py,pVX,pVY,pType,pCurve) {
        let img;
        img = imageLoader.getImage("images/bullets.png");
        super(img,px,py);
        this.setTileSheet(16,16);
        this.curve = pCurve;
        switch (pType) {
            case "PLAYERW":
                this.currentFrame = 0;
                this.friendly = true;
                this.state = 0;
                break;
            case "PLAYERB":
                this.currentFrame = 1;
                this.friendly = true;
                this.state = 1;
                break;
            case "SRINGW":
                this.currentFrame = 7;
                this.friendly = false;
                this.state = 0;
                break;
            case "SRINGB":
                this.currentFrame = 6;
                this.friendly = false;
                this.state = 1;
                break;
            case "BRINGW":
                this.currentFrame = 5;
                this.friendly = false;
                this.state = 0;
                break;
            case "BRINGB":
                this.currentFrame = 4;
                this.friendly = false;
                this.state = 1;
                break;
            case "BOSSW":
                this.currentFrame = 5;
                this.friendly = false;
                this.state = 0;
                break;
            case "BOSSB":
                this.currentFrame = 6;
                this.friendly = false;
                this.state = 1;
                break;
            default:
                console.log("Erreur : Pas de type de bullet");
                break;
        }
        this.type = pType;
        this.vx = pVX;
        this.vy = pVY;

        this.sndExplo1 = imageLoader.getImage("sons/Explosion_02.mp3")
    }

    update(dt) {
        super.update(dt);
        this.vx += this.curve * dt;
        this.x += this.vx;
        this.y += this.vy;
    }

    outOfScreen(pWidth, pHeight) {
        if (this.x + this.tileSize.x < 0 || this.y + this.tileSize.y < 0 || this.x > pWidth || this.y > pHeight) {
            return true;
        } else { return false; }
    }
}

class BulletsManager{
    constructor(pGS) {
        this.lstBullets = [];
        this.pEmitter = null;
        this.gs = pGS;
    }

    clear() {
        this.lstBullets = [];
    }

    shoot(px, py, pAngle, pSpeed, pType, pCurve) {
        let vx, vy;

        if(pType == "BOSSB" || pType == "BOSSW") {
            vx = pSpeed * Math.cos(pAngle);
            vy = pSpeed * Math.sin(pAngle);
        }else {
            vx = 0;
            vy = pSpeed;
        }
        let b = new Bullet(px, py, vx, vy, pType,pCurve);
        this.lstBullets.push(b);
    }

    update(dt) {
        for (let index = this.lstBullets.length - 1; index >= 0; index--) {
            let b = this.lstBullets[index];
            b.update(dt);

            // Collisions
            if(!b.friendly) { // Bullets touchent Joueur
                let boxPlayer = {
                    x: this.gs.player.sprShip.tileSize.x/4,
                    y: this.gs.player.sprShip.tileSize.y/4
                }
                let boxBullet = {
                    x: b.tileSize.x/4,
                    y: b.tileSize.y/4
                }
                if(isColliding(b.x+boxBullet.x,b.y+boxBullet.y,b.tileSize.x-boxBullet.x,b.tileSize.y-boxBullet.y,this.gs.player.x+boxPlayer.x,this.gs.player.y+boxPlayer.y,this.gs.player.sprShip.tileSize.x-boxPlayer.x,this.gs.player.sprShip.tileSize.y-boxPlayer.y)) {
                    this.pEmitter = new ParticleEmitter(this.gs.player.x+(this.gs.player.sprShip.tileSize.x/2),this.gs.player.y+(this.gs.player.sprShip.tileSize.y/2),"black","darkred");
                    this.pEmitter.add(4); 
                    if(!debugSound) {
                        b.sndExplo1.pause();
                        b.sndExplo1.currentTime = 0;
                        b.sndExplo1.play();
                    }

                    if(b.state == this.gs.player.state) { // Si les bullets sont du même type que l'état du joueur, on score + recharge la vie
                        this.lstBullets.splice(index, 1);
                        this.gs.player.score++;
                        document.getElementById("domScore").innerHTML = this.gs.player.score; // Change le score dans l'interface Web
                        if(this.gs.player.sprEnergy.currentFrame < 5){
                            this.gs.player.sprEnergy.currentFrame += 1;
                        }
                    }else { // Sinon le joueur perd de la vie
                        this.lstBullets.splice(index, 1);
                        if(this.gs.player.powerup != "SHIELD"){
                            if(this.gs.player.sprEnergy.currentFrame > 0){
                                this.gs.player.sprEnergy.currentFrame -= 1;
                            }
                            if(this.gs.player.sprEnergy.currentFrame == 0){
                                this.gs.player.sprShip.startAnimation("blink");
    
                                if(this.gs.player.lifes > 0) {
                                    this.gs.player.lifes--;
                                    this.gs.player.sprEnergy.currentFrame = 5;
                                    this.gs.puManager.addPowerup(b.x,b.y,"SHIELD");
                                }else {
                                    this.gs.gamemode = "GO";
                                }
                            }
                        }     
                    }
                }
            }
            
            if(b.friendly) { // Bullets touchent ennemis
                this.gs.wavesManager.wavesList.forEach(w => {
                    for (let n=w.alienList.length-1;n>=0;n--) {
                        if(isColliding(b.x,b.y,b.tileSize.x,b.tileSize.y,w.alienList[n].sprite.x,w.alienList[n].sprite.y,w.alienList[n].sprite.tileSize.x,w.alienList[n].sprite.tileSize.y)) {
                            this.lstBullets.splice(index, 1);
                            if(w.alienList[n].life > 0) {
                                w.alienList[n].life--;
                                this.pEmitter = new ParticleEmitter(b.x+(b.tileSize.x/2),b.y+(b.tileSize.y/2),"#e6007e","orange");
                                this.pEmitter.add(4); 
                            }else { // Kill enemy
                                // Loots
                                let loot = rnd(0,LOOT_RATE);
                                if(loot <= 1) {
                                    this.gs.puManager.addPowerup(b.x,b.y,"QUAD");
                                }
                                
                                // Particules
                                this.pEmitter = new ParticleEmitter(b.x+(b.tileSize.x/2),b.y+(b.tileSize.y/2),"grey","darkgrey");
                                this.pEmitter.add(20);   
                                
                                //Score
                                this.gs.player.score += w.alienList[n].points; // Ajout des points au joueur
                                this.gs.popupManager.addPopup(w.alienList[n].points,this.gs.player.x,this.gs.player.y,0.5);
                                document.getElementById("domScore").innerHTML = this.gs.player.score; // Change le score dans l'interface Web
                                
                                // Suppression de l'ennemi
                                w.alienList.splice(n,1);
                            }
                            
                        }
                    }
                });
            }
            if (b.outOfScreen(canvas.width, canvas.height)) { // Destruction des bullets hors écran
                this.lstBullets.splice(index, 1);
            }
        }
        if(this.pEmitter != null) {
            this.pEmitter.update(dt);
        }
    }

    draw(pCtx) {
        this.lstBullets.forEach(b => {
            b.draw(pCtx);
        });
        if(this.pEmitter != null) {
            this.pEmitter.draw(pCtx);
        }
    }
}