gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
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

// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
//           Button Audio

// Get the audio elements
const clickAudio = document.getElementById("click-audio");
const hoverAudio = document.getElementById("hover-audio");

// List of link classes and associated audio
const linkClasses = [
  {
    className: "quitttt.linkisound.uff",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "turnaround.linkisound.uff1",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },

  {
    className: "quitttt.linkisound.lasttt",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "turnaround.linkisound.lasttt",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "play-select1.linkisound._1uib",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "play-select1.linkisound.lastttt",
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

//videoo

// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
//           Dates
document.addEventListener("DOMContentLoaded", function () {
  // Set initial values for the counters
  document.querySelector(".tagecount").textContent = 8;
  document.querySelector(".kmcount").textContent = 179;
  document.querySelector(".coordi-1").textContent = 5071952;
  document.querySelector(".coordi-2").textContent = 1368808;

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

  // Define animations in an array
  const animations = [
    {
      target: ".tagecount",
      start: 8,
      end: 8,
      trigger: ".home-scroll_text-item.p6p2",
    },
    {
      target: ".kmcount",
      start: 179,
      end: 183,
      trigger: ".home-scroll_text-item.p6p2",
    },
    {
      target: ".coordi-1",
      start: 5071952,
      end: 507130,
      trigger: ".home-scroll_text-item.p6p2",
    },
    {
      target: ".coordi-2",
      start: 1368808,
      end: 1370352,
      trigger: ".home-scroll_text-item.p6p2",
    },
    {
      target: ".coordi-1",
      start: 507130,
      end: 5070659,
      trigger: ".home-scroll_text-item.p7p2",
    },
    {
      target: ".coordi-2",
      start: 1370352,
      end: 1371073,
      trigger: ".home-scroll_text-item.p7p2",
    },
    {
      target: ".kmcount",
      start: 183,
      end: 185,
      trigger: ".home-scroll_text-item.p9p2",
    },
    {
      target: ".coordi-1",
      start: 5070659,
      end: 5070687,
      trigger: ".home-scroll_text-item.p9p2",
    },
    {
      target: ".coordi-2",
      start: 1371073,
      end: 1371329,
      trigger: ".home-scroll_text-item.p9p2",
    },
    {
      target: ".kmcount",
      start: 185,
      end: 190,
      trigger: ".home-scroll_text-item.p10p2",
    },
    {
      target: ".coordi-1",
      start: 5070687,
      end: 5068514,
      trigger: ".home-scroll_text-item.p10p2",
    },
    {
      target: ".coordi-2",
      start: 1371329,
      end: 1373387,
      trigger: ".home-scroll_text-item.p10p2",
    },
    {
      target: ".kmcount",
      start: 190,
      end: 193,
      trigger: ".home-scroll_text-item.p11p2",
    },
    {
      target: ".coordi-1",
      start: 5068514,
      end: 5002114,
      trigger: ".home-scroll_text-item.p11p2",
    },
    {
      target: ".coordi-2",
      start: 1373387,
      end: 1384115,
      trigger: ".home-scroll_text-item.p11p2",
    },
    {
      target: ".tagecount",
      start: 8,
      end: 9,
      trigger: ".home-scroll_text-item.p12p2",
    },
    {
      target: ".kmcount",
      start: 193,
      end: 197,
      trigger: ".home-scroll_text-item.p12p2",
    },
    {
      target: ".coordi-1",
      start: 5002114,
      end: 5062451,
      trigger: ".home-scroll_text-item.p12p2",
    },
    {
      target: ".coordi-2",
      start: 1384115,
      end: 1383684,
      trigger: ".home-scroll_text-item.p12p2",
    },
    {
      target: ".kmcount",
      start: 197,
      end: 203,
      trigger: ".home-scroll_text-item.p13p2",
    },
    {
      target: ".coordi-1",
      start: 5062451,
      end: 5062672,
      trigger: ".home-scroll_text-item.p13p2",
    },
    {
      target: ".coordi-2",
      start: 1383684,
      end: 1383726,
      trigger: ".home-scroll_text-item.p13p2",
    },
    {
      target: ".kmcount",
      start: 203,
      end: 207,
      trigger: ".home-scroll_text-item.p14p2",
    },
    {
      target: ".coordi-1",
      start: 5062672,
      end: 5061250,
      trigger: ".home-scroll_text-item.p14p2",
    },
    {
      target: ".coordi-2",
      start: 1383726,
      end: 1384946,
      trigger: ".home-scroll_text-item.p14p2",
    },
    {
      target: ".tagecount",
      start: 9,
      end: 10,
      trigger: ".home-scroll_text-item.p15p2",
    },
    {
      target: ".kmcount",
      start: 207,
      end: 222,
      trigger: ".home-scroll_text-item.p15p2",
    },
    {
      target: ".coordi-1",
      start: 5061250,
      end: 5046271,
      trigger: ".home-scroll_text-item.p15p2",
    },
    {
      target: ".coordi-2",
      start: 1384946,
      end: 1400045,
      trigger: ".home-scroll_text-item.p15p2",
    },
    {
      target: ".kmcount",
      start: 222,
      end: 224,
      trigger: ".home-scroll_text-item.p17p2",
    },
    {
      target: ".coordi-1",
      start: 5046271,
      end: 5046181,
      trigger: ".home-scroll_text-item.p17p2",
    },
    {
      target: ".coordi-2",
      start: 1400045,
      end: 1401399,
      trigger: ".home-scroll_text-item.p17p2",
    },
    {
      target: ".kmcount",
      start: 224,
      end: 232,
      trigger: ".home-scroll_text-item.p18p2",
    },
    {
      target: ".coordi-1",
      start: 5046181,
      end: 5045864,
      trigger: ".home-scroll_text-item.p18p2",
    },
    {
      target: ".coordi-2",
      start: 1401399,
      end: 1401254,
      trigger: ".home-scroll_text-item.p18p2",
    },
    {
      target: ".kmcount",
      start: 232,
      end: 241,
      trigger: ".home-scroll_text-item.p19p2",
    },
    {
      target: ".coordi-1",
      start: 5045864,
      end: 5040285,
      trigger: ".home-scroll_text-item.p19p2",
    },
    {
      target: ".coordi-2",
      start: 1401254,
      end: 1412842,
      trigger: ".home-scroll_text-item.p19p2",
    },
    {
      target: ".tagecount",
      start: 10,
      end: 11,
      trigger: ".home-scroll_text-item.p20p2",
    },
    {
      target: ".kmcount",
      start: 241,
      end: 263,
      trigger: ".home-scroll_text-item.p20p2",
    },
    {
      target: ".coordi-1",
      start: 5040285,
      end: 5031263,
      trigger: ".home-scroll_text-item.p20p2",
    },
    {
      target: ".coordi-2",
      start: 1412842,
      end: 1425031,
      trigger: ".home-scroll_text-item.p20p2",
    },
    {
      target: ".tagecount",
      start: 11,
      end: 12,
      trigger: ".home-scroll_text-item.p21p2",
    },
    {
      target: ".kmcount",
      start: 263,
      end: 298,
      trigger: ".home-scroll_text-item.p21p2",
    },
    {
      target: ".coordi-1",
      start: 5031263,
      end: 5012490,
      trigger: ".home-scroll_text-item.p21p2",
    },
    {
      target: ".coordi-2",
      start: 1425031,
      end: 1442658,
      trigger: ".home-scroll_text-item.p21p2",
    },
  ];

  // Loop through the animations and initialize each one
  animations.forEach(({ target, start, end, trigger }) => {
    animateCounter(
      target,
      start,
      end,
      trigger,
      "-50% 95%",
      "center 95%",
      1,
      target.slice(1)
    );
  });
});

// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
//           images
const imageTriggers = [
  ".home-scroll_img-item.p2p2",
  ".home-scroll_img-item.p4p2",
  ".home-scroll_img-item.p5p2",
  ".home-scroll_img-item.p6p2",
  ".home-scroll_img-item.p7p2",
  ".home-scroll_img-item.p9p2",
  ".home-scroll_img-item.p10p2",
  ".home-scroll_img-item.p11p2",
  ".home-scroll_img-item.p12p2",
  ".home-scroll_img-item.p13p2",
  ".home-scroll_img-item.p14p2",
  ".home-scroll_img-item.p15p2",
  ".home-scroll_img-item.p17p2",
  ".home-scroll_img-item.p18p2",
  ".home-scroll_img-item.p19p2",
  ".home-scroll_img-item.p20p2",
];

imageTriggers.forEach((selector) => {
  gsap.to(selector, {
    ease: "none",
    x: -window.innerHeight * 3, // Move left
    scrollTrigger: {
      trigger: selector.replace("img-item", "text-item"), // Replace to get the text item trigger
      start: "top 300%",
      end: "top -300%",
      scrub: 1,
      markers: false, // For debugging
    },
  });
});

gsap.to(".home-scroll_img-item.p21p2", {
  ease: "power1.out",
  x: () => {
    const element = document.querySelector(".home-scroll_img-item.p21p2");
    const elementWidth = element.offsetWidth;
    const centerX = (window.innerWidth - elementWidth) / 2; // Calculate center position
    return centerX;
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p21p2",
    start: "top 250%",
    end: "bottom -50%",
    scrub: 1,
  },
});

// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
//           Pins
function createPinAnimation(
  triggerSelector,
  start,
  end,
  immediateRender = false
) {
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: start,
      end: end,
    },
    scrollTrigger: {
      trigger: triggerSelector,
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: immediateRender,
    },
  });
}

