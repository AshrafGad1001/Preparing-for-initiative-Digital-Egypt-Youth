const dropDown = document.querySelector('.dropDown');



const select = dropDown.querySelector('.select');
const arrow = dropDown.querySelector('.arrow');
const menu = dropDown.querySelector('.menu');
const options = dropDown.querySelectorAll('.menu li');
const selected = dropDown.querySelector('.selected');




select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    arrow.classList.toggle('arrow-rotate');
    menu.classList.toggle('menu-open');

});

options.forEach(option => {
    option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        option.classList.remove('arrow-rotate');
        menu.classList.remove('menu-open');
    });
});



