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

    function showMoreCars() {
        const cars = document.querySelectorAll('.cars-slider__item');
        const carsBusiness = document.querySelectorAll('.cars-slider__item--business');
        const moreCarsBtn = document.querySelector('.cars__more-btn');
        const carsCheckbox = document.querySelector('.cars__type');

        // Сколько машин должно отображаться
        const carCount = 3;

        cars.forEach(car => {
            car.classList.add('hidden');
        });

        if (carsCheckbox.classList.contains('checked')) {
            
            for (let i = 0; i < carCount; i++) {
                carsBusiness[i].classList.remove('hidden');
            }
        } else {
            for (let i = 0; i < carCount; i++) {
                cars[i].classList.remove('hidden');
            }
        }

        moreCarsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moreCarsBtn.classList.add('hidden');
            cars.forEach(car => {
                car.classList.remove('hidden');
            });
        });

    }

    function initCarsSlider() {
        const carsSlider = new Swiper('.cars-slider', {
            slidesPerView: 4,
            // loop: true,
            navigation: {
                nextEl: '.cars-slider__arrow--next',
                prevEl: '.cars-slider__arrow--prev',
            },
            spaceBetween: 45,
            breakpoints: {
                320: {
                    init: false,
                },
                640: {
                },
                768: {
                },
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
                1571: {
                    slidesPerView: 4,
                    spaceBetween: 45,
                },
            }
        })

        if (window.innerWidth <= 1220) {
            showMoreCars();
            carsSlider.destroy();

            carsCheckbox.addEventListener('click', () => {
                carsCheckbox.classList.toggle('checked');
                if (moreCarsBtn.classList.contains('hidden')) return;
                else showMoreCars();
                
            // Таймаут, чтобы обновить слайдер точно после скрытия элементов, при клике на бизнес-такси
            setTimeout(() => carsSlider.update(), 100);
            });
        }
        
        const carsCheckbox = document.querySelector('.cars__type');
        const moreCarsBtn = document.querySelector('.cars__more-btn');

        carsCheckbox.addEventListener('click', () => {
            carsCheckbox.classList.toggle('checked');
            
        // Таймаут, чтобы обновить слайдер точно после скрытия элементов, при клике на бизнес-такси
        setTimeout(() => carsSlider.update(), 100);
        });
    }

    // Функции работающие только на мобильных устройствах
    if (window.innerWidth <= 1250) {
        initMenu();
    }
    

    AOS.init();
    initCarsSlider();

});