// 1. Import knihoven

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



// 2. Tvorba základních prvků scény

// Scéna, hodiny pro animace
const scene = new THREE.Scene(); 
const clock = new THREE.Clock(); 


// Kamera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(350, 20, 10); 
camera.lookAt(0, 0, 0); 


// Renderer a připojení k DOM
const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true, 
    dithering: true 
 });

renderer.setPixelRatio(window.devicePixelRatio); 
if (window.innerWidth < 2000) {
    renderer.setSize(window.innerWidth, window.innerHeight);
} else {
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
}
document.body.appendChild(renderer.domElement); 



// 3. Přidání světel do scény

// Ambientní světlo
const ambientLight = new THREE.AmbientLight(0xf2fafc, 5);
scene.add(ambientLight);

// Směrová světla se stíny
const directionalLight1 = new THREE.DirectionalLight(0xfff6e0, 1); 
directionalLight1.position.set(250, 50, 100);
directionalLight1.castShadow = true;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xb3dbf5, 0.7); 
directionalLight2.position.set(-150, -70, 50);
directionalLight2.castShadow = true;
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xfff6e0, 1);
directionalLight3.position.set(200, 10, -100);
directionalLight3.castShadow = true;
scene.add(directionalLight3);

const directionalLight4 = new THREE.DirectionalLight(0xfff9e8, 2); 
directionalLight4.position.set(100, 70, -300);
directionalLight4.castShadow = true;
scene.add(directionalLight4);



// 4. Načtení modelu

// GLTF loader s připojením Draco komprese
const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); 
loader.setDRACOLoader(dracoLoader); 

let mixer; 

const loadingElement = document.getElementById("loading");


