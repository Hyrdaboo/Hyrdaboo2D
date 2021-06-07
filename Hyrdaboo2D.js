/**
 * @license
 * Copyright 2021 Hyrdaboo2d.js authors
 * SPDX-License-Identifier: MIT 
 */
window.onload = function() {
		startGame();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
       document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);        
        window.addEventListener('touchmove', function(e) {
            myGameArea.x = e.touches[0].clientX;
            myGameArea.y = e.touches[0].clientY;
        });
   window.addEventListener('touchend' , function() {
        		myGameArea.x = false;
        		myGameArea.y = false;
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var camera = {
		x: 0,
		y: 0
}

var scale = 1;

function component(width, height, color, x, y, type) {
    this.type = type;
    this.rotatable = false;
    if(type == "textureMaterial") {
    		this.image = new Image();
    		this.image.src = color;
    }    
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.mass = 1;
    this.addForce = 0;
    this.acceleration = 0;
    this.Mu = 0.1;    
    this.color = color;
    this.strokeColor = "black";
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.touchTrace = false;
    this.bounce = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if(this.rotatable == true) {
        if(type == "textureMaterial") {
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle * Math.PI/180);
ctx.drawImage(this.image,this.width/-2,this.height/-2,this.width,this.height);
        ctx.restore();
        }
        else if(type == "circle") {
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle * Math.PI/180);
        ctx.beginPath();
        ctx.arc(this.width/-2, this.height/-2, this.width, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = this.height;
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
        ctx.restore();
        }
        else {
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle * Math.PI/180);
        ctx.fillStyle = color;
        ctx.fillRect(this.width/-2, this.height/-2, this.width, this.height);        
        ctx.restore();
        }
        }
        else {
        if(type == "textureMaterial") {
ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
        else if(type == "circle") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = this.height;
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
        }
        else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity*this.mass;
        this.addForce += this.acceleration*this.mass;
        this.friction = this.Mu*this.mass;
        this.width = width*scale;
        this.height = height*scale;
        this.x += this.speedX + this.addForce - camera.x;
        this.y += this.speedY + this.gravitySpeed - camera.y;
        this.follow();
        this.frictionForce();
    }
    this.frictionForce = function() {
    		if(this.acceleration == 0) {
        		if(this.addForce > 0) {
        		  this.addForce -= this.friction;        		
           }
           else if(this.addForce < 0) {
        		  this.addForce += this.friction;
           }
           if(this.addForce < this.friction && this.addForce > -this.friction) {
        		  this.addForce = 0;
           }
      }
    }    
    this.boxCircleColliding = function(otherobj) {
    let dx=Math.abs(otherobj.x-(this.x+this.width/2));
    let dy=Math.abs(otherobj.y-(this.y+this.height/2));

    if( dx > otherobj.width+this.width/2 ){ return(false); }
    if( dy > otherobj.width+this.height/2 ){ return(false); }

    if( dx <= this.width ){ return(true); }
    if( dy <= this.height ){ return(true); }

    dx=dx-this.width;
    dy=dy-this.height
    return(dx*dx+dy*dy<=otherobj.width*otherobj.width);
    }
    this.circleColliding = function(otherobj) {
    		  let dx = this.x - otherobj.x;
        let dy = this.y - otherobj.y;
        let rSum = this.width + otherobj.width;
        let crash = false;
        if(dx * dx + dy * dy <= rSum * rSum) {
        		crash = true;
        }
        return crash;
    }
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    this.boxColliding = function(otherobj) {
        if(this.rotatable == true) {
        let myleft = this.x-this.width/2;
        let myright = this.x-this.width/2 + (this.width);
        let mytop = this.y-this.height/2;
        let mybottom = this.y-this.height/2 + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = false;
        if(myright > otherleft && myleft < otherleft && mybottom > othertop+otherobj.height/2 && mytop < otherbottom-otherobj.height/2) {
        		this.x = otherobj.x - this.width + this.width/2;
        		this.speedX = 0;
        		this.addForce = 0;        		
        		crash = true;
        }
        if(myleft < otherright && myright > otherright && mybottom > othertop+otherobj.height/2 && mytop < otherbottom-otherobj.height/2) {
        		this.x = otherobj.x + otherobj.width + this.width/2;
        		this.speedX = 0;
        		this.addForce = 0;        		
        		crash = true;
        }
        if(mytop < otherbottom && mybottom > otherbottom && myleft < otherright && myright > otherleft) {
        		this.y = otherobj.y + otherobj.height + this.height/2;
        		this.speedY = 0;
        		crash = true;
        }
        if(mybottom > othertop && mytop < othertop && myleft < otherright-10 && myright > otherleft+10) {
        		this.y = otherobj.y - this.height + this.height/2;
        		this.speedY = 0;        		
        		this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        		crash = true;
        }
        return crash;
        }
        else {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = false;
        if(myright > otherleft && myleft < otherleft && mybottom > othertop+otherobj.height/2 && mytop < otherbottom-otherobj.height/2) {
        		this.x = otherobj.x - this.width;
        		this.speedX = 0;
        		this.addForce = 0;        		
        		crash = true;
        }
        if(myleft < otherright && myright > otherright && mybottom > othertop+otherobj.height/2 && mytop < otherbottom-otherobj.height/2) {
        		this.x = otherobj.x + otherobj.width;
        		this.speedX = 0;
        		this.addForce = 0;        		
        		crash = true;
        }
        if(mytop < otherbottom && mybottom > otherbottom && myleft < otherright && myright > otherleft) {
        		this.y = otherobj.y + otherobj.height;
        		this.speedY = 0;
        		crash = true;
        }
        if(mybottom > othertop && mytop < othertop && myleft < otherright-10 && myright > otherleft+10) {
        		this.y = otherobj.y - this.height;
        		this.speedY = 0;        		
        		this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        		crash = true;
        }
        return crash;
        }
    }
    this.clicked = function() {
        if(this.rotatable == true) {
        let myleft = this.width/-2;
        let myright = this.width/-2 + (this.width);
        let mytop = this.height/-2;
        let mybottom = this.height/-2 + (this.height);
        let clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;            
        }
        return clicked;
        }else {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;            
        }
        return clicked;
        }
    }
    this.follow = function() {
    		if (myGameArea.x && myGameArea.y && this.touchTrace == true) 
    		{    		  
        this.x = myGameArea.x-this.width/2;
        this.y = myGameArea.y-this.width/2;
        this.gravitySpeed = 0;
      }
    }
    this.hitCanvasEdge = function() {
    if(this.rotatable == true) {
    		let bottom = myGameArea.canvas.height - (this.width+this.height/-2);
      let top = myGameArea.canvas.height - myGameArea.canvas.height + (this.width+this.height/-2);
      let left = myGameArea.canvas.width - myGameArea.canvas.width + (this.width+this.height/-2);
      let right = myGameArea.canvas.width - (this.width+this.height/-2);
      let crash = false;
       if (this.y > bottom) {
         this.y = bottom;
         this.speedY = 0;
         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
         crash = true;
       }
       if (this.y < top) {
         this.y = top;         
         this.speedY = 0;
         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
         crash = true;
       }
       if(this.x > right) {
       		 this.x = right;
       		 this.addForce = 0;
       		 crash = true;
       }
       if(this.x < left) {
         this.x = left;
         this.addForce = 0;
       		crash = true;
       }
       return crash;
    }
    if(type != "circle") {
       let bottom = myGameArea.canvas.height - this.height;
       let top = myGameArea.canvas.height - myGameArea.canvas.height;
       let left = myGameArea.canvas.width - myGameArea.canvas.width;
       let right = myGameArea.canvas.width - this.width;   
       let crash = false;
       if (this.y > bottom) {
         this.y = bottom;
         this.speedY = 0;
         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
         crash = true;
       }
       if (this.y < top) {
         this.y = top;         
         this.speedY = 0;
         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
         crash = true;
       }
       if(this.x > right) {
       		 this.x = right;
       		 this.addForce = 0;
       		 crash = true;
       }
       if(this.x < left) {
         this.x = left;
         this.addForce = 0;
       		crash = true;
       }
       return crash;
    }
    else {
    		let bottom = myGameArea.canvas.height - (this.width+this.height/2);
      let top = myGameArea.canvas.height - myGameArea.canvas.height + (this.width+this.height/2);
      let left = myGameArea.canvas.width - myGameArea.canvas.width + (this.width+this.height/2);
      let right = myGameArea.canvas.width - (this.width+this.height/2);
      let crash = false;
       if (this.y > bottom) {
         this.y = bottom;
         this.speedY = 0;
         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
         crash = true;
       }
       if (this.y < top) {
         this.y = top;         
         this.speedY = 0;
         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
         crash = true;
       }
       if(this.x > right) {
       		 this.x = right;
       		 this.addForce = 0;
       		 crash = true;
       }
       if(this.x < left) {
         this.x = left;
         this.addForce = 0;
       		crash = true;
       }
       return crash;
    }
  }
}

function viewFullscreen(orientation) {
  clearInterval(myGameArea.interval);
document.documentElement.requestFullscreen();
screen.orientation.lock(orientation);
  startGame();
}

function setVibration(pattern) {
		window.navigator.vibrate(pattern);
}
