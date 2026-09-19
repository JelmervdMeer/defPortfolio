<script setup lang="ts">

import {
    onMounted,
    onUnmounted,
    ref
} from 'vue';

import { RouterLink } from 'vue-router';


// =====================================
// PARTICLE SYSTEM
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
// PARTICLE STATE
// =====================================

const heroParticles =
    ref<HTMLDivElement | null>(null);

const particles: Particle[] = [];

let particleAnimationFrame:
    number | null = null;


// =====================================
// MOUSE STATE
// =====================================

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;


// =====================================
// PARTICLE SETTINGS
// =====================================

const PARTICLE_COUNT = 60;

const MOUSE_RADIUS = 180;

const MOUSE_FORCE = 0.035;


// =====================================
// CREATE PARTICLES
// =====================================

function createParticles(): void {

    if (!heroParticles.value) {
        return;
    }

    const container =
        heroParticles.value;


    // ---------------------------------
    // REMOVE EXISTING PARTICLES
    // ---------------------------------

    particles.forEach(
        particle => {

            particle.element.remove();

        }
    );

    particles.length = 0;


    // ---------------------------------
    // CREATE PARTICLES
    // ---------------------------------

    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const element =
            document.createElement('div');

        element.className =
            'hero-particle';


        // ---------------------------------
        // RANDOM SIZE
        // ---------------------------------

        const size =
            Math.random() * 4 + 1;


        // ---------------------------------
        // RANDOM GLOW
        // ---------------------------------

        const glow =
            Math.random();

        element.style.boxShadow = `
            0 0 ${4 + glow * 4}px
            rgba(255, 255, 255, ${0.5 + glow * 0.5}),

            0 0 ${8 + glow * 8}px
            rgba(167, 139, 250, ${0.6 + glow * 0.4}),

            0 0 ${18 + glow * 20}px
            rgba(139, 92, 246, ${0.4 + glow * 0.4})
        `;


        // ---------------------------------
        // RANDOM START POSITION
        // ---------------------------------

        const x =
            Math.random() * 100;

        const y =
            Math.random() * 100;


        // ---------------------------------
        // RANDOM MOVEMENT
        // ---------------------------------

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


        // ---------------------------------
        // ELEMENT SIZE
        // ---------------------------------

        element.style.width =
            `${size}px`;

        element.style.height =
            `${size}px`;


        // ---------------------------------
        // INITIAL POSITION
        // ---------------------------------

        element.style.left =
            `${x}%`;

        element.style.top =
            `${y}%`;


        // ---------------------------------
        // RANDOM OPACITY
        // ---------------------------------

        element.style.opacity =
            `${Math.random() * 0.45 + 0.2}`;


        // ---------------------------------
        // ADD TO DOM
        // ---------------------------------

        container.appendChild(
            element
        );


        // ---------------------------------
        // STORE PARTICLE
        // ---------------------------------

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
// PARTICLE ANIMATION
// =====================================

function animateParticles(): void {

    if (!heroParticles.value) {
        return;
    }

    const container =
        heroParticles.value;


    // ---------------------------------
    // SMOOTH MOUSE MOVEMENT
    // ---------------------------------

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


    // ---------------------------------
    // CONTAINER POSITION
    // ---------------------------------

    const rect =
        container.getBoundingClientRect();


    if (
        rect.width === 0 ||
        rect.height === 0
    ) {

        particleAnimationFrame =
            requestAnimationFrame(
                animateParticles
            );

        return;

    }


    // ---------------------------------
    // CURSOR POSITION IN %
    // ---------------------------------

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


    // ---------------------------------
    // PARTICLES
    // ---------------------------------

    particles.forEach(
        particle => {


            // ---------------------------------
            // UNIQUE TIME
            // ---------------------------------

            particle.phaseX +=
                particle.speedX;

            particle.phaseY +=
                particle.speedY;


            // ---------------------------------
            // NATURAL FLOATING MOTION
            // ---------------------------------

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


            // ---------------------------------
            // TARGET POSITION
            // ---------------------------------

            let targetX =
                particle.baseX;

            let targetY =
                particle.baseY;


            // ---------------------------------
            // CURSOR DISTANCE
            // ---------------------------------

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


            // ---------------------------------
            // CURSOR INTERACTION
            // ---------------------------------

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


            // ---------------------------------
            // APPLY POSITION
            // ---------------------------------

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


    // ---------------------------------
    // NEXT FRAME
    // ---------------------------------

    particleAnimationFrame =
        requestAnimationFrame(
            animateParticles
        );

}


// =====================================
// MOUSE MOVE
// =====================================

function handleMouseMove(
    event: MouseEvent
): void {

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

function handleMouseLeave(): void {

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
// REVEAL ANIMATION
// =====================================

let revealObserver:
    IntersectionObserver | null = null;


function setupRevealObserver(): void {

    const elements =
        document.querySelectorAll(
            '.home-hero .reveal'
        );


    if (!elements.length) {
        return;
    }


    // ---------------------------------
    // MOBILE
    // ---------------------------------

    if (
        window.matchMedia(
            '(max-width: 768px)'
        ).matches
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    'revealed'
                );

            }
        );

        return;

    }


    // ---------------------------------
    // DESKTOP OBSERVER
    // ---------------------------------

    revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target
                            .classList
                            .add(
                                'revealed'
                            );


                        revealObserver
                            ?.unobserve(
                                entry.target
                            );

                    }
                );

            },
            {
                threshold:
                    0.1
            }
        );


    elements.forEach(
        element => {

            revealObserver
                ?.observe(
                    element
                );

        }
    );

}


