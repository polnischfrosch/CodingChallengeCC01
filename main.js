//IMPORT MODULES
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
//VARIABLES
let width = window.innerWidth;
let height = window.innerHeight;
var cubeArray = [];
 
console.log(width, height);
 
//CREATE SCENE AND CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 100);
camera.position.set(10, 10, 20)


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
 
//CREATE GEOMETRY AND ADD TO THE SCENE
function addCubeToArray(x, y, color, arrayToAddTo, scene) {
    var size = Math.random();
    const geometry = new THREE.BoxGeometry(size,size,size);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, 0);
    arrayToAddTo.push(cube);
    scene.add(cube);
}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
    addCubeToArray(i, j, Math.random() * 0xffffff, cubeArray, scene);
    }
}
 
 // RESPONSIVE
 function handleResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  scene.add(cube);
}
 
window.addEventListener('resize', handleResize);
 
//CREATE A RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const container = document.querySelector('#threejs-container');
container.append(renderer.domElement);
 
//CREATE MOUSE CONTROL
const controls = new OrbitControls( camera, renderer.domElement );
//controls.autoRotate = true 

//RENDER - WITHOUT ANIMATION
//renderer.render(scene, camera)
 
//ANIMATE AND RENDER
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    cubeArray.forEach((cube, index) => {
        cube.rotation.x += 0.001 * (Math.random()*100 + 1);
        cube.rotation.y += 0.001 * (Math.random()*100 + 1);
    });
    renderer.render(scene, camera);
}

animate();