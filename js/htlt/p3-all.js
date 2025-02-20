// Target value and duration
const targetValue = 100;
const duration = 2900; // in milliseconds
const delay = 500; // delay in milliseconds

// Cubic Bezier easing function for (0.292, 0.638, 0.544, 0.246)
function cubicBezier(t) {
  const [p0, p1, p2, p3] = [0.292, 0.638, 0.544, 0.246];
  const u = 1 - t;
  return 3 * u * u * t * p0 + 3 * u * t * t * p2 + t * t * t;
}

// Animation function
function animateCountUp(element, target, duration, easingFunc) {
  const startTime = performance.now();

  function updateValue(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); // clamp progress to 1
    const easedProgress = easingFunc(progress); // apply easing
    const currentValue = Math.floor(target * easedProgress);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateValue); // continue if not finished
    }
  }

  requestAnimationFrame(updateValue);
}

// Add delay before starting the animation
setTimeout(() => {
  animateCountUp(
    document.getElementById("countyo"),
    targetValue,
    duration,
    cubicBezier
  );
}, delay);

document
  .getElementById("newbuttonlast")
  .addEventListener("click", function (event) {
    // Prevent the default action
    event.preventDefault();

    // Scroll to the bottom of the page after 7 seconds
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 7000);

    // Navigate to the new page after 8 seconds
    setTimeout(function () {
      window.location.href = "https://kernjosh.com/how-to-leave-town-p4";
    }, 4500);
  });

// Get the audio elements
const clickAudio = document.getElementById("click-audio");
const hoverAudio = document.getElementById("hover-audio");

// List of link classes and associated audio
const linkClasses = [
  { className: "textyo._2", clickAudio: clickAudio, hoverAudio: hoverAudio },
  { className: "linkisound", clickAudio: clickAudio, hoverAudio: hoverAudio },
  {
    className: "link.translate.p4.p3x1",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "link.translate.p4.p3x2",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "link.translate.p4.p3x3",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "link.translate.p4.p3x4",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "link.translate.p4.p3x5",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
];

linkClasses.forEach((linkInfo) => {
  const link = document.querySelector(`.${linkInfo.className}`);
  if (link) {
    // Add click event listener if there's an associated click audio
    if (linkInfo.clickAudio) {
      link.addEventListener("click", function (event) {
        linkInfo.clickAudio.currentTime = 0; // Reset audio to the beginning
        linkInfo.clickAudio.play(); // Play the audio
      });
    }

    // Add hover event listener if there's an associated hover audio
    if (linkInfo.hoverAudio) {
      link.addEventListener("mouseover", function () {
        linkInfo.hoverAudio.play();
      });

      // Optional: Stop the hover audio when the mouse leaves the element
      link.addEventListener("mouseleave", function () {
        linkInfo.hoverAudio.pause();
        linkInfo.hoverAudio.currentTime = 0; // Reset audio to the beginning
      });
    }
  }
});
window.onload = function () {
  var textElement = document.querySelector(".textyo._2"); // Use the class name
  var body = document.querySelector("body.p3");

  if (textElement && body) {
    textElement.addEventListener("click", function () {
      body.style.overflow = "visible";
    });
  }

  // Ensure the page is scrolled to the top
  window.scrollTo(0, 0);

  // Disable scroll restoration to prevent unwanted scrolling
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // Add a 1.25 second delay before starting the scroll animation
  setTimeout(function () {
    // Use a function to control the smooth scroll
    $("html, body")
      .stop(true, true)
      .animate(
        {
          scrollTop: 4.1 * $(window).height(), // Scrolls 4.1 times the window height down (410vh)
        },
        2000 // Animation duration of 2600 milliseconds (2.6 seconds)
      );
  }, 3500); // Delay is now 1250 milliseconds (1.25 seconds)
};

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins

// Function to create a ScrollTrigger animation for a pin segment
// Function to create a ScrollTrigger animation for a pin segment
function createPinAnimation(start, end, triggerClass, immediateRender) {
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: start,
      end: end,
    },
    scrollTrigger: {
      trigger: `.home-scroll_text-item.${triggerClass}`,
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: immediateRender, // Set immediateRender dynamically
    },
  });
}

