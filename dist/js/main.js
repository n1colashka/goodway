"use strict";

document.addEventListener('DOMContentLoaded', function () {
  function initMenu() {
    var menuBtn = document.querySelector('.menu__btn');
    var menuCloseBtn = document.querySelector('.menu__close');
    var html = document.querySelector('html');
    var menuWrapper = document.querySelector('.menu');
    document.body.addEventListener('click', function (event) {
      if (event.target.closest('.menu__btn')) {
        menuWrapper.classList.add('open'); // html.classList.add('overflow-hidden');
      } else if (event.target.closest('.menu__close') || !event.target.closest('.menu')) {
        menuWrapper.classList.remove('open'); // html.classList.remove('overflow-hidden');
      }
    });
  }

  function showMoreCars() {
    var cars = document.querySelectorAll('.cars-slider__item');
    var carsBusiness = document.querySelectorAll('.cars-slider__item--business');
    var moreCarsBtn = document.querySelector('.cars__more-btn');
    var carsCheckbox = document.querySelector('.cars__type'); // Сколько машин должно отображаться

    var carCount = 3;
    cars.forEach(function (car) {
      car.classList.add('hidden');
    });

    if (carsCheckbox.classList.contains('checked')) {
      for (var i = 0; i < carCount; i++) {
        carsBusiness[i].classList.remove('hidden');
      }
    } else {
      for (var _i = 0; _i < carCount; _i++) {
        cars[_i].classList.remove('hidden');
      }
    }

    moreCarsBtn.addEventListener('click', function (e) {
      e.preventDefault();
      moreCarsBtn.classList.add('hidden');
      cars.forEach(function (car) {
        car.classList.remove('hidden');
      });
    });
  }

  function initCarsSlider() {
    var carsSlider = new Swiper('.cars-slider', {
      slidesPerView: 4,
      // loop: true,
      navigation: {
        nextEl: '.cars-slider__arrow--next',
        prevEl: '.cars-slider__arrow--prev'
      },
      spaceBetween: 45,
      breakpoints: {
        320: {
          init: false
        },
        640: {},
        768: {},
        1024: {
          slidesPerView: 'auto',
          spaceBetween: 30
        },
        1571: {
          slidesPerView: 4,
          spaceBetween: 45
        }
      }
    });

    if (window.innerWidth <= 1220) {
      showMoreCars();
      carsSlider.destroy();
      carsCheckbox.addEventListener('click', function () {
        carsCheckbox.classList.toggle('checked');
        if (moreCarsBtn.classList.contains('hidden')) return;else showMoreCars(); // Таймаут, чтобы обновить слайдер точно после скрытия элементов, при клике на бизнес-такси

        setTimeout(function () {
          return carsSlider.update();
        }, 100);
      });
    }

    var carsCheckbox = document.querySelector('.cars__type');
    var moreCarsBtn = document.querySelector('.cars__more-btn');
    carsCheckbox.addEventListener('click', function () {
      carsCheckbox.classList.toggle('checked'); // Таймаут, чтобы обновить слайдер точно после скрытия элементов, при клике на бизнес-такси

      setTimeout(function () {
        return carsSlider.update();
      }, 100);
    });
  }

  function initBenefitsSlider() {
    var benefitsSlider = document.querySelector('.benefits__slider');
    var benefitsSliderWrapper = document.querySelector('.benefits__list');
    var benefitsSliderItems = document.querySelectorAll('.benefits__slider-item');
    benefitsSlider.classList.add('swiper-container');
    benefitsSliderWrapper.classList.add('swiper-wrapper');
    benefitsSliderItems.forEach(function (item) {
      item.classList.add('swiper-slide');
    });
    var benefitsSliderSwiper = new Swiper('.benefits__slider', {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.benefits-button-next',
        prevEl: '.benefits-button-prev'
      }
    });
  }

  function initCarMove() {
    var car = document.querySelector("#car");
    var carWrapper = document.querySelector(".benefits__inner");
    var startX = -100,
        blurValue = 5,
        w = document.documentElement.offsetWidth,
        h = document.documentElement.offsetHeight;
    carWrapper.addEventListener('mousemove', function (evt) {
      var posX = Math.round(evt.clientX / w * startX);
      car.style.transform = "translateX(".concat(posX, "px)");
      car.style.filter = "blur(".concat(blurValue, "px)");
      moveRange = evt.movementX;
    });
    carWrapper.addEventListener('mouseleave', function () {
      car.style.transform = '';
      car.style.filter = '';
    });
  }

  function removeBenefitsItemsAnimations() {
    var benefitsItems = document.querySelectorAll('.benefits__item');
    benefitsItems.forEach(function (item) {
      item.removeAttribute('data-aos');
    });
  }

  function initAos() {
    AOS.init({
      // Global settings:
      disable: false,
      // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded',
      // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init',
      // class applied after initialization
      animatedClassName: 'aos-animate',
      // class applied on animation
      useClassNames: false,
      // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false,
      // disables automatic mutations' detections (advanced)
      debounceDelay: 50,
      // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99,
      // the delay on throttle used while scrolling the page (advanced)
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120,
      // offset (in px) from the original trigger point
      delay: 0,
      // values from 0 to 3000, with step 50ms
      duration: 500,
      // values from 0 to 3000, with step 50ms
      easing: 'ease',
      // default easing for AOS animations
      once: false,
      // whether animation should happen only once - while scrolling down
      mirror: false,
      // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation

    });
  }

  function initStepsSliders() {
    var galleryThumbs = new Swiper('.steps-nav-slider', {
      slidesPerView: 5,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      touchRatio: 0,
      breakpoints: {
        320: {
          touchRatio: 1,
          freeMode: true
        },
        601: {
          touchRatio: 0,
          slidesPerView: 5
        }
      }
    });
    var galleryTop = new Swiper('.steps-main-slider', {
      navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      initialSlide: 4,
      thumbs: {
        swiper: galleryThumbs
      }
    });
  }

  function changeStepsLineSize() {
    var lines = document.querySelectorAll('.steps-nav-slider__line svg line');
    var lineSvg = document.querySelectorAll('.steps-nav-slider__line svg');
    lines.forEach(function (line) {
      line.setAttribute('x2', '120');
    });
    lineSvg.forEach(function (line) {
      line.setAttribute('width', '120');
      line.setAttribute('viewBox', '0 0 120 3');
    });
  }

  function initCalculator() {
    function initRange() {
      // Initialize a new plugin instance for one element or NodeList of elements.
      var slider = document.querySelector('.calculator__range input');
      rangeSlider.create(slider, {
        polyfill: true,
        // Boolean, if true, custom markup will be created
        root: document,
        rangeClass: 'rangeSlider',
        disabledClass: 'rangeSlider--disabled',
        fillClass: 'rangeSlider__fill',
        bufferClass: 'rangeSlider__buffer',
        handleClass: 'rangeSlider__handle',
        startEvent: ['mousedown', 'touchstart', 'pointerdown'],
        moveEvent: ['mousemove', 'touchmove', 'pointermove'],
        endEvent: ['mouseup', 'touchend', 'pointerup'],
        vertical: false,
        // Boolean, if true slider will be displayed in vertical orientation
        min: null,
        // Number, 0
        max: null,
        // Number, 100
        step: null,
        // Number, 1
        value: null,
        // Number, center of slider
        buffer: null,
        // Number, in percent, 0 by default
        stick: null,
        // [Number stickTo, Number stickRadius] : use it if handle should stick to ${stickTo}-th value in ${stickRadius}
        borderRadius: 10,
        // Number, if you're using buffer + border-radius in css
        onInit: function onInit() {// console.info('onInit')
        },
        onSlideStart: function onSlideStart(position, value) {// console.info('onSlideStart', 'position: ' + position, 'value: ' + value);
        },
        onSlide: function onSlide(position, value) {
          // console.log('onSlide', 'position: ' + position, 'value: ' + value);
          // Двигаем ползунок
          var rangeHandlePosition = document.querySelector('.rangeSlider__handle').style.transform;
          document.querySelector('.calculator__range-curr').style.transform = rangeHandlePosition;
          document.querySelector('.calculator__range-curr').textContent = "".concat(position);
          if (position == 1 || position == 31) document.querySelector('.calculator__range-curr').textContent = ''; // Рассчет, базовое значение 5500 в день

          var profit = document.querySelector('#profit');
          var profitPerDay = 5500;
          profit.textContent = position * profitPerDay;
        },
        onSlideEnd: function onSlideEnd(position, value) {// console.warn('onSlideEnd', 'position: ' + position, 'value: ' + value);
        }
      }); // update position

      var triggerEvents = true; // or false

      slider.rangeSlider.update({
        min: 1,
        max: 31,
        step: 1,
        value: 12,
        buffer: 0
      }, triggerEvents);
    }

    function calculate() {
      var profit = document.querySelector('#profit');
    }

    initRange();
  }

  function initModalAbout() {
    var modal = document.querySelector('.about__box');
    var modalBtn = document.querySelector('.about__icon');
    var overlay = document.querySelector('.overlay');
    var html = document.querySelector('html');
    modalBtn.addEventListener('click', function () {
      modal.classList.toggle('open');
      overlay.classList.toggle('active');
      html.classList.toggle('overflow-hidden');
    });
    overlay.addEventListener('click', function () {
      modal.classList.remove('open');
      overlay.classList.remove('active');
      html.classList.remove('overflow-hidden');
    });
  }

  function aboutNumbersRun() {
    var time = 4000;
    var step = 100;
    var numbers = document.querySelectorAll('.about__num');

    function outNum(num, elem, step) {
      var n = 0;
      var t = Math.round(time / (num / step));
      var interval = setInterval(function () {
        n += step;
        if (n == num) clearInterval(interval);
        elem.textContent = n;
      }, t);
    }

    numbers.forEach(function (number) {
      if (number.dataset.num <= 50) step = 1;else step = 100;
      outNum(number.dataset.num, number, step);
    });
  }

  function initStartNumbersRun() {
    var Visible = function Visible() {
      target = document.querySelector('.about__title'); // Все позиции элемента

      var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
          // Получаем позиции окна
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

      if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
      targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
      targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
      targetPosition.left < windowPosition.right) {
        // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
        // Если элемент полностью видно, то запускаем следующий код
        window.removeEventListener('scroll', Visible);
        aboutNumbersRun();
      }
    }; // Запускаем функцию при прокрутке страницы


    window.addEventListener('scroll', Visible); // А также запустим функцию сразу. А то вдруг, элемент изначально видно

    Visible();
  } // Функции работающие только на мобильных устройствах


  if (window.innerWidth <= 1250) {
    initMenu();
  }

  if (window.innerWidth <= 845) {
    removeBenefitsItemsAnimations();
    initBenefitsSlider();
    initModalAbout();
  }

  if (window.innerWidth <= 768) {
    changeStepsLineSize();
  }

  initCalculator();
  initCarMove();
  initAos();
  initStepsSliders();
  initCarsSlider();
  initStartNumbersRun(); // document.addEventListener('aos:in:aboutTitle', () => {
  //     aboutNumbersRun();
  // });
});