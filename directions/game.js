const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Variables
let player = { x: 300, y: 200, size: 50 };
let currentDirection = "";
let score = 0;

// Directions
const directions = ["left", "right", "up", "down"];

// Draw player
function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Update the instruction for player
function updateInstruction() {
    currentDirection = directions[Math.floor(Math.random() * directions.length)];
    document.getElementById("instructions").innerText = `Move ${currentDirection}!`;
}

// Move the player based on key pressed
function movePlayer(direction) {
    switch (direction) {
        case "left":
            player.x -= 50;
            break;
        case "right":
            player.x += 50;
            break;
        case "up":
            player.y -= 50;
            break;
        case "down":
            player.y += 50;
            break;
    }
    drawPlayer();
}

// Handle user input
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && currentDirection === "left") {
        movePlayer("left");
        score += 10;
    } else if (event.key === "ArrowRight" && currentDirection === "right") {
        movePlayer("right");
        score += 10;
    } else if (event.key === "ArrowUp" && currentDirection === "up") {
        movePlayer("up");
        score += 10;
    } else if (event.key === "ArrowDown" && currentDirection === "down") {
        movePlayer("down");
        score += 10;
    } else {
        score -= 5;  // Penalize for wrong input
    }
    updateInstruction();
});

// Initial Game Setup
drawPlayer();
updateInstruction();