// Call the function for the first pin segment with immediateRender: true
createPinAnimation(0.128, 0.1295, "p3p1", true);

// Call the function for the rest with immediateRender: false
createPinAnimation(0.1295, 0.1302, "p3p2", false);
createPinAnimation(0.1302, 0.15, "p3p3", false);
createPinAnimation(0.15, 0.1555, "p3p4", false);
createPinAnimation(0.1555, 0.17, "p3p5", false);
createPinAnimation(0.17, 0.171, "p3p6", false);
createPinAnimation(0.171, 0.172, "p3p7", false);
createPinAnimation(0.172, 0.178, "p3p8", false);
createPinAnimation(0.178, 0.19, "p3p9", false);
createPinAnimation(0.19, 0.1977, "p3p10", false);
createPinAnimation(0.1977, 0.2085, "p3p11", false);
createPinAnimation(0.2085, 0.2115, "p3p12", false);
createPinAnimation(0.2115, 0.2245, "p3p14", false);
createPinAnimation(0.2245, 0.2305, "p3p15", false);
createPinAnimation(0.2305, 0.246, "p3p16", false);
createPinAnimation(0.246, 0.256, "p3p17", false);

//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins
//pinspinspinspinspinspinspinspinspinspinspinspins

document.addEventListener("DOMContentLoaded", function () {
  // Set initial values for the counters
  document.querySelector(".tagecount").textContent = 12;
  document.querySelector(".kmcount").textContent = 298;
  document.querySelector(".coordi-1").textContent = 5012490;
  document.querySelector(".coordi-2").textContent = 1442658;

  function animateCounter(
    target,
    start,
    end,
    trigger,
    startTrigger,
    endTrigger,
    scrub,
    markerId
  ) {
    let obj = { value: start };
    gsap.to(obj, {
      value: end,
      scrollTrigger: {
        trigger: trigger,
        start: startTrigger,
        end: endTrigger,
        scrub: scrub,
        id: markerId,
        onEnter: () => updateCounter(target, obj, start),
        onLeaveBack: () => updateCounter(target, obj, start),
      },
      onUpdate: function () {
        document.querySelector(target).textContent = Math.floor(obj.value);
      },
    });
  }

  function updateCounter(target, obj, value) {
    obj.value = value;
    document.querySelector(target).textContent = Math.floor(obj.value);
  }

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    12,
    12,
    ".home-scroll_text-item.p3p1",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    298,
    306,
    ".home-scroll_text-item.p3p1",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    5012490,
    5007813,
    ".home-scroll_text-item.p3p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1442658,
    1442339,
    ".home-scroll_text-item.p3p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    12,
    13,
    ".home-scroll_text-item.p3p2",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    306,
    313,
    ".home-scroll_text-item.p3p2",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    5007813,
    5000839,
    ".home-scroll_text-item.p3p2",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1442339,
    1448455,
    ".home-scroll_text-item.p3p2",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    13,
    15,
    ".home-scroll_text-item.p3p3",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    313,
    374,
    ".home-scroll_text-item.p3p3",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    5000839,
    4970634,
    ".home-scroll_text-item.p3p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1448455,
    1482053,
    ".home-scroll_text-item.p3p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".kmcount",
    374,
    385,
    ".home-scroll_text-item.p3p4",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4970634,
    4963071,
    ".home-scroll_text-item.p3p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1482053,
    1486440,
    ".home-scroll_text-item.p3p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    15,
    16,
    ".home-scroll_text-item.p3p5",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    385,
    406,
    ".home-scroll_text-item.p3p5",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4963071,
    4952550,
    ".home-scroll_text-item.p3p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1486440,
    1504860,
    ".home-scroll_text-item.p3p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations

  animateCounter(
    ".kmcount",
    406,
    411,
    ".home-scroll_text-item.p3p6",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4952550,
    4951071,
    ".home-scroll_text-item.p3p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1504860,
    1511952,
    ".home-scroll_text-item.p3p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".kmcount",
    411,
    413,
    ".home-scroll_text-item.p3p7",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4951071,
    4951074,
    ".home-scroll_text-item.p3p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1511952,
    1511955,
    ".home-scroll_text-item.p3p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    16,
    17,
    ".home-scroll_text-item.p3p8",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    413,
    421,
    ".home-scroll_text-item.p3p8",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4943250,
    4951074,
    ".home-scroll_text-item.p3p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1520109,
    1511955,
    ".home-scroll_text-item.p3p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    17,
    18,
    ".home-scroll_text-item.p3p9",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    421,
    446,
    ".home-scroll_text-item.p3p9",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4951074,
    4937367,
    ".home-scroll_text-item.p3p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1511955,
    1533104,
    ".home-scroll_text-item.p3p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    18,
    19,
    ".home-scroll_text-item.p3p10",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    446,
    481,
    ".home-scroll_text-item.p3p10",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4937367,
    4912258,
    ".home-scroll_text-item.p3p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1533104,
    1550693,
    ".home-scroll_text-item.p3p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    19,
    20,
    ".home-scroll_text-item.p3p11",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    481,
    498,
    ".home-scroll_text-item.p3p11",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4912258,
    4910316,
    ".home-scroll_text-item.p3p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1550693,
    1563139,
    ".home-scroll_text-item.p3p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    20,
    21,
    ".home-scroll_text-item.p3p12",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    498,
    519,
    ".home-scroll_text-item.p3p12",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4910316,
    4897548,
    ".home-scroll_text-item.p3p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1563139,
    1570299,
    ".home-scroll_text-item.p3p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".kmcount",
    519,
    520,
    ".home-scroll_text-item.p3p13",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4897548,
    4897219,
    ".home-scroll_text-item.p3p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1570299,
    1570773,
    ".home-scroll_text-item.p3p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    21,
    23,
    ".home-scroll_text-item.p3p14",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    520,
    561,
    ".home-scroll_text-item.p3p14",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4897219,
    4884184,
    ".home-scroll_text-item.p3p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1570773,
    1594346,
    ".home-scroll_text-item.p3p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    23,
    24,
    ".home-scroll_text-item.p3p15",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    561,
    586,
    ".home-scroll_text-item.p3p15",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4884184,
    4875417,
    ".home-scroll_text-item.p3p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1594346,
    1614440,
    ".home-scroll_text-item.p3p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".kmcount",
    586,
    596,
    ".home-scroll_text-item.p3p16",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4875417,
    4863114,
    ".home-scroll_text-item.p3p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1614440,
    1628678,
    ".home-scroll_text-item.p3p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  // Initialize the counter animations
  animateCounter(
    ".tagecount",
    24,
    25,
    ".home-scroll_text-item.p3p17",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    586,
    635,
    ".home-scroll_text-item.p3p17",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4863114,
    4851172,
    ".home-scroll_text-item.p3p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    1628678,
    1657423,
    ".home-scroll_text-item.p3p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );
});
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
const imageTextPairs = [
  ".p3p1",
  ".p3p2",
  ".p3p3",
  ".p3p4",
  ".p3p5",
  ".p3p6",
  ".p3p7",
  ".p3p8",
  ".p3p9",
  ".p3p10",
  ".p3p11",
  ".p3p12",
  ".p3p13",
  ".p3p14",
  ".p3p15",
  ".p3p16",
  ".p3p17",
];

imageTextPairs.forEach((pair) => {
  gsap.to(`.home-scroll_img-item${pair}`, {
    ease: "none",
    x: -window.innerHeight * 3,
    scrollTrigger: {
      trigger: `.home-scroll_text-item${pair}`,
      start: "top 300%",
      end: "top -300%",
      scrub: 1,
    },
  });
});

gsap.to(".home-scroll_img-item.p3p18", {
  ease: "none",
  x: () => {
    const element = document.querySelector(".home-scroll_img-item.p3p18");
    const elementWidth = element.offsetWidth;
    const centerX = (window.innerWidth - elementWidth) / 2; // Calculate center position
    return centerX;
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p3p18",
    start: "top 300%",
    end: "top 35%",
    scrub: 1,
  },
});

//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages
//imagesimagesimagesimagesimagesimagesimagesimagesimages

// Player 1
let iframe1 = document.querySelector("#vimeo-video30");
let player1 = new Vimeo.Player(iframe1);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p3p5",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player1.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player1.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player1.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player1.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player1.setMuted(true);
    player1.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player1.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player1.setMuted(true);
    player1.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 2
let iframe2 = document.querySelector("#vimeo-video31");
let player2 = new Vimeo.Player(iframe2);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p3p6",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player2.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player2.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player2.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player2.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player2.setMuted(true);
    player2.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player2.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player2.setMuted(true);
    player2.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe3 = document.querySelector("#vimeo-video32");
let player3 = new Vimeo.Player(iframe3);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p3p7",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player3.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player3.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player3.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player3.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player3.setMuted(true);
    player3.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player3.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player3.setMuted(true);
    player3.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe4 = document.querySelector("#vimeo-video33");
let player4 = new Vimeo.Player(iframe4);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p3p8",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player4.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player4.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player4.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player4.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player4.setMuted(true);
    player4.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player4.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player4.setMuted(true);
    player4.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe5 = document.querySelector("#vimeo-video34");
let player5 = new Vimeo.Player(iframe5);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p3p15",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player5.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player5.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player5.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player5.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player5.setMuted(true);
    player5.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player5.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player5.setMuted(true);
    player5.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});