// Create each pin animation by calling the function
createPinAnimation(".home-scroll_text-item.p5p2", 0.07655, 0.07655, true);
createPinAnimation(".home-scroll_text-item.p6p2", 0.0765, 0.0815, false);
createPinAnimation(".home-scroll_text-item.p7p2", 0.0815, 0.0845, false);
createPinAnimation(".home-scroll_text-item.p10p2", 0.0845, 0.086, false);
createPinAnimation(".home-scroll_text-item.p13p2", 0.086, 0.087, false);
createPinAnimation(".home-scroll_text-item.p14p2", 0.087, 0.0885, false);
createPinAnimation(".home-scroll_text-item.p15p2", 0.0885, 0.091, false);
createPinAnimation(".home-scroll_text-item.p17p2", 0.091, 0.0925, false);
createPinAnimation(".home-scroll_text-item.p18p2", 0.0925, 0.095, false);
createPinAnimation(".home-scroll_text-item.p19p2", 0.095, 0.097, false);
createPinAnimation(".home-scroll_text-item.p20p2", 0.097, 0.107, false);
createPinAnimation(".home-scroll_text-item.p21p2", 0.107, 0.128, false);

// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// Select audio and preloader elements
// Select audio and preloader elements
let winterAudio = document.querySelector("#winter");
let audio6 = document.querySelector("#schritte1");

