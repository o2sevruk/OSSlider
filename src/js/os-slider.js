(function (global) {
	"use strict";
	
	let OSSlider = global.OSSlider = function (el, settings) {
		
		let self = this,
			defaults = {
				currentSlide: 0,
				speed: 400,
				selectors: {
					wrapper: ".os-slider-items-wrapper",
					slide: ".os-slider__item",
					prev: ".os-slider__prev",
					next: ".os-slider__next"
				}
			};
		
		self.$element = document.querySelector(el);
		self.options = Object.assign({}, defaults, settings);
		
		let options = self.options;
		
		const $wrapper = self.$element.querySelectorAll(options.selectors.wrapper),
			$prev = self.$element.querySelectorAll(options.selectors.prev),
			$next = self.$element.querySelectorAll(options.selectors.next);
		
		let currentSlide = options.currentSlide,
			slidesLength = self.$element.querySelectorAll(options.selectors.slide).length,
			leftPosition = -(currentSlide * self.getCurrentItemWidth(self.$element.querySelectorAll(options.selectors.slide), currentSlide));
		
		self.setSlideWidth(self.$element.querySelectorAll(options.selectors.slide));
		
		$wrapper[0].style.width = `${self.getWidth(self.$element.querySelectorAll(options.selectors.slide))}px`;
		$wrapper[0].style.transitionDuration = `${options.speed / 1000}s`;
		
		$wrapper[0].style.left = `${leftPosition}px`;
		
		function decreasePosition() {
			
			if (currentSlide - 1 < 1) {
				
				$prev[0].setAttribute("disabled", "disabled");
				
			}
			
			if (currentSlide - 1 < 0) return;
			
			$next[0].removeAttribute("disabled");
			
			currentSlide = currentSlide - 1;
			leftPosition = leftPosition + self.getCurrentItemWidth(self.$element.querySelectorAll(options.selectors.slide), currentSlide);
			
			$wrapper[0].style.left = `${leftPosition}px`;
			
		}
		
		function increasePosition() {
			
			if (currentSlide + 1 > slidesLength - 2) {
				
				$next[0].setAttribute("disabled", "disabled");
				
			}
			
			if (currentSlide + 1 > slidesLength - 1) return;
			
			$prev[0].removeAttribute("disabled");
			
			currentSlide = currentSlide + 1;
			leftPosition = leftPosition - self.getCurrentItemWidth(self.$element.querySelectorAll(options.selectors.slide), currentSlide);
			
			$wrapper[0].style.left = `${leftPosition}px`;
			
		}
		
		$prev[0].addEventListener("click", decreasePosition);
		
		$next[0].addEventListener("click", increasePosition);
		
	};
	
	OSSlider.prototype.getWidth = function (collection) {
		
		let width = null,
			i = collection.length;
		
		while (i--) {
			
			width += collection[0].offsetWidth;
			
		}
		
		return width;
		
	};
	
	OSSlider.prototype.setSlideWidth = function (collection) {
		
		let i = collection.length;
		
		while (i--) {
			
			collection[i].style.width = `${collection[i].offsetWidth}px`;
			
		}
		
	};
	
	OSSlider.prototype.getCurrentItemWidth = function (element, i) {
		
		return element[i].offsetWidth;
		
	};
	
}(this));
