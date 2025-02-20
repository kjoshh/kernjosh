import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("threeModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const preloader = document.getElementById("preloader");
  const loadingPercent = document.getElementById("loadingPercent");
  let sceneInitialized = false;
  function initializeScene() {
    if (sceneInitialized) return;
    sceneInitialized = true;
    console.log("Initializing scene...");
    preloader.style.display = "flex";
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.15, 0);
    camera.lookAt(0, 0.15, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x202020);
    modal.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.target.set(0, 0.15, 0);
    controls.update();
    controls.enableZoom = false;
    const loader = new GLTFLoader();
    loader.load(
      "js/huetteblender.glb",
      function (gltf) {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.scale.set(1, 1, 1);
        scene.add(model);
        preloader.style.display = "none";
      },
      function (xhr) {
        const percentComplete = Math.round((xhr.loaded / xhr.total) * 99);
        loadingPercent.textContent = percentComplete;
      },
      function (error) {
        console.error("Error loading model:", error);
        preloader.textContent = "Error loading the model.";
      }
    );
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }
  openModalBtn.addEventListener("click", () => {
    console.log("Opening modal...");
    modal.style.display = "flex";
    initializeScene();
  });
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const cross = document.getElementById("cross");
  const navigalast = document.getElementById("navigalast");
  const pwembed = document.getElementById("pwembed");
  const onloadDiv = document.querySelector(".onload-div");
  if (!cross) {
    console.warn("Element with ID 'cross' not found.");
    return;
  }
  cross.addEventListener("click", function (e) {
    e.preventDefault();
    const href = "https://kernjosh.com/";
    sessionStorage.setItem("isInternalNavigation", "true");
    console.log("Internal navigation state set in sessionStorage.");
    fetch(href, {
      mode: "no-cors",
    })
      .then(() => console.log("Page preloaded:", href))
      .catch(() => console.warn("Failed to preload page:", href));
    cross.style.pointerEvents = "none";
    onloadDiv.style.display = "block";
    gsap.set(onloadDiv, {
      top: "auto",
      bottom: 0,
    });
    gsap.to(cross, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        cross.style.display = "none";
      },
    });
    if (pwembed) {
      gsap.to(pwembed, {
        opacity: 0,
        y: -15,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          window.location.href = href;
        },
      });
    }
    gsap.to([naviga, wholeplayer], {
      opacity: 0,
      y: -17,
      duration: 0.5,
      ease: "power3.inOut",
    });
    gsap.to(onloadDiv, {
      height: "100%",
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        window.location.href = href;
      },
    });
  });
  if (sessionStorage.getItem("isInternalNavigation") === "true") {
    console.log("Page loaded via internal navigation.");
  }
});
