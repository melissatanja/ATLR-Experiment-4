//width and height for the renderer
var w = 900;
var h = 900;

//width for the horizontal box
var hBoxW = 400;

var controller = new Leap.Controller({frameEventName: 'animationFrame'});

controller.connect();

//right hand grab 
var rightGrab = false; 

//right hand down
var rightDown = false;

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

// allows the leap to move the camera
controls = new THREE.LeapPointerControls(cam, controller);

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

	for(var h = 0; h < frame.hands.length; h++){

    	if(frame.hands[h].type == "right"){

    		var rightHand = frame.hands[h];
	    
	    	//variables from mapping function
		    var iBox = frame.interactionBox;
		    var finger_pos = leapPointToWorld(rightHand.indexFinger.tipPosition, iBox);

		    //constraining finger position
		    var finger_posX = Math.min(hBoxW/2 - 15, Math.max(- (hBoxW/2 - 15), finger_pos[0]));
		    var finger_posY = Math.min(300, Math.max(-300, finger_pos[1]));

		    var touchx = Math.round(finger_posX);
		    var touchy = Math.round(finger_posY);

		    //circles at finger position --> line 
		    var touch = new THREE.CircleGeometry(2);
		    var touchPoint = new THREE.Mesh(touch);
		    touchPoint.position.set(touchx, touchy, 0);

		    Shape.add(touchPoint);

			//horizontal box
		    var horiz = new THREE.BoxGeometry(hBoxW, 25, 25); 
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

		        var vert = new THREE.BoxGeometry(15, touchy * 0.75, touchy * 0.75);
		        var vBox = new THREE.Mesh(vert);
		        vBox.position.set(touchx, 0, 0);

		        boxPos.add(vBox);

		        Shape.add(boxPos);
	      
	    	}

	    	var rGrab = rightHand.grabStrength;

	    	if(rGrab == 1){

	    		rightGrab = true;

	    	} else{

	    		rightGrab = false;

	    	}

	    	if(rightHand.palmNormal[1] < -0.8 && rightHand.direction[1] < 0.25){

	    		rightDown = true;

	    	}

    	}

    	if(frame.hands[h].type == "left"){

    		var leftHand = frame.hands[h];

			var lGrab = leftHand.grabStrength;

			var palm = leftHand.palmNormal;

	    	if(rightGrab == true){

	    		if(lGrab == 1){

    				window.setTimeout(location.reload(), 3000); // 3 secs
    				;

    			}

    		}

    		if(palm[1] < -0.9 && direction[1] < 0.25){

    			if(rightDown === true){

    				window.setTimeout(save(), 3000);

    				console.log("save");

    			}

    		}

    	}

	}
}

function save(){

	cam.position.set(0, 0, 400);

	renderer.render(airPrint, cam);
	let exp = exporter.parse(airPrint);

	//save STL
    let stlFile = new Blob([exp], {type: 'model/stl'});
    let stlLink = document.createElement('a');

    stlLink.style.display = 'none';
    document.body.appendChild(stlLink);
    stlLink.href = URL.createObjectURL(stlFile);
    stlLink.download =  'airPrint.stl';
    stlLink.click();

    //save JPG
    let jpgFile = new Blob([exp], {type: 'image/jpeg'});
    let jpgLink = document.createElement('a');

    jpgLink.style.display = 'none';
    document.body.appendChild(jpgLink);
    jpgLink.href = URL.createObjectURL(jpgFile);
    jpgLink.download =  'airPrint.jpg';
    jpgLink.click();

}

function clearScreen(obj){

  while(obj.children.length > 0){ 

    clearThree(obj.children[0])
    obj.remove(obj.children[0]);

  }

  if(obj.geometry) obj.geometry.dispose()
  if(obj.material) obj.material.dispose()
  if(obj.texture) obj.texture.dispose()

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
// document.onkeydown = function saveSTL(){ 

//   if (event.which == 13){   

//     let exp = exporter.parse(airPrint);
//     let file = new Blob([exp], {type: 'model/stl'});
//     let link = document.createElement('a');

//     link.style.display = 'none';
//     document.body.appendChild(link);
//     link.href = URL.createObjectURL(file);
//     link.download = 'airPrint.stl';
//     link.click();

//   } 
 
// }