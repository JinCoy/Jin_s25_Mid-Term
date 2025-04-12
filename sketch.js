let circleSize, posX, posY, offSet, numShapes, space;
let myColor = ['red','skyblue','#CAF489','#89F4C7', '#89CBF4','#233FF0','#6723F0', '#F023ED','#F8D7F7'];


function setup() {
  createCanvas(600, 600);
  background(33,27,9);
  
  
  numShapes = 10;
  circleSize = width-100;
  space = circleSize/numShapes;
  offSet = 10;
  
  posX = width/2;
  posY = height/2;
  

}

function draw() {
  
  
  for (let i = 0 ; i < numShapes; i++)
    {
      fill(myColor[i]);
      strokeWeight(7);
      stroke(152, 255, 152);
      circle(posX, posY, circleSize-space*i);
      
    }
  
    mysignature();
  
  function mySignature() {
    textSize(20);
    strokeWeight(4);
    stroke('black');
    fill('white');
    text('Jin',width-20,height-30);
    
    
  }
  
  
  
}