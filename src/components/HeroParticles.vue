```vue
<script setup lang="ts">

import {
    onMounted,
    onUnmounted,
    ref
} from 'vue';


// =====================================
// DOM
// =====================================

const heroParticles =
    ref<HTMLDivElement | null>(null);


// =====================================
// PARTICLE INTERFACE
// =====================================

interface Particle {

    element: HTMLDivElement;

    x: number;
    y: number;

    baseX: number;
    baseY: number;

    phaseX: number;
    phaseY: number;

    speedX: number;
    speedY: number;

    amplitudeX: number;
    amplitudeY: number;

    size: number;

}


// =====================================
// STATE
// =====================================

const particles: Particle[] = [];

let animationFrame:
    number | null = null;


// =====================================
// MOUSE
// =====================================

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;


// =====================================
// SETTINGS
// =====================================

const PARTICLE_COUNT = 60;

const MOUSE_RADIUS = 180;

const MOUSE_FORCE = 0.035;


// =====================================
// CREATE PARTICLES
// =====================================

function createParticles() {

    if (!heroParticles.value) {
        return;
    }


    const container =
        heroParticles.value;


    particles.length = 0;


    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const element =
            document.createElement('div');


        element.className =
            'hero-particle';


        // =================================
        // SIZE
        // =================================

        const size =
            Math.random() * 4 + 1;


        const glow =
            Math.random();


        element.style.boxShadow = `
            0 0 ${4 + glow * 4}px
            rgba(
                255,
                255,
                255,
                ${0.5 + glow * 0.5}
            ),

            0 0 ${8 + glow * 8}px
            rgba(
                167,
                139,
                250,
                ${0.6 + glow * 0.4}
            ),

            0 0 ${18 + glow * 20}px
            rgba(
                139,
                92,
                246,
                ${0.4 + glow * 0.4}
            )
        `;


        // =================================
        // POSITION
        // =================================

        const x =
            Math.random() * 100;

        const y =
            Math.random() * 100;


        // =================================
        // MOVEMENT
        // =================================

        const phaseX =
            Math.random() *
            Math.PI *
            2;


        const phaseY =
            Math.random() *
            Math.PI *
            2;


        const speedX =
            Math.random() *
            0.012 +
            0.003;


        const speedY =
            Math.random() *
            0.012 +
            0.003;


        const amplitudeX =
            Math.random() *
            35 +
            15;


        const amplitudeY =
            Math.random() *
            35 +
            15;


        // =================================
        // STYLE
        // =================================

        element.style.width =
            `${size}px`;


        element.style.height =
            `${size}px`;


        element.style.left =
            `${x}%`;


        element.style.top =
            `${y}%`;


        element.style.opacity =
            `${Math.random() * 0.45 + 0.2}`;


        // =================================
        // ADD
        // =================================

        container.appendChild(
            element
        );


        // =================================
        // STORE
        // =================================

        particles.push({

            element,

            x,
            y,

            baseX: x,
            baseY: y,

            phaseX,
            phaseY,

            speedX,
            speedY,

            amplitudeX,
            amplitudeY,

            size

        });

    }

}


// =====================================
// ANIMATE
// =====================================

function animateParticles() {

    if (!heroParticles.value) {
        return;
    }


    const container =
        heroParticles.value;


    // =================================
    // SMOOTH MOUSE
    // =================================

    mouseX +=
        (
            targetMouseX -
            mouseX
        ) * 0.08;


    mouseY +=
        (
            targetMouseY -
            mouseY
        ) * 0.08;


    // =================================
    // CONTAINER
    // =================================

    const rect =
        container.getBoundingClientRect();


    if (
        rect.width === 0 ||
        rect.height === 0
    ) {

        animationFrame =
            requestAnimationFrame(
                animateParticles
            );

        return;

    }


    // =================================
    // CURSOR %
    // =================================

    const cursorX =
        (
            mouseX -
            rect.left
        ) /
        rect.width *
        100;


    const cursorY =
        (
            mouseY -
            rect.top
        ) /
        rect.height *
        100;


    // =================================
    // PARTICLES
    // =================================

    particles.forEach(
        particle => {

            particle.phaseX +=
                particle.speedX;


            particle.phaseY +=
                particle.speedY;


            // -----------------------------
            // FLOATING MOTION
            // -----------------------------

            const movementX =
                Math.sin(
                    particle.phaseX
                ) *
                particle.amplitudeX;


            const movementY =
                Math.cos(
                    particle.phaseY
                ) *
                particle.amplitudeY;


            // -----------------------------
            // BASE POSITION
            // -----------------------------

            let targetX =
                particle.baseX;


            let targetY =
                particle.baseY;


            // -----------------------------
            // DISTANCE
            // -----------------------------

            const dx =
                cursorX -
                particle.baseX;


            const dy =
                cursorY -
                particle.baseY;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            const radius =
                (
                    MOUSE_RADIUS /
                    rect.width
                ) *
                100;


            // -----------------------------
            // MOUSE FORCE
            // -----------------------------

            if (
                distance < radius
            ) {

                const force =
                    (
                        1 -
                        distance /
                        radius
                    ) *
                    MOUSE_FORCE;


                targetX +=
                    dx *
                    force *
                    100;


                targetY +=
                    dy *
                    force *
                    100;

            }


            // -----------------------------
            // APPLY
            // -----------------------------

            particle.element.style.left =
                `${targetX}%`;


            particle.element.style.top =
                `${targetY}%`;


            particle.element.style.transform =
                `translate3d(
                    ${movementX}px,
                    ${movementY}px,
                    0
                )`;

        }
    );


    // =================================
    // NEXT FRAME
    // =================================

    animationFrame =
        requestAnimationFrame(
            animateParticles
        );

}


// =====================================
// MOUSE MOVE
// =====================================

function handleMouseMove(
    event: MouseEvent
) {

    targetMouseX =
        event.clientX;


    targetMouseY =
        event.clientY;


    if (!heroParticles.value) {
        return;
    }


    const hero =
        heroParticles.value.parentElement;


    if (!hero) {
        return;
    }


    const rect =
        hero.getBoundingClientRect();


    const x =
        (
            (
                event.clientX -
                rect.left
            ) /
            rect.width
        ) *
        100;


    const y =
        (
            (
                event.clientY -
                rect.top
            ) /
            rect.height
        ) *
        100;


    hero.style.setProperty(
        '--cursor-x',
        `${x}%`
    );


    hero.style.setProperty(
        '--cursor-y',
        `${y}%`
    );

}


// =====================================
// MOUSE LEAVE
// =====================================

function handleMouseLeave() {

    if (!heroParticles.value) {
        return;
    }


    const rect =
        heroParticles.value
            .getBoundingClientRect();


    targetMouseX =
        rect.left +
        rect.width / 2;


    targetMouseY =
        rect.top +
        rect.height / 2;

}


// =====================================
// LIFECYCLE
// =====================================

onMounted(() => {

    createParticles();


    if (heroParticles.value) {

        const rect =
            heroParticles.value
                .getBoundingClientRect();


        mouseX =
            rect.left +
            rect.width / 2;


        mouseY =
            rect.top +
            rect.height / 2;


        targetMouseX =
            mouseX;


        targetMouseY =
            mouseY;

    }


    window.addEventListener(
        'mousemove',
        handleMouseMove
    );


    window.addEventListener(
        'mouseleave',
        handleMouseLeave
    );


    animationFrame =
        requestAnimationFrame(
            animateParticles
        );

});


// =====================================
// CLEANUP
// =====================================

onUnmounted(() => {

    window.removeEventListener(
        'mousemove',
        handleMouseMove
    );


    window.removeEventListener(
        'mouseleave',
        handleMouseLeave
    );


    if (
        animationFrame !== null
    ) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame = null;

    }


    particles.forEach(
        particle => {

            particle.element.remove();

        }
    );


    particles.length = 0;

});

</script>


<template>

    <div
        ref="heroParticles"
        class="hero-particles"
        aria-hidden="true"
    ></div>

</template>


<style scoped>

.hero-particles {

    position: absolute;

    inset: 0;

    overflow: hidden;

    pointer-events: none;

    z-index: 1;

}


.hero-particles :deep(.hero-particle) {

    position: absolute;

    border-radius: 50%;

    background: #a78bfa;

    pointer-events: none;

    z-index: 1;

    will-change:
        left,
        top,
        transform;

}

</style>
```
