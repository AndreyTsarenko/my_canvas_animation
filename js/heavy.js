
define(['canvas_animation'], function (CanvasAnimation) {
    var HeavyConstuctor = CanvasAnimation.inheritFromSprite(
        /**
         * Method that create Heavy
         * @param {Object} Properties properties of object
         * @param {String, Array} sprite image or set of images
         */
        function (Properties, sprite) {
        this.updateProperties(Properties);
        this.onOutViewPortHorizontal = function (x) {
            this.x = -this.w;
            this.y =  Math.random() * 300;
            this.speed = Math.random() * 0.05 * 10;
        };
        this.createImageData(this, sprite);
    });
    return HeavyConstuctor;
});