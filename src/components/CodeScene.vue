<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

const container = ref<HTMLDivElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let animationFrame: number;

const mouse = {
    x: 0,
    y: 0
};

onMounted(() => {
    if (!container.value) return;

    // =========================
    // SCENE
    // =========================

    scene = new THREE.Scene();

    // =========================
    // CAMERA
    // =========================

    camera = new THREE.PerspectiveCamera(
        45,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        100
    );

    camera.position.set(0, 0, 10);

    // =========================
    // RENDERER
    // =========================

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(
        container.value.clientWidth,
        container.value.clientHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    container.value.appendChild(renderer.domElement);

    // =========================
    // CODE LINES
    // =========================

    const lines = [
        'import * as THREE from "three";',
        '',
        'class Developer {',
        '    constructor() {',
        '        this.creative = true;',
        '        this.technical = true;',
        '    }',
        '',
        '    create() {',
        '        return new Project();',
        '    }',
        '}',
    ];

  

    // Tijdelijk gebruiken we gewone TextGeometry
    // Hiervoor moet je een font laden.

    // =========================
    // MOUSE
    // =========================

    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // =========================
    // RESIZE
    // =========================

    const handleResize = () => {
        if (!container.value) return;

        camera.aspect =
            container.value.clientWidth /
            container.value.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.value.clientWidth,
            container.value.clientHeight
        );
    };

    window.addEventListener('resize', handleResize);

    // =========================
    // ANIMATION
    // =========================

    const animate = () => {
        animationFrame = requestAnimationFrame(animate);

        camera.position.x +=
            (mouse.x * 0.5 - camera.position.x) * 0.05;

        camera.position.y +=
            (mouse.y * 0.5 - camera.position.y) * 0.05;

        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();
});

onUnmounted(() => {
    cancelAnimationFrame(animationFrame);

    renderer?.dispose();

    window.removeEventListener('mousemove', () => {});
    window.removeEventListener('resize', () => {});
});
</script>

<template>
    <div
        ref="container"
        class="code-scene"
    />
</template>

<style scoped>
.code-scene {
    width: 100%;
    height: 500px;
    position: relative;
}
</style>