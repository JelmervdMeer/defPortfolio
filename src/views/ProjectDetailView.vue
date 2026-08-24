<script setup lang="ts">

import {
    computed,
    onMounted,
    onUnmounted,
    ref
} from 'vue';

import { useRoute } from 'vue-router';

import { projects } from '../data/projects';


// =====================================
// ROUTE
// =====================================

const route = useRoute();


// =====================================
// PROJECT
// =====================================

const project = computed(() => {

    return projects.find(
        item => item.slug === route.params.slug
    );

});


// =====================================
// GALLERY
// =====================================

const imageCount = computed(() => {

    return String(
        project.value?.images?.length ?? 0
    ).padStart(2, '0');

});


// =====================================
// CAROUSEL STATE
// =====================================

const carouselRotation = ref(0);

const isDragging = ref(false);

const startX = ref(0);

const currentX = ref(0);


// =====================================
// SMOOTH ROTATION
// =====================================

let animationFrame: number | null = null;

let currentRotation = 0;

let targetRotation = 0;


function animateRotation() {

    if (animationFrame !== null) {
        return;
    }

    const animate = () => {

        const difference =
            targetRotation - currentRotation;

        /*
         * Hoe kleiner dit getal,
         * hoe langzamer en vloeiender
         * de animatie.
         */

        currentRotation +=
            difference * 0.12;


        /*
         * Wanneer we bijna bij het
         * doel zijn, stoppen we netjes.
         */

        if (Math.abs(difference) < 0.01) {

            currentRotation =
                targetRotation;

            carouselRotation.value =
                currentRotation;

            animationFrame = null;

            return;

        }


        carouselRotation.value =
            currentRotation;


        animationFrame =
            requestAnimationFrame(
                animate
            );

    };


    animationFrame =
        requestAnimationFrame(
            animate
        );

}


// =====================================
// CYLINDER
// =====================================

const radius = computed(() => {

    const count =
        project.value?.images?.length ?? 1;


    const cardWidth =
        window.innerWidth <= 768

            ? 350

            : window.innerWidth <= 991

                ? 560

                : 700;


    /*
     * Grotere radius zorgt voor
     * meer ruimte tussen de foto's.
     */

    const spacingFactor = 1.35;


    return Math.round(

        (
            cardWidth /

            (
                2 *

                Math.tan(
                    Math.PI / count
                )
            )
        ) *

        spacingFactor

    );

});


const angle = computed(() => {

    const count =
        project.value?.images?.length ?? 1;

    return 360 / count;

});

// =====================================
// FULLSCREEN IMAGE
// =====================================

const fullscreenImage =
    ref<string | null>(null);


const fullscreenAlt =
    ref('');

    // =====================================
// OPEN FULLSCREEN
// =====================================

function openFullscreen(
    image: string,
    index: number
) {

    fullscreenImage.value =
        image;


    fullscreenAlt.value =
        `${project.value?.title ?? 'Project'} screenshot ${index + 1}`;

}


// =====================================
// CLOSE FULLSCREEN
// =====================================

function closeFullscreen() {

    fullscreenImage.value =
        null;

    fullscreenAlt.value =
        '';

}


// =====================================
// ESCAPE KEY
// =====================================

function handleKeydown(
    event: KeyboardEvent
) {

    if (
        event.key === 'Escape' &&
        fullscreenImage.value
    ) {

        closeFullscreen();

    }

}


// =====================================
// FRONT IMAGE
// =====================================

function isFrontImage(
    index: number
): boolean {

    const count =
        project.value?.images?.length ?? 1;


    if (count <= 1) {
        return true;
    }


    const imageRotation =
        (
            (
                index * angle.value +
                carouselRotation.value
            ) % 360 + 360
        ) % 360;


    const normalized =
        imageRotation > 180
            ? imageRotation - 360
            : imageRotation;


    return (
        Math.abs(normalized) <
        angle.value / 2
    );

}


// =====================================
// ROTATION
// =====================================

function rotateNext() {

    targetRotation -=
        angle.value;

    animateRotation();

}


function rotatePrevious() {

    targetRotation +=
        angle.value;

    animateRotation();

}


// =====================================
// MOUSE DRAG
// =====================================

