class ennemi {
    constructor(lx,ly) {
        this.x = lx;
        this.y = ly;
        this.energie = 100
    }

    hit(nbPoints) {
        this.energie -= nbPoints;
        console.log("Pts de vie : "+ this.energie)
    }
}