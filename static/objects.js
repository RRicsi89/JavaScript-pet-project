function createWall() {
    bricks = [];
    for (let z = -250; z < 250; z += 10) {
        for (let y = -250; y < 250; y += 10) {
            bricks.push({"x": characterHeight, "y": y, "z": z})
        }
    }
}

function createRoad() {
    roads = [];
    for (let z = -250; z < 250; z += 2) {
        for (let x = -150; x < 150; x += 4) {
            roads.push({"x": x, "y": characterHeight, "z": z});
        }
    }
}

function createRoadEdge() {
    roadEdges = [];
    for (let z = -250; z < 250; z += 1) {
        for (let y = -10; y < 10; y += 4) {
            roadEdges.push({"x": characterHeight, "y": y, "z": z})
        }
    }
}

function createStar() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        let x = Math.random() * innerWidth * 2 - innerWidth;
        let y = Math.random() * innerHeight - 1.5 * innerHeight;
        let z = Math.random() * 1000 - 500;
        stars.push({"x": x, "y": y, "z": z});
    }
}

function Lamp () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.r = 30;
    this.height = 0;
    this.top = 0;
    this.bottom = 0;
    this.lampPixels = [];
    this.lampTops = [];
    this.lampLights = [];

    this.draw = function () {
        for (let j = 0; j < 5; j++) {
            for (let y = -200; y < 200; y += 4) {
                for (let x = -10; x < 10; x += 1) {
                    this.lampPixels.push({"x": x, "y": y, "z": fov + j})
                }
            }
            for (let y = -10; y < 10; y += 1) {
                for (let x = -40; x < 40; x += 3) {
                    this.lampTops.push({"x": x, "y": y, "z": fov + j})
                }
            }
            for (let alfa = 0; alfa < 360; alfa += 1) {
                let x = Math.round(this.r * Math.cos(alfa * Math.PI / 180));
                let z = Math.round(this.r * Math.sin(alfa * Math.PI / 180));
                this.lampLights.push({"x": x, "y": innerHeight / 2, "z": fov + z});
            }
        }
    }

    this.update = function () {
        let lampData = ctx.getImageData(0, 0, w, h);
        let i = this.lampPixels.length;
        while (i--) {
            let lamp = this.lampPixels[i];
            let scale = fov / (fov + lamp["z"]);

            let x2d = (lamp["x"] + xOffset - 240) * scale + xLook + mouse.x;
            if (yOffset > 1) {
                yOffset -= gravity;
            }
            let y2d = (lamp["y"] + yOffset - 150) * scale + yLook + mouse.y;

            if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
                let color = (Math.round(y2d) * lampData.width + Math.round(x2d)) * 4;
                lampData.data[color] = 50;
                lampData.data[color + 1] = 50;
                lampData.data[color + 2] = 60;
                lampData.data[color + 3] = 255;
            }
            lamp.z -= speed;
            if (lamp.z < -fov || lamp.z > fov) {
                this.lampPixels.splice(i, 1);
            }
            if (i === 0) {
                this.x = x2d;
                this.y = y2d;
                this.z = lamp.z;
                this.top = y2d;
            }
            if (i === this.lampPixels.length - 1) {
                this.bottom = y2d;
            }
        }
        this.height = Math.abs(this.top - this.bottom);
        ctx.putImageData(lampData, 0, 0);

        let lampTopData = ctx.getImageData(0, 0, w, h);
        let j = this.lampTops.length;
        while (j--) {
            let lampTop = this.lampTops[j];
            let scale = fov / (fov + lampTop["z"]);

            let x2d = (lampTop["x"] + xOffset - 200) * scale + xLook + mouse.x;
            if (yOffset > 1) {
                yOffset -= gravity;
            }
            let y2d = (lampTop["y"] + yOffset - 350) * scale + yLook + mouse.y;

            if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
                let color = (Math.round(y2d) * lampTopData.width + Math.round(x2d)) * 4;
                lampTopData.data[color] = 50;
                lampTopData.data[color + 1] = 50;
                lampTopData.data[color + 2] = 60;
                lampTopData.data[color + 3] = 255;
            }
            lampTop.z -= speed;
            if (lampTop.z < -fov || lampTop.z > fov) {
                this.lampTops.splice(j, 1);
            }
        }
        ctx.putImageData(lampTopData, 0, 0);

        let lampLightData = ctx.getImageData(0, 0, w, h);
        let k = this.lampLights.length;
        while (k--) {
            let lampLight = this.lampLights[k];
            let scale = fov / (fov + lampLight["z"]);

            let x2d = (lampLight["x"] * 3 + xOffset - 50) * scale + xLook + mouse.x;
            if (yOffset > 1) {
                yOffset -= gravity;
            }
            let y2d = (lampLight["y"] + yOffset - 410) * scale + yLook + mouse.y;

            if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
                let color = (Math.round(y2d) * lampLightData.width + Math.round(x2d)) * 4;
                lampLightData.data[color] = 255;
                lampLightData.data[color + 1] = 255;
                lampLightData.data[color + 2] = 0;
                lampLightData.data[color + 3] = 255;
            }
            lampLight.z -= speed;
            if (lampLight.z < -fov || lampLight.z > fov + 2 * radius) {
                this.lampLights.splice(k, 1);
            }
        }
        ctx.putImageData(lampLightData, 0, 0);
    }
}

