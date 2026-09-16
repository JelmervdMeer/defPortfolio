```vue
<script setup lang="ts">

import {
    onMounted,
    onUnmounted
} from 'vue';

import PageHeader from '../components/PageHeader.vue';
import SectionLayout from '../components/SectionLayout.vue';
import WorkDisciplines from '../components/WorkDisciplines.vue';


// =========================================
// REVEAL ANIMATION
// =========================================

let revealObserver:
    IntersectionObserver | null = null;


onMounted(() => {

    const elements =
        document.querySelectorAll(
            '.about-page .reveal'
        );


    if (!elements.length) return;


    revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    entry.target.classList.add(
                        'is-visible'
                    );


                    revealObserver?.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.08,
                rootMargin:
                    '0px 0px -40px 0px'
            }
        );


    elements.forEach(element => {

        revealObserver?.observe(
            element
        );

    });

});


onUnmounted(() => {

    revealObserver?.disconnect();

    revealObserver = null;

});

</script>


<template>

    <main class="about-page">


        <!-- =====================================
             PAGE HEADER
        ====================================== -->

        <PageHeader
            label="OVER MIJ"
            title="Wie ik ben"
            accent="ik ben"
            description="Ik ben een creatieve developer die graag techniek en creativiteit combineert om interactieve digitale ervaringen te bouwen."
            :particles="true"
        />


        <!-- =====================================
             MIJN WERKWIJZE
        ====================================== -->

        <SectionLayout
            variant="split"
            :reverse="true"
            label="MIJN WERKWIJZE"
            title="Hoe ik werk"
        >

            <div class="about-work">

                <div
                    class="work-step reveal"
                >

                    <span class="work-step-number">
                        01
                    </span>

                    <div>

                        <h3>
                            Luisteren
                        </h3>

                        <p>
                            Eerst begrijpen wat er nodig is.
                            Ik luister naar het idee, de
                            uitdaging en het doel voordat
                            ik begin te bouwen.
                        </p>

                    </div>

                </div>


                <div
                    class="work-step reveal"
                >

                    <span class="work-step-number">
                        02
                    </span>

                    <div>

                        <h3>
                            Denken
                        </h3>

                        <p>
                            Vervolgens vertaal ik het idee
                            naar een duidelijke structuur
                            en een oplossing die technisch
                            én visueel klopt.
                        </p>

                    </div>

                </div>


                <div
                    class="work-step reveal"
                >

                    <span class="work-step-number">
                        03
                    </span>

                    <div>

                        <h3>
                            Bouwen
                        </h3>

                        <p>
                            Daarna komt het leukste gedeelte:
                            ideeën omzetten in een werkende
                            digitale ervaring.
                        </p>

                    </div>

                </div>


                <div
                    class="work-step reveal"
                >

                    <span class="work-step-number">
                        04
                    </span>

                    <div>

                        <h3>
                            Verbeteren
                        </h3>

                        <p>
                            Een project is nooit direct klaar.
                            Ik blijf testen, verfijnen en
                            verbeteren totdat alles klopt.
                        </p>

                    </div>

                </div>

            </div>

        </SectionLayout>


        <!-- =====================================
             DISCIPLINES
        ====================================== -->

        <SectionLayout
            variant="split"
            label="MIJN DISCIPLINES"
            title="Vijf disciplines, één werkwijze."
        >

            <div class="disciplines-content reveal">

                <WorkDisciplines />

            </div>

        </SectionLayout>


        <!-- =====================================
             TECHNOLOGIE
        ====================================== -->

        <SectionLayout
            variant="split"
            :reverse="true"
            label="TECHNOLOGIE"
            title="Techniek als gereedschap"
        >

            <div class="technology-content reveal">

                <p class="technology-intro">

                    Technologie is voor mij geen doel op
                    zich. Het is het gereedschap waarmee
                    ideeën tot leven komen.

                </p>


                <div class="technology-grid">

                    <div class="technology-item">

                        <span class="technology-number">
                            01
                        </span>

                        <div>

                            <h3>
                                Front-end
                            </h3>

                            <p>
                                Vue, TypeScript, JavaScript,
                                HTML en CSS.
                            </p>

                        </div>

                    </div>


                    <div class="technology-item">

                        <span class="technology-number">
                            02
                        </span>

                        <div>

                            <h3>
                                3D & interactie
                            </h3>

                            <p>
                                Three.js, WebGL en interactieve
                                digitale ervaringen.
                            </p>

                        </div>

                    </div>


                    <div class="technology-item">

                        <span class="technology-number">
                            03
                        </span>

                        <div>

                            <h3>
                                Development
                            </h3>

                            <p>
                                Moderne development workflows
                                met Vite, Git en component-based
                                architectuur.
                            </p>

                        </div>

                    </div>


                    <div class="technology-item">

                        <span class="technology-number">
                            04
                        </span>

                        <div>

                            <h3>
                                Backend
                            </h3>

                            <p>
                                Laravel, REST API's en
                                database-integratie.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </SectionLayout>


        <!-- =====================================
             CTA
        ====================================== -->

        <SectionLayout
            variant="cta"
            label="SAMENWERKEN"
            title="Van idee naar ervaring"
            description="Heb je een idee, een project of een digitale uitdaging? Laten we samen kijken hoe we er een sterke digitale ervaring van kunnen maken."
        >

            <div class="about-cta">

                <a
                    href="/contact"
                    class="about-cta-button"
                >
                    Laten we samenwerken
                </a>


                <a
                    href="/projects"
                    class="about-cta-link"
                >
                    Bekijk mijn projecten
                    <span aria-hidden="true">
                        →
                    </span>
                </a>

            </div>

        </SectionLayout>


    </main>

</template>


<style scoped>

/* =========================================
   PAGE
========================================= */

.about-page {

    position: relative;

    width: 100%;

    overflow: hidden;

    background: #08090d;

}


/* =========================================
   ABOUT WORK
========================================= */

.about-work {

    position: relative;

    width: 100%;

    display: flex;

    flex-direction: column;

    gap: 0;

}


.work-step {

    display: grid;

    grid-template-columns: 60px minmax(0, 1fr);

    gap: 28px;

    padding: 34px 0;

    border-bottom:
        1px solid
        rgba(255,255,255,0.08);

}


.work-step:first-child {

    padding-top: 0;

}


.work-step:last-child {

    border-bottom: none;

}


.work-step-number {

    padding-top: 4px;

    color: #9b5cff;

    font-family:
        var(--font-heading);

    font-size: 1rem;

    font-weight: 600;

    letter-spacing: 0.12em;

}


.work-step h3 {

    margin: 0 0 12px;

    color: #ffffff;

    font-family:
        var(--font-heading);

    font-size:
        clamp(1.25rem, 1.8vw, 1.6rem);

    font-weight: 600;

    letter-spacing: -0.025em;

}


.work-step p {

    max-width: 620px;

    margin: 0;

    color:
        rgba(255,255,255,0.58);

    font-size: 1rem;

    line-height: 1.8;

}


/* =========================================
   DISCIPLINES
========================================= */

.disciplines-content {

    width: 100%;

}


/* =========================================
   TECHNOLOGY
========================================= */

.technology-content {

    width: 100%;

}


.technology-intro {

    max-width: 680px;

    margin: 0 0 50px;

    color:
        rgba(255,255,255,0.62);

    font-size:
        clamp(1rem, 1.2vw, 1.25rem);

    line-height: 1.8;

}


.technology-grid {

    display: grid;

    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: 0;

}


.technology-item {

    display: grid;

    grid-template-columns: 48px minmax(0, 1fr);

    gap: 20px;

    padding: 30px 0;

    border-top:
        1px solid
        rgba(255,255,255,0.08);

}


.technology-number {

    color: #9b5cff;

    font-family:
        var(--font-heading);

    font-size: 0.72rem;

    font-weight: 600;

    letter-spacing: 0.12em;

}


.technology-item h3 {

    margin: 0 0 10px;

    color: #ffffff;

    font-family:
        var(--font-heading);

    font-size: 1.15rem;

    font-weight: 600;

}


.technology-item p {

    margin: 0;

    color:
        rgba(255,255,255,0.52);

    font-size: 0.95rem;

    line-height: 1.7;

}


/* =========================================
   CTA
========================================= */

.about-cta {

    display: flex;

    align-items: center;

    flex-wrap: wrap;

    gap: 28px;

    width: 100%;

}


.about-cta-button {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    min-height: 54px;

    padding:
        0 28px;

    border:
        1px solid
        rgba(155,92,255,0.7);

    border-radius: 999px;

    background:
        linear-gradient(
            135deg,
            #9b5cff,
            #7c3aed
        );

    color: #ffffff;

    font-family:
        var(--font-heading);

    font-size: 0.9rem;

    font-weight: 600;

    text-decoration: none;

    transition:
        transform 250ms ease,
        box-shadow 250ms ease;

}


.about-cta-button:hover {

    transform:
        translateY(-2px);

    box-shadow:
        0 12px 35px
        rgba(139,92,246,0.25);

}


.about-cta-link {

    display: inline-flex;

    align-items: center;

    gap: 10px;

    color:
        rgba(255,255,255,0.65);

    font-family:
        var(--font-heading);

    font-size: 0.9rem;

    font-weight: 500;

    text-decoration: none;

    transition:
        color 200ms ease,
        gap 200ms ease;

}


.about-cta-link:hover {

    color: #ffffff;

    gap: 15px;

}


/* =========================================
   REVEAL
========================================= */

.reveal {

    opacity: 0;

    transform:
        translateY(50px);

    transition:
        opacity 700ms ease,
        transform 700ms
        cubic-bezier(.2,.8,.2,1);

}


.reveal.is-visible {

    opacity: 1;

    transform:
        translate3d(0,0,0);

}


/* =========================================
   TABLET
========================================= */

@media (max-width: 991px) {

    .technology-grid {

        grid-template-columns:
            1fr;

    }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 576px) {

    .work-step {

        grid-template-columns:
            42px minmax(0,1fr);

        gap: 18px;

        padding: 28px 0;

    }


    .technology-item {

        grid-template-columns:
            42px minmax(0,1fr);

        gap: 16px;

    }


    .technology-intro {

        margin-bottom: 35px;

    }


    .about-cta {

        align-items: flex-start;

        flex-direction: column;

        gap: 20px;

    }


    .about-cta-button {

        width: 100%;

    }

}


/* =========================================
   REDUCED MOTION
========================================= */

@media (prefers-reduced-motion: reduce) {

    .reveal {

        opacity: 1;

        transform: none;

        transition: none;

    }


    .about-cta-button,
    .about-cta-link {

        transition: none;

    }

}

</style>
```

[/code]
