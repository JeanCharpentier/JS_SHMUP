class SceneMenu {
    constructor(pGS){
        this.gs = pGS;
    }

    update(dt){

    }

    draw(pCtx){
        pCtx.fillStyle = "Red";
        pCtx.font = "normal "+16+"pt Arial";
        pCtx.fillText("MENU", 50, 50);
    }
}