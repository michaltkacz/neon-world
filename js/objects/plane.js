import * as THREE from 'https://threejs.org/build/three.module.js';
import { noise2 } from '../utils/perlin.js';

export class Plane extends THREE.Object3D {
    constructor(scene, x, y, spacing) {
        super();

        this._x = x;
        this._y = y;
        this._s = spacing;
        this._buildPlane();

        scene.add(this);
    }

    _buildPlane() {
        const xOffset = -(this._x - 1) * this._s / 2;
        const zOffset = -(this._y - 1) * this._s / 2;
        const arr2d = [];
        for (let i = 0; i < this._y; i++) {
            arr2d[i] = []
            for (let j = 0; j < this._x; j++) {
                const x = i * this._s + xOffset;
                const z = j * this._s + zOffset;

                const noise = noise2(4 * i / this._y, 4 * j / this._x)
                const y = (0.5 - noise) * 256;

                arr2d[i][j] = new THREE.Vector3(x, y, z);
            }
        }

        const material = new THREE.LineBasicMaterial({
            color: 0x4B0082,
        });

        for (let i = 0; i < this._y; i++) {
            const points = arr2d[i];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            this.add(line);
        }

        for (let j = 0; j < this._x; j++) {
            const points = [];
            let index = 0;
            for (let i = 0; i < this._y; i++) {
                points[index++] = arr2d[i][j];
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            this.add(line);
        }

        const points = [];
        let index = 0;
        for (let i = 0; i < this._y - 1; i++) {
            for (let j = 0; j < this._x - 1; j++) {
                points[index++] = arr2d[i][j];
                points[index++] = arr2d[i + 1][j + 1];
            }
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.LineSegments(geometry, material);
        this.add(line);
    }

    yNoise(i, j, iAmp, jAmp, ) {

    }


}