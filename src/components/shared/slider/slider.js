class Slider {
	constructor(slider) {
		this.slider = slider;
		this.slides = Array.from(slider.querySelectorAll('.slide'));
		this.slides[0].classList.add('active');
		this.controls = slider.querySelectorAll('.control');
		this.init();
		
	}
	
	init() {
		let [previous, next] = Array.from(this.controls);
		previous.addEventListener('click', this.switchPreviousSlide.bind(this));
		next.addEventListener('click', this.switchNextSlide.bind(this));
		
	}
	
	
	switchPreviousSlide() {
		const activeSlideIndex = this.getActiveSlideIndex();
		const slides = this.slides;
		
		if (activeSlideIndex < slides.length && activeSlideIndex - 1 >= 0) {
			slides[activeSlideIndex - 1].classList.add('active')
		} else {
			this.goToLast();
		}
		
		
	}
	
	switchNextSlide() {
		const activeSlideIndex = this.getActiveSlideIndex();
		const slides = this.slides;
		
		if (activeSlideIndex < slides.length && (activeSlideIndex + 1) !== slides.length) {
			slides[activeSlideIndex + 1].classList.add('active')
		} else {
			this.goToFirst();
		}
	}
	
	getActiveSlideIndex() {
		let activeSlide = this.slider.querySelector('.active');
		activeSlide.classList.remove('active');
		return this.slides.indexOf(activeSlide);
		
	}
	
	goToLast() {
		this.slides[this.slides.length - 1].classList.add('active')
	}
	
	goToFirst() {
		this.slides[0].classList.add('active')
	}
	
}


new Slider(document.getElementById('slider'));