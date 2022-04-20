class Popup{
    constructor(pText,pX,pY,pTime) {
        this.text = pText;
        this.x = pX;
        this.y = pY;

        this.timer = pTime;
        this.chrono = pTime;
    }

    update(dt) {
        if(this.timer >= 0) {
            this.timer -= dt;
        }
        this.y -= dt*60;
    }

    draw(pCtx) {
        pCtx.fillStyle = "White";
        pCtx.font = "normal "+16/SCALE+"pt Arial";
        pCtx.fillText(this.text, this.x, this.y);
    }
}

class PopupManager{
    constructor() {
        this.popupList = [];
    }

    addPopup(pText,pX,pY,pTime) {
        let popup = new Popup(pText,pX,pY,pTime);
        this.popupList.push(popup);
    }

    update(dt) {
        for(let n=this.popupList.length-1;n>=0;n--) {
            this.popupList[n].update(dt);
            if(this.popupList[n].timer <= 0) {
                this.popupList.splice(n,1);
            }
        }
    }

    draw(pCtx) {
        this.popupList.forEach(p => {
            p.draw(pCtx);
        })
    }
}