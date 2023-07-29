// OrbitControls.js

import * as THREE from './three.js';

export class OrbitControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement || document;
        this.rotateSpeed = 1.0;
        this.zoomSpeed = 1.2;
        this.phiDelta = 0;
        this.thetaDelta = 0;
        this.scale = 1;
        this.target = new THREE.Vector3();
    }

    update() {
        let position = this.camera.position;
        let offset = position.clone().sub(this.target);
        let theta = Math.atan2(offset.x, offset.z);
        let phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);
        theta += this.thetaDelta;
        phi += this.phiDelta;
        let radius = offset.length() * this.scale;
        offset.x = radius * Math.sin(phi) * Math.sin(theta);
        offset.y = radius * Math.cos(phi);
        offset.z = radius * Math.sin(phi) * Math.cos(theta);
        this.camera.position.copy(this.target).add(offset);
        this.camera.lookAt(this.target);
        this.thetaDelta = 0;
        this.phiDelta = 0;
        this.scale = 1;
    }

    onMouseMove(event) {
        let element = this.domElement === document ? this.domElement.body : this.domElement;
        let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        this.thetaDelta -= 2 * Math.PI * movementX / element.clientWidth * this.rotateSpeed;
        this.phiDelta -= 2 * Math.PI * movementY / element.clientHeight * this.rotateSpeed;
    }

    onMouseWheel(event) {
        if (event.deltaY < 0) {
            this.scale /= this.zoomSpeed;
        } else if (event.deltaY > 0) {
            this.scale *= this.zoomSpeed;
        }
    }

    addEventListeners() {
        this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.domElement.addEventListener('wheel', this.onMouseWheel.bind(this), false);
    }

    removeEventListeners() {
        this.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.domElement.removeEventListener('wheel', this.onMouseWheel.bind(this), false);
    }
}