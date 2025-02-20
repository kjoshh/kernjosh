document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("[data-click-effect]");

  elements.forEach((element) => {
    element.addEventListener("click", function () {
      gsap.to(element, {
        scale: 0.82,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    });
  });
});
