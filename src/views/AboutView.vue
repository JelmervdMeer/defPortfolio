<script setup lang="ts">

import {
    onMounted,
    onUnmounted
} from 'vue';

import PageHeader from '../components/PageHeader.vue';
import SectionLayout from '../components/SectionLayout.vue';
import WorkDisciplines from '../components/WorkDisciplines.vue';


// =====================================
// TYPES
// =====================================

interface WorkStep {
    number: string;
    title: string;
    description: string;
}

interface Technology {
    number: string;
    title: string;
    technologies: string;
}


// =====================================
// WORK STEPS
// =====================================

const workSteps: WorkStep[] = [
    {
        number: '01',
        title: 'Begrijpen',
        description:
            'Eerst breng ik het probleem, de wensen en het doel van een project in kaart.'
    },
    {
        number: '02',
        title: 'Ontwerpen',
        description:
            'Vervolgens zoek ik naar een oplossing die logisch, aantrekkelijk en praktisch bruikbaar is.'
    },
    {
        number: '03',
        title: 'Bouwen',
        description:
            'Daarna vertaal ik het concept naar een technisch werkende digitale oplossing.'
    },
    {
        number: '04',
        title: 'Verbeteren',
        description:
            'Door te testen en itereren verbeter ik de oplossing totdat techniek en gebruikerservaring goed samenkomen.'
    }
];


// =====================================
// TECHNOLOGIES
// =====================================

const technologies: Technology[] = [
    {
        number: '01',
        title: 'Front-end',
        technologies:
            'Vue · TypeScript · JavaScript'
    },
    {
        number: '02',
        title: '3D & interactie',
        technologies:
            'Three.js · Blender · WebGL'
    },
    {
        number: '03',
        title: 'Back-end',
        technologies:
            'Laravel · PHP · SQL'
    },
    {
        number: '04',
        title: 'Development',
        technologies:
            'Git · Vite · REST API'
    }
];


// =====================================
// REVEAL ANIMATION
// =====================================

let revealObserver:
    IntersectionObserver | null = null;

function setupRevealObserver() {

    const elements =
        document.querySelectorAll(
            '.about-page .reveal'
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
                threshold: 0.08,
                rootMargin:
                    '0px 0px -40px 0px'
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

    revealObserver = null;

});

</script>


<template>

    <main class="about-page">

        <!-- =====================================
             HERO
        ====================================== -->

        <PageHeader
            label="OVER MIJ"
            title="Wie ik ben."
            accent="ben"
            description="Ik ben een creatieve developer die graag techniek en creativiteit combineert om interactieve digitale ervaringen te bouwen."
            :particles="true"
        />


        <!-- =====================================
             ABOUT SECTIONS
        ====================================== -->

        <div class="about-sections">


            <!-- =====================================
                 WERKWIJZE
            ====================================== -->

            <div
                class="
                    about-section-container
                    work-container
                "
            >

                <SectionLayout
                    class="about-work"
                    variant="split"
                    reverse
                    label="MIJN WERKWIJZE"
                    title="Hoe ik werk."
                    description="Een goede digitale oplossing begint voor mij met begrijpen wat het doel is. Vanuit daar combineer ik techniek en creativiteit voor het maken van een functioneel product dat getest en verbeterd kan worden."
                >

                    <template #title>

                        <span class="heading-accent">
                            Hoe
                        </span>

                        ik werk.

                    </template>


                    <div
                        class="
                            about-work-content
                            reveal
                        "
                    >

                        <div
                            v-for="step in workSteps"
                            :key="step.number"
                            class="about-work-item"
                        >

                            <span class="about-work-number">
                                {{ step.number }}
                            </span>

                            <div>

                                <h3>
                                    {{ step.title }}
                                </h3>

                                <p>
                                    {{ step.description }}
                                </p>

                            </div>

                        </div>

                    </div>

                </SectionLayout>

            </div>


            <!-- =====================================
                 DISCIPLINES
            ====================================== -->

            <div
                class="
                    about-section-container
                    disciplines-container
                "
            >

                <SectionLayout
                    class="about-disciplines"
                    variant="split"
                    label="MIJN WERKWIJZE"
                    title="Vijf disciplines, één werkwijze."
                    description="Verschillende disciplines komen samen in één manier van werken. Door techniek, creativiteit, communicatie, vernieuwing en een doelgerichte aanpak te combineren, ontstaan digitale oplossingen die zowel doordacht als bruikbaar zijn."
                >

                    <template #title>

                        Vijf

                        <span class="heading-accent">
                            disciplines
                        </span>,

                        één werkwijze.

                    </template>


                    <div
                        class="
                            disciplines-content
                            reveal
                        "
                    >

                        <WorkDisciplines
                            variant="home"
                        />

                    </div>

                </SectionLayout>

            </div>


            <!-- =====================================
                 TECHNOLOGIE
            ====================================== -->

            <div
                class="
                    about-section-container
                    technology-container
                "
            >

                <SectionLayout
                    class="about-technology"
                    variant="split"
                    reverse
                    label="TECHNOLOGIE"
                    title="Techniek als tool."
                    description="Ik gebruik technologie als middel om ideeën werkelijkheid te maken."
                >

                    <template #title>

                        Techniek als

                        <span class="heading-accent">
                            tool
                        </span>.

                    </template>


                    <div
                        class="
                            technology-content
                            reveal
                        "
                    >

                        <div class="technology-grid">

                            <div
                                v-for="technology in technologies"
                                :key="technology.number"
                                class="technology-item"
                            >

                                <span class="technology-number">
                                    {{ technology.number }}
                                </span>

                                <strong>
                                    {{ technology.title }}
                                </strong>

                                <span>
                                    {{ technology.technologies }}
                                </span>

                            </div>

                        </div>

                    </div>

                </SectionLayout>

            </div>


            <!-- =====================================
                 SAMENWERKEN
            ====================================== -->

            <div
                class="
                    about-section-container
                    cta-container
                "
            >

                <SectionLayout
                    class="about-cta-section"
                    variant="cta"
                    label="SAMENWERKEN"
                    title="Van idee naar oplossing."
                    description="Ik werk graag aan projecten waarin ik kan meedenken, experimenteren en technologie kan inzetten om een idee daadwerkelijk vorm te geven."
                >

                    <template #title>

                        Van idee naar

                        <span class="heading-accent">
                            oplossing
                        </span>.

                    </template>


                    <div
                        class="
                            about-cta
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

                </SectionLayout>

            </div>

        </div>

    </main>

