import * as THREE from 'https://threejs.org/build/three.module.js';
import { ImprovedNoise } from 'https://threejs.org/examples/jsm/math/ImprovedNoise.js';


export class Plane extends THREE.Object3D {
    static Material = new THREE.LineBasicMaterial({
        color: 0x4B0082,
    });

    static ChangeMaterialColor(newColor) {
        Plane.Material.color.set(newColor);
    }

    static RecquireRebuild = false;

    constructor(scene, width, height, spacing, noiseAmpX, noiseAmpY, noiseFactor) {
        super();

        this._width = Math.round(width);
        this._height = Math.round(height);
        this._spacing = Math.round(spacing);
        this._noiseAmpX = noiseAmpX;
        this._noiseAmpY = noiseAmpY;
        this._noiseFactor = noiseFactor;
        this._buildPlane();

        scene.add(this);
    }

    _buildPlane() {
        const perlinNoise = new ImprovedNoise();
        const xOffset = -(this._height) * this._spacing / 2;
        const zOffset = -(this._width) * this._spacing / 2;
        const arr2d = [];
        for (let i = 0; i < this._height; i++) {
            arr2d[i] = []
            for (let j = 0; j < this._width; j++) {
                const x = i * this._spacing + xOffset;
                const z = j * this._spacing + zOffset;
                const y = perlinNoise.noise(this._noiseAmpX * i / this._height, this._noiseAmpY * j / this._width, 0) * this._noiseFactor;
                arr2d[i][j] = new THREE.Vector3(x, y, z);
            }
        }

        for (let i = 0; i < this._height; i++) {
            const points = arr2d[i];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, Plane.Material);
            this.add(line);
        }

        for (let j = 0; j < this._width; j++) {
            const points = [];
            let index = 0;
            for (let i = 0; i < this._height; i++) {
                points[index++] = arr2d[i][j];
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, Plane.Material);
            this.add(line);
        }

        const points = [];
        let index = 0;
        for (let i = 0; i < this._height - 1; i++) {
            for (let j = 0; j < this._width - 1; j++) {
                points[index++] = arr2d[i][j];
                points[index++] = arr2d[i + 1][j + 1];
            }
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.LineSegments(geometry, Plane.Material);
        this.add(line);
    }

    dispose() {
        while (this.children.length) {
            this.children[0].geometry.dispose();
            this.children[0].material.dispose();
            this.remove(this.children[0]);
        }
    }
}