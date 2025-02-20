// v22home-exit-animation.js
document.addEventListener("DOMContentLoaded", function () {
  // Select all <a> elements with class "link"
  const realLinks = document.querySelectorAll(".link");

  const interfi2 = document.querySelector(".outsidebutton");
  const menuovvv = document.getElementById("menuoverlay");
  const xwrap = document.querySelector("._100wrap");
  const fixedWrap = document.querySelector(".fixed-100");
  const texts = document.querySelectorAll(".linkwrap");

  // Function to reset the animation
  function resetAnimation() {
    console.log("Resetting animation");
    // Make sure elements are visible
    fixedWrap.style.display = "none";
    if (interfi2) interfi2.style.opacity = "1"; // Check if element exists
    if (menuovvv) menuovvv.style.height = "22.5px"; // Check if element exists
    xwrap.style.height = "100vh";
    xwrap.style.top = "auto";
    xwrap.style.bottom = "0";

    // Reset GSAP properties
    gsap.set(texts, { opacity: 1, y: 0 });
    gsap.set(interfi2, { y: 0, opacity: 1, height: "auto" });
    gsap.set(menuovvv, { height: "22.5px" });
    gsap.set(xwrap, { height: "100vh", top: "auto", bottom: "0" });
  }

  // Detect back button navigation using visibilitychange event
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      console.log("Page is now visible (back button navigation?)");
      resetAnimation(); // Reset the animation
    }
  });

  realLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      // Check if href is a valid URL and not a hash link or JavaScript link
      const isHashLink = href.startsWith("#");
      const isJavaScriptLink = href.startsWith("javascript:");
      const hasTargetBlank = this.getAttribute("target") === "_blank";
      const isDownloadLink = this.hasAttribute("download");
      const allLinks = document.querySelectorAll("a");

      if (isHashLink || isJavaScriptLink || hasTargetBlank || isDownloadLink) {
        return; // Allow default behavior
      }

      event.preventDefault(); // Prevent default navigation
      fixedWrap.style.display = "block";

      // **1. Initiate Background Loading**
      let nextPageContent = null;
      fetch(href)
        .then((response) => response.text())
        .then((html) => {
          // You might not need to parse the HTML if you're doing a full redirect
          // But if you want to do a content replacement, parse it here
          // const parser = new DOMParser();
          // const doc = parser.parseFromString(html, 'text/html');
          // nextPageContent = doc.getElementById('content').innerHTML; // Adjust selector
          nextPageContent = html; // Store the entire HTML
        })
        .catch((error) => {
          console.error("Error loading page:", error);
          // Fallback: normal navigation if loading fails
          window.location.href = href;
        });

      // GSAP Animations
      gsap.to(texts, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.05,
        ease: "power3.inOut",
      });

      gsap.to(interfi2, {
        y: -10,
        opacity: 0,
        height: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "power3.inOut",
      });

      gsap.to(menuovvv, {
        height: "0px",
        duration: 0.15,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.to(xwrap, {
            height: 0,
            top: 0,
            bottom: "auto",
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
              // **2. Delayed Navigation**
              if (nextPageContent) {
                // **Option 1: Content Replacement (SPA-like)**
                // document.body.innerHTML = nextPageContent; // Replace entire body
                // Or, replace a specific container:
                // document.getElementById('content').innerHTML = doc.getElementById('content').innerHTML;
                // window.scrollTo(0, 0); // Reset scroll position

                // **Option 2: Traditional Redirect (if content loading fails or not needed)**
                window.location.href = href;
              } else {
                window.location.href = href; // Fallback
              }
            },
          });
        },
      });

      // Disable all links to prevent multiple clicks
      allLinks.forEach(function (lnk) {
        lnk.classList.add("disabled");
      });
    });
  });
});