// =====================================
// LIFECYCLE
// =====================================

onMounted(() => {

    // ---------------------------------
    // CREATE PARTICLES
    // ---------------------------------

    createParticles();


    // ---------------------------------
    // INITIAL MOUSE POSITION
    // ---------------------------------

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


    // ---------------------------------
    // MOUSE EVENTS
    // ---------------------------------

    window.addEventListener(
        'mousemove',
        handleMouseMove
    );


    window.addEventListener(
        'mouseleave',
        handleMouseLeave
    );


    // ---------------------------------
    // START PARTICLES
    // ---------------------------------

    particleAnimationFrame =
        requestAnimationFrame(
            animateParticles
        );


    // ---------------------------------
    // REVEAL
    // ---------------------------------

    requestAnimationFrame(
        () => {

            setupRevealObserver();

        }
    );

});


onUnmounted(() => {

    // ---------------------------------
    // MOUSE EVENTS
    // ---------------------------------

    window.removeEventListener(
        'mousemove',
        handleMouseMove
    );


    window.removeEventListener(
        'mouseleave',
        handleMouseLeave
    );


    // ---------------------------------
    // PARTICLE ANIMATION
    // ---------------------------------

    if (
        particleAnimationFrame !== null
    ) {

        cancelAnimationFrame(
            particleAnimationFrame
        );

        particleAnimationFrame =
            null;

    }


    // ---------------------------------
    // REMOVE PARTICLES
    // ---------------------------------

    particles.forEach(
        particle => {

            particle.element.remove();

        }
    );


    particles.length = 0;


    // ---------------------------------
    // REVEAL OBSERVER
    // ---------------------------------

    revealObserver?.disconnect();

    revealObserver =
        null;

});

</script>


