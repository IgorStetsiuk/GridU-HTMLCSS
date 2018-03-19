class WatermarkImage {
	constructor() {
	
	}
	
	converIntoCanvas(img) {
		let image = document.createElement('img');
		
		img.onload = () => {
			let newImage = new Image();
			
			let imgCanvas = document.createElement("canvas");
			imgCanvas.width = image.width;
			imgCanvas.height = image.height;
			
			let ctx = imgCanvas.getContext("2d");
			imgCanvas.width = image.width;
			imgCanvas.height = image.height;
			
			ctx.drawImage(image, 0, 0, image.width, image.height);
			let imgInfom = imgCanvas.toDataURL("image/png");
			document.body.appendChild(image);
			
		};
		
		
	}
	
	static convertImageToCanvas(image) {
		var canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.style.display = "none";
		canvas.style.cssText = "position: absolute; z-index: -1; bottom: 20; left: 0;";
		canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
		
		return canvas.toDataURL('image/png');
	}
	
	createImage(elemImage, text) {
		// debugger
		
		var testImage = new Image();
		testImage.onload = function () {
			var h = testImage.height, w = testImage.width, img = new Image();
			// Once the image with the SVG of the watermark is loaded...
			img.onload = function () {
				// Make canvas with image and watermark
				var canvas = Object.assign(document.createElement('canvas'), {width: w, height: h});
				var ctx = canvas.getContext('2d');
				ctx.drawImage(testImage, 0, 0);
				ctx.drawImage(img, 0, 0);
				elemImage.src = canvas.toDataURL('image/png');
				
			};
			// SVG image watermark (HTML of text at bottom right)
			img.src = 'data:image/svg+xml;base64,' + window.btoa(
				'<svg xmlns="http://www.w3.org/2000/svg" height="' + h + '" width="' + w + '">' +
				'<foreignObject width="100%" height="100%">' +
				'<div xmlns="http://www.w3.org/1999/xhtml">' +
				'<div style="position: absolute;' +
				'right: 20px;' +
				'top: 20px;' +
				'font-family: Tahoma;' +
				'font-size: 40px;' +
				'background: #000;' +
				'color: #fff;' +
				'padding: 0.25em;' +
				'border-radius: 0.25em;' +
				'opacity: 0.6;' +
				'margin: 0 0.125em 0.125em 0;' +
				'">' + text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</div>' +
				'</div>' +
				'</foreignObject>' +
				'</svg>'
			);
			// img.src = WatermarkImage.convertImageToCanvas(document.querySelector('#watermark img'));
		};
		
		testImage.src = elemImage.src;

		
		
	}
}

new WatermarkImage().createImage(document.querySelector('.product--img'), 'Watermark');



