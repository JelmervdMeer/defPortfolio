```vue
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

        currentRotation +=
            difference * 0.12;

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

    isDragging.value =
        true;

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

    isDragging.value =
        false;
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

    isDragging.value =
        true;

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

    isDragging.value =
        false;

    currentX.value =
        0;

    startX.value =
        0;
}


// =====================================
// FEATURES CAROUSEL
// =====================================

const featureIndex = ref(0);
const isFeatureDragging = ref(false);
const featureStartY = ref(0);

let featureInterval: number | null = null;

const currentFeatureIndex = computed(() => {

    const features =
        project.value?.features ?? [];

    if (!features.length) {
        return 0;
    }

    return (
        (
            featureIndex.value %
            features.length
        ) +
        features.length
    ) % features.length;
});


function getFeatureOffset(
    index: number
): number {

    const features =
        project.value?.features ?? [];

    if (!features.length) {
        return 0;
    }

    let offset =
        index -
        currentFeatureIndex.value;

    const count =
        features.length;

    if (offset > count / 2) {
        offset -= count;
    }

    if (offset < -count / 2) {
        offset += count;
    }

    return offset;
}


function nextFeature() {

    const features =
        project.value?.features ?? [];

    if (features.length <= 1) {
        return;
    }

    featureIndex.value++;
}


function previousFeature() {

    const features =
        project.value?.features ?? [];

    if (features.length <= 1) {
        return;
    }

    featureIndex.value--;
}


function startFeatureDrag(
    event: MouseEvent
) {

    isFeatureDragging.value =
        true;

    featureStartY.value =
        event.clientY;

    stopFeatureAutoplay();
}


function moveFeatureDrag(
    event: MouseEvent
) {

    if (!isFeatureDragging.value) {
        return;
    }

    const difference =
        event.clientY -
        featureStartY.value;

    if (Math.abs(difference) > 40) {

        if (difference < 0) {
            nextFeature();
        } else {
            previousFeature();
        }

        featureStartY.value =
            event.clientY;
    }
}


function stopFeatureDrag() {

    if (!isFeatureDragging.value) {
        return;
    }

    isFeatureDragging.value =
        false;

    startFeatureAutoplay();
}


function startFeatureAutoplay() {

    stopFeatureAutoplay();

    if (
        !project.value?.features ||
        project.value.features.length <= 1
    ) {
        return;
    }

    featureInterval =
        window.setInterval(() => {

            if (!isFeatureDragging.value) {
                nextFeature();
            }

        }, 3000);
}


function stopFeatureAutoplay() {

    if (featureInterval !== null) {

        window.clearInterval(
            featureInterval
        );

        featureInterval = null;
    }
}


// =====================================
// FEATURE TOUCH
// =====================================

function startFeatureTouch(
    event: TouchEvent
) {

    if (!event.touches.length) {
        return;
    }

    isFeatureDragging.value =
        true;

    featureStartY.value =
        event.touches[0].clientY;

    stopFeatureAutoplay();
}


function moveFeatureTouch(
    event: TouchEvent
) {

    if (
        !isFeatureDragging.value ||
        !event.touches.length
    ) {
        return;
    }

    const difference =
        event.touches[0].clientY -
        featureStartY.value;

    if (Math.abs(difference) > 40) {

        if (difference < 0) {
            nextFeature();
        } else {
            previousFeature();
        }

        featureStartY.value =
            event.touches[0].clientY;
    }
}


function endFeatureTouch() {

    isFeatureDragging.value =
        false;

    startFeatureAutoplay();
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

    startFeatureAutoplay();

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

    stopFeatureAutoplay();

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


                <!-- CYLINDER -->

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

                        aria-label="Vorige afbeelding"

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

                        aria-label="Volgende afbeelding"

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
                 FEATURES
                 VERTICAL CAROUSEL
            ====================================== -->

            <section
                v-if="project.features?.length"

                class="
                    project-split-section
                    project-features-section
                    reveal
                "
            >

                <div class="project-split-grid">

                    <!-- TITLE -->

                    <div class="project-split-title">

                        <div class="section-label">
                            FEATURES
                        </div>

                        <h2>

                            Wat heb ik

                            <span class="animated-gradient-text">
                                gebouwd?
                            </span>

                        </h2>

                    </div>


                    <!-- VERTICAL CAROUSEL -->

                    <div
                        class="project-split-content"
                    >

                        <div
                            class="feature-carousel-wrapper"

                            @mousedown="startFeatureDrag"
                            @mousemove="moveFeatureDrag"
                            @mouseup="stopFeatureDrag"
                            @mouseleave="stopFeatureDrag"

                            @touchstart="startFeatureTouch"
                            @touchmove="moveFeatureTouch"
                            @touchend="endFeatureTouch"
                            @touchcancel="endFeatureTouch"
                        >

                            <div
                                class="feature-carousel"
                            >

                                <div
                                    v-for="(
                                        feature,
                                        index
                                    ) in project.features"

                                    :key="feature"

                                    class="feature-carousel-item"

                                    :class="{
                                        active:
                                            getFeatureOffset(index) === 0,

                                        previous:
                                            getFeatureOffset(index) === -1,

                                        next:
                                            getFeatureOffset(index) === 1,

                                        hidden:
                                            Math.abs(
                                                getFeatureOffset(index)
                                            ) > 1
                                    }"

                                    :style="{
                                        '--feature-offset':
                                            getFeatureOffset(index)
                                    }"
                                >

                                    <span
                                        class="feature-carousel-number"
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

                                    <span
                                        class="feature-carousel-text"
                                    >
                                        {{ feature }}
                                    </span>

                                </div>

                            </div>


                            <!-- CONTROLS -->

                            <div
                                class="feature-carousel-controls"
                            >

                                <button
                                    type="button"
                                    class="feature-carousel-arrow"
                                    aria-label="Vorige feature"
                                    @click="previousFeature"
                                >

                                    <i
                                        class="bi bi-arrow-up"
                                    ></i>

                                </button>


                                <div
                                    class="feature-carousel-counter"
                                >

                                    {{
                                        String(
                                            currentFeatureIndex + 1
                                        ).padStart(
                                            2,
                                            '0'
                                        )
                                    }}

                                    <span>
                                        /
                                        {{
                                            String(
                                                project.features.length
                                            ).padStart(
                                                2,
                                                '0'
                                            )
                                        }}
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    class="feature-carousel-arrow"
                                    aria-label="Volgende feature"
                                    @click="nextFeature"
                                >

                                    <i
                                        class="bi bi-arrow-down"
                                    ></i>

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            <!-- =====================================
                 CHALLENGE
                 SPLIT SECTION
            ====================================== -->

            <section
                v-if="project.challenges"

                class="
                    project-split-section
                    project-split-reversed
                    reveal
                "
            >

                <div class="project-split-grid">

                    <div
                        class="project-split-content"
                    >

                        <p class="large-text">
                            {{ project.challenges }}
                        </p>

                    </div>


                    <div
                        class="project-split-title"
                    >

                        <div class="section-label">
                            CHALLENGE
                        </div>

                        <h2>

                            De

                            <span class="animated-gradient-text">
                                uitdaging
                            </span>

                        </h2>

                    </div>

                </div>

            </section>


            <!-- =====================================
                 SOLUTION
            ====================================== -->

            <section
                v-if="project.solution"

                class="
                    project-split-section
                    reveal
                "
            >

                <div class="project-split-grid">

                    <div
                        class="project-split-title"
                    >

                        <div class="section-label">
                            SOLUTION
                        </div>

                        <h2>

                            De

                            <span class="animated-gradient-text">
                                oplossing
                            </span>

                        </h2>

                    </div>


                    <div
                        class="project-split-content"
                    >

                        <p class="large-text">
                            {{ project.solution }}
                        </p>

                    </div>

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
    ====================================== -->

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
    min-height: 100vh;
    overflow: hidden;
    isolation: isolate;
    padding-top: 120px;
}


/* =========================================
   PROJECT GLOWS
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
            rgba(108, 99, 255, 0.28) 0%,
            rgba(155, 92, 255, 0.14) 35%,
            rgba(0, 212, 255, 0.06) 55%,
            transparent 72%
        );

    filter: blur(45px);

    pointer-events: none;

    z-index: -1;
}


.project-detail::after {
    content: "";

    position: absolute;

    top: 500px;
    right: -350px;

    width: 700px;
    height: 700px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(0, 212, 255, 0.14) 0%,
            rgba(108, 99, 255, 0.10) 40%,
            transparent 72%
        );

    filter: blur(60px);

    pointer-events: none;

    z-index: -1;
}


/* =========================================
   PROJECT HEADER
========================================= */

.project-detail-header {
    max-width: 950px;

    padding-top: 50px;
    padding-bottom: 90px;
}


.project-detail-header .section-label {
    margin-bottom: 24px;
}


.project-detail-header h1 {
    margin-bottom: 28px;

    font-size:
        clamp(
            3.5rem,
            7vw,
            7rem
        );

    line-height: 0.9;

    letter-spacing: -0.055em;
}


.project-detail-header p {
    max-width: 760px;

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
            1.05rem,
            1.4vw,
            1.3rem
        );

    line-height: 1.8;
}


/* =========================================
   PROJECT ACTIONS
========================================= */

.project-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    margin-top: 36px;
}


.project-actions .btn {
    display: inline-flex;
    align-items: center;

    padding: 13px 22px;

    border-radius: 10px;

    font-weight: 500;

    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;
}


.project-actions .btn:hover {
    transform: translateY(-3px);

    box-shadow:
        0 12px 30px
        rgba(0, 0, 0, 0.25);
}


/* =========================================
   PROJECT VIDEO
========================================= */

.project-video {
    position: relative;

    width: 100%;

    padding: 90px 0 120px;
}


.project-video .section-label {
    margin-bottom: 18px;
}


.project-video h2 {
    margin-bottom: 36px;

    font-size:
        clamp(
            2.5rem,
            5vw,
            5rem
        );

    line-height: 0.95;

    letter-spacing: -0.04em;
}


.project-video-wrapper {
    position: relative;

    overflow: hidden;

    border:
        1px solid
        rgba(255, 255, 255, 0.1);

    border-radius: 18px;

    background: #000;

    box-shadow:
        0 30px 80px
        rgba(0, 0, 0, 0.4);
}


.project-video video {
    display: block;

    width: 100%;
    height: auto;
}


/* =========================================
   MAIN IMAGE
========================================= */

.project-detail-image {
    width: 100%;
    max-width: 1100px;

    margin: 0 auto;

    overflow: hidden;

    border:
        1px solid
        rgba(255, 255, 255, 0.1);

    border-radius: 18px;

    background: #11131a;

    box-shadow:
        0 30px 80px
        rgba(0, 0, 0, 0.35);
}


.project-detail-image img {
    display: block;

    width: 100%;
    height: auto;

    object-fit: cover;
}


/* =========================================
   PROJECT GALLERY
========================================= */

.project-cylinder-gallery {
    position: relative;

    margin: 140px 0;

    padding: 110px 0;

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

    font-size:
        clamp(
            2.5rem,
            5vw,
            5rem
        );

    line-height: 0.95;

    letter-spacing: -0.04em;
}


.project-cylinder-count {
    display: flex;

    align-items: baseline;
    gap: 10px;

    color: #ffffff;

    font-family: monospace;

    font-size: 2rem;
}


.project-cylinder-count span {
    color: #6f7484;

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
        transform 700ms
        cubic-bezier(
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
        rgba(255, 255, 255, 0.13);

    border-radius: 16px;

    background: #11131a;

    box-shadow:
        0 30px 80px
        rgba(0, 0, 0, 0.45);

    backface-visibility: hidden;

    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}


.cylinder-card:hover {
    border-color:
        rgba(139, 92, 246, 0.6);
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


.cylinder-card.is-front:hover img {
    transform: scale(1.02);
}


/* =========================================
   FULLSCREEN ICON
========================================= */

.cylinder-fullscreen-icon {
    position: absolute;

    top: 18px;
    right: 18px;

    z-index: 5;

    display: flex;

    align-items: center;
    justify-content: center;

    width: 42px;
    height: 42px;

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    border-radius: 50%;

    background:
        rgba(8, 9, 13, 0.7);

    backdrop-filter: blur(10px);

    color: #ffffff;
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
        rgba(139, 92, 246, 0.1);

    border-radius: 16px;

    transform:
        translate(-50%, -50%);

    pointer-events: none;
}


/* =========================================
   CYLINDER NUMBER
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

    border-radius: 6px;

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

    width: 56px;
    height: 56px;

    color: #ffffff;

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    border-radius: 50%;

    background:
        rgba(17, 19, 26, 0.85);

    backdrop-filter: blur(12px);

    cursor: pointer;

    transform:
        translateY(-50%);

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
    border-color: #8b5cf6;

    background:
        rgba(139, 92, 246, 0.2);

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
    color: #a78bfa;

    font-size: 1rem;
}


/* =========================================
   PROJECT SPLIT SECTIONS
========================================= */

.project-split-section {
    position: relative;

    padding: 140px 0;

    border-top:
        1px solid
        rgba(255, 255, 255, 0.06);
}


.project-split-grid {
    display: grid;

    grid-template-columns:
        minmax(280px, 0.8fr)
        minmax(0, 1.2fr);

    gap: 100px;

    align-items: start;
}


.project-split-title {
    position: sticky;

    top: 140px;
}


.project-split-title .section-label {
    margin-bottom: 20px;

    color: #a78bfa;
}


.project-split-title h2 {
    margin: 0;

    font-size:
        clamp(
            2.5rem,
            5vw,
            5rem
        );

    line-height: 1.10;

    letter-spacing: -0.04em;
}


.project-split-content {
    min-width: 0;
}


/* =========================================
   CHALLENGE REVERSED
========================================= */

.project-split-reversed .project-split-grid {
    grid-template-columns:
        minmax(0, 1.2fr)
        minmax(280px, 0.8fr);
}


.project-split-reversed .project-split-content {
    grid-column: 1;
}


.project-split-reversed .project-split-title {
    grid-column: 2;
}


/* =========================================
   FEATURE CAROUSEL
========================================= */

.feature-carousel-wrapper {
    position: relative;

    display: flex;

    align-items: center;
    justify-content: center;

    min-height: 430px;

    user-select: none;

    cursor: grab;

    touch-action: pan-x;
}


.feature-carousel-wrapper:active {
    cursor: grabbing;
}


.feature-carousel {
    position: relative;

    width: 100%;
    height: 360px;

    overflow: hidden;

    mask-image:
        linear-gradient(
            to bottom,
            transparent 0%,
            #000 18%,
            #000 82%,
            transparent 100%
        );

    -webkit-mask-image:
        linear-gradient(
            to bottom,
            transparent 0%,
            #000 18%,
            #000 82%,
            transparent 100%
        );
}


.feature-carousel-item {
    position: absolute;

    top: 50%;
    left: 0;

    display: flex;

    align-items: center;

    gap: 22px;

    width: 100%;

    min-height: 90px;

    padding: 20px 26px;

    border:
        1px solid
        rgba(139, 92, 246, 0.14);

    border-radius: 14px;

    background:
        rgba(255, 255, 255, 0.025);

    opacity: 0;

    transform:
        translateY(
            calc(
                var(--feature-offset) * 110px
            )
        )
        scale(0.88);

    transition:
        transform 0.55s
        cubic-bezier(
            0.22,
            1,
            0.36,
            1
        ),
        opacity 0.45s ease,
        background 0.35s ease,
        border-color 0.35s ease,
        box-shadow 0.35s ease;

    pointer-events: none;
}


.feature-carousel-item.active {
    opacity: 1;

    border-color:
        rgba(139, 92, 246, 0.45);

    background:
        linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.16),
            rgba(255, 255, 255, 0.035)
        );

    box-shadow:
        0 25px 60px
        rgba(0, 0, 0, 0.3),

        0 0 45px
        rgba(139, 92, 246, 0.1);

    transform:
        translateY(-50%)
        scale(1);

    pointer-events: auto;
}


.feature-carousel-item.previous,
.feature-carousel-item.next {
    opacity: 0.38;

    transform:
        translateY(
            calc(
                -50% +
                var(--feature-offset) * 110px
            )
        )
        scale(0.86);
}


.feature-carousel-item.hidden {
    opacity: 0;
}


.feature-carousel-number {
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

    font-family: monospace;

    font-size: 0.9rem;

    font-weight: 700;

    box-shadow:
        0 0 25px
        rgba(139, 92, 246, 0.3);
}


.feature-carousel-text {
    color:
        rgba(255, 255, 255, 0.82);

    font-size: 1.15rem;

    line-height: 1.5;

    font-weight: 500;
}


.feature-carousel-item.active
.feature-carousel-text {
    color: #ffffff;
}

/* Tijdens animatie volledig uitschakelen */
.project-scroll-showcase.is-animating .project-scroll-arrow {
    pointer-events: none;
    cursor: wait;
    opacity: 0.35;
}


/* =========================================
   FEATURE CONTROLS
========================================= */

.feature-carousel-controls {
    position: absolute;

    right: 0;
    top: 50%;

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 14px;

    transform:
        translateY(-50%);
}


.feature-carousel-arrow {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;

    border:
        1px solid
        rgba(255, 255, 255, 0.14);

    border-radius: 50%;

    color: #ffffff;

    background:
        rgba(17, 19, 26, 0.8);

    backdrop-filter: blur(10px);

    cursor: pointer;

    transition:
        background 0.25s ease,
        border-color 0.25s ease,
        transform 0.25s ease;
}


.feature-carousel-arrow:hover {
    border-color: #8b5cf6;

    background:
        rgba(139, 92, 246, 0.2);

    transform: scale(1.08);
}


.feature-carousel-counter {
    color: #ffffff;

    font-family: monospace;

    font-size: 0.8rem;

    letter-spacing: 1px;

    writing-mode: vertical-rl;
}


.feature-carousel-counter span {
    color: #666b7a;
}


/* =========================================
   LARGE TEXT
========================================= */

.large-text {
    max-width: 850px;

    margin: 0;

    color:
        rgba(255, 255, 255, 0.68);

    font-size:
        clamp(
            1.1rem,
            1.4vw,
            1.4rem
        );

    line-height: 1.9;
}


/* =========================================
   BACK TO PROJECTS
========================================= */

.project-back {
    display: flex;

    justify-content: center;

    padding:
        110px 0
        150px;
}


.project-link {
    display: inline-flex;

    align-items: center;

    gap: 12px;

    padding: 15px 24px;

    border:
        1px solid
        rgba(139, 92, 246, 0.35);

    border-radius: 10px;

    color: #ffffff;

    background:
        rgba(139, 92, 246, 0.06);

    text-decoration: none;

    font-size: 0.95rem;

    font-weight: 500;

    transition:
        transform 0.25s ease,
        background 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
}


.project-link:hover {
    transform: translateY(-3px);

    border-color:
        rgba(139, 92, 246, 0.7);

    background:
        rgba(139, 92, 246, 0.14);

    box-shadow:
        0 10px 35px
        rgba(108, 99, 255, 0.18);
}


/* =========================================
   FULLSCREEN
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

    backdrop-filter: blur(12px);

    z-index: 9999;

    cursor: zoom-out;
}


.fullscreen-overlay img {
    display: block;

    max-width: 100%;
    max-height: 100%;

    object-fit: contain;

    border-radius: 10px;

    cursor: default;

    box-shadow:
        0 30px 100px
        rgba(0, 0, 0, 0.7);
}


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

    cursor: pointer;

    transition:
        transform 0.3s ease,
        background 0.3s ease;
}


.fullscreen-close:hover {
    transform: scale(1.08);

    background:
        rgba(139, 92, 246, 0.7);
}


/* =========================================
   REVEAL
========================================= */

.reveal {
    opacity: 0;

    transform:
        translateY(40px);

    transition:
        opacity 700ms ease,
        transform 700ms
        cubic-bezier(
            0.2,
            0.8,
            0.2,
            1
        );
}


.reveal.is-visible {
    opacity: 1;

    transform:
        translateY(0);
}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 991px) {
    .project-split-section {
        padding: 100px 0;
    }

    .project-split-grid {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .project-split-title {
        position: static;
        width: 100%;
        order: 1;
    }

    .project-split-content {
        width: 100%;
        order: 2;
    }

    /* Challenge */
    .project-split-reversed .project-split-grid {
        display: flex;
        flex-direction: column;
    }

    .project-split-reversed .project-split-title {
        order: 1;
    }

    .project-split-reversed .project-split-content {
        order: 2;
    }

    .project-split-reversed
    .project-split-content,
    .project-split-reversed
    .project-split-title {
        grid-column: auto;
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

    .project-detail {
        padding-top: 100px;
    }

    .project-detail-header {
        padding-top: 40px;
        padding-bottom: 70px;
    }

    .project-detail-header h1 {
        font-size:
            clamp(
                3rem,
                13vw,
                5rem
            );
    }

    .project-cylinder-header {
        align-items: flex-start;

        flex-direction: column;

        margin-bottom: 40px;
    }

    .project-cylinder-gallery {
        margin: 80px 0;

        padding: 70px 0;
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

    .feature-carousel-wrapper {
        min-height: 360px;

        padding-right: 50px;
    }

    .project-back {
        padding:
            80px 0
            100px;
    }
}


@media (max-width: 576px) {

    .project-detail {
        padding-top: 90px;
    }

    .project-split-section {
        padding: 75px 0;
    }

    .project-split-grid {
        gap: 35px;
    }

    .project-actions {
        flex-direction: column;
    }

    .project-actions .btn {
        justify-content: center;
    }

    .feature-carousel-wrapper {
        min-height: 330px;

        padding-right: 40px;
    }

    .feature-carousel {
        height: 280px;
    }

    .feature-carousel-item {
        gap: 12px;

        padding: 16px;
    }

    .feature-carousel-number {
        width: 42px;
        height: 42px;

        font-size: 0.75rem;
    }

    .feature-carousel-text {
        font-size: 0.9rem;
    }

    .feature-carousel-arrow {
        width: 38px;
        height: 38px;
    }

    .project-link {
        width: 100%;

        justify-content: center;
    }
}

</style>