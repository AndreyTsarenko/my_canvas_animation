/**
 * Created by HoldenCaulfied on 31.07.2014.
 */
define(['canvas_animation', 'heavy'], function (CanvasAnimation, Heavy) {
    var Animation = new CanvasAnimation('my-canvas');
    var Background = new Heavy({x: 0, y: 0, w: 800, h: 600}, 'textures/backgorund.jpg');
    Animation.addObject(Background);
    var i,  CurrentHeavy, str = 'textures/oblako';
    for (i = 0; i < 20; i++) {
        CurrentHeavy = new Heavy({
            x: Math.random() * 1200 - 100,
            y: Math.random() * 800 - 50,
            w: 200 + Math.random() * 200,
            h: 100 + Math.random() * 100,
            min_x: -200,
            max_x: 1000,
            speed:  Math.random() * 0.05 * 10
        }, str + parseInt(Math.random() * 2 + 1) + '.png');
        Animation.addObject(CurrentHeavy);
    }

    Animation.startAnimation();
});