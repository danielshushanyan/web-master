$(document).ready(function() {
    $('.form__input--date').datepicker({
        changeMonth: true,
        changeYear: true
    });

    $( '.js-lvl__slider' ).slider({
        orientation: "horizontal",
        range: "min",
        max: 256,
        value: 128,
    });

    $('.header__burger').on('click', function () {
       $(this).toggleClass('header__burger--open');
       $('.header__nav').fadeToggle();
    });

    $( window ).resize(function() {
        console.log('asdas');
        if ($(window).width() > 768) {
            $(this).removeClass('header__burger--open');
            $('.header__nav').fadeIn();
        } else {
            $('.header__nav').fadeOut();
        }
    });


    $('.header__link').on('click', function (e) {
        e.preventDefault();
        $(".header__link").removeClass("header__link--active");
        $(this).addClass("header__link--active");

        let anchor = $(this).data('anchor');

        $('html, body').animate({
            scrollTop: $('.' + anchor).offset().top
        }, 2000);
    });
});
