document.addEventListener("DOMContentLoaded", function () {
  const imageUrls = Array.from(
    {
      length: 224,
    },
    (_, i) => ({
      thumb: `images/Love-Me/love-me-thumb/love-me-thumb-${i + 2}.jpg`,
      full: `images/Love-Me/love-me-full/love-me-full-${i + 2}.jpg`,
    })
  );
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  const shuffledIndices = Array.from(
    {
      length: imageUrls.length,
    },
    (_, i) => i
  );
  shuffleArray(shuffledIndices);
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(12, 12, 11, 0.5); /* Slightly transparent overlay */
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
  preloader.innerHTML = `<span id="progress-text" style=" margin:2.5vmin; transition: opacity 0.3s ease;">loading... 0/224</span>`;
  document.body.appendChild(preloader);
  let imagesLoadedCount = 0;
  const imgElements = document.querySelectorAll(".img-love-me");
  shuffledIndices.forEach((shuffledIndex) => {
    const imgData = imageUrls[shuffledIndex];
    const img = new Image();
    img.src = imgData.thumb;
    img.onload = () => {
      const targetImg = imgElements[shuffledIndex];
      if (targetImg) {
        targetImg.src = img.src;
        targetImg.dataset.full = imgData.full;
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
      imagesLoadedCount++;
      const progressText = document.getElementById("progress-text");
      const naviga = document.getElementById("naviga");
      progressText.textContent = `loading... ${imagesLoadedCount}/224`;
      if (imagesLoadedCount === imgElements.length) {
        gsap.to(progressText, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
        setTimeout(() => {
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
              preloader.remove();
            },
          });
        }, 400);
      }
    };
  });
});
