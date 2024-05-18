(function (exports) {

	// Singleton
	var Key = {};
	exports.Key = Key;

	var touchStartX = 0;
	var touchStartY = 0;

	// Event Handling for touchstart
	var onTouchStart = function (event) {
		touchStartX = event.touches[0].clientX;
		touchStartY = event.touches[0].clientY;

		if (window.STAGE == 4) return;
		event.stopPropagation();
		event.preventDefault();
	}

	var onTouchMove = function(event){
		var touchX = event.touches[0].clientX;
		var touchY = event.touches[0].clientY;
		var deltaX = touchX - touchStartX;
		var deltaY = touchY - touchStartY;
		Key["left"] = false; // Left
		Key["right"] = false; // Right
		Key["up"] = false; // Down
		Key["down"] = false; // Up
		
		var di = 20
		if(deltaX > di) {
			Key["right"] = true; // Right
		} else if(deltaX < -di) {
			Key["left"] = true; // Left
		}

		if(deltaY > di) {
			Key["down"] = true;  // Down
		} else if(deltaY < -di) {
			Key["up"] = true;  // Up
		}

		
		if (window.STAGE == 4) return;
		event.stopPropagation();
		event.preventDefault();
	}

	
	// Event Handling for touchend
	var onTouchEnd = function (event) {
		Key["left"] = false; // Left
		Key["right"] = false; // Right
		Key["up"] = false; // Down
		Key["down"] = false; // Up
		if (window.STAGE == 4) return;
		event.stopPropagation();
		event.preventDefault();
	}

	window.addEventListener("touchstart", onTouchStart, false);
	window.addEventListener("touchmove", onTouchMove, false);
	window.addEventListener("touchend", onTouchEnd, false);



})(window);