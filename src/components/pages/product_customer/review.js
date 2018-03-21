class Review {
    constructor(leaveReview) {
        this.leaveReview = leaveReview;
        this.applyTrigerListener(this.leaveReview);
    }


    showReviewEditor(e) {
        this.keptLeaveReviewHTML = getByClass('leave-review').innerHTML;
        e.target.parentElement.innerHTML = `Share your thoughts with other customers:`;
        this.initEditorListeners();
    }

    initEditorListeners() {
        getByClass('review').style.display = 'block';
        const authorNameAvatar = getById('author-avatar');
        authorNameAvatar.addEventListener('change', this.handleUploadedAvatar.bind(this));
        this.listenInputChange('author-name', 'name-preview');
        this.listenInputChange('author-review', 'review-preview');
        this.applyEditorListeners();
        this.defineRating();
        this.onClose();
    }

    listenInputChange(DOMInputElementId, targetStrId) {
        getById(DOMInputElementId).addEventListener('input', ({target}) => {
            let element = getById(targetStrId);
            target.tagName === 'INPUT' ?
                element.textContent = target.value : element.innerHTML = this.parseIntoValidHTML(target.value);

        });
    }
    
    applyTrigerListener(element){
	    element.addEventListener('click', this.showReviewEditor.bind(this));
    }

    applyEditorListeners() {
        const textArea = getById('author-review');
        this.editorRefs = {textArea, previewArea: getById('review-preview')};

        textArea.addEventListener('select', ({target}) => {
            this.editorRefs.text = target.value.slice(target.selectionStart, target.selectionEnd);
        });

        getByClass('comment--footer').addEventListener('click', ({target}) => {
            if (target.tagName === 'BUTTON' && target.dataset.edit) {
                const action = target.dataset.edit;
                this.applyEditorMethod(action);
            }
        })
    }
	

    applyEditorMethod(action) {
        switch (action) {
            case 'bold':
                this.changeSelectedText();
                break;
            case 'emphasize':
                this.changeSelectedText('emphasize');
                break;
            case 'quote':
                this.makeTextQuote(this.editorRefs);
                break;
            default:
                return;

        }
    }

    changeSelectedText(marker) {
        const {text, textArea, previewArea} = this.editorRefs;
        const strToReplace = marker === 'emphasize' ? `[i]${text}[/i]` : `[b]${text}[/b]`;
        const changedValue = textArea.value.replace(text, strToReplace);
        textArea.value = changedValue;
        previewArea.innerHTML = this.parseIntoValidHTML(changedValue);

    }

    makeTextQuote({text, textArea, previewArea}) {
        const strToReplace = `[q]${text}[/q]`;
        textArea.value = textArea.value.replace(text, strToReplace);
        const changedValue = previewArea.innerHTML.replace(text, strToReplace);
        previewArea.innerHTML = this.parseIntoValidHTML(changedValue);

    }

    handleUploadedAvatar(e) {
        const authorImagesArr = Array.from(getAllByClass('avatar-thumbnail'));
        const file = e.target.files[0];
        if (!/^image\/\w{3,4}/.test(file.type)) return;
        authorImagesArr.forEach(avatarImg => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                avatarImg.src = e.target.result
            };
        });
        const uploadStatus = getByClass('upload-status');
        uploadStatus.textContent = 'Image selected';
        uploadStatus.style.opacity = '1';

    }

    defineRating() {
        const ACTIVE_START_SRC = '../../../assets/decor/star-active.svg';
        const INACTIVE_START_SRC = '../../../assets/decor/star-inactive.svg';

        const ratingContainer = getById('rating');
        const ratingStarsArr = Array.from(ratingContainer.children);
        const previewRatingContainer = getById('rating-preview');


        const resetSelectedStars = () => ( ratingStarsArr.forEach(item => {
            item.setAttribute('data-state', 'inactive');
            item.src = INACTIVE_START_SRC;
        }));

        const renderPreviewRating = (array) => {
            previewRatingContainer.innerHTML = '';
            array.forEach(el => previewRatingContainer.appendChild(el.cloneNode(false)));
        };

        ratingContainer.addEventListener('click', ({target}) => {
            resetSelectedStars();
            const selectedStarIndex = ratingStarsArr.indexOf(target);
            let previewRating = ratingStarsArr.map((currentStart, index) => {
                const currentState = currentStart.dataset.state;
                if (currentState === 'inactive' && selectedStarIndex >= index) {
                    currentStart.src = ACTIVE_START_SRC;
                    currentStart.setAttribute('data-state', 'active');
                    return currentStart;
                }
                return currentStart;
            });
            renderPreviewRating(previewRating);
        });
    }

    parseIntoValidHTML(string) {
        return string
            .replace(/\[q](.*?)\[\/q]/gim, '<span class="quote">$1</span>')
            .replace(/\[i](.*?)\[\/i]/gim, '<i>$1</i>')
            .replace(/\[b](.*?)\[\/b]/gim, '<b>$1</b>')
    }

    onClose() {
        getByClass('submit-controls').addEventListener('click', ({target}) => {
            if (target.id === 'cancel-btn') {
                getByClass('review').style.display = 'none';
                const triggerBlock =  getByClass('leave-review');
	            triggerBlock.innerHTML = this.keptLeaveReviewHTML;
	            this.applyTrigerListener(triggerBlock);
	            
            }
            if (target.id === 'submit-btn') {
                alert('You review has been saved');
            }
        });
    }


}

function getAllByClass(className) {
    return document.getElementsByClassName(className);
}

function getByClass(className) {
    return document.querySelector(`.${className}`);
}

function getById(id) {
    return document.getElementById(id);
}


new Review(document.getElementById('leave-review-trigger'));
