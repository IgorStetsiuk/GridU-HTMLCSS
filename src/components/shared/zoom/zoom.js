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
		this.zoomResultBoundaries = document.getElementById('zoom-result-boundaries');
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
			this.lens.addEventListener('mouseout', this.removeLensAndResultView.bind(this));
			
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
		let {width, height} = getComputedStyle(this.zoomResultBoundaries);
		// const {width, height} = this.imageBoundaries;
		let resultView = document.createElement('div');
		resultView.classList.add('zoom-result');
		resultView.style.width = `${parseInt(width) / 2}px`;
		resultView.style.height = `${parseInt(height) - 30}px`;
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
	
	
	watermarkImage(elemImage, text) {
		
		const testImage = new Image();
		testImage.onload = () => {
			const h = testImage.height, w = testImage.width, img = new Image();
			img.onload = () => {
				const canvas = Object.assign(document.createElement('canvas'), {width: w, height: h});
				const ctx = canvas.getContext('2d');
				ctx.drawImage(testImage, 0, 0);
				ctx.drawImage(img, 0, 0);
				elemImage.src = canvas.toDataURL('image/png');
			};
			
			this.createSVGImage(img, text, h, w);
		};
		testImage.src = elemImage.src;
	}
	
	createSVGImage(img, text, h, w) {
		img.src = 'data:image/svg+xml;base64,' + window.btoa(
			'<svg xmlns="http://www.w3.org/2000/svg" height="' + h + '" width="' + w + '">' +
			'<foreignObject width="100%" height="100%">' +
			'<div xmlns="http://www.w3.org/1999/xhtml">' +
			'<div style="position: absolute;' +
			'right: 40px;' +
			'top: 40px;' +
			'font-family: Tahoma;' +
			'font-size: 34px;' +
			'color: #bfbfbf;' +
			'">' + text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</div>' +
			'</div>' +
			'</foreignObject>' +
			'</svg>'
		);
	}
}


new Zoom(document.querySelector('.zoom-container')).watermarkImage(document.querySelector('.product--img'), 'Watermark');