function startDrag(
    event: MouseEvent
) {

    /*
     * Een eventuele lopende animatie
     * stoppen zodat de gebruiker direct
     * controle krijgt.
     */

    if (animationFrame !== null) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame = null;

    }


    /*
     * Synchroniseer de huidige positie.
     */

    currentRotation =
        carouselRotation.value;

    targetRotation =
        currentRotation;


    isDragging.value = true;

    startX.value =
        event.clientX;

    currentX.value =
        event.clientX;

}


function drag(
    event: MouseEvent
) {

    if (!isDragging.value) {
        return;
    }


    currentX.value =
        event.clientX;


    const difference =
        currentX.value -
        startX.value;


    if (Math.abs(difference) > 50) {

        if (difference > 0) {

            rotatePrevious();

        } else {

            rotateNext();

        }


        startX.value =
            currentX.value;

    }

}


function stopDrag() {

    isDragging.value = false;

}


// =====================================
// TOUCH
// =====================================

function startTouch(
    event: TouchEvent
) {

    if (!event.touches.length) {
        return;
    }


    /*
     * Stop eventuele animatie
     * wanneer de gebruiker opnieuw
     * begint te slepen.
     */

    if (animationFrame !== null) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame = null;

    }


    currentRotation =
        carouselRotation.value;

    targetRotation =
        currentRotation;


    isDragging.value = true;


    startX.value =
        event.touches[0].clientX;

    currentX.value =
        event.touches[0].clientX;

}


function moveTouch(
    event: TouchEvent
) {

    if (
        !isDragging.value ||
        !event.touches.length
    ) {
        return;
    }


    currentX.value =
        event.touches[0].clientX;


    const difference =
        currentX.value -
        startX.value;


    if (Math.abs(difference) > 50) {

        if (difference > 0) {

            rotatePrevious();

        } else {

            rotateNext();

        }


        startX.value =
            currentX.value;

    }

}


function endTouch() {

    isDragging.value = false;

    currentX.value = 0;

    startX.value = 0;

}


// =====================================
// SCROLL REVEAL
// =====================================

let revealObserver:
    IntersectionObserver | null = null;


function setupRevealObserver() {

    const elements =
        document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right'
        );


    revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

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
                threshold: 0.12
            }

        );


    elements.forEach(
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

    setupRevealObserver();


    window.addEventListener(
        'keydown',
        handleKeydown
    );

});


onUnmounted(() => {

    revealObserver?.disconnect();


    window.removeEventListener(
        'keydown',
        handleKeydown
    );


    if (animationFrame !== null) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame = null;

    }

});

</script>


