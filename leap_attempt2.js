var xvalues = []; 
var yvalues = []; 

// var width = 3000;
// var height = 3000;
// var stlButton;
// var camera;
// var controls;
//boolean start;
//PVector old_pos;

var w = 1000;
var h = 1000;

var controller = new Leap.Controller({enableGestures: true});

controller.connect();
// console.log(controller);

// initScene = function(){

  let cam, airPrint, Shape, renderer, exporter;

  airPrint = new THREE.Scene();
  airPrint.background = new THREE.Color(0xffffff);
  Shape = new THREE.Object3D();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  // renderer.setClearColorHex(0xffffff, 1);
  // renderer.domElement.className = "leap-drawing";
  document.body.appendChild(renderer.domElement);
  // directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight.position.set(0, 0.5, 1);
  // airPrint.add(directionalLight);

  cam = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  cam.lookAt(airPrint.position);
  // airPrint.add(cam);

  exporter = new THREE.STLExporter();
// }

// function setup(){

//   // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   noCanvas();
//   // var c = document.getElementById("canvas")
//   // createCanvas(1000, 1000, WEBGL);
//   // renderer.setSize(1000, 1000);
//   // document.body.appendChild(renderer.domElement);

//   // stlButton = createButton("save as .STL");

//   // keyPressed(stl);
//   // var ctx = c.getContext("3d");
  
//   background(100);
  
// }

// controller.on("frame", function(frame){});

// function frame(){

//   shape();

//   airPrint.add(Shape);

//   animate();

//   // console.log("draw functional");

// }

function leapPointToWorld(leapPoint, iBox){

  var normalized = iBox.normailizePoint(leapPoint, false);
  var z = normalized[2] * -1;
  //recenter origin
  var x = normalized[0] + 0.5;
  z+= 0.5;
  //scale
  x*= 100;
  var y = normalized[1] * 100;
  z *= 100;

  //this is the new origin, not sure if we need to put that in shape() somehow
  return Leap.vec3.fromValues(x, y, z);

}

function shape(){

  // var mid = new THREE.BoxGeometry(w - 100, 5, 5);
  // var midBox = new THREE.Mesh(mid);
  // Shape.add(midBox);
  // scale(0.1, 0.1, 0.1);

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

        // finger.scale.set(0.5, 0.5, 1);

        // var interactionBox = frame.interactionBox;
        // var h = frame.interactionBox.height;
        // var w = frame.interactionBox.width;

        // var fingertip = frame.fingers[0].stabilizedTipPosition;
        // var normalizedPosition = interactionBox.normalizePoint(fingertip, true);
        // var canvasx = width * normalizedPosition[0];
        // var canvasy = height * (1 - normalizedPosition[1]);

        // var finger_pos = leapToScene(finger.tipPosition());
        
        var touchx = Math.floor(finger.tipPosition[0]);
        var touchy = Math.floor(finger.tipPosition[1]);

        // console.log(touchy);
        
        // var mid = width/2;
        // var distance = abs(touchy);
        
        // stroke(0);
        // strokeWeight(5);

        // var color = (0);
      
        //draw a circle at finger position
        // lineTo(touchx, touchy);

        var touch = new THREE.CircleGeometry(2);
        var touchPoint = new THREE.Mesh(touch);
        touchPoint.position.set(touchx, touchy, 0);

        Shape.add(touchPoint);
        // ellipse(touchx, touchy, 2, 2);
        
        //println(touchx);
        
        // translate(width/2, 0, 0);

        var horiz = new THREE.BoxGeometry(w - 100, 10, 10);
        var hBox = new THREE.Mesh(horiz);
        hBox.position.set(0, h/2, 0);

        Shape.add(hBox);
        // box(width - 100, 10, 10);
        // translate(-width/2, 0, 0);
        
        if(touchx % 50 === 0){
                  
          // translate(touchx, 0, 0);
          // stroke(255, 0, 0);
          // strokeWeight(2);
          // noFill();

          var vert = new THREE.BoxGeometry(20, touchy, touchy);
          var vBox = new THREE.Mesh(vert);
          vBox.position.set(touchx, 0, 0);

          Shape.add(vBox);

          // box(20, touchy, touchy);
          // translate(-touchx, 0, 0);
          
        }
      
      //old_pos = finger_pos;
      
      //add x and y values of your finger to their arrays
      // append(xvalues, finger_pos.x);
      // append(yvalues, finger_pos.y);
    }
    
  }
  
  // airPrint.add(Shape);

}

function animate(){

  requestAnimationFrame(animate);

    shape();

    // Shape.scale = new THREE.Vector3(0.0000000000001, 0.0000000000001, 0.0000000000001);

  console.log(Shape);

  airPrint.add(Shape);

  // airPrint.render();

  console.log(airPrint);

  renderer.render(airPrint, cam);
}

animate();

function keyPressed(){

  let exp = exporter.parse(airPrint);
  let file = new Blob([exp], {type: 'model/stl'});
  let link = document.createElement('a');

  link.style.display = 'none';
  document.body.appendChild(link);
  link.href = URL.createObjectURL(file);
  link.download = 'airPrint.stl';
  link.click();

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