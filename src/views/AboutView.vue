```vue
<script setup lang="ts">

import {
    nextTick,
    onMounted,
    onUnmounted
} from 'vue';

import SectionLayout from '../components/SectionLayout.vue';
import WorkDisciplines from '../components/WorkDisciplines.vue';
import AboutHeader from '../components/AboutHeader.vue';


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

    <main class="about-page">


        <!-- =====================================
             HERO
        ====================================== -->

        <AboutHeader />


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
                    title="Hoe ik werk"
                    description="Een goede digitale oplossing begint voor mij met begrijpen wat het doel is. Vanuit daar combineer ik techniek, creativiteit en communicatie."
                >

                    <template #title>

                        Hoe ik

                        <span class="animated-gradient-text">
                            werk
                        </span>

                    </template>


                    <div
                        class="
                            about-work-content
                            reveal
                        "
                    >

                        <div class="about-work-item">

                            <span class="about-work-number">
                                01
                            </span>

                            <div>

                                <h3>
                                    Begrijpen
                                </h3>

                                <p>
                                    Eerst breng ik het probleem,
                                    de wensen en het doel van een
                                    project in kaart.
                                </p>

                            </div>

                        </div>


                        <div class="about-work-item">

                            <span class="about-work-number">
                                02
                            </span>

                            <div>

                                <h3>
                                    Ontwerpen
                                </h3>

                                <p>
                                    Vervolgens zoek ik naar een
                                    oplossing die logisch,
                                    aantrekkelijk en praktisch
                                    bruikbaar is.
                                </p>

                            </div>

                        </div>


                        <div class="about-work-item">

                            <span class="about-work-number">
                                03
                            </span>

                            <div>

                                <h3>
                                    Bouwen
                                </h3>

                                <p>
                                    Daarna vertaal ik het concept
                                    naar een technisch werkende
                                    digitale ervaring.
                                </p>

                            </div>

                        </div>


                        <div class="about-work-item">

                            <span class="about-work-number">
                                04
                            </span>

                            <div>

                                <h3>
                                    Verbeteren
                                </h3>

                                <p>
                                    Door te testen en itereren
                                    verbeter ik de oplossing totdat
                                    techniek en gebruikerservaring
                                    goed samenkomen.
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

                        <span class="animated-gradient-text">
                            disciplines
                        </span>

                        één werkwijze.

                    </template>


                    <div
                        class="
                            disciplines-content
                            section-reveal
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
                    title="Techniek als gereedschap"
                    description="Ik gebruik technologie als middel om ideeën werkelijkheid te maken."
                >

                    <template #title>

                        Techniek als

                        <span class="animated-gradient-text">
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


                            <div class="technology-item">

                                <span class="technology-number">
                                    01
                                </span>

                                <strong>
                                    Front-end
                                </strong>

                                <span>
                                    Vue · TypeScript · JavaScript
                                </span>

                            </div>


                            <div class="technology-item">

                                <span class="technology-number">
                                    02
                                </span>

                                <strong>
                                    3D & interactie
                                </strong>

                                <span>
                                    Three.js · Blender · WebGL
                                </span>

                            </div>


                            <div class="technology-item">

                                <span class="technology-number">
                                    03
                                </span>

                                <strong>
                                    Back-end
                                </strong>

                                <span>
                                    Laravel · PHP · SQL
                                </span>

                            </div>


                            <div class="technology-item">

                                <span class="technology-number">
                                    04
                                </span>

                                <strong>
                                    Development
                                </strong>

                                <span>
                                    Git · Vite · REST API
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
                    variant="split"
                    label="SAMENWERKEN"
                    title="Van idee naar ervaring"
                    description="Ik werk graag aan projecten waarin ik kan meedenken, experimenteren en technologie kan inzetten om een idee daadwerkelijk vorm te geven."
                >

                    <template #title>

                        Van idee naar

                        <span class="animated-gradient-text">
                            oplossing
                        </span>
                        .

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

    width: min(
        1400px,
        calc(100% - 40px)
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
   SECTION LAYOUT
   EXTRA RUIMTE VOOR KINDEREN
===================================== */

.about-section-container :deep(.section-layout) {

    position: relative;

    width: 100%;

    min-width: 0;

    overflow: hidden;

    background:
        transparent;

    padding:
        90px
        80px;

}


/* =====================================
   WORK CONTAINER
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


:deep(.about-work::before) {

    content: "";

    position: absolute;

    top: -140px;
    left: -180px;

    width: 520px;
    height: 520px;

    border-radius: 50%;

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

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


/* =====================================
   DISCIPLINES CONTAINER
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

            transparent 34%
        ),

        radial-gradient(
            circle at 5% 90%,

            rgba(
                6,
                182,
                212,
                0.035
            ),

            transparent 35%
        ),

        rgba(
            7,
            11,
            18,
            0.72
        );

}


:deep(.about-disciplines::before) {

    content: "";

    position: absolute;

    top: -120px;
    right: -180px;

    width: 540px;
    height: 540px;

    border-radius: 50%;

    background:

        radial-gradient(
            circle,

            rgba(
                59,
                130,
                246,
                0.13
            ) 0%,

            rgba(
                6,
                182,
                212,
                0.07
            ) 38%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


/* =====================================
   TECHNOLOGY CONTAINER
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

            transparent 35%
        ),

        radial-gradient(
            circle at 90% 85%,

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


:deep(.about-technology::before) {

    content: "";

    position: absolute;

    right: -160px;
    top: -140px;

    width: 540px;
    height: 540px;

    border-radius: 50%;

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

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

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


:deep(.about-cta-section::before) {

    content: "";

    position: absolute;

    top: -150px;
    left: 35%;

    width: 560px;
    height: 560px;

    border-radius: 50%;

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

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


/* =====================================
   WORK CONTENT
===================================== */

.about-work-content {

    display: flex;

    flex-direction: column;

    width: 100%;

    gap: 24px;

}


.about-work-item {

    display: grid;

    grid-template-columns:
        60px
        1fr;

    gap: 25px;

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


.about-work-number {

    color:
        #8b5cf6;

    font-family:
        monospace;

    font-size:
        0.8rem;

    letter-spacing:
        0.12em;

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

    margin: 0;

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

    width: 100%;

    min-width: 0;

}


.disciplines-content :deep(.work-disciplines) {

    width: 100%;

    min-width: 0;

}


/* =====================================
   TECHNOLOGY
===================================== */

.technology-content {

    width: 100%;

}


.technology-grid {

    display: grid;

    grid-template-columns:

        repeat(
            2,
            minmax(0, 1fr)
        );

    gap: 16px;

}


.technology-item {

    display: flex;

    flex-direction: column;

    gap: 8px;

    padding: 24px;

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

        transform 0.35s ease,
        border-color 0.35s ease,
        background 0.35s ease;

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

    color:
        #8b5cf6;

    font-family:
        monospace;

    font-size:
        0.7rem;

    letter-spacing:
        0.12em;

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

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: flex-end;

    gap: 20px;

    width: 100%;

    margin-top: 20px;

}


.about-cta .btn {

    width: 100%;

    max-width: 320px;

}


/* =====================================
   REVEAL
===================================== */

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

.about-section-container {
    position: relative;
    width: min(
        1600px,
        calc(100% - 24px)
    );
    margin: 0 auto;

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
   TABLET
===================================== */

@media (max-width: 991px) {

    .about-sections {

        gap: 28px;

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


    .about-section-container :deep(.section-layout) {

        padding:
            70px
            50px;

    }


    .technology-grid {

        grid-template-columns:
            1fr;

    }

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 576px) {

    .about-sections {

        gap: 18px;

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


    .about-section-container :deep(.section-layout) {

        padding:
            50px
            24px;

    }


    .about-work-item {

        grid-template-columns:
            45px
            1fr;

        gap: 15px;

        padding:
            20px 0;

    }


    .technology-item {

        padding: 20px;

    }


    .about-cta {

        align-items:
            center;

        width:
            100%;

    }


    .about-cta .btn {

        width:
            100%;

        max-width:
            320px;

    }

}

</style>
```
