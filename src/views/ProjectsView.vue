kun je aan mijn projectsview ook reveal animaties toevoegen. gecorrigeerde bestand terugsturen: ```vue
<script setup lang="ts">

import {
    computed,
    nextTick,
    onMounted,
    onUnmounted
} from 'vue';

import { projects } from '../data/projects';

import PageHeader from '../components/ProjectHeader.vue';


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
                threshold: 0.08
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

});


onUnmounted(() => {

    revealObserver?.disconnect();

});

</script>


<template>

    <main class="projects-page">


        <!-- =====================================
             PAGE HEADER
        ====================================== -->

        <PageHeader
            label="PORTFOLIO"
            title="Mijn projecten"
            description="Een selectie van interactieve applicaties, webapplicaties en gameprojecten die ik heb ontwikkeld met moderne webtechnologieën."
        />


        <!-- =====================================
             PROJECTS
        ====================================== -->

        <section class="projects-list">

            <div class="container">

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

                                        {{
                                            project.category
                                        }}

                                    </div>


                                    <!-- TITLE -->

                                    <h2 class="h3 mb-3">

                                        {{
                                            project.title
                                        }}

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

                                            :key="
                                                technology
                                            "

                                            class="
                                                technology
                                            "
                                        >

                                            {{
                                                technology
                                            }}

                                        </span>

                                    </div>

                                </div>

                            </RouterLink>

                        </article>

                    </div>

                </div>

            </div>

        </section>


    </main>

</template>


<style scoped>


/* =====================================
   PAGE
===================================== */

.projects-page {

    position: relative;

    width: 100%;

    min-height: 100vh;

    overflow: hidden;

}


/* =====================================
   PROJECT LIST
===================================== */

.projects-list {

    width: 100%;

    padding:
        80px
        0
        120px;

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

    border-radius:
        14px;

    background:
        #11131a;

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

    color:
        inherit;

    text-decoration:
        none;

}


/* =====================================
   PROJECT IMAGE
===================================== */

.project-image {

    position: relative;

    height:
        300px;

    overflow:
        hidden;

    background:
        #08090d;

}


.project-image-inner {

    position: absolute;

    inset:
        0;

    overflow:
        hidden;

}


.project-image img {

    display:
        block;

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

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

    position:
        absolute;

    inset:
        0;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    background:
        rgba(
            8,
            9,
            13,
            0.65
        );

    opacity:
        0;

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

    border-radius:
        30px;

    color:
        #ffffff;

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

    opacity:
        1;

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

    position:
        absolute;

    right:
        20px;

    bottom:
        20px;

    padding:
        6px
        10px;

    font-family:
        monospace;

    font-size:
        0.75rem;

    color:
        #ffffff;

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

    border-radius:
        6px;

    backdrop-filter:
        blur(10px);

}


/* =====================================
   PROJECT CONTENT
===================================== */

.project-content {

    flex-grow:
        1;

}


/* =====================================
   PROJECT CATEGORY
===================================== */

.project-category {

    color:
        #a78bfa;

    font-family:
        monospace;

    font-size:
        0.7rem;

    font-weight:
        700;

    letter-spacing:
        0.16em;

    text-transform:
        uppercase;

}


/* =====================================
   PROJECT TITLE
===================================== */

.project-content h2 {

    color:
        #ffffff;

    line-height:
        1.1;

    letter-spacing:
        -0.03em;

}


/* =====================================
   PROJECT DESCRIPTION
===================================== */

.project-content p {

    color:
        #a8adbd;

    line-height:
        1.7;

}


/* =====================================
   TECHNOLOGY LABELS
===================================== */

.technology {

    display:
        inline-flex;

    align-items:
        center;

    padding:
        6px
        12px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.12
        );

    border-radius:
        999px;

    color:
        rgba(
            255,
            255,
            255,
            0.65
        );

    background:
        rgba(
            255,
            255,
            255,
            0.04
        );

    font-family:
        monospace;

    font-size:
        0.75rem;

    letter-spacing:
        0.04em;

    transition:
        transform 220ms ease,
        color 220ms ease,
        border-color 220ms ease,
        background-color 220ms ease,
        box-shadow 220ms ease;

}


/*
   Belangrijk:
   De technology labels hebben hun
   eigen hover en reageren niet op
   de hover van de afbeelding.
*/

.technology:hover {

    color:
        #ffffff;

    border-color:
        rgba(
            139,
            92,
            246,
            0.6
        );

    background:
        rgba(
            139,
            92,
            246,
            0.10
        );

    transform:
        translateY(-2px)
        scale(1.05);

    box-shadow:
        0 5px 18px
        rgba(
            139,
            92,
            246,
            0.20
        );

}


/* =====================================
   REVEAL
===================================== */

.reveal {

    opacity:
        0;

    transform:
        translateY(50px);

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


.reveal.is-visible {

    opacity:
        1;

    transform:
        translate3d(
            0,
            0,
            0
        );

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 576px) {

    .projects-list {

        padding:
            60px
            0
            80px;

    }


    .project-image {

        height:
            240px;

    }

}

</style>
```
