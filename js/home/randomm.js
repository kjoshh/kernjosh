// v30 js/random.js

// Initialize global terminalActive variable
if (typeof window.terminalActive === "undefined") {
  window.terminalActive = false; // Default to inactive
}

let terminalInitialized = false; // Prevent multiple initializations
let inputListenerAdded = false; // Track listener status

// Get DOM elements
const activateButton = document.getElementById("activate-terminal");
const terminal = document.getElementById("terminal");
const inputField = document.getElementById("command-input");
const outputDiv = document.getElementById("output");
const inputLine = document.getElementById("input-line");
const cursor = document.getElementById("cursor");

const errortext = document.getElementById("errortext");
const textBlock = document.getElementById("text-block");
const noiseLayer = document.getElementById("noise-layer");
const secondInter = document.getElementById("secondinterda");
const typingEffect = document.getElementById("typing-effect");

// Ensure the terminal is hidden by default
terminal.style.display = "none";
outputDiv.style.opacity = "0";
inputLine.style.opacity = "0";

outputDiv.style.overflowY = "auto";
outputDiv.style.pointerEvents = "auto";
outputDiv.style.maxHeight = "calc(100% - 12px)";

// Helper function to scroll to the bottom
function scrollToBottom() {
  // Use requestAnimationFrame to ensure scrolling happens after rendering
  requestAnimationFrame(() => {
    outputDiv.scrollTop = outputDiv.scrollHeight;
  });
}

// Function to sanitize user input to prevent XSS attacks
function sanitizeHTML(str) {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}

// Function to append user input to the outputDiv
function appendUserInput(inputText) {
  if (!window.terminalActive) return;
  const userLine = document.createElement("div");
  const sanitizedText = sanitizeHTML(inputText);

  userLine.innerHTML = `<span class="prompt">visitor@kernjosh.com:~$ </span>${sanitizeHTML(
    inputText
  )}`;
  outputDiv.appendChild(userLine);
  scrollToBottom();
}

// Function to append output with typing effect
function appendOutputWithTyping(text, callback) {
  if (!window.terminalActive) return; // Prevent execution if terminal is inactive
  const newLine = document.createElement("div");
  newLine.textContent = "";
  outputDiv.appendChild(newLine);
  scrollToBottom();
  typeText(newLine, text, callback);
}