// Načtení modelu
loader.load('FOTAK_final.glb', function (gltf) {
    const model = gltf.scene; 
    scene.add(model); 

    if (loadingElement) {
        loadingElement.style.display = 'none';
    }


const rimLight = new THREE.DirectionalLight(0xe3edff, 2);
rimLight.position.set(-300, 50, -10); 
rimLight.target = model; 
scene.add(rimLight);


// Nastavení osvětlení a stínů
directionalLight1.shadow.mapSize.width = 1024;
directionalLight1.shadow.mapSize.height = 1024;
directionalLight1.shadow.camera.near = 0.5;
directionalLight1.shadow.camera.far = 500;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; 


model.position.set(40, 5, -40); 



// 5. Správa viditelnosti části modelu

const part1 = model.getObjectByName('Popisky'); 
if (part1) {
    part1.visible = false; 
    document.getElementById("toggleVisibilityButton").textContent = "Show Labels"; 
    }

 document.getElementById("toggleVisibilityButton").addEventListener("click", function () {
    if (part1) {
        part1.visible = !part1.visible; 
        this.textContent = part1.visible ? "Hide Labels" : "Show Labels"; 
    }
});



// 6. Spuštění zvuku

// Přidání audio listeneru ke kameře
const listener = new THREE.AudioListener();
camera.add(listener);

const sound1 = new THREE.Audio(listener);
const sound2 = new THREE.Audio(listener);
const sound3 = new THREE.Audio(listener);

// Načtení a příprava zvukových souborů
const audioLoader = new THREE.AudioLoader();
audioLoader.load('jzielke011__camera-shutters-125th-sec-medium_1.mp3', function(buffer) {
    sound1.setBuffer(buffer);
    sound1.setLoop(false);
    sound1.setVolume(0.45);
});

audioLoader.load('jzielke011__camera-shutters-125th-sec-medium_2.mp3', function(buffer) {
    sound2.setBuffer(buffer);
    sound2.setLoop(false);
    sound2.setVolume(0.45);
});

audioLoader.load('dster777__button.mp3', function(buffer) {
  sound3.setBuffer(buffer);
  sound3.setLoop(false);
  sound3.setVolume(0.5);
});



 // 7. Správa animací

 mixer = new THREE.AnimationMixer(model); 
 const clips = gltf.animations;

 gltf.animations.forEach((animation, index) => {
    console.log(`Animace ${index + 1} má délku ${animation.duration} sekund.`); 
});

// Definování animací
  const action1 = mixer.clipAction(gltf.animations[0]);  
  const action2 = mixer.clipAction(gltf.animations[1]);  
  const action3 = mixer.clipAction(gltf.animations[2]);  
  const action4 = mixer.clipAction(gltf.animations[3]);  
  const action5 = mixer.clipAction(gltf.animations[4]);  
  const action6 = mixer.clipAction(gltf.animations[5]);
  const action7 = mixer.clipAction(gltf.animations[6]);  
  const action8 = mixer.clipAction(gltf.animations[7]);  
  const action9 = mixer.clipAction(gltf.animations[8]);  
  const action10 = mixer.clipAction(gltf.animations[9]); 
  const action11 = mixer.clipAction(gltf.animations[10]); 
  const action12 = mixer.clipAction(gltf.animations[11]); 
  const action13 = mixer.clipAction(gltf.animations[12]); 
  const action14 = mixer.clipAction(gltf.animations[13]); 
  const action15 = mixer.clipAction(gltf.animations[14]); 
  const action16 = mixer.clipAction(gltf.animations[15]); 
  const action17 = mixer.clipAction(gltf.animations[16]); 


 const actions = [action1, action2, action3, action4, action5, action6, action7, action8, action9, action10, action11, action12, action13, action14, action15, action16, action17];
 actions.forEach(action => {
   action.setLoop(THREE.LoopOnce);
   action.clampWhenFinished = true; 
 });
 

const fps = 24;


 function playAnimations() {
     actions.forEach(action => {
        action.stop(); 
        action.reset(); 
      });
   
      

document.getElementById('playButton').disabled = true;


// Definování časů spuštění jednotlivých animací 
    action1.play();
    setTimeout(() => action2.play(), (24 / fps) * 1000);
    setTimeout(() => action3.play(), (34 / fps) * 1000);
    setTimeout(() => action4.play(), (41 / fps) * 1000);
    setTimeout(() => action5.play(), (118 / fps) * 1000);
    setTimeout(() => action6.play(), (128 / fps) * 1000);
    setTimeout(() => action7.play(), (135 / fps) * 1000);
    setTimeout(() => action8.play(), (20 / fps) * 1000);
    setTimeout(() => action9.play(), (75 / fps) * 1000);
    setTimeout(() => {
      action13.play();
      action14.play();
    }, (80 / fps) * 1000);
    setTimeout(() => {
      action12.play();
      action10.play();
      action11.play();
      action15.play();
      action16.play();
      action17.play();
    }, (83 / fps) * 1000);

// Definování časů přehrání zvuků
 setTimeout(() => { sound3.play(); }, (76 / fps) * 1000); 

 setTimeout(() => { sound1.play(); }, (83 / fps) * 1000); 

 setTimeout(() => { sound2.play(); }, (117 / fps) * 1000); 


 const disableTime = 7000; 


 setTimeout(() => {
   document.getElementById('playButton').disabled = false;
 }, disableTime);
}

 // Obsluha tlačítka pro přehrávání animací
document.getElementById('playButton').addEventListener('click', () => {playAnimations(); 
});

    camera.position.z = 5;
    console.log(gltf.animations); 
}
);

undefined, function (error) {
    console.error('An error occurred during the model load:', error);
    if (loadingElement) {
        loadingElement.innerHTML = 'Načítání modelu se nezdařilo.';
    }
};



// 8. OrbitControls

const controls = new OrbitControls(camera, renderer.domElement); 
controls.target.set(0, 0, 0); 
controls.update();


controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,   
    MIDDLE: THREE.MOUSE.DOLLY,  
    RIGHT: null                 
};

window.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        controls.enablePan = true; 
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        controls.enablePan = false; 
    }
});

controls.minDistance = 120;  
controls.maxDistance = 700; 



// 9. Plynulé vykreslování scény

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta(); 
    if (mixer) {mixer.update(delta); 
    }

    controls.update(); 
    renderer.render(scene, camera, );
}
animate();



// 10. Změna velikosti okna

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix(); 
    renderer.setSize(window.innerWidth, window.innerHeight); 
    controls.update(); 
});

window.scene=scene