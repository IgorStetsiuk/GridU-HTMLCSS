const trigger = document.getElementById('filter-btn');
const popup = document.getElementById('filter-popup');


let isPopupOpen = false;

trigger.addEventListener('click', (e) => {
    toggle();
    e.stopPropagation();
});


function toggle() {
    popup.classList.toggle('open');
    isPopupOpen = !isPopupOpen;
}

// Range slider (according to task)

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));
});