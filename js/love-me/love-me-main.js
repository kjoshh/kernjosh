document.addEventListener("DOMContentLoaded", function () {
  const headertext = document.querySelector(".headertext");
  const passwordmain = document.querySelector(".passwordmain");
  const submitform = document.querySelector(".submitform");
  const navigalast = document.getElementById("navigalast");
  function typeWriterEffect(element, text, speed = 35) {
    element.innerHTML = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        if (text.substring(i, i + 4) === "<br>") {
          element.innerHTML += "<br>";
          i += 4;
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
    if (enteredPassword === "home") {
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
          naviga.style.display = "flex";
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
      const hintContent = `We are not a proud race<br>
  It's not a race at all<br>
  We're just trying, I'm only trying to get ____`;
      typeWriterEffect(hintText, hintContent, 50);
    } else {
      hintText.classList.add("hidden");
      firsthint.classList.remove("hidden");
      secondhint.classList.add("hidden");
    }
  });
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const interfaceElement = document.getElementById("naviga");
  let currentImages = [];
  let currentIndex = 0;
  const counterElement = document.createElement("div");
  counterElement.style.position = "fixed";
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
    counterElement.textContent = `${currentIndex + 1} / ${
      currentImages.length
    }`;
    counterElement.style.display = "block";
    gsap.to(counterElement, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.in",
    });
  }
  function handleKeyDown(event) {
    if (lightbox.style.display === "flex") {
      switch (event.key) {
        case "ArrowRight":
          showNextImage();
          break;
        case "ArrowLeft":
          showPreviousImage();
          break;
        case "Escape":
          closeLightbox();
          break;
        default:
          break;
      }
    }
  }
  document.querySelectorAll(".image-container img").forEach((img) => {
    img.addEventListener("mouseover", (e) => {
      const highResSrc = e.target.src.replace(
        "/love-me-thumb/love-me-thumb-",
        "/love-me-full/love-me-full-"
      );
      const backgroundImage = new Image();
      backgroundImage.src = highResSrc;
      backgroundImage.onload = () => {
        const clonedImage = e.target.cloneNode(true);
        clonedImage.src = highResSrc;
        clonedImage.style.position = "absolute";
        clonedImage.style.top = "-9999px";
        clonedImage.style.left = "-9999px";
        clonedImage.style.width = "auto";
        clonedImage.style.height = "auto";
        clonedImage.style.visibility = "hidden";
        clonedImage.style.pointerEvents = "none";
        document.body.appendChild(clonedImage);
      };
    });
    img.addEventListener("click", (e) => {
      e.target.style.visibility = "hidden";
      const container = e.target.closest(".image-container");
      currentImages = Array.from(container.querySelectorAll("img"));
      const highResSrc = e.target.src.replace(
        "/love-me-thumb/love-me-thumb-",
        "/love-me-full/love-me-full-"
      );
      currentIndex = currentImages
        .map((img) =>
          img.src.replace(
            "/love-me-thumb/love-me-thumb-",
            "/love-me-full/love-me-full-"
          )
        )
        .indexOf(highResSrc);
      updateCounter();
      lightboxImage.src = highResSrc;
      gsap.to(interfaceElement, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          interfaceElement.style.display = "none";
        },
      });
      const clonedImage = e.target.cloneNode(true);
      clonedImage.src = highResSrc;
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
  function closeLightbox() {
    const rect = lightboxImage.getBoundingClientRect();
    const clonedImage = lightboxImage.cloneNode(true);
    const highResSrc = lightboxImage.src.replace(
      "/love-me-thumb/Love-Me-Thumb-",
      "/love-me-full/love-me-full-"
    );
    clonedImage.src = highResSrc;
    document.body.appendChild(clonedImage);
    clonedImage.style.position = "fixed";
    clonedImage.style.top = `${rect.top}px`;
    clonedImage.style.left = `${rect.left}px`;
    clonedImage.style.width = `${rect.width}px`;
    clonedImage.style.height = `${rect.height}px`;
    clonedImage.style.zIndex =
      "999999999999999999999999999999999999999999999999991";
    clonedImage.style.objectFit = "contain";
    const originalImage = Array.from(
      document.querySelectorAll(".image-container img")
    ).find(
      (img) =>
        img.src.replace(
          "/love-me-thumb/love-me-thumb-",
          "/love-me-full/love-me-full-"
        ) === highResSrc
    );
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
        originalImage.style.opacity = "1";
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
    gsap.to(interfaceElement, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.in",
    });
    lightbox.style.display = "none";
    document.removeEventListener("keydown", handleKeyDown);
  }
  function showNextImage() {
    if (currentImages.length > 0) {
      currentImages[currentIndex].style.visibility = "visible";
      gsap.to(currentImages[currentIndex], {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      currentIndex = (currentIndex + 1) % currentImages.length;
      gsap.to(currentImages[currentIndex], {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          currentImages[currentIndex].style.visibility = "hidden";
        },
      });
      updateCounter();
      const currentHighResSrc = currentImages[currentIndex].src.replace(
        "/love-me-thumb/love-me-thumb-",
        "/love-me-full/love-me-full-"
      );
      lightboxImage.src = currentHighResSrc;
      const clonedNextImage = document.createElement("img");
      clonedNextImage.src = currentImages[
        (currentIndex + 1) % currentImages.length
      ].src.replace(
        "/love-me-thumb/love-me-thumb-",
        "/love-me-full/love-me-full-"
      );
      document.body.appendChild(clonedNextImage);
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
      currentImages[currentIndex].style.visibility = "visible";
      gsap.to(currentImages[currentIndex], {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
      gsap.to(currentImages[currentIndex], {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          currentImages[currentIndex].style.visibility = "hidden";
        },
      });
      updateCounter();
      const currentHighResSrc = currentImages[currentIndex].src.replace(
        "/love-me-thumb/love-me-thumb-",
        "/love-me-full/love-me-full-"
      );
      lightboxImage.src = currentHighResSrc;
      const clonedPrevImage = document.createElement("img");
      clonedPrevImage.src = currentImages[
        (currentIndex - 1 + currentImages.length) % currentImages.length
      ].src.replace(
        "/love-me-thumb/love-me-thumb-",
        "/love-me-full/love-me-full-"
      );
      document.body.appendChild(clonedPrevImage);
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
  const buchDiv = document.querySelector(".buchhh");
  const buchButton = document.getElementById("openbook");
  const closeBuch = document.getElementById("closebook");
  const huetteDiv = document.querySelector(".yobacki");
  const huetteButton = document.getElementById("huettebutton");
  const closeHuette = document.getElementById("closehuette");
  const vidDiv = document.querySelector(".videobackinout");
  const vidButton = document.getElementById("vidbutton");
  const closeVid = document.getElementById("closevid");
  const mainInterface = document.getElementById("naviga");
  const grainiwrapppp = document.getElementById("grainiwrapppp");
  const closeThreeJs = document.getElementById("closeModal");
  const openThreeJs = document.getElementById("openModal");
  const backStuff = document.querySelector(".blurbackstuff");
  const divsixfive = document.querySelector(".div-block-65");
  const lovemeembbbb = document.querySelector(".lovemeembbbb");
  const bsideslink = document.querySelector("#bsideslink");
  const firstinterfacex = document.querySelector("#firstinterfacex");
  const scondinterfaceex = document.querySelector("#scondinterfaceex");
  const closebsides = document.querySelector("#closebsides");
  const opentext = document.querySelector("#opentext");
  const closetext = document.querySelector("#closetext");
  const textdivhute = document.querySelector(".textdivhute");
  const textimg = document.querySelector("#textimg");
  const turimg = document.querySelector("#turimg");
  opentext.addEventListener("mouseover", (e) => {
    gsap.to(textimg, {
      opacity: 0.9,
      duration: 0.4,
      ease: "power2.inOut",
    });
  });
  opentext.addEventListener("mouseout", (e) => {
    gsap.to(textimg, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  });
  openThreeJs.addEventListener("mouseover", (e) => {
    gsap.to(turimg, {
      opacity: 0.75,
      duration: 0.4,
      ease: "power2.inOut",
    });
  });
  openThreeJs.addEventListener("mouseout", (e) => {
    gsap.to(turimg, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  });
  closetext.addEventListener("click", () => {
    firstinterfacex.style.display = "flex";
    gsap.to(textdivhute, {
      opacity: 0,
      duration: 0.75,
      ease: "power4.inOut",
      onComplete: () => {
        textdivhute.style.display = "none";
      },
    });
    gsap.to(firstinterfacex, {
      delay: 0.5,
      opacity: 1,
      duration: 0.15,
      ease: "power4.inOut",
    });
  });
  opentext.addEventListener("click", () => {
    textdivhute.style.display = "flex";
    gsap.to(textdivhute, {
      opacity: 1,
      duration: 0.75,
      ease: "power4.inOut",
    });
    gsap.to(firstinterfacex, {
      opacity: 0,
      duration: 0.15,
      ease: "power4.inOut",
      onComplete: () => {
        firstinterfacex.style.display = "none";
      },
    });
  });
  bsideslink.addEventListener("click", () => {
    scondinterfaceex.style.display = "flex";
    divsixfive.style.display = "flex";
    gsap.set(lovemeembbbb, {
      opacity: 1,
    });
    gsap.to(divsixfive, {
      opacity: 1,
      duration: 1,
      ease: "power4.inOut",
    });
    gsap.to(firstinterfacex, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.inOut",
      onComplete: () => {
        firstinterfacex.style.display = "none";
      },
    });
    gsap.to(scondinterfaceex, {
      opacity: 1,
      delay: 0.15,
      duration: 0.15,
      ease: "power2.inOut",
    });
  });
  closebsides.addEventListener("click", () => {
    firstinterfacex.style.display = "flex";
    gsap.to(divsixfive, {
      opacity: 0,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        divsixfive.style.display = "none";
      },
    });
    gsap.to(firstinterfacex, {
      opacity: 1,
      duration: 0.15,
      delay: 0.15,
      ease: "power4.inOut",
    });
    gsap.to(scondinterfaceex, {
      opacity: 0,
      duration: 0.15,
      ease: "power4.inOut",
      onComplete: () => {
        scondinterfaceex.style.display = "none";
      },
    });
  });
  vidButton.addEventListener("click", () => {
    window.handleVideoStateChange(true);
    gsap.to(vidDiv, {
      y: "0vh",
      duration: 0.65,
      ease: "power4.out",
    });
    gsap.to(mainInterface, {
      opacity: 0,
      duration: 0.25,
      ease: "power3.inOut",
      onComplete: () => {
        mainInterface.style.display = "none";
      },
    });
  });
  closeVid.addEventListener("click", () => {
    window.handleVideoStateChange(false);
    mainInterface.style.display = "flex";
    gsap.to(vidDiv, {
      y: "101vh",
      duration: 0.65,
      ease: "power3.in",
    });
    gsap.to(mainInterface, {
      opacity: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  });
  huetteButton.addEventListener("click", () => {
    backStuff.style.display = "block";
    gsap.to([huetteDiv, backStuff], {
      y: "0vh",
      opacity: 1,
      duration: 0.65,
      ease: "power4.out",
    });
    gsap.to([mainInterface, navigalast], {
      opacity: 0,
      duration: 0.25,
      ease: "power3.inOut",
      onComplete: () => {
        mainInterface.style.display = "none";
        navigalast.style.display = "none";
      },
    });
  });
  closeHuette.addEventListener("click", () => {
    mainInterface.style.display = "flex";
    navigalast.style.display = "flex";
    gsap.to(grainiwrapppp, {
      opacity: 1,
      duration: 0.5,
      ease: "power4.in",
    });
    gsap.to(huetteDiv, {
      y: "101vh",
      duration: 0.65,
      ease: "power4.in",
    });
    gsap.to(backStuff, {
      opacity: 0,
      duration: 0.65,
      ease: "power4.in",
      onComplete: () => {
        backStuff.style.display = "none";
      },
    });
    gsap.to([mainInterface, navigalast], {
      opacity: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  });
  buchButton.addEventListener("click", () => {
    gsap.to(buchDiv, {
      y: "0vh",
      duration: 0.65,
      ease: "power4.out",
    });
    gsap.to(mainInterface, {
      opacity: 0,
      duration: 0.25,
      ease: "power3.inOut",
      onComplete: () => {
        mainInterface.style.display = "none";
      },
    });
  });
  closeBuch.addEventListener("click", () => {
    mainInterface.style.display = "flex";
    gsap.to(buchDiv, {
      y: "101vh",
      duration: 0.65,
      ease: "power4.in",
    });
    gsap.to(mainInterface, {
      opacity: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  });
  openThreeJs.addEventListener("click", () => {
    gsap.to(grainiwrapppp, {
      opacity: 0,
      duration: 1.5,
      ease: "power4.in",
    });
  });
  closeThreeJs.addEventListener("click", () => {
    gsap.to(grainiwrapppp, {
      opacity: 1,
      duration: 0.5,
      ease: "power4.in",
    });
  });

  let videoIframe2 = document.getElementById("lovememvid");
  let videoCloseButton = document.getElementById("closevid");
  let player2 = new Vimeo.Player(videoIframe2);
  if (videoCloseButton) {
    videoCloseButton.addEventListener("click", function () {
      player2.pause();
    });
  } else {
    console.error("Error: #videoclose button not found in the DOM.");
  }
  function getMousePos(ev) {
    return {
      x: ev.clientX,
      y: ev.clientY,
    };
  }
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
      this.images = document.querySelectorAll(".imgmouse");
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
      window.addEventListener("mousemove", this.onMouseMoveEv.bind(this));
    }
    onMouseMoveEv() {
      this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.current = mouse.y;
      requestAnimationFrame(() => this.render());
    }
    render() {
      for (const key in this.cursorConfigs) {
        this.cursorConfigs[key].previous = lerp(
          this.cursorConfigs[key].previous,
          this.cursorConfigs[key].current,
          this.cursorConfigs[key].amt
        );
      }
      this.images.forEach((image) => {
        const imgWidth = image.offsetWidth;
        const imgHeight = image.offsetHeight;
        gsap.to(image, {
          duration: 0.2,
          x: this.cursorConfigs.x.previous - imgWidth / 2,
          y: this.cursorConfigs.y.previous - imgHeight / 2,
          ease: "power3.out",
        });
      });
      requestAnimationFrame(() => this.render());
    }
  }
  const cursor = new Cursor();
  const lovemeembbbbImages = document.querySelectorAll(".lovemeembbbb");
  const imgmouseImages = document.querySelectorAll(".imgmouse");
  if (lovemeembbbbImages.length !== 7 || imgmouseImages.length !== 7) {
    console.error(
      "Error: There must be exactly 7 images with class .lovemeembbbb and 7 images with class .imgmouse"
    );
    var validImages = false;
  } else {
    var validImages = true;
  }
  if (validImages) {
    lovemeembbbbImages.forEach((lovemeembbbb, index) => {
      lovemeembbbb.addEventListener("mouseover", () => {
        lovemeembbbb.style.opacity = 0;
        imgmouseImages[index].style.opacity = 1;
      });
      lovemeembbbb.addEventListener("mouseout", () => {
        lovemeembbbb.style.opacity = 1;
        imgmouseImages[index].style.opacity = 0;
      });
    });
  }
  //   const passwordmain = document.querySelector(".passwordmain");
  //   const submitform = document.querySelector(".submitform");
  //   const navigalast = document.getElementById("navigalast");
  const pwembed = document.getElementById("pwembed");
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
});
