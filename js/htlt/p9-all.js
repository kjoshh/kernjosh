// Select the button element with class "text-block-29"
document.querySelector(".text-block-29").addEventListener("click", () => {
  // Start with a delay of 250 milliseconds for scrolling
  setTimeout(() => {
    const totalTime = 6000; // Total scroll time in milliseconds
    const intervalTime = 16; // Time for each interval (approx. 60 FPS)
    let currentTime = 0; // Track elapsed time
    const startY = window.scrollY; // Starting position (current scroll position)

    // Scroll function using requestAnimationFrame
    function scrollStep() {
      currentTime += intervalTime;
      const progress = currentTime / totalTime;

      // Exponential ease-out: starts very slow, then accelerates dramatically
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);

      // Calculate the position to scroll to based on the ease-out exponential
      const scrollPosition = startY * (1 - easeOutExpo);

      window.scrollTo(0, scrollPosition); // Scroll to the calculated position

      // Continue scrolling until total time is reached
      if (currentTime < totalTime) {
        requestAnimationFrame(scrollStep);
      }
    }

    // Start the scroll effect
    requestAnimationFrame(scrollStep);
  }, 250); // Initial delay before scroll starts

  // Set a timeout for 4 seconds to redirect to the specified URL after scroll completes
  setTimeout(() => {
    window.location.href = "https://kernjosh.com/desktop";
  }, 3000); // Redirect delay after button click
});

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
  .getElementById("thisbuttonyop9")
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

// Select the button and audio elements
const button = document.getElementById("thisbuttonyop9");
const audio = document.getElementById("winter");

// Set initial volume to 0 (for fade-in effect) and define fade-in duration
audio.volume = 0;
const fadeDuration = 3000; // Duration of fade-in in milliseconds

// Function to start playing and fade in audio
button.addEventListener("click", () => {
  audio.play(); // Start playing the audio

  // Calculate the fade-in increment based on volume steps over time
  const fadeStep = 0.01; // Volume increment per step
  const interval = fadeDuration * fadeStep; // Time per volume increase step

  // Use an interval to gradually increase volume
  const fadeAudio = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(audio.volume + fadeStep, 1); // Increase volume until max
    } else {
      clearInterval(fadeAudio); // Stop fading when volume reaches 1
    }
  }, interval);
});

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
    className: "text-block-29",
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

// ScrollTrigger animations for images
for (let i = 1; i <= 11; i++) {
  gsap.to(`.home-scroll_img-item.p9p${i}`, {
    ease: "none",
    x: -window.innerHeight * 3,
    scrollTrigger: {
      trigger: `.home-scroll_text-item.p9p${i}`,
      start: "top 300%",
      end: "top -300%",
      scrub: 1,
    },
  });
}

// ScrollTrigger animations for images
gsap.to(".home-scroll_img-item.p9p12", {
  ease: "none",
  x: -window.innerWidth * 0,
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p12",
    start: "top 225%",
    end: "top -70%",
    scrub: 1,
  },
});

// Player 3
let iframe90 = document.querySelector("#vimeo-video90");
let player90 = new Vimeo.Player(iframe90);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p9p4",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player90.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player90.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player90.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player90.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player90.setMuted(true);
    player90.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player90.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player90.setMuted(true);
    player90.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe92 = document.querySelector("#vimeo-video92");
let player92 = new Vimeo.Player(iframe92);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p9p9",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player92.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player92.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player92.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player92.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player92.setMuted(true);
    player92.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player92.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player92.setMuted(true);
    player92.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe93 = document.querySelector("#vimeo-video93");
let player93 = new Vimeo.Player(iframe93);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p9p10",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player93.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player93.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player93.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player93.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player93.setMuted(true);
    player93.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player93.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player93.setMuted(true);
    player93.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe94 = document.querySelector("#vimeo-video95");
let player94 = new Vimeo.Player(iframe94);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p9p11",
  start: "-100% 50%",
  end: "5000 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player94.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player94.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player94.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player94.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player94.setMuted(true);
    player94.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player94.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player94.setMuted(true);
    player94.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Audio 6 Schirtte 2
