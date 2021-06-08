# Hyrdaboo2D
A lightweight HTML5 Canvas JavaScript library

## Getting Started

#### main.js
```
//variables
var obj;

// startGame is called once
function startGame() {
obj = new component(30, 30, "red", 0, 0);
// start the engine
myGameArea.start();
} 

// updateGameArea is called once per frame
function updateGameArea() {

// clear canvas every frame
myGameArea.clear();

obj.newPos();

obj.update();
} 
```
#### index.html
```
<!DOCTYPE html>
<html lang="en">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
<title>Hyrdaboo2D demo</title>
</head>
  <body>
 <!-- use this link to access the library internally -->
   <script src="https://raw.githack.com/Hyrdaboo/Hyrdaboo2D/main/Hyrdaboo2D.min.js"></script>
   <script src="main.js"></script>
  </body>
</html>

```

# References

#### Essentials

1. ```myGameArea.start()``` – Starts the engine
1. ```myGameArea.clear()``` - Clears canvas per frame
1. ```myGameArea.stop()``` - clears Interval
1. ```component(width, height, "color", x, y, type)``` - create a new game object
1. * type = "textureMaterial" - add texture on an object (write image src instead of color parameter) 
   * type = "circle" - create circle shaped game object
1. ```obj.color = color value``` - change color of an object 
1. ```obj.strokeColor = color value``` - change border color of a circle

#### user interaction

1. ```obj.touchTrace = bool``` - touchtrace enabled/disabled (for touch devices ) 
1. ```obj.followMouse = bool``` - move with cursor enabled/disabled
1. ```setVibration(int)``` - vibrate
1. ```viewFullscreen(orientation)``` - enter full-screen mode
1. ```obj.clicked()``` - detect if object is clicked

#### camera

1. ```camera.x = int``` - camera x
1. ```camera.y = int``` - camera y
1. ```scale = int``` - zoom in/out (in development) 

#### physics 

1. ```obj.speedX = int``` - set x velocity 
1. ```obj.speedY = int``` - set y velocity  
1. ```obj.acceleration = int``` - set acceleration
1. ```obj.addForce = int``` - add force to an object
1. ```obj.gravity = int``` - set gravity
1. ```obj.gravitySpeed = int``` - set gravity acceleration index
1. ```obj.Mu = int``` - set roughness of a surface
1. ```obj.bounce = int``` - set bounciness of an object 
1. ```obj.mass = int``` - set Mass
1. ```obj.angle = int``` - angle
1. ```obj.rotatable = bool``` - set rotatable

#### collisions 

1. ```obj.boxColliding(otherobj)``` - box collision 
1. ```obj.crashWith(otherobj)``` - box collision2
1. ```obj.circleColliding(otherobj)``` - circle collision 
1. ```obj.boxCircleColliding(otherobj)``` - circle with box collision
1. ```obj.hitCanvasEdge()``` - hit canvas(viewport) borders



