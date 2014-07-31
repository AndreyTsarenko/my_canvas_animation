/**
 * @param id
 * @constructor
 */
var CanvasAnimation = function (id) {
    var canvas = document.getElementById(id),
        WorldObjects = {
            InteractiveObjects: []
        },
        requestAnimFrame = (function(){
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(/* function */ callback, /* DOMElement */ element){
                    window.setTimeout(callback, 1000 / 60);
                };
        })(),
        ctx = canvas.getContext('2d'),
        animation = false,
        /**
         * Method that draws objects
         */
        renderFunction = function () {
            var i, len;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (i = 0, len = WorldObjects.InteractiveObjects.length; i < len; i++) {
                WorldObjects.InteractiveObjects[i].draw(ctx);
            }
        },
        /**
         * Method that update world
         */
        updateFunction = function () {
            var i, len;
            for (i = 0, len = WorldObjects.InteractiveObjects.length; i < len; i++) {
                WorldObjects.InteractiveObjects[i].x += WorldObjects.InteractiveObjects[i].speed;
                WorldObjects.InteractiveObjects[i].checkOutViewPortHorizontal();
            }
        },
        /**
         * Method that start animation loop
         */
        animationCircle = function () {
            renderFunction();
            if (animation) {
                requestAnimFrame(animationCircle, canvas);
            }
            updateFunction();
        };
    /**
     * Method that starts animation
     */
    this.startAnimation = function () {
        animation = true;
        debugger;
        animationCircle();
    };
    /**
     * Method that stops animataion
     */
    this.stopAnimation = function () {
        animation = animation;
    };
    /**
     * Method that add object into the world
     * @param {Object} DRAW_OBJECT
     * @param {string} [type] type of object
     */
    this.addObject = function (DRAW_OBJECT, type) {
        type = type || 'InteractiveObjects';
        WorldObjects[type].push(DRAW_OBJECT);
    };
};
(function () {
    /**
     * Canvas that create Object on canvas
     * @constructor
     */
    var WorldObject =  function () {
        //object view port
        this.min_x = -999999999999999999999999;
        this.max_x = 9999999999999999999999999;
        //
        this.speed = 0;
        //
        /**
         * Method that sets properties for world objects
         * @param {Object} Properties
         */
        this.updateProperties = function (Properties) {
            var key;
            for (key in Properties) {
                this[key] = Properties[key];
            }
        };
        /**
         *
         * @param _this
         * @param sprite
         */
        this.createImageData = function (_this, sprite) {
            var ImageObject = new Image();
            ImageObject.onload = function() {
                _this.ImageData = ImageObject;
            };
            ImageObject.src = sprite;
        };
        /**
         * Method that fired when element out form view port in horizontal
         * @param x
         */
        this.onOutViewPortHorizontal = function (x) {};
        /**
         *
         */
        this.checkOutViewPortHorizontal = function () {
            if (this.min_x > this.x + this.w || this.max_x < this.x) {
                debugger;
                this.onOutViewPortHorizontal(this.x);
            }
        };

    };
    /**
     * Abstract class. Provides drawing image feature
     * @constructor
     */
    var DrawSprite = function () {
        /**
         * Method that draw object on canvas
         * @param {Object} ctx canvas context
         */
        this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.ImageData = null;
        this.draw = function (ctx) {
            if (this.ImageData) {
                ctx.drawImage(this.ImageData, this.x, this.y, this.w, this.h);
            }
        };
    };
    /**
     * Method that create
     * @param Constructor
     * @param Canvas
     * @returns {*}
     */
    CanvasAnimation.inheritFromSprite = function (Constructor) {
        WorldObject.prototype = new DrawSprite();
        Constructor.prototype = new WorldObject();
        return Constructor;
    };
})();
define([], function () {
    return CanvasAnimation;
});