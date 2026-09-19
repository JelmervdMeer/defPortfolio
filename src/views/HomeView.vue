<script setup lang="ts">

import SectionLayout from '../components/SectionLayout.vue';
import ProjectScrollShowcase from '../components/ProjectScroll.vue';
import ContactScene from '../components/ContactScene.vue';
import HomeHero from '../components/HomeHero.vue';
import WorkDisciplines from '../components/WorkDisciplines.vue';

</script>


<template>

    <main class="home-page">

        <HomeHero />


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

                        <span class="heading-accent">
                            werk
                        </span>.

                    </template>


                    <div class="section-reveal reveal">

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
                    title="Vijf disciplines, één manier van werken"
                    description="Verschillende disciplines komen samen in één manier van werken. Door techniek, creativiteit, communicatie, vernieuwing en een doelgerichte aanpak te combineren, ontstaan digitale oplossingen die zowel doordacht als bruikbaar zijn."
                >

                    <template #title>

                        Vijf

                        <span class="heading-accent">
                            disciplines
                        </span>,

                        één werkwijze.

                    </template>


                    <div class="section-reveal reveal">

                        <WorkDisciplines />

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

                        <span class="heading-accent">
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

    position:
        relative;

    width:
        100%;

    max-width:
        100%;

    overflow-x:
        clip;

    background:
        var(--color-bg);

}


/* =========================================
   REVEAL
========================================= */

.reveal,
.reveal-left,
.reveal-right {

    opacity:
        0;

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

    opacity:
        1;

    transform:
        translate3d(
            0,
            0,
            0
        );

}


/* =========================================
   HOME SECTIONS
========================================= */

.home-sections {

    position:
        relative;

    display:
        flex;

    flex-direction:
        column;

    gap:
        60px;

    width:
        100%;

}


/* =========================================
   SECTION CONTAINERS
========================================= */

