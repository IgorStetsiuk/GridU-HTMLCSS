/**
 *  Modal
 *
 *  USAGE : on the page define element button with class 'open-modal' and
 *  attribute 'data-modalName' (e.g.: <button class="open-modal" data-modalName="example">Example</button>)
 *  and respective element with class 'modal' and attribute 'data-modalName'
 *  (e.g.: <div class="modal" data-modalName="example"></div>) this script will find among all modals
 *  which button was pressed (by attribute data-modalName) compare it and then opens appropriate modal.
 *
 *  Main idea: On the page can be many modals windows with it`s content, all of them are hidden by default
 *  every modal has it`s appropriate trigger (button(s)).
 *
 *  Requirements: for now structure of modal must be @see { modalStructure }
 */

const modalContents = document.getElementsByClassName('modal');
const modalTriggers = document.getElementsByClassName('open-modal');

let isModalOpen = false;

(function () {
    if(modalContents.length && modalTriggers.length) {
        enableModal();
    }
})();

function enableModal() {
    document.body.onclick = function (e) {
        const target = e.target;

        const activeModal = document.querySelector('.modal.active');

        if (target.nodeType = 'BUTTON' && target.classList.contains('open-modal')) {
            open(target);
            return
        }

        if (isModalOpen && target.classList.contains('close-modal')) {
            close(activeModal);
        } else if (target.classList.contains('modal')) {
            close(activeModal);
        }
    };

}

function open(trigger) {
    const activeModalName = trigger.dataset.modalname;
    const modalContentsArr = Array.prototype.slice.call(modalContents);
    const currentModal = modalContentsArr.find((item) => {
        return item.dataset.modalname === activeModalName;
    });
    currentModal.classList.add('active');
    isModalOpen = !isModalOpen;
}

function close(modal) {
   if(modal) {
       modal.classList.remove('active');
       isModalOpen=!isModalOpen;
   }

}

// example of modal structure on the page
const modalStructure = (content) => { `
<div class="modal" data-modalName="example">
    <div class="modal__body">
        <div class="modal__header">
            <span class="modal__title">Buy</span>
            <span class="modal__close-sign close-modal">&times;</span>
        </div>
        <div class="modal__content">
           ${content}
        </div>
    </div>
</div>`};