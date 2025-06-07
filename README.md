# 🌌 3D Solar System Simulation

A 3D interactive simulation of the solar system built using Three.js, HTML, CSS, and JavaScript. It features realistic planetary textures, orbital animations, user-controlled speed sliders for each planet, a skybox, stars, and orbit rings.


# 📂 Project Structure

```bash
solar-system/
├── index.html
├── style.css
├── main.js
└── image/
├── skybox/
│ ├── space_ft.png
│ ├── space_bk.png
│ ├── space_up.png
│ ├── space_dn.png
│ ├── space_rt.png
│ └── space_lf.png
├── sun_hd.jpg
├── mercury_hd.jpg
├── venus_hd.jpg
├── earth_hd.jpg
├── mars_hd.jpg
├── jupiter_hd.jpg
├── saturn_hd.jpg
├── uranus_hd.jpg
└── neptune_hd.jpg
```

# 🛠 Features

* 🌞 Realistic planetary textures.

* 🌍 Orbital revolution and self-rotation for all planets.

* 🎛 Interactive speed control sliders for each planet.

* 🌠 Dynamic starfield background.

* 🔭 Zoom, rotate, and pan using mouse with OrbitControls.

* 🌌 3D Skybox for immersive space environment.

* ⭕ Planet orbit rings for visual guidance.

* ⏯ Pause and resume planetary motion.


# 🧑‍💻 How to Run

Option 1: Using VSCode Live Server (Recommended)

Open the project folder in VSCode.

Install the Live Server extension if not already installed.

Right-click index.html and choose "Open with Live Server".

The simulation will open in your browser.

Option 2: Using Node.js http-server

* Install http-server globally if not done yet

```console
npm install -g http-server
```

* Navigate to the project folder

```console
cd path/to/solar-system
```

* Start the server

```console
http-server
```

* Open the given localhost URL in your browser


# 📋 Controls

Speed Control Button – Toggles the visibility of sliders.

Sliders – Change revolution speed of each planet individually.

Pause/Resume Button – Toggle the planetary motion.

Mouse Left Click + Drag – Rotate the camera around the system.

Mouse Scroll – Zoom in/out.

Mouse Right Click + Drag – Pan across the scene.