<template>

    <!-- =====================================
         PROJECT
    ====================================== -->

    <main
        v-if="project"
        class="project-detail"
    >

        <div class="container">


            <!-- =====================================
                 PROJECT HEADER
            ====================================== -->

            <header
                class="project-detail-header"
            >

                <div
                    class="section-label reveal"
                >
                    {{ project.category }}
                </div>


                <h1
                    class="reveal"
                    style="transition-delay: 100ms"
                >
                    {{ project.title }}
                </h1>


                <p
                    class="reveal"
                    style="transition-delay: 200ms"
                >
                    {{ project.description }}
                </p>


                <div
                    v-if="
                        project.github ||
                        project.demo
                    "
                    class="project-actions reveal"
                    style="transition-delay: 300ms"
                >

                    <a
                        v-if="project.github"
                        :href="project.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-outline-light"
                    >

                        GitHub

                        <i
                            class="bi bi-github ms-2"
                        ></i>

                    </a>


                    <a
                        v-if="project.demo"
                        :href="project.demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-primary"
                    >

                        Live demo

                        <i
                            class="bi bi-arrow-up-right ms-2"
                        ></i>

                    </a>

                </div>

            </header>


            <!-- =====================================
                 MAIN VIDEO
                 Video krijgt voorrang
                 op de hoofdfoto.
            ====================================== -->

            <section
                v-if="project.video"
                class="project-video reveal"
                style="transition-delay: 150ms"
            >

                <div class="section-label">
                    PROJECT DEMO
                </div>


                <h2>
                    Bekijk het project in actie.
                </h2>


                <div class="project-video-wrapper">

                    <video
                        controls
                        autoplay
                        muted
                        playsinline
                    >

                        <source
                            :src="project.video"
                            type="video/mp4"
                        />

                        Je browser ondersteunt
                        deze video niet.

                    </video>

                </div>

            </section>


            <!-- =====================================
                 MAIN IMAGE

                 Alleen tonen wanneer
                 er geen video beschikbaar is.
            ====================================== -->

            <div
                v-else-if="project.image"
                class="project-detail-image reveal"
                style="transition-delay: 150ms"
            >

                <img
                    :src="project.image"
                    :alt="project.title"
                />

            </div>


            <!-- =====================================
                 PROJECT GALLERY
            ====================================== -->

            <section
                v-if="project.images?.length"
                class="project-cylinder-gallery"
            >

                <div
                    class="project-cylinder-header reveal"
                >

                    <div>

                        <div class="section-label">
                            PROJECT GALLERY
                        </div>

                        <h2>
                            Het project van alle kanten.
                        </h2>

                    </div>


                    <div
                        class="project-cylinder-count"
                    >

                        {{ imageCount }}

                        <span>
                            IMAGES
                        </span>

                    </div>

                </div>


                <!-- =====================================
                     CYLINDER STAGE
                ====================================== -->

                <div
                    class="cylinder-stage reveal"
                    style="transition-delay: 150ms"
                    @mousedown="startDrag"
                    @mousemove="drag"
                    @mouseup="stopDrag"
                    @mouseleave="stopDrag"
                    @touchstart="startTouch"
                    @touchmove="moveTouch"
                    @touchend="endTouch"
                    @touchcancel="endTouch"
                >

                    <div
                        class="cylinder"
                        :class="{
                            dragging: isDragging
                        }"
                        :style="{
                            transform:
                                `translateZ(-${radius}px) rotateY(${carouselRotation}deg)`
                        }"
                    >

                        <div
    v-for="(
        image,
        index
    ) in project.images"
    :key="image"
    class="cylinder-card"
    :class="{
        'is-front':
            isFrontImage(index)
    }"
    :style="{
        transform:
            `rotateY(${index * angle}deg) translateZ(${radius}px)`
    }"
    @click="
        isFrontImage(index) &&
        openFullscreen(
            image,
            index
        )
    "
>

    <div
        v-if="isFrontImage(index)"
        class="cylinder-fullscreen-icon"
    >

        <i
            class="bi bi-arrows-fullscreen"
        ></i>

    </div>


    <img
        :src="image"
        :alt="
            `${project.title} screenshot ${index + 1}`
        "
        draggable="false"
    />


    <div
        class="cylinder-number"
    >

        {{
            String(
                index + 1
            ).padStart(
                2,
                '0'
            )
        }}

    </div>

