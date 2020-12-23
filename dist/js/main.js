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
    var carWrapper = document.querySelector(".benefits__car");
    var moveRange = 0;
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
  }

  function removeBenefitsItemsAnimations() {
    var benefitsItems = document.querySelectorAll('.benefits__item');
    console.log(benefitsItems);
    benefitsItems.forEach(function (item) {
      console.log(item);
      item.removeAttribute('data-aos');
    });
  } // Функции работающие только на мобильных устройствах


  if (window.innerWidth <= 1250) {
    initMenu();
  }

  if (window.innerWidth <= 845) {
    initBenefitsSlider();
    removeBenefitsItemsAnimations();
  }

  initCarsSlider();
  initCarMove();
});