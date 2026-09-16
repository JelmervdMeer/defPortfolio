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

const canvas =
    ref<HTMLCanvasElement | null>(null);

let ctx:
    CanvasRenderingContext2D | null = null;

let animationFrame = 0;

let particles: Particle[] = [];

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;

let width = 0;
let height = 0;


// =====================================
// PARTICLE INTERFACE
// =====================================

interface Particle {
    x: number;
    y: number;

    baseX: number;
    baseY: number;

    size: number;

    speedX: number;
    speedY: number;

    opacity: number;
}


// =====================================
// PARTICLE SETTINGS
// =====================================

const PARTICLE_COUNT = 90;
const MOUSE_RADIUS = 180;
const MOUSE_FORCE = 0.8;


// =====================================
// CREATE PARTICLES
// =====================================

const createParticles = (): void => {

    particles = [];

    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const x =
            Math.random() * width;

        const y =
            Math.random() * height;

        particles.push({
            x,
            y,

            baseX: x,
            baseY: y,

            size:
                Math.random() * 2 + 0.5,

            speedX:
                (Math.random() - 0.5) * 0.15,

            speedY:
                (Math.random() - 0.5) * 0.15,

            opacity:
                Math.random() * 0.5 + 0.15
        });

    }

};


// =====================================
// RESIZE CANVAS
// =====================================

const resizeCanvas = (): void => {

    if (!canvas.value) {
        return;
    }

    const rect =
        canvas.value.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const dpr =
        window.devicePixelRatio || 1;

    canvas.value.width =
        width * dpr;

    canvas.value.height =
        height * dpr;

    canvas.value.style.width =
        `${width}px`;

    canvas.value.style.height =
        `${height}px`;

    ctx =
        canvas.value.getContext('2d');

    if (!ctx) {
        return;
    }

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    createParticles();

};


// =====================================
// MOUSE MOVE
// =====================================

const handleMouseMove = (
    event: MouseEvent
): void => {

    if (!canvas.value) {
        return;
    }

    const rect =
        canvas.value.getBoundingClientRect();

    targetMouseX =
        event.clientX - rect.left;

    targetMouseY =
        event.clientY - rect.top;

};


// =====================================
// PARTICLE ANIMATION
// =====================================

const animateParticles = (): void => {

    if (!ctx) {
        return;
    }

    const context = ctx;

    context.clearRect(
        0,
        0,
        width,
        height
    );

    mouseX +=
        (targetMouseX - mouseX) * 0.05;

    mouseY +=
        (targetMouseY - mouseY) * 0.05;

    particles.forEach(
        particle => {

            particle.baseX +=
                particle.speedX;

            particle.baseY +=
                particle.speedY;


            // Horizontal wrap

            if (particle.baseX < 0) {
                particle.baseX = width;
            }

            if (particle.baseX > width) {
                particle.baseX = 0;
            }


            // Vertical wrap

            if (particle.baseY < 0) {
                particle.baseY = height;
            }

            if (particle.baseY > height) {
                particle.baseY = 0;
            }


            let x =
                particle.baseX;

            let y =
                particle.baseY;

            const dx =
                mouseX - x;

            const dy =
                mouseY - y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            // Mouse interaction

            if (
                distance <
                MOUSE_RADIUS
            ) {

                const force =
                    (
                        MOUSE_RADIUS -
                        distance
                    ) /
                    MOUSE_RADIUS;

                const angle =
                    Math.atan2(
                        dy,
                        dx
                    );

                x -=
                    Math.cos(angle) *
                    force *
                    MOUSE_FORCE *
                    25;

                y -=
                    Math.sin(angle) *
                    force *
                    MOUSE_FORCE *
                    25;

            }


            particle.x +=
                (x - particle.x) * 0.08;

            particle.y +=
                (y - particle.y) * 0.08;


            // Draw particle

            context.beginPath();

            context.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            context.fillStyle =
                `rgba(139, 92, 246, ${particle.opacity})`;

            context.fill();

        }
    );

    animationFrame =
        requestAnimationFrame(
            animateParticles
        );

};


// =====================================
// REVEAL ANIMATION
// =====================================

let revealObserver:
    IntersectionObserver | null = null;


const setupRevealObserver = (): void => {

    const elements =
        document.querySelectorAll(
            '.home-hero .reveal'
        );

    if (!elements.length) {
        return;
    }


    // Mobile elements are made visible by CSS.
    // No observer is needed there.

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
                threshold: 0.1
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

};


// =====================================
// LIFECYCLE
// =====================================

onMounted(() => {

    resizeCanvas();

    window.addEventListener(
        'resize',
        resizeCanvas
    );

    window.addEventListener(
        'mousemove',
        handleMouseMove
    );

    animateParticles();

    requestAnimationFrame(
        () => {

            setupRevealObserver();

        }
    );

});


onUnmounted(() => {

    cancelAnimationFrame(
        animationFrame
    );

    window.removeEventListener(
        'resize',
        resizeCanvas
    );

    window.removeEventListener(
        'mousemove',
        handleMouseMove
    );

    revealObserver?.disconnect();

});

</script>


<template>

    <section class="home-hero">

        <!-- =====================================
             PARTICLE BACKGROUND
        ====================================== -->

        <div class="hero-particles">

            <canvas
                ref="canvas"
                class="hero-particles-canvas"
            ></canvas>

        </div>


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
    position: relative;

    display: grid;

    grid-template-rows:
        1fr
        auto;

    width: 100%;

    min-height: 100vh;

    overflow: hidden;

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
    position: absolute;

    inset: 0;

    z-index: 0;

    overflow: hidden;

    pointer-events: none;
}


.hero-particles-canvas {
    display: block;

    width: 100%;
    height: 100%;
}


/* =====================================
   HERO CONTAINER
===================================== */

.home-hero > .container {
    position: relative;

    z-index: 2;

    display: flex;

    flex-direction: column;

    justify-content: space-between;

    width: 100%;

    min-height:
        calc(100vh - 190px);
}


/* =====================================
   HERO CONTENT
===================================== */

.hero-content {
    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 80px;

    width: 100%;

    flex: 1;
}


/* =====================================
   HERO TITLE
===================================== */

.hero-title-content {
    width:
        calc(100% - 460px);

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
    margin: 0;

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
        rgba(255, 255, 255, 0.06);

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.06);
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
        rgba(245, 245, 247, 0.45);

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
        rgba(167, 139, 250, 1),

        0 0 10px
        rgba(139, 92, 246, 0.95),

        0 0 20px
        rgba(139, 92, 246, 0.65),

        0 0 30px
        rgba(139, 92, 246, 0.30);

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
            rgba(167, 139, 250, 0.8),

            0 0 10px
            rgba(139, 92, 246, 0.55);
    }

    50% {
        opacity:
            1;

        transform:
            scale(1.2);

        box-shadow:
            0 0 6px
            rgba(196, 181, 253, 1),

            0 0 14px
            rgba(167, 139, 250, 1),

            0 0 26px
            rgba(139, 92, 246, 0.75);
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
            rgba(167, 139, 250, 1),

            0 0 10px
            rgba(139, 92, 246, 0.75);
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