</template>


<style scoped>

/* =====================================
   PAGE
===================================== */

.about-page {

    position: relative;

    width: 100%;
    min-height: 100vh;

    overflow: hidden;

    isolation: isolate;

    background:
        #08090d;

}


/* =====================================
   ABOUT SECTIONS
===================================== */

.about-sections {

    position: relative;

    display: flex;
    flex-direction: column;

    gap: 40px;

    width: 100%;

    padding:
        40px
        0
        80px;

}


/* =====================================
   SECTION CONTAINER
===================================== */

.about-section-container {

    position: relative;

    width:
        min(
            1600px,
            calc(100% - 24px)
        );

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


/* =====================================
   SECTION GLOW
===================================== */

:deep(.about-work),
:deep(.about-disciplines),
:deep(.about-technology),
:deep(.about-cta-section) {

    position: relative;

}


:deep(.about-work::before),
:deep(.about-disciplines::before),
:deep(.about-technology::before),
:deep(.about-cta-section::before) {

    content: "";

    position: absolute;

    width: var(--glow-size, 540px);
    height: var(--glow-size, 540px);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            var(
                --glow-primary,
                rgba(
                    139,
                    92,
                    246,
                    0.13
                )
            )
            0%,
            var(
                --glow-secondary,
                rgba(
                    59,
                    130,
                    246,
                    0.07
                )
            )
            35%,
            transparent
            72%
        );

    filter:
        blur(30px);

    pointer-events:
        none;

    z-index:
        -1;

}


/* =====================================
   WORK
===================================== */

.work-container {

    background:
        radial-gradient(
            circle at 5% 10%,
            rgba(
                168,
                85,
                247,
                0.075
            ),
            transparent
            34%
        ),
        radial-gradient(
            circle at 90% 90%,
            rgba(
                217,
                70,
                239,
                0.035
            ),
            transparent
            35%
        ),
        rgba(
            10,
            9,
            17,
            0.7
        );

}


:deep(.about-work) {

    --glow-size:
        520px;

    --glow-primary:
        rgba(
            168,
            85,
            247,
            0.14
        );

    --glow-secondary:
        rgba(
            217,
            70,
            239,
            0.07
        );

}


:deep(.about-work::before) {

    top:
        -140px;

    left:
        -180px;

}


/* =====================================
   DISCIPLINES
===================================== */

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
            transparent
            34%
        ),
        radial-gradient(
            circle at 5% 90%,
            rgba(
                6,
                182,
                212,
                0.035
            ),
            transparent
            35%
        ),
        rgba(
            7,
            11,
            18,
            0.72
        );

}


:deep(.about-disciplines) {

    --glow-primary:
        rgba(
            59,
            130,
            246,
            0.13
        );

    --glow-secondary:
        rgba(
            6,
            182,
            212,
            0.07
        );

}


:deep(.about-disciplines::before) {

    top:
        -120px;

    right:
        -180px;

}


/* =====================================
   TECHNOLOGY
===================================== */

.technology-container {

    background:
        radial-gradient(
            circle at 10% 10%,
            rgba(
                139,
                92,
                246,
                0.075
            ),
            transparent
            35%
        ),
        radial-gradient(
            circle at 90% 85%,
            rgba(
                59,
                130,
                246,
                0.045
            ),
            transparent
            35%
        ),
        rgba(
            9,
            9,
            17,
            0.72
        );

}