</div>

                    </div>


                    <!-- CENTER -->

                    <div
                        class="cylinder-center-line"
                    ></div>


                    <!-- LEFT -->

                    <button
                        type="button"
                        class="
                            cylinder-arrow
                            cylinder-arrow-left
                        "
                        aria-label="
                            Vorige afbeelding
                        "
                        @click="rotatePrevious"
                    >

                        <i
                            class="bi bi-arrow-left"
                        ></i>

                    </button>


                    <!-- RIGHT -->

                    <button
                        type="button"
                        class="
                            cylinder-arrow
                            cylinder-arrow-right
                        "
                        aria-label="
                            Volgende afbeelding
                        "
                        @click="rotateNext"
                    >

                        <i
                            class="bi bi-arrow-right"
                        ></i>

                    </button>

                </div>


                <!-- HINT -->

                <div
                    class="cylinder-hint reveal"
                >

                    <i
                        class="bi bi-arrows"
                    ></i>

                    Sleep om de carousel te draaien

                </div>

            </section>


            <!-- =====================================
                 PROJECT CONTENT
            ====================================== -->

            <section
                class="project-detail-content"
            >

                <div class="row g-5">


                    <!-- =====================================
                         MAIN CONTENT
                    ====================================== -->

                    <div class="col-lg-8">


                        <!-- FEATURES -->

                        <section
                            v-if="
                                project.features?.length
                            "
                            class="
                                project-section
                                reveal
                            "
                        >

                            <div class="section-label">
                                FEATURES
                            </div>


                            <h2>
                                Wat heb ik gebouwd?
                            </h2>


                            <div class="row g-3">

                                <div
                                    v-for="(
                                        feature,
                                        index
                                    ) in project.features"
                                    :key="feature"
                                    class="col-md-6"
                                >

                                    <div
                                        class="
                                            feature-card
                                            reveal
                                        "
                                        :style="{
                                            transitionDelay:
                                                `${index * 100}ms`
                                        }"
                                    >

                                        <span
                                            class="
                                                feature-number
                                            "
                                        >

                                            {{
                                                String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    '0'
                                                )
                                            }}

                                        </span>


                                        <span>
                                            {{ feature }}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </section>


                        <!-- =====================================
                             CHALLENGE
                        ====================================== -->

                        <section
                            v-if="
                                project.challenges
                            "
                            class="
                                project-section
                                reveal
                            "
                        >

                            <div class="section-label">
                                CHALLENGE
                            </div>


                            <h2>
                                De uitdaging
                            </h2>


                            <p
                                class="large-text"
                            >
                                {{ project.challenges }}
                            </p>

                        </section>


                        <!-- =====================================
                             SOLUTION
                        ====================================== -->

                        <section
                            v-if="
                                project.solution
                            "
                            class="
                                project-section
                                reveal
                            "
                        >

                            <div class="section-label">
                                SOLUTION
                            </div>


                            <h2>
                                De oplossing
                            </h2>


                            <p
                                class="large-text"
                            >
                                {{ project.solution }}
                            </p>

                        </section>

                    </div>


                    <!-- =====================================
                         SIDEBAR
                    ====================================== -->

                    <aside
                        class="col-lg-4"
                    >


                        <!-- TECHNOLOGIES -->

                        <div
                            class="
                                technology-box
                                reveal-right
                            "
                        >

                            <div class="section-label">
                                TECHNOLOGIES
                            </div>


                            <div
                                class="
                                    detail-technologies
                                "
                            >

                                <span
                                    v-for="
                                        technology in
                                        project.technologies
                                    "
                                    :key="technology"
                                    class="technology"
                                >

                                    {{ technology }}

                                </span>

                            </div>

                        </div>


                        <!-- ROLE -->

                        <div
                            v-if="
                                project.role?.length
                            "
                            class="
                                technology-box
                                mt-4
                                reveal-right
                            "
                            style="
                                transition-delay: 150ms
                            "
                        >

                            <div class="section-label">
                                MIJN ROL
                            </div>


                            <div class="role-list">

                                <div
                                    v-for="(
                                        role,
                                        index
                                    ) in project.role"
                                    :key="role"
                                    class="role-item"
                                    :style="{
                                        transitionDelay:
                                            `${index * 80}ms`
                                    }"
                                >

                                    <i
                                        class="
                                            bi
                                            bi-check2
                                        "
                                    ></i>


                                    <span>
                                        {{ role }}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </section>


            <!-- =====================================
                 BACK TO PROJECTS
            ====================================== -->

            <div
                class="
                    project-back
                    reveal
                "
            >

                <RouterLink
                    to="/projects"
                    class="project-link"
                >

                    <i
                        class="
                            bi
                            bi-arrow-left
                        "
                    ></i>

                    Terug naar projecten

                </RouterLink>

            </div>

        </div>

    </main>


    <!-- =====================================
         PROJECT NOT FOUND
    ====================================== -->

    <main
        v-else
        class="page-section"
    >

        <div class="container">

            <div class="section-label">
                404
            </div>


            <h1>
                Project niet gevonden.
            </h1>


            <RouterLink
                to="/projects"
                class="project-link"
            >

                Terug naar projecten

                <i
                    class="
                        bi
                        bi-arrow-right
                    "
                ></i>

            </RouterLink>

        </div>

    </main>
    <!-- =====================================
     FULLSCREEN IMAGE
===================================== -->

<Teleport to="body">

    <Transition name="fullscreen">

        <div
            v-if="fullscreenImage"
            class="fullscreen-overlay"
            @click.self="closeFullscreen"
        >

            <!-- CLOSE -->

            <button
                type="button"
                class="fullscreen-close"
                aria-label="Sluiten"
                @click="closeFullscreen"
            >

                <i
                    class="bi bi-x-lg"
                ></i>

            </button>


            <!-- IMAGE -->

            <img
                :src="fullscreenImage"
                :alt="fullscreenAlt"
            />

        </div>

    </Transition>

