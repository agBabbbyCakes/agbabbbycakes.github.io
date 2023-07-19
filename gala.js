/* reference functions 
    SHAPES
    rectangle: rect(x location, y location, width, height)
    oval:      ellipse(x location ,y location, width, height)
    triangle:  triangle(locA x, locA y, locB x, locB y, locC x, locCy)
    point:     point(x, y);
    
    STYLING
    NOTE: the colors red, green and blue must be a number 0 - 255
    inside color:   fill(red, green, blue);
    border color:   stroke(red, green, blue);
    border weight:  strokeWeight(number);    
    transparent:    noFill();
    no border:      noStroke();
*/

// Your objective is to create unique shapes to represent the enemys and the ship
// When you have finished, show everyone what you created!!!



var player;
var pellet = [];
var enemies = [];
var counter = 0;
var level = [];

var levelLength = 50;

function setup() {
  createCanvas(400, windowHeight * 0.98);
  player = new Ship();

  //load level
  for (i = 0; i < 50; i++) {
    enemies[i] = new Enemy(
      floor(random(1, 19)) * 20,
      floor(random(1, 19)) * -20
    );
  }
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  text("Galaga - Lite", width / 2, 50);

  for (var i = pellet.length - 1; i >= 0; i--) {
    pellet[i].update();
    if (pellet[i].y <= -pellet[i].r / 2) {
      pellet.splice(i, 1);
      break;
    }
    for (var j = enemies.length - 1; j >= 0; j--) {
      if (pellet[i].hit(enemies[j])) {
        pellet.splice(i, 1);
        enemies.splice(j, 1);
        enemies.push(new Enemy());
        counter++;
        break;
      }
    }
  }

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
    if (enemies[i].y >= height) {
      if (enemies[i].y >= height) {
        enemies[i] = new Enemy(
          floor(random(1, 19)) * 20,
          floor(random(1, 4)) * -20 - 100
        );
      }
      counter -= 5;
    }
  }

  for (var i = pellet.length - 1; i >= 0; i--) {
    pellet[i].render();
  }
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].render();
  }

  player.update();
  player.render();


}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.holdLeft = true;
  }
  if (keyCode === RIGHT_ARROW) {
    player.holdRight = true;
  }
  if (keyCode === 32) {
    player.shoot = true;
  }
  if (keyCode === 49) {
    player.gunMode = "lineGun";
  }
  if (keyCode === 50) {
    player.gunMode = "sineGun";
  }
  if (keyCode === 51) {
    player.gunMode = "rainbowGun";
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    player.holdLeft = false;
  }
  if (keyCode === RIGHT_ARROW) {
    player.holdRight = false;
  }
  if (keyCode === 32) {
    player.shoot = false;
  }
}

class Ship {
  constructor(x, y) {
    this.x = width / 2 || x;
    this.y = height - 35 || y;
    this.velX = 0;
    this.pelletVelocity = 5;
    this.shoot = false;
    this.holdLeft = this.holdRight = false;
    this.moveSpeed = 3;

    this.shipWidth = 8;
    this.shipHeight = 20;
    this.wingHeight = 8;
    this.wingWidth = 10;
    this.noseHeight = 5;
    this.color = [255, 255, 255];

    this.gunMode = "lineGun";
  }

  render() {
    push();   
    translate(this.x, this.y);
    rectMode(CENTER);
    /* Create your ship object here: Look at the top of this page for reference functions */
    
    rect(0, 0, 14, 14)
      
    
    /* Do not edit any code beyond this point or the game won't work */
    pop();
  }

  update() {
    if (this.x > width - this.wingWidth - this.shipWidth) {
      this.holdRight = false;
    }

    if (this.x < this.wingWidth + this.shipWidth) {
      this.holdLeft = false;
    }

    if (this.holdLeft) {
      this.x += -this.moveSpeed;
    }
    if (this.holdRight) {
      this.x += this.moveSpeed;
    }

    if (this.shoot === true) {
      pellet.push(new Pellet(this.x, this.y, this.gunMode));
      this.shoot = false;
    }
  }
}

class Pellet {
  constructor(x, y, type) {
    this.x = x;
    this.startX = x;
    this.y = y;
    this.startY = y;
    this.v = -3;
    this.r = 12;
    this.color = [255, 255, 255];

    this.gunType = type || "lineGun";
    this.colorMix = 0;

    this.amplitude = 100;
    this.omega = 3;
    this.phase = 0;
  }

  render() {
    fill(this.color);
    ellipse(this.x, this.y, this.r, this.r);
  }

  update() {
    switch (this.gunType) {
      case "lineGun":
        this.x = this.startX;
        break;
      case "sineGun":
        angleMode(DEGREES);
        this.x =
          this.startX +
          this.amplitude *
            sin(this.omega * (this.y - this.startY) + this.phase);
        break;
      case "rainbowGun":
        if (this.colorMix < 1) {
          this.color = [random(255), random(255), random(255)];
          this.colorMix += 1;
        }
        break;
    }
    this.y += this.v;
  }

  hit(other) {
    if (
      this.x < other.x + other.w &&
      this.x + this.r / 2 > other.x &&
      this.y < other.y + other.h &&
      this.y + this.r / 2 > other.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}

class Enemy {
  constructor(x, y) {
    this.minV = 0.5;
    this.maxV = 0.8;
    this.v = random(this.minV, this.maxV);
    this.w = 20;
    this.h = 20;
    this.color = [255, 255, 255];
    this.x = x || random(0, floor(width / this.w)) * this.w;
    this.y = y || random(-floor(height / this.h)) * this.h;
    this.v = random(this.minV, this.maxV);
  }

  render() {
    fill(255);
    push()
    translate(this.x, this.y)
    /* Create your enemy object here: Look at the top of this page for reference functions */
    fill('gray')
    stroke('blue')
    strokeWeight(2.7)
    triangle(0,0,
            10,10,
            20,0)
    fill('red')
    stroke('yellow')
    rect(0, -10, 20, 10);
    
    
    
    /* Do not edit any code beyond this point or the game won't work */
    pop();
  }

  update() {
    this.y += this.v;
  }
}
