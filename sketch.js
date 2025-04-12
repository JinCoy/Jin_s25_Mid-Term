
let particles = [];
let blackholePos;
let blackholeSize = 33;
let absorbedParticles = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  blackholePos = createVector(width / 2, height / 3); 

  for (let i = 0; i < 131; i++) {
    particles.push(new Particle());
  }
  
  
}



function draw() {
  let volume = 0.05 + 0.02 * sin(frameCount * 0.05);
  background (10, 18, 190, 20);
  


  // Dots to black hole
  for (let p of particles) {
    p.attractedTo(blackholePos);
    p.update();
    p.display();
  }
  
  
// black hole Pos
  push();
  translate(blackholePos.x, blackholePos.y);
  fill(0);
  ellipse(0, 0, blackholeSize);
  
  drawingContext.shadowBlur = 50;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 1)';
  
  pop();
  
  
  // black hole Size
  blackholeSize = lerp (blackholeSize, 100 + absorbedParticles * 0.3 + volume * 100, 0.2);


  // shining the black hole
  push();
  translate(blackholePos.x, blackholePos.y);
  blendMode(ADD);
  noFill();
  
  
  let glowAlpha = map(absorbedParticles, 0, 200, 50, 255);
      stroke(255, 255, 131, glowAlpha);
      strokeWeight(5);
      ellipse(0, 0, blackholeSize * 1.5);
      blendMode(BLEND);
      pop();

  
  // Make a black hole's ring
  push();
  translate(blackholePos.x, blackholePos.y);
  noFill();
  
  let energyRingSize = blackholeSize + 30 + sin(frameCount * 0.1) * 10;
  let ringAlpha = map(absorbedParticles, 0, 200, 50, 200);
      stroke(255, 100, 50, ringAlpha);
      strokeWeight(3);
     
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = `rgba(255, 100, 50, 1)`;
  
  ellipse(0, 0, energyRingSize);
  pop();

  
  
}




// Some Dots
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector(0, 0);
    this.size = random(2, 5);
  }

  attractedTo(target) {
    let force = p5.Vector.sub(target, this.pos);
    let distance = constrain(force.mag(), 5, 50);
    force.setMag(5 / distance);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (p5.Vector.dist(this.pos, blackholePos) < blackholeSize / 2) {
      absorbedParticles += 1;
      this.reset();
    }
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
}



// Clear the black hole size
function mousePressed() {
  if (dist (mouseX, mouseY, blackholePos.x, blackholePos.y) < blackholeSize / 3) {
    explosionAlpha = 200;
    absorbedParticles = 0;
    blackholeSize = 33;
  } 
  
  else {
    blackholePos.set(mouseX, mouseY);
  }
  
  
  
  
}
