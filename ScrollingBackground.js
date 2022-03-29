class ScrollingBackground {
    constructor(pImg) {
        this.speed = 0;
        this.y = 0;
        this.image = pImg;
        this.distance = this.image.height;
    }

    update(dt) {
        this.y += this.speed;
        this.distance += this.speed;
        if (this.y >= this.image.height) {
            this.y = 0-this.image.height;
        }
    }

    draw(pCtx) {
        pCtx.drawImage(this.image, 0, this.y);
        pCtx.drawImage(this.image, 0, this.y - this.image.height);
        pCtx.drawImage(this.image, 0, this.y + this.image.height);
    }
}