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
        this.x = this.lampPixels[0].x;
        this.y = this.lampPixels[0].y;
        this.z = this.lampPixels[0].z;
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
        }
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