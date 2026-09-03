```vue
<script setup lang="ts">

import {
    onMounted,
    onUnmounted,
    ref
} from 'vue';

import WorkDisciplines from '../components/WorkDisciplines.vue';
import SectionLayout from '../components/SectionLayout.vue';
import ProjectScrollShowcase from '../components/ProjectScroll.vue';
import ContactScene from '../components/ContactScene.vue';


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

        const x =
            Math.random() * 100;

        const y =
            Math.random() * 100;

        const phaseX =
            Math.random() *
            Math.PI *
            2;

        const phaseY =
            Math.random() *
            Math.PI *
            2;

        const speedX =
            Math.random() * 0.012 +
            0.003;

        const speedY =
            Math.random() * 0.012 +
            0.003;

        const amplitudeX =
            Math.random() * 35 +
            15;

        const amplitudeY =
            Math.random() * 35 +
            15;

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

        container.appendChild(
            element
        );

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
            amplitudeY

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

    particles.forEach(
        particle => {

            particle.phaseX +=
                particle.speedX;

            particle.phaseY +=
                particle.speedY;

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

            let targetX =
                particle.baseX;

            let targetY =
                particle.baseY;

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
// SCROLL REVEAL
// =====================================

let revealObserver:
    IntersectionObserver | null = null;


function setupRevealObserver() {

    const revealElements =
        document.querySelectorAll(
            '.reveal'
        );

    if (!revealElements.length) {
        return;
    }

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

                        entry.target.classList.add(
                            'is-visible'
                        );

                        revealObserver?.unobserve(
                            entry.target
                        );

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

    particles.forEach(
        particle => {

            particle.element.remove();

        }
    );

    particles.length = 0;

});

</script>


<template>

    <main class="home-page">


        <!-- =====================================
             HERO
        ====================================== -->

        <section class="hero">

            <div
                ref="heroParticles"
                class="hero-particles"
                aria-hidden="true"
            ></div>


            <div class="container">

                <div class="hero-content">

                    <div class="hero-title-content">

                        <div
                            class="
                                hero-label
                                reveal
                            "
                        >
                            FREELANCE DEVELOPER
                        </div>


                        <h1
                            class="
                                page-title
                                reveal
                            "
                        >

                            Ik bouw

                            <span
                                class="
                                    animated-gradient-text
                                "
                            >
                                digitale oplossingen.
                            </span>

                        </h1>

                    </div>


                    <div class="hero-actions">

                        <p
                            class="
                                hero-text
                                reveal
                            "
                        >
                            Ik ontwerp en ontwikkel interactieve
                            websites, 3D-ervaringen en software
                            waarin techniek en creativiteit
                            samenkomen.
                        </p>


                        <div
                            class="
                                hero-buttons
                                reveal
                            "
                        >

                            <RouterLink
                                to="/projects"
                                class="
                                    btn
                                    btn-primary
                                    btn-lg
                                "
                            >

                                Bekijk mijn projecten

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


                    <div
                        class="tech-marquee-group"
                        aria-hidden="true"
                    >

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
             HOME CONTENT
        ====================================== -->

        <div class="home-sections">


            <!-- =====================================
                 PROJECTS
            ====================================== -->

            <div class="home-section-container projects-container">

                <SectionLayout
                    class="home-projects"
                    variant="split"
                    reverse
                    label="PROJECTEN"
                    title="Een selectie van mijn werk."
                    description="Een aantal projecten waarin techniek, creativiteit en praktische oplossingen samenkomen."
                >

                    <template #title>

                        Een selectie van mijn

                        <span class="animated-gradient-text">
                            werk
                        </span>.

                    </template>


                    <div
                        class="
                            section-reveal
                            reveal
                        "
                    >

                        <ProjectScrollShowcase />

                    </div>

                </SectionLayout>

            </div>


            <!-- =====================================
                 WORK DISCIPLINES
            ====================================== -->

            <div class="home-section-container disciplines-container">

                <SectionLayout
                    class="home-disciplines"
                    variant="split"
                    label="MIJN WERKWIJZE"
                    title="Vijf disciplines een manier van werken"
                    description="Verschillende disciplines komen samen in één manier van werken. Door techniek, creativiteit, communicatie, vernieuwing en een doelgerichte aanpak te combineren, ontstaan digitale oplossingen die zowel doordacht als bruikbaar zijn."
                >

                    <template #title>

                        Vijf

                        <span class="animated-gradient-text">
                            disciplines
                        </span>

                        een werkwijze.

                    </template>


                    <div
                        class="
                            section-reveal
                            reveal
                        "
                    >

                        <!-- =================================
                             DESKTOP FIGURE
                        ================================== -->

                        <div class="discipline-desktop">

                            <WorkDisciplines
                                variant="home"
                            />

                        </div>


                        <!-- =================================
                             MOBILE TIMELINE
                        ================================== -->

                        <div class="discipline-mobile">

                            <div class="mobile-discipline-list">


                                <!-- 01 -->

                                <div class="mobile-discipline">

                                    <div class="mobile-discipline-marker">

                                        <span>
                                            01
                                        </span>

                                    </div>


                                    <div class="mobile-discipline-content">

                                        <div class="mobile-discipline-icon">

                                            <i class="bi bi-book"></i>

                                        </div>

                                        <div>

                                            <h3>
                                                VERNIEUWING
                                            </h3>

                                            <span>
                                                Blijven ontdekken
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <!-- 02 -->

                                <div class="mobile-discipline">

                                    <div class="mobile-discipline-marker">

                                        <span>
                                            02
                                        </span>

                                    </div>


                                    <div class="mobile-discipline-content">

                                        <div class="mobile-discipline-icon">

                                            <i class="bi bi-code-slash"></i>

                                        </div>

                                        <div>

                                            <h3>
                                                TECHNISCH
                                            </h3>

                                            <span>
                                                Architectuur & structuur
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <!-- 03 -->

                                <div class="mobile-discipline">

                                    <div class="mobile-discipline-marker">

                                        <span>
                                            03
                                        </span>

                                    </div>


                                    <div class="mobile-discipline-content">

                                        <div class="mobile-discipline-icon">

                                            <i class="bi bi-gear"></i>

                                        </div>

                                        <div>

                                            <h3>
                                                PRAKTISCH
                                            </h3>

                                            <span>
                                                Van idee naar resultaat
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <!-- 04 -->

                                <div class="mobile-discipline">

                                    <div class="mobile-discipline-marker">

                                        <span>
                                            04
                                        </span>

                                    </div>


                                    <div class="mobile-discipline-content">

                                        <div class="mobile-discipline-icon">

                                            <i class="bi bi-brush"></i>

                                        </div>

                                        <div>

                                            <h3>
                                                CREATIEF
                                            </h3>

                                            <span>
                                                Denken buiten de standaard
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <!-- 05 -->

                                <div class="mobile-discipline">

                                    <div class="mobile-discipline-marker">

                                        <span>
                                            05
                                        </span>

                                    </div>


                                    <div class="mobile-discipline-content">

                                        <div class="mobile-discipline-icon">

                                            <i class="bi bi-chat-square-text"></i>

                                        </div>

                                        <div>

                                            <h3>
                                                COMMUNICATIE
                                            </h3>

                                            <span>
                                                Techniek begrijpelijk maken
                                            </span>

                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>

                </SectionLayout>

            </div>


            <!-- =====================================
                 CONTACT
            ====================================== -->

            <div class="home-section-container contact-container">

                <SectionLayout
                    class="home-contact"
                    variant="split"
                    reverse
                    label="CONTACT"
                    title="Samen iets geweldigs maken?"
                    description="Heb je een idee, een project, een experiment of een digitale uitdaging? Ik denk graag mee over een passende oplossing."
                >

                    <template #title>

                        Samen iets

                        <span class="animated-gradient-text">
                            geweldigs
                        </span>

                        <br />

                        bouwen?

                    </template>


                    <div
                        class="
                            contact-content-wrapper
                            section-reveal
                            reveal
                        "
                    >

                        <div class="contact-scene-wrapper">

                            <ContactScene />

                        </div>


                        <div class="contact-cta">

                            <RouterLink
                                to="/contact"
                                class="
                                    btn
                                    btn-primary
                                    btn-lg
                                    contact-primary-button
                                "
                            >

                                Start een gesprek

                                <i
                                    class="
                                        bi
                                        bi-arrow-right
                                        ms-2
                                    "
                                ></i>

                            </RouterLink>


                            <RouterLink
                                to="/projects"
                                class="
                                    btn
                                    btn-outline-light
                                    btn-lg
                                    contact-secondary-button
                                "
                            >

                                Bekijk mijn werk

                                <i
                                    class="
                                        bi
                                        bi-grid-3x3-gap
                                        ms-2
                                    "
                                ></i>

                            </RouterLink>

                        </div>

                    </div>

                </SectionLayout>

            </div>

        </div>

    </main>

</template>


<style scoped>

/* =========================================
   PAGE
========================================= */

.home-page {

    position: relative;

    width: 100%;
    max-width: 100%;

    overflow-x: clip;

    background:
        #08090d;

}


/* =========================================
   HERO
========================================= */

.hero {

    --cursor-x: 50%;
    --cursor-y: 50%;

    display: grid;

    grid-template-rows:
        1fr auto;

    position: relative;

    min-height: 100vh;

    padding:
        190px
        0
        0;

    overflow: hidden;

    isolation: isolate;

    background:

        radial-gradient(
            circle at 20% 20%,
            rgba(
                108,
                99,
                255,
                0.16
            ),
            transparent 35%
        ),

        radial-gradient(
            circle at 80% 70%,
            rgba(
                0,
                212,
                255,
                0.08
            ),
            transparent 35%
        ),

        #08090d;

}


.hero::before {

    content: "";

    position: absolute;

    top: 45%;
    left: 50%;

    width: 700px;
    height: 700px;

    transform:
        translate(
            -50%,
            -50%
        );

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                139,
                92,
                246,
                0.14
            ) 0%,

            rgba(
                139,
                92,
                246,
                0.06
            ) 35%,

            transparent 70%
        );

    filter:
        blur(20px);

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

    transform:
        translate(
            -50%,
            -50%
        );

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                139,
                92,
                246,
                0.16
            ) 0%,

            rgba(
                139,
                92,
                246,
                0.07
            ) 30%,

            transparent 70%
        );

    filter:
        blur(15px);

    pointer-events: none;

    transition:

        left 0.15s ease-out,
        top 0.15s ease-out;

    z-index: -1;

}


/* =========================================
   HERO CONTENT
========================================= */

.hero .container {

    position: relative;

    z-index: 5;

    width: 100%;

    display: flex;

    align-items: center;

}


.hero-content {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 80px;

    width: 100%;

}


.hero-title-content {

    flex: 1;

    min-width: 0;

}


.hero-actions {

    flex:
        0 0 380px;

    width: 380px;

    min-width: 0;

    display: flex;

    flex-direction: column;

    gap: 50px;

}


.hero-text {

    max-width: 650px;

    margin:
        38px
        0
        0;

    color:

        rgba(
            255,
            255,
            255,
            0.62
        );

    line-height: 1.8;

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
   BUTTON HOVER
========================================= */

.hero-buttons .btn {

    transition:

        transform 250ms ease,
        box-shadow 250ms ease,
        background-color 250ms ease,
        border-color 250ms ease;

    will-change:
        transform;

}


.hero-buttons .btn:hover {

    transform:
        translateY(-4px);

}


.hero-buttons .btn-primary:hover {

    box-shadow:

        0 10px 35px
        rgba(
            139,
            92,
            246,
            0.32
        );

}


.hero-buttons .btn-outline-light:hover {

    box-shadow:

        0 10px 30px
        rgba(
            255,
            255,
            255,
            0.12
        );

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

    background:
        #8b5cf6;

    box-shadow:

        0 0 10px
        rgba(
            139,
            92,
            246,
            0.8
        );

}


/* =========================================
   HERO TITLE
========================================= */

.hero h1 {

    max-width: 950px;

    margin: 0;

    color:
        #ffffff;

    font-weight: 700;

    line-height: 1.20;

    letter-spacing: -0.055em;

}


/* =========================================
   PARTICLES
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

    background:
        #a78bfa;

    pointer-events: none;

    z-index: 1;

    will-change:

        left,
        top,
        transform;

}


/* =========================================
   REVEAL
========================================= */

.hero-label.reveal {

    transition-delay:
        0ms;

}


.hero h1.reveal {

    transition-delay:
        100ms;

}


.hero-text.reveal {

    transition-delay:
        200ms;

}


.hero-buttons.reveal {

    transition-delay:
        300ms;

}


.reveal,
.reveal-left,
.reveal-right {

    opacity: 0;

    transition:

        opacity 700ms ease,

        transform 700ms
        cubic-bezier(
            .2,
            .8,
            .2,
            1
        );

}


.reveal {

    transform:
        translateY(50px);

}


.reveal-left {

    transform:
        translateX(-50px);

}


.reveal-right {

    transform:
        translateX(50px);

}


.reveal.is-visible,
.reveal-left.is-visible,
.reveal-right.is-visible {

    opacity: 1;

    transform:
        translate3d(
            0,
            0,
            0
        );

}


/* =========================================
   TECHNOLOGY MARQUEE
========================================= */

.tech-marquee {

    position: relative;

    width: 100%;

    overflow: hidden;

    margin-top: 120px;

    padding: 18px 0;

    flex-shrink: 0;

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

    background:

        rgba(
            8,
            9,
            13,
            0.35
        );

    backdrop-filter:
        blur(8px);

    z-index: 5;

}


.tech-marquee-track {

    display: flex;

    width: max-content;

    flex-wrap: nowrap;

    animation:

        techMarqueeMove
        20s
        linear
        infinite;

    will-change:
        transform;

}


.tech-marquee-group {

    display: flex;

    align-items: center;

    flex: 0 0 auto;

    white-space: nowrap;

}


.tech-marquee-group span {

    display: inline-block;

    flex: 0 0 auto;

    margin:
        0 25px;

    color:

        rgba(
            255,
            255,
            255,
            0.55
        );

    font-family:
        monospace;

    font-size:
        1rem;

    letter-spacing:
        0.12em;

    text-transform:
        uppercase;

    transition:

        transform 250ms ease,
        color 250ms ease,
        text-shadow 250ms ease;

}


.tech-marquee-group span:not(.tech-marquee-dot):hover {

    color:
        #ffffff;

    transform:
        scale(1.12);

    text-shadow:

        0 0 10px
        rgba(
            139,
            92,
            246,
            0.8
        ),

        0 0 22px
        rgba(
            139,
            92,
            246,
            0.35
        );

}


.tech-marquee-group
span.tech-marquee-dot {

    flex: 0 0 auto;

    margin:
        0 10px !important;

    color:
        #8b5cf6 !important;

    font-size:
        0.9rem;

    letter-spacing:
        0;

    text-shadow:

        0 0 8px
        rgba(
            139,
            92,
            246,
            0.8
        ),

        0 0 16px
        rgba(
            139,
            92,
            246,
            0.35
        );

    -webkit-text-fill-color:
        #8b5cf6;

}


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
   HOME SECTIONS
========================================= */

.home-sections {

    position: relative;

    display: flex;

    flex-direction: column;

    gap: 60px;

    width: 100%;

    padding:
        60px
        0
        100px;

}


/* =========================================
   SECTION CONTAINER
========================================= */

.home-section-container {

    position: relative;

    width:
        calc(100% - 20px);

    max-width:
        1600px;

    margin:
        0 auto;

    overflow: hidden;

    border:

        1px solid

        rgba(
            255,
            255,
            255,
            0.055
        );

    border-radius:
        28px;

    isolation: isolate;

    background:

        linear-gradient(
            135deg,
            rgba(
                255,
                255,
                255,
                0.018
            ),
            rgba(
                255,
                255,
                255,
                0.006
            )
        );

    box-shadow:

        0 25px 80px
        rgba(
            0,
            0,
            0,
            0.18
        );

}


/* =========================================
   SECTION CONTENT
========================================= */

.home-section-container
:deep(.section-layout > .container) {

    width: 100%;

    max-width: none;

    padding-left:
        70px;

    padding-right:
        70px;

}


.home-section-container
:deep(.section-layout) {

    position: relative;

    width: 100%;

    max-width: none;

    overflow: hidden;

    background:
        transparent;

    padding:
        100px
        70px;

}


/* =========================================
   PROJECTS CONTAINER
========================================= */

.projects-container {

    background:

        radial-gradient(
            circle at 5% 10%,
            rgba(
                168,
                85,
                247,
                0.075
            ),
            transparent 34%
        ),

        radial-gradient(
            circle at 90% 90%,
            rgba(
                217,
                70,
                239,
                0.035
            ),
            transparent 35%
        ),

        rgba(
            10,
            9,
            17,
            0.7
        );

}


:deep(.home-projects::before) {

    content: "";

    position: absolute;

    top: -140px;
    left: -180px;

    width: 520px;
    height: 520px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                168,
                85,
                247,
                0.14
            ) 0%,

            rgba(
                217,
                70,
                239,
                0.07
            ) 35%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


:deep(.home-projects::after) {

    content: "";

    position: absolute;

    right: -180px;
    bottom: -160px;

    width: 480px;
    height: 480px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                236,
                72,
                153,
                0.09
            ) 0%,

            rgba(
                168,
                85,
                247,
                0.05
            ) 38%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


/* =========================================
   DISCIPLINES CONTAINER
========================================= */

.disciplines-container {

    background:

        radial-gradient(
            circle at 95% 5%,
            rgba(
                59,
                130,
                246,
                0.07
            ),
            transparent 34%
        ),

        radial-gradient(
            circle at 5% 90%,
            rgba(
                6,
                182,
                212,
                0.035
            ),
            transparent 35%
        ),

        rgba(
            7,
            11,
            18,
            0.72
        );

}


:deep(.home-disciplines::before) {

    content: "";

    position: absolute;

    top: -120px;
    right: -180px;

    width: 540px;
    height: 540px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                59,
                130,
                246,
                0.13
            ) 0%,

            rgba(
                6,
                182,
                212,
                0.07
            ) 38%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


:deep(.home-disciplines::after) {

    content: "";

    position: absolute;

    left: -180px;
    bottom: -160px;

    width: 500px;
    height: 500px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                14,
                165,
                233,
                0.08
            ) 0%,

            rgba(
                59,
                130,
                246,
                0.045
            ) 40%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


/* =========================================
   DISCIPLINE RESPONSIVE SYSTEM
========================================= */

.discipline-desktop {

    display: block;

    width: 100%;

}


.discipline-mobile {

    display: none;

}


/* =========================================
   MOBILE DISCIPLINE TIMELINE
========================================= */

.mobile-discipline-list {

    position: relative;

    display: flex;

    flex-direction: column;

    width: 100%;

    max-width: 600px;

    margin:
        0 auto;

    padding:
        10px
        0;

}


/* Vertical purple connection line */

.mobile-discipline-list::before {

    content: "";

    position: absolute;

    top: 35px;
    bottom: 35px;

    left: 26px;

    width: 2px;

    background:

        linear-gradient(
            to bottom,
            rgba(
                139,
                92,
                246,
                0.25
            ),
            #8b5cf6,
            rgba(
                139,
                92,
                246,
                0.25
            )
        );

    box-shadow:

        0 0 12px
        rgba(
            139,
            92,
            246,
            0.35
        );

    pointer-events: none;

}


.mobile-discipline {

    position: relative;

    display: flex;

    align-items: center;

    min-height: 105px;

    width: 100%;

}


.mobile-discipline-marker {

    position: relative;

    z-index: 2;

    flex:
        0 0 54px;

    width: 54px;
    height: 54px;

    display: flex;

    align-items: center;

    justify-content: center;

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.7
        );

    border-radius: 50%;

    background:
        #08090d;

    box-shadow:

        0 0 20px
        rgba(
            139,
            92,
            246,
            0.2
        );

}


.mobile-discipline-marker::before {

    content: "";

    position: absolute;

    inset: 5px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,
            rgba(
                139,
                92,
                246,
                0.25
            ),
            rgba(
                139,
                92,
                246,
                0.05
            )
        );

    z-index: -1;

}


.mobile-discipline-marker span {

    color:
        #a78bfa;

    font-family:
        monospace;

    font-size:
        0.68rem;

    font-weight:
        600;

    letter-spacing:
        0.08em;

}


.mobile-discipline-content {

    display: flex;

    align-items: center;

    gap: 18px;

    min-width: 0;

    margin-left: 22px;

    padding:
        18px
        20px;

    flex: 1;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.07
        );

    border-radius:
        16px;

    background:

        linear-gradient(
            135deg,
            rgba(
                255,
                255,
                255,
                0.045
            ),
            rgba(
                255,
                255,
                255,
                0.012
            )
        );

    box-shadow:

        0 15px 40px
        rgba(
            0,
            0,
            0,
            0.15
        );

    transition:

        transform 250ms ease,
        border-color 250ms ease,
        box-shadow 250ms ease;

}


.mobile-discipline-content:hover {

    transform:
        translateX(5px);

    border-color:

        rgba(
            139,
            92,
            246,
            0.45
        );

    box-shadow:

        0 15px 40px
        rgba(
            139,
            92,
            246,
            0.12
        );

}


.mobile-discipline-icon {

    flex:
        0 0 46px;

    width: 46px;
    height: 46px;

    display: flex;

    align-items: center;

    justify-content: center;

    color:
        #a78bfa;

    border-radius:
        50%;

    background:

        rgba(
            139,
            92,
            246,
            0.1
        );

    font-size:
        1.15rem;

}


.mobile-discipline-content h3 {

    margin:
        0;

    color:
        #ffffff;

    font-size:
        0.85rem;

    font-weight:
        700;

    letter-spacing:
        0.08em;

}


.mobile-discipline-content span {

    display: block;

    margin-top:
        6px;

    color:

        rgba(
            255,
            255,
            255,
            0.45
        );

    font-size:
        0.72rem;

    line-height:
        1.4;

}


/* =========================================
   CONTACT CONTAINER
========================================= */

.contact-container {

    background:

        radial-gradient(
            circle at 35% 5%,
            rgba(
                139,
                92,
                246,
                0.075
            ),
            transparent 35%
        ),

        radial-gradient(
            circle at 95% 90%,
            rgba(
                59,
                130,
                246,
                0.045
            ),
            transparent 35%
        ),

        rgba(
            9,
            9,
            17,
            0.72
        );

}


:deep(.home-contact::before) {

    content: "";

    position: absolute;

    top: -150px;
    left: 35%;

    width: 560px;
    height: 560px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                139,
                92,
                246,
                0.13
            ) 0%,

            rgba(
                59,
                130,
                246,
                0.07
            ) 35%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


:deep(.home-contact::after) {

    content: "";

    position: absolute;

    right: -160px;
    bottom: -170px;

    width: 500px;
    height: 500px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                59,
                130,
                246,
                0.08
            ) 0%,

            rgba(
                139,
                92,
                246,
                0.05
            ) 38%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


/* =========================================
   CONTACT CTA
========================================= */

.contact-content-wrapper {

    position: relative;

    display: flex;

    flex-direction: column;

    align-items: center;

    width: 100%;

}


.contact-scene-wrapper {

    position: relative;

    width: 100%;

    min-height: 280px;

    display: flex;

    align-items: center;

    justify-content: center;

}


.contact-scene-wrapper::before {

    content: "";

    position: absolute;

    width: 280px;
    height: 280px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                139,
                92,
                246,
                0.18
            ) 0%,

            rgba(
                0,
                212,
                255,
                0.08
            ) 38%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events: none;

}


.contact-cta {

    display: flex;

    flex-wrap: wrap;

    justify-content: center;

    gap: 16px;

    width: 100%;

    margin-top: 10px;

}


.contact-cta .btn {

    min-width: 190px;

    transition:

        transform 250ms ease,
        box-shadow 250ms ease;

}


.contact-cta .btn:hover {

    transform:
        translateY(-4px);

}


.contact-primary-button:hover {

    box-shadow:

        0 12px 35px

        rgba(
            139,
            92,
            246,
            0.3
        );

}


.contact-secondary-button:hover {

    box-shadow:

        0 10px 30px

        rgba(
            255,
            255,
            255,
            0.1
        );

}


/* =========================================
   PROJECT / CONTENT HOVER
========================================= */

:deep(.project-card),
:deep(.project-preview-card),
:deep(.project-item) {

    transition:

        transform 300ms ease,
        box-shadow 300ms ease;

    will-change:
        transform;

}


:deep(.project-card:hover),
:deep(.project-preview-card:hover),
:deep(.project-item:hover) {

    transform:
        translateY(-6px);

}


/* =========================================
   PROJECT IMAGE HOVER
========================================= */

:deep(.project-card img),
:deep(.project-preview-card img),
:deep(.project-item img),
:deep(.project-image img),
:deep(.project-preview img) {

    transition:

        transform 450ms
        cubic-bezier(
            0.2,
            0.8,
            0.2,
            1
        );

    will-change:
        transform;

}


:deep(.project-card:hover img),
:deep(.project-preview-card:hover img),
:deep(.project-item:hover img),
:deep(.project-image:hover img),
:deep(.project-preview:hover img) {

    transform:
        scale(1.06);

}


/* =========================================
   PROJECT IMAGE CONTAINER
========================================= */

:deep(.project-card .project-image),
:deep(.project-preview-card .project-image),
:deep(.project-item .project-image),
:deep(.project-preview) {

    overflow: hidden;

}


/* =========================================
   TECH LABELS
========================================= */

:deep(.tech-label),
:deep(.tech-tag),
:deep(.project-tech span),
:deep(.project-technologies span) {

    transition:

        transform 220ms ease,
        color 220ms ease,
        background-color 220ms ease,
        box-shadow 220ms ease;

}


:deep(.tech-label:hover),
:deep(.tech-tag:hover),
:deep(.project-tech span:hover),
:deep(.project-technologies span:hover) {

    transform:

        scale(1.08)
        translateY(-2px);

    box-shadow:

        0 5px 18px

        rgba(
            139,
            92,
            246,
            0.20
        );

}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 991px) {

    .hero {

        padding-top:
            170px;

    }


    .hero-content {

        flex-direction: column;

        align-items: center;

        gap: 40px;

        text-align: center;

    }


    .hero-title-content {

        width: 100%;

    }


    .hero-actions {

        width: 100%;

        max-width: 380px;

        flex: none;

    }


    .home-sections {

        gap: 40px;

        padding:
            40px
            0
            70px;

    }


    .home-section-container {

        width:
            calc(100% - 28px);

        border-radius:
            24px;

    }


    .home-section-container
    :deep(.section-layout > .container) {

        padding-left:
            30px;

        padding-right:
            30px;

    }


    .home-section-container
    :deep(.section-layout) {

        padding:
            75px
            30px;

    }


    /* =================================
       DISCIPLINES → MOBILE TIMELINE
    ================================= */

    .discipline-desktop {

        display: none;

    }


    .discipline-mobile {

        display: block;

    }

}


@media (max-width: 768px) {

    .hero {

        min-height: 90vh;

        padding-top:
            150px;

    }


    .hero-content {

        gap: 40px;

    }


    .hero-actions {

        width: 100%;

        max-width: 320px;

        align-items: center;

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

        letter-spacing:
            -2px;

    }


    .hero-text {

        margin-top: 28px;

        font-size:
            1rem;

    }


    .hero::before {

        width: 400px;
        height: 400px;

    }


    .hero::after {

        width: 300px;
        height: 300px;

    }


    .home-sections {

        gap: 32px;

        padding:
            32px
            0
            60px;

    }


    .home-section-container {

        width:
            calc(100% - 20px);

        border-radius:
            22px;

    }


    .home-section-container
    :deep(.section-layout > .container) {

        padding-left:
            24px;

        padding-right:
            24px;

    }


    .home-section-container
    :deep(.section-layout) {

        padding:
            60px
            24px;

    }

}


@media (max-width: 576px) {

    .hero {

        padding-top:
            125px;

    }


    .hero-content {

        gap:
            35px;

    }


    .hero-actions {

        max-width:
            100%;

    }


    .hero-buttons {

        max-width:
            320px;

    }


    .home-sections {

        gap: 24px;

        padding:
            24px
            0
            45px;

    }


    .home-section-container {

        width:
            calc(100% - 12px);

        border-radius:
            18px;

    }


    .home-section-container
    :deep(.section-layout > .container) {

        padding-left:
            18px;

        padding-right:
            18px;

    }


    .home-section-container
    :deep(.section-layout) {

        padding:
            50px
            18px;

    }


    .contact-cta {

        flex-direction: column;

        align-items: stretch;

    }


    .contact-cta .btn {

        width: 100%;

    }


    .contact-scene-wrapper {

        min-height: 230px;

    }


    /* =================================
       SMALL MOBILE DISCIPLINES
    ================================= */

    .mobile-discipline-list {

        max-width:
            100%;

        padding:
            5px
            0;

    }


    .mobile-discipline-list::before {

        left:
            23px;

    }


    .mobile-discipline {

        min-height:
            95px;

    }


    .mobile-discipline-marker {

        flex-basis:
            48px;

        width:
            48px;

        height:
            48px;

    }


    .mobile-discipline-marker span {

        font-size:
            0.6rem;

    }


    .mobile-discipline-content {

        gap:
            12px;

        margin-left:
            15px;

        padding:
            14px;

        border-radius:
            14px;

    }


    .mobile-discipline-icon {

        flex-basis:
            40px;

        width:
            40px;

        height:
            40px;

        font-size:
            1rem;

    }


    .mobile-discipline-content h3 {

        font-size:
            0.72rem;

    }


    .mobile-discipline-content span {

        font-size:
            0.62rem;

    }

}

</style>
```
