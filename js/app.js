$(document).ready(function () {

 setTimeout(() => {
  const owlNav = $('#slider2 .owl-nav');
  const element = document.createElement('div');
  $(element).addClass('slider__num').html('1/4').appendTo(owlNav);
 });

 const sliderData = [{
   num: '1/4'
  },
  {
   num: '2/4'
  },
  {
   num: '3/4'
  },
  {
   num: '4/4'
  }
 ]
 let slider1 = $('#slider1');
 let slider2 = $('#slider2');
 let slider3 = $('#slider3');
 let slidesPerPage = 1;
 let syncedSecondary = true;

 slider1.owlCarousel({
  margin: 10,
  animateOut: 'fadeOut',
  smartSpeed: 500,
  loop: true,
  items: 1
 }).on('changed.owl.carousel', syncPosition);

 slider2.on('initialized.owl.carousel', function () {
  slider2.find(".owl-item").eq(0).addClass("current");
 }).owlCarousel({
  items: slidesPerPage,
  slideBy: 1,
  margin: 400,
  nav: true,
  navText: ["<img src='img/slider-arrow-left.svg'>", "<img src='img/slider-arrow-right.svg'>"],
  smartSpeed: 200,
  slideSpeed: 500,
  slideBy: slidesPerPage,
  responsiveRefreshRate: 100
 }).on('changed.owl.carousel', syncPosition2);

 function syncPosition(el) {
  let count = el.item.count - 1;
  let current = Math.round(el.item.index - (el.item.count / 2) - .5);

  if (current < 0) {
   current = count;
  }
  if (current > count) {
   current = 0;
  }

  slider2
   .find(".owl-item")
   .removeClass("current")
   .eq(current)
   .addClass("current");
  let onscreen = slider2.find('.owl-item.active').length - 1;
  let start = slider2.find('.owl-item.active').first().index();
  let end = slider2.find('.owl-item.active').last().index();

  if (current > end) {
   slider2.data('owl.carousel').to(current, 400, true);
  }
  if (current < start) {
   slider2.data('owl.carousel').to(current - onscreen, 400, true);
  }
 }

 slider2.on("click", ".owl-item", function (e) {
  e.preventDefault();
  let number = $(this).index();
  slider1.data('owl.carousel').to(number, 300, true);
 });

 function syncPosition2(el) {
  if (syncedSecondary) {
   let number = el.item.index;
   slider1.data('owl.carousel').to(number, 100, true);
  }
 }

 slider1.on('changed.owl.carousel', function (event) {
  let num = $('.slider__num');
  const selectNum = sliderData[event.page.index];
  num.text(selectNum.num)
 });

 slider3.owlCarousel({
  animateOut: 'fadeOut',
  smartSpeed: 500,
  loop: true,
  items: 1,
  mouseDrag: false,
  autoplay: true,
  autoplayTimeout: 10000,
  nav: false,
  dots: true
 });

 $("[data-scroll]").on("click", function (event) {
  event.preventDefault();

  let $this = $(this),
   blockId = $this.data('scroll'),
   blockOffset = $(blockId).offset().top;

  $("html, body").animate({
   scrollTop: blockOffset - 100
  }, 500);

  $(".header__nav-list").on("click", function () {
   $(".header__nav-mob").removeClass("active-menu");
   $("#js-hamburger").removeClass("is-active");
   $(".header__logo").removeClass('d-none');
  });
 });

 $("#js-hamburger").on("click", function (event) {
  event.preventDefault();

  $(".header__logo").toggleClass('d-none');
  $(this).toggleClass("is-active");
  $(".header__nav-mob").toggleClass("active-menu");
  $(".header__nav-mob li:eq(0)").fadeTo('1000', 1, function () {
   $(this).next().fadeTo('1000', 1, arguments.callee);
  });
 });

 $(".accordion__header").on("click", function (e) {
  var t = $(this),
   e = $(".accordion__content");
  t.siblings(e).is(":visible") ? ($(".accordion__header").removeClass("active"), e.slideUp(
   600)) : ($(".accordion__header").removeClass("active"), t.addClass("active"), e.slideUp(600), t.siblings(e).slideDown(600));
 });

 $(".language").click(function () {
  $(".en").slideToggle("400");
  $(".language__arrow").toggleClass("rotate");
 });

 let fixmeTop = $('.quote').offset().top;

 $(window).scroll(function () {

  let currentScroll = $(window).scrollTop();

  if (currentScroll >= fixmeTop) {
   $('.header').css({
    background: 'black',
   });
  } else {
   $('.header').css({
    background: 'rgba(0, 0, 0, 0.32)',
   });
  }
 });

 $(".header__logo").on("click", function () {
  $("body, html").animate({
   scrollTop: 0
  });
  return false;
 });

 $('html').css({
  overflow: "hidden"
 });

 setTimeout(() => {
  $('body').addClass('loaded_hiding');
  window.setTimeout(function () {
   $('body').addClass('loaded');
   $('body').removeClass('loaded_hiding');
   $('html').css({
    overflow: "auto"
   });
  }, 500);
 }, 3500);

 setTimeout(() => {
  AOS.init();
 }, 3700);
});