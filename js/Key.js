(function (exports) {

	// Singleton
	var Key = {};
	exports.Key = Key;

	var touchStartX = 0;
	var touchStartY = 0;
	var isDrawing = false;

	var canvas = document.getElementById("canvas_intro");
	var ctx = canvas.getContext("2d");
	
    function drawPoint(x, y, ctx) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    function clearCanvas(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

	// Event Handling for touchstart
	var onTouchStart = function (event) {
		touchStartX = event.touches[0].clientX;
		touchStartY = event.touches[0].clientY;
		isDrawing = true;
        var touch = event.touches[0];
        drawPoint(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop, ctx);
		if (window.STAGE == 4) return;
		event.stopPropagation();
		
	}

	var onTouchMove = function (event) {
		var touchX = event.touches[0].clientX;
		var touchY = event.touches[0].clientY;
		var deltaX = touchX - touchStartX;
		var deltaY = touchY - touchStartY;
		Key["left"] = false; // Left
		Key["right"] = false; // Right
		Key["up"] = false; // Down
		Key["down"] = false; // Up

		var di = 50
		if (deltaX > di) {
			Key["right"] = true; // Right
		} else if (deltaX < -di) {
			Key["left"] = true; // Left
		}

		if (deltaY > di) {
			Key["down"] = true;  // Down
		} else if (deltaY < -di) {
			Key["up"] = true;  // Up
		}
		if (isDrawing) {
            var touch = event.touches[0];
            clearCanvas(ctx);
            drawPoint(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop, ctx);

		}
		if (window.STAGE == 4) return;
		event.stopPropagation();
		
	}


	// Event Handling for touchend
	var onTouchEnd = function (event) {
		Key["left"] = false; // Left
		Key["right"] = false; // Right
		Key["up"] = false; // Down
		Key["down"] = false; // Up
		isDrawing = false;
        clearCanvas(ctx);
		if (window.STAGE == 4) return;
		event.stopPropagation();
		
	}

	window.addEventListener("touchstart", onTouchStart, false);
	window.addEventListener("touchmove", onTouchMove, false);
	window.addEventListener("touchend", onTouchEnd, false);



})(window);