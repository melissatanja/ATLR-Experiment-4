var xvalues = []; 
var yvalues = []; 
//boolean start;
//PVector old_pos;

var controller = new Leap.Controller();

function setup(){
  
  createCanvas(1000, 1000, WEBGL);
  
  background(255);
  
}

function leapToScene(position) {
  var x = position[0];
  var y = position[1];
  // Shift the Leap origin to the canvas"s bottom center and invert the y-axis
  return [width/2 + x, height - y];
}
  
controller.on("frame", function(frame){

    // switch(finger.getType()){
      //0 is thumb, 1 is index, etc. 
      // case 1:

  var finger = frame.fingers[f];

    if(finger.type == 1);
      
      var finger_pos = leapToScene(finger.tipPosition());
      
      var touchx = floor(finger_pos.x);
      var touchy = floor(finger_pos.y);
      
      var mid = width/2;
      var distance = dist(touchx, mid, 0, touchx, touchy, 0);
      
      stroke(0);
      strokeWeight(5);
    
      //draw a circle at finger position
      ellipse(touchx, touchy, 5, 5);
      
      //println(touchx);
      
      translate(width/2, mid, 0);
      box(width, 20, 20);
      translate(-width/2, -mid, 0);
      
      if(touchx % 50 == 0){
                
        translate(touchx, mid, 0);
        stroke(255, 0, 0);
        strokeWeight(2);
        noFill();
        box(20, distance, distance);
        translate(-touchx, -mid, 0);
        
      }
      
      //old_pos = finger_pos;
      
      //add x and y values of your finger to their arrays
      // append(xvalues, finger_pos.x);
      // append(yvalues, finger_pos.y);
    
  // }
  
});

controller.connect();
  
  //for(each of xvalues){
    
  //  if(each % 10 === 0){
      
      
      
  //  }
    
  //}

// function keyPressed(){
  
  //if(key == "c"){
   
    // background(255);
    
  //}
  
// }

function mousePressed(){
  
  saveCanvas("finger_painting", "jpg");
  
}