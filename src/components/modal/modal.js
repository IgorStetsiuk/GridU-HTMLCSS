/**
 *
 *  Modal script
 *
 */

const modalContents = document.getElementsByClassName('modal');
let isModalOpen = false;

// const modalClassesList = ['modal','close-modal','active','modal active','open-modal'];

document.body.onclick = function (e) {
    const target = e.target;

    // // check if target concerns modal window, else don`t execute this handler
    // if(!modalClassesList.includes(target.className)) return;

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
