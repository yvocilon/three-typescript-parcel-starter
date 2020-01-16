import {
    Scene, Color, WebGLRenderer, PerspectiveCamera, PlaneGeometry,
    MeshPhongMaterial, Mesh, SphereGeometry, DirectionalLight,
    HemisphereLight, Camera
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const scene = initScene();

const renderer = initRenderer(document.body);

const camera = initCamera();

const floor = initFloor();

const sphere = initSphere();

const controls = initControls(camera, renderer.domElement);

initLights().forEach(light => scene.add(light));

scene.add(sphere);
scene.add(floor);

update();

function update() {

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    controls.update();

    requestAnimationFrame(update);
}

function initControls(camera: Camera, domElement: HTMLElement) {
    return new OrbitControls(camera, domElement);
}

function initLights() {
    const directionalLight = new DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;

    const hemisphereLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);

    return [directionalLight, hemisphereLight];
}

function initSphere() {
    const geometry = new SphereGeometry(1, 40, 40);
    const material = new MeshPhongMaterial({ color: 0x83DDFF });
    const sphere = new Mesh(geometry, material);
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    return sphere;
}

function initFloor() {
    const geometry = new PlaneGeometry(100, 100, 1, 1);
    const material = new MeshPhongMaterial({ color: 0xdcdcdc });
    const floor = new Mesh(geometry, material);
    floor.rotation.x = Math.PI * -0.5;
    floor.receiveShadow = true;
    floor.position.y = -3;
    return floor;
}

function initCamera() {
    const fov = 60;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    const camera = new PerspectiveCamera(fov, aspectRatio, near, far);
    camera.position.z = 10;
    camera.position.y = 1;

    return camera;
}

function initScene() {
    const scene = new Scene();
    scene.background = new Color(0xffffff);
    return scene;
}

function initRenderer(domTarget: HTMLElement) {
    const renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    domTarget.appendChild(renderer.domElement);
    return renderer;
}

function resizeRendererToDisplaySize(renderer: WebGLRenderer) {
    const canvas = renderer.domElement;
    const { innerWidth: width, innerHeight: height } = window;

    const canvasPixelWidth = canvas.width / window.devicePixelRatio;
    const canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize =
        canvasPixelWidth !== width || canvasPixelHeight !== height;

    if (needResize) {
        renderer.setSize(width, height, false);
    }

    return needResize;
}
