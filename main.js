import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls, skybox;
let planet_sun,
  planet_mercury,
  planet_venus,
  planet_earth,
  planet_mars,
  planet_jupiter,
  planet_saturn,
  planet_uranus,
  planet_neptune;
let planet_sun_label;

let mercury_orbit_radius = 50;
let venus_orbit_radius = 60;
let earth_orbit_radius = 70;
let mars_orbit_radius = 80;
let jupiter_orbit_radius = 100;
let saturn_orbit_radius = 120;
let uranus_orbit_radius = 140;
let neptune_orbit_radius = 160;

let mercury_revolution_speed = 2;
let venus_revolution_speed = 1.5;
let earth_revolution_speed = 1;
let mars_revolution_speed = 0.8;
let jupiter_revolution_speed = 0.7;
let saturn_revolution_speed = 0.6;
let uranus_revolution_speed = 0.5;
let neptune_revolution_speed = 0.4;
let isPaused = false;
let isSpeedBoxVisible = false;

document.getElementById("toggleAnimation").addEventListener("click", () => {
  isPaused = !isPaused;
  document.getElementById("toggleAnimation").innerText = isPaused
    ? "Resume"
    : "Pause";
});

document.querySelector(".SpeedControlBtn").addEventListener("click", () => {
  isSpeedBoxVisible = !isSpeedBoxVisible;
  if (isSpeedBoxVisible) {
    document.querySelector(".SpeedBoxLabels").setAttribute("style", "");
  } else {
    document
      .querySelector(".SpeedBoxLabels")
      .setAttribute("style", "display: none;");
  }
});

function setupSpeedControls() {
  document.getElementById("mercurySlider").addEventListener("input", (e) => {
    mercury_revolution_speed = parseFloat(e.target.value);
  });
  document.getElementById("venusSlider").addEventListener("input", (e) => {
    venus_revolution_speed = parseFloat(e.target.value);
  });
  document.getElementById("earthSlider").addEventListener("input", (e) => {
    earth_revolution_speed = parseFloat(e.target.value);
  });
  document.getElementById("marsSlider").addEventListener("input", (e) => {
    mars_revolution_speed = parseFloat(e.target.value);
  });
  document.getElementById("jupiterSlider").addEventListener("input", (e) => {
    jupiter_revolution_speed = parseFloat(e.target.value);
  });
  document.getElementById("saturnSlider").addEventListener("input", (e) => {
    saturn_revolution_speed = parseFloat(e.target.value);
  });
  document.getElementById("uranusSlider").addEventListener("input", (e) => {
    uranus_revolution_speed = parseFloat(e.target.value);
  });
  document.getElementById("neptuneSlider").addEventListener("input", (e) => {
    neptune_revolution_speed = parseFloat(e.target.value);
  });
}

function createMaterialArray() {
  const skyboxImagepaths = [
    "./image/skybox/space_ft.png",
    "./image/skybox/space_bk.png",
    "./image/skybox/space_up.png",
    "./image/skybox/space_dn.png",
    "./image/skybox/space_rt.png",
    "./image/skybox/space_lf.png",
  ];
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}

function setSkyBox() {
  const materialArray = createMaterialArray();
  let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}

function generateGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.6)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function addStars(count = 1000) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < count; i++) {
    positions.push(
      (Math.random() - 0.5) * 4000,
      (Math.random() - 0.5) * 4000,
      (Math.random() - 0.5) * 4000
    );
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const texture = generateGlowTexture();

  const material = new THREE.PointsMaterial({
    map: texture,
    color: 0xffffff,
    size: 12,
    transparent: true,
    alphaTest: 0.01,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}

function loadPlanetTexture(
  texture,
  radius,
  widthSegments,
  heightSegments,
  meshType
) {
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  const loader = new THREE.TextureLoader();
  const planetTexture = loader.load(texture);
  const material =
    meshType == "standard"
      ? new THREE.MeshStandardMaterial({ map: planetTexture })
      : new THREE.MeshBasicMaterial({ map: planetTexture });

  const planet = new THREE.Mesh(geometry, material);

  return planet;
}

function createRing(innerRadius) {
  let outerRadius = innerRadius - 0.1;
  let thetaSegments = 100;
  const geometry = new THREE.RingGeometry(
    innerRadius,
    outerRadius,
    thetaSegments
  );
  const material = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  mesh.rotation.x = Math.PI / 2;
  return mesh;
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  setSkyBox();
  addStars();

  planet_earth = loadPlanetTexture(
    "./image/earth_hd.jpg",
    4,
    100,
    100,
    "standard"
  );
  planet_sun = loadPlanetTexture("./image/sun_hd.jpg", 20, 100, 100, "basic");
  planet_mercury = loadPlanetTexture(
    "./image/mercury_hd.jpg",
    2,
    100,
    100,
    "standard"
  );
  planet_venus = loadPlanetTexture(
    "./image/venus_hd.jpg",
    3,
    100,
    100,
    "standard"
  );
  planet_mars = loadPlanetTexture(
    "./image/mars_hd.jpg",
    3.5,
    100,
    100,
    "standard"
  );
  planet_jupiter = loadPlanetTexture(
    "./image/jupiter_hd.jpg",
    10,
    100,
    100,
    "standard"
  );
  planet_saturn = loadPlanetTexture(
    "./image/saturn_hd.jpg",
    8,
    100,
    100,
    "standard"
  );
  planet_uranus = loadPlanetTexture(
    "./image/uranus_hd.jpg",
    6,
    100,
    100,
    "standard"
  );
  planet_neptune = loadPlanetTexture(
    "./image/neptune_hd.jpg",
    5,
    100,
    100,
    "standard"
  );

  scene.add(planet_earth);
  scene.add(planet_sun);
  scene.add(planet_mercury);
  scene.add(planet_venus);
  scene.add(planet_mars);
  scene.add(planet_jupiter);
  scene.add(planet_saturn);
  scene.add(planet_uranus);
  scene.add(planet_neptune);

  const sunLight = new THREE.PointLight(0xffffff, 1, 0);
  sunLight.position.copy(planet_sun.position);
  scene.add(sunLight);

  createRing(mercury_orbit_radius);
  createRing(venus_orbit_radius);
  createRing(earth_orbit_radius);
  createRing(mars_orbit_radius);
  createRing(jupiter_orbit_radius);
  createRing(saturn_orbit_radius);
  createRing(uranus_orbit_radius);
  createRing(neptune_orbit_radius);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "c";
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 12;
  controls.maxDistance = 1000;

  camera.position.z = 100;
}

function planetRevolver(time, speed, planet, orbitRadius, planetName) {
  let orbitSpeedMultiplier = 0.001;
  const planetAngle = time * orbitSpeedMultiplier * speed;
  planet.position.x =
    planet_sun.position.x + orbitRadius * Math.cos(planetAngle);
  planet.position.z =
    planet_sun.position.z + orbitRadius * Math.sin(planetAngle);
}

function animate(time) {
  requestAnimationFrame(animate);
  if (isPaused) return;
  const rotationSpeed = 0.005;
  planet_earth.rotation.y += rotationSpeed;
  planet_sun.rotation.y += rotationSpeed;
  planet_mercury.rotation.y += rotationSpeed;
  planet_venus.rotation.y += rotationSpeed;
  planet_mars.rotation.y += rotationSpeed;
  planet_jupiter.rotation.y += rotationSpeed;
  planet_saturn.rotation.y += rotationSpeed;
  planet_uranus.rotation.y += rotationSpeed;
  planet_neptune.rotation.y += rotationSpeed;

  planetRevolver(
    time,
    mercury_revolution_speed,
    planet_mercury,
    mercury_orbit_radius,
    "mercury"
  );
  planetRevolver(
    time,
    venus_revolution_speed,
    planet_venus,
    venus_orbit_radius,
    "venus"
  );
  planetRevolver(
    time,
    earth_revolution_speed,
    planet_earth,
    earth_orbit_radius,
    "earth"
  );
  planetRevolver(
    time,
    mars_revolution_speed,
    planet_mars,
    mars_orbit_radius,
    "mars"
  );
  planetRevolver(
    time,
    jupiter_revolution_speed,
    planet_jupiter,
    jupiter_orbit_radius,
    "jupiter"
  );
  planetRevolver(
    time,
    saturn_revolution_speed,
    planet_saturn,
    saturn_orbit_radius,
    "saturn"
  );
  planetRevolver(
    time,
    uranus_revolution_speed,
    planet_uranus,
    uranus_orbit_radius,
    "uranus"
  );
  planetRevolver(
    time,
    neptune_revolution_speed,
    planet_neptune,
    neptune_orbit_radius,
    "neptune"
  );

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
setupSpeedControls();
animate(0);
