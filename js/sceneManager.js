import * as THREE from 'https://threejs.org/build/three.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://threejs.org/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejs.org/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://threejs.org/examples/jsm/postprocessing/UnrealBloomPass.js';

import { MyAmbientLight } from './objects/myAmbientLight.js';
import { Axes } from './objects/axes.js';
import { Plane } from './objects/plane.js';

export class SceneManager {
    constructor(canvas) {
        this._canvas = canvas;
        this._scene = this._buildScene();
        this._camera = this._buildCamera(canvas.width, canvas.height);
        this._renderer = this._buildRenderer(canvas.width, canvas.height);
        this._sceneObjects = this._buildSceneObjects();
        this._cameraControls = this._buildCameraControls();
        this._renderPass = this._buildRenderPass();
        this._bloomPass = this._buildBloomPass();
        this._effectComposer = this._buildEffectComposer();
    }

    // --- Pseudo private methods ---
    _buildScene() {
        const scene = new THREE.Scene();
        //scene.fog = new THREE.Fog(0x4B0082, 128, 512);
        return scene;
    }

    _buildCamera(width, height) {
        const fov = 75;
        const aspectRatio = width / height;
        const zNear = 1;
        const zFar = 2048;
        const camera = new THREE.PerspectiveCamera(fov, aspectRatio, zNear, zFar);
        camera.position.set(-128, 128, -128);
        camera.lookAt(0, 0, 0);
        return camera;
    }

    _buildRenderer(width, height) {
        const renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true });
        renderer.setClearColor(0x030303);
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        return renderer;
    }

    _buildSceneObjects() {
        const sceneObjects = {
            "light": new MyAmbientLight(this._scene, 0xe6e6e6),
            //"axes": new Axes(this._scene, 10),
            "plane": new Plane(this._scene, 128, 128, 8)
        };

        return sceneObjects;
    }

    _buildCameraControls() {
        const cameraControls = new OrbitControls(this._camera, this._renderer.domElement);
        cameraControls.autoRotate = true;
        cameraControls.autoRotateSpeed = 1.0;
        cameraControls.rotateSpeed = 0.5;
        cameraControls.enablePan = true;
        cameraControls.enableDamping = true;
        cameraControls.maxDistance = 1024;
        cameraControls.minDistance = 16;
        cameraControls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN
        }
        return cameraControls;
    }

    _buildRenderPass() {
        return new RenderPass(this._scene, this._camera);
    }

    _buildBloomPass() {
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(this._canvas.width, this._canvas.height), 0, 0, 0);
        bloomPass.exposure = 0;
        bloomPass.threshold = 0;
        S
        bloomPass.strength = 0.9;
        bloomPass.radius = 0.2;
        return bloomPass;
    }

    _buildEffectComposer() {
        const effectComposer = new EffectComposer(this._renderer);
        effectComposer.addPass(this._renderPass);
        effectComposer.addPass(this._bloomPass);
        return effectComposer;
    }

    // --- Pseudo public core methods ---
    update() {
        this._cameraControls.update();
        this._renderer.renderLists.dispose();
    }

    render() {
        //this._renderer.render(this._scene, this._camera);
        this._effectComposer.render();
    }

    // --- Pseudo public additional methods ---
    onWindowResize() {
        const { width, height } = canvas;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
        this._effectComposer.setSize(width, height);
    }
}