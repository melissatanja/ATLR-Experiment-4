import de.voidplus.leapmotion.*;
LeapMotion leap;

float [] xvalues = new float[0];
float [] yvalues = new float[0]; 
//boolean start;
//PVector old_pos;

void setup(){
  
  size(1000, 1000, P3D);
  
  background(255);
  
  leap = new LeapMotion(this);
  
}

void draw(){
  
    for (Hand hand: leap.getHands()){
      for (Finger finger: hand.getFingers()){
        
        switch(finger.getType()){
          //0 is thumb, 1 is index, etc. 
          case 1:
          
          PVector finger_pos = finger.getStabilizedPosition();
          
          int touchx = floor(finger_pos.x);
          int touchy = floor(finger_pos.y);
          
          int mid = width/2;
          float distance = dist(touchx, mid, 0, touchx, touchy, 0);
          
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
          append(xvalues, finger_pos.x);
          append(yvalues, finger_pos.y);
        
      }
      
    }
    
  }
  
  
  
  //for(each of xvalues){
    
  //  if(each % 10 === 0){
      
      
      
  //  }
    
  //}
  
}

void keyPressed(){
  
  //if(key == "c"){
   
    background(255);
    
  //}
  
}

void mousePressed(){
  
  saveFrame("finger_painting_###.jpg");
  
}