// Select the buttons and audio elements
const winterButton = document.getElementById("last-button-p3"); // Button to play winter audio
const fadeOutButton = document.getElementById("newbuttonlast"); // Button to fade out audio
const winterAudio = document.getElementById("winter"); // Winter audio element

// Create a Vimeo player instance
let iframe6 = document.querySelector("#vimeo-video35");
let player6 = new Vimeo.Player(iframe6);

// Set initial volume for winter audio and define fade durations
winterAudio.volume = 0;
const fadeInDuration = 3000; // Duration of fade-in in milliseconds
const fadeOutDuration = 3000; // Duration of fade-out in milliseconds

// Function to start playing and fade in winter audio
winterButton.addEventListener("click", () => {
  winterAudio.play(); // Start playing the audio

  // Calculate the fade-in increment based on volume steps over time
  const fadeStep = 0.01; // Volume increment per step
  const interval = fadeInDuration * fadeStep; // Time per volume increase step

  // Use an interval to gradually increase volume
  const fadeAudio = setInterval(() => {
    if (winterAudio.volume < 1) {
      winterAudio.volume = Math.min(winterAudio.volume + fadeStep, 1); // Increase volume until max
    } else {
      clearInterval(fadeAudio); // Stop fading when volume reaches 1
    }
  }, interval);
});

