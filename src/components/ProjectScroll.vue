<script setup lang="ts">

import {
    computed,
    onMounted,
    ref
} from 'vue';

import { projects } from '../data/projects';


// =========================================
// STATE
// =========================================

const currentIndex = ref(0);
const displayIndex = ref(0);

const isAnimating = ref(false);

const animationDirection =
    ref<'next' | 'previous'>('next');


// =========================================
// CURRENT PROJECT
// =========================================

const currentProject = computed(() => {
    return projects[displayIndex.value];
});


// =========================================
// SETTINGS
// =========================================

const ROTATION_DURATION = 850;


// =========================================
// PRELOAD ALL IMAGES
// =========================================

onMounted(() => {

    projects.forEach(project => {

        const image = new Image();
        image.src = project.image;

    });

});


// =========================================
// PRELOAD NEXT IMAGE
// =========================================

function preloadImage(src: string): Promise<void> {

    return new Promise(resolve => {

        const image = new Image();

        image.onload = () => resolve();
        image.onerror = () => resolve();

        image.src = src;

    });

}


// =========================================
// WAIT
// =========================================

function wait(ms: number): Promise<void> {

    return new Promise(resolve => {

        window.setTimeout(resolve, ms);

    });

}


// =========================================
// WAIT FOR RENDER
// =========================================

function waitForRender(): Promise<void> {

    return new Promise(resolve => {

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                resolve();

            });

        });

    });

}


// =========================================
// CHANGE PROJECT
// =========================================

async function changeProject(direction: number): Promise<void> {

    // -------------------------------
    // HARD LOCK
    // -------------------------------

    if (isAnimating.value) return;

    const targetIndex =
        currentIndex.value + direction;

    // -------------------------------
    // OUT OF BOUNDS
    // -------------------------------

    if (
        targetIndex < 0 ||
        targetIndex >= projects.length
    ) {
        return;
    }

    // -------------------------------
    // LOCK BUTTONS IMMEDIATELY
    // -------------------------------

    isAnimating.value = true;

    animationDirection.value =
        direction > 0
            ? 'next'
            : 'previous';

    // -------------------------------
    // PRELOAD NEXT IMAGE
    // -------------------------------

    await preloadImage(
        projects[targetIndex].image
    );

    // -------------------------------
    // PLAY ROTATION
    // -------------------------------

    await wait(ROTATION_DURATION);

    // -------------------------------
    // CHANGE PROJECT
    // -------------------------------

    currentIndex.value = targetIndex;
    displayIndex.value = targetIndex;

    // -------------------------------
    // WAIT UNTIL VUE HAS RENDERED
    // -------------------------------

    await waitForRender();

    // -------------------------------
    // UNLOCK BUTTONS
    // -------------------------------

    isAnimating.value = false;

}


// =========================================
// NEXT
// =========================================

function showNextProject(): void {

    if (isAnimating.value) return;

    void changeProject(1);

}


// =========================================
// PREVIOUS
// =========================================

function showPreviousProject(): void {

    if (isAnimating.value) return;

    void changeProject(-1);

}

</script>