<template>

    <section class="home-hero">


        <!-- =====================================
             PARTICLES
        ====================================== -->

        <div
            ref="heroParticles"
            class="hero-particles"
            aria-hidden="true"
        ></div>


        <!-- =====================================
             CURSOR GLOW
        ====================================== -->

        <div
            class="hero-cursor-glow"
            aria-hidden="true"
        ></div>


        <!-- =====================================
             HERO CONTENT
        ====================================== -->

        <div class="container">

            <div class="hero-content">


                <!-- =====================================
                     HERO TEXT
                ====================================== -->

                <div class="hero-title-content">


                    <!-- LABEL -->

                    <div class="hero-label reveal">

                        FREELANCE WEB DEVELOPER

                    </div>


                    <!-- TITLE -->

                    <h1 class="hero-title reveal">

                        Ik maak digitale

                        <span
                            class="animated-gradient-text"
                        >
                            oplossingen
                        </span>.

                    </h1>


                    <!-- DESCRIPTION -->

                    <p
                        class="
                            hero-description
                            reveal
                        "
                    >

                        Ik ontwerp en ontwikkel digitale
                        ervaringen waarin techniek,
                        creativiteit en functionaliteit
                        samenkomen.

                    </p>

                </div>


                <!-- =====================================
                     HERO ACTIONS
                ====================================== -->

                <div class="hero-actions reveal">

                    <div class="hero-buttons">

                        <RouterLink
                            to="/projects"
                            class="
                                btn
                                btn-primary
                                btn-lg
                            "
                        >

                            Bekijk mijn werk

                            <i
                                class="
                                    bi
                                    bi-arrow-right
                                    ms-2
                                "
                            ></i>

                        </RouterLink>


                        <RouterLink
                            to="/contact"
                            class="
                                btn
                                btn-outline-light
                                btn-lg
                            "
                        >

                            Laten we samenwerken

                            <i
                                class="
                                    bi
                                    bi-chat-dots
                                    ms-2
                                "
                            ></i>

                        </RouterLink>

                    </div>

                </div>

            </div>


            <!-- =====================================
                 TECHNOLOGY MARQUEE
            ====================================== -->

            <div
                class="
                    technology-marquee
                    reveal
                "
            >

                <div
                    class="
                        technology-marquee-track
                    "
                >


                    <!-- GROUP 1 -->

                    <div class="technology-group">

                        <span>THREE.JS</span>
                        <span>TYPESCRIPT</span>
                        <span>VUE</span>
                        <span>LARAVEL</span>
                        <span>JAVASCRIPT</span>
                        <span>BLENDER</span>
                        <span>PHP</span>
                        <span>SQL</span>
                        <span>UML</span>
                        <span>PYTHON</span>

                    </div>


                    <!-- GROUP 2
                         Duplicate is necessary
                         for seamless animation -->

                    <div
                        class="technology-group"
                        aria-hidden="true"
                    >

                        <span>THREE.JS</span>
                        <span>TYPESCRIPT</span>
                        <span>VUE</span>
                        <span>LARAVEL</span>
                        <span>JAVASCRIPT</span>
                        <span>BLENDER</span>
                        <span>PHP</span>
                        <span>SQL</span>
                        <span>UML</span>
                        <span>PYTHON</span>

                    </div>

                </div>

            </div>

        </div>

    </section>

</template>


<style scoped>

/* =====================================
   HERO
===================================== */

.home-hero {

    --cursor-x:
        50%;

    --cursor-y:
        50%;

    position:
        relative;

    display:
        grid;

    grid-template-rows:
        1fr
        auto;

    width:
        100%;

    min-height:
        100vh;

    overflow:
        hidden;

    padding:
        190px
        0
        0;

    background:
        radial-gradient(
            circle at 75% 35%,
            rgba(139, 92, 246, 0.10),
            transparent 35%
        ),
        radial-gradient(
            circle at 20% 70%,
            rgba(34, 211, 238, 0.05),
            transparent 30%
        ),
        var(--color-bg);

}


/* =====================================
   PARTICLES
===================================== */

.hero-particles {

    position:
        absolute;

    inset:
        0;

    width:
        100%;

    height:
        100%;

    overflow:
        hidden;

    pointer-events:
        none;

    z-index:
        1;

}


:deep(.hero-particle) {

    position:
        absolute;

    border-radius:
        50%;

    background:
        #a78bfa;

    pointer-events:
        none;

    z-index:
        1;

    will-change:
        left,
        top,
        transform;

}


/* =====================================
   CURSOR GLOW
===================================== */

.hero-cursor-glow {

    position:
        absolute;

    inset:
        0;

    pointer-events:
        none;

    z-index:
        0;

    background:
        radial-gradient(
            circle 220px at
            var(--cursor-x, 50%)
            var(--cursor-y, 50%),

            rgba(139, 92, 246, 0.14),

            rgba(139, 92, 246, 0.05) 35%,

            transparent 70%
        );

}


