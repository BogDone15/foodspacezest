$(document).ready(function () {
 $(".header__logo").on("click", function () {
  $("body, html").animate({
   scrollTop: 0
  });
  return false;
 });

 $("#js-hamburger").on("click", function (event) {
  event.preventDefault();

  $(".hamburger-policy .first, .hamburger-policy .second, .hamburger-policy .third").toggleClass('white');
  $(".header__logo").toggleClass('d-none');
  $(this).toggleClass("is-active");
  $(".header__nav-mob").toggleClass("active-menu");

  $(".header__nav-mob li:eq(0)").fadeTo('1000', 1, function () {
   $(this).next().fadeTo('1000', 1, arguments.callee);
  });
 });
});