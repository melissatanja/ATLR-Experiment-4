import de.voidplus.leapmotion.*;
LeapMotion leap;

float [] xvalues = new float[0];
float [] yvalues = new float[0]; 
//boolean start;
//PVector old_pos;

void setup(){
  
  size(500, 500, P3D);
  
  background(255);
  
  stroke(0);
  strokeWeight(5);
  
  leap = new LeapMotion(this);
  
}

void draw(){
  
    for (Hand hand: leap.getHands()){
      for (Finger finger: hand.getFingers()){
        
        switch(finger.getType()){
          //0 is thumb, 1 is index, etc. 
          case 1:
          
          PVector finger_pos = finger.getStabilizedPosition();
        
          //draw a circle at finger position
          ellipse(finger_pos.x, finger_pos.y, 5, 5);
          
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
