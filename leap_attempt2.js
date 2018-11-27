var xvalues = []; 
var yvalues = []; 

var width = 3000;
var height = 3000;
//boolean start;
//PVector old_pos;

var controller = new Leap.Controller({enableGestures: true});

controller.connect();

// var nameblem = new THREE.Scene();

function setup(){
  
  // var c = document.getElementById("canvas")
  createCanvas(1000, 1000, WEBGL);
  // var ctx = c.getContext("3d");
  
  background(100);
  
}

function draw(){

//   stroke(0);
//   noFill();
//   ellipse(0, 0, 0);

// }

// function leapToScene(position) {
//   var x = position[0];
//   var y = position[1];
//   // Shift the Leap origin to the canvas"s bottom center and invert the y-axis
//   return [width/2 + x, height - y];
// }
  
// controller.on("frame", function(frame){

  var frame = controller.frame();

    // switch(finger.getType()){
      //0 is thumb, 1 is index, etc. 
      // case 1:
for(var f = 0; f < frame.fingers.length; f++){
    var finger = frame.fingers[f];

      if(finger.type == 1){

        // var interactionBox = frame.interactionBox;
        // var h = frame.interactionBox.height;
        // var w = frame.interactionBox.width;

        // var fingertip = frame.fingers[0].stabilizedTipPosition;
        // var normalizedPosition = interactionBox.normalizePoint(fingertip, true);
        // var canvasx = width * normalizedPosition[0];
        // var canvasy = height * (1 - normalizedPosition[1]);

        // var finger_pos = leapToScene(finger.tipPosition());
        
        var touchx = floor(finger.tipPosition[0]);
        var touchy = floor(height/2 - finger.tipPosition[1]);

        // console.log(touchy);
        
        // var mid = width/2;
        // var distance = abs(touchy);
        
        stroke(0);
        strokeWeight(5);

        // var color = (0);
      
        //draw a circle at finger position
        // lineTo(touchx, touchy);
        ellipse(touchx, touchy, 2, 2);
        
        //println(touchx);
        
        // translate(width/2, 0, 0);
        box(width, 10, 10);
        // translate(-width/2, 0, 0);
        
        if(touchx % 50 === 0){
                  
          translate(touchx, 0, 0);
          // stroke(255, 0, 0);
          // strokeWeight(2);
          // noFill();
          box(20, touchy, touchy);
          translate(-touchx, 0, 0);
          
        }
      
      //old_pos = finger_pos;
      
      //add x and y values of your finger to their arrays
      // append(xvalues, finger_pos.x);
      // append(yvalues, finger_pos.y);
    }
    
  }
  
}

// controller.connect();
  
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