</Teleport>

</template>


<style scoped>

/* =========================================
   PROJECT DETAIL
========================================= */

.project-detail {
    position: relative;
    overflow: hidden;
    isolation: isolate;
}


/* =========================================
   PROJECT GLOW
========================================= */

.project-detail::before {
    content: "";

    position: absolute;

    top: -250px;
    left: -250px;

    width: 750px;
    height: 750px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(108, 99, 255, 0.30) 0%,
            rgba(155, 92, 255, 0.18) 30%,
            rgba(0, 212, 255, 0.08) 50%,
            transparent 72%
        );

    filter: blur(40px);

    pointer-events: none;

    z-index: -1;
}


/* Blauwe tweede gloed */

.project-detail::after {
    content: "";

    position: absolute;

    top: 250px;
    right: -300px;

    width: 700px;
    height: 700px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(0, 212, 255, 0.20) 0%,
            rgba(108, 99, 255, 0.12) 40%,
            transparent 72%
        );

    filter: blur(50px);

    pointer-events: none;

    z-index: -1;
}

/* =========================================
   PROJECT VIDEO
========================================= */

.project-video {

    width: 100%;

    margin-top: 80px;

}


/* =========================================
   VIDEO HEADING
========================================= */

.project-video .section-label {

    margin-bottom: 18px;

}


.project-video h2 {

    margin-bottom: 32px;

}


/* =========================================
   VIDEO WRAPPER
========================================= */

.project-video-wrapper {

    overflow: hidden;

    border:
        1px solid
        rgba(255, 255, 255, 0.1);

    border-radius: 16px;

    background: #000;

    box-shadow:
        0 30px 80px
        rgba(0, 0, 0, 0.35);

}


/* =========================================
   VIDEO
========================================= */

.project-video video {

    display: block;

    width: 100%;

    height: auto;

    background: #000;

}

/* =========================================
   3D CYLINDER PROJECT GALLERY
========================================= */

.project-cylinder-gallery {
    position: relative;

    margin: 140px 0;
    padding: 100px 0;

    overflow: hidden;

    border-top:
        1px solid
        rgba(255, 255, 255, 0.07);

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.07);
}

.project-cylinder-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 30px;
    margin-bottom: 70px;
}

.project-cylinder-header h2 {
    margin: 0;

    font-size: clamp(
        2.5rem,
        5vw,
        5rem
    );

    line-height: 0.9;
    letter-spacing: -3px;
}

.project-cylinder-count {
    color: #ffffff;

    font-family: monospace;
    font-size: 2rem;
}

.project-cylinder-count span {
    margin-left: 8px;

    color: #6c7080;

    font-size: 0.7rem;
    letter-spacing: 2px;
}


/* =========================================
   CYLINDER STAGE
========================================= */

.cylinder-stage {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 650px;

    perspective: 1800px;
    perspective-origin: center center;

    cursor: grab;
    user-select: none;
    touch-action: pan-y;
}

.cylinder-stage:active {
    cursor: grabbing;
}


/* =========================================
   CYLINDER
========================================= */

.cylinder {
    position: absolute;

    top: 50%;
    left: 50%;

    width: 0;
    height: 0;

    transform-style: preserve-3d;

    transition:
        transform 700ms cubic-bezier(
            0.22,
            1,
            0.36,
            1
        );

    will-change: transform;
}

.cylinder.dragging {
    transition: none;
}


/* =========================================
   CYLINDER CARDS
========================================= */

.cylinder-card {
    position: absolute;

    top: 50%;
    left: 50%;

    width: 700px;
    height: 450px;

    margin-left: -350px;
    margin-top: -225px;

    overflow: hidden;

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    border-radius: 14px;

    background: #11131a;

    box-shadow:
        0 30px 80px
        rgba(0, 0, 0, 0.45);

    backface-visibility: hidden;

    transition:
        border-color 0.3s ease;
}

.cylinder-card:hover {
    border-color:
        rgba(108, 99, 255, 0.6);
}

.cylinder-card img {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    pointer-events: none;
    user-select: none;

    filter: grayscale(100%);

    transition:
        filter 0.5s ease,
        transform 0.5s ease;
}

