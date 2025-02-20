document.addEventListener("DOMContentLoaded", function () {
  const onloadDiv = document.getElementById("onloaddiv");
  const openMap = document.getElementById("openmap");
  const mapDiv = document.getElementById("mapdiv");
  const closeMap = document.getElementById("closemap");
  const mainInterface = document.getElementById("naviga");
  const secondmainInterface = document.getElementById("navigalast");
  const backStuff = document.querySelector(".blurbackstuff");
  gsap.to(onloadDiv, {
    opacity: 0,
    // height: "0%",
    duration: 0.75,
    ease: "power4.inOut",
    onComplete: () => {
      onloadDiv.style.display = "none";
      gsap.to(secondmainInterface, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.inOut",
      });
    },
  });
  openMap.addEventListener("click", () => {
    backStuff.style.display = "block";
    gsap.to(backStuff, {
      opacity: 1,
      duration: 0.65,
      ease: "power4.inOut",
    });
    gsap.to(mapDiv, {
      y: "0vh",
      duration: 0.65,
      ease: "power4.inOut",
    });
    gsap.to([mainInterface, secondmainInterface], {
      opacity: 0,
      duration: 0.25,
      ease: "power3.inOut",
      onComplete: () => {
        mainInterface.style.display = "none";
        secondmainInterface.style.display = "none";
      },
    });
  });
  closeMap.addEventListener("click", () => {
    mainInterface.style.display = "flex";
    secondmainInterface.style.display = "flex";
    gsap.to(backStuff, {
      opacity: 0,
      duration: 0.65,
      ease: "power4.inOut",
      onComplete: () => {
        backStuff.style.display = "none";
      },
    });
    gsap.to(mapDiv, {
      y: "101vh",
      duration: 0.65,
      ease: "power3.inOut",
    });
    gsap.to([mainInterface, secondmainInterface], {
      opacity: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  });
  // Generate the image URLs
  const imageUrls = Array.from(
    {
      length: 63,
    },
    (_, i) => ({
      thumb: `images/Nje/nje-full/nje-full-${i + 2}.jpg`,
      full: `images/Nje/nje--full/nje-full-${i + 2}.jpg`,
    })
  );


  // Your code to handle these URLs here
  console.log(imageUrls);
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
      opacity:0;
      display: flex;
      font-family: Neueeigene;
      letter-spacing: -1.5;
      align-items: flex-end;
      justify-content: right;
      font-size: 20px;
      z-index: 9999;
      transition: opacity 1.5s ease; /* Overlay fade-out */
    `;
  preloader.innerHTML = `<span id="progress-text" style=" margin:2.5vmin; transition: opacity 0.3s ease;">loading... 0/63</span>`;
  document.body.appendChild(preloader);
  gsap.to(preloader, {
    opacity: 1,
    duration: 1,
    ease: "power4.inOut",
  });
  // Track loaded images
  let imagesLoadedCount = 0;
  // Select all image elements (the imgfuck-me elements)
  const imgElements = document.querySelectorAll(".nje-img");
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
      progressText.textContent = `loading... ${imagesLoadedCount}/63`;
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
              naviga.style.display = "flex";
              gsap.fromTo(
                naviga,
                {
                  y: 20,
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
        }, 400); // Delay after text fade-out
      }
    };
  });
});
