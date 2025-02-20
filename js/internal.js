document.addEventListener("DOMContentLoaded", function () {
  const activateButton = document.getElementById("activate-terminal");

  if (activateButton) {
    activateButton.addEventListener("click", function () {
      initializeTerminalScript();
    });
  } else {
    console.error("Activate button not found!");
  }
});
