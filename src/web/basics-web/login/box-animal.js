import * as THREE from 'three';

class BoxExamples {
    constructor() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);
        camera.positon.set(0, 0, 5);
        camera.lookAt(scene.position);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(100, 100);

        const animal = () => {
            requestAnimationFrame(animal);
            renderer.render(scene, camera)
        };
        animal();
    }
}

export default BoxExamples;








