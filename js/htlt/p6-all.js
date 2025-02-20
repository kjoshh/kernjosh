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

// Function to add and remove overflow hidden on body
function toggleOverflowDuringAnimation() {
  document.body.style.overflow = "hidden"; // Add overflow: hidden

  // Remove overflow after the animation duration
  setTimeout(() => {
    document.body.style.overflow = ""; // Remove overflow: hidden
  }, duration);
}

// Add delay before starting the animation
setTimeout(() => {
  toggleOverflowDuringAnimation(); // Start overflow toggle
  animateCountUp(
    document.getElementById("countyo"),
    targetValue,
    duration,
    cubicBezier
  ); // Start animation
}, delay);

window.onload = function () {
  // Ensure the page is scrolled to the top
  window.scrollTo(0, 0);

  // Disable scroll restoration to prevent unwanted scrolling
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
};
// Scroll functionality for playRemaining button
document.getElementById("playRemaining").addEventListener("click", function () {
  setTimeout(() => {
    const vh = window.innerHeight;
    const scrollAmount = vh * 10.7; // Adjust as needed

    window.scrollTo({
      top: scrollAmount,
      behavior: "smooth",
    });
  }, 2500);
});

// Check scroll position for fade-out and redirect
function checkScrollPosition() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
}

// Add scroll event listener
window.addEventListener("scroll", checkScrollPosition);

// Audio elements and event listeners
const clickAudio = document.getElementById("click-audio");
const hoverAudio = document.getElementById("hover-audio");

const linkClasses = [
  {
    className: "text-block-10.a",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "text-block-10.t",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: "imageeoifnc",
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
];

linkClasses.forEach((linkInfo) => {
  const link = document.querySelector(`.${linkInfo.className}`);
  if (link) {
    if (linkInfo.clickAudio) {
      link.addEventListener("click", () => linkInfo.clickAudio.play());
    }
    if (linkInfo.hoverAudio) {
      link.addEventListener("mouseover", () => {
        if (linkInfo.hoverAudio.paused) linkInfo.hoverAudio.play();
      });
      link.addEventListener("mouseleave", () => {
        linkInfo.hoverAudio.pause();
        linkInfo.hoverAudio.currentTime = 0;
      });
    }
  }
});

console.clear();

function initializePlayer() {
  // Your initialization code for the Vimeo player goes here
  // Example: console.log("Player initialized");
}
// Select the button and audio elements
let winterAudio = document.querySelector("#winter");
let preloader = document.querySelector("#playRemaining");
let myButton = document.getElementById("my-buttonp6"); // Get the button

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

// Video and ScrollTrigger setup
const video = document.querySelector(".video-background");
const playRemainingButton = document.getElementById("playRemaining");
let maxVideoTime = 0;
let scrollTriggerInstance; // To hold the ScrollTrigger instance

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

video.addEventListener("loadedmetadata", () => {
  maxVideoTime = video.duration * 0.66; // Calculate 66% of the video duration

  // Create a timeline for ScrollTrigger
  scrollTriggerInstance = gsap.timeline({
    scrollTrigger: {
      trigger: "#container", // Element that triggers the ScrollTrigger
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const scrollPercentage = self.progress * 100; // Get scroll percentage

        // If scrolled to or beyond 66% of the video
        if (scrollPercentage >= 66) {
          // Lock scrolling by setting overflow to hidden
          if (document.body.style.overflow !== "hidden") {
            // Check to prevent redundancy
            document.body.style.overflow = "hidden";
          }

          // Ensure video is at maxVideoTime and paused
          if (video.currentTime < maxVideoTime) {
            video.currentTime = maxVideoTime;
          }
          video.pause();

          // Check if scrollTriggerInstance is defined before disabling
          if (scrollTriggerInstance) {
            scrollTriggerInstance.scrollTrigger.disable(); // Disable ScrollTrigger to stop further updates
          }
        } else {
          // Update video time based on scroll progress
          video.currentTime = video.duration * self.progress;
        }
      },
    },
  });
});

