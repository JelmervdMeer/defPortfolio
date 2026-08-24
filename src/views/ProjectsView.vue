<script setup lang="ts">

import {
    computed,
    nextTick,
    onMounted,
    onUnmounted
} from 'vue';

import { projects } from '../data/projects';


// =====================================
// PROJECTS
// =====================================

const projectList = computed(() => {

    return projects;

});


// =====================================
// REVEAL ANIMATION
// =====================================

let revealObserver:
    IntersectionObserver | null = null;


async function setupRevealObserver() {

    await nextTick();


    const elements =
        document.querySelectorAll(
            '.reveal'
        );


    if (!elements.length) {
        return;
    }


    revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        'is-visible'
                    );


                    revealObserver?.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.08
            }

        );


    elements.forEach(element => {

        revealObserver?.observe(
            element
        );

    });

}


// =====================================
// LIFECYCLE
// =====================================

onMounted(() => {

    setupRevealObserver();

});


onUnmounted(() => {

    revealObserver?.disconnect();

});

</script>


<template>

    <main
        class="
            projects-page
            page-section
        "
    >

        <div class="container">


            <!-- =====================================
                 HEADER
            ====================================== -->

            <div
                class="
                    projects-heading
                    reveal
                    mb-5
                "
            >

                <div class="section-label">

                    PORTFOLIO

                </div>


                <h1 class="mt-3 mb-4">

                    Mijn projecten

                </h1>


                <p class="mb-0">

                    Een selectie van interactieve applicaties,
                    webapplicaties en gameprojecten die ik heb
                    ontwikkeld met moderne webtechnologieën.

                </p>

            </div>


            <!-- =====================================
                 PROJECTS
            ====================================== -->

            <section
                class="
                    projects-list
                    pb-5
                "
            >

                <div class="row g-4">


                    <div
                        v-for="(
                            project,
                            index
                        ) in projectList"
                        :key="project.slug"
                        class="
                            col-md-6
                            d-flex
                        "
                    >

                        <article
                            class="
                                project-card
                                reveal
                                h-100
                                w-100
                            "
                            :style="{
                                transitionDelay:
                                    `${index * 120}ms`
                            }"
                        >

                            <RouterLink
                                :to="
                                    `/projects/${project.slug}`
                                "
                                class="
                                    project-card-link
                                    h-100
                                "
                            >


                                <!-- =====================================
                                     IMAGE
                                ====================================== -->

                                <div class="project-image">

                                    <div
                                        class="
                                            project-image-inner
                                        "
                                    >

                                        <img
                                            :src="
                                                project.image
                                            "
                                            :alt="
                                                project.title
                                            "
                                        />

                                    </div>


                                    <!-- =====================================
                                         OVERLAY
                                    ====================================== -->

                                    <div
                                        class="
                                            project-overlay
                                        "
                                    >

                                        <span>

                                            Bekijk project

                                            <i
                                                class="
                                                    bi
                                                    bi-arrow-up-right
                                                    ms-2
                                                "
                                            ></i>

                                        </span>

                                    </div>


                                    <!-- =====================================
                                         PROJECT NUMBER
                                    ====================================== -->

                                    <div
                                        class="
                                            project-number
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

                                    </div>

                                </div>


                                <!-- =====================================
                                     CONTENT
                                ====================================== -->

                                <div
                                    class="
                                        project-content
                                        p-4
                                    "
                                >


                                    <!-- CATEGORY -->

                                    <div
                                        class="
                                            project-category
                                            mb-3
                                        "
                                    >

                                        {{ project.category }}

                                    </div>


                                    <!-- TITLE -->

                                    <h2 class="h3 mb-3">

                                        {{ project.title }}

                                    </h2>


                                    <!-- DESCRIPTION -->

                                    <p class="mb-4">

                                        {{
                                            project.shortDescription
                                        }}

                                    </p>


                                    <!-- =====================================
                                         TECHNOLOGIES
                                    ====================================== -->

                                    <div
                                        class="
                                            technology-list
                                            d-flex
                                            flex-wrap
                                            gap-2
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

                            </RouterLink>

                        </article>

                    </div>

                </div>

            </section>

        </div>

    </main>

</template>


<style scoped>

/* =====================================
   PAGE
===================================== */

.projects-page {
    position: relative;

    min-height: 100vh;

    padding-top: 160px;

    overflow: hidden;

    isolation: isolate;
}


/* =====================================
   PROJECTS ATMOSPHERE
===================================== */

/* Paarse gloed linksboven */