// Function to type text character by character
function typeText(element, text, callback) {
  let index = 0;
  const typingSpeed = 1;

  const interval = setInterval(() => {
    if (!window.terminalActive) {
      clearInterval(interval);
      return;
    }

    if (index < text.length) {
      element.textContent += sanitizeHTML(text[index]);
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, typingSpeed);
}

function handleCommand(command) {
  console.log("Handling command: ", command); // Add this line
  if (!window.terminalActive) return;

  if (command.trim() === "exit") {
    stopTerminal();
    return;
  }
  if (commands[command]) {
    if (typeof commands[command] === "function") {
      // Pass outputDiv and inputField to the inspect command
      commands[command](outputDiv, inputField);
    } else {
      appendOutputWithTyping(commands[command], null);
    }
  } else {
    appendOutputWithTyping(`Unknown command: ${command}`, null);
  }
}
// Function to calculate uptime
function getUptime() {
  const startTime = new Date("2025-02-09T15:00:00+01:00");
  const now = new Date();

  let difference = now.getTime() - startTime.getTime();

  if (difference < 0) {
    return "Not yet started"; // Or handle the case as needed
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return `${days} Days, ${hours} Hours`;
}

const commands = {
  inspect: () => {
    const uptime = getUptime();
    const inspectText = `– Url: www.kernjosh.com\n– Version: 1.3\n- Uptime: ${uptime}\n- Framework: HTML, CSS, JavaScript, GSAP, ScrollTrigger, MotionPath, Three.js`;
    appendOutputWithTyping(inspectText, null);
  },
  whois:
    "Josh Kern:\n– Amateur photographer\n– Professional dogwalker\nType any of the words above to find out more.",

  copyright:
    "Copyrights are for little boy businessmen. Share it. Copy it. Paste it. Cut it. Destroy it. Remake it… and credit me.\n– Gravestones/Church Signs by Moose Lane. 2016ish and No Apology #1 by Heidi. Early 1990s",
  contact:
    "Mail: hi(at)kernjosh.com \nPhone: 00 49 176 70917543... only for assignments or stuff like that. please use my email to say hello. thank youuu",
  josh: "Actually, Joshua. I think my parents named me after the U2 album 'The Joshua Tree'.",
  kern: "Translates to 'core'.",
  amateur:
    "- the enthusiast who pursues her work in the spirit of love, regardless of the potential for fame, money or career.\n- are regular people who get obsessed by something and spend a ton of time thinking out loud about it.",
  professional:
    "The dedicated expert who approaches their work with consistent skill, discipline, and a commitment to quality, often in pursuit of a career.",
  photographer: "Someone who likes to take pictures?",
  dogwalker: "https://www.dogwalkerkoeln.com",
  hi: "Hello visitor :)",
  hello: "Helloi visitor :)",
  hey: "Hello visitor :)",
  film: "Kodak Gold 200",
  camera: "I mostly use a Nikon FM or Olympus XA.",
  inspira: "Type: books, photobooks or films",
  friends:
    "– Asli Oezcelik\n– Jule Wild\n– Ülgen Atakman\n– Max Knoll\n– Fotobus Society",
  help: "Some available commands(6/24):\n- whois\n- whoami\n– contact\n- copyright\n- desktop\n- inspect",
  morecommands: "– friends\n– inspira\n– camera\n– film",
  books:
    "– Eigensinn Macht Spaß by Hermann Hesse\n– Steal Like An Artist by Austion Kleon\n– Big Magic by Elizabeth Gilbert",
  photobooks:
    "– Winterreise by Luc Delahaye\n– Looking for love on the left bank by Ed Van Der Elsken\n– Wires Crossed by Ed Templeton",
  films: "– Beautiful Losers by Aaron Rose",
  desktop: () => {
    appendOutputWithTyping(`...`);
    setTimeout(() => {
      window.location = "https://kernjosh.com/desktop";
    }, 1000);
  },

  whoami: () => {
    const browser = getBrowserName();
    const language = navigator.language;
    const platform = navigator.platform;
    const resolution = `${window.screen.width}×${window.screen.height}`;

    // Fetch IP address using an external API
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const ip = data.ip;
        appendOutputWithTyping(
          `– Name: visitor\n– Browser: ${browser}\n– Language: ${language}\n– Platform: ${platform}\n– Resolution: ${resolution}\n– IP Address: ${ip}`,
          null
        );
      })
      .catch((error) => {
        console.error("Failed to fetch IP address:", error);
        appendOutputWithTyping(
          `[IP Address: Unknown (Error)]\n[Browser: ${browser}]\n[Platform: ${platform}]\n[Resolution: ${resolution}]`,
          null
        );
      });
  },

  clear: () => {
    outputDiv.innerHTML = ""; // Clear terminal output
    scrollToBottom(); // Scroll to top after clearing
  },
};

// Function to get browser name
function getBrowserName() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    return "Chrome";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  } else if (userAgent.includes("Firefox")) {
    return "Firefox";
  } else if (userAgent.includes("Edg")) {
    return "Microsoft Edge";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera";
  }
  return "Unknown Browser";
}

// Function to initialize the terminal
function initializeTerminalScript() {
  window.terminalActive = true; // Activate the terminal
  terminalInitialized = true; // Mark terminal as initialized

  // Add event listener only once
  if (!inputListenerAdded) {
    inputListenerAdded = true; // Mark listener as added
  }

  flickerNoise(); // Start noise animation

  // Add a delay before initializing terminal content

  const promptText = "visitor@kernjosh.com:~$ ";

  const hiddenMeasure = document.createElement("span");
  hiddenMeasure.id = "hidden-measure";
  document.body.appendChild(hiddenMeasure);

  terminal.style.display = "block"; // Show terminal when active
  const banner = ""; // You can set a banner text if needed

  // Initialize terminal output

  appendOutputWithTyping(banner, () => {
    const initialMessage =
      "\nLast login by kernjosh.com: 10th Feb 2025, 14:53 CET\n\n**********************************************************\n*****  Type 'help' for a list of available commands  *****\n*****  Type 'exit' to return to the previous screen  *****\n**********************************************************\n\n";
    appendOutputWithTyping(initialMessage, () => {
      inputField.focus(); // Focus the input field
      updateCursorPosition();
      startLetterGlitch(); // Start glitch animation on letters
    });
  });
}

// Function to update cursor position based on input
function updateCursorPosition() {
  if (!window.terminalActive) return; // Prevent execution if terminal is inactive
  const caretPosition = inputField.selectionStart || 0;
  const inputValue = inputField.value;

  // Update hidden measure for cursor positioning
  const hiddenMeasure = document.getElementById("hidden-measure");
  hiddenMeasure.textContent = inputValue.substring(0, caretPosition);
  const textWidth = hiddenMeasure.offsetWidth;

  // Position the cursor
  cursor.style.left = `${textWidth + inputField.offsetLeft + 3}px`;
}

