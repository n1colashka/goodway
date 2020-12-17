document.addEventListener('DOMContentLoaded', function () {

    function initMenu() {
        const menuBtn = document.querySelector('.header__btn');
        const menuWrapper = document.querySelector('.profile-menu');

        document.body.addEventListener('click', event => {
            if (event.target.closest('.profile-menu')) {
                menuWrapper.classList.add('active');
                menuBtn.classList.add('active');
            } else if (event.target.closest('.header__btn')) {
                menuWrapper.classList.toggle('active');
                menuBtn.classList.toggle('active');
            } else {
                menuWrapper.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }

    // Функции работающие только на мобильных устройствах
    if (window.innerWidth <= 768) {
        changePageType();
        initReadMore();
    }

    AOS.init();
    // initMenu();


});