:deep(.about-technology::before) {

    top:
        -140px;

    right:
        -160px;

}


/* =====================================
   CTA CONTAINER
===================================== */

.cta-container {

    background:
        radial-gradient(
            circle at 35% 5%,
            rgba(
                139,
                92,
                246,
                0.075
            ),
            transparent
            35%
        ),
        radial-gradient(
            circle at 95% 90%,
            rgba(
                59,
                130,
                246,
                0.045
            ),
            transparent
            35%
        ),
        rgba(
            9,
            9,
            17,
            0.72
        );

}


:deep(.about-cta-section) {

    --glow-size:
        560px;

}


:deep(.about-cta-section::before) {

    top:
        -150px;

    left:
        35%;

}


/* =====================================
   WORK CONTENT
===================================== */

.about-work-content {

    display:
        flex;

    flex-direction:
        column;

    width:
        100%;

    gap:
        24px;

}


.about-work-item {

    display:
        grid;

    grid-template-columns:
        60px 1fr;

    gap:
        25px;

    padding:
        24px 0;

    border-bottom:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

}


.about-work-item:last-child {

    border-bottom:
        none;

}


.about-work-number,
.technology-number {

    color:
        #8b5cf6;

    font-family:
        monospace;

    letter-spacing:
        0.12em;

}


.about-work-number {

    font-size:
        0.8rem;

}


.about-work-item h3 {

    margin:
        0 0 8px;

    color:
        #ffffff;

    font-size:
        1.3rem;

}


.about-work-item p {

    margin:
        0;

    color:
        rgba(
            255,
            255,
            255,
            0.55
        );

    line-height:
        1.7;

}


/* =====================================
   DISCIPLINES
===================================== */

.disciplines-content {

    width:
        100%;

    min-width:
        0;

}


.disciplines-content :deep(.work-disciplines) {

    width:
        100%;

    min-width:
        0;

}


/* =====================================
   TECHNOLOGY CONTENT
===================================== */

.technology-content {

    width:
        100%;

}


.technology-grid {

    display:
        grid;

    grid-template-columns:
        repeat(
            2,
            minmax(
                0,
                1fr
            )
        );

    gap:
        16px;

}


.technology-item {

    display:
        flex;

    flex-direction:
        column;

    gap:
        8px;

    padding:
        24px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

    border-radius:
        12px;

    background:
        linear-gradient(
            145deg,
            rgba(
                255,
                255,
                255,
                0.045
            ),
            rgba(
                139,
                92,
                246,
                0.035
            )
        );

    transition:
        transform
        0.35s ease,

        border-color
        0.35s ease,

        background
        0.35s ease;

}


.technology-item:hover {

    transform:
        translateY(-5px);

    border-color:
        rgba(
            139,
            92,
            246,
            0.35
        );

}


.technology-number {

    font-size:
        1rem;

}


.technology-item strong {

    color:
        #ffffff;

    font-size:
        1.15rem;

}


.technology-item span:last-child {

    color:
        rgba(
            255,
            255,
            255,
            0.5
        );

    font-size:
        0.9rem;

}


/* =====================================
   CTA
===================================== */

.about-cta {

    display:
        flex;

    flex-direction:
        row;

    align-items:
        center;

    justify-content:
        flex-start;

    gap:
        16px;

    width:
        100%;

}


.about-cta .btn {

    width:
        auto;

    max-width:
        none;

}


/* =====================================
   REVEAL
===================================== */

.reveal {

    opacity:
        0;

    transform:
        translateY(40px);

    transition:
        opacity
        700ms ease,

        transform
        700ms
        cubic-bezier(
            0.2,
            0.8,
            0.2,
            1
        );

}


.reveal.is-visible {

    opacity:
        1;

    transform:
        translateY(0);

}


/* =====================================
   TABLET
===================================== */

@media (max-width: 991px) {

    .about-sections {

        gap:
            28px;

        padding:
            28px
            0
            60px;

    }


    .about-section-container {

        width:
            calc(100% - 28px);

        border-radius:
            24px;

    }


    .technology-grid {

        grid-template-columns:
            1fr;

    }


    .about-cta {

        justify-content:
            center;

    }

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 576px) {

    .about-sections {

        gap:
            18px;

        padding:
            18px
            0
            40px;

    }


    .about-section-container {

        width:
            calc(100% - 12px);

        border-radius:
            18px;

    }


    .about-work-item {

        grid-template-columns:
            45px 1fr;

        gap:
            15px;

        padding:
            20px 0;

    }


    .technology-item {

        padding:
            20px;

    }


    .about-cta {

        flex-direction:
            column;

        align-items:
            stretch;

    }


    .about-cta .btn {

        width:
            100%;

        max-width:
            320px;

        margin:
            0 auto;

    }

}

</style>