// Event listener for user input
inputField.addEventListener("keyup", (event) => {
  if (!window.terminalActive) return; // Prevent execution if terminal is inactive
  if (event.key === "Enter") {
    const userInput = inputField.value.trim(); // Get user input
    if (userInput === "") return; // Ignore empty input
    appendUserInput(userInput); // Append input to output
    handleCommand(userInput.toLowerCase()); // Handle the command
    inputField.value = ""; // Reset input field
    scrollToBottom(); // Ensure scrolling after input
    updateCursorPosition();
  }
});

// Additional Event Listeners for Input Field
inputField.addEventListener("input", () => {
  if (!window.terminalActive) return; // Prevent execution if terminal is inactive
  if (!inputField.value.startsWith(" ")) {
    inputField.value = " " + inputField.value.trimStart();
  }
  updateCursorPosition();
});

// Event listener for input field focus
terminal.addEventListener("click", () => {
  if (window.terminalActive) {
    inputField.focus(); // Refocus the input field on terminal click
  }
});

// Function to start letter glitch animation
function startLetterGlitch() {
  const timeline = gsap.timeline();
  timeline
    .to([outputDiv, inputLine], {
      opacity: 0.75,
      duration: 0,
      delay: 0,
    })
    .to([outputDiv, inputLine], {
      opacity: 0.75,
      duration: 0,
      delay: 0,
    })
    .to([outputDiv, inputLine], {
      opacity: 0,
      duration: 0,
      delay: 0.15,
    })
    .to([outputDiv, inputLine], {
      opacity: 1,
      duration: 0,
      delay: 0.1,
    })
    .to([outputDiv, inputLine], {
      opacity: 0,
      duration: 0,
      delay: 0.07,
    })
    .to([outputDiv, inputLine], {
      opacity: 1,
      duration: 0,
      delay: 0.05,
    })
    .to([outputDiv, inputLine], {
      opacity: 0,
      duration: 0,
      delay: 0.5,
    })
    .to([outputDiv, inputLine], {
      opacity: 1,
      duration: 0,
      delay: 0.05,
    });
}

function startGlitchEffect() {
  const glitchImages = document.querySelectorAll(".imgbghome");

  glitchImages.forEach((baseImage) => {
    const parent = baseImage.parentElement;

    // Create glitch layers
    for (let i = 0; i < 2; i++) {
      const glitchLayer = baseImage.cloneNode(true); // Clone the original image
      glitchLayer.classList.add("glitch-layer"); // Add the glitch-layer class
      parent.insertBefore(glitchLayer, baseImage.nextSibling); // Insert glitch layers after the base image
    }
    const errortext = document.getElementById("errortext");
    const glitchLayers = parent.querySelectorAll(".glitch-layer");
    const opacitititi = gsap.to([glitchLayers, glitchImages], {
      opacity: () => (Math.random() > 0.8 ? 1 : 0), // Random opacity
      duration: 0, // Instant change
      stagger: 0.02, // Slight delay between each layer
      repeat: -1, // Repeat indefinitely
      onRepeat: () => {
        // Update opacity on each layer individually after each repeat
        glitchLayers.forEach((layer) => {
          gsap.set(layer, { opacity: () => (Math.random() > 0.8 ? 1 : 0) });
        });

        glitchImages.forEach((image) => {
          gsap.set(image, { opacity: () => (Math.random() > 0.8 ? 1 : 0) });
        });
      },
    });

    // Stop the opacity animation after 3 seconds
    gsap.delayedCall(4.4, () => {
      const topimgs = document.querySelectorAll(".imgbghome.archive");
      // opacityTimeline.kill(); // Stop the opacity glitch animation
      opacitititi.kill();
      window.terminalActive = false; // Deactivate the terminal globally

      // Dispatch the custom event
      console.log("Dispatching terminalecitit event"); // Add this line
      const terminalEvent = new Event("terminalecitit");
      document.dispatchEvent(terminalEvent);

      setTimeout(() => {
        gsap.set([glitchLayers, glitchImages], { opacity: 0 });
        gsap.set(topimgs, { opacity: 1 });
      }, 200);
    });

    const xShiftTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: Math.random() * 0.5 + 0.5, // Initial random delay
      onRepeat: function () {
        this.repeatDelay(Math.random() * 0.5 + 3); // Set new random delay each cycle
      },
    });

    // Apply the horizontal and vertical shift instantly
    xShiftTimeline.to(glitchLayers, {
      x: () => Math.random() * 20 - 10, // Random horizontal shift
      y: () => Math.random() * 20 - 10, // Random vertical shift
      duration: 0.1, // Very quick glitch effect
      ease: "none",
    });

    // Hold the position for 1.4 seconds (you can adjust the duration if needed)
    xShiftTimeline.to(glitchLayers, {
      duration: 1.4, // Hold the glitched state
    });

    const clipPathTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: Math.random() * 0.5 + 0.5, // Initial random delay
      onRepeat: function () {
        this.repeatDelay(Math.random() * 0.5 + 3); // Set new random delay each cycle

        gsap.set(glitchLayers, {
          clipPath: () =>
            `inset(${Math.random() * 30}% ${Math.random() * 30}% ${
              Math.random() * 30
            }% ${Math.random() * 30}%)`,
          x: () => Math.random() * 100 - 10,
          y: () => Math.random() * 20 - 10,
        });
      },
    });

    clipPathTimeline.to(glitchLayers, {
      duration: 0.1, // Quick glitch effect
      ease: "none",
    });

    clipPathTimeline.to(glitchLayers, {
      duration: 1.4, // Hold the glitched state
    });

    const invertTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: Math.random() * 1.5 + 0.5, // Initial random delay
      onRepeat: function () {
        this.repeatDelay(Math.random() * 1.75 + 0.75); // Set new random delay each cycle

        gsap.set(glitchLayers, {
          filter: () => (Math.random() > 0.7 ? "invert(1)" : "none"), // Randomly choose between invert and none
        });
      },
    });
    invertTimeline.to(glitchLayers, {
      duration: 0.1, // Quick glitch effect
      ease: "none",
    });

    invertTimeline.to(glitchLayers, {
      duration: 1.4, // Hold the glitched state
    });

    const errortextTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: Math.random() * 0.3 + 0.01, // Initial random delay
      onRepeat: function () {
        this.repeatDelay(Math.random() * 0.3 + 0.01); // Set new random delay each cycle

        gsap.set(errortext, {
          y: () => (Math.random() > 0.5 ? "1.5px" : "0px"), // Randomly choose between invert and none
          // y: () => Math.random() * 5, // Random horizontal shift
        });
      },
    });
    errortextTimeline.to(errortext, {
      duration: 0.1, // Quick glitch effect
      ease: "none",
    });

    errortextTimeline.to(errortext, {
      duration: 1.4, // Hold the glitched state
    });
  });
}

