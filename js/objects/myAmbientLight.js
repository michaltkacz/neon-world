// import * as THREE from '../../../node_modules/three/build/three.module.js';
import * as THREE from 'https://threejs.org/build/three.module.js';

export class MyAmbientLight extends THREE.Object3D {
    constructor(scene, color) {
        super();
        this._light = new THREE.AmbientLight(color);
        scene.add(this._light);
    }
}