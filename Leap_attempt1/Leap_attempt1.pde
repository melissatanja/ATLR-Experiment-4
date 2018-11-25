import de.voidplus.leapmotion.*;
LeapMotion leap;

float [] xvalues = new float[0];
float [] yvalues = new float[0]; 
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
        case 1:
        
        PVector finger_pos = finger.getPosition();
      
        ellipse(finger_pos.x, finger_pos.y, 5, 5);
        
        //old_pos = finger_pos;
        
        append(xvalues, finger_pos.x);
        append(yvalues, finger_pos.y);
        
      }
      
    }
    
  }
  
}