.cylinder-card.is-front img {
    filter: grayscale(0%);
}


/* =========================================
   CYLINDER CENTER LINE
========================================= */

.cylinder-center-line {
    position: absolute;

    top: 50%;
    left: 50%;

    width: 700px;
    height: 450px;

    border:
        1px solid
        rgba(108, 99, 255, 0.08);

    border-radius: 14px;

    transform:
        translate(-50%, -50%);

    pointer-events: none;
}


/* =========================================
   CYLINDER IMAGE NUMBER
========================================= */

.cylinder-number {
    position: absolute;

    right: 20px;
    bottom: 20px;

    padding: 7px 11px;

    color: #ffffff;

    font-family: monospace;
    font-size: 0.8rem;

    background:
        rgba(8, 9, 13, 0.75);

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    border-radius: 5px;

    backdrop-filter: blur(10px);
}


/* =========================================
   CYLINDER ARROWS
========================================= */

.cylinder-arrow {
    position: absolute;

    top: 50%;
    z-index: 50;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 55px;
    height: 55px;

    color: #ffffff;

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    border-radius: 50%;

    background:
        rgba(17, 19, 26, 0.85);

    backdrop-filter: blur(10px);

    cursor: pointer;

    transform: translateY(-50%);

    transition:
        background 0.2s ease,
        border-color 0.2s ease,
        transform 0.2s ease;
}

.cylinder-arrow-left {
    left: 20px;
}

.cylinder-arrow-right {
    right: 20px;
}

.cylinder-arrow:hover {
    border-color: #6c63ff;

    background:
        rgba(108, 99, 255, 0.2);

    transform:
        translateY(-50%)
        scale(1.08);
}


/* =========================================
   CYLINDER HINT
========================================= */

.cylinder-hint {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 10px;
    margin-top: 40px;

    color: #6f7484;

    font-size: 0.8rem;
    letter-spacing: 1px;
}

.cylinder-hint i {
    color: #6c63ff;
    font-size: 1rem;
}


/* =========================================
   FULLSCREEN OVERLAY
========================================= */



.fullscreen-overlay {

    position: fixed;

    inset: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    padding: 40px;

    background:
        rgba(0, 0, 0, 0.92);

    backdrop-filter:
        blur(12px);

    z-index: 9999;

    cursor: zoom-out;

}


/* =========================================
   FULLSCREEN IMAGE
========================================= */

.fullscreen-overlay img {

    display: block;

    max-width: 100%;

    max-height: 100%;

    object-fit: contain;

    border-radius: 8px;

    cursor: default;

    box-shadow:
        0 30px 100px
        rgba(0, 0, 0, 0.7);

}


/* =========================================
   CLOSE BUTTON
========================================= */

.fullscreen-close {

    position: absolute;

    top: 24px;
    right: 24px;

    display: flex;

    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    border-radius: 50%;

    background:
        rgba(255, 255, 255, 0.08);

    color: #ffffff;

    font-size: 1.1rem;

    cursor: pointer;

    transition:
        transform 0.3s ease,
        background 0.3s ease;

}


.fullscreen-close:hover {

    transform:
        scale(1.08);

    background:
        rgba(139, 92, 246, 0.7);

}

/* =========================================
   FULLSCREEN TRANSITION
========================================= */

.fullscreen-enter-active,
.fullscreen-leave-active {

    transition:
        opacity 0.35s ease;

}


.fullscreen-enter-from,
.fullscreen-leave-to {

    opacity: 0;

}


.fullscreen-enter-active img {

    animation:
        fullscreenImageIn
        0.45s
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        );

}


@keyframes fullscreenImageIn {

    from {

        opacity: 0;

        transform:
            scale(0.92);

    }

    to {

        opacity: 1;

        transform:
            scale(1);

    }

}

/* =========================================
   PROJECT CONTENT
========================================= */

.project-detail-content {
    padding-top: 160px;
    padding-bottom: 80px;
}


/* =========================================
   PROJECT SECTION
========================================= */

.project-section {
    position: relative;

    margin-bottom: 140px;
}


.project-section:last-child {
    margin-bottom: 0;
}


/* =========================================
   SECTION HEADINGS
========================================= */

