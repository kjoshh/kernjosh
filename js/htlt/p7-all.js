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
let preloader = document.querySelector("#thisbuttonyop7");
let myButton = document.getElementById("my-buttonp7"); // Get the button

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
//images
// ScrollTrigger animations for images
for (let i = 1; i <= 16; i++) {
  gsap.to(`.home-scroll_img-item.p7p${i}`, {
    ease: "none",
    x: -window.innerHeight * 3,
    scrollTrigger: {
      trigger: `.home-scroll_text-item.p7p${i}`,
      start: "top 300%",
      end: "top -300%",
      scrub: 1,
    },
  });
}

// ScrollTrigger animations for images
gsap.to(".home-scroll_img-item.p7p17", {
  ease: "none",
  x: window.innerWidth * 0.1,
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p17",
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
//Button audios
function checkScrollPosition() {
  // Get the total scrollable height and current scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
}

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
    className: "imageeoifnc.p7",
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
//scroll down
document
  .getElementById("thisbuttonyop7")
  .addEventListener("click", function () {
    // Scroll to a specific percentage of viewport height after 50 milliseconds
    setTimeout(() => {
      const vh = window.innerHeight; // Get the height of the viewport in pixels
      const scrollAmount = vh * 3.45; // Scroll 4 times the viewport height (change this value as needed)

      window.scrollTo({
        top: scrollAmount,
        behavior: "smooth",
      });
    }, 1500);
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
//Scroll Audios

// Player 3
let iframe70 = document.querySelector("#vimeo-video70");
let player70 = new Vimeo.Player(iframe70);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p7p3",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player70.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player70.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player70.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player70.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player70.setMuted(true);
    player70.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player70.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player70.setMuted(true);
    player70.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe71 = document.querySelector("#vimeo-video71");
let player71 = new Vimeo.Player(iframe71);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p7p6",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player71.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player71.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player71.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player71.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player71.setMuted(true);
    player71.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player71.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player71.setMuted(true);
    player71.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe72 = document.querySelector("#vimeo-video72");
let player72 = new Vimeo.Player(iframe72);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p7p12",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player72.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player72.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player72.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player72.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player72.setMuted(true);
    player72.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player72.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player72.setMuted(true);
    player72.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe73 = document.querySelector("#vimeo-video73");
let player73 = new Vimeo.Player(iframe73);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p7p14",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player73.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player73.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player73.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player73.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player73.setMuted(true);
    player73.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player73.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player73.setMuted(true);
    player73.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe74 = document.querySelector("#vimeo-video74");
let player74 = new Vimeo.Player(iframe74);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p7p15",
  start: "-100% 50%",
  end: "1200 50%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player74.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player74.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player74.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player74.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player74.setMuted(true);
    player74.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player74.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player74.setMuted(true);
    player74.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
  },
});

// Player 3
let iframe75 = document.querySelector("#vimeo-video75");
let player75 = new Vimeo.Player(iframe75);

ScrollTrigger.create({
  trigger: ".home-scroll_text-item.p7p16",
  start: "-100% 100%",
  end: "1200 0%",
  scrub: 1,
  onUpdate: (self) => {
    let progress = self.progress; // Get the scroll progress from 0 to 1

    if (progress <= 0.2) {
      player75.setVolume(progress / 0.2); // Increase volume from 0 to 100% in the first 20%
    } else if (progress > 0.2 && progress < 0.5) {
      player75.setVolume(1); // Keep volume at 100% from 20% to 80%
    } else if (progress >= 0.5) {
      player75.setVolume((1 - progress) / 0.5); // Decrease volume from 100% to 0% from 80% to 100%
    }
  },
  onEnter: () => {
    player75.setMuted(false); // Unmute the video when entering the trigger area
  },
  onLeave: () => {
    player75.setMuted(true);
    player75.setVolume(0); // Mute and reset the volume when leaving the trigger area
  },
  onEnterBack: () => {
    player75.setMuted(false); // Unmute the video when re-entering the trigger area from below
  },
  onLeaveBack: () => {
    player75.setMuted(true);
    player75.setVolume(0); // Mute and reset the volume when leaving the trigger area from above
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
  document.querySelector(".tagecount").textContent = 56;
  document.querySelector(".kmcount").textContent = 1594;
  document.querySelector(".coordi-1").textContent = 4319833;
  document.querySelector(".coordi-2").textContent = 2301539;

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
    56,
    56,
    ".home-scroll_text-item.p7p1",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1594,
    1601,
    ".home-scroll_text-item.p7p1",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4319833,
    4375191,
    ".home-scroll_text-item.p7p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2301539,
    2248961,
    ".home-scroll_text-item.p7p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    56,
    56,
    ".home-scroll_text-item.p7p2",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1601,
    1605,
    ".home-scroll_text-item.p7p2",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4375191,
    4376646,
    ".home-scroll_text-item.p7p2",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2248961,
    2246492,
    ".home-scroll_text-item.p7p2",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    56,
    57,
    ".home-scroll_text-item.p7p3",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1605,
    1636,
    ".home-scroll_text-item.p7p3",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4376646,
    4372741,
    ".home-scroll_text-item.p7p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2246492,
    2251161,
    ".home-scroll_text-item.p7p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    57,
    58,
    ".home-scroll_text-item.p7p4",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1636,
    1655,
    ".home-scroll_text-item.p7p4",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4372741,
    4362009,
    ".home-scroll_text-item.p7p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2251161,
    2267919,
    ".home-scroll_text-item.p7p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    58,
    58,
    ".home-scroll_text-item.p7p5",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1655,
    1665,
    ".home-scroll_text-item.p7p5",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4362009,
    4353820,
    ".home-scroll_text-item.p7p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2267919,
    2278590,
    ".home-scroll_text-item.p7p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    58,
    58,
    ".home-scroll_text-item.p7p6",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1665,
    1674,
    ".home-scroll_text-item.p7p6",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4353820,
    4348011,
    ".home-scroll_text-item.p7p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2278590,
    2282971,
    ".home-scroll_text-item.p7p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    58,
    59,
    ".home-scroll_text-item.p7p7",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1674,
    1683,
    ".home-scroll_text-item.p7p7",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4348011,
    4344829,
    ".home-scroll_text-item.p7p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2282971,
    2291564,
    ".home-scroll_text-item.p7p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    59,
    59,
    ".home-scroll_text-item.p7p9",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1683,
    1693,
    ".home-scroll_text-item.p7p9",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4344829,
    4342829,
    ".home-scroll_text-item.p7p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2291564,
    2300119,
    ".home-scroll_text-item.p7p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    59,
    59,
    ".home-scroll_text-item.p7p10",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1693,
    1701,
    ".home-scroll_text-item.p7p10",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4342829,
    4337391,
    ".home-scroll_text-item.p7p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2300119,
    2307812,
    ".home-scroll_text-item.p7p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    59,
    60,
    ".home-scroll_text-item.p7p11",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1701,
    1729,
    ".home-scroll_text-item.p7p11",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4337391,
    4323421,
    ".home-scroll_text-item.p7p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2307812,
    2304327,
    ".home-scroll_text-item.p7p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    60,
    60,
    ".home-scroll_text-item.p7p12",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1729,
    1731,
    ".home-scroll_text-item.p7p12",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4323421,
    4323041,
    ".home-scroll_text-item.p7p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2304327,
    2302991,
    ".home-scroll_text-item.p7p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    60,
    60,
    ".home-scroll_text-item.p7p13",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1731,
    1733,
    ".home-scroll_text-item.p7p13",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4323041,
    4321532,
    ".home-scroll_text-item.p7p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2302991,
    2302295,
    ".home-scroll_text-item.p7p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    60,
    60,
    ".home-scroll_text-item.p7p14",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1733,
    1735,
    ".home-scroll_text-item.p7p14",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4321532,
    4320771,
    ".home-scroll_text-item.p7p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2302295,
    2301721,
    ".home-scroll_text-item.p7p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    60,
    60,
    ".home-scroll_text-item.p7p15",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1735,
    1736,
    ".home-scroll_text-item.p7p15",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4320771,
    4320421,
    ".home-scroll_text-item.p7p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2301721,
    2301491,
    ".home-scroll_text-item.p7p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    60,
    60,
    ".home-scroll_text-item.p7p16",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1736,
    1739,
    ".home-scroll_text-item.p7p16",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4320421,
    4320231,
    ".home-scroll_text-item.p7p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2301491,
    2301121,
    ".home-scroll_text-item.p7p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".tagecount",
    60,
    60,
    ".home-scroll_text-item.p7p17",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1739,
    1739,
    ".home-scroll_text-item.p7p17",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4320231,
    4320291,
    ".home-scroll_text-item.p7p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2301121,
    2300991,
    ".home-scroll_text-item.p7p17",
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
//pins
gsap.to(".newpinleipzig", {
  motionPath: {
    path: "#wegpfadid",
    align: "#wegpfadid",
    alignOrigin: [0.5, 0.98],
    start: 0.6365,
    end: 0.6375,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p1",
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
    start: 0.6375,
    end: 0.6475,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p3",
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
    start: 0.6475,
    end: 0.6515,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p4",
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
    start: 0.6515,
    end: 0.6665,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p5",
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
    start: 0.6665,
    end: 0.6685,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p6",
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
    start: 0.6685,
    end: 0.6711,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p7",
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
    start: 0.6711,
    end: 0.6751,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p9",
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
    start: 0.6751,
    end: 0.684,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p10",
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
    start: 0.684,
    end: 0.686,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p11",
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
    start: 0.686,
    end: 0.6862,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p12",
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
    start: 0.6862,
    end: 0.6866,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p14",
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
    start: 0.6866,
    end: 0.687,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p15",
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
    start: 0.687,
    end: 0.6872,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p16",
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
    start: 0.6875,
    end: 0.688,
  },
  scrollTrigger: {
    trigger: ".home-scroll_text-item.p7p17",
    start: "-50% 95%",
    end: "center 95%",
    scrub: true,
    immediateRender: false,
  },
});

document
  .getElementById("my-buttonp7")
  .addEventListener("click", function (event) {
    // Prevent the default action
    event.preventDefault();

    // Delay the navigation by 1 second (1000 milliseconds)
    setTimeout(function () {
      window.location.href = "https://kernjosh.com/how-to-leave-town-p8";
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
  const closeModalDiv = document.getElementById("thisbuttonyop7");
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
