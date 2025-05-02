// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color_picker = document.querySelector("#color_input");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let theme_color = "#000000";

// function to generate random color

function hexToRGB(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function randomRGB() {
    const rgb_color = hexToRGB(theme_color);

    const offset = 50;

  return `rgb(${rgb_color.r + random(-offset, offset)},${rgb_color.g + random(-offset, offset)},${rgb_color.b + random(-offset, offset)})`;
}


color_picker.addEventListener("change", (e) => {
    theme_color = e.target.value;
})

// Criando a bola

function Square(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

function Pentagon(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Pentagon.prototype.draw = function () {
    const angle = (2 * Math.PI) / 5;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    for (let i = 0; i < 5; i++) {
        const x = this.x + this.size * Math.cos(i * angle - Math.PI / 2);
        const y = this.y + this.size * Math.sin(i * angle - Math.PI / 2);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
};

Square.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.fill();
};

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};



[Ball, Square, Pentagon].forEach(obj => {
    obj.prototype.collisionDetect = function () {
        for (let j = 0; j < balls.length; j++) {
          if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
      
            if (distance <= this.size + balls[j].size) {
              balls[j].color = this.color = randomRGB();
    
                const teta = Math.atan2(dy, dx);
                const v1 = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
                const v2 = Math.sqrt(balls[j].velX * balls[j].velX + balls[j].velY * balls[j].velY);
                const m1 = this.size;
                const m2 = balls[j].size;
    
                const e = 0.5;
    
                const v1_res = (m1 * v1 + m2 * v2 - (m2 * e * (v1 - v2))) / (m1 + m2);
                const v2_res = (m1 * v1 + m2 * v2 - (m1 * e * (v2 - v1))) / (m1 + m2);
    
                this.velX = v1_res * Math.cos(teta);
                this.velY = v1_res * Math.sin(teta);
                balls[j].velX = v2_res * Math.cos(teta + Math.PI);
                balls[j].velY = v2_res * Math.sin(teta + Math.PI);
            }
          }
        }
    };

    obj.prototype.update = function () {
        if (this.x + this.size >= width) {
          this.velX = -this.velX;
        }
      
        if (this.x - this.size <= 0) {
          this.velX = -this.velX;
        }
      
        if (this.y + this.size >= height) {
          this.velY = -this.velY;
        }
      
        if (this.y - this.size <= 0) {
          this.velY = -this.velY;
        }
      
        this.x += this.velX;
        this.y += this.velY;
    };


})

let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);

  [Ball, Square, Pentagon].forEach(obj => {
    let item = new obj(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
      );
      balls.push(item);
  });
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop);
}

loop();