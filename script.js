const canvas = document.getElementById('kuromiCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load Kuromi image
const kuromi = new Image();
kuromi.src = 'https://i.imgur.com/8j9HsZT.png'; // Replace with your own Kuromi image URL

const flowers = [];

// Flower class
class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 30 + 10;
        this.opacity = 1;
        this.growth = 0.5;
        this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update() {
        this.size += this.growth;
        this.opacity -= 0.01;
        if (this.opacity <= 0) {
            this.opacity = 0;
        }
    }

    isFaded() {
        return this.opacity <= 0;
    }
}

// Add flower
function addFlower(x, y) {
    flowers.push(new Flower(x, y));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Kuromi
    const kuromiX = canvas.width / 2 - 100;
    const kuromiY = canvas.height / 2 - 100;
    ctx.drawImage(kuromi, kuromiX, kuromiY, 200, 200);

    // Update and draw flowers
    for (let i = flowers.length - 1; i >= 0; i--) {
        const flower = flowers[i];
        flower.draw();
        flower.update();
        if (flower.isFaded()) {
            flowers.splice(i, 1); // Remove faded flowers
        }
    }

    requestAnimationFrame(animate);
}

// Event listener for interaction
canvas.addEventListener('click', (e) => {
    addFlower(e.clientX, e.clientY);
});

// Resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation when Kuromi is loaded
kuromi.onload = () => {
    animate();
};
