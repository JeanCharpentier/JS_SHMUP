class Menu {
    constructor(pGS){
        this.gs = pGS;

        this.buttons = [];
        this.index = 0;

        let imgButton = imageLoader.getImage("images/buttons.png");
        this.sprButton = new Sprite(imgButton,0,0);
        this.sprButton.setTileSheet(128,32);
        this.sprButton.currentFrame = 0;
    }

    addButton(pText,pGamemode){
        let b = [];
        b.x = 0;
        b.y = 0;
        b.text = pText;
        b.mode = pGamemode;
        b.selected = false;
        this.buttons.push(b);
    }

    update(dt){

    }

    draw(pCtx){
        pCtx.fillStyle = "#D04648";
        pCtx.font = "normal "+16+"pt Arial";
        for(let i=0;i<this.buttons.length;i++){
            if(i == this.index){
                pCtx.fillStyle = "#D04648";
                this.sprButton.currentFrame = 1;
            }else {
                pCtx.fillStyle = "#6DC2CA";
                this.sprButton.currentFrame = 0;
            }
            this.sprButton.x = (canvas.width/SCALE)/2 - (this.sprButton.tileSize.x/2);
            this.sprButton.y = (canvas.width/SCALE)/2+(i*this.sprButton.tileSize.y);
            this.sprButton.draw(pCtx);
            pCtx.fillText(this.buttons[i].text,this.sprButton.x+8,this.sprButton.y+24);
        }
    }
}