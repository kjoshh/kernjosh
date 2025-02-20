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
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function initializePlayer() {
  // Your initialization code for the Vimeo player goes here
  // Example: console.log("Player initialized");
}
// Select the button and audio elements
let winterAudio = document.querySelector("#winter");
let preloader = document.querySelector("#thisbuttonyop8");
let myButton = document.getElementById("my-buttonp8"); // Get the button

// Event listener for the preloader click
preloader.addEventListener("click", () => {
  // Start playing the audio and set initial volume to 0
  winterAudio.play();
  winterAudio.volume = 0;

  // Fade in the audio
  gsap.to(winterAudio, {
    duration: 2, // Duration of the fade in seconds
    volume: 0.5, // Target volume
    ease: "power1.inOut",
    onComplete: () => {
      winterAudio.volume = 0.5; // Ensure the volume is set to 0.5 at the end
    },
  });

  // Initialize the Vimeo player and ScrollTrigger
  initializePlayer();
});

// Add event listener for the button to fade out the audio
myButton.addEventListener("click", () => {
  // Fade out the audio
  gsap.to(winterAudio, {
    duration: 2, // Duration of the fade out
    volume: 0, // Target volume to fade out
    ease: "power1.inOut",
    onComplete: () => {
      winterAudio.pause(); // Pause the audio after fade out
      winterAudio.currentTime = 0; // Optional: reset audio to start
    },
  });
});

// Function to check if the user has scrolled to the bottom
function checkScrollPosition() {
  // Get the total scrollable height and current scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
}

// Add scroll event listener
window.addEventListener("scroll", checkScrollPosition);

document
  .getElementById("thisbuttonyop8")
  .addEventListener("click", function () {
    // Scroll to a specific percentage of viewport height after 50 milliseconds
    setTimeout(() => {
      const vh = window.innerHeight; // Get the height of the viewport in pixels
      const scrollAmount = vh * 3.4; // Scroll 4 times the viewport height (change this value as needed)

      window.scrollTo({
        top: scrollAmount,
        behavior: "smooth",
      });
    }, 1300);
  });

// Add scroll event listener
window.addEventListener("scroll", checkScrollPosition);

// Get the audio elements
const clickAudio = document.getElementById("click-audio");
const hoverAudio = document.getElementById("hover-audio");