<template>

    <div
        class="project-scroll-showcase"
        :class="{
            'is-animating':
                isAnimating,

            'direction-next':
                animationDirection === 'next',

            'direction-previous':
                animationDirection === 'previous'
        }"
    >

        <!-- =====================================
             3D SCENE
        ====================================== -->

        <div class="project-card-scene">

            <div class="project-card-3d">

                <!-- =================================
                     TOP CUBE
                ================================== -->

                <div
                    class="project-card-top"
                >

                    <!-- FRONT -->

                    <div
                        class="
                            project-face
                            project-image-face
                        "
                    >

                        <img
                            :src="currentProject.image"
                            :alt="
                                currentProject.title
                            "
                        />


                        <!-- PROJECT BUTTON -->

                        <RouterLink
                            :to="
                                `/projects/${currentProject.slug}`
                            "
                            class="
                                project-view-button
                            "
                        >

                            <span>
                                Bekijk project
                            </span>

                            <i
                                class="
                                    bi
                                    bi-arrow-up-right
                                "
                            ></i>

                        </RouterLink>

                    </div>


                    <!-- BACK -->

                    <div
                        class="
                            project-face
                            project-image-back
                        "
                    >

                        <div
                            class="back-pattern"
                        ></div>

                    </div>

                </div>


                <!-- =================================
                     BOTTOM CUBE
                ================================== -->

                <div
                    class="project-card-bottom"
                >

                    <!-- FRONT -->

                    <div
                        class="
                            project-face
                            project-content-face
                        "
                    >

                        <div
                            class="
                                project-showcase-content
                            "
                        >

                            <!-- CATEGORY -->

                            <span
                                class="
                                    project-showcase-category
                                "
                            >
                                {{
                                    currentProject.category
                                }}
                            </span>


                            <!-- TITLE -->

                            <h3>
                                {{
                                    currentProject.title
                                }}
                            </h3>


                            <!-- DESCRIPTION -->

                            <p>
                                {{
                                    currentProject.shortDescription
                                }}
                            </p>


                            <!-- TECHNOLOGIES -->

                            <div
                                class="
                                    project-showcase-technologies
                                "
                            >

                                <span
                                    v-for="
                                        technology
                                        in currentProject.technologies
                                    "
                                    :key="technology"
                                    class="technology"
                                >
                                    {{ technology }}
                                </span>

                            </div>

                        </div>

                    </div>


                    <!-- BACK -->

                    <div
                        class="
                            project-face
                            project-content-back
                        "
                    >

                        <div
                            class="back-content"
                        >

                            <span>
                                PROJECT
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <!-- =====================================
             CONTROLS
        ====================================== -->

        <div
            class="project-scroll-controls"
        >

            <!-- PREVIOUS -->

            <button
                type="button"
                class="
                    project-scroll-arrow
                "
                :disabled="
                    currentIndex === 0 ||
                    isAnimating
                "
                @click="
                    showPreviousProject
                "
                aria-label="Vorige project"
            >

                <i
                    class="
                        bi
                        bi-arrow-left
                    "
                ></i>

            </button>


            <!-- COUNTER -->

            <div
                class="
                    project-scroll-counter
                "
            >

                <span>
                    {{
                        String(
                            currentIndex + 1
                        ).padStart(
                            2,
                            '0'
                        )
                    }}
                </span>

                <span
                    class="
                        project-scroll-divider
                    "
                >
                    /
                </span>

                <span>
                    {{
                        String(
                            projects.length
                        ).padStart(
                            2,
                            '0'
                        )
                    }}
                </span>

            </div>


            <!-- NEXT -->

            <button
                type="button"
                class="
                    project-scroll-arrow
                "
                :disabled="
                    currentIndex ===
                    projects.length - 1 ||
                    isAnimating
                "
                @click="
                    showNextProject
                "
                aria-label="Volgende project"
            >

                <i
                    class="
                        bi
                        bi-arrow-right
                    "
                ></i>

            </button>

        </div>

    </div>

</template>


<style scoped>

/* =========================================
   SHOWCASE
========================================= */

.project-scroll-showcase {

    position: relative;

    width: 100%;

    perspective:
        1800px;
}


/* =========================================
   3D SCENE
========================================= */

.project-card-scene {

    position: relative;

    width: 100%;

    height: 600px;

    perspective:
        1800px;

    transform-style:
        preserve-3d;
}


/* =========================================
   MAIN 3D CARD
========================================= */

.project-card-3d {

    position: relative;

    width: 100%;

    height: 100%;

    transform-style:
        preserve-3d;
}


/* =========================================
   TOP CUBE
========================================= */

.project-card-top {

    position: absolute;

    top: 0;

    left: 0;

    width: 100%;

    height: 360px;

    transform-style:
        preserve-3d;

    transform-origin:
        center bottom;

    z-index: 2;

    transition:
        transform
        0.85s
        cubic-bezier(
            0.22,
            1,
            0.36,
            1
        );
}


/* =========================================
   BOTTOM CUBE
========================================= */

.project-card-bottom {

    position: absolute;

    left: 0;

    bottom: 0;

    width: 100%;

    height: 240px;

    transform-style:
        preserve-3d;

    transform-origin:
        center top;

    z-index: 1;

    transition:
        transform
        0.85s
        cubic-bezier(
            0.22,
            1,
            0.36,
            1
        );
}


/* =========================================
   NEXT
========================================= */

.direction-next.is-animating
.project-card-top {

    transform:
        rotateY(-180deg);
}


.direction-next.is-animating
.project-card-bottom {

    transform:
        rotateY(180deg);
}


/* =========================================
   PREVIOUS
========================================= */

.direction-previous.is-animating
.project-card-top {

    transform:
        rotateY(180deg);
}


