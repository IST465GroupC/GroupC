﻿

var targetX = 0, targetY = 0, shots = 0, hits = 0, accuracy = 0;

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Thing(mapX, mapY, x, y, canvas) {
    this.x = x;
    this.y = y;
    this.mapX = mapX;
    this.mapY = mapY;
    this.height = 50;
    this.width = 50;
    this.direction = Math.floor((Math.random() * 359));
    this.speed = Math.floor((Math.random() * 50) + 5);
    this.canvas = canvas;
    this.erratic = (Math.floor((Math.random() * 4) + 1) === 1);
    this.gravitationalPull = 0;
    this.tick = 0;
    this.changeAt = Math.floor((Math.random() * 50) + 1);
    this.hit = false;
};

Thing.prototype.draw = function (ctx, sprite) {

    if (this.hit === false) {

        ctx.drawImage(sprite, this.getMapX(), this.getMapY(),
		    90, 90,
		    this.getX(), this.getY(),
		    this.getWidth(), this.getHeight());
    }

    return this;
};

Thing.prototype.move = function () {

    var delta = 0.2;

    this.x += Math.cos(this.toRad(this.direction)) * delta * this.speed;
    this.y -= Math.sin(this.toRad(this.direction)) * delta * this.speed;

    this.direction += this.gravitationalPull;

    if (this.direction < 0) {
        this.direction += 360;
    } else if (this.direction > 360) {
        this.direction -= 360;
    }

    this.tick++;

    if (this.tick > this.changeAt) {
        this.tick = 0;
        this.gravitationalPull = Math.floor((Math.random() * 6));

        if (this.erratic) {
            this.direction = Math.floor((Math.random() * 359));
            this.speed = Math.floor((Math.random() * 50) + 5);
        }
    }
};

Thing.prototype.toRad = function (v) {
    return v * Math.PI / 180;
};

Thing.prototype.checkBoundaryCollision = function () {

    if (this.x + this.width > this.canvas.width ||
    this.x < 0) {
        this.direction = 2 * 0 - this.direction - 180;
    } else if (this.y < 0 ||
    this.y + this.height > this.canvas.height) {
        this.direction = 2 * 90 - this.direction - 180;
    }
};

Thing.prototype.correctXY = function () {

    if (this.x + this.width >= this.canvas.width) {
        this.x = this.canvas.width - this.width;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.y + this.height >= this.canvas.height) {
        this.y = this.canvas.height - this.height;
    }
};

Thing.prototype.getX = function () {
    return this.x;
};

Thing.prototype.getY = function () {
    return this.y;
};

Thing.prototype.getMapX = function () {
    return this.mapX;
};

Thing.prototype.getMapY = function () {
    return this.mapY;
};

Thing.prototype.getWidth = function () {
    return this.width;
};

Thing.prototype.getHeight = function () {
    return this.height;
};

Thing.prototype.setHit = function () {
    this.hit = true;
};

Thing.prototype.getHit = function () {
    return this.hit;
};

function Explosion(x, y, audio) {

    this.x = x;
    this.y = y;
    this.drawing = true;
    this.explosionFrame = 15;
    this.width = 200;
    this.height = 200;

    audio.play();

};

Explosion.prototype.getDrawing = function () {

    return this.drawing;

};

Explosion.prototype.checkHits = function (things) {

    if (this.drawing === false) {
        return 0;
    }

    var centreX = (this.x - 100) + (this.width / 2),
    centreY = (this.y - 90) + (this.height / 2),
    hits = 0;

    for (i = 0; i < things.length; i++) {

        if (centreX > things[i].getX() &&
		    centreX < things[i].getX() + things[i].getWidth() &&
		    centreY > things[i].getY() &&
		    centreY < things[i].getY() + things[i].getHeight() &&
		    things[i].getHit() === false) {

            things[i].setHit();

            hits++;

        }
    }

    return hits;
};

Explosion.prototype.draw = function (ctx, explosion) {

    if (this.drawing === false) {
        return this;
    }

    try {

        if (this.explosionFrame-- <= 0) {
            this.drawing = false;
        }

        //Draw explostion
        ctx.drawImage(explosion, ((this.explosionFrame % 10) - 1) * 65, 0,
		    65, 65,
		    this.x - 100, this.y - 90,
		    this.width, this.height);

    }
    catch (e) {

    }
    return this;

};



var explosions = [], ctx, canvas, sprites = [], sprite = null;

function loadSprite() {

    sprite = new Image();
    sprite.src = 'Images/sprite.png';

    target = new Image();
    target.src = 'target.gif';

    explosion = new Image();
    explosion.src = 'explosion.png';

}

function createThings() {

    var i;

    spriteMap = [
    [0, 120], [140, 120], [270, 120], [270, 250],
    [400, 120], [400, 250], [530, 250], [530, 120]
    ];

    for (i = 0; i < 10; i++) {
        sprites.push(createThing(spriteMap));
    }
}

function createThing(spriteMap) {

    var cur, map = spriteMap[Math.floor(Math.random() *
            (spriteMap.length - 1))];

    cur = new Thing(
    map[0],
    map[1],
    Math.floor((Math.random() * canvas.width) + 1),
    Math.floor((Math.random() * canvas.height) + 1),
    canvas
    );

    return cur;
}

function init() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.onmousemove = moveTarget;
    canvas.onclick = fire;
    resizeCanvas();
    loadSprite();
    createThings();
}

function clearCanvas() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function start() {

    clearCanvas();

    for (i = 0; i < sprites.length; i++) {
        sprites[i].draw(ctx, sprite).move();
        sprites[i].checkBoundaryCollision();
        sprites[i].correctXY();
    }


    for (i = 0; i < explosions.length; i++) {
        explosions[i].draw(ctx, explosion);
        hits += explosions[i].checkHits(sprites);
    }

    if (shots > 0) {
        accuracy = Math.round((hits / shots) * 100);
    }

    ctx.fillStyle = "#cfcfcf";
    ctx.font = "bold 16pt Arial";
    ctx.fillText("Shots: " + shots + " Hits: " + hits +
        " Accuracy: " + accuracy + "%", 10, 30);

    //Draw target
    ctx.drawImage(target, 0, 0, 512, 512,
    targetX - 50, targetY - 50,
    100, 100);

    requestAnimFrame(start);

}

function resizeCanvas() {

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

}

function fixPageXY(e) {

    if (e.pageX === null && e.clientX !== null) {

        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
        e.pageX -= html.clientLeft || 0;

        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
        e.pageY -= html.clientTop || 0;
    }
}

function moveTarget(e) {

    e = e || window.event;
    fixPageXY(e);
    targetX = e.pageX;
    targetY = e.pageY;

}

function fire() {

    explosions.push(new Explosion(targetX, targetY, new Audio('bang.wav')));
    shots++;
}

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

// Start the process
window.onload = function () {
    init();
    start();
};

