var displayWindow = function(link, name, width, height) {
	
	var incrementor = 30;
	
	var windowToDisplay = document.getElementById(name);
	windowToDisplay.style.display = "none";
	windowToDisplay.style.width = width + "px";
	windowToDisplay.style.height = height + "px";
	
	var underlayer = document.createElement("DIV");
	
	function displayWindowNow() {

		createUnderlayer();
		initializeWindow();
		
		document.body.appendChild(underlayer);
		//appending underlayer
		document.body.appendChild(windowToDisplay);
		transitionIn();
	}
	
	function dismissWindow() {
		transitionOut();

	}
	
	//helper methods
	function initializeWindow() {
		windowToDisplay.style.position = "fixed";
		windowToDisplay.style.display = "block";
		windowToDisplay.style.top = "-" + height + "px";
		windowToDisplay.style.left = "-" + width + "px";

		windowToDisplay.style.backgroundColor = "white";
		windowToDisplay.style.zIndex = 1000;
	}
	
	function transitionIn() {
		function frameUnderLayer() {
			incremenetOpacityOfUnderlayer();
			if(underlayer.style.opacity == "0.7") {
				clearInterval(transitionInUnderLayer); 
			}	
		}
		
		function frameWindowToDisplay() {
			var shouldExit = moveWindowIn();
			if(shouldExit) {
				clearInterval(transitionInWindowToDisplay); 					
			}
		}
		
		var transitionInUnderLayer = setInterval(frameUnderLayer, 20);
		var transitionInWindowToDisplay = setInterval(frameWindowToDisplay, 15);
	}
	
	function moveWindowIn() {
		 var windowTop = windowToDisplay.style.top;
		 var windowLeft = windowToDisplay.style.left;
		 
		 var incrementForLeft = incrementor + getTheIncrementForLeft();
		 
		 var windowNewTop = parseInt(windowTop) + incrementor;
		 var windowNewLeft = parseInt(windowLeft) + incrementForLeft;
		 
		 windowToDisplay.style.top = windowNewTop + "px";
		 windowToDisplay.style.left = windowNewLeft + "px";
		 
		 if(parseInt(windowToDisplay.style.top) >= getYForFinalWindow()){
			 return true;
		 }
		 return false;
	}
	
	function getTheIncrementForLeft() {
		var difference = getDifference();
		var times = 0;
		
		for(var i = parseInt(windowToDisplay.style.top); 
		i < getYForFinalWindow(); 
		i = i + incrementor) {
			times++;
		}
		
		return difference/times;
	}
	
	
	function getDifference() {
		var differenceInX = getXForFinalWindow() - parseInt(windowToDisplay.style.left);
		var differenceInY = getYForFinalWindow() - parseInt(windowToDisplay.style.top);
		if(differenceInX > differenceInY) {
			var difference = differenceInX - differenceInY;
		}else{
			var difference = differenceInY - differenceInX;
		}
		return difference;
	}
	
	
	function getXForFinalWindow() {
		return (parseInt(window.innerWidth) - parseInt(windowToDisplay.style.width))/2;
	}

	function getYForFinalWindow() {
		return (parseInt(window.innerHeight) - parseInt(windowToDisplay.style.height))/2;
	}
	
	function incremenetOpacityOfUnderlayer() {
		var opacityValue = underlayer.style.opacity;
		var newOpacityValue = parseFloat(opacityValue) + 0.1;
		underlayer.style.opacity = newOpacityValue.toString();
	}
	
	function transitionOut() {
		function frameUnderLayer() {
			decremenetOpacityOfUnderlayer();
			if(parseFloat(underlayer.style.opacity) <= 0.0) {
				document.body.removeChild(underlayer);
				document.body.removeChild(windowToDisplay);
				clearInterval(transitionOutUnderLayer); 
			}
		}
	
		var transitionOutUnderLayer = setInterval(frameUnderLayer, 20);	
	}
	
	
	function decremenetOpacityOfUnderlayer() {
		var opacityValue = underlayer.style.opacity;
		var newOpacityValue = parseFloat(opacityValue).toFixed(1) - 0.1;
		underlayer.style.opacity = newOpacityValue.toString();
	}
	
	function createUnderlayer() {
		underlayer.style.position = "fixed";
		underlayer.style.top = "0px";
		underlayer.style.left = "0px";
		underlayer.style.width = window.innerWidth + "px";
		underlayer.style.height = window.innerHeight + "px";
		underlayer.style.backgroundColor = "black";
		underlayer.style.opacity = "0.0";
		underlayer.style.zIndex = 10;
		underlayer.addEventListener("click", dismissWindow);
	}
	
	var element = document.getElementById(link);
	element.firstChild.addEventListener("click", displayWindowNow);
}