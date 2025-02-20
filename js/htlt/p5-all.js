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

document.getElementById("thisbuttonyo").addEventListener("click", function () {
  // Scroll to a specific percentage of viewport height after 50 milliseconds
  setTimeout(() => {
    const vh = window.innerHeight; // Get the height of the viewport in pixels
    const scrollAmount = vh * 3.4; // Scroll 4 times the viewport height (change this value as needed)

    window.scrollTo({
      top: scrollAmount,
      behavior: "smooth",
    });
  }, 1500);
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
    className: "imageeoifnc",
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

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.461,
    end: 0.4675,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p1",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: true,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.4675,
    end: 0.4685,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p2",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: true,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.4685,
    end: 0.477,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p3",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.477,
    end: 0.489,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p4",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.489,
    end: 0.508,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p5",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.508,
    end: 0.509,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p6",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.509,
    end: 0.513,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p7",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.513,
    end: 0.516,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p8",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.516,
    end: 0.5195,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p9",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.5195,
    end: 0.5245,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p10",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.5245,
    end: 0.5265,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p11",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.5265,
    end: 0.5315,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p12",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.5315,
    end: 0.5585,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p13",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.5585,
    end: 0.56,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p14",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.56,
    end: 0.561,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p15",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.561,
    end: 0.5625,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p16",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.564,
    end: 0.5665,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p17",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

// Animation for the 12th pin segment
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.5665,
    end: 0.5695,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p17",
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
    start: 0.5695,
    end: 0.572,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p18",
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
    start: 0.572,
    end: 0.575,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p5p19",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // Set initial values for the counters
  document.querySelector(".tagecount").textContent = 41;
  document.querySelector(".kmcount").textContent = 1129;
  document.querySelector(".coordi-1").textContent = 4614254;
  document.querySelector(".coordi-2").textContent = 1984536;

  function animateCounter(
    target,
    start,
    end,
    trigger,
    startTrigger,
    endTrigger,
    scrub,
    markerId,
    immediateRender
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
        immediateRender: immediateRender, // Use immediateRender here
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
    41,
    41,
    ".home-scroll_text-item.p5p1",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    true // immediateRender: true for p5p2.dot
  );
  animateCounter(
    ".kmcount",
    1129,
    1145,
    ".home-scroll_text-item.p5p1",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    true // immediateRender: true for p5p2.dot
  );
  animateCounter(
    ".coordi-1",
    4614254,
    4614235,
    ".home-scroll_text-item.p5p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    true // immediateRender: true for p5p2.dot
  );
  animateCounter(
    ".coordi-2",
    1984536,
    1984571,
    ".home-scroll_text-item.p5p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    true // immediateRender: true for p5p2.dot
  );

  animateCounter(
    ".tagecount",
    41,
    42,
    ".home-scroll_text-item.p5p2.dot",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    true // immediateRender: true for p5p2.dot
  );
  animateCounter(
    ".kmcount",
    1145,
    1164,
    ".home-scroll_text-item.p5p2.dot",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    true // immediateRender: true for p5p2.dot
  );
  animateCounter(
    ".coordi-1",
    4614235,
    4613912,
    ".home-scroll_text-item.p5p2.dot",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    true // immediateRender: true for p5p2.dot
  );
  animateCounter(
    ".coordi-2",
    1984571,
    1984847,
    ".home-scroll_text-item.p5p2.dot",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    true // immediateRender: true for p5p2.dot
  );

  animateCounter(
    ".tagecount",
    42,
    43,
    ".home-scroll_text-item.p5p3",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false // immediateRender: true for p5p2.dot
  );
  animateCounter(
    ".kmcount",
    1164,
    1179,
    ".home-scroll_text-item.p5p3",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4613912,
    4601317,
    ".home-scroll_text-item.p5p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    1984847,
    2002504,
    ".home-scroll_text-item.p5p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    43,
    44,
    ".home-scroll_text-item.p5p4",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1179,
    1204,
    ".home-scroll_text-item.p5p4",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4601317,
    4607813,
    ".home-scroll_text-item.p5p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2002504,
    1989342,
    ".home-scroll_text-item.p5p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    44,
    46,
    ".home-scroll_text-item.p5p5",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1204,
    1254,
    ".home-scroll_text-item.p5p5",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4607813,
    4567823,
    ".home-scroll_text-item.p5p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    1989342,
    2019617,
    ".home-scroll_text-item.p5p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    46,
    46,
    ".home-scroll_text-item.p5p6",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1254,
    1259,
    ".home-scroll_text-item.p5p6",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4567823,
    4547518,
    ".home-scroll_text-item.p5p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2019617,
    2041388,
    ".home-scroll_text-item.p5p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    46,
    47,
    ".home-scroll_text-item.p5p7",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1259,
    1285,
    ".home-scroll_text-item.p5p7",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4567823,
    4533304,
    ".home-scroll_text-item.p5p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2019617,
    2050429,
    ".home-scroll_text-item.p5p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    47,
    47,
    ".home-scroll_text-item.p5p8",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1285,
    1290,
    ".home-scroll_text-item.p5p8",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4533304,
    4524903,
    ".home-scroll_text-item.p5p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2050242,
    2059974,
    ".home-scroll_text-item.p5p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    47,
    47,
    ".home-scroll_text-item.p5p9",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1290,
    1295,
    ".home-scroll_text-item.p5p9",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4524903,
    4526973,
    ".home-scroll_text-item.p5p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2059974,
    2056912,
    ".home-scroll_text-item.p5p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    47,
    48,
    ".home-scroll_text-item.p5p10",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1295,
    1318,
    ".home-scroll_text-item.p5p10",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4526973,
    4511585,
    ".home-scroll_text-item.p5p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2056912,
    2074834,
    ".home-scroll_text-item.p5p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    48,
    48,
    ".home-scroll_text-item.p5p11",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1318,
    1331,
    ".home-scroll_text-item.p5p11",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4511585,
    4568683,
    ".home-scroll_text-item.p5p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2074834,
    2086305,
    ".home-scroll_text-item.p5p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    48,
    48,
    ".home-scroll_text-item.p5p12",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1331,
    1345,
    ".home-scroll_text-item.p5p12",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4568683,
    4500486,
    ".home-scroll_text-item.p5p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2086305,
    2093393,
    ".home-scroll_text-item.p5p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    48,
    50,
    ".home-scroll_text-item.p5p13",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1345,
    1385,
    ".home-scroll_text-item.p5p13",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4500486,
    4488438,
    ".home-scroll_text-item.p5p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2093393,
    2117456,
    ".home-scroll_text-item.p5p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    50,
    50,
    ".home-scroll_text-item.p5p14",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1385,
    1395,
    ".home-scroll_text-item.p5p14",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4488438,
    4485353,
    ".home-scroll_text-item.p5p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2117456,
    2124676,
    ".home-scroll_text-item.p5p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    50,
    50,
    ".home-scroll_text-item.p5p15",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1395,
    1398,
    ".home-scroll_text-item.p5p15",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4485353,
    4480873,
    ".home-scroll_text-item.p5p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2124676,
    2133611,
    ".home-scroll_text-item.p5p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    50,
    51,
    ".home-scroll_text-item.p5p16",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1398,
    1405,
    ".home-scroll_text-item.p5p16",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4480873,
    4479512,
    ".home-scroll_text-item.p5p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2133611,
    2135206,
    ".home-scroll_text-item.p5p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    51,
    51,
    ".home-scroll_text-item.p5p17",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1410,
    1416,
    ".home-scroll_text-item.p5p17",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4485635,
    4475089,
    ".home-scroll_text-item.p5p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2130147,
    2139523,
    ".home-scroll_text-item.p5p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".kmcount",
    1416,
    1426,
    ".home-scroll_text-item.p5p18",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4475089,
    4471352,
    ".home-scroll_text-item.p5p18",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2139523,
    2144736,
    ".home-scroll_text-item.p5p18",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".kmcount",
    1426,
    1431,
    ".home-scroll_text-item.p5p19",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4471352,
    4417776,
    ".home-scroll_text-item.p5p19",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2144736,
    2102801,
    ".home-scroll_text-item.p5p19",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );
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
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//newnewnewnewnewnewnewnewnewnewnewnewnew
//Images
// Define the initializePlayer function
function initializePlayer() {
  // Your initialization code for the Vimeo player goes here
  // Example: console.log("Player initialized");
}

// Scroll Animations for images 1 to 19
for (let i = 1; i <= 19; i++) {
  let xValue = i === 19 ? window.innerHeight * 0.1 : -window.innerHeight * 3; // Conditional for last image

  gsap.to(`.home-scroll_img-item.p5p${i}`, {
    ease: "none",
    x: xValue,
    scrollTrigger: {
      trigger: `.home-scroll_text-item.p5p${i}`,
      start: i === 19 ? "top 225%" : "top 300%",
      end: i === 19 ? "top -0%" : "top -300%",
      scrub: 1,
    },
  });
}

// Select the button and audio elements
let winterAudio = document.querySelector("#winter");
let preloader = document.querySelector("#thisbuttonyo");
let myButton = document.getElementById("my-buttonp5"); // Get the button

// Event listener for the preloader click
preloader.addEventListener("click", () => {
  // Start playing the audio and set initial volume to 0
  winterAudio.volume = 0; // Ensure initial volume is 0
  winterAudio.play();

  // Fade in the audio to a maximum of 0.5 volume
  gsap.to(winterAudio, {
    duration: 2, // Duration of the fade-in seconds
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

// Player 3
let iframe40 = document.querySelector("#vimeo-video50");
let player40 = new Vimeo.Player(iframe40);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p5p4",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player40.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player40.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player40.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player40.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player40.setMuted(true);
    player40.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player40.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player40.setMuted(true);
    player40.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Audio 6 Schirtte 2
let audio11 = document.querySelector("#schritte1");

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p5p4",
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

document
  .getElementById("my-buttonp5")
  .addEventListener("click", function (event) {
    // Prevent the default action
    event.preventDefault();

    // Delay the navigation by 1 second (1000 milliseconds)
    setTimeout(function () {
      window.location.href = "https://kernjosh.com/how-to-leave-town-p6";
    }, 2250);
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
  const closeModalDiv = document.getElementById("thisbuttonyo");
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