// Function to create flicker noise effect
function flickerNoise() {
  const timeline = gsap.timeline();

  timeline
    .to(noiseLayer, {
      opacity: 0.75,
      duration: 0,
      delay: 0.1,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.3,
    })
    .to(noiseLayer, {
      opacity: 0.75,
      duration: 0,
      delay: 0.6,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.2,
    })
    .to(noiseLayer, {
      opacity: 1,
      duration: 0,
      delay: 0.25,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.1,
    })
    .to(noiseLayer, {
      opacity: 1,
      duration: 0,
      delay: 0.2,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.15,
    })
    .to(noiseLayer, {
      opacity: 1,
      duration: 0,
      delay: 0.2,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.15,
    })
    .to(noiseLayer, {
      opacity: 1,
      duration: 0,
      delay: 0.25,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.1,
    })
    .to(noiseLayer, {
      opacity: 0.5,
      duration: 0,
      delay: 0.2,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.15,
    });
}

// Function to stop the terminal
function stopTerminal() {
  const promptText = "visitor@kernjosh.com:~$ ";
  const systemResponse = "ERROR: System resources corrupted."; // More realistic response
  activateButton.style.display = "none";

  setTimeout(() => {
    errortext.style.display = "block";

    flickerNoise();
    startGlitchEffect();
    if (secondInter) {
      secondInter.style.display = "none"; // Ensure this element exists
    }
  }, 1100);

  setTimeout(() => {
    gsap.to("#text-block", {
      opacity: 1,
      delay: 0,
      duration: 0.15,
      ease: "ease",
    });
    // Additional shutdown animations can be added here
  }, 4000);

  if (outputDiv) {
    // Step 1: Create the user input line (simulate typing)
    const userLine = document.createElement("div");
    userLine.innerHTML = ``; // You can add content here if needed
    outputDiv.appendChild(userLine);
    scrollToBottom(); // Scroll after appending

    // Step 3: Append system response
    setTimeout(() => {
      const responseDiv = document.createElement("div");
      responseDiv.textContent = systemResponse; // System response message
      outputDiv.appendChild(responseDiv);
      scrollToBottom(); // Scroll after appending

      // Step 4: Hide terminal after response
      setTimeout(() => {
        terminal.style.display = "none"; // Hide terminal
        terminalInitialized = false; // Reset initialization state
      }, 3250);
    }, 100); // Delay to simulate Enter key press
  }
}

// Optional: Debounce function to limit how often a function can run
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Optional: Smooth scrolling for a better user experience
function scrollToBottomSmooth() {
  outputDiv.scrollTo({
    top: outputDiv.scrollHeight,
    behavior: "smooth",
  });
}
