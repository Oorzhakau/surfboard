const slider = $(".slider__list").bxSlider({
  pager: false,
  controls: false,
});

$(".products__arrow-left").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".products__arrow-right").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});