// Event listener for the playRemaining button to resume the video
playRemainingButton.addEventListener("click", () => {
  // Unlock scrolling by setting overflow to auto
  document.body.style.overflow = "auto";

  video.currentTime = maxVideoTime; // Set video time to maxVideoTime
  video.play(); // Play the video

  // Reactivate scrolling behavior
  ScrollTrigger.refresh(); // Refresh ScrollTrigger to recognize new overflow state
});

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.572,
    end: 0.575,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p4",
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
    start: 0.575,
    end: 0.582,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p5",
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
    start: 0.582,
    end: 0.598,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p6",
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
    start: 0.598,
    end: 0.607,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p7",
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
    start: 0.607,
    end: 0.6085,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p8",
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
    start: 0.6085,
    end: 0.611,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p9",
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
    start: 0.611,
    end: 0.6125,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p10",
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
    start: 0.6125,
    end: 0.614,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p11",
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
    start: 0.614,
    end: 0.6225,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p12",
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
    start: 0.6225,
    end: 0.6245,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p13",
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
    start: 0.6245,
    end: 0.6255,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p14",
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
    start: 0.6255,
    end: 0.6305,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p15",
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
    start: 0.6305,
    end: 0.6345,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p16",
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
    start: 0.6345,
    end: 0.6355,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p17",
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
    start: 0.6355,
    end: 0.6365,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p18",
    start: "-50% 95%",
    end: "center -175%",
    scrub: true,
    immediateRender: false,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // Set initial values for the counters
  document.querySelector(".tagecount").textContent = 51;
  document.querySelector(".kmcount").textContent = 1431;
  document.querySelector(".coordi-1").textContent = 4417776;
  document.querySelector(".coordi-2").textContent = 2151041;

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
    51,
    51,
    ".home-scroll_text-item.p6p4",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1431,
    1435,
    ".home-scroll_text-item.p6p4",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4417776,
    4462992,
    ".home-scroll_text-item.p6p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2102801,
    2151042,
    ".home-scroll_text-item.p6p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    51,
    52,
    ".home-scroll_text-item.p6p5",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1435,
    1438,
    ".home-scroll_text-item.p6p5",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4462991,
    4452059,
    ".home-scroll_text-item.p6p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2151041,
    2160557,
    ".home-scroll_text-item.p6p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    52,
    53,
    ".home-scroll_text-item.p6p6",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1438,
    1488,
    ".home-scroll_text-item.p6p6",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4452059,
    4431186,
    ".home-scroll_text-item.p6p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2160557,
    2177248,
    ".home-scroll_text-item.p6p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    53,
    53,
    ".home-scroll_text-item.p6p7",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1488,
    1503,
    ".home-scroll_text-item.p6p7",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4431186,
    4423596,
    ".home-scroll_text-item.p6p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2177248,
    2186418,
    ".home-scroll_text-item.p6p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    53,
    54,
    ".home-scroll_text-item.p6p8",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1503,
    1518,
    ".home-scroll_text-item.p6p8",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4423596,
    4422262,
    ".home-scroll_text-item.p6p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2186418,
    2195223,
    ".home-scroll_text-item.p6p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    54,
    54,
    ".home-scroll_text-item.p6p9",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1518,
    1523,
    ".home-scroll_text-item.p6p9",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4422262,
    4417772,
    ".home-scroll_text-item.p6p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2195223,
    2202808,
    ".home-scroll_text-item.p6p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    54,
    54,
    ".home-scroll_text-item.p6p10",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1523,
    1528,
    ".home-scroll_text-item.p6p10",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4417772,
    4414740,
    ".home-scroll_text-item.p6p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2202808,
    2203566,
    ".home-scroll_text-item.p6p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    54,
    54,
    ".home-scroll_text-item.p6p11",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1528,
    1534,
    ".home-scroll_text-item.p6p11",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4414740,
    4414055,
    ".home-scroll_text-item.p6p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2203566,
    2206165,
    ".home-scroll_text-item.p6p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    54,
    54,
    ".home-scroll_text-item.p6p12",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1534,
    1545,
    ".home-scroll_text-item.p6p12",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4414055,
    4409089,
    ".home-scroll_text-item.p6p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2206165,
    2209011,
    ".home-scroll_text-item.p6p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    54,
    55,
    ".home-scroll_text-item.p6p13",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1545,
    1553,
    ".home-scroll_text-item.p6p13",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4409089,
    4398062,
    ".home-scroll_text-item.p6p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2209011,
    2216546,
    ".home-scroll_text-item.p6p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    55,
    55,
    ".home-scroll_text-item.p6p14",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1553,
    1555,
    ".home-scroll_text-item.p6p14",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4398062,
    4397161,
    ".home-scroll_text-item.p6p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2216546,
    2215832,
    ".home-scroll_text-item.p6p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    55,
    55,
    ".home-scroll_text-item.p6p15",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1555,
    1563,
    ".home-scroll_text-item.p6p15",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4397161,
    4389126,
    ".home-scroll_text-item.p6p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2215832,
    2219894,
    ".home-scroll_text-item.p6p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    55,
    55,
    ".home-scroll_text-item.p6p16",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1563,
    1565,
    ".home-scroll_text-item.p6p16",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4389126,
    4386051,
    ".home-scroll_text-item.p6p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2219894,
    2233041,
    ".home-scroll_text-item.p6p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    55,
    56,
    ".home-scroll_text-item.p6p17",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1565,
    1573,
    ".home-scroll_text-item.p6p17",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4386051,
    4388015,
    ".home-scroll_text-item.p6p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2233041,
    2231544,
    ".home-scroll_text-item.p6p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    56,
    56,
    ".home-scroll_text-item.p6p18",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1573,
    1594,
    ".home-scroll_text-item.p6p18",
    "-50% 95%",
    "center -175%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4388015,
    4319833,
    ".home-scroll_text-item.p6p18",
    "-50% 95%",
    "center -175%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2231544,
    2301539,
    ".home-scroll_text-item.p6p18",
    "-50% 95%",
    "center -175%",
    1,
    "coordi-2"
  );
});

