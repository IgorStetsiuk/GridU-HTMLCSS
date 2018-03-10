class Zoom {
	
	constructor(zoomContainer) {
		this.zoomContainer = zoomContainer;
		this.lens = null;
		this.image = null;
		this.resultView = null;
		this.init();
		
		
	}
	
	init() {
		let zoomContainer = this.zoomContainer;
		
		if (zoomContainer && zoomContainer.classList.contains('zoom-container')) {
			this.zoomContainer.addEventListener('mouseover', this.zoomStart.bind(this));
			this.zoomContainer.addEventListener('mouseleave', this.removeLensAndResultView.bind(this));
			
			
		} else {
			throw new Error('\`zoom-container\` class isn\'t provided or define in constructor');
		}
		
	}
	
	zoomStart(e) {
		
		e.preventDefault();
		
		let img = e.target;
		if (img.classList.contains('zoom')) {
			this.image = img;
			this.imageBoundaries = this.getImageBoundaries(e.target);
			
			if (!this.lens) this.lens = this.createLens();
			if (!this.resultView) this.resultView = this.createResultView();
			
			let cx = this.resultView.offsetWidth / this.lens.offsetWidth;
			let cy = this.resultView.offsetHeight / this.lens.offsetHeight;
			
			this.resultView.style.backgroundImage = "url('" + img.src + "')";
			this.resultView.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
			
			this.lens.addEventListener('mousemove', this.moveLens.call(this, this.lens, cx, cy));
			img.addEventListener('mousemove', this.moveLens.call(this, this.lens, cx, cy));
			this.lens.addEventListener('mouseout',this.removeLensAndResultView.bind(this));
			
		}
		
	}
	
	moveLens(lens, cx, cy) {
		return (e) => {
			
			const {x: cursorX, y: cursorY} = this.getCursorPos(e);
			const img = this.image;
			
			let x = cursorX - (lens.offsetWidth / 2);
			let y = cursorY - (lens.offsetHeight / 2);
			
			if (x > img.width - lens.offsetWidth) {
				x = img.width - lens.offsetWidth;
			}
			if (x < 0) {
				x = 0;
			}
			if (y > img.height - lens.offsetHeight) {
				y = img.height - lens.offsetHeight;
			}
			if (y < 0) {
				y = 0;
			}
			if (x > img.width && y > img.height) {
				this.removeLensAndResultView();
			}
			lens.style.left = `${x}px`;
			lens.style.top = `${y}px`;
			
			this.resultView.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
			
		}
	}
	
	
	getImageBoundaries(element) {
		let {width, height, left, top} = element.getBoundingClientRect();
		return {width: Math.floor(width), height, left, top};
		
	}
	
	
	createResultView() {
		const {width, height} = this.imageBoundaries;
		let resultView = document.createElement('div');
		resultView.classList.add('zoom-result');
		resultView.style.width = `${width / 2}px`;
		resultView.style.height = `${height}px`;
		this.zoomContainer.appendChild(resultView);
		return resultView;
		
	}
	
	createLens() {
		let lens = document.createElement('div');
		lens.setAttribute('id', 'lens');
		this.zoomContainer.appendChild(lens);
		return lens;
		
	}
	
	removeLensAndResultView() {
			if (this.lens && this.resultView) {
				[this.resultView, this.lens].forEach(node => {
					node.remove();
				});
				this.resultView = null;
				this.lens = null;
			}

		
	}
	
	getCursorPos(e) {
		const {left, top} = this.imageBoundaries;
		return {x: e.pageX - left, y: e.pageY - top};
	}
	
	
}


new Zoom(document.querySelector('.zoom-container'));