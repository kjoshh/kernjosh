//browser-detect v3
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("device-check-overlay");
  const message = document.getElementById("device-check-message");
  const whyLink = document.getElementById("browser-check-why-link");
  const mobileWhyLink = document.getElementById("mobile-check-why-link");
  const explanation = document.getElementById("browser-check-explanation");
  const mobileExplanation = document.getElementById("mobile-check-explanation");
  const content = document.getElementById("device-check-content");

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  function isDesktopSafari() {
    const userAgent = navigator.userAgent;
    return (
      userAgent.indexOf("Safari") > -1 &&
      userAgent.indexOf("Chrome") == -1 &&
      !isMobileDevice()
    );
  }

  if (isMobileDevice()) {
    console.log("ismobileeee");
    message.textContent =
      "oh no, you are using a phone :( you need a larger device, like a laptop in order to enter this page. also pls dont use safariiii";
    overlay.classList.remove("hidden");
    mobileWhyLink.classList.remove("hidden");
    content.classList.add("mobile");
  } else if (isDesktopSafari()) {
    console.log("issafariiiiii");
    message.textContent =
      "oh no, you are using safari :( you need a different browser like chrome in order to enter this page.";
    overlay.classList.remove("hidden");
    whyLink.classList.remove("hidden");
  } else {
    console.log("isnohtinginging");
    // If it's not a mobile device and not desktop Safari, hide the overlay
    overlay.classList.add("hidden");
  }

  whyLink.addEventListener("click", function (event) {
    event.preventDefault();
    explanation.classList.toggle("show");
  });
  mobileWhyLink.addEventListener("click", function (event) {
    event.preventDefault();
    mobileExplanation.classList.toggle("show");
  });
});