.direction-previous.is-animating
.project-card-bottom {

    transform:
        rotateY(-180deg);
}


/* =========================================
   GENERIC FACE
========================================= */

.project-face {

    position: absolute;

    inset: 0;

    width: 100%;

    height: 100%;

    backface-visibility:
        hidden;

    -webkit-backface-visibility:
        hidden;

    transform-style:
        preserve-3d;
}


/* =========================================
   IMAGE FRONT
========================================= */

.project-image-face {

    position: relative;

    overflow: hidden;

    border-radius:
        18px 18px 0 0;

    background:
        #11131a;

    box-shadow:
        0 20px 50px
        rgba(
            0,
            0,
            0,
            0.35
        );
}


.project-image-face img {

    display: block;

    width: 100%;

    height: 100%;

    object-fit: cover;

    transition:
        transform
        0.6s
        cubic-bezier(
            0.22,
            1,
            0.36,
            1
        );
}


/* =========================================
   IMAGE HOVER
========================================= */

.project-card-scene:hover
.project-image-face img {

    transform:
        scale(1.06);
}


/* =========================================
   IMAGE OVERLAY
========================================= */

.project-image-face::after {

    content: '';

    position: absolute;

    inset: 0;

    pointer-events: none;

    background:
        linear-gradient(
            135deg,
            transparent 30%,
            rgba(
                167,
                139,
                250,
                0.12
            ),
            transparent 70%
        );

    z-index: 1;
}


/* =========================================
   PROJECT BUTTON
========================================= */

.project-view-button {

    position: absolute;

    top: 50%;

    left: 50%;

    z-index: 3;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap:
        10px;

    padding:
        12px
        20px;

    color:
        #ffffff;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.3
        );

    border-radius:
        30px;

    background:
        rgba(
            255,
            255,
            255,
            0.08
        );

    backdrop-filter:
        blur(8px);

    font-size:
        0.85rem;

    font-weight:
        600;

    text-decoration:
        none;

    opacity: 0;

    transform:
        translate(
            -50%,
            calc(-50% + 15px)
        );

    transition:
        opacity
        0.4s ease,

        transform
        0.4s ease,

        background
        0.4s ease,

        border-color
        0.4s ease,

        box-shadow
        0.4s ease;
}


/* =========================================
   PROJECT BUTTON SHOW ON CARD HOVER
========================================= */

.project-card-scene:hover
.project-view-button {

    opacity: 1;

    transform:
        translate(
            -50%,
            -50%
        );
}


/* =========================================
   PROJECT BUTTON HOVER
========================================= */

.project-view-button:hover {

    border-color:
        rgba(
            255,
            255,
            255,
            0.55
        );

    background:
        rgba(
            255,
            255,
            255,
            0.13
        );

    box-shadow:
        0 10px 30px
        rgba(
            0,
            0,
            0,
            0.25
        );

    transform:
        translate(
            -50%,
            -50%
        )
        scale(1.03);
}


/* =========================================
   PROJECT BUTTON ICON
========================================= */

.project-view-button i {

    transition:
        transform
        0.3s ease;
}


.project-view-button:hover i {

    transform:
        translate(
            3px,
            -3px
        );
}


/* =========================================
   IMAGE BACK
========================================= */

.project-image-back {

    overflow: hidden;

    border-radius:
        18px 18px 0 0;

    background:
        linear-gradient(
            135deg,
            #171321,
            #0d0e13
        );

    transform:
        rotateY(180deg);
}


/* =========================================
   BACK PATTERN
========================================= */

.back-pattern {

    position: absolute;

    inset: 0;

    opacity: 0.5;

    background-image:
        radial-gradient(
            rgba(
                167,
                139,
                250,
                0.35
            ) 1px,
            transparent 1px
        );

    background-size:
        22px 22px;
}


/* =========================================
   CONTENT FRONT
========================================= */

.project-content-face {

    overflow: hidden;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

    border-top:
        0;

    border-radius:
        0 0 18px 18px;

    background:
        linear-gradient(
            145deg,
            rgba(
                255,
                255,
                255,
                0.05
            ),
            rgba(
                139,
                92,
                246,
                0.04
            )
        );

    box-shadow:
        0 30px 80px
        rgba(
            0,
            0,
            0,
            0.35
        );
}


/* =========================================
   CONTENT
========================================= */

.project-showcase-content {

    padding:
        30px;
}


/* =========================================
   CATEGORY
========================================= */