/* =====================================
   HERO CONTAINER
===================================== */

.home-hero > .container {

    position:
        relative;

    z-index:
        2;

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        space-between;

    width:
        100%;

    min-height:
        calc(
            100vh -
            190px
        );

}


/* =====================================
   HERO CONTENT
===================================== */

.hero-content {

    display:
        flex;

    align-items:
        center;

    justify-content:
        space-between;

    gap:
        80px;

    width:
        100%;

    flex:
        1;

}


/* =====================================
   HERO TITLE
===================================== */

.hero-title-content {

    width:
        calc(
            100% -
            460px
        );

    max-width:
        900px;

}


.hero-label {

    margin-bottom:
        24px;

    color:
        var(--color-secondary);

    font-family:
        var(--font-body);

    font-size:
        0.8rem;

    font-weight:
        700;

    letter-spacing:
        0.18em;

}


.hero-title {

    margin:
        0;

    color:
        var(--color-text);

    font-family:
        var(--font-heading);

    font-size:
        clamp(
            3.5rem,
            7vw,
            7rem
        );

    font-weight:
        600;

    line-height:
        1.20;

    letter-spacing:
        -0.045em;

}


.hero-description {

    max-width:
        680px;

    margin:
        32px
        0
        0;

    color:
        var(--color-text-muted);

    font-family:
        var(--font-body);

    font-size:
        1.1rem;

    line-height:
        1.7;

}


/* =====================================
   ANIMATED GRADIENT
===================================== */

.animated-gradient-text {

    display:
        inline-block;

    background:
        linear-gradient(
            90deg,
            var(--color-primary),
            var(--color-primary-light),
            var(--color-secondary),
            var(--color-primary)
        );

    background-size:
        300%
        auto;

    -webkit-background-clip:
        text;

    background-clip:
        text;

    -webkit-text-fill-color:
        transparent;

    animation:
        heroGradientMove
        6s
        ease
        infinite;

}


@keyframes heroGradientMove {

    0% {

        background-position:
            0%
            center;

    }

    50% {

        background-position:
            100%
            center;

    }

    100% {

        background-position:
            0%
            center;

    }

}


/* =====================================
   HERO ACTIONS
===================================== */

.hero-actions {

    flex:
        0
        0
        380px;

    width:
        380px;

}


.hero-buttons {

    display:
        flex;

    flex-direction:
        column;

    gap:
        24px;

    width:
        100%;

}


.hero-buttons .btn {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    width:
        100%;

    min-height:
        58px;

    font-family:
        var(--font-body);

    font-weight:
        600;

}


/* =====================================
   TECHNOLOGY MARQUEE
===================================== */

.technology-marquee {

    position:
        relative;

    width:
        100%;

    margin-top:
        70px;

    padding:
        28px
        0;

    overflow:
        hidden;

    border-top:
        1px solid
        rgba(
            255,
            255,
            255,
            0.06
        );

    border-bottom:
        1px solid
        rgba(
            255,
            255,
            255,
            0.06
        );

}


/* =====================================
   MARQUEE EDGE FADES
===================================== */

.technology-marquee::before,
.technology-marquee::after {

    position:
        absolute;

    top:
        0;

    bottom:
        0;

    z-index:
        2;

    width:
        120px;

    content:
        '';

    pointer-events:
        none;

}


.technology-marquee::before {

    left:
        0;

    background:
        linear-gradient(
            90deg,
            var(--color-bg),
            transparent
        );

}


.technology-marquee::after {

    right:
        0;

    background:
        linear-gradient(
            270deg,
            var(--color-bg),
            transparent
        );

}


/* =====================================
   TECHNOLOGY TRACK
===================================== */

.technology-marquee-track {

    display:
        flex;

    width:
        max-content;

    animation:
        techMarqueeMove
        20s
        linear
        infinite;

}


/* =====================================
   TECHNOLOGY GROUP
===================================== */

.technology-group {

    display:
        flex;

    align-items:
        center;

    gap:
        0;

    padding-right:
        0;

    white-space:
        nowrap;

}


