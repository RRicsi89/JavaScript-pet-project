function moveCharacter() {
    let imageData = ctx.getImageData(0, 0, w, h);

    let i = pixels.length;

    while (i--) {
        let pixel = pixels[i];
        let scale = fov / (fov + pixel["z"]);

        if (xOffset < -edge) {
            yOffset -= gravity;
            window.removeEventListener("keydown", movement);
        }
        if (xOffset > edge + 300) {
            yOffset -= gravity;
            window.removeEventListener("keydown", movement);
        } else if (xOffset > edge) {
            yOffset = -25;
        }

        let x2d = (pixel["x"] + xOffset) * scale + xLook + mouse.x;
        if (yOffset > 1) {
            yOffset -= gravity;
        }
        let y2d = (pixel["y"] + yOffset) * scale + yLook + mouse.y;

        if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
            let color = (Math.round(y2d) * imageData.width + Math.round(x2d)) * 4;
            imageData.data[color] = 0;
            imageData.data[color + 1] = 255;
            imageData.data[color + 2] = 60;
            imageData.data[color + 3] = 255;
        }
        pixel.z -= speed;
        distance += ((speed / 500) / 1000);
        if (pixel.z < -fov) pixel.z += 2 * fov;
        if (pixel.z > fov) pixel.z -= 2 * fov;
    }
    ctx.putImageData(imageData, 0, 0);
}

function moveWall() {
    let wallData = ctx.getImageData(0, 0, w, h);
    let i = bricks.length;
    while (i--) {
        let brick = bricks[i];
        let scale = fov / (fov + brick["z"]);
        let x2d = (brick["x"] + xOffset + 250) * scale + xLook + mouse.x;
        if (yOffset > 1) {
            yOffset -= gravity;
        }
        let y2d = ((brick["y"] + yOffset - 170) * scale + yLook - 10 + mouse.y);

        if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
            let color = (Math.round(y2d) * wallData.width + Math.round(x2d)) * 4;
            wallData.data[color] = 255;
            wallData.data[color + 1] = 0;
            wallData.data[color + 2] = 60;
            wallData.data[color + 3] = 255;
        }
        brick.z -= speed;
        if (brick.z < -fov) brick.z += 2 * fov;
        if (brick.z > fov) brick.z -= 2 * fov;
    }
    ctx.putImageData(wallData, 0, 0);
}

function moveRoad() {
    let roadData = ctx.getImageData(0, 0, w, h);
    let i = roads.length;
    while (i--) {
        let road = roads[i];
        let scale = fov / (fov + road["z"]);
        let x2d = (road["x"] + xOffset - 400) * scale + xLook + mouse.x;
        if (yOffset > 1) {
            yOffset -= gravity;
        }
        let y2d = ((road["y"] + yOffset + 20) * scale + yLook + mouse.y);

        if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
            let color = (Math.round(y2d) * roadData.width + Math.round(x2d)) * 4;
            roadData.data[color] = 0;
            roadData.data[color + 1] = 255;
            roadData.data[color + 2] = 100;
            roadData.data[color + 3] = 255;
        }
        road.z -= speed;
        if (road.z < -fov) road.z += 2 * fov;
        if (road.z > fov) road.z -= 2 * fov;
    }
    ctx.putImageData(roadData, 0, 0);
}

function moveRoadEdge() {
    let edgeData = ctx.getImageData(0, 0, w, h);
    let i = roadEdges.length;
    while (i--) {
        let roadEdge = roadEdges[i];
        let scale = fov / (fov + roadEdge["z"]);
        let x2d = (roadEdge["x"] + xOffset - 300) * scale + xLook + mouse.x;
        if (yOffset > 1) {
            yOffset -= gravity;
        }
        let y2d = ((roadEdge["y"] + yOffset + 60) * scale + yLook + mouse.y);

        if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
            let color = (Math.round(y2d) * edgeData.width + Math.round(x2d)) * 4;
            edgeData.data[color] = 0;
            edgeData.data[color + 1] = 255;
            edgeData.data[color + 2] = 60;
            edgeData.data[color + 3] = 255;
        }
        roadEdge.z -= speed;
        if (roadEdge.z < -fov) roadEdge.z += 2 * fov;
        if (roadEdge.z > fov) roadEdge.z -= 2 * fov;
    }
    ctx.putImageData(edgeData, 0, 0);
}

function moveStar() {
    let starData = ctx.getImageData(0, 0, w, h);
    let i = stars.length;
    while (i--) {
        let star = stars[i];
        let scale = (fov - 100) / (fov + star["z"]);
        star["y"] -= gravity;

        let x2d = (star["x"] + xOffset / 10) * scale + xLook + mouse.x;
        if (yOffset > 1) {
            yOffset -= gravity;
        }
        let y2d = ((star["y"] + yOffset) * scale + yLook + mouse.y);

        if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
            let color = (Math.round(y2d) * starData.width + Math.round(x2d)) * 4;
            starData.data[color] = 255;
            starData.data[color + 1] = 255;
            starData.data[color + 2] = 255;
            starData.data[color + 3] = 255;
        }
        star.z -= speed / 10;
        if (star.z < -fov) star.z += 2 * fov;
        if (star.z > fov) star.z -= 2 * fov;
    }
    ctx.putImageData(starData, 0, 0);
}