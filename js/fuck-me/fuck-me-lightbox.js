// ============= 7) Lightbox Functionality (unchanged) =============
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const interfaceElement = document.getElementById("naviga");
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
// JavaScript
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

document.querySelectorAll(".image-container img").forEach((img) => {
  // Preload high-res image on hover
  img.addEventListener("mouseover", (e) => {
    const highResSrc = e.target.src.replace(
      "/fuck-me-thumb/fuck-me-thumb-",
      "/fuck-me-full/fuck-me-full-"
    );
    // Create a new image element to load the high-res image in the background
    const backgroundImage = new Image();
    backgroundImage.src = highResSrc; // Start loading the high-res image
    // Wait for the image to load fully before doing anything
    backgroundImage.onload = () => {
      // Clone the high-res image and add it to the DOM
      const clonedImage = e.target.cloneNode(true);
      clonedImage.src = highResSrc; // Make sure it's the high-res version
      clonedImage.style.position = "absolute";
      clonedImage.style.top = "-9999px"; // Hide it off-screen
      clonedImage.style.left = "-9999px";
      clonedImage.style.width = "auto";
      clonedImage.style.height = "auto";
      clonedImage.style.visibility = "hidden"; // Make sure it's hidden initially
      clonedImage.style.pointerEvents = "none"; // Prevent interaction
      // Append the cloned image to the body, but keep it hidden
      document.body.appendChild(clonedImage);
    };
  });
  // Click event to open the lightbox and show the image
  img.addEventListener("click", (e) => {
    e.target.style.visibility = "hidden"; // Hide the clicked thumbnail
    const container = e.target.closest(".image-container");
    // Populate currentImages with image elements inside the same container
    currentImages = Array.from(container.querySelectorAll("img"));
    // Get the high-res URL for the clicked image
    const highResSrc = e.target.src.replace(
      "/fuck-me-thumb/fuck-me-thumb-",
      "/fuck-me-full/fuck-me-full-"
    );
    // Get the index of the clicked high-res image
    currentIndex = currentImages
      .map((img) =>
        img.src.replace(
          "/fuck-me-thumb/fuck-me-thumb-",
          "/fuck-me-full/fuck-me-full-"
        )
      )
      .indexOf(highResSrc);
    // Update the counter
    updateCounter();
    // Set the lightbox image to the high-res image
    lightboxImage.src = highResSrc;
    // Hide interfaceElement
    gsap.to(interfaceElement, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        interfaceElement.style.display = "none";
      },
    });
    // Clone the clicked image and animate it
    const clonedImage = e.target.cloneNode(true);
    clonedImage.src = highResSrc; // Ensure it's high-res
    const rect = e.target.getBoundingClientRect();
    clonedImage.style.position = "fixed";
    clonedImage.style.top = `${rect.top}px`;
    clonedImage.style.left = `${rect.left}px`;
    clonedImage.style.width = `${rect.width}px`;
    clonedImage.style.height = `${rect.height}px`;
    clonedImage.style.zIndex =
      "99999999999999999999999999999999999999999999999999";
    clonedImage.style.transition = "none";
    clonedImage.style.objectFit = "contain";
    clonedImage.style.visibility = "hidden";
    clonedImage.style.pointerEvents = "none";
    document.body.appendChild(clonedImage);
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
  // Get the rect of the lightbox image
  const rect = lightboxImage.getBoundingClientRect();
  // Clone the lightbox image, and ensure it has the high-res path
  const clonedImage = lightboxImage.cloneNode(true);
  // Replace the thumbnail path with the high-res path
  const highResSrc = lightboxImage.src.replace(
    "/fuck-me-thumb/fuck-me-Thumb-",
    "/fuck-me-full/fuck-me-full-"
  );
  clonedImage.src = highResSrc; // Ensure cloned image is high-res
  // Append the cloned image to the body
  document.body.appendChild(clonedImage);
  // Set styles for cloned image (position, dimensions, etc.)
  clonedImage.style.position = "fixed";
  clonedImage.style.top = `${rect.top}px`;
  clonedImage.style.left = `${rect.left}px`;
  clonedImage.style.width = `${rect.width}px`;
  clonedImage.style.height = `${rect.height}px`;
  clonedImage.style.zIndex =
    "999999999999999999999999999999999999999999999999991";
  clonedImage.style.objectFit = "contain";
  // Find the corresponding image element in the container (not just the URL)
  const originalImage = Array.from(
    document.querySelectorAll(".image-container img")
  ).find(
    (img) =>
      img.src.replace(
        "/fuck-me-thumb/fuck-me-thumb-",
        "/fuck-me-full/fuck-me-full-"
      ) === highResSrc
  );
  const originalRect = originalImage.getBoundingClientRect();
  // Animate the cloned image
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
      originalImage.style.opacity = "1";
    },
  });
  // Fade out the counter element
  gsap.to(counterElement, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      counterElement.style.display = "none";
    },
  });
  // Show the interface element again
  interfaceElement.style.display = "flex";
  gsap.to(interfaceElement, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.in",
  });
  // Hide the lightbox
  lightbox.style.display = "none";
  // Remove the keydown event listener
  document.removeEventListener("keydown", handleKeyDown);
}
function showNextImage() {
  if (currentImages.length > 0) {
    // Fade out the current image (with a smooth transition)
    // Ensure the next image is visible before fading in
    currentImages[currentIndex].style.visibility = "visible";
    // Fade in the next image
    gsap.to(currentImages[currentIndex], {
      opacity: 1,
      duration: 0.2, // Adjust the duration as needed
      ease: "power2.inOut",
    });
    // Move to the next image
    currentIndex = (currentIndex + 1) % currentImages.length;
    gsap.to(currentImages[currentIndex], {
      opacity: 0,
      duration: 0.2, // Adjust the duration as needed
      ease: "power2.inOut",
      onComplete: () => {
        // After fading out, hide it and reset visibility
        currentImages[currentIndex].style.visibility = "hidden";
      },
    });
    // Update the counter
    updateCounter();
    // Get the high-res URL for the current image
    const currentHighResSrc = currentImages[currentIndex].src.replace(
      "/fuck-me-thumb/fuck-me-thumb-",
      "/fuck-me-full/fuck-me-full-"
    );
    // Set the high-res image to the lightbox
    lightboxImage.src = currentHighResSrc;
    // Clone the next image with high-res and animate (if needed)
    const clonedNextImage = document.createElement("img");
    clonedNextImage.src = currentImages[
      (currentIndex + 1) % currentImages.length
    ].src.replace(
      "/fuck-me-thumb/fuck-me-thumb-",
      "/fuck-me-full/fuck-me-full-"
    );
    document.body.appendChild(clonedNextImage);
    // Optional animation code for the cloned image...
    gsap.to(clonedNextImage, {
      top: "50%",
      left: "50%",
      width: "80%",
      height: "80%",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(clonedNextImage, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.body.removeChild(clonedNextImage);
      },
    });
  }
}
function showPreviousImage() {
  if (currentImages.length > 0) {
    // Move to the previous image
    currentImages[currentIndex].style.visibility = "visible";
    // Fade in the next image
    gsap.to(currentImages[currentIndex], {
      opacity: 1,
      duration: 0.2, // Adjust the duration as needed
      ease: "power2.inOut",
    });
    // Move to the next image
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    gsap.to(currentImages[currentIndex], {
      opacity: 0,
      duration: 0.2, // Adjust the duration as needed
      ease: "power2.inOut",
      onComplete: () => {
        // After fading out, hide it and reset visibility
        currentImages[currentIndex].style.visibility = "hidden";
      },
    });
    updateCounter();
    // Get the high-res URL for the current image
    const currentHighResSrc = currentImages[currentIndex].src.replace(
      "/fuck-me-thumb/fuck-me-thumb-",
      "/fuck-me-full/fuck-me-full-"
    );
    // Set the high-res image to the lightbox
    lightboxImage.src = currentHighResSrc;
    // Clone the previous image with high-res and animate (if needed)
    const clonedPrevImage = document.createElement("img");
    clonedPrevImage.src = currentImages[
      (currentIndex - 1 + currentImages.length) % currentImages.length
    ].src.replace(
      "/fuck-me-thumb/fuck-me-thumb-",
      "/fuck-me-full/fuck-me-full-"
    );
    document.body.appendChild(clonedPrevImage);
    // Optional animation code for the cloned image...
    gsap.to(clonedPrevImage, {
      top: "50%",
      left: "50%",
      width: "80%",
      height: "80%",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(clonedPrevImage, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.body.removeChild(clonedPrevImage);
      },
    });
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