.project-showcase-category {

    display: block;

    margin-bottom:
        12px;

    color:
        #a78bfa;

    font-family:
        monospace;

    font-size:
        0.8rem;

    letter-spacing:
        0.15em;

    text-transform:
        uppercase;
}


/* =========================================
   TITLE
========================================= */

.project-showcase-content h3 {

    margin:
        0 0 12px;

    color:
        #ffffff;

    font-family:
        var(--font-heading);

    font-size:
        clamp(
            1.5rem,
            2.5vw,
            2.2rem
        );
}


/* =========================================
   DESCRIPTION
========================================= */

.project-showcase-content p {

    margin:
        0 0 20px;

    color:
        rgba(
            255,
            255,
            255,
            0.58
        );

    line-height:
        1.7;
}


/* =========================================
   TECHNOLOGIES
========================================= */

.project-showcase-technologies {

    display: flex;

    flex-wrap: wrap;

    gap:
        8px;
}


/* =========================================
   TECHNOLOGY
========================================= */

.technology {

    display: inline-flex;

    align-items: center;

    padding:
        6px 10px;

    color:
        rgba(
            255,
            255,
            255,
            0.7
        );

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.1
        );

    border-radius:
        6px;

    background:
        rgba(
            255,
            255,
            255,
            0.03
        );

    font-size:
        0.75rem;

    transition:
        transform
        0.25s ease,

        border-color
        0.25s ease,

        background
        0.25s ease;
}


/* =========================================
   TECHNOLOGY HOVER
========================================= */

.project-card-scene:hover
.technology {

    transform:
        translateY(-2px)
        scale(1.04);

    border-color:
        rgba(
            167,
            139,
            250,
            0.35
        );

    background:
        rgba(
            139,
            92,
            246,
            0.08
        );
}


/* =========================================
   CONTENT BACK
========================================= */

.project-content-back {

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius:
        0 0 18px 18px;

    background:
        linear-gradient(
            135deg,
            #171321,
            #0d0e13
        );

    transform:
        rotateY(180deg);
}


/* =========================================
   BACK CONTENT
========================================= */

.back-content {

    color:
        rgba(
            167,
            139,
            250,
            0.45
        );

    font-family:
        monospace;

    font-size:
        0.75rem;

    letter-spacing:
        0.25em;
}


/* =========================================
   CONTROLS
========================================= */

.project-scroll-controls {

    display: flex;

    align-items: center;

    justify-content:
        space-between;

    margin-top:
        25px;
}


/* =========================================
   ARROW
========================================= */

.project-scroll-arrow {

    display: flex;

    align-items: center;

    justify-content: center;

    width:
        44px;

    height:
        44px;

    padding:
        0;

    color:
        #ffffff;

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.35
        );

    border-radius:
        50%;

    background:
        rgba(
            139,
            92,
            246,
            0.08
        );

    transition:
        transform
        0.25s ease,

        background
        0.25s ease,

        border-color
        0.25s ease;
}


/* =========================================
   ARROW HOVER
========================================= */

.project-scroll-arrow:hover:not(:disabled) {

    transform:
        translateY(-2px);

    border-color:
        rgba(
            139,
            92,
            246,
            0.7
        );

    background:
        rgba(
            139,
            92,
            246,
            0.18
        );
}


/* =========================================
   ARROW DISABLED
========================================= */

.project-scroll-arrow:disabled {

    opacity:
        0.25;

    cursor:
        not-allowed;
}


/* =========================================
   COUNTER
========================================= */

.project-scroll-counter {

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
        0.9rem;

    letter-spacing:
        0.12em;
}


.project-scroll-counter
span:first-child {

    color:
        #a78bfa;
}


.project-scroll-divider {

    margin:
        0 8px;

    color:
        rgba(
            255,
            255,
            255,
            0.2
        );
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {

    .project-card-scene {

        height:
            500px;
    }


    .project-card-top {

        height:
            250px;
    }


    .project-card-bottom {

        height:
            250px;
    }


    .project-showcase-content {

        padding:
            24px;
    }


    .project-showcase-content h3 {

        font-size:
            1.5rem;
    }


    .project-showcase-content p {

        font-size:
            0.9rem;

        margin-bottom:
            18px;
    }


    .project-showcase-technologies {

        gap:
            6px;
    }


    .technology {

        padding:
            5px 8px;

        font-size:
            0.7rem;
    }


    .project-view-button {

        padding:
            9px 14px;

        font-size:
            0.8rem;
    }

}

</style>
```
