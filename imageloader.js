class ImageLoader{
    constructor() {
        this.lstPaths = [];
        this.lstImages = [];
        this.callback = null;
        this.loadedImageCount = 0;
    }

    add(pPathImage) {
        this.lstPaths.push(pPathImage);
    }

    getTotalImages() {
        return this.lstPaths.length; // Nb d'images enregistrées, PAS CHARGEES !
    }

    getTotalImagesLoaded() {
         return this.loadedImageCount; // Nb d'images chargées
    }

    getListImages() {
        return this.lstImages;
    }

    getLoadedRatio() {
        return this.loadedImageCount / this.getTotalImages;
    }

    start(pCallBack) {
        this.callback = pCallBack;
        this.lstPaths.forEach(path => {
            let img = new Image();
            img.onload = this.imageLoaded.bind(this);
            img.src = path;
            this.lstImages[path] = img; // ???? Pourquoi pas un push ?
        });
    }

    imageLoaded(e) {
        this.loadedImageCount++;
        console.log("img chargée", e.target.currentSrc);
        if(this.loadedImageCount == this.lstPaths.length) {
            this.callback();
        }
    }
}