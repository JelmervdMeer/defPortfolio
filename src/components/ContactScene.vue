<script setup lang="ts">

import {
    onMounted,
    onUnmounted,
    ref
} from 'vue';

import * as THREE from 'three';

import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';


// =====================================
// MODEL
// =====================================

const modelUrl: string =
    '/models/samenwerken.glb';


// =====================================
// DOM
// =====================================

const sceneContainer =
    ref<HTMLDivElement | null>(null);


// =====================================
// THREE.JS
// =====================================

let scene: THREE.Scene;

let camera: THREE.PerspectiveCamera;

let renderer: THREE.WebGLRenderer;

let model: THREE.Object3D | null = null;

let animationFrame:
    number | null = null;


// =====================================
// ROTATION
// =====================================

const rotationSpeed = 0.0015;


// =====================================
// MODEL VERTICAL OFFSET
// =====================================

/*
 * Hiermee bepalen we hoe hoog het
 * figuur in het canvas komt te staan.
 *
 * Positieve waarde = hoger
 * Negatieve waarde = lager
 */
const modelYOffset = 0.7;


// =====================================
// INITIALIZE SCENE
// =====================================

function initScene() {

    if (!sceneContainer.value) {
        return;
    }


    // =================================
    // SCENE
    // =================================

    scene =
        new THREE.Scene();


    // =================================
    // CAMERA
    // =================================

    camera =
        new THREE.PerspectiveCamera(
            45,
            1,
            0.01,
            1000
        );

    camera.position.set(
        0,
        0.8,
        7.5
    );

    camera.lookAt(
        0,
        1.8,
        0
    );


    // =================================
    // RENDERER
    // =================================

    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;


    renderer.toneMappingExposure =
        1.2;


    sceneContainer.value.appendChild(
        renderer.domElement
    );


    // =====================================
    // LIGHTING
    // =====================================


    // ---------------------------------
    // AMBIENT LIGHT
    // ---------------------------------

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.4
        );

    scene.add(
        ambientLight
    );


    // ---------------------------------
    // PURPLE ROOM LIGHT
    // ---------------------------------

    const purpleLight =
        new THREE.PointLight(
            0x8b5cf6,
            70,
            25
        );

    purpleLight.position.set(
        -4,
        4,
        3
    );

    scene.add(
        purpleLight
    );


    // ---------------------------------
    // BLUE ROOM LIGHT
    // ---------------------------------

    const blueLight =
        new THREE.PointLight(
            0x00d4ff,
            35,
            20
        );

    blueLight.position.set(
        4,
        3,
        3
    );

    scene.add(
        blueLight
    );


    // ---------------------------------
    // PURPLE BACK LIGHT
    // ---------------------------------

    const purpleBackLight =
        new THREE.PointLight(
            0x6d28d9,
            60,
            25
        );

    purpleBackLight.position.set(
        0,
        4,
        -4
    );

    scene.add(
        purpleBackLight
    );


    // ---------------------------------
    // FRONT LIGHT
    // ---------------------------------

    const frontLight =
        new THREE.DirectionalLight(
            0xffffff,
            1.5
        );

    frontLight.position.set(
        0,
        5,
        8
    );

    scene.add(
        frontLight
    );


    // =================================
    // LOAD MODEL
    // =================================

    const loader =
        new GLTFLoader();


    loader.load(

        modelUrl,

        gltf => {

            console.log(
                'Samenwerken model geladen'
            );

             


            model =
                gltf.scene;

                model.position.y = -2;


            // =================================
            // ORIGINAL BOUNDING BOX
            // =================================

            const box =
                new THREE.Box3()
                    .setFromObject(
                        model
                    );


            const size =
                box.getSize(
                    new THREE.Vector3()
                );


            const center =
                box.getCenter(
                    new THREE.Vector3()
                );


            console.log(
                'Model size:',
                size
            );


            console.log(
                'Model center:',
                center
            );


            // =================================
            // CENTER MODEL
            // =================================

            model.position.x =
                -center.x;

            model.position.y =
                -center.y;

            model.position.z =
                -center.z;


            // =================================
            // SCALE MODEL
            // =================================

            const maxDimension =
                Math.max(
                    size.x,
                    size.y,
                    size.z
                );


            const targetSize =
                3.2;


            const scale =
                targetSize /
                maxDimension;


            model.scale.setScalar(
                scale
            );


            // =================================
            // ROTATION
            // =================================

            model.rotation.y =
                Math.PI + 0.8;


            // =================================
            // ADD MODEL TO SCENE
            // =================================

            scene.add(
                model
            );


            // =================================
            // RECALCULATE BOUNDING BOX
            // =================================

            const scaledBox =
                new THREE.Box3()
                    .setFromObject(
                        model
                    );


            const scaledCenter =
                scaledBox.getCenter(
                    new THREE.Vector3()
                );


            const scaledSize =
                scaledBox.getSize(
                    new THREE.Vector3()
                );


            console.log(
                'Scaled size:',
                scaledSize
            );


            // =================================
            // FINAL CENTERING
            // =================================

            model.position.x -=
                scaledCenter.x;

            model.position.y -=
                scaledCenter.y;

            model.position.z -=
                scaledCenter.z;


            // =================================
            // VERTICAL POSITION
            // =================================

            /*
             * Het model is eerst volledig
             * gecentreerd.
             *
             * Daarna plaatsen we het
             * iets hoger in het canvas.
             */
            model.position.y +=
                modelYOffset;


            // =================================
            // CAMERA
            // =================================

            camera.position.set(
                0,
                0.8,
                7.5
            );

            camera.lookAt(
                0,
                1.8,
                0
            );


            // =================================
            // RESIZE
            // =================================

            resizeScene();

        },


        // =================================
        // PROGRESS
        // =================================

        xhr => {

            if (xhr.total > 0) {

                const progress =
                    (
                        xhr.loaded /
                        xhr.total
                    ) *
                    100;


                console.log(
                    `Model laden: ${progress.toFixed(0)}%`
                );

            }

        },


        // =================================
        // ERROR
        // =================================

        error => {

            console.error(
                'Kon samenwerken.glb niet laden:',
                error
            );

        }

    );


    // =================================
    // INITIAL RESIZE
    // =================================

    resizeScene();

}


