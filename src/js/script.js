$(document).ready(function() {

  // Слайдер js
  $( '.js-lvl__slider' ).slider({
    orientation: "horizontal",
    range: "min",
    max: 256,
    value: 200
  });

  // Бургер меню
  $('.header__burger').on('click', function () {
    $(this).toggleClass('header__burger--open');
    $('.header__nav').fadeToggle();
  });

  $( window ).resize(function() {
    if ($(window).width() > 768) {
      $(this).removeClass('header__burger--open');
      $('.header__nav').fadeIn();
    } else {
      $('.header__nav').fadeOut();
    }
  });

  // Скролл к секции
  $('.header__link').on('click', function (e) {
    e.preventDefault();
    $(".header__link.header__link--active").removeClass("header__link--active");
    $(this).addClass("header__link--active");

    var anchor = $(this).data('anchor');

    $('html, body').animate({
      scrollTop: $('.' + anchor).offset().top
    }, 2000);
  });

  // Контроллер инпута
  var formFiled = $('.js-field');
  formFiled.blur(function() {
    var $this = $(this);

    if($this.val() !== ''){
      $this.parent().addClass('form-field--filled');
    } else {
      $this.parent().removeClass('form-field--filled');
    }

    $this.parent().css('border-color','#e5e5e5');
  });

  formFiled.focus(function() {
    var $this = $(this);

    $this.parent().addClass('form-field--filled');
    $this.parent().css('border-color','#435993');
  });

  formFiled.on('click', function() {
    var $this = $(this);

    $this.parent().focus();
  });

  // Контроллер селекта
  var adultAge = new Date().getFullYear() - 16;
  var oldestAge = adultAge - 30;

  for (adultAge; adultAge > oldestAge; adultAge--) {
    var selectList = '<li class="form-select__list-item">'+ adultAge +'</li>';
    $('.form-select__list').append(selectList);
  }

  $('.form-select__list-item').on('click', function () {
    var $selectParent = $(this).closest('.form-select');
    var value = $(this).text();

    $selectParent.addClass('form-select--filled');
    $selectParent.children('.form-select__val').html(value);
  });

  var selectActiveState = true;
  $('.form-select').on('click', function () {
    $(this).toggleClass('form-select--open');
    $(this).css('border-color', selectActiveState ? '#435993' : '#e5e5e5');
    selectActiveState = !selectActiveState;
  });
});