// List of link classes and associated audio
const linkClasses = [
  {
    className: "turnaround.linkisound.p5",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "turnaround.linkisound.p5.t",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "turnaround.linkisound.p5.e",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "imageeoifnc.p7.p8",
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
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
// ScrollTrigger animations for images
for (let i = 1; i <= 15; i++) {
  gsap.to(`.home-scroll_img-item.p8p${i}`, {
    ease: "none",
    x: -window.innerHeight * 3,
    scrollTrigger: {
      trigger: `.home-scroll_text-item.p8p${i}`,
      start: "top 300%",
      end: "top -300%",
      scrub: 1,
    },
  });
}
// ScrollTrigger animations for images
gsap.to(".home-scroll_img-item.p8p16", {
  ease: "none",
  x: window.innerWidth * 0.1,
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p16",
    start: "top 225%",
    end: "top -50%",
    scrub: 1,
  },
});

//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//pins
// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.688,
    end: 0.6885,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p1",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: true,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.6885,
    end: 0.689,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p2",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.689,
    end: 0.69,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p5",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.69,
    end: 0.7,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p6",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.7,
    end: 0.7002,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p7",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.7002,
    end: 0.7045,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p8",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.7045,
    end: 0.7125,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p9",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.7125,
    end: 0.724,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p10",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.724,
    end: 0.744,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p11",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.744,
    end: 0.762,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p12",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.762,
    end: 0.765,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p13",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.765,
    end: 0.78,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p14",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.78,
    end: 0.795,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p8p16",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//dates
document.addEventListener("DOMContentLoaded", function () {
  // Set initial values for the counters
  document.querySelector(".tagecount").textContent = 60;
  document.querySelector(".kmcount").textContent = 1739;
  document.querySelector(".coordi-1").textContent = 4320291;
  document.querySelector(".coordi-2").textContent = 2300991;

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

  animateCounter(
    ".tagecount",
    61,
    61,
    ".home-scroll_text-item.p8p1",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1739,
    1741,
    ".home-scroll_text-item.p8p1",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4320291,
    4318583,
    ".home-scroll_text-item.p8p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2300991,
    2303201,
    ".home-scroll_text-item.p8p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    61,
    61,
    ".home-scroll_text-item.p8p2",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1741,
    1745,
    ".home-scroll_text-item.p8p2",
    "-50% 95%",
    "center 30%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4318583,
    4318940,
    ".home-scroll_text-item.p8p2",
    "-50% 95%",
    "center 30%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2303201,
    2302990,
    ".home-scroll_text-item.p8p2",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    61,
    61,
    ".home-scroll_text-item.p8p3",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1745,
    1747,
    ".home-scroll_text-item.p8p3",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4318940,
    4317640,
    ".home-scroll_text-item.p8p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2302990,
    2304800,
    ".home-scroll_text-item.p8p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    61,
    61,
    ".home-scroll_text-item.p8p4",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1747,
    1749,
    ".home-scroll_text-item.p8p4",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4317640,
    4317387,
    ".home-scroll_text-item.p8p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2304800,
    2305220,
    ".home-scroll_text-item.p8p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    61,
    61,
    ".home-scroll_text-item.p8p5",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1749,
    1750,
    ".home-scroll_text-item.p8p5",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4317387,
    4317383,
    ".home-scroll_text-item.p8p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2305220,
    2305231,
    ".home-scroll_text-item.p8p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    61,
    61,
    ".home-scroll_text-item.p8p6",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1750,
    1760,
    ".home-scroll_text-item.p8p6",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4317383,
    4312169,
    ".home-scroll_text-item.p8p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2305231,
    2320523,
    ".home-scroll_text-item.p8p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    61,
    61,
    ".home-scroll_text-item.p8p7",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1760,
    1761,
    ".home-scroll_text-item.p8p7",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4317383,
    4312069,
    ".home-scroll_text-item.p8p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2305231,
    2320423,
    ".home-scroll_text-item.p8p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    61,
    61,
    ".home-scroll_text-item.p8p8",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1761,
    1768,
    ".home-scroll_text-item.p8p8",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4312069,
    4312281,
    ".home-scroll_text-item.p8p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2320423,
    2323342,
    ".home-scroll_text-item.p8p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    61,
    64,
    ".home-scroll_text-item.p8p9",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1768,
    1806,
    ".home-scroll_text-item.p8p9",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4312281,
    4301106,
    ".home-scroll_text-item.p8p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2323342,
    2344205,
    ".home-scroll_text-item.p8p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    64,
    65,
    ".home-scroll_text-item.p8p10",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1806,
    1837,
    ".home-scroll_text-item.p8p10",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4301106,
    4283586,
    ".home-scroll_text-item.p8p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2344205,
    2369712,
    ".home-scroll_text-item.p8p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    65,
    67,
    ".home-scroll_text-item.p8p11",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1837,
    1899,
    ".home-scroll_text-item.p8p11",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4283586,
    4273590,
    ".home-scroll_text-item.p8p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2369712,
    2392870,
    ".home-scroll_text-item.p8p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    67,
    70,
    ".home-scroll_text-item.p8p12",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1899,
    1960,
    ".home-scroll_text-item.p8p12",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4273590,
    4265680,
    ".home-scroll_text-item.p8p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2392870,
    2398800,
    ".home-scroll_text-item.p8p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    70,
    71,
    ".home-scroll_text-item.p8p13",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1960,
    1965,
    ".home-scroll_text-item.p8p13",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4265680,
    4237550,
    ".home-scroll_text-item.p8p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2398800,
    2429880,
    ".home-scroll_text-item.p8p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    71,
    73,
    ".home-scroll_text-item.p8p14",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1965,
    1997,
    ".home-scroll_text-item.p8p14",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4237550,
    4229186,
    ".home-scroll_text-item.p8p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2429880,
    2448343,
    ".home-scroll_text-item.p8p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    73,
    73,
    ".home-scroll_text-item.p8p15",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1997,
    1998,
    ".home-scroll_text-item.p8p15",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4229186,
    4228907,
    ".home-scroll_text-item.p8p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2448343,
    2448945,
    ".home-scroll_text-item.p8p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    73,
    75,
    ".home-scroll_text-item.p8p16",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1998,
    2030,
    ".home-scroll_text-item.p8p16",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4228907,
    4226020,
    ".home-scroll_text-item.p8p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2448945,
    2459920,
    ".home-scroll_text-item.p8p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );
});

// Player 3
let iframe80 = document.querySelector("#vimeo-video80");
let player80 = new Vimeo.Player(iframe80);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p8p2",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player80.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player80.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player80.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player80.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player80.setMuted(true);
    player80.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player80.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player80.setMuted(true);
    player80.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe81 = document.querySelector("#vimeo-video82");
let player81 = new Vimeo.Player(iframe81);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p8p3",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player81.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player81.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player81.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player81.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player81.setMuted(true);
    player81.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player81.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player81.setMuted(true);
    player81.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe82 = document.querySelector("#vimeo-video83");
let player82 = new Vimeo.Player(iframe82);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p8p9",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player82.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player82.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player82.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player82.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player82.setMuted(true);
    player82.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player82.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player82.setMuted(true);
    player82.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe83 = document.querySelector("#vimeo-video84");
let player83 = new Vimeo.Player(iframe83);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p8p11",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player83.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player83.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player83.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player83.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player83.setMuted(true);
    player83.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player83.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player83.setMuted(true);
    player83.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe84 = document.querySelector("#vimeo-video85");
let player84 = new Vimeo.Player(iframe84);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p8p12",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player84.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player84.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player84.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player84.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player84.setMuted(true);
    player84.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player84.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player84.setMuted(true);
    player84.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe85 = document.querySelector("#vimeo-video86");
let player85 = new Vimeo.Player(iframe85);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p8p13",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player85.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player85.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player85.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player85.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player85.setMuted(true);
    player85.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player85.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player85.setMuted(true);
    player85.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

document
  .getElementById("my-buttonp8")
  .addEventListener("click", function (event) {
    // Prevent the default action
    event.preventDefault();

    // Delay the navigation by 1 second (1000 milliseconds)
    setTimeout(function () {
      window.location.href = "https://kernjosh.com/how-to-leave-town-p9";
    }, 2700);
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

//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
//newnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnwnewnw
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
  const closeModalDiv = document.getElementById("thisbuttonyop8");
  closeModalDiv.onclick = function () {
    document.body.style.overflow = "auto"; // Enable scrolling again
    // Your Webflow interaction should handle closing the modal
  };
};
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