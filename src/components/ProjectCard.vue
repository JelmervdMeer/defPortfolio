<script setup lang="ts">

import type { Project } from '../data/projects';


// =====================================
// PROPS
// =====================================

defineProps<{
    project: Project;
}>();

</script>


<template>

    <article class="project-card">

        <RouterLink
            :to="`/projects/${project.slug}`"
            class="project-card-link"
        >


            <!-- =====================================
                 IMAGE
            ====================================== -->

            <div class="project-image">

                <img
                    :src="project.image"
                    :alt="project.title"
                />

                <div class="project-overlay">

                    <span>

                        Bekijk project

                        <i
                            class="
                                bi
                                bi-arrow-up-right
                            "
                        ></i>

                    </span>

                </div>

            </div>


            <!-- =====================================
                 CONTENT
            ====================================== -->

            <div class="project-content">

                <div class="project-category">

                    {{ project.category }}

                </div>

                <h3>

                    {{ project.title }}

                </h3>

                <p>

                    {{ project.shortDescription }}

                </p>


                <!-- =====================================
                     TECHNOLOGIES
                ====================================== -->

                <div class="technology-list">

                    <span
                        v-for="
                            technology
                            in project.technologies
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

</template>


<style scoped>

/* =====================================
   CARD
===================================== */

.project-card {

    width:
        100%;

}


.project-card-link {

    display:
        block;

    width:
        100%;

    color:
        inherit;

    text-decoration:
        none;

}


/* =====================================
   IMAGE
   1024 × 768 = 4 / 3
===================================== */

.project-image {

    position:
        relative;

    width:
        100%;

    aspect-ratio:
        4 / 3;

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

    object-position:
        center;

    transition:
        transform
        0.6s
        ease;

}


/* =====================================
   OVERLAY
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
            0.68
        );

    opacity:
        0;

    transition:
        opacity
        0.35s
        ease;

}


.project-overlay span {

    display:
        flex;

    align-items:
        center;

    gap:
        8px;

    color:
        #ffffff;

    font-family:
        var(--font-heading);

    font-size:
        0.9rem;

    font-weight:
        600;

    letter-spacing:
        0.04em;

}


/* =====================================
   HOVER
===================================== */

.project-image:hover
.project-overlay {

    opacity:
        1;

}


.project-image:hover img {

    transform:
        scale(1.05);

}


/* =====================================
   REDUCED MOTION
===================================== */

@media (prefers-reduced-motion: reduce) {

    .project-image img,
    .project-overlay {

        transition:
            none;

    }

}

</style>