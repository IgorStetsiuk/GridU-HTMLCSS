(() => {
  const trigger = document.getElementById('filter-btn');
  const popup = document.getElementById('filter-popup');


  let isPopupOpen = false;

  trigger.addEventListener('click', (e) => {
    toggle();
    e.stopPropagation();
  });

  document.addEventListener('click', ({target})=> {
    target.closest('#filter-popup') !== popup && isPopupOpen && toggle();
  });
  

  function toggle() {
    popup.classList.toggle('open');
    trigger.classList.toggle('active');
    isPopupOpen = !isPopupOpen;
  }

// Ranges slider (according to task)
  $("#price-slider, #rating-slider").slider({
    range: true,
    min: 0,
    max: 500,
    values: [0, 300],
  });
  
})();