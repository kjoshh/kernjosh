// v57 hover-effects.js
let monitorTerminalState;

document.addEventListener("DOMContentLoaded", function () {
  console.log("hover-effects.js: DOMContentLoaded");

  // Configuration
  const hoverDelay = 750; // Delay before re-enabling hover after click (ms)
  const throttleLimit = 50; // Throttle limit for mousemove events (ms)

  // Hover stuff
  let hoverEffectActive = false;
  let userHoverDisabled = false; // Flag to disable hover temporarily after click
  let hoverEventHandler;
  let throttledHoverEventHandler;
  let links = []; // Cache the links array
  let isHovering = false;
  let lastHoveredLink = null;
  const hoveredLinksQueue = []; // Queue of links to hover

  // Background image element
  let backgroundImage = null;

  // Y offsets for each link (assuming they are in order)
  const linkOffsets = [0, 25.3, 50.6, 74.75, 100.1, 124, 149.3];

  // Image elements
  const imageClasses = [
    "archive",
    "htlt",
    "loveme",
    "fuckme",
    "rauberrrrrrr",
    "hasli",
    "nje",
  ];
  const imageElements = {};

  function updateLinksCache() {
    links = document.querySelectorAll(".link");
  }

  // Throttle function to limit the rate of function execution
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
    console.log("hover-effects.js: initializeHoverScript() called");
    if (!hoverEffectActive) return;

    updateLinksCache(); // Initial cache update

    // Find the existing background image element
    backgroundImage = document.querySelector(".imglinkbg.arch");

    if (!backgroundImage) {
      console.error(
        "Background image element with class .imglinkbg.arch not found!"
      );
      return; // Exit if the element is not found
    }

    // Find the image elements
    imageClasses.forEach((className) => {
      imageElements[className] = document.querySelector(
        `.imgbghome.${className}`
      );
      if (!imageElements[className]) {
        console.error(
          `Image element with class .imgbghome.${className} not found!`
        );
      }
    });

    hoverEventHandler = (event) => {
      if (!hoverEffectActive) return;

      const mouseX = event.clientX;
      const mouseY = event.clientY;
      let closestLink = null;
      let smallestDistanceSq = Infinity; // Use squared distance for performance

      links.forEach((link) => {
        try {
          const rect = link.getBoundingClientRect();
          const linkCenterX = (rect.left + rect.right) / 2;
          const linkCenterY = (rect.top + rect.bottom) / 2;

          // Calculate squared distance (more efficient)
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

    throttledHoverEventHandler = throttle(hoverEventHandler, throttleLimit);
    document.addEventListener("mousemove", throttledHoverEventHandler);
  }

  // function processQueue() {
  //   if (!hoverEffectActive || isHovering || hoveredLinksQueue.length === 0) {
  //     return;
  //   }

  //   isHovering = true;
  //   const link = hoveredLinksQueue.shift();

  //   // Dispatch mouseover and mouseout events
  //   link.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));

  //   // Position the background image
  //   const linkIndex = Array.from(links).indexOf(link); // Find the index of the link
  //   if (linkIndex !== -1 && linkIndex < linkOffsets.length) {
  //     const offsetY = linkOffsets[linkIndex];
  //     backgroundImage.style.transform = `translateY(${offsetY}px)`; // Move the background image
  //   }

  //   // Update image opacities
  //   imageClasses.forEach((className, index) => {
  //     const imageElement = imageElements[className];
  //     if (imageElement) {
  //       if (index === linkIndex) {
  //         // Fade in the new image immediately
  //         imageElement.style.opacity = 1;
  //       } else {
  //         // Fade out the old image with a slight delay
  //         setTimeout(() => {
  //           imageElement.style.opacity = 0;
  //         }, 50); // Adjust the delay (50ms) as needed
  //       }
  //     }
  //   });

  //   setTimeout(() => {
  //     link.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
  //     isHovering = false;
  //     processQueue();
  //   }, 80);
  // }
  function processQueue() {
    if (!hoverEffectActive || isHovering || hoveredLinksQueue.length === 0) {
      return;
    }

    isHovering = true;
    const link = hoveredLinksQueue.shift();

    // Dispatch mouseover and mouseout events
    link.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));

    // Position the background image
    const linkIndex = Array.from(links).indexOf(link); // Find the index of the link
    if (linkIndex !== -1 && linkIndex < linkOffsets.length) {
      const offsetY = linkOffsets[linkIndex];
      backgroundImage.style.transform = `translateY(${offsetY}px)`; // Move the background image
    }

    // Update image opacities
    imageClasses.forEach((className, index) => {
      const imageElement = imageElements[className];
      const glitchLayerElements = document.querySelectorAll(
        `.imgbghome.${className}.glitch-layer`
      ); // Select all glitch layers for this image

      if (imageElement) {
        if (index === linkIndex) {
          // Fade in the new image immediately
          imageElement.style.opacity = 1;
          glitchLayerElements.forEach((layer) => {
            layer.style.opacity = 1; // Also fade in glitch layers
          });
        } else {
          // Fade out the old image with a slight delay
          setTimeout(() => {
            imageElement.style.opacity = 0;
            glitchLayerElements.forEach((layer) => {
              layer.style.opacity = 0; // Also fade out glitch layers
            });
          }, 50); // Adjust the delay (50ms) as needed
        }
      }
    });

    setTimeout(() => {
      link.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
      isHovering = false;
      processQueue();
    }, 80);
  }

  function stopHoverScript() {
    if (throttledHoverEventHandler) {
      document.removeEventListener("mousemove", throttledHoverEventHandler);
      throttledHoverEventHandler = null; // Clear the throttled handler
      hoverEventHandler = null; // Clear the original handler
    }

    // Do NOT remove the background image element from the DOM
    // as it already exists in the HTML
  }

  // Listen for a custom event to trigger hover initialization
  document.addEventListener("hoverEffectsReady", function () {
    console.log("hover-effects.js: hoverEffectsReady event received");
    hoverEffectActive = true;
    initializeHoverScript();
  });

  // Handle link clicks
  const anchorLinks = document.querySelectorAll("a");
  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      stopHoverScript();
      hoverEffectActive = false;
      userHoverDisabled = true;

      setTimeout(() => {
        if (!window.terminalActive && userHoverDisabled) {
          hoverEffectActive = true;
          userHoverDisabled = false;
          initializeHoverScript();
        }
      }, hoverDelay);
    });
  });

  window.addEventListener("beforeunload", () => {
    clearInterval(monitorTerminalState);
  });

  // MutationObserver to update links cache when DOM changes
  const observer = new MutationObserver(updateLinksCache);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
});
