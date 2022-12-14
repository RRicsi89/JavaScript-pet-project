const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fov = 250;
const strafeSpeed = 6;
const edge = 260;
const gravity = 0.0003;
const characterHeight = 50;
const radius = 30

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let pixels = [];
let bricks = [];
let roads = [];
let roadEdges = [];
let stars = [];
let speed = 0;
let distance = 0;
let lastKey;
let direction;
let lamps = [];
let bullets = [];
let shot = false;
let sparks = [];

let mouse = {
    x: 0,
    y: 0
}
const keys = {
    "w": {"pressed": false},
    "s": {"pressed": false},
    "a": {"pressed": false},
    "d": {"pressed": false},
}
let xLook = w / 2;
let yLook = h / 2;
let xOffset = 0;
let yOffset = 0;

window.addEventListener("resize", function () {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    init();
})

window.addEventListener("mousemove", function (event) {
    mouse.x = innerWidth / 2 - event.x;
    mouse.y = innerHeight / 2 - event.y;
})

window.addEventListener("keydown", movement);

window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
    if (event.key === "r") {
        location.reload();
    }
})

window.addEventListener("click", (event) => {
    if (shot === false) {
        shot = true;
        let bullet = new Bullet(event.clientX, event.clientY);
        bullet.draw();
        bullets.unshift(bullet);
        setTimeout(() => {
            shot = false;
        }, 1000);
    }
})

function movement (event) {
    switch (event.key) {
        case "w":
            keys.w.pressed = true;
            direction = "w";
            break;
        case "s":
            keys.s.pressed = true;
            direction = "s";
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "d":
            keys.d.pressed = true;
            lastKey = "d";
            break;
    }
    if (event.key === " ") {
        if (yOffset < 1) {
            yOffset += 50;
        }
    }
    if (event.key === "f") {
        console.log(mouse.x, ":", mouse.y);
    }
}

function render () {
    ctx.clearRect(0, 0, w, h)
    moveCharacter();
    moveWall();
    moveRoad();
    moveRoadEdge();
    moveStar();

    let len = lamps.length;
    if (len > 0) {
        for (let i = 0; i < len; i++) {
            lamps[i].update();
            if (lamps[i].lampPixels.length === 0) {
                lamps.splice(i, 1);
            }
        }
    }

    if (bullets.length > 0) {
        let len = bullets.length;
        bullet: for (let i = 0; i < len; i++ ) {
            bullets[i].update();
            if (lamps.length > 0) {
                for (let l = 0; l < lamps.length; l++) {
                    if (bullets[i].x - bullets[i].r / 2 > lamps[l].x - 10 && bullets[i].x - bullets[i].r / 2 < lamps[l].x + 30
                        && bullets[i].y - bullets[i].r / 2 > Math.abs(lamps[l].y) && bullets[i].y - bullets[i].r / 2 < Math.abs(lamps[l].y + 400)
                        && Math.round(bullets[i].z) === Math.round(lamps[l].z) + (10 - Math.round(lamps[l].z % 10))) {
                        let floor = lamps[l].bottom;
                        for (let i = 0; i < 300; i++) {
                            let x = lamps[l].x;
                            let y = Math.random() * (lamps[l].height + 1) + lamps[l].top;
                            let dx = Math.random() * 10 - 5;
                            let dy = Math.random() * 50 - 25;
                            sparks.push(new Spark(x, y, dx, dy, 3, floor));
                        }
                        console.log(sparks);
                        lamps.splice(l, 1);
                        bullets.splice(i, 1);
                        continue bullet;
                    }
                }
            }
            if (bullets[i].bulletsPixels.length === 0) {
                bullets.splice(i, 1);
            }
        }
    }
    let sparkLength = sparks.length;
    if (sparkLength > 0) {
        for (let i = sparkLength - 1; i >= 0; i--) {
            sparks[i].update();
            if (Math.floor(sparks[i].dx) === 0) {
                sparks.splice(i, 1);
            }
        }
    }
}

function init () {
    pixels = [];
    for (let z = -250; z < 250; z += 2) {
        for (let x = -250; x < 250; x += 4) {
            pixels.push({"x": x, "y": characterHeight, "z": z});
        }
    }
    createWall();
    createRoad();
    createRoadEdge();
    createStar();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    render();
    if (Math.round(distance) % 40 === 0 && direction === "w") {
        distance++;
        let lamp = new Lamp();
        lamp.draw();
        lamps.unshift(lamp);
    }

    speed = 0;
    if (keys.w.pressed) {
        speed = 2.5;
    } else if (keys.s.pressed) {
        speed = -2.5;
    }
    if (keys.a.pressed && lastKey === "a") {
        xOffset += strafeSpeed;
    } else if (keys.d.pressed && lastKey === "d") {
        xOffset -= strafeSpeed;
    }
}

init();
animate();

