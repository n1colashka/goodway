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
  } // Функции работающие только на мобильных устройствах


  if (window.innerWidth <= 1250) {
    initMenu();
  }

  AOS.init();
  initCarsSlider();
});