/* =====================================
   TECHNOLOGY ITEM
===================================== */

.technology-group span {

    display:
        flex;

    align-items:
        center;

    color:
        rgba(
            245,
            245,
            247,
            0.45
        );

    font-family:
        var(--font-heading);

    font-size:
        0.75rem;

    font-weight:
        600;

    letter-spacing:
        0.16em;

    transition:
        color
        0.3s
        ease;

}


.technology-group span:hover {

    color:
        var(--color-primary-light);

}


/* =====================================
   GLOW SEPARATOR DOT
===================================== */

.technology-group span::after {

    display:
        block;

    flex-shrink:
        0;

    width:
        6px;

    height:
        6px;

    margin:
        0
        34px;

    border-radius:
        50%;

    content:
        '';

    background:
        var(--color-primary-light);

    box-shadow:
        0 0 5px
        rgba(
            167,
            139,
            250,
            1
        ),

        0 0 10px
        rgba(
            139,
            92,
            246,
            0.95
        ),

        0 0 20px
        rgba(
            139,
            92,
            246,
            0.65
        ),

        0 0 30px
        rgba(
            139,
            92,
            246,
            0.30
        );

    animation:
        techSeparatorGlow
        2.2s
        ease-in-out
        infinite;

}


/* =====================================
   SEPARATOR ANIMATION
===================================== */

@keyframes techSeparatorGlow {

    0%,
    100% {

        opacity:
            0.55;

        transform:
            scale(0.8);

        box-shadow:
            0 0 4px
            rgba(
                167,
                139,
                250,
                0.8
            ),

            0 0 10px
            rgba(
                139,
                92,
                246,
                0.55
            );

    }

    50% {

        opacity:
            1;

        transform:
            scale(1.2);

        box-shadow:
            0 0 6px
            rgba(
                196,
                181,
                253,
                1
            ),

            0 0 14px
            rgba(
                167,
                139,
                250,
                1
            ),

            0 0 26px
            rgba(
                139,
                92,
                246,
                0.75
            );

    }

}


/* =====================================
   MARQUEE ANIMATION
===================================== */

@keyframes techMarqueeMove {

    from {

        transform:
            translateX(0);

    }

    to {

        transform:
            translateX(-50%);

    }

}


/* =====================================
   REVEAL ANIMATION
===================================== */

.reveal {

    opacity:
        0;

    transform:
        translateY(30px);

    transition:
        opacity
        0.8s
        ease,

        transform
        0.8s
        ease;

}


.reveal.revealed {

    opacity:
        1;

    transform:
        translateY(0);

}


/* =====================================
   TABLET
===================================== */

