document.addEventListener('DOMContentLoaded', function () {

    function initMenu() {
        const menuBtn = document.querySelector('.menu__btn');
        const menuCloseBtn = document.querySelector('.menu__close');
        const html = document.querySelector('html');
        const menuWrapper = document.querySelector('.menu');

        document.body.addEventListener('click', event => {
            if (event.target.closest('.menu__btn')) {
                menuWrapper.classList.add('open');
                // html.classList.add('overflow-hidden');
            } else if (event.target.closest('.menu__close') || (!event.target.closest('.menu'))){
                menuWrapper.classList.remove('open');
                // html.classList.remove('overflow-hidden');
            } 
        });
    }

    // Функции работающие только на мобильных устройствах
    if (window.innerWidth <= 1250) {
        initMenu();
    }

    AOS.init();


});