.projects-page::before {
    content: "";

    position: absolute;

    top: -250px;
    left: -300px;

    width: 850px;
    height: 850px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(108, 99, 255, 0.30) 0%,
            rgba(155, 92, 255, 0.18) 30%,
            rgba(0, 212, 255, 0.08) 52%,
            transparent 72%
        );

    filter: blur(45px);

    pointer-events: none;

    z-index: 0;
}


/* Blauwe gloed rechtsonder */

.projects-page::after {
    content: "";

    position: absolute;

    right: -350px;
    bottom: 0;

    width: 850px;
    height: 850px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(0, 212, 255, 0.18) 0%,
            rgba(108, 99, 255, 0.10) 40%,
            transparent 72%
        );

    filter: blur(55px);

    pointer-events: none;

    z-index: 0;
}


/* =====================================
   CONTENT LAYER
===================================== */

.projects-page > .container {
    position: relative;

    z-index: 1;
}


/* =====================================
   HEADER
===================================== */

.projects-heading {
    max-width: 700px;
}


.projects-heading h1 {
    font-size:
        clamp(
            2.8rem,
            6vw,
            5rem
        );

    line-height: 1;

    letter-spacing: -0.04em;
}


.projects-heading p {
    max-width: 620px;

    color:
        rgba(
            255,
            255,
            255,
            0.55
        );

    font-size:
        clamp(
            1rem,
            1.2vw,
            1.35rem
        );

    line-height: 1.8;
}


/* =====================================
   PROJECT CARD
===================================== */

.project-card {
    overflow: hidden;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

    border-radius: 14px;

    background: #11131a;

    transition:
        transform 0.5s
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        ),
        border-color 0.4s ease,
        box-shadow 0.5s ease;
}


.project-card:hover {
    transform:
        translateY(-10px);

    border-color:
        rgba(
            108,
            99,
            255,
            0.7
        );

    box-shadow:
        0 30px 70px
        rgba(
            0,
            0,
            0,
            0.35
        );
}


/* =====================================
   PROJECT LINK
===================================== */

.project-card-link {
    display: flex;

    flex-direction: column;

    height: 100%;

    color: inherit;

    text-decoration: none;
}


/* =====================================
   PROJECT IMAGE
===================================== */

.project-image {
    position: relative;

    height: 300px;

    overflow: hidden;

    background: #08090d;
}


.project-image-inner {
    position: absolute;

    inset: 0;

    overflow: hidden;
}


.project-image img {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    transition:
        transform 0.7s
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        );
}


.project-card:hover
.project-image img {
    transform:
        scale(1.08);
}


/* =====================================
   PROJECT OVERLAY
===================================== */

.project-overlay {
    position: absolute;

    inset: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    background:
        rgba(
            8,
            9,
            13,
            0.65
        );

    opacity: 0;

    transition:
        opacity 0.4s ease;
}


.project-overlay span {
    padding:
        12px
        20px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.3
        );

    border-radius: 30px;

    color: #ffffff;

    background:
        rgba(
            255,
            255,
            255,
            0.08
        );

    transform:
        translateY(15px);

    transition:
        transform 0.4s ease;
}


.project-card:hover
.project-overlay {
    opacity: 1;
}


.project-card:hover
.project-overlay span {
    transform:
        translateY(0);
}


/* =====================================
   PROJECT NUMBER
===================================== */

.project-number {
    position: absolute;

    right: 20px;
    bottom: 20px;

    padding:
        6px
        10px;

    font-family: monospace;

    font-size: 0.75rem;

    color: #ffffff;

    background:
        rgba(
            8,
            9,
            13,
            0.75
        );

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.15
        );

    border-radius: 6px;

    backdrop-filter:
        blur(10px);
}


/* =====================================
   PROJECT CONTENT
===================================== */

.project-content {
    flex-grow: 1;
}


/* =====================================
   PROJECT CATEGORY
===================================== */

.project-category {
    color: #a78bfa;

    font-family: monospace;

    font-size: 0.7rem;

    font-weight: 700;

    letter-spacing: 0.16em;

    text-transform: uppercase;
}


/* =====================================
   PROJECT TITLE
===================================== */

.project-content h2 {
    color: #ffffff;

    line-height: 1.1;

    letter-spacing: -0.03em;
}


/* =====================================
   PROJECT DESCRIPTION
===================================== */

.project-content p {
    color: #a8adbd;

    line-height: 1.7;
}

/* =====================================
   MOBILE
===================================== */

@media (max-width: 576px) {

    .projects-page {
        padding-top: 120px;
    }


    .project-image {
        height: 240px;
    }


    .projects-page::before {
        top: -300px;
        left: -400px;

        width: 700px;
        height: 700px;
    }


    .projects-page::after {
        right: -400px;

        width: 650px;
        height: 650px;
    }

}

</style>