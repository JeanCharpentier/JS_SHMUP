class Menu {
    constructor(pGS){
        this.gs = pGS;

        this.buttons = [];
        this.index = 0;
    }

    addButton(pText,pGamemode){
        let b = [];
        b.text = pText;
        b.mode = pGamemode;
        b.selected = false;
        this.buttons.push(b);
    }

    update(dt){

    }

    draw(pCtx){
        pCtx.fillStyle = "Red";
        pCtx.font = "normal "+16+"pt Arial";
        for(let i=0;i<this.buttons.length;i++){
            if(i == this.index){
                pCtx.fillStyle = "Orange";
            }else {
                pCtx.fillStyle = "Red";
            }
            pCtx.fillText(this.buttons[i].text,10,150+(i*20));
        }
    }
}