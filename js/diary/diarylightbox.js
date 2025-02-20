// ============= 7) Lightbox Functionality (unchanged) =============
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const interfaceElement = document.getElementById("interface");
const yearNavigation = document.getElementById("year-navigation");
const monthNavigation = document.querySelectorAll(".month-navigation");
let currentImages = [];
let currentIndex = 0;
// Existing counterElement styles
const counterElement = document.createElement("div");
counterElement.style.position = "fixed"; // Changed from "absolute" to "fixed"
counterElement.style.bottom = "20px";
counterElement.style.right = "20px";
counterElement.style.color = "#ffffffd6";
counterElement.style.letterSpacing = "-1.5px";
counterElement.style.textStroke = "-0.25px";
counterElement.style.fontSize = "15px";
counterElement.style.fontFamily = "Neueeigene";
counterElement.style.zIndex = "1002";
counterElement.style.backgroundColor = "#000000e6";
counterElement.style.paddingTop = "3.5px";
counterElement.style.paddingBottom = "1.5px";
counterElement.style.paddingLeft = "8px";
counterElement.style.paddingRight = "8px";
counterElement.style.opacity = "0";
counterElement.style.borderRadius = "5px";
counterElement.style.display = "none";
document.body.appendChild(counterElement);
function updateCounter() {
  counterElement.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  counterElement.style.display = "block";
  gsap.to(counterElement, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.in",
  });
}
// Function to handle keyboard events
function handleKeyDown(event) {
  // Check if the lightbox is currently displayed
  if (lightbox.style.display === "flex") {
    switch (event.key) {
      case "ArrowRight":
        // Navigate to the next image
        showNextImage();
        break;
      case "ArrowLeft":
        // Navigate to the previous image
        showPreviousImage();
        break;
      case "Escape":
        // Close the lightbox
        closeLightbox();
        break;
      default:
        break;
    }
  }
}
// Click image -> open lightbox
document.querySelectorAll(".image-container img").forEach((img) => {
  img.addEventListener("click", (e) => {
    e.target.style.visibility = "hidden";
    const container = e.target.closest(".image-container");
    currentImages = Array.from(container.querySelectorAll("img"));
    currentIndex = currentImages.indexOf(e.target);
    updateCounter();
    gsap.to([interfaceElement, yearNavigation, monthNavigation], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        interfaceElement.style.display = "none";
      },
    });
    // Clone & animate
    const clonedImage = e.target.cloneNode(true);
    const rect = e.target.getBoundingClientRect();
    clonedImage.style.position = "fixed";
    clonedImage.style.top = `${rect.top}px`;
    clonedImage.style.left = `${rect.left}px`;
    clonedImage.style.width = `${rect.width}px`;
    clonedImage.style.height = `${rect.height}px`;
    clonedImage.style.zIndex = "1000";
    clonedImage.style.transition = "none";
    clonedImage.style.objectFit = "contain";
    clonedImage.style.visibility = "hidden";
    clonedImage.style.pointerEvents = "none";
    document.body.appendChild(clonedImage);
    lightboxImage.src = e.target.src;
    requestAnimationFrame(() => {
      clonedImage.style.visibility = "visible";
      gsap.to(clonedImage, {
        top: `${(window.innerHeight - window.innerHeight * 0.9) / 2}px`,
        left: `${(window.innerWidth - window.innerWidth * 0.9) / 2}px`,
        width: "90%",
        height: "90%",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          lightbox.style.display = "flex";
          lightbox.style.opacity = "1";
          document.body.removeChild(clonedImage);
          document.addEventListener("keydown", handleKeyDown);
        },
      });
    });
  });
});
// Close Lightbox
function closeLightbox() {
  const rect = lightboxImage.getBoundingClientRect();
  const clonedImage = lightboxImage.cloneNode(true);
  document.body.appendChild(clonedImage);
  clonedImage.style.position = "fixed";
  clonedImage.style.top = `${rect.top}px`;
  clonedImage.style.left = `${rect.left}px`;
  clonedImage.style.width = `${rect.width}px`;
  clonedImage.style.height = `${rect.height}px`;
  clonedImage.style.zIndex = "1001";
  clonedImage.style.objectFit = "contain";
  const originalImage = currentImages[currentIndex];
  const originalRect = originalImage.getBoundingClientRect();
  gsap.to(clonedImage, {
    top: `${originalRect.top}px`,
    left: `${originalRect.left}px`,
    width: `${originalRect.width}px`,
    height: `${originalRect.height}px`,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      document.body.removeChild(clonedImage);
      gsap.to(counterElement, {
        opacity: 0,
        duration: 0.5,
      });
      originalImage.style.visibility = "visible";
    },
  });
  gsap.to(counterElement, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      counterElement.style.display = "none";
    },
  });
  interfaceElement.style.display = "flex";
  gsap.to([interfaceElement, yearNavigation, monthNavigation], {
    opacity: 1,
    duration: 0.5,
    ease: "power2.in",
  });
  lightbox.style.display = "none";
  document.removeEventListener("keydown", handleKeyDown);
}
// Next/Prev
function showNextImage() {
  if (currentImages.length > 0) {
    currentImages[currentIndex].style.visibility = "visible";
    currentIndex = (currentIndex + 1) % currentImages.length;
    currentImages[currentIndex].style.visibility = "hidden";
    updateCounter();
    lightboxImage.src = currentImages[currentIndex].src;
  }
}
function showPreviousImage() {
  if (currentImages.length > 0) {
    currentImages[currentIndex].style.visibility = "visible";
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    currentImages[currentIndex].style.visibility = "hidden";
    updateCounter();
    lightboxImage.src = currentImages[currentIndex].src;
  }
}
// Lightbox click -> navigate or close
lightbox.addEventListener("click", (e) => {
  const rect = lightboxImage.getBoundingClientRect();
  if (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  ) {
    if (e.clientX > rect.left + rect.width / 2) {
      showNextImage();
    } else {
      showPreviousImage();
    }
  } else {
    closeLightbox();
  }
});
