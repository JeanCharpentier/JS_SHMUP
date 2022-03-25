class ImageLoader{
    constructor() {
        this.lstPaths = []; // Infos de base des images
        this.lstImages = []; // Liste des images chargées
        this.callback = null;
        this.loadedImageCount = 0; // Nb d'images chargées
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

    getImage(pPath) {
        return this.lstImages[pPath];
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