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
  } // Функции работающие только на мобильных устройствах


  if (window.innerWidth <= 1250) {
    initMenu();
  }

  AOS.init();
});