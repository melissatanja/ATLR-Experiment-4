import de.voidplus.leapmotion.*;
LeapMotion leap;

void setup(){
  
  size(displayWidth, displayHeight);
  
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
        
      }
      
    }
    
  }
  
}