// Function to fade out both winter audio and Vimeo audio
fadeOutButton.addEventListener("click", () => {
  // Calculate the fade-out decrement based on volume steps over time
  const fadeStep = 0.01; // Volume decrement per step
  const interval = fadeOutDuration * fadeStep; // Time per volume decrease step

  // Fade out winter audio
  const fadeOutWinterAudio = setInterval(() => {
    if (winterAudio.volume > 0) {
      winterAudio.volume = Math.max(winterAudio.volume - fadeStep, 0); // Decrease volume until 0
    } else {
      clearInterval(fadeOutWinterAudio); // Stop fading when volume reaches 0
      winterAudio.pause(); // Pause the audio after fade out
      winterAudio.currentTime = 0; // Optional: reset audio to start
    }
  }, interval);

  // Fade out Vimeo audio
  const fadeOutVimeoAudio = setInterval(() => {
    player6.getVolume().then((volume) => {
      if (volume > 0) {
        const newVolume = Math.max(volume - fadeStep, 0); // Decrease volume until 0
        player6.setVolume(newVolume); // Set the new volume
      } else {
        clearInterval(fadeOutVimeoAudio); // Stop fading when volume reaches 0
      }
    });
  }, interval);
});

// ScrollTrigger for Vimeo Player
ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p3p18",
  start: "top 275%",
  end: "bottom -725%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player6.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player6.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player6.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player6.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player6.setMuted(true);
    player6.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player6.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player6.setMuted(true);
    player6.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Audio 6 Schirtte 2
