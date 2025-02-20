document.addEventListener("DOMContentLoaded", function () {
    const hoverDelay = 750; // Delay before re-enabling hover after click (ms)
    const throttleLimit = 50; // Throttle limit for mousemove events (ms)
    const initialDelay = 1000; // Delay before starting hover (ms)
    let hoverEffectActive = false;
    let links = []; // Cache the links array
    let isHovering = false;
    let lastHoveredLink = null;
    const hoveredLinksQueue = []; // Queue of links to hover
    let backgroundImage = null;
    const linkOffsets = [0, 185]; // Example X offsets for two links
    const imageClasses = ["sdds", "nerner"];
    const imageElements = {};
    function updateLinksCache() {
      links = document.querySelectorAll(
        ".link.ofjnworfn, .link.h.top.intro"
      );
    }
    function throttle(func, limit) {
      let inThrottle;
      return function (...args) {
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    }
    function initializeHoverScript() {
      if (!hoverEffectActive) return;
      updateLinksCache(); // Initial cache update
      backgroundImage = document.querySelector(".imglinkbg.arch.intro");
      if (!backgroundImage) {
        console.error(
          "Background image element with class .imglinkbg.arch.intro not found!"
        );
        return; // Exit if the element is not found
      }
      // Find the image elements
      imageClasses.forEach((className) => {
        imageElements[className] = document.querySelector(
          `.bookim.${className}`
        );
        if (!imageElements[className]) {
          console.error(
            `Image element with class .bookim.${className} not found!`
          );
        }
      });
      document.addEventListener("mousemove", hoverEventHandler);
    }
    const hoverEventHandler = (event) => {
      if (!hoverEffectActive) return;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      let closestLink = null;
      let smallestDistanceSq = Infinity;
      links.forEach((link) => {
        try {
          const rect = link.getBoundingClientRect();
          const linkCenterX = (rect.left + rect.right) / 2;
          const linkCenterY = (rect.top + rect.bottom) / 2;
          const distanceSq =
            Math.pow(mouseX - linkCenterX, 2) +
            Math.pow(mouseY - linkCenterY, 2);
          if (distanceSq < smallestDistanceSq) {
            smallestDistanceSq = distanceSq;
            closestLink = link;
          }
        } catch (error) {
          console.error("Error getting bounding rect:", error);
        }
      });
      if (closestLink && closestLink !== lastHoveredLink) {
        hoveredLinksQueue.push(closestLink);
        lastHoveredLink = closestLink;
        processQueue();
      }
    };
    function processQueue() {
      if (
        !hoverEffectActive ||
        isHovering ||
        hoveredLinksQueue.length === 0
      ) {
        return;
      }
      isHovering = true;
      const link = hoveredLinksQueue.shift();
      link.dispatchEvent(
        new MouseEvent("mouseover", {
          bubbles: true,
        })
      );
      const linkIndex = Array.from(links).indexOf(link);
      if (linkIndex !== -1 && linkIndex < linkOffsets.length) {
        const offsetX = linkOffsets[linkIndex];
        backgroundImage.style.transform = `translateX(${offsetX}px)`;
      }
      imageClasses.forEach((className, index) => {
        const imageElement = imageElements[className];
        if (imageElement) {
          if (index === linkIndex) {
            imageElement.style.opacity = 1;
          } else {
            setTimeout(() => {
              imageElement.style.opacity = 0;
            }, 50);
          }
        }
      });
      setTimeout(() => {
        link.dispatchEvent(
          new MouseEvent("mouseout", {
            bubbles: true,
          })
        );
        isHovering = false;
        processQueue();
      }, 80);
    }
    setTimeout(() => {
      hoverEffectActive = true;
      initializeHoverScript();
    }, initialDelay);
    const observer = new MutationObserver(updateLinksCache);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  });