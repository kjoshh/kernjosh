document.addEventListener("DOMContentLoaded", function () {
  // Get the video iframe and the #videoclose button
  let videoIframe2 = document.getElementById("lovememvid");
  let closeVid = document.getElementById("videoclose"); // Replace with your button's ID

  let player2 = new Vimeo.Player(videoIframe2); // Attach the event listener
  if (closeVid) {
    closeVid.addEventListener("click", function () {
      player2.pause();
    });
  } else {
    console.error("Error: #videoclose button not found in the DOM.");
  }

  const onloadDiv = document.getElementById("onloaddiv");
  const buchDiv = document.getElementById("buchdiv");
  const openBook = document.getElementById("openbook");
  const closeBook = document.getElementById("closebook");
  const vidDiv = document.getElementById("viddiv");
  const openVid = document.getElementById("openvid");
  // const closeVid = document.getElementById("videoclose");
  const mainInterface = document.getElementById("naviga");
  const secondInterface = document.getElementById("navigalast");
  const texttti = document.querySelector(".preloader-text");
  gsap.to(onloadDiv, {
    opacity: 0,
    // height: "0%",
    duration: 1,
    ease: "power4.inOut",
    onComplete: () => {
      onloadDiv.style.display = "none";
    },
  });
  openBook.addEventListener("click", () => {
    gsap.to(buchDiv, {
      y: "0vh",
      duration: 0.65,
      ease: "power4.inOut",
    });
    gsap.to([mainInterface, secondInterface], {
      opacity: 0,
      duration: 0.25,
      ease: "power3.inOut",
      onComplete: () => {
        mainInterface.style.display = "none";
        secondInterface.style.display = "none";
      },
    });
  });
  closeBook.addEventListener("click", () => {
    mainInterface.style.display = "flex";
    secondInterface.style.display = "flex";
    gsap.to(buchDiv, {
      y: "101vh",
      duration: 0.65,
      ease: "power4.inOut",
    });
    gsap.to([mainInterface, secondInterface], {
      opacity: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  });
  openVid.addEventListener("click", () => {
    window.handleVideoStateChange(true); // Pause audio
    gsap.to(vidDiv, {
      y: "0vh",
      duration: 0.65,
      ease: "power4.inOut",
    });
    gsap.to([mainInterface, secondInterface], {
      opacity: 0,
      duration: 0.25,
      ease: "power3.inOut",
      onComplete: () => {
        mainInterface.style.display = "none";
        secondInterface.style.display = "none";
      },
    });
  });

  closeVid.addEventListener("click", () => {
    window.handleVideoStateChange(false); // Resume audio
    mainInterface.style.display = "flex";
    secondInterface.style.display = "flex";
    gsap.to(vidDiv, {
      y: "101vh",
      duration: 0.65,
      ease: "power4.inOut",
    });
    gsap.to([mainInterface, secondInterface], {
      opacity: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  });
  if (openVid) {
    openVid.addEventListener("click", function () {
      // Update zIndex to ensure it changes immediately when the button is clicked
      wholeplayer.style.zIndex = "0";
      // Adjust play state logic
      // if (isPlaying) {
      //   wasPlayingBeforeNext = true;
      //   pauseTrack();
      // } else {
      //   wasPlayingBeforeNext = false;
      // }
    });
  }
  if (closeVid) {
    closeVid.addEventListener("click", function () {
      // Update zIndex first to ensure visual layering is handled
      wholeplayer.style.zIndex = "9999999999999999999999";
      // Resume playback if it was playing before the "next" button was clicked
      // if (wasPlayingBeforeNext) {
      //   playTrack();
      // }
    });
  }

  // // Audio script
  // window.handleVideoStateChange = function (videoIsPlaying) {
  //   // Check the video's current state
  //   if (videoIsPlaying) {
  //     // Video just started playing
  //     if (isPlaying) {
  //       wasPlayingBeforeVideoStart = true;
  //       pauseTrack(); // Pause the audio
  //     } else {
  //       wasPlayingBeforeVideoStart = false;
  //     }
  //   } else {
  //     // Video just paused/stopped
  //     if (wasPlayingBeforeVideoStart) {
  //       playTrack(); // Resume the audio
  //     }
  //   }
  // };

  const images = document.querySelectorAll(".imageetry");
  const wrapimmmm = document.querySelector(".wrapimmmm");
  const counter = document.getElementById("counter");
  const loadingBar = document.querySelector(".loading-bar");
  const counterText = counter.querySelector(".counter-text");
  const interfaceElement = document.querySelector(".interface.asli");
  const audioElement = document.querySelector(".audiowrappppp");
  const counterWrapper = document.querySelector(".counter-wrapper");
  const preloader = document.getElementById("preloader");
  const totalImages = images.length;
  let loadedImages = 0; // Counter for loaded images
  let preloaderTimeout; // Declare preloaderTimeout here
  let preloaderStartTime = Date.now(); // Track the time when images start loading
  const typewriterEffect = (element, text, delay, callback) => {
    let index = text.length;
    const deleteLetter = () => {
      if (index > 0) {
        element.textContent = text.substring(0, --index);
        setTimeout(deleteLetter, delay);
      } else if (callback) {
        setTimeout(callback, delay);
      }
    };
    deleteLetter();
  };
  let isGoVisible = false; // Erst false, bis "GO" erscheint
  const updatePreloader = () => {
    // Ensure the preloader text element exists
    const textElement = document.querySelector(".preloader-text");
    const secondtextElement = document.querySelector(".preloader-text-two");
    const divi = document.querySelector(".preloader-text-two");
    const divi1 = document.getElementById("divi1");
    const divi2 = document.getElementById("divi2");
    textElement.textContent = `preloading ${loadedImages}/${totalImages} images...`;
    if (loadedImages === totalImages) {
      setTimeout(() => {
        gsap.to(textElement, {
          y: -25,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            textElement.style.opacity = "0";
            divi1.style.display = "none";
            divi2.style.display = "none";
          },
        });
        gsap.to(secondtextElement, {
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
        setTimeout(() => {
          isGoVisible = true; // Hier aktivieren wir das Mousemove-Event erst nach "GO"
        }, 250);
      }, 250);
      setTimeout(() => {
        gsap.to([counterWrapper], {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }, 1800);
    }
  };
  const handleImageLoad = () => {
    loadedImages++;
    updatePreloader();
  };
  images.forEach((image) => {
    image.addEventListener("load", handleImageLoad);
  });
  images.forEach((image) => {
    if (image.complete) {
      handleImageLoad();
    }
  });
  const updateCounterload = () => {
    const progress = globalIndex / images.length;
    gsap.to(counterText, {
      textContent: globalIndex,
      duration: 0.2,
      snap: {
        textContent: 1,
      },
    });
    const newPosition = progress * 90;
    gsap.to(counter, {
      left: `${newPosition}vw`,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  let globalIndex = 0;
  let last = {
    x: 0,
    y: 0,
  };
  let isZoomed = false; // Track zoom state
  let zoomedImage = null; // Store the zoomed image
  let originalPosition = {
    left: 0,
    top: 0,
  };
  let originalWidth = 0;
  let originalHeight = 0;
  let originalZIndex = 0;
  const activate = (image, x, y) => {
    // Set the size of the image
    const size = 300;
    image.style.width = `${size}px`;
    image.style.height = `${size}px`;
    image.style.position = "absolute";
    image.style.cursor = "default";
    image.style.pointerEvents = "none";
    // Center the image around the mouse position
    image.style.left = `${x - size / 2}px`; // Subtract half the size of the image
    image.style.top = `${y - size / 2}px`; // Subtract half the size of the image
    image.style.zIndex = globalIndex;
    image.style.display = "block";
    last = {
      x,
      y,
    };
    if (globalIndex === images.length - 1) {
      setTimeout(() => {
        arrangeImagesInDynamicGrid();
      }, 500);
    }
    globalIndex++;
    updateCounter();
  };
  const distanceFromLast = (x, y) => Math.hypot(x - last.x, y - last.y);
  const updateCounter = () => {
    const progress = globalIndex / images.length;
    gsap.to(counterText, {
      textContent: globalIndex,
      duration: 0.2,
      snap: {
        textContent: 1,
      },
    });
    gsap.to(loadingBar, {
      width: `${progress * 90}vw`,
      duration: 0.5,
      ease: "power2.out",
    });
    const newPosition = progress * 90;
    gsap.to(counter, {
      left: `${newPosition}vw`,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  const arrangeImagesInDynamicGrid = () => {
    const gridColumns = 9;
    const imageWidth = 11.11111111;
    const imageHeights = Array(gridColumns).fill(0);
    images.forEach((image, index) => {
      const columnIndex = index % gridColumns;
      const leftPosition = `${columnIndex * imageWidth}vw`;
      const topPosition = `${imageHeights[columnIndex]}px`;
      const aspectRatio = image.naturalHeight / image.naturalWidth;
      const fixedHeight = (window.innerWidth * imageWidth * aspectRatio) / 100;
      imageHeights[columnIndex] += fixedHeight;
      gsap.to(image, {
        left: leftPosition,
        top: topPosition,
        width: "11.11111111vw",
        height: `${fixedHeight}px`,
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => {
          // Include both elements in gsap.set to set display to block
          gsap.set([interfaceElement, audioElement], {
            display: "block",
          });
          // Animate opacity for both elements
          gsap.to([interfaceElement, audioElement], {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
      setTimeout(() => {
        image.style.cursor = "default";
        image.style.pointerEvents = "auto";
        gsap.to([counterWrapper], {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            preloader.style.display = "none";
          },
        });
      }, 1000);
    });
  };
  const handleOnMove = (e) => {
    if (!isGoVisible || globalIndex >= images.length) return; // Stoppt Event, wenn "GO" noch nicht erschienen ist
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 25) {
      activate(images[globalIndex], e.clientX, e.clientY);
    }
  };
  const addListeners = () => {
    window.addEventListener("mousemove", handleOnMove);
  };
  const removeListeners = () => {
    window.removeEventListener("mousemove", handleOnMove);
  };
  wrapimmmm.addEventListener("mouseenter", addListeners);
  wrapimmmm.addEventListener("mouseleave", removeListeners);
  window.addEventListener("load", () => {
    const rect = wrapimmmm.getBoundingClientRect();
    if (
      rect.left <= window.innerWidth / 2 &&
      rect.right >= window.innerWidth / 2 &&
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      addListeners();
    }
  });
  const textnewwElements = document.querySelectorAll(".textneww");
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const enableScroll = () => {
    document.body.style.overflow = "";
  };
  textnewwElements.forEach((element) => {
    element.addEventListener("click", () => {
      disableScroll();
    });
  });
  const closeButtons = document.querySelectorAll(".crosssyofuckme, .crossfm");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      enableScroll();
    });
  });
});
