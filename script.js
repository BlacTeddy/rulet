// define canvas
const canvas = document.getElementById("rouletteCanvas");
const ctx = canvas.getContext("2d");
/*define Values in wheel */

const segments = [
    { value: "100", color: "#FFD700" },
    { value: "200", color: "#FF8C00" },
    { value: "300", color: "#8A2BE2" },
    { value: "400", color: "#32CD32" },
    { value: "500", color: "#FF69B4" },
    { value: "600", color: "#00BFFF" },
    { value: "700", color: "#FF4500" },
    { value: "800", color: "#8FBC8F" }
  ];

/* Size of canvas:*/
canvas.width = 500;
canvas.height = 500;// <--- key value
/* Making the canvas dynamic */
const centerX = canvas.width / 2; // Keeps wheel center of canvas
const centerY = canvas.height / 2; // Keeps wheel center of canvas
const wheelRadius = canvas.height/2.22;
/*Define Segments*/
const numSections = 8; // Define number of segments <--- key value
const angleStep = (Math.PI * 2) / numSections; // Angle per section
// drawing in the canvas
ctx.fillStyle = "white";
// ctx.fillRect(0, 0, canvas.width,canvas.height); // Draw a test rectangle

/* Draw the roulette wheel*/
function drawWheel(){
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, wheelRadius+20, 0, Math.PI * 2); // Centered dynamically (x, y, radius, start angle, end angle)
    ctx.fillStyle = "#bf0555"; // Customizable wheel color
    ctx.fill(); //draws fills
    /* wheel border:*/
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke(); // draws line border
}

/*Loop to make segment */
function drawSegment(){
    for (let i = 0; i < numSections; i++) {
        console.log("Drawing section:", i); // Logs current section number
        ctx.beginPath();
        ctx.moveTo(centerX, centerY); // Start at the center
        ctx.arc(centerX, centerY, wheelRadius, i * angleStep, (i + 1) * angleStep);
        ctx.fillStyle = i % 2 === 0 ? "#FFD700" : "#FF8C00" ; // Alternating colors
        ctx.fill();
        ctx.strokeStyle = "gray";
        ctx.stroke();
    }
}
/*Define indicator*/
function drawIndicator(){
// indicator gradient
    const gradientInd = ctx.createLinearGradient(centerX - 15, centerY - wheelRadius - 40, centerX + 5, centerY - wheelRadius - 20);
    gradientInd.addColorStop(0, "green"); // Dark edge
    gradientInd.addColorStop(0.5, "#555"); // Mid-tone
    gradientInd.addColorStop(1, "green"); // Light highlight
    ctx.fillStyle = gradientInd; // Apply gradient for depth effect
// //indicator shadow
    ctx.shadowColor = "rgba(0, 0, 0, .75)"; // Soft black shadow
    ctx.shadowBlur = 9; // Blurry edge for depth
    ctx.shadowOffsetY = 6; // Slight vertical offset
// make indicator
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - wheelRadius + 5); // Arrow tip location
    ctx.lineTo(centerX - 15, centerY - wheelRadius - 30); // Left wing
    ctx.lineTo(centerX + 15, centerY - wheelRadius - 30); // Right wing
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1.5;
    ctx.stroke();
// Reset shadow so it doesn't affect the wheel & Paths after
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
}
/*FOR NOT BEING ANIMATED *
    drawWheel(); // draw the wheel background at new angle
    drawSegment(); // Call Re-draw the segments
    drawIndicator(); *///call indicator

/*make wheel move */
// Define initial state variables
    let angle = 0; // Current rotation angle in degrees
    let angularVelocity = 0; // Speed of rotation (degrees per frame)
    let angularDeceleration = 0.11; // Deceleration factor (how fast the spin slows)
    let spinning = false; // Whether the wheel is currently spinning
    // Select the button
    const buttonNo = document.getElementById("myButton");
// Function to start the spin
function startSpin() {
    if (!spinning) {
        // Kick off the spin with a random velocity between 20 and 40 degrees per frame
        angularVelocity = Math.random() * 20 + 20;
        // Turn button to turn the button red while spinning
        Object.assign(spinButton.style, {
            backgroundColor: "tomato",
            boxShadow: "inset 5px 5px 8px rgba(0, 0, 0, 0.7)"
        });
        // spinButton.style.backgroundColor= "red"; // Soft black shadow
        // spinButton.style.boxShadow = "inset 5px 5px 10px rgba(0, 0, 0, 0.7)";
        spinning = true;
    }
}

function spinWheel() { console.log("Spin function running!");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before each frame

    drawWheel(); // draw the wheel background at new angle
    ctx.save(); // Save current canvas state
    ctx.translate(centerX, centerY); // Move to wheel center
    ctx.rotate(angle * (Math.PI / 180)); // Rotate by angle in degrees
    ctx.translate(-centerX, -centerY); // Move back

    drawSegment(); // Call Re-draw the segments
    ctx.restore(); // Restore original canvas state

    drawIndicator(); //call indicator
// Update the angle if the wheel is spinning
    if (spinning) {
        angle += angularVelocity;
        // Apply deceleration
        angularVelocity -= angularDeceleration;
        // When the velocity drops below a threshold, stop the spin
        if (angularVelocity <= 0) {
            angularVelocity = 0;
        // Turn button to turn the button red while spinning
        Object.assign(spinButton.style, {
            backgroundColor: "",
            boxShadow: ""
        });
            spinning = false;
// Optionally: Calculate the winning segment based on 'angle'
        }
    }
    requestAnimationFrame(spinWheel); // Keep animation running
}


// Attach 'startSpin' to a button click:
  document.getElementById("spinButton").addEventListener("click", startSpin);
// Start the spin
    spinWheel();