.project-section h2 {
    margin-top: 18px;
    margin-bottom: 36px;

   

    line-height: 1.05;

    letter-spacing: -0.04em;
}


.project-section .section-label {
    color: #a78bfa;

    
}


/* =========================================
   LARGE TEXT
========================================= */

.large-text {
    max-width: 850px;

    margin: 0;

    color:
        rgba(
            255,
            255,
            255,
            0.68
        );

    font-size:
        clamp(
            1.1rem,
            1.4vw,
            1.4rem
        );

    line-height: 1.9;
}


/* =========================================
   FEATURES GRID
========================================= */

.project-section .row {
    margin-top: 50px;
}


/* =========================================
   FEATURE CARD
========================================= */

.feature-card {
    position: relative;

    display: flex;

    align-items: center;

    gap: 22px;

    min-height: 110px;

    padding:
        26px
        30px;

    overflow: hidden;

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.18
        );

    border-radius: 14px;

    background:
        linear-gradient(
            135deg,
            rgba(
                139,
                92,
                246,
                0.09
            ),
            rgba(
                255,
                255,
                255,
                0.02
            )
        );

    transition:
        transform 0.35s ease,
        border-color 0.35s ease,
        box-shadow 0.35s ease,
        background 0.35s ease;
}


/* =========================================
   FEATURE HOVER
========================================= */

.feature-card:hover {
    transform:
        translateY(-6px);

    border-color:
        rgba(
            167,
            139,
            250,
            0.55
        );

    background:
        linear-gradient(
            135deg,
            rgba(
                139,
                92,
                246,
                0.16
            ),
            rgba(
                255,
                255,
                255,
                0.04
            )
        );

    box-shadow:
        0
        20px
        50px
        rgba(
            0,
            0,
            0,
            0.3
        );
}


/* =========================================
   FEATURE NUMBER
========================================= */

.feature-number {
    display: flex;

    align-items: center;

    justify-content: center;

    flex-shrink: 0;

    width: 54px;
    height: 54px;

    border-radius: 14px;

    color: #ffffff;

    background:
        linear-gradient(
            135deg,
            #7c3aed,
            #a855f7
        );

    font-size: 1rem;

    font-weight: 700;

    letter-spacing: 0.05em;

    box-shadow:
        0
        0
        25px
        rgba(
            139,
            92,
            246,
            0.35
        );
}


/* =========================================
   FEATURE TEXT
========================================= */

.feature-card > span:last-child {
    color:
        rgba(
            255,
            255,
            255,
            0.78
        );

    font-size: 1.05rem;

    line-height: 1.5;

    font-weight: 500;
}


/* =========================================
   TECHNOLOGY / SIDEBAR
========================================= */

.technology-box {
    padding: 32px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

    border-radius: 16px;

    background:
        linear-gradient(
            145deg,
            rgba(
                255,
                255,
                255,
                0.035
            ),
            rgba(
                139,
                92,
                246,
                0.05
            )
        );
}


/* =========================================
   DETAIL TECHNOLOGIES
========================================= */

.detail-technologies {
    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin-top: 24px;
}


.detail-technologies .technology {
    padding:
        9px
        14px;

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.22
        );

    border-radius: 8px;

    color:
        rgba(
            255,
            255,
            255,
            0.75
        );

    background:
        rgba(
            139,
            92,
            246,
            0.06
        );

    font-size: 0.85rem;

    transition:
        background 0.25s ease,
        border-color 0.25s ease,
        transform 0.25s ease;
}


.detail-technologies .technology:hover {
    transform:
        translateY(-2px);

    border-color:
        rgba(
            167,
            139,
            250,
            0.55
        );

    background:
        rgba(
            139,
            92,
            246,
            0.14
        );
}


/* =========================================
   ROLE
========================================= */

.role-list {
    display: flex;
    flex-direction: column;

    gap: 15px;

    margin-top: 20px;
}

.role-item {
    display: flex;
    align-items: flex-start;

    gap: 12px;

    color: #c4c7d4;
    line-height: 1.6;
}

.role-item i {
    flex: 0 0 auto;

    margin-top: 3px;

    color: #6c63ff;
}


/* =========================================
   BACK TO PROJECTS
========================================= */

.project-back {
    padding-top: 100px;
    padding-bottom: 140px;
}