// Function to handle audio playback
function handleAudioPlayback() {
  // Start playing the audio and set initial volume to 0
  winterAudio.play();
  winterAudio.volume = 0; // Ensure the volume starts at 0

  // Fade in the audio
  gsap.to(winterAudio, {
    duration: 2, // Duration of the fade in seconds
    volume: 0.5, // Target volume
    ease: "power1.inOut",
    onComplete: () => {
      winterAudio.volume = 0.5; // Ensure the volume is set to 0.5 at the end
    },
  });
}

// ScrollTrigger for audio6
ScrollTrigger.create({
  trigger: ".wrappermain",
  start: "165% center",
  end: "850% center", // End 90% from the top of the viewport
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress;

    if (progress <= 0.2) {
      // Clamp the value between 0 and 1
      audio6.volume = Math.max(0, Math.min(progress / 0.2, 1));
    } else if (progress > 0.2 && progress < 0.6) {
      audio6.volume = 1; // Full volume
    } else if (progress >= 0.6) {
      // Clamp the value between 0 and 1
      audio6.volume = Math.max(0, Math.min((1 - progress) / 0.2, 1));
    }
  },
  onEnter: () => {
    audio6.play();
  },
  onLeave: () => {
    audio6.pause();
    audio6.volume = 0; // Ensure volume is set to 0 when paused
  },
  onEnterBack: () => {
    audio6.play();
  },
  onLeaveBack: () => {
    audio6.pause();
    audio6.volume = 0; // Ensure volume is set to 0 when paused
  },
});

// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfi

// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
// ifevibiubpfibcdnuiucnipucwnpiudcncpiunifevib
//           Go to new page etc
document
  .getElementById("my-button")
  .addEventListener("click", function (event) {
    // Prevent the default action
    event.preventDefault();

    // Delay the navigation by 1 second (1000 milliseconds)
    setTimeout(function () {
      window.location.href = "https://kernjosh.com/how-to-leave-town-p3";
    }, 2000);
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
window.onload = function () {
  // Ensure the page is scrolled to the top
  window.scrollTo(0, 0);

  // Disable scroll restoration to prevent unwanted scrolling
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // Prevent scrolling
  document.body.style.overflow = "hidden";

  // Set up the event listener for closing the modal
  const closeModalDiv = document.getElementById("firstbbbbb");
  closeModalDiv.onclick = function () {
    document.body.style.overflow = "auto"; // Enable scrolling again
    // Your Webflow interaction should handle closing the modal
  };
};

document.getElementById("firstbbbbb").addEventListener("click", function () {
  // Scroll to a specific percentage of viewport height after 50 milliseconds
  setTimeout(() => {
    const vh = window.innerHeight; // Get the height of the viewport in pixels
    const scrollAmount = vh * 2; // Scroll 4 times the viewport height (change this value as needed)

    window.scrollTo({
      top: scrollAmount,
      behavior: "smooth",
    });
  }, 2100);
});

let iframe21 = document.querySelector("#vimeo-video7");
let player21 = new Vimeo.Player(iframe21);

// Initialize the video to be paused

// ScrollTrigger to control video playback
ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p9p2",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player21.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player21.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player21.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player21.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player21.setMuted(true);
    player21.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player21.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player21.setMuted(true);
    player21.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

let iframe22 = document.querySelector("#vimeo-video8");
let player22 = new Vimeo.Player(iframe22);

// Initialize the video to be paused

// ScrollTrigger to control video playback
ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p13p2",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player22.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player22.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player22.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player22.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player22.setMuted(true);
    player22.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player22.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player22.setMuted(true);
    player22.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

let iframe23 = document.querySelector("#vimeo-video10");
let player23 = new Vimeo.Player(iframe23);

// Initialize the video to be paused

// ScrollTrigger to control video playback
ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p18p2",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player23.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player23.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player23.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player23.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player23.setMuted(true);
    player23.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player23.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player23.setMuted(true);
    player23.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

let iframe24 = document.querySelector("#vimeo-video11");
let player24 = new Vimeo.Player(iframe24);

// Initialize the video to be paused

// ScrollTrigger to control video playback
ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p20p2",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.2) {
      player24.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress < 0.5) {
      player24.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else {
      player24.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player24.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player24.setMuted(true);
    player24.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player24.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player24.setMuted(true);
    player24.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});
let iframe555 = document.querySelector("#vimeo-video12");
let player555 = new Vimeo.Player(iframe555);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p21p2",
  start: "-100% 50%",
  end: "15200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    // Set volume based on progress
    if (progress <= 0.05) {
      // Increase volume from 0 to 1 in the first 5%
      player555.setVolume(progress / 0.05); // 0 to 1
    } else if (progress <= 0.85) {
      // Keep volume at 1 from 5% to 85%
      player555.setVolume(1); // Full volume
    } else {
      // Decrease volume from 1 to 0 from 85% to 100%
      player555.setVolume((1 - progress) / 0.05); // This will drop the volume quickly
    }
  },
  onEnter: () => {
    player555.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player555.setMuted(true); // Mute the video when leaving the trigger area
    player555.setVolume(0); // Ensure the volume is reset to 0
  },
  onEnterBack: () => {
    player555.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player555.setMuted(true); // Mute the video when leaving the trigger area from above
    player555.setVolume(0); // Ensure the volume is reset to 0
  },
});
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
