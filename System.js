function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawParticles(pCtx,pX,pY,pRadius,pColor="white",pBorder="white") {
    pCtx.beginPath();
        pCtx.strokeStyle = pBorder;
        pCtx.arc(pX,pY,pRadius,0,2*Math.PI);
        pCtx.fillStyle = pColor;
        pCtx.fill();
        pCtx.stroke();
}