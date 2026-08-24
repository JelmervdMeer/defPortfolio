<script setup lang="ts">

import WorkDisciplines from '../components/WorkDisciplines.vue';

import {
    onMounted,
    onUnmounted,
    ref
} from 'vue';

import { projects } from '../data/projects';


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

const PARTICLE_COUNT = 45;

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


        // ---------------------------------
        // RANDOM SIZE
        // ---------------------------------

        const size =
            Math.random() * 4 + 1;

            const glow = Math.random();

            element.style.boxShadow = `
    0 0 ${4 + glow * 4}px rgba(255, 255, 255, ${0.5 + glow * 0.5}),
    0 0 ${8 + glow * 8}px rgba(167, 139, 250, ${0.6 + glow * 0.4}),
    0 0 ${18 + glow * 20}px rgba(139, 92, 246, ${0.4 + glow * 0.4})
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
            Math.random() * Math.PI * 2;

        const phaseY =
            Math.random() * Math.PI * 2;

        const speedX =
            Math.random() * 0.012 + 0.003;

        const speedY =
            Math.random() * 0.012 + 0.003;

        const amplitudeX =
            Math.random() * 35 + 15;

        const amplitudeY =
            Math.random() * 35 + 15;


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

function animateParticles() {

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
                        distance / radius
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

function handleMouseMove(event: MouseEvent) {

    targetMouseX = event.clientX;
    targetMouseY = event.clientY;

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
        ((event.clientX - rect.left) / rect.width) * 100;

    const y =
        ((event.clientY - rect.top) / rect.height) * 100;

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
// SCROLL REVEAL
// =====================================

let revealObserver:
    IntersectionObserver | null = null;


function setupRevealObserver() {

    const revealElements =
        document.querySelectorAll('.reveal');

    console.log(
        'REVEAL ELEMENTS:',
        revealElements.length,
        revealElements
    );

    revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        console.log(
                            'REVEAL:',
                            entry.target,
                            entry.isIntersecting
                        );

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                'is-visible'
                            );

                            revealObserver?.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );

    revealElements.forEach(
        element => {

            revealObserver?.observe(
                element
            );

        }
    );

}

// =====================================
// LIFECYCLE
// =====================================

onMounted(() => {

    createParticles();

    setupRevealObserver();


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
    // START ANIMATION
    // ---------------------------------

    particleAnimationFrame =
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
        particleAnimationFrame !== null
    ) {

        cancelAnimationFrame(
            particleAnimationFrame
        );

        particleAnimationFrame = null;

    }


    revealObserver?.disconnect();


    // ---------------------------------
    // REMOVE PARTICLES
    // ---------------------------------

    particles.forEach(
        particle => {

            particle.element.remove();

        }
    );

    particles.length = 0;

});

</script>


<template>

    <main>

        <!-- =====================================
             HERO
        ====================================== -->

        <section class="hero">

            <!-- PARTICLES -->

            <div
                ref="heroParticles"
                class="hero-particles"
                aria-hidden="true"
            ></div>


            <!-- HERO CONTENT -->

            <div class="container">

                <div class="hero-content">

                    <!-- LEFT -->

                    <div class="hero-title-content">

                        <div class="hero-label reveal">
                            FREELANCE DEVELOPER
                        </div>


                        <h1 class="page-title reveal">

                            Ik bouw

                            <span class="animated-gradient-text">
                                digitale ervaringen.
                            </span>

                        </h1>

                    </div>


                    <!-- RIGHT -->

                    <div class="hero-actions">

                        <p
                            class="hero-text reveal"
                            style="transition-delay: 100ms"
                        >
                            Ik ontwerp en ontwikkel interactieve
                            websites, 3D-ervaringen en software
                            waarin techniek en creativiteit
                            samenkomen.
                        </p>


                        <div
                            class="hero-buttons reveal"
                            style="transition-delay: 200ms"
                        >

                            <RouterLink
                                to="/projects"
                                class="btn btn-primary btn-lg"
                            >
                                Bekijk mijn projecten

                                <i class="bi bi-arrow-right ms-2"></i>
                            </RouterLink>


                            <RouterLink
                                to="/contact"
                                class="btn btn-outline-light btn-lg"
                            >
                                Neem contact op
                            </RouterLink>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =====================================
                 TECHNOLOGY MARQUEE
            ====================================== -->

            <div class="tech-marquee">

                <div class="tech-marquee-track">

                    <!-- GROUP 1 -->

                    <div class="tech-marquee-group">

                        <span>THREE.JS</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>TYPESCRIPT</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>VUE</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>LARAVEL</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>JAVASCRIPT</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>BLENDER</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>PHP</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>SQL</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>UML</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>PYTHON</span>
                        <span class="tech-marquee-dot">•</span>

                    </div>


                    <!-- GROUP 2 -->

                    <div class="tech-marquee-group">

                        <span>THREE.JS</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>TYPESCRIPT</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>VUE</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>LARAVEL</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>JAVASCRIPT</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>BLENDER</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>PHP</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>SQL</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>UML</span>
                        <span class="tech-marquee-dot">•</span>

                        <span>PYTHON</span>
                        <span class="tech-marquee-dot">•</span>

                    </div>

                </div>

            </div>

        </section>


        <!-- =====================================
             PROJECTS
        ====================================== -->

        <section class="projects-preview">

            <div class="container">

                <!-- PROJECT HEADING -->

                <div class="projects-heading reveal">

                    <div class="section-label">
                        PROJECTEN
                    </div>


                    <h2 class="home-section-heading">

                        Een selectie

                        <br />

                        van mijn

                        <span class="heading-accent">
                            werk.
                        </span>

                    </h2>


                    <p>
                        Een aantal projecten waarin techniek,
                        creativiteit en praktische oplossingen
                        samenkomen.
                    </p>

                </div>


                <!-- PROJECT GRID -->

                <div class="home-project-grid mt-5">

                    <div
    v-for="project in projects.slice(0, 3)"
    :key="project.slug"
    class="home-project-grid-item"
>

                        <RouterLink
                            :to="`/projects/${project.slug}`"
                            class="home-project-card h-100"
                        >

                            <!-- IMAGE -->

                            <div class="home-project-image">

                                <img
                                    :src="project.image"
                                    :alt="project.title"
                                />

                            </div>


                            <!-- CONTENT -->

                            <div
                                class="home-project-card-content"
                            >

                                <span
                                    class="home-project-category"
                                >
                                    {{ project.category }}
                                </span>


                                <h3>
                                    {{ project.title }}
                                </h3>


                                <p>
                                    {{ project.shortDescription }}
                                </p>


                                <!-- TECHNOLOGIES -->

                                <div
                                    class="home-project-technologies"
                                >

                                    <span
                                        v-for="technology in project.technologies"
                                        :key="technology"
                                        class="technology"
                                    >
                                        {{ technology }}
                                    </span>

                                </div>

                            </div>

                        </RouterLink>

                    </div>

                </div>


                <!-- ALL PROJECTS -->

                <div
                    class="
                        d-flex
                        justify-content-center
                        mt-5
                        reveal
                    "
                    style="transition-delay: 300ms"
                >

                    <RouterLink
                        to="/projects"
                        class="btn btn-primary btn-lg"
                    >

                        Bekijk alle projecten

                        <i
                            class="
                                bi
                                bi-arrow-right
                                ms-2
                            "
                        ></i>

                    </RouterLink>

                </div>

            </div>

        </section>


        <!-- =====================================
             WORK DISCIPLINES
        ====================================== -->

      

            <WorkDisciplines
                variant="home"
            />

       


        <!-- =====================================
             CONTACT
        ====================================== -->

        <!-- =====================================
     CONTACT
===================================== -->

<section class="contact-section">

    <div class="container">

        <div class="contact-section-content">

            <div class="contact-section-text reveal">

                <div class="section-label">
                    CONTACT
                </div>

                <h2>
                    Samen iets

                    <span class="animated-gradient-text">
                        geweldigs
                    </span>

                    <br />

                    bouwen?
                </h2>

                <p>
                    Heb je een idee, een project of een digitale uitdaging?
                    Ik denk graag mee over een passende oplossing.
                </p>

            </div>


            <div
                class="contact-actions reveal"
                style="transition-delay: 150ms"
            >

                <a
                    href="mailto:jouwmail@example.com"
                    class="btn btn-primary"
                >
                    Neem contact op

                    <i class="bi bi-arrow-right ms-2"></i>
                </a>


                <RouterLink
                    to="/about"
                    class="btn btn-outline-light"
                >
                    Meer over mij
                </RouterLink>

            </div>

        </div>

    </div>

</section>

    </main>

</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');



body {
    font-family: 'Space Grotesk', sans-serif;
}

h1,
h2,
h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
}

.home-section-heading {


    line-height: 0.95;

    letter-spacing: -0.05em;
}

/* =========================================
   HERO
========================================= */

.hero {
    --cursor-x: 50%;
    --cursor-y: 50%;

    display: grid;

    grid-template-rows: 1fr auto;

     position: relative;
    padding: 160px 0 0px;
    overflow: hidden;

    overflow: hidden;

    isolation: isolate;

    background:
        radial-gradient(
            circle at 20% 20%,
            rgba(108, 99, 255, 0.16),
            transparent 35%
        ),
        radial-gradient(
            circle at 80% 70%,
            rgba(0, 212, 255, 0.08),
            transparent 35%
        ),
        #08090d;
}


/* =========================================
   HERO ATMOSPHERE
========================================= */

.hero::before {
    content: "";

    position: absolute;

    top: 45%;
    left: 50%;

    width: 700px;
    height: 700px;

    transform: translate(-50%, -50%);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(139, 92, 246, 0.14) 0%,
            rgba(139, 92, 246, 0.06) 35%,
            transparent 70%
        );

    filter: blur(20px);

    pointer-events: none;

    z-index: -1;
}


.hero::after {
    content: "";

    position: absolute;

    top: var(--cursor-y);
    left: var(--cursor-x);

    width: 420px;
    height: 420px;

    transform: translate(-50%, -50%);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(139, 92, 246, 0.16) 0%,
            rgba(139, 92, 246, 0.07) 30%,
            transparent 70%
        );

    filter: blur(15px);

    pointer-events: none;

    transition:
        left 0.15s ease-out,
        top 0.15s ease-out;

    z-index: -1;
}


/* =========================================
   HERO CONTAINER
========================================= */

.hero .container {
    position: relative;

    z-index: 5;

    width: 100%;

    display: flex;

    align-items: center;
}


/* =========================================
   HERO CONTENT
========================================= */

.hero-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 80px;
}

.hero-title-content {
    flex: 1;
    min-width: 0;
}

.hero-actions {
    width: 380px;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    gap: 50px;
}

.hero-text {
    margin: 0;
}

.hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.hero-buttons .btn {
    width: 100%;
}



/* =========================================
   HERO LABEL
========================================= */

.hero-label {
    display: inline-flex;

    align-items: center;

    margin-bottom: 28px;

    
    font-weight: 600;

    letter-spacing: 0.22em;

    text-transform: uppercase;

  
}


.hero-label::before {
    content: "";

    width: 28px;
    height: 1px;

    margin-right: 12px;

    background: #8b5cf6;

    box-shadow:
        0 0 10px
        rgba(139, 92, 246, 0.8);
}


/* =========================================
   HERO TITLE
========================================= */

.hero h1 {
    max-width: 950px;

    margin: 0;

    color: #ffffff;

   

    font-weight: 700;

    line-height: 1.20;

    letter-spacing: -0.055em;
}






/* =========================================
   HERO TEXT
========================================= */

.hero-text {
    max-width: 650px;

    margin-top: 38px;

    margin-bottom: 0;

    color:
        rgba(255, 255, 255, 0.62);

   

    line-height: 1.8;
}


/* =========================================
   HERO BUTTONS
========================================= */

/*.hero-buttons {
    display: flex;

    align-items: center;

    gap: 14px;

    margin-top: 42px;

    animation:
        fadeUp
        0.9s
        cubic-bezier(0.16, 1, 0.3, 1)
        0.55s
        both;
}*/


/* =========================================
   HERO PARTICLES
========================================= */

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

/* =========================================
   HERO REVEAL DELAYS
========================================= */

.hero-label.reveal {
    transition-delay: 0ms;
}

.hero h1.reveal {
    transition-delay: 100ms;
}

.hero-text.reveal {
    transition-delay: 200ms;
}

.hero-buttons.reveal {
    transition-delay: 300ms;
}


/* =========================================
   SCROLL REVEAL
========================================= */

.reveal,
.reveal-left,
.reveal-right {
    opacity: 0;

    transition:
        opacity 700ms ease,
        transform 700ms cubic-bezier(.2, .8, .2, 1);
}

.reveal {
    transform: translateY(50px);
}

.reveal-left {
    transform: translateX(-50px);
}

.reveal-right {
    transform: translateX(50px);
}

.reveal.is-visible,
.reveal-left.is-visible,
.reveal-right.is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
}

.home-project-grid {
    display: grid;

    grid-template-columns:
        repeat(3, minmax(0, 1fr));

    gap: 1.5rem;
}

@keyframes heroReveal {

    from {
        opacity: 0;

        transform:
            translateY(100px)
            scale(0.9)
            rotateX(8deg);
    }

    to {
        opacity: 1;

        transform:
            translateY(0)
            scale(1)
            rotateX(0);
    }
}

@keyframes particleFloat {

    0% {
        transform:
            translate3d(
                calc(var(--move-x) * -1),
                var(--move-y),
                0
            )
            scale(var(--scale-start, 0.7));

        opacity: var(--opacity-low, 0.15);
    }

    50% {
        transform:
            translate3d(
                var(--move-x),
                calc(var(--move-y) * -1),
                0
            )
            scale(var(--scale-middle, 1));

        opacity: var(--opacity-middle, 0.45);
    }

    100% {
        transform:
            translate3d(
                calc(var(--move-x) * 1.5),
                calc(var(--move-y) * -1.5),
                0
            )
            scale(var(--scale-end, 1.2));

        opacity: var(--opacity-high, 0.65);
    }
}



/* =========================================
   TECHNOLOGY MARQUEE
========================================= */

.tech-marquee {
    position: relative;

    width: 100%;

    overflow: hidden;

    margin: 0;

    margin-top: 120px;

    padding: 18px 0;

    flex-shrink: 0;

    border-top:
        1px solid
        rgba(255, 255, 255, 0.06);

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.06);

    background:
        rgba(8, 9, 13, 0.35);

    backdrop-filter: blur(8px);

    z-index: 5;
}


/* =========================================
   MARQUEE TRACK
========================================= */

.tech-marquee-track {
    display: flex;

    width: max-content;

    flex-wrap: nowrap;

    animation:
        techMarqueeMove
        20s
        linear
        infinite;

    will-change: transform;
}


/* =========================================
   MARQUEE GROUP
========================================= */

.tech-marquee-group {
    display: flex;

    align-items: center;

    flex: 0 0 auto;

    white-space: nowrap;
}


/* =========================================
   MARQUEE TEXT
========================================= */

/* =========================================
   MARQUEE TEXT
========================================= */

.tech-marquee-group span {
    display: inline-block;

    flex: 0 0 auto;

    margin: 0 25px;

    color:
        rgba(255, 255, 255, 0.55);

    font-family: monospace;

    font-size: 1rem;

    letter-spacing: 0.12em;

    text-transform: uppercase;
}


/* =========================================
   MARQUEE DOT
========================================= */

.tech-marquee-group span.tech-marquee-dot {
    flex: 0 0 auto;

    margin: 0 10px !important;

    color: #8b5cf6 !important;

    font-size: 0.9rem;

    letter-spacing: 0;

    text-shadow:
        0 0 8px
        rgba(139, 92, 246, 0.8),

        0 0 16px
        rgba(139, 92, 246, 0.35);

    -webkit-text-fill-color: #8b5cf6;
}


/* =========================================
   MARQUEE ANIMATION
========================================= */

@keyframes techMarqueeMove {

    from {
        transform:
            translate3d(
                0,
                0,
                0
            );
    }

    to {
        transform:
            translate3d(
                -50%,
                0,
                0
            );
    }

}


/* =========================================
   PROJECTS PREVIEW
========================================= */

.projects-preview {
    position: relative;

    padding: 140px 0;

    overflow: hidden;

    isolation: isolate;
}


/* =========================================
   PROJECT GLOW
========================================= */

.projects-preview::before {
    content: "";

    position: absolute;

    top: -250px;
    left: -250px;

    width: 700px;
    height: 700px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(139, 92, 246, 0.18) 0%,
            rgba(139, 92, 246, 0.08) 35%,
            transparent 70%
        );

    filter: blur(40px);

    pointer-events: none;

    z-index: -1;
}

/* =========================================
   PROJECTS HEADING
========================================= */

.projects-heading {
    max-width: 850px;
    margin: 0 auto;
    text-align: center;
}

.projects-heading p {
    max-width: 650px;
    margin: 32px auto 0;
}


/*
   Geen aparte font-styling voor
   PROJECTEN of de heading.

   Hierdoor gebruiken ze dezelfde
   algemene HomeView styling als
   de andere secties.
*/

.projects-heading .section-label {
    
    margin-bottom: 28px;
}


.projects-heading h2 {
    margin: 0;
}


.projects-heading p {
    max-width: 650px;

    margin-top: 32px;

    margin-bottom: 0;

    
}


/* =========================================
   HOME PROJECT CARDS
========================================= */

.home-project-card {
    display: flex;

    flex-direction: column;

    min-width: 0;

    height: 100%;

    overflow: hidden;

    text-decoration: none;

    border:
        1px solid
        rgba(255, 255, 255, 0.08);

    border-radius: 14px;

    background:
        linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.04),
            rgba(139, 92, 246, 0.03)
        );

    transition:
        transform 0.4s ease,
        border-color 0.4s ease,
        box-shadow 0.4s ease;
}


.home-project-card:hover {
    transform:
        translateY(-8px);

    border-color:
        rgba(139, 92, 246, 0.45);

    box-shadow:
        0 20px 60px
        rgba(0, 0, 0, 0.35);
}


/* =========================================
   PROJECT IMAGE
========================================= */

.home-project-image {
    height: 240px;

    overflow: hidden;

    background: #11131a;
}


.home-project-image img {
    display: block;

    width: 100%;

    height: 100%;

    object-fit: cover;

    transition:
        transform 0.6s
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        );
}


.home-project-card:hover
.home-project-image img {
    transform:
        scale(1.05);
}


/* =========================================
   PROJECT CONTENT
========================================= */

.home-project-card-content {
    display: flex;

    flex-direction: column;

    flex: 1;

    padding: 28px;
}


.home-project-category {
    display: block;

    margin-bottom: 12px;

    color: #a78bfa;

    font-family: monospace;

    

    letter-spacing: 0.15em;

    text-transform: uppercase;
}


.home-project-card h3 {
    margin: 0 0 12px;

    color: #ffffff;

    

    letter-spacing: -0.03em;
}


.home-project-card p {
    margin: 0 0 22px;

    color:
        rgba(255, 255, 255, 0.55);

    line-height: 1.7;
}


/* =========================================
   TECHNOLOGIES
========================================= */

.home-project-technologies {
    display: flex;

    flex-wrap: wrap;

    gap: 7px;

    margin-top: auto;
}

/*
.home-project-technologies .technology {
    padding:
        5px 9px;

    color:
        rgba(255, 255, 255, 0.55);

    border:
        1px solid
        rgba(139, 92, 246, 0.15);

    border-radius: 5px;

    background:
        rgba(139, 92, 246, 0.04);

    font-size: 0.9rem;
}
    */


/* =========================================
   CONTACT CTA
========================================= */

.contact-section {
    padding-top: 160px;
    padding-bottom: 220px;
}

.contact-section-content {
    max-width: 1100px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 80px;
}

.contact-section-text {
    flex: 1;
    text-align: left;
}

.contact-section-content .section-label {
    
    margin-bottom: 28px;
}

.contact-actions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    flex-shrink: 0;
}




/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 991px) {

    .home-project-grid-item:nth-child(3) {
        display: none;
    }

    .home-project-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

}


@media (max-width: 768px) {

    .home-project-grid {
        grid-template-columns: 1fr;
    }

   

    .contact-section {
        padding-top: 110px;
        padding-bottom: 160px;
    }



    .hero {
        min-height: 90vh;
    }


      .hero-content {
        flex-direction: column;
        align-items: center;
        gap: 40px;
        text-align: center;
    }

    .hero-text-content {
        width: 100%;
        max-width: 800px;
        text-align: center;
    }

    .hero-buttons {
        width: 100%;
        max-width: 320px;
        align-items: stretch;
    }


    .hero h1 {
        font-size:
            clamp(
                3.2rem,
                14vw,
                5rem
            );

        letter-spacing: -2px;
    }


    .hero-text {
        margin-top: 28px;

        font-size: 1rem;
    }


    

    .hero::before {
        width: 400px;

        height: 400px;
    }


    .hero::after {
        width: 300px;

        height: 300px;
    }


    .projects-preview {
        padding: 90px 0;
    }


    .projects-heading .section-label {
        margin-bottom: 22px;
    }


    .projects-heading p {
        margin-top: 24px;
    }


    .home-project-image {
        height: 220px;
    }


    .home-project-card-content {
        padding: 25px;
    }


    .home-project-card h3 {
        font-size: 1.6rem;
    }


    .home-project-card p {
        font-size: 0.95rem;
    }

      .contact-section-content {
        flex-direction: column;
        align-items: center;
        gap: 40px;

        text-align: center;
    }

    .contact-section-text {
        width: 100%;
        text-align: center;
    }

    .contact-actions {
        width: 100%;
        max-width: 320px;
        align-items: stretch;
    }
}



</style>
```

```

