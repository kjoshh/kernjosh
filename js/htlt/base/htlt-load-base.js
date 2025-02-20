const loaderText = document.querySelectorAll(".linkwrap");
const loaderImg = document.querySelectorAll(".bookim");
const textBlock = document.querySelector("#text-block");
const backRound = document.querySelector("._100wrap");
const grainiwrapppp = document.getElementById("grainiwrapppp");
const menuoverlay = document.getElementById("menuoverlay");
const interfaceElement = document.getElementById("interface");
const links = document.querySelectorAll("a");
interfaceElement.style.display = "flex";
textBlock.style.display = "none";
// set stuff
gsap.set(loaderText, {
  y: 10,
});
gsap.set(interfaceElement, {
  y: 20,
});
// animate stuff
textBlock.style.display = "flex";
gsap.to(loaderImg, {
  height: "100vh",
  duration: 1,
  ease: "power4.inOut",
});
gsap.to([loaderText, interfaceElement], {
  y: 0,
  opacity: 1,
  delay: 1.1,
  stagger: 0.1,
  duration: 0.2,
  ease: "power3.inOut",
});
gsap.to(menuoverlay, {
  opacity: 1,
  duration: 0.25,
  onComplete: () => {
    // Create the pulse animation
    gsap.to(menuoverlay, {
      opacity: 0.5,
      width: "500px",
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  },
});
links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const href = this.getAttribute("href");
    const isHashLink = href.startsWith("#");
    const isJavaScriptLink = href.startsWith("javascript:");
    const hasTargetBlank = this.getAttribute("target") === "_blank";
    const isDownloadLink = this.hasAttribute("download");
    if (isHashLink || isJavaScriptLink || hasTargetBlank || isDownloadLink) {
      return;
    }
    const destination = this.href;
    event.preventDefault();
    gsap.to([loaderText, interfaceElement], {
      y: -15,
      opacity: 0,
      stagger: 0.1,
      duration: 0.2,
      ease: "power3.inOut",
    });
    gsap.to(loaderImg, {
      height: 0,
      top: 0,
      bottom: "auto",
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        window.location.href = destination;
      },
    });
  });
});

const triggerElement2 = document.getElementById("openbook");
const stopTrigger = document.querySelector("#closebook");
const buchDiv = document.querySelector(".buchhh");
triggerElement2.addEventListener("click", () => {
  initializeFirstSlider();
  window.isPaused = true;
  gsap.to(buchDiv, {
    y: "0vh",
    duration: 0.65,
    ease: "power4.out",
  });
  gsap.to(interfaceElement, {
    opacity: 0,
    duration: 0.25,
    ease: "power3.inOut",
    onComplete: () => {
      interfaceElement.style.display = "none";
    },
  });
});
stopTrigger.addEventListener("click", () => {
  interfaceElement.style.display = "flex";
  window.isPaused = false;
  gsap.to(buchDiv, {
    y: "101vh",
    duration: 0.65,
    ease: "power3.in",
  });
  gsap.to(interfaceElement, {
    opacity: 1,
    duration: 0.25,
    ease: "power3.inOut",
  });
});
const storyLink = document.getElementById("story-link");
storyLink.addEventListener("click", () => {
  gsap.to(backRound, {
    backgroundColor: "#e4e1d9",
    duration: 0.75,
    ease: "power3.inOut",
  });
  gsap.to(grainiwrapppp, {
    opacity: 0,
    duration: 0.75,
    ease: "power3.inOut",
  });
});
