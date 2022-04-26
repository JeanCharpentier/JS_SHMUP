***gamepad :***
dans le load :
window.addEventListener("gamepadconnected", function (e) {
            console.log("Contrôleur n°%d connecté : %s. %d boutons, %d axes.",
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);
            gp = navigator.getGamepads()[0];
            oldAxes = gp.axes[0];
        });


update(dt) {
    if (gp != null) {
        gp = navigator.getGamepads()[0];
        if (gp.axes[0] == 1 && oldAxes[0] != 1) {
            this.keypressed("ArrowRight");
        }
        if (gp.axes[0] == -1 && oldAxes[0] != -1) {
            this.keypressed("ArrowLeft");
        }
        oldAxes = gp.axes;
    }
}


  let joyRight = false;
        let joyLeft = false;
        let joyUp = false;
        let joyDown = false;
        let joyB = false;

        if (gp != null) {
            gp = navigator.getGamepads()[0];
            // droite
            joyRight = gp.axes[0] == 1;
            // gauche
            joyLeft = gp.axes[0] == -1;
            // haut
            joyUp = gp.axes[1] == -1;
            // bas
            joyDown = gp.axes[1] == 1;
            ...