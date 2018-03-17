class Review {
	constructor(leaveReview) {
		this.leaveReview = leaveReview;
		this.leaveReview.addEventListener('click', this.renderReviewBlock);
		
		
	}
	
	renderReviewBlock(e) {
		e.target.parentElement.innerHTML =`Share your thoughts with other customers:`
	}
	
	
}

new Review(document.getElementById('leave-review-trigger'));