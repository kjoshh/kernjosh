function initializeFirstSlider() {
  let target = 0;
  let current = 0;
  let ease = 0.075;
  const slider = document.querySelector(".slider-raub.a2");
  const sliderWrapper = document.querySelector(".slider-wrapper-raub.a2");
  const markerWrapper = document.querySelector(".marker-wrapper.a2");
  const activeSlide = document.querySelector(".active-slide.a2");
  let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
  function lerp1(start, end, factor) {
    return start + (end - start) * factor;
  }
  function updateActiveSlideNumber(markerMove, markerMaxMove) {
    const partWidth = markerMaxMove / 13;
    let currentPart = Math.round((markerMove - 70) / partWidth) + 1;
    currentPart = Math.min(13, currentPart);
    activeSlide.textContent = `${currentPart}/13`;
  }
  let animationFrameId;
  function update() {
    current = lerp1(current, target, ease);
    gsap.set(".slider-wrapper-raub", {
      x: -current,
    });
    let moveRatio = current / maxScroll;
    let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
    let markerMove = 70 + moveRatio * markerMaxMove;
    gsap.set(".marker-wrapper", {
      x: markerMove,
    });
    updateActiveSlideNumber(markerMove, markerMaxMove);
    animationFrameId = requestAnimationFrame(update);
  }
  window.addEventListener("resize", () => {
    maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
  });
  window.addEventListener("wheel", (e) => {
    target += e.deltaY;
    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
  });
  update();
  const stopTrigger = document.querySelector("#closebook");
  stopTrigger.addEventListener("click", () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", update);
    window.removeEventListener("wheel", update);
  });
}
const triggerElement1 = document.getElementById("openbook");
triggerElement1.addEventListener("click", () => {
  initializeFirstSlider();
});
