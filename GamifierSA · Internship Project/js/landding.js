var navItems = document.querySelectorAll('.sec-navbar .nav-link');



navItems.forEach(option => {
    option.addEventListener('click', () => {
        var activeNow = document.querySelector('.sec-navbar .nav-link.active');
        activeNow.classList.remove('active');
        option.classList.add('active');
    });
});