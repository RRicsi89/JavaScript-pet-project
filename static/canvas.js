const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c.fillStyle = "rgba(255, 100, 0, 0.3)";
// c.fillRect(100, 100, 100, 100);

// Line

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = "pink";
// c.stroke();

// for (let i = 0; i < 15; i++) {
//     const xEnd = Math.random() * window.innerWidth;
//     const yEnd = Math.random() * window.innerHeight;
//     const r = Math.random() * 200;
//     const g = Math.random() * 50;
//     const b = Math.random() * 255;
//
//     c.lineTo(xEnd, yEnd);
//     c.strokeStyle = `rgb(${r}, ${g}, ${b}`;
//     c.stroke();
// }

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.stroke();

// for (let i = 0; i < 50; i++) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     const r = Math.random() * 255;
//     const g = Math.random() * 255;
//     const b = Math.random() * 255;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = `rgb(${r}, ${g}, ${b})`
//     c.stroke();
// }

const mouse = {
    x: undefined,
    y: undefined
}
const maxRadius = 60;

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.fillColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    this.radius = radius;
    this.originalRadius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.stroke();
        c.fillStyle = this.fillColor;
        c.fill();
    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
        }
        if (this.y + this.radius> innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.originalRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}
let circleArray = [];
function init() {
    circleArray = [];
    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 25 + 5;
        let x = Math.random() * (window.innerWidth - 2 * radius) + radius;
        let y = Math.random() * (window.innerHeight - 2 * radius) + radius;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach((circle) => {
        circle.update();
    });
}
init();
animate();