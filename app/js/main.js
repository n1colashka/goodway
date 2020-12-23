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

    function initBenefitsSlider() {
        const benefitsSlider = document.querySelector('.benefits__slider');
        const benefitsSliderWrapper = document.querySelector('.benefits__list');
        const benefitsSliderItems = document.querySelectorAll('.benefits__slider-item');

        benefitsSlider.classList.add('swiper-container');
        benefitsSliderWrapper.classList.add('swiper-wrapper');
        benefitsSliderItems.forEach(item => {
            item.classList.add('swiper-slide');
        });

        var benefitsSliderSwiper = new Swiper('.benefits__slider', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.benefits-button-next',
                prevEl: '.benefits-button-prev',
            },
        })
    }

    function initCarMove() {
        const car = document.querySelector("#car");
        const carWrapper = document.querySelector(".benefits__car");
        let moveRange = 0;
        
        var startX = -100,
            blurValue = 5,
            w = document.documentElement.offsetWidth,
            h = document.documentElement.offsetHeight;
        carWrapper.addEventListener('mousemove', function(evt){
            var posX = Math.round(evt.clientX / w * startX);
            car.style.transform = `translateX(${posX}px)`;
            car.style.filter = `blur(${blurValue}px)`;
            moveRange = evt.movementX;
        })
        carWrapper.addEventListener('mouseleave', function() {
            car.style.transform = '';
            car.style.filter = '';
        })
    
    }

    function removeBenefitsItemsAnimations() {
        const benefitsItems = document.querySelectorAll('.benefits__item');
        console.log(benefitsItems);

        benefitsItems.forEach(item => {
            console.log(item);
            item.removeAttribute('data-aos');
        })
    }

    function initAos() {
        AOS.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
            
    
            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 500, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    
            });
    }
    
    // Функции работающие только на мобильных устройствах
    if (window.innerWidth <= 1250) {
        initMenu();
    }

    if (window.innerWidth <= 845) {
        initBenefitsSlider();
        removeBenefitsItemsAnimations();
    }

    initCarsSlider();
    initCarMove();
    initAos();
    
});