class Bullet {
    constructor(mouseX, mouseY) {
        this.x = w / 2;
        this.y = h / 2;
        this.z = -fov;
        this.r = 5;
        this.speed = 10;
        this.bulletsPixels = [];
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.velocityX = (this.x - this.mouseX) * 2;
        this.velocityY = (this.y - this.mouseY) * 2;
    }

    draw() {
        for (let alfa = 0; alfa < 360; alfa += 1) {
            for (let r = 0; r < 3; r += 1) {
                let x = Math.round(r * Math.cos(alfa * Math.PI / 180));
                let y = Math.round(r * Math.sin(alfa * Math.PI / 180));
                this.bulletsPixels.push({"x": x - xOffset, "y": y, "z": -fov});
            }
        }

        for (let alfa = 0; alfa < 360; alfa += 1) {
            for (let r = 0; r < 4; r += 1) {
                let x = Math.round(r * Math.cos(alfa * Math.PI / 180));
                let y = Math.round(r * Math.sin(alfa * Math.PI / 180));
                this.bulletsPixels.push({"x": x - xOffset, "y": y, "z": -fov + 0.1});
            }
        }

        for (let alfa = 0; alfa < 360; alfa += 1) {
            for (let r = 0; r < 5; r += 1) {
                let x = Math.round(r * Math.cos(alfa * Math.PI / 180));
                let y = Math.round(r * Math.sin(alfa * Math.PI / 180));
                this.bulletsPixels.push({"x": x - xOffset, "y": y, "z": -fov + 0.2});
            }
        }

        for (let alfa = 0; alfa < 360; alfa += 1) {
            for (let r = 0; r < 4; r += 1) {
                let x = Math.round(r * Math.cos(alfa * Math.PI / 180));
                let y = Math.round(r * Math.sin(alfa * Math.PI / 180));
                this.bulletsPixels.push({"x": x - xOffset, "y": y, "z": -fov + 0.3});
            }
        }

        for (let alfa = 0; alfa < 360; alfa += 1) {
            for (let r = 0; r < 3; r += 1) {
                let x = Math.round(r * Math.cos(alfa * Math.PI / 180));
                let y = Math.round(r * Math.sin(alfa * Math.PI / 180));
                this.bulletsPixels.push({"x": x - xOffset, "y": y, "z": -fov + 0.4});
            }
        }
    }

    update() {
        let bulletData = ctx.getImageData(0, 0, w, h);
        let i = this.bulletsPixels.length;
        while (i--) {
            let bullet = this.bulletsPixels[i];
            let scale = fov / (fov + bullet["z"]);

            let x2d = (bullet["x"] + xOffset) * scale + xLook + mouse.x - this.velocityX;
            if (yOffset > 1) {
                yOffset -= gravity;
            }
            let y2d = (bullet["y"] + 100 + yOffset) * scale + yLook + mouse.y - this.velocityY;

            if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
                let color = (Math.round(y2d) * bulletData.width + Math.round(x2d)) * 4;
                bulletData.data[color] = 255;
                bulletData.data[color + 1] = 0;
                bulletData.data[color + 2] = 0;
                bulletData.data[color + 3] = 255;
            }
            bullet.z += this.speed;
            if (bullet.z > 2 * fov) {
                this.bulletsPixels.splice(i, 1);
            }
            if (i === this.bulletsPixels.length - 1) {
                this.x = x2d;
                this.y = y2d;
                this.z = bullet.z;
            }
        }
        ctx.putImageData(bulletData, 0, 0);
    }
}

class Spark {
    constructor(x, y, dx, dy, gravity, floor) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.originalXoffset = xOffset;
        this.originalYoffset = yOffset;
        this.originalXlook = mouse.x;
        this.originalYlook = mouse.y;
        this.dx = dx;
        this.dy = dy;
        this.radius = 1;
        this.g = gravity;
        this.floor = floor;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.fillStyle = "yellow";
        ctx.fill();
    }

    update() {
        if (this.originalY >= this.floor){
            this.y = this.originalY + (mouse.y - this.originalYlook);
            if (this.dx >= 0) {
                this.dx -= 0.2;
                this.x = (this.originalX + (mouse.x - this.originalXlook)) + (xOffset - this.originalXoffset);
                this.originalX -= this.dx;
            } else {
                this.dx += 0.2;
                this.x = (this.originalX + (mouse.x - this.originalXlook)) + (xOffset - this.originalXoffset);
                this.originalX -= this.dx;
            }

        } else {
            this.y = this.originalY + (mouse.y - this.originalYlook);
            this.originalY -= this.dy;
            this.dy -= this.g;
            this.x = (this.originalX + (mouse.x - this.originalXlook)) + (xOffset - this.originalXoffset);
            this.originalX -= this.dx;
        }
        this.draw();
    }
}