
class ImageLoader {
    constructor() {
        this.lstPaths = [];
        this.lstImages = [];
        this.callBack = null;
        this.loadedImageCount = 0;
    }

    add(pPathImage) {
        this.lstPaths.push(pPathImage);
    }

    getTotalImages() {
        return this.lstPaths.length;
    }

    getTotalImagesLoaded() {
        return this.loadedImageCount;
    }

    getLoadedRatio() {
        return this.loadedImageCount / this.getTotalImages();
    }

    getListImages() {
        return this.lstImages;
    }

    start(pCallBack) {
        this.callBack = pCallBack;
        let img;
        this.lstPaths.forEach(path => {
            let ext = getExtension(path);
            if(ext == "png") {
                img = new Image();
                img.onload = this.imageLoaded.bind(this); // Quand l'image est chargée
            }else {
                img = new Audio();
                img.oncanplaythrough = this.imageLoaded.bind(this);
                console.warn("AUdio chargé");
            }         
            
            img.src = path;
            this.lstImages[path] = img;
        });
    }

    imageLoaded(e) {
        this.loadedImageCount++;
        console.log("Ressource chargée : ", e.target.currentSrc);
        if (this.loadedImageCount == this.lstPaths.length) {
            console.log("Tout a été chargé !");
            this.callBack();
        }
    }

    getImage(pPath) {
        return this.lstImages[pPath];
    }
}
