var posX;
var speed = 5;
var bullets = [];
var aliens = [];
var fx = [];
var stars = [];

var score = 0;
var scoreText;

var nextFireTime = 0;
var fireRate = 100;

function setup() {
  createCanvas(600, 600);
  dir = 0;
  posX = width / 2;
  scoreText = createP();
  setScore(score);
  for (var i = 0; i < 255; i++)
    stars.push(new Star());
}

function setScore(scr) {
  score = scr;
  scoreText.html("score: " + score);
}

function spawnAlien() {
  aliens.push(new Alien(random(50, width - 50), 0));
}

function mouseDragged() {
      if (millis() > nextFireTime) {
      bullets.push(new Bullet(posX, height - 20));
      nextFireTime = millis() + fireRate;
    }
}

function draw() {
  background(0);
  //if (keyIsDown(LEFT_ARROW))
  //  posX -= speed;
  //if (keyIsDown(RIGHT_ARROW))
  //  posX += speed;
  if (frameCount % 60 === 0)
    spawnAlien();
   for (var i = 0; i < 255; i++)
    stars[i].show();
  for (var i = 0; i < fx.length; i++) {
    var f = fx[i];
    f.update();
    f.show();
    if (f.remove) {
      fx.splice(i, 1);
      continue;
    }
  }
  for (var i = 0; i < aliens.length; i++) {
    var a = aliens[i];
    a.update();
    a.show();
    if (a.remove) {
      aliens.splice(i, 1);
      continue;
    }
  }
  for (var i = 0; i < bullets.length; i++) {
    var b = bullets[i];
    b.update();
    b.show();
    if (b.remove) {
      bullets.splice(i, 1);
      continue;
    }
  }

  posX = constrain(mouseX, 10, width - 10);
  rectMode(CENTER);
  fill(255);
  rect(posX, height - 20, 20, 20);
}

function Bullet(x, y) {
  this.pos = createVector(x, y);
  this.angle = createVector(random(-.05, .05), -1);
  this.remove = false;
  this.angle.mult(15);
  
  this.update = function () {
    this.pos.add(this.angle);
    if (this.pos.y < 0)
      this.remove = true;
  }
  
  this.show = function () {
    noStroke();
    fill(255, 255, 0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle.heading());
    rect(0, 0, 10, 2);
    pop();
  }
}

function Alien(x, y) {
  this.x = x;
  this.y = y;
  this.remove = false;
  
  this.update = function () {
    this.y += 5;
    if (this.y > height) {
      this.remove = true;
      return;
    }
    for (var i = 0; i < bullets.length; i++) {
     var d = dist(this.x, this.y, bullets[i].pos.x, bullets[i].pos.y)
      if (d < 15) {
        this.remove = true;
        bullets[i].remove = true;
        setScore(score + 1);
        for (var j = 0; j < 5; j++)
          fx.push(new FX(this.x + random(-20, 20), this.y + random(-20, 20)));
      }
    }
  }
  
  this.show = function () {
    fill(255, 0, 0);
    triangle(this.x, this.y + 10, this.x - 10, this.y - 10, this.x + 10, this.y - 10);
  }
}

function FX (x, y) {
  this.x = x;
  this.y = y;
  this.lifeTime = random(75, 150);
  this.baseLT = this.lifeTime;
  this.remove = false;
  
  this.update = function() {
    this.lifeTime -= 5;
    if (this.lifeTime < 0)
      this.remove = true;
  }
  
  this.show = function() {
    noFill();
    stroke(255, 255, 0, this.lifeTime*2);
    strokeWeight(5);
    ellipse(this.x, this.y, (this.baseLT - this.lifeTime) * .75, (this.baseLT - this.lifeTime) * .75);
    noStroke();
  }
}

function Star () {
  this.x = random(width);
  this.y = random(height);
  this.offset = random(1000);

  this.show = function() {
    this.y += 1;
    if (this.y > height)
      this.y = 0;
    fill(255 * ((sin((frameCount + this.offset)* .025) + 1) / 2) );
    noStroke();
    rect(this.x, this.y, 1, 1);
  }
}