let audio11 = document.querySelector("#schritte1");

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p3p1",
  start: "20% center",
  end: "400% center", // End 90% from the top of the viewport
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress;

    if (progress <= 0.2) {
      audio11.volume = Math.min(progress / 0.2, 1); // Cap at 1
    } else if (progress > 0.2 && progress < 0.7) {
      audio11.volume = 1; // Set to maximum
    } else if (progress >= 0.7) {
      audio11.volume = Math.min(Math.max((1 - progress) / 0.1, 0), 1);
    }
  },
  onEnter: () => {
    audio11.play();
  },
  onLeave: () => {
    audio11.pause();
    audio11.volume = 0;
  },
  onEnterBack: () => {
    audio11.play();
  },
  onLeaveBack: () => {
    audio11.pause();
    audio11.volume = 0;
  },
});

// Audio 6 Schirtte 2
let audio12 = document.querySelector("#schritte1");

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p3p1",
  start: "700% center",
  end: "1200% center", // End 90% from the top of the viewport
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress;

    if (progress <= 0.05) {
      audio12.volume = Math.min(progress / 0.05, 1); // Cap at 1
    } else if (progress > 0.05 && progress < 0.85) {
      audio12.volume = 1; // Set to maximum
    } else if (progress >= 0.85) {
      audio11.volume = Math.min(Math.max((1 - progress) / 0.1, 0), 1);
    }
  },
  onEnter: () => {
    audio12.play();
  },
  onLeave: () => {
    audio12.pause();
    audio12.volume = 0;
  },
  onEnterBack: () => {
    audio12.play();
  },
  onLeaveBack: () => {
    audio12.pause();
    audio12.volume = 0;
  },
});

// Function to show the pop-up, count down, and reload the page after 3 seconds
function popupAndReloadOnResize() {
  window.addEventListener("resize", function () {
    // Get the pop-up and countdown elements
    const popup = document.getElementById("resize-popup");
    const countdownElement = document.getElementById("downcount");

    // Show the pop-up
    popup.style.display = "block";

    // Initialize the countdown
    let countdown = 3; // Start from 3 seconds

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
      countdownElement.textContent = countdown; // Update the displayed number
      countdown--; // Decrease the countdown

      // If countdown reaches 0, clear the interval and reload the page
      if (countdown < 0) {
        clearInterval(countdownInterval);

        location.reload(); // Reload the page
      }
    }, 1000); // Update every second (1000 milliseconds)
  });
}

// Call the function to set
popupAndReloadOnResize();
         // Prevent overscroll by limiting scroll range
         document.addEventListener("scroll", () => {
          const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = document.documentElement.clientHeight;
          // Prevent overscroll at the top
          if (scrollTop <= 0) {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }
          // Prevent overscroll at the bottom
          if (scrollTop + clientHeight >= scrollHeight) {
            document.documentElement.scrollTop = scrollHeight - clientHeight;
            document.body.scrollTop = scrollHeight - clientHeight;
          }
        });
