// import * as THREE from '../../node_modules/three/build/three.module.js';
import * as THREE from 'https://threejs.org/build/three.module.js';

export class Axes {
    constructor(scene, size) {
        this._axesHelper = new THREE.AxesHelper(size);
        scene.add(this._axesHelper);
    }
}