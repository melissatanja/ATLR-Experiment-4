// var xvalues = []; 
// var yvalues = []; 

var boxes = [];

//width and height for the renderer
var w = 900;
var h = 900;

//width for the horizontal box
var hBoxW = 400;

var controller = new Leap.Controller({enableGestures: true});

controller.connect();

//variables for scene setup
let cam, airPrint, Shape, renderer, exporter, boxPos, controls;

//scene (what gets rendered)
airPrint = new THREE.Scene();
airPrint.background = new THREE.Color(0xffffff);

//groups of geometry, similar to arrays
Shape = new THREE.Object3D();
boxPos = new THREE.Object3D();

//renderer, acts like a canvas
renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//camera controls what we see on the screen, i.e. the viewport
cam = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
cam.position.z = 400;
cam.lookAt(airPrint.position);

// allows the leap to move the camera
// controls = new THREE.LeapTrackballControls(cam, controller);

// controls.rotationSpeed = 10;
// controls.rotationDampening = 0.98;

// controls.zoomEnabled = true;
// controls.zoom = 400;
// controls.zoomDampening = 0.6;
// controls.zoomCutoff = 0.9;
// controls.minZoom = 200;
// controls.maxZoom = 800;

controls = new THREE.OrbitControls(cam);

controls.minAzimuthAngle = -Math.PI/2;
controls.maxAzimuthAngle = Math.PI/2;
controls.minPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI/2;

//allows us to export a printable file
exporter = new THREE.STLExporter();

//mapping Leap coordinates to three.js coordinates
function leapPointToWorld(leapPoint, iBox){

  var normalized = iBox.normalizePoint(leapPoint, false);
  
  var z = normalized[2];

  //recenter origin
  var x = normalized[0] - 0.5;
  z+= 0.5;

  //scale
  x*= 100;

  var y = normalized[1] * 100;
  z *= 100;

  //this is the new origin
  return Leap.vec3.fromValues(x, y, z);

}

function shape(){

	//frame is like draw, creates a loop to keep getting input from the Leap
	var frame = controller.frame();

	for(var f = 0; f < frame.fingers.length; f++){
    
		var finger = frame.fingers[f];

	    //0 is thumb, 1 is index, etc. 
	    //this should only let you draw with your index
	    if(finger.type == 1){
	    
	    	//variables from mapping function
		    var iBox = frame.interactionBox;
		    var finger_pos = leapPointToWorld(finger.tipPosition, iBox);

		    //constraining finger position
		    var finger_posX = Math.min(hBoxW/2 - 15, Math.max(- (hBoxW/2 - 15), finger_pos[0]));
		    var finger_posY = Math.min(300, Math.max(-300, finger_pos[1]));

		    var touchx = Math.round(finger_posX);
		    var touchy = Math.round(finger_posY);

		    // console.log(touchx);
		    // console.log(touchy);

		    //circles at finger position --> line 
		    var touch = new THREE.CircleGeometry(2);
		    var touchPoint = new THREE.Mesh(touch);
		    touchPoint.position.set(touchx, touchy, 0);

		    Shape.add(touchPoint);


			//finding edge points of renderer
			    // var whereisleft = new THREE.CircleGeometry(25);
			    // var left = new THREE.Mesh(whereisleft);
			    // left.position.set(-225, 0, 0);

			    // Shape.add(left);

			    // var whereisright = new THREE.CircleGeometry(25);
			    // var right = new THREE.Mesh(whereisright);
			    // right.position.set(225, 0, 0);

			    // Shape.add(right);

			    // var whereistop = new THREE.CircleGeometry(25);
			    // var top = new THREE.Mesh(whereistop);
			    // top.position.set(0, 225, 0);

			    // Shape.add(top);

			    // var whereisbottom = new THREE.CircleGeometry(25);
			    // var bottom = new THREE.Mesh(whereisbottom);
			    // bottom.position.set(0, -225, 0);

				// Shape.add(bottom);

			//horizontal box
		    var horiz = new THREE.BoxGeometry(hBoxW, 25, 25); //FIX THIS TO B AS WIDE AS THE DRAWN RECST
		    var hBox = new THREE.Mesh(horiz);
		    hBox.position.set(0, 0, 0);

		    Shape.add(hBox);

		    //keychain loop torus
		    var torus = new THREE.TorusGeometry(30, 10, 5, 20);
		    var loop = new THREE.Mesh(torus);
		    loop.position.set(-230, 0, 0);

		    Shape.add(loop);

			//check if the box is equal width from other boxes
			if(touchx % 25 === 0){

				//go through array of box x positions
				// for(b of boxPos.children){

				//check if current finger x position is equal to any of the previous box x positions
				//if not, draw a box at the current finger x position
					
				// if(boxPos.length == 0){

			    //      var vert = new THREE.BoxGeometry(20, touchy, touchy);
			    //      var vBox = new THREE.Mesh(vert);
			    //      vBox.position.set(touchx, 0, 0);

			    //      // boxPos.push(vBox.position.x);
			    //      append(boxPos, vBox.position.x);
			    //      console.log(boxPos);

			    //      Shape.add(vBox);

			    //      // box(20, touchy, touchy);
			    //      // translate(-touchx, 0, 0);
			    //  	}

		      	// if(touchx != ){

		      	//vertical boxes
		        var vert = new THREE.BoxGeometry(15, touchy, touchy);
		        var vBox = new THREE.Mesh(vert);
		        vBox.position.set(touchx, 0, 0);

		        boxes.push(vBox.position.x);

		        boxPos.add(vBox);

		        Shape.add(boxPos);

		        // console.log(boxes);

		      	// }
				// }
	      
	    	}

    	}
    
  	}

}

//this function renders the scene (brings the geometry to the screen)
function animate(){

  requestAnimationFrame(animate);

  shape();

  airPrint.add(Shape);

  controls.update();
  renderer.render(airPrint, cam);

}

animate();

//keypress function to save STL file
document.onkeydown = function(){ 

  if (event.which == 13){   

    let exp = exporter.parse(airPrint);
    let file = new Blob([exp], {type: 'model/stl'});
    let link = document.createElement('a');

    link.style.display = 'none';
    document.body.appendChild(link);
    link.href = URL.createObjectURL(file);
    link.download = 'airPrint.stl';
    link.click();

  } 
 
}