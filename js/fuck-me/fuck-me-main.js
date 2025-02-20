document.addEventListener("DOMContentLoaded", function () {
  let videoIframe2 = document.getElementById("lovememvid");
  let videoCloseButton = document.getElementById("closevid"); // Replace with your button's ID
  let player2 = new Vimeo.Player(videoIframe2);
  if (videoCloseButton) {
    videoCloseButton.addEventListener("click", function () {
      player2.pause(); // Pause the video
    });
  } else {
    console.error("Error: #videoclose button not found in the DOM.");
  }
  // Generate the image URLs
  const imageUrls = Array.from(
    {
      length: 88,
    },
    (_, i) => ({
      thumb: `images/Fuck-Me/fuck-me-thumb/fuck-me-thumb-${i + 1}.jpg`,
      full: `images/Fuck-Me/fuck-me-full/fuck-me-full-${i + 1}.jpg`,
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
  // Create a preloader element
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.style.cssText = `
position: fixed;
top: 0; left: 0;
width: 100vw; height: 100vh;
background: rgba(0, 0, 0, 0.65); /* Slightly transparent overlay */
color: white;
display: flex;
font-family: Neueeigene;
letter-spacing: -1.5;
align-items: flex-end;
justify-content: right;
font-size: 20px;
z-index: 9999;
transition: opacity 1.5s ease; /* Overlay fade-out */
`;
  preloader.innerHTML = `<span id="progress-text" style=" margin:2.5vmin; transition: opacity 0.3s ease;">loading... 0/88</span>`;
  document.body.appendChild(preloader);
  // Track loaded images
  let imagesLoadedCount = 0;
  // Select all image elements (the imgfuck-me elements)
  const imgElements = document.querySelectorAll(".fuck-me-img");
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
      const progressText = document.getElementById("progress-text");
      const naviga = document.getElementById("naviga");
      progressText.textContent = `loading... ${imagesLoadedCount}/88`;
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
            onComplete: () => {
              preloader.style.display = "none";
            },
          });
        }, 400); // Delay after text fade-out
      }
    };
  });
  const headertext = document.querySelector(".headertext");
  function typeWriterEffect(element, text, speed = 35) {
    element.innerHTML = ""; // Clear existing text
    let i = 0;
    function type() {
      if (i < text.length) {
        if (text.substring(i, i + 4) === "<br>") {
          element.innerHTML += "<br>"; // Add line break
          i += 4; // Skip the <br> tag
        } else {
          element.innerHTML += text.charAt(i);
          i++;
        }
        setTimeout(type, speed);
      }
    }
    type();
  }
  const secretSection = document.getElementById("secretSection");
  const passwordInput = document.getElementById("passwordInput");
  const checkPasswordBtn = document.getElementById("checkPasswordBtn");
  const firsthint = document.getElementById("firsthint");
  const secondhint = document.getElementById("secondhint");
  const contatainer = document.querySelector(".password-container");
  const checkimg = document.getElementById("checkimg");
  function checkPassword() {
    gsap.to(checkimg, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
    const enteredPassword = passwordInput.value;
    if (enteredPassword === "bad lives") {
      const onloadDiv = document.querySelector(".onload-div");
      const naviga = document.getElementById("naviga");
      const wholeplayer = document.getElementById("wholeplayer");
      gsap.to(contatainer, {
        opacity: 0,
        y: -15,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(onloadDiv, {
        height: "0%",
        duration: 1,
        delay: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          onloadDiv.style.display = "none";
          naviga.style.display = "flex"; // Ensure it's visible for the animation
          gsap.fromTo(
            [naviga, wholeplayer],
            {
              opacity: 0,
              y: 17,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.inOut",
            }
          );
        },
      });
    } else {
      alert("That is not the correct password.");
    }
  }
  checkPasswordBtn.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkPassword();
    }
  });
  hintLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (hintText.classList.contains("hidden")) {
      hintText.classList.remove("hidden");
      firsthint.classList.add("hidden");
      secondhint.classList.remove("hidden");
      // Typewriter effect when hint is shown
      const hintContent = `Nothing works<br>
Nothing works for everyone<br>
Good stories are _________`;
      typeWriterEffect(hintText, hintContent, 50);
    } else {
      hintText.classList.add("hidden");
      firsthint.classList.remove("hidden");
      secondhint.classList.add("hidden");
    }
  });
  const passwordmain = document.querySelector(".passwordmain");
  const submitform = document.querySelector(".submitform");
  const navigalast = document.getElementById("navigalast");
  const pwembed = document.getElementById("pwembed");
  const textDiv = document.getElementById("textdiv");
  const openText = document.getElementById("opentext");
  const closeText = document.getElementById("closetext");
  const textInside = document.getElementById("textinside");
  const wipDiv = document.getElementById("wipdiv");
  const openWip = document.getElementById("openwip");
  const closeWip = document.getElementById("closewip");
  const buchDiv = document.getElementById("buchdiv");
  const openBook = document.getElementById("openbook");
  const closeBook = document.getElementById("closebook");
  const vidDiv = document.getElementById("viddiv");
  const openVid = document.getElementById("openvid");
  const closeVid = document.getElementById("closevid");
  const mainInterface = document.getElementById("naviga");
  const secondInterface = document.getElementById("navigalast");
  const grainiwrapppp = document.getElementById("grainiwrapppp");
  const backStuff = document.querySelector(".blurbackstuff");
  gsap.set(textInside, {
    opacity: 0,
    y: 25,
  });
  gsap.fromTo(
    [pwembed, navigalast],
    {
      opacity: 0,
      y: 15,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.inOut",
    }
  );
  openText.addEventListener("click", () => {
    backStuff.style.display = "block";
    gsap.to(textDiv, {
      y: "0vh",
      duration: 0.65,
      ease: "power4.inOut",
    });
    gsap.to(textInside, {
      opacity: 1,
      y: 0,
      delay: 0.35,
      duration: 0.3,
      ease: "power3.inOut",
    });
    gsap.to(backStuff, {
      opacity: 1,
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
    mainInterface.style.display = "flex";
    secondInterface.style.display = "flex";
    gsap.to(textInside, {
      opacity: 0,
      y: 25,
      duration: 0.3,
      ease: "power3.inOut",
    });
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
      ease: "power3.inOut",
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

  const handyTrigger = document.querySelector("#handytrigger");
  const handyFinal = document.querySelector("#handyyo");
  if (handyTrigger && handyFinal) {
    handyTrigger.addEventListener("mouseover", function () {
      handyFinal.style.display = "block";
      gsap.to(handyTrigger, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
      gsap.to(handyFinal, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
    });
    handyTrigger.addEventListener("mouseout", function () {
      handyFinal.style.display = "block";
      gsap.to(handyTrigger, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      gsap.to(handyFinal, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          handyFinal.style.display = "none";
        },
      });
    });
  }
  const cross = document.getElementById("cross");
  //   const navigalast = document.getElementById("navigalast");
  //   const pwembed = document.getElementById("pwembed");
  const onloadDiv = document.querySelector(".onload-div");
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
    if (pwembed) {
      gsap.to(pwembed, {
        opacity: 0,
        y: -15,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          window.location.href = href;
        },
      });
    }
    gsap.to([naviga, wholeplayer], {
      opacity: 0,
      y: -17,
      duration: 0.5,
      ease: "power3.inOut",
    });
    gsap.to(onloadDiv, {
      height: "100%",
      duration: 1,
      delay: 0.25,
      ease: "power4.inOut",
      onComplete: () => {
        window.location.href = href;
      },
    });
  });

  if (sessionStorage.getItem("isInternalNavigation") === "true") {
    console.log("Page loaded via internal navigation.");
  }
  // Utility function to get mouse position relative to the window
  function getMousePos(ev) {
    return {
      x: ev.clientX,
      y: ev.clientY,
    };
  }
  // Utility function for linear interpolation (lerp)
  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
  let mouse = {
    x: 0,
    y: 0,
  };
  window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));
  class Cursor {
    constructor() {
      // Grab the image with the ID #handyyo
      this.image = document.querySelector("#handyyo");
      this.cursorConfigs = {
        x: {
          previous: 0,
          current: 0,
          amt: 0.2,
        },
        y: {
          previous: 0,
          current: 0,
          amt: 0.2,
        },
      };
      // Initialize mouse movement listener
      window.addEventListener("mousemove", this.onMouseMoveEv.bind(this));
    }
    onMouseMoveEv() {
      // Update current mouse position
      this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.current = mouse.y;
      // Start the animation loop
      requestAnimationFrame(() => this.render());
    }
    render() {
      // Apply lerp to smooth the mouse movement
      for (const key in this.cursorConfigs) {
        this.cursorConfigs[key].previous = lerp(
          this.cursorConfigs[key].previous,
          this.cursorConfigs[key].current,
          this.cursorConfigs[key].amt
        );
      }
      // Check if the image exists
      if (this.image) {
        const imgWidth = this.image.offsetWidth;
        const imgHeight = this.image.offsetHeight;
        // Use GSAP to animate the image's position, adjusting for its width and height
        gsap.to(this.image, {
          duration: 0.2, // Smooth transition duration
          x: this.cursorConfigs.x.previous - imgWidth / 2, // Offset by half the image's width
          y: this.cursorConfigs.y.previous - imgHeight / 2, // Offset by half the image's height
          ease: "power3.out", // Easing for smooth motion
        });
      }
      // Keep the animation going
      requestAnimationFrame(() => this.render());
    }
  }
  // Initialize the Cursor class
  const cursor = new Cursor();
});