.home-section-container {

    position:
        relative;

    width:
        calc(
            100% - 20px
        );

    max-width:
        1600px;

    margin:
        0 auto;

    overflow:
        hidden;

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

    isolation:
        isolate;

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
   PROJECTS
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


/* =========================================
   CONTACT
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


/* =========================================
   SECTION GLOWS
========================================= */

:deep(.home-projects::before),
:deep(.home-projects::after),
:deep(.home-contact::before),
:deep(.home-contact::after) {

    content:
        "";

    position:
        absolute;

    border-radius:
        50%;

    filter:
        blur(30px);

    pointer-events:
        none;

    z-index:
        -1;

}


:deep(.home-projects::before) {

    top:
        -140px;

    left:
        -180px;

    width:
        520px;

    height:
        520px;

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

}


:deep(.home-projects::after) {

    right:
        -180px;

    bottom:
        -160px;

    width:
        480px;

    height:
        480px;

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

}


:deep(.home-contact::before) {

    top:
        -150px;

    left:
        35%;

    width:
        560px;

    height:
        560px;

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

}


:deep(.home-contact::after) {

    right:
        -160px;

    bottom:
        -170px;

    width:
        500px;

    height:
        500px;

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

}


/* =========================================
   CONTACT CONTENT
========================================= */

.contact-content-wrapper {

    position:
        relative;

    display:
        flex;

    flex-direction:
        column;

    align-items:
        center;

    width:
        100%;

    min-width:
        0;

}


.contact-scene-wrapper {

    position:
        relative;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    width:
        100%;

    min-width:
        0;

    min-height:
        280px;

}


.contact-scene-wrapper::before {

    content:
        "";

    position:
        absolute;

    width:
        280px;

    height:
        280px;

    max-width:
        90%;

    aspect-ratio:
        1;

    border-radius:
        50%;

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

    pointer-events:
        none;

}


/* =========================================
   CONTACT CTA
========================================= */

.contact-cta {

    display:
        flex;

    flex-wrap:
        wrap;

    justify-content:
        center;

    width:
        100%;

    min-width:
        0;

    margin-top:
        10px;

    gap:
        16px;

}


.contact-cta .btn {

    min-width:
        190px;

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
   PROJECT PREVIEW HOVER
========================================= */

:deep(.project-preview-card),
:deep(.project-item) {

    transition:
        transform 300ms ease,
        box-shadow 300ms ease;

    will-change:
        transform;

}


:deep(.project-preview-card:hover),
:deep(.project-item:hover) {

    transform:
        translateY(-6px);

}


/* =========================================
   PROJECT PREVIEW IMAGE HOVER
========================================= */

:deep(.project-preview-card img),
:deep(.project-item img),
:deep(.project-preview img) {

    transition:
        transform 450ms
        cubic-bezier(
            .2,
            .8,
            .2,
            1
        );

    will-change:
        transform;

}


:deep(.project-preview-card:hover img),
:deep(.project-item:hover img),
:deep(.project-preview:hover img) {

    transform:
        scale(1.06);

}


:deep(.project-preview-card .project-image),
:deep(.project-item .project-image),
:deep(.project-preview) {

    overflow:
        hidden;

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
            0.2
        );

}


/* =========================================
   HOME CONTACT DESKTOP LAYOUT
========================================= */

:deep(
    .home-contact
    .section-layout-content
) {

    align-self:
        flex-start;

}


:deep(
    .home-contact.section-layout--reverse
    .section-layout-split
) {

    grid-template-columns:
        minmax(
            0,
            6fr
        )
        minmax(
            0,
            4fr
        );

}


:deep(
    .home-contact
    .section-layout-text
) {

    padding-right:
        50px;

    box-sizing:
        border-box;

}


/* =========================================
   TABLET
========================================= */

@media (max-width: 991px) {

    .home-sections {

        gap:
            40px;

        padding:
            40px 20px 70px;

    }


    .home-section-container {

        width:
            100%;

        max-width:
            100%;

        border-radius:
            24px;

    }


    /* =====================================
       CONTACT → ONE COLUMN
    ====================================== */

    :deep(
        .home-contact.section-layout--reverse
        .section-layout-split
    ) {

        display:
            grid;

        grid-template-columns:
            minmax(
                0,
                1fr
            );

        gap:
            40px;

        width:
            100%;

        min-width:
            0;

    }


    /* =====================================
       CONTACT TEXT FIRST
    ====================================== */

    :deep(
        .home-contact.section-layout--reverse
        .section-layout-text
    ) {

        grid-column:
            1;

        grid-row:
            1;

        width:
            100%;

        min-width:
            0;

        padding-right:
            0;

        text-align:
            left;

    }


    :deep(
        .home-contact.section-layout--reverse
        .section-layout-text p
    ) {

        max-width:
            650px;

        margin-left:
            0;

        margin-right:
            0;

    }


    /* =====================================
       CONTACT CONTENT SECOND
    ====================================== */

    :deep(
        .home-contact.section-layout--reverse
        .section-layout-content
    ) {

        grid-column:
            1;

        grid-row:
            2;

        display:
            block;

        width:
            100%;

        min-width:
            0;

        max-width:
            100%;

        padding:
            0;

        margin:
            0;

    }


    .contact-content-wrapper {

        display:
            flex;

        flex-direction:
            column;

        align-items:
            stretch;

        width:
            100%;

        min-width:
            0;

        max-width:
            100%;

    }


    .contact-scene-wrapper {

        width:
            100%;

        min-width:
            0;

        max-width:
            100%;

    }


    .contact-cta {

        width:
            100%;

        min-width:
            0;

    }

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 576px) {

    .home-sections {

        gap:
            28px;

        padding:
            28px 6px 50px;

    }


    .home-section-container {

        width:
            100%;

        max-width:
            100%;

        border-radius:
            18px;

    }


    /* =====================================
       CONTACT LAYOUT
    ====================================== */

    :deep(
        .home-contact.section-layout--reverse
        .section-layout-split
    ) {

        display:
            grid;

        grid-template-columns:
            minmax(
                0,
                1fr
            );

        gap:
            28px;

    }


    :deep(
        .home-contact.section-layout--reverse
        .section-layout-text
    ) {

        grid-column:
            1;

        grid-row:
            1;

        width:
            100%;

        padding:
            0;

    }


    :deep(
        .home-contact.section-layout--reverse
        .section-layout-content
    ) {

        grid-column:
            1;

        grid-row:
            2;

        display:
            block;

        width:
            100%;

        min-width:
            0;

        max-width:
            100%;

        padding:
            0;

        margin:
            0;

    }


    /* =====================================
       CONTACT INNER CONTENT
    ====================================== */

    .contact-content-wrapper {

        display:
            flex;

        flex-direction:
            column;

        align-items:
            stretch;

        width:
            100%;

        min-width:
            0;

        max-width:
            100%;

        gap:
            20px;

    }


    .contact-scene-wrapper {

        width:
            100%;

        min-width:
            0;

        max-width:
            100%;

        min-height:
            220px;

        overflow:
            hidden;

    }


    .contact-scene-wrapper::before {

        width:
            220px;

        height:
            220px;

    }


    /* =====================================
       CONTACT BUTTONS
    ====================================== */

    .contact-cta {

        display:
            flex;

        flex-direction:
            column;

        flex-wrap:
            nowrap;

        align-items:
            stretch;

        justify-content:
            flex-start;

        width:
            100%;

        min-width:
            0;

        margin-top:
            0;

        gap:
            12px;

    }


    .contact-cta .btn {

        display:
            flex;

        align-items:
            center;

        justify-content:
            center;

        width:
            100%;

        max-width:
            100%;

        min-width:
            0;

        margin:
            0;

        white-space:
            normal;

    }

}


/* =========================================
   VERY SMALL MOBILE
========================================= */

@media (max-width: 400px) {

    .home-sections {

        padding-left:
            4px;

        padding-right:
            4px;

    }


    :deep(
        .home-contact.section-layout--reverse
        .section-layout-split
    ) {

        gap:
            24px;

    }


    .contact-scene-wrapper {

        min-height:
            190px;

    }


    .contact-scene-wrapper::before {

        width:
            190px;

        height:
            190px;

    }


    .contact-cta .btn {

        font-size:
            0.95rem;

        padding-left:
            14px;

        padding-right:
            14px;

    }

}


/* =========================================
   REDUCED MOTION
========================================= */

@media (
    prefers-reduced-motion:
    reduce
) {

    .reveal,
    .reveal-left,
    .reveal-right,
    :deep(.project-preview-card),
    :deep(.project-item),
    :deep(.project-preview-card img),
    :deep(.project-item img),
    :deep(.project-preview img),
    :deep(.tech-label),
    :deep(.tech-tag),
    :deep(.project-tech span),
    :deep(.project-technologies span),
    .contact-cta .btn {

        transition:
            none;

    }

}

</style>