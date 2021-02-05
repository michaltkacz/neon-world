// import * as THREE from '../../node_modules/three/build/three.module.js';
import * as THREE from 'https://threejs.org/build/three.module.js';

export class Axes extends THREE.Object3D {
    constructor(scene, size) {
        super();
        this._axesHelper = new THREE.AxesHelper(size);
        scene.add(this._axesHelper);
    }

    enable(enabled) {
        this._axesHelper.visible = enabled;
    }
}