/* =========================================
   PROJECT MAIN IMAGE
========================================= */

.project-detail-image {
    width: 100%;
    max-width: 900px;

    margin: 60px auto 0;

    overflow: hidden;

    border-radius: 16px;

    border:
        1px solid
        rgba(255, 255, 255, 0.08);

    background: #11131a;
}


.project-detail-image img {
    display: block;

    width: 100%;
    height: auto;

    max-height: 500px;

    object-fit: cover;
}

/* =========================================
   CHALLENGE SECTION
========================================= */

.challenge-section {
    position: relative;
    isolation: isolate;
}

.challenge-section::before {
    content: "";

    position: absolute;

    top: -180px;
    left: -280px;

    width: 650px;
    height: 650px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(108, 99, 255, 0.20) 0%,
            rgba(155, 92, 255, 0.13) 32%,
            rgba(0, 212, 255, 0.07) 52%,
            transparent 72%
        );

    filter: blur(45px);

    pointer-events: none;

    z-index: -1;
}
/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 991px) {

    .project-detail-content {
        padding-top: 110px;
    }


    .project-section {
        margin-bottom: 100px;
    }


    .technology-box {
        margin-top: 20px;
    }

/* Project detail */

    .project-detail-header {
        padding-top: 60px;
        padding-bottom: 50px;
    }

    .project-detail-image {
        height: 450px;
    }

    .project-detail-content {
        padding-top: 90px;
    }

    .project-section {
        margin-bottom: 80px;
    }


    /* Cylinder */

    .project-cylinder-gallery {
        margin: 100px 0;
        padding: 80px 0;
    }

    .cylinder-stage {
        height: 550px;
        perspective: 1400px;
    }

    .cylinder-card {
        width: 560px;
        height: 360px;

        margin-left: -280px;
        margin-top: -180px;
    }

    .cylinder-center-line {
        width: 560px;
        height: 360px;
    }
}


@media (max-width: 768px) {

    .project-detail-content {
        padding-top: 90px;
    }


    .project-section {
        margin-bottom: 80px;
    }


    .project-section h2 {
        margin-bottom: 28px;
    }


    .project-section .row {
        margin-top: 35px;
    }


    .feature-card {
        min-height: 90px;

        padding:
            20px
            22px;

        gap: 16px;
    }


    .feature-number {
        width: 46px;
        height: 46px;

        border-radius: 12px;
    }


    .technology-box {
        padding: 25px;
    }

       /* Cylinder */

    .project-cylinder-header {
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 40px;
    }

    .project-cylinder-gallery {
        margin: 80px 0;
        padding: 60px 0;
    }

    .cylinder-stage {
        height: 400px;
        perspective: 1000px;
    }

    .cylinder-card {
        width: 350px;
        height: 230px;

        margin-left: -175px;
        margin-top: -115px;

        border-radius: 10px;
    }

    .cylinder-center-line {
        width: 350px;
        height: 230px;
        border-radius: 10px;
    }

    .cylinder-arrow {
        width: 45px;
        height: 45px;
    }

    .cylinder-arrow-left {
        left: 5px;
    }

    .cylinder-arrow-right {
        right: 5px;
    }

    .cylinder-hint {
        margin-top: 25px;
    }


    /* Project detail */

    .project-detail {
        padding-top: 120px;
    }

    .project-detail-header {
        padding-top: 40px;
        padding-bottom: 45px;
    }

    .project-detail-header h1 {
        font-size:
            clamp(
                2.8rem,
                13vw,
                4rem
            );

        letter-spacing: -3px;
    }

    .project-detail-header p {
        font-size: 1rem;
    }

    .project-detail-image {
        height: 300px;
        border-radius: 8px;
    }

    .project-detail-content {
        padding-top: 70px;
        padding-bottom: 40px;
    }

     .project-video {

        margin-top: 50px;

    }


    .project-video h2 {

        margin-bottom: 24px;

    }

      .project-section {
        margin-bottom: 70px;
    }

    .project-section h2 {
        font-size: 2.2rem;
    }

    .project-actions {
        flex-direction: column;
        align-items: flex-start;
    }

    .feature-card {
        min-height: auto;
        padding: 20px;
    }

    .technology-box {
        padding: 22px;
    }

}

</style>