let audio11 = document.querySelector("#schritte1");

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p9p4",
  start: "0% center",
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

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.795,
    end: 0.801,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p1",
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
    start: 0.801,
    end: 0.806,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p2",
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
    start: 0.806,
    end: 0.819,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p3",
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
    start: 0.819,
    end: 0.823,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p4",
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
    start: 0.823,
    end: 0.895,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p5",
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
    start: 0.895,
    end: 0.91,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p6",
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
    start: 0.91,
    end: 0.92,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p7",
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
    start: 0.92,
    end: 0.9625,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p8",
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
    start: 0.9625,
    end: 0.9635,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p9",
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
    start: 0.9635,
    end: 0.97,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p10",
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
    start: 0.97,
    end: 1.0,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p9p11",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // Set initial values for the counters
  document.querySelector(".tagecount").textContent = 51;
  document.querySelector(".kmcount").textContent = 1410;
  document.querySelector(".coordi-1").textContent = 4485635;
  document.querySelector(".coordi-2").textContent = 2130147;

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
    75,
    77,
    ".home-scroll_text-item.p9p1",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2030,
    2050,
    ".home-scroll_text-item.p9p1",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4226020,
    4201347,
    ".home-scroll_text-item.p9p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2459920,
    2500550,
    ".home-scroll_text-item.p9p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    77,
    78,
    ".home-scroll_text-item.p9p2",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2050,
    2109,
    ".home-scroll_text-item.p9p2",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4201347,
    4196834,
    ".home-scroll_text-item.p9p2",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2500550,
    2506180,
    ".home-scroll_text-item.p9p2",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    78,
    78,
    ".home-scroll_text-item.p9p3",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2109,
    2102,
    ".home-scroll_text-item.p9p3",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4196834,
    4191696,
    ".home-scroll_text-item.p9p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2506180,
    2520945,
    ".home-scroll_text-item.p9p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    78,
    78,
    ".home-scroll_text-item.p9p4",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2102,
    2112,
    ".home-scroll_text-item.p9p4",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4191696,
    4192150,
    ".home-scroll_text-item.p9p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2520945,
    2525400,
    ".home-scroll_text-item.p9p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    78,
    85,
    ".home-scroll_text-item.p9p5",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2112,
    2313,
    ".home-scroll_text-item.p9p5",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4192150,
    4150980,
    ".home-scroll_text-item.p9p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2525400,
    2688350,
    ".home-scroll_text-item.p9p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    85,
    86,
    ".home-scroll_text-item.p9p6",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2313,
    2333,
    ".home-scroll_text-item.p9p6",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4150980,
    4126220,
    ".home-scroll_text-item.p9p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2688350,
    2723840,
    ".home-scroll_text-item.p9p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    86,
    86,
    ".home-scroll_text-item.p9p7",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2333,
    2338,
    ".home-scroll_text-item.p9p7",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4126220,
    4126787,
    ".home-scroll_text-item.p9p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2723840,
    2725029,
    ".home-scroll_text-item.p9p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    86,
    88,
    ".home-scroll_text-item.p9p8",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2338,
    2408,
    ".home-scroll_text-item.p9p8",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4126787,
    4107634,
    ".home-scroll_text-item.p9p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2725029,
    2817162,
    ".home-scroll_text-item.p9p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    88,
    88,
    ".home-scroll_text-item.p9p9",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2408,
    2415,
    ".home-scroll_text-item.p9p9",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4107634,
    4108120,
    ".home-scroll_text-item.p9p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2817162,
    2822790,
    ".home-scroll_text-item.p9p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    88,
    89,
    ".home-scroll_text-item.p9p10",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2415,
    2452,
    ".home-scroll_text-item.p9p10",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4108120,
    4105250,
    ".home-scroll_text-item.p9p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2822790,
    2837450,
    ".home-scroll_text-item.p9p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    89,
    90,
    ".home-scroll_text-item.p9p11",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    2452,
    2521,
    ".home-scroll_text-item.p9p11",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4105250,
    4101737,
    ".home-scroll_text-item.p9p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2837450,
    2898656,
    ".home-scroll_text-item.p9p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );
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
  const closeModalDiv = document.getElementById("thisbuttonyop9");
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
