<script setup lang="ts">

import {
    onMounted,
    onUnmounted,
    ref
} from "vue";


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

const footerParticles =
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

function createParticles(): void {

    if (!footerParticles.value) {
        return;
    }

    const container =
        footerParticles.value;

    particles.length = 0;


    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const element =
            document.createElement("div");

        element.className =
            "footer-particle";


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

    if (!footerParticles.value) {
        return;
    }

    const container =
        footerParticles.value;


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


    if (!footerParticles.value) {
        return;
    }


    const footer =
        footerParticles.value.parentElement;


    if (!footer) {
        return;
    }


    const rect =
        footer.getBoundingClientRect();


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


    footer.style.setProperty(
        "--cursor-x",
        `${x}%`
    );


    footer.style.setProperty(
        "--cursor-y",
        `${y}%`
    );

}


// =====================================
// MOUSE LEAVE
// =====================================

function handleMouseLeave(): void {

    if (!footerParticles.value) {
        return;
    }


    const rect =
        footerParticles.value
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


    // ---------------------------------
    // INITIAL MOUSE POSITION
    // ---------------------------------

    if (footerParticles.value) {

        const rect =
            footerParticles.value
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
        "mousemove",
        handleMouseMove
    );


    window.addEventListener(
        "mouseleave",
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
        "mousemove",
        handleMouseMove
    );


    window.removeEventListener(
        "mouseleave",
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


    particles.forEach(
        particle => {

            particle.element.remove();

        }
    );


    particles.length = 0;

});

</script>


<template>

    <footer class="portfolio-footer">

        <!-- =====================================
             PARTICLES
        ====================================== -->

        <div
            ref="footerParticles"
            class="footer-particles"
            aria-hidden="true"
        ></div>


        <!-- =====================================
             CURSOR GLOW
        ====================================== -->

        <div
            class="footer-cursor-glow"
            aria-hidden="true"
        ></div>


        <!-- =====================================
             FOOTER CONTENT
        ====================================== -->

        <div class="portfolio-container">

            <div class="footer-top">


                <!-- =====================================
                     BRAND
                ====================================== -->

                <div class="footer-brand">

                    <RouterLink
                        to="/"
                        class="footer-logo"
                    >

                        JELMER<span>.</span>

                    </RouterLink>


                    <p>

                        Freelance developer gespecialiseerd
                        in interactieve webapplicaties,
                        3D en creatieve softwareprojecten.

                    </p>

                </div>


                <!-- =====================================
                     LINKS
                ====================================== -->

                <div class="footer-links">


                    <!-- NAVIGATION -->

                    <div class="footer-link-group">

                        <div class="footer-label">
                            NAVIGATIE
                        </div>


                        <RouterLink to="/">
                            Home
                        </RouterLink>


                        <RouterLink to="/projects">
                            Projects
                        </RouterLink>


                        <RouterLink to="/about">
                            About
                        </RouterLink>


                        <RouterLink to="/contact">
                            Contact
                        </RouterLink>

                    </div>


                    <!-- ONLINE -->

                    <div class="footer-link-group">

                        <div class="footer-label">
                            ONLINE
                        </div>


                        <div class="footer-socials">

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >

                                <i class="bi bi-github"></i>

                                <span>
                                    
                                </span>

                            </a>


                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >

                                <i class="bi bi-linkedin"></i>

                                <span>
                                    
                                </span>

                            </a>


                            <a
                                href="mailto:jelmer#jelmervandermeer.nl"
                                aria-label="E-mail"
                            >

                                <i class="bi bi-envelope"></i>

                                <span>
                                    jelmer@jelmervandermeer.nl
                                </span>

                            </a>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =====================================
                 FOOTER BOTTOM
            ====================================== -->

            <div class="footer-bottom">

                <span>

                    © {{ new Date().getFullYear() }}
                    Jelmer.
                    Alle rechten voorbehouden.

                </span>


                <span>

                    Built with Vue & TypeScript.

                </span>

            </div>

        </div>

    </footer>

</template>


<style scoped>

/* =========================================
   FOOTER
========================================= */

.portfolio-footer {

    position: relative;

    overflow: hidden;

    padding:
        70px 0 25px;

    border-top:
        1px solid
        rgba(255, 255, 255, 0.08);

    background:

        radial-gradient(
            circle at 80% 100%,
            rgba(139, 92, 246, 0.18) 0%,
            rgba(139, 92, 246, 0.08) 25%,
            transparent 55%
        ),

        radial-gradient(
            circle at 15% 100%,
            rgba(109, 40, 217, 0.10) 0%,
            transparent 45%
        ),

        #050508;

}


/* =========================================
   PARTICLES
========================================= */

.footer-particles {

    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;

    pointer-events: none;

    z-index: 1;

}


:deep(.footer-particle) {

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
   CURSOR GLOW
========================================= */

.footer-cursor-glow {

    position: absolute;

    inset: 0;

    pointer-events: none;

    z-index: 0;

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


/* =========================================
   FOOTER CONTENT
========================================= */

.portfolio-container {

    position: relative;

    z-index: 2;

    width: 100%;

    max-width: 1320px;

    margin: 0 auto;

    padding:
        0 24px;

}


/* =========================================
   FOOTER TOP
========================================= */

.footer-top {

    display: flex;

    justify-content: space-between;

    gap: 70px;

    padding-bottom: 55px;

}


.footer-brand {

    max-width: 450px;

}


.footer-logo {

    display: inline-block;

    margin-bottom: 15px;

    color:
        #ffffff;

    font-size:
        1.3rem;

    font-weight:
        700;

    letter-spacing:
        3px;

    text-decoration:
        none;

}


.footer-logo:hover {

    color:
        #ffffff;

}


.footer-logo span {

    color:
        #8b5cf6;

}


.footer-brand p {

    max-width:
        400px;

    margin:
        0;

    color:
        #a8adbd;

    line-height:
        1.7;

}


/* =========================================
   FOOTER LINKS
========================================= */

.footer-links {

    display: flex;

    gap: 90px;

}


.footer-link-group {

    display: flex;

    flex-direction: column;

    gap: 10px;

}


.footer-label {

    margin-bottom: 8px;

    color:
        #8b5cf6;

    font-size:
        0.7rem;

    font-weight:
        700;

    letter-spacing:
        2px;

}


.footer-links a {

    color:
        #a8adbd;

    text-decoration:
        none;

    transition:
        color 0.2s ease;

}


.footer-links a:hover {

    color:
        #ffffff;

}


/* =========================================
   SOCIAL ICONS
========================================= */

.footer-socials {

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 10px;

}


.footer-socials a {

    display: flex;

    align-items: center;

    gap: 10px;

}


.footer-socials i {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 22px;

    font-size: 1rem;

}


/* =========================================
   FOOTER BOTTOM
========================================= */

.footer-bottom {

    display: flex;

    justify-content: space-between;

    gap: 20px;

    padding-top: 20px;

    border-top:
        1px solid
        rgba(255, 255, 255, 0.08);

    color:
        #666b7a;

    font-size:
        0.8rem;

}


/* =========================================
   TABLET / MOBILE
========================================= */

@media (max-width: 768px) {

    .portfolio-footer {

        padding-top:
            55px;

    }


    .portfolio-container {

        padding:
            0 20px;

    }


    .footer-top {

        flex-direction:
            column;

        gap:
            40px;

        padding-bottom:
            40px;

    }


    .footer-links {

        gap:
            55px;

    }


    .footer-bottom {

        flex-direction:
            column;

        gap:
            10px;

    }

}

</style>