@media (max-width: 991px) {

    .home-hero {

        padding-top:
            170px;

    }


    .home-hero > .container {

        min-height:
            calc(
                100vh -
                170px
            );

    }


    .hero-content {

        flex-direction:
            column;

        align-items:
            center;

        gap:
            40px;

        text-align:
            center;

    }


    .hero-title-content {

        width:
            100%;

        max-width:
            850px;

    }


    .hero-actions {

        width:
            100%;

        max-width:
            380px;

        flex:
            none;

    }


    .hero-description {

        margin-left:
            auto;

        margin-right:
            auto;

    }


    .technology-marquee {

        margin-top:
            60px;

    }

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 768px) {

    .home-hero {

        display:
            block;

        width:
            100%;

        min-height:
            100svh;

        height:
            auto;

        padding:
            110px
            0
            0;

        overflow-x:
            hidden;

        overflow-y:
            visible;

    }


    .home-hero > .container {

        position:
            relative;

        z-index:
            2;

        display:
            block;

        width:
            100%;

        min-height:
            0;

        height:
            auto;

    }


    /* =====================================
       FORCE HERO CONTENT VISIBLE
    ===================================== */

    .home-hero .reveal,
    .home-hero .reveal.revealed {

        opacity:
            1 !important;

        visibility:
            visible !important;

        transform:
            none !important;

    }


    /* =====================================
       HERO CONTENT
    ===================================== */

    .hero-content {

        display:
            flex;

        flex-direction:
            column;

        align-items:
            stretch;

        justify-content:
            flex-start;

        gap:
            36px;

        width:
            100%;

        height:
            auto;

        min-height:
            0;

        text-align:
            center;

    }


    /* =====================================
       HERO TEXT
    ===================================== */

    .hero-title-content {

        display:
            block;

        position:
            relative;

        width:
            100%;

        max-width:
            100%;

        height:
            auto;

        min-height:
            0;

        margin:
            0;

        padding:
            0;

        opacity:
            1;

        visibility:
            visible;

    }


    .hero-label {

        display:
            block;

        position:
            relative;

        width:
            100%;

        margin:
            0
            0
            18px;

        color:
            var(--color-secondary);

        font-size:
            0.7rem;

        opacity:
            1 !important;

        visibility:
            visible !important;

    }


    .hero-title {

        display:
            block;

        position:
            relative;

        width:
            100%;

        margin:
            0;

        color:
            var(--color-text);

        font-size:
            clamp(
                2.6rem,
                11vw,
                4.5rem
            );

        line-height:
            1.05;

        opacity:
            1 !important;

        visibility:
            visible !important;

    }


    .animated-gradient-text {

        display:
            inline;

        opacity:
            1;

        visibility:
            visible;

    }


    .hero-description {

        display:
            block;

        position:
            relative;

        width:
            100%;

        max-width:
            600px;

        margin:
            24px
            auto
            0;

        color:
            var(--color-text-muted);

        font-size:
            1rem;

        line-height:
            1.65;

        opacity:
            1 !important;

        visibility:
            visible !important;

    }


    /* =====================================
       HERO ACTIONS
    ===================================== */

    .hero-actions {

        display:
            block;

        position:
            relative;

        flex:
            none;

        width:
            100%;

        max-width:
            340px;

        height:
            auto;

        margin:
            0
            auto;

        opacity:
            1 !important;

        visibility:
            visible !important;

    }


    .hero-buttons {

        width:
            100%;

    }


    /* =====================================
       TECHNOLOGY MARQUEE
    ===================================== */

    .technology-marquee {

        display:
            block;

        position:
            relative;

        width:
            100%;

        margin-top:
            50px;

        padding:
            22px
            0;

        opacity:
            1 !important;

        visibility:
            visible !important;

        transform:
            none !important;

    }


    .technology-group span {

        font-size:
            0.7rem;

    }


    .technology-group span::after {

        width:
            5px;

        height:
            5px;

        margin:
            0
            24px;

    }

}


/* =====================================
   SMALL MOBILE
===================================== */

@media (max-width: 576px) {

    .home-hero {

        min-height:
            100svh;

        padding-top:
            110px;

    }


    .home-hero > .container {

        min-height:
            calc(
                100svh -
                110px
            );

    }


    .hero-content {

        gap:
            32px;

    }


    .hero-label {

        margin-bottom:
            18px;

        font-size:
            0.7rem;

    }


    .hero-title {

        font-size:
            clamp(
                2.6rem,
                12vw,
                3.8rem
            );

        line-height:
            0.98;

    }


    .hero-description {

        margin-top:
            24px;

        font-size:
            0.95rem;

    }


    .hero-buttons {

        gap:
            16px;

    }


    .hero-buttons .btn {

        min-height:
            54px;

        font-size:
            0.95rem;

    }


    .technology-marquee {

        margin-top:
            40px;

    }


    .technology-group span {

        font-size:
            0.65rem;

    }


    .technology-group span::after {

        width:
            4px;

        height:
            4px;

        margin:
            0
            18px;

        box-shadow:
            0 0 4px
            rgba(
                167,
                139,
                250,
                1
            ),

            0 0 10px
            rgba(
                139,
                92,
                246,
                0.75
            );

    }

}


/* =====================================
   REDUCED MOTION
===================================== */

@media (prefers-reduced-motion: reduce) {

    .technology-marquee-track {

        animation-duration:
            40s;

    }


    .technology-group span::after {

        animation:
            none;

    }


    .reveal {

        opacity:
            1;

        transform:
            translateY(0);

        transition:
            none;

    }

}

</style>