// =====================================
// RESIZE
// =====================================

function resizeScene() {

    if (
        !sceneContainer.value ||
        !renderer ||
        !camera
    ) {
        return;
    }


    const width =
        sceneContainer.value.clientWidth;


    const height =
        sceneContainer.value.clientHeight;


    if (
        width <= 0 ||
        height <= 0
    ) {
        return;
    }


    // ---------------------------------
    // CAMERA
    // ---------------------------------

    camera.aspect =
        width /
        height;


    camera.updateProjectionMatrix();


    // ---------------------------------
    // RENDERER
    // ---------------------------------

    renderer.setSize(
        width,
        height,
        false
    );

}


// =====================================
// ANIMATION
// =====================================

function animate() {

    animationFrame =
        requestAnimationFrame(
            animate
        );


    if (model) {

        // ---------------------------------
        // LANGZAME ROTATIE
        // ---------------------------------

        model.rotation.y +=
            rotationSpeed;

    }


    if (
        renderer &&
        scene &&
        camera
    ) {

        renderer.render(
            scene,
            camera
        );

    }

}


// =====================================
// LIFECYCLE
// =====================================

onMounted(() => {

    initScene();


    window.addEventListener(
        'resize',
        resizeScene
    );


    animate();

});


// =====================================
// CLEANUP
// =====================================

onUnmounted(() => {

    window.removeEventListener(
        'resize',
        resizeScene
    );


    // ---------------------------------
    // STOP ANIMATION
    // ---------------------------------

    if (
        animationFrame !== null
    ) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame = null;

    }


    // ---------------------------------
    // DISPOSE MODEL
    // ---------------------------------

    if (model) {

        model.traverse(
            child => {

                if (
                    child instanceof
                    THREE.Mesh
                ) {

                    child.geometry.dispose();


                    if (
                        Array.isArray(
                            child.material
                        )
                    ) {

                        child.material.forEach(
                            material => {

                                material.dispose();

                            }
                        );

                    } else {

                        child.material.dispose();

                    }

                }

            }
        );

    }


    // ---------------------------------
    // DISPOSE RENDERER
    // ---------------------------------

    renderer?.dispose();

});

</script>


<template>

    <div
        ref="sceneContainer"
        class="contact-scene"
    ></div>

</template>


<style scoped>

.contact-scene {

    position: relative;

    width: 100%;

    height: 100%;

    min-height: 520px;

    overflow: hidden;

}


.contact-scene :deep(canvas) {

    display: block;

    width: 100% !important;

    height: 100% !important;

}


/* =====================================
   TABLET
===================================== */

@media (max-width: 991px) {

    .contact-scene {

        min-height: 450px;

        height: 450px;

    }

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 576px) {

    .contact-scene {

        min-height: 350px;

        height: 350px;

    }

}

</style>