// ScrollTrigger animations for images
for (let i = 5; i <= 17; i++) {
  gsap.to(`.home-scroll_img-item.p6p${i}`, {
    ease: "none",
    x: -window.innerHeight * 3,
    scrollTrigger: {
      trigger: `.home-scroll_text-item.p6p${i}`,
      start: "top 300%",
      end: "top -300%",
      scrub: 1,
    },
  });
}

// ScrollTrigger animations for images
gsap.to(".home-scroll_img-item.p6p18", {
  ease: "none",
  x: -window.innerWidth * 0,
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p6p18",
    start: "top 225%",
    end: "bottom 50%",
    scrub: 1,
  },
});

// Audio 6 Schirtte 2
let audio11 = document.querySelector("#schritte1");

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p6p9",
  start: "20% center",
  end: "bottom -3100%", // End 90% from the top of the viewport
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress;

    if (progress <= 0.05) {
      audio11.volume = progress / 0.05;
    } else if (progress > 0.05 && progress < 0.85) {
      audio11.volume = 1;
    } else if (progress >= 0.85) {
      audio11.volume = (1 - progress) / 0.1;
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

// Player 3
let iframe61 = document.querySelector("#vimeo-video61");
let player61 = new Vimeo.Player(iframe61);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p6p8",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player61.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player61.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player61.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player61.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player61.setMuted(true);
    player61.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player61.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player61.setMuted(true);
    player61.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe62 = document.querySelector("#vimeo-video62");
let player62 = new Vimeo.Player(iframe62);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p6p9",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player62.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player62.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player62.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player62.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player62.setMuted(true);
    player62.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player62.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player62.setMuted(true);
    player62.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe63 = document.querySelector("#vimeo-video63");
let player63 = new Vimeo.Player(iframe63);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p6p16",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player63.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player63.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player63.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player63.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player63.setMuted(true);
    player63.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player63.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player63.setMuted(true);
    player63.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

document
  .getElementById("my-buttonp6")
  .addEventListener("click", function (event) {
    // Prevent the default action
    event.preventDefault();

    // Delay the navigation by 1 second (1000 milliseconds)
    setTimeout(function () {
      window.location.href = "https://kernjosh.com/how-to-leave-town-p7";
    }, 1750);
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
// Select the element with the ID 'refreshText'
const refreshText = document.getElementById("refreshText");

// Add click event listener
refreshText.addEventListener("click", () => {
  location.reload(); // Refresh the page
});
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
