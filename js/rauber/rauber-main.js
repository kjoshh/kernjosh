document.addEventListener("DOMContentLoaded", function () {
  // Get the video iframe and the #videoclose button
  let videoIframe2 = document.getElementById("lovememvid");
  let videoCloseButton = document.getElementById("videoclose"); // Replace with your button's ID
  let player2 = new Vimeo.Player(videoIframe2);
  // Attach the event listener
  if (videoCloseButton) {
    videoCloseButton.addEventListener("click", function () {
      player2.pause(); // Pause the video
    });
  } else {
    console.error("Error: #videoclose button not found in the DOM.");
  }

  const onloadDiv = document.getElementById("onloaddiv");
  const naviga = document.getElementById("naviga");
  gsap.to(onloadDiv, {
    // opacity: 0,
    height: "0%",
    duration: 1,
    ease: "power4.inOut",
    onComplete: () => {
      onloadDiv.style.display = "none";
    },
  });
  // Lock scrolling on page load
  document.body.style.overflow = "hidden";
  // Ensure the user starts at the top of the page
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
  // Allow scrolling after 3 seconds
  setTimeout(() => {
    document.body.style.overflow = "auto"; // Unlock scrolling
  }, 3000);
  // Select the elements
  const outerDiv = document.querySelector(".outer");
  // Generate the image URLs
  const imageUrls = Array.from(
    {
      length: 99,
    },
    (_, i) => ({
      thumb: `images/Rauber/rauber-thumb/rauber-thumb-${i + 1}.jpg`,
      full: `images/Rauber/rauber-full/rauber-full-${i + 1}.jpg`,
    })
  );
  // Shuffle function to randomize the indices
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  // Shuffle the image URLs
  const shuffledIndices = Array.from(
    {
      length: imageUrls.length,
    },
    (_, i) => i
  );
  shuffleArray(shuffledIndices);
  // Track loaded images
  let imagesLoadedCount = 0;
  // Select all image elements (the img-love-me elements)
  const imgElements = document.querySelectorAll(".rauber-img");
  // Load images in random order and assign them to the image elements based on the original index
  shuffledIndices.forEach((shuffledIndex) => {
    const imgData = imageUrls[shuffledIndex];
    const img = new Image();
    img.src = imgData.thumb; // Load only the thumbnail
    img.onload = () => {
      const targetImg = imgElements[shuffledIndex];
      if (targetImg) {
        targetImg.src = img.src; // Assign the thumbnail
        targetImg.dataset.full = imgData.full; // Store full image in data attribute
        // Use GSAP to animate opacity and scale
        gsap.fromTo(
          targetImg,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.15,
            ease: "power2.inOut",
          }
        );
      }
      // Update preloader count
      imagesLoadedCount++;
      const preloader = document.getElementById("preloader");
      const progressText = document.getElementById("progress-text");
      progressText.textContent = `loading... ${imagesLoadedCount} / 99`;
      // Hide preloader when all images are loaded
      if (imagesLoadedCount === imgElements.length) {
        // Step 1: Fade out the text
        gsap.to(progressText, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
        setTimeout(() => {
          // Step 2: Fade out the overlay
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
          setTimeout(() => {
            preloader.remove(); // Remove preloader after fade-out
            // Step 3: Fade in the #naviga element
            naviga.style.display = "flex"; // Ensure it's visible for the animation
            gsap.fromTo(
              naviga,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.inOut",
              }
            );
          }, 400); // Wait for overlay fade-out to complete
        }, 400); // Delay after text fade-out
      }
    };
  });
  const loDiv = document.getElementById("lodiv");
  const openLo = document.getElementById("openlo");
  const closeLo = document.getElementById("closelo");
  const textDiv = document.getElementById("textdiv");
  const openText = document.getElementById("opentext");
  const closeText = document.getElementById("closetext");
  const baume = document.getElementById("baume");
  const weg = document.getElementById("weg");
  const tiere = document.getElementById("tiere");
  const rauberSchrift = document.getElementById("rauberschrift");
  const arrowDown = document.getElementById("arrowdown");
  const wipDiv = document.getElementById("wipdiv");
  const openWip = document.getElementById("openwip");
  const closeWip = document.getElementById("closewip");
  const buchDiv = document.getElementById("buchdiv");
  const openBook = document.getElementById("openbook");
  const closeBook = document.getElementById("closebook");
  const vidDiv = document.getElementById("viddiv");
  const openVid = document.getElementById("openvid");
  const closeVid = document.getElementById("videoclose");
  const mainInterface = document.getElementById("naviga");
  const secondInterface = document.getElementById("navigalast");
  const grainiwrapppp = document.getElementById("grainiwrapppp");
  const backStuff = document.querySelector(".blurbackstuff");
  openLo.addEventListener("click", () => {
    gsap.to(loDiv, {
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
  closeLo.addEventListener("click", () => {
    mainInterface.style.display = "flex";
    secondInterface.style.display = "flex";
    gsap.to(backStuff, {
      opacity: 0,
      duration: 0.65,
      ease: "power4.inOut",
      onComplete: () => {
        backStuff.style.display = "none";
      },
    });
    gsap.to(loDiv, {
      y: "101vh",
      duration: 0.65,
      ease: "power3.inOut",
    });
    gsap.to([mainInterface, secondInterface], {
      opacity: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  });
  let bounceAnimation; // Store the bouncing animation reference
  openText.addEventListener("click", () => {
    // Set all elements to opacity 0 initially
    gsap.set([baume, weg, tiere, rauberSchrift, arrowDown], {
      opacity: 0,
    });
    // Timeline for entrance animations
    const tl = gsap.timeline();
    // Start animations after a delay (650ms)
    setTimeout(() => {
      tl.to(baume, {
        duration: 0.65,
        opacity: 1,
        ease: "power3.inOut",
      })
        .to(
          weg,
          {
            duration: 0.65,
            opacity: 1,
            ease: "power3.inOut",
          },
          "-=0.2"
        ) // Overlap by 0.3s
        .fromTo(
          tiere,
          {
            opacity: 0,
            y: -30,
            scale: 0.85,
          },
          {
            duration: 0.65,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.inOut",
          },
          "-=0.2"
        )
        .fromTo(
          rauberSchrift,
          {
            opacity: 0,
            y: 20,
          },
          {
            duration: 0.65,
            opacity: 1,
            y: 0,
            ease: "power3.inOut",
          },
          "-=0.2"
        )
        .fromTo(
          arrowDown,
          {
            opacity: 0,
            y: 10,
          },
          {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "sine.inOut",
          },
          "-=0.2"
        )
        .add(() => {
          // Bounce animation starts after the arrow appears
          bounceAnimation = gsap.to(arrowDown, {
            y: 10,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
    }, 650);
    // Show and animate other elements
    backStuff.style.display = "block";
    gsap.to(backStuff, {
      opacity: 1,
      duration: 0.65,
      ease: "power4.inOut",
    });
    gsap.to(textDiv, {
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
  closeText.addEventListener("click", () => {
    // Kill the bouncing animation if active
    if (bounceAnimation) {
      bounceAnimation.kill();
      bounceAnimation = null; // Clear the reference
    }
    // Show interfaces again
    mainInterface.style.display = "flex";
    secondInterface.style.display = "flex";
    // Exit animations
    gsap.to(backStuff, {
      opacity: 0,
      duration: 0.65,
      ease: "power4.inOut",
      onComplete: () => {
        backStuff.style.display = "none";
      },
    });
    gsap.to(textDiv, {
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
  openWip.addEventListener("click", () => {
    gsap.to(wipDiv, {
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
  closeWip.addEventListener("click", () => {
    mainInterface.style.display = "flex";
    secondInterface.style.display = "flex";
    gsap.to(wipDiv, {
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
    // window.handleVideoStateChange(true); // Pause audio
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
    // window.handleVideoStateChange(false); // Resume audio
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
  // Select all elements with the .textneww class
  const textnewwElements = document.querySelectorAll(".textneww");
  // Function to disable scrolling
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };
  // Function to enable scrolling
  const enableScroll = () => {
    document.body.style.overflow = "";
  };
  // Add click event listener to all .textneww elements
  textnewwElements.forEach((element) => {
    element.addEventListener("click", () => {
      // Display the associated popup (assuming the popup logic is implemented)
      disableScroll();
    });
  });
  // Close popups when .crosssyofuckme or .crossfm elements are clicked
  const closeButtons = document.querySelectorAll(".crosssyofuckme, .crossfm");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hide the popup (assuming the popup logic is implemented)
      enableScroll();
    });
  });
  const cross = document.getElementById("cross");
  const navigalast = document.getElementById("navigalast");

  if (!cross) {
    console.warn("Element with ID 'cross' not found.");
    return;
  }
  cross.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent immediate navigation
    const href = "https://kernjosh.com/"; // Real URL
    sessionStorage.setItem("isInternalNavigation", "true");
    console.log("Internal navigation state set in sessionStorage.");
    fetch(href, {
      mode: "no-cors",
    })
      .then(() => console.log("Page preloaded:", href))
      .catch(() => console.warn("Failed to preload page:", href));
    cross.style.pointerEvents = "none"; // Prevent multiple clicks
    onloadDiv.style.display = "block";
    gsap.set(onloadDiv, {
      top: "auto",
      bottom: 0,
    });
    gsap.to(cross, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        cross.style.display = "none";
      },
    });
    gsap.to(naviga, {
      opacity: 0,
      y: -17,
      duration: 0.5,
      ease: "power3.inOut",
    });
    gsap.to(onloadDiv, {
      height: "100%",
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        window.location.href = href;
      },
    });
  });
  if (sessionStorage.getItem("isInternalNavigation") === "true") {
    console.log("Page loaded via internal navigation.");
  }
});
