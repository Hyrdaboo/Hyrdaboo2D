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

## References

1. ```myGameArea.start()``` – Starts the engine
1. ```myGameArea.clear()``` - Clears canvas per frame
1. ```myGameArea.stop()``` - clears Interval
1. ```component(width, height, "color", x, y, type)``` - create a new game object
1. * type = "textureMaterial" - add texture on an object (write image src instead of color parameter) 
   * type = "circle" - create circle shaped game object
   * type





