<script setup lang="ts">

import {
    onMounted,
    onUnmounted,
    ref
} from 'vue';


// =====================================
// PROPS
// =====================================

const props = withDefaults(
    defineProps<{
        variant?: 'default' | 'split' | 'cta';
        reverse?: boolean;
        label?: string;
        title?: string;
        description?: string;
    }>(),
    {
        variant: 'default',
        reverse: false
    }
);


// =====================================
// REFS
// =====================================

const sectionElement =
    ref<HTMLElement | null>(null);

let revealObserver:
    IntersectionObserver | null = null;


// =====================================
// REVEAL
// =====================================

function setupReveal() {

    if (!sectionElement.value) {
        return;
    }


    const elements =
        sectionElement.value.querySelectorAll(
            '.section-reveal'
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
                threshold: 0.15
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

    setupReveal();

});


onUnmounted(() => {

    revealObserver?.disconnect();

});

</script>


<template>

    <section
        ref="sectionElement"
        class="section-layout"
        :class="[

            `section-layout--${variant}`,

            {
                'section-layout--reverse':
                    props.reverse
            }

        ]"
    >

        <!-- =====================================
             SECTION ATMOSPHERE
        ====================================== -->

        <div
            class="section-layout-glow"
            aria-hidden="true"
        ></div>


        <div class="container">

            <!-- =====================================
                 SPLIT LAYOUT
            ====================================== -->

            <div
                v-if="variant === 'split'"
                class="section-layout-split"
            >

                <!-- =============================
                     TEXT
                ============================== -->

                <div
                    class="
                        section-layout-text
                        section-reveal
                        section-reveal-left
                    "
                >

                    <div
                        v-if="label"
                        class="section-label"
                    >

                        {{ label }}

                    </div>


                    <h2>

                        <slot name="title">

                            {{ title }}

                        </slot>

                    </h2>


                    <p
                        v-if="description"
                    >

                        {{ description }}

                    </p>

                </div>


                <!-- =============================
                     CONTENT
                ============================== -->

                <div
                    class="
                        section-layout-content
                        section-reveal
                        section-reveal-right
                    "
                >

                    <slot></slot>

                </div>

            </div>


            <!-- =====================================
                 CTA LAYOUT
            ====================================== -->

            <div
                v-else-if="variant === 'cta'"
                class="section-layout-cta"
            >

                <!-- =============================
                     CTA TITLE
                ============================== -->

                <div
                    class="
                        section-layout-text
                        section-reveal
                        section-reveal-left
                    "
                >

                    <div
                        v-if="label"
                        class="section-label"
                    >

                        {{ label }}

                    </div>


                    <h2>

                        <slot name="title">

                            {{ title }}

                        </slot>

                    </h2>

                </div>


                <!-- =============================
                     CTA CONTENT
                ============================== -->

                <div
                    class="
                        section-layout-content
                        section-reveal
                        section-reveal-right
                    "
                >

                    <p
                        v-if="description"
                        class="section-layout-cta-description"
                    >

                        {{ description }}

                    </p>


                    <slot></slot>

                </div>

            </div>


            <!-- =====================================
                 DEFAULT LAYOUT
            ====================================== -->

            <div
                v-else
                class="section-layout-default"
            >

                <div
                    class="
                        section-layout-text
                        section-reveal
                    "
                >

                    <div
                        v-if="label"
                        class="section-label"
                    >

                        {{ label }}

                    </div>


                    <h2>

                        <slot name="title">

                            {{ title }}

                        </slot>

                    </h2>


                    <p
                        v-if="description"
                    >

                        {{ description }}

                    </p>

                </div>


                <div
                    class="
                        section-layout-content
                        section-reveal
                    "
                >

                    <slot></slot>

                </div>

            </div>

        </div>

    </section>

</template>


<style scoped>


/* =========================================
   SECTION
========================================= */

.section-layout {

    position:
        relative;

    width:
        100%;

    padding:
        110px
        0;

    overflow:
        hidden;

    isolation:
        isolate;

    background:

        linear-gradient(
            135deg,

            rgba(
                24,
                22,
                38,
                0.96
            ),

            rgba(
                14,
                15,
                24,
                0.98
            )
        );

}


/* =========================================
   SECTION GLOW
========================================= */

.section-layout-glow {

    position: absolute;

    inset: 0;

    pointer-events: none;

    z-index: -1;

    background:

        radial-gradient(
            circle 380px at 8% 12%,

            rgba(
                139,
                92,
                246,
                0.20
            ) 0%,

            rgba(
                139,
                92,
                246,
                0.08
            ) 35%,

            transparent 75%
        ),

        radial-gradient(
            circle 320px at 92% 82%,

            rgba(
                0,
                212,
                255,
                0.10
            ) 0%,

            rgba(
                0,
                212,
                255,
                0.04
            ) 35%,

            transparent 75%
        ),

        linear-gradient(
            135deg,

            rgba(
                139,
                92,
                246,
                0.045
            ),

            transparent 45%,

            rgba(
                0,
                212,
                255,
                0.018
            )
        );

}


/* =========================================
   BORDERS
========================================= */

.section-layout::before {

    content: '';

    position: absolute;

    top: 0;

    left: 0;

    right: 0;

    height: 1px;

    background:

        linear-gradient(
            90deg,

            transparent,

            rgba(
                139,
                92,
                246,
                0.28
            ),

            rgba(
                255,
                255,
                255,
                0.08
            ),

            transparent
        );

    pointer-events: none;

}


.section-layout::after {

    content: '';

    position: absolute;

    bottom: 0;

    left: 0;

    right: 0;

    height: 1px;

    background:

        linear-gradient(
            90deg,

            transparent,

            rgba(
                139,
                92,
                246,
                0.16
            ),

            transparent
        );

    pointer-events: none;

}


/* =========================================
   CONTAINER
========================================= */

.section-layout > .container {

    position: relative;

    z-index: 2;

    width: 100%;

    max-width:
        1600px;

    margin:
        0 auto;

    padding-left:
        10px;

    padding-right:
        10px;

}


/*
    Bootstrap gebruikt standaard extra
    horizontale padding op .container.

    Deze regel zorgt ervoor dat onze
    section-container daadwerkelijk
    de beschikbare breedte gebruikt.
*/

.section-layout > .container {

    --bs-gutter-x: 0;

}


/* =========================================
   SPLIT LAYOUT
========================================= */

.section-layout--split
.section-layout-split {

    display: grid;

    grid-template-columns:

        minmax(
            0,
            3fr
        )

        minmax(
            0,
            7fr
        );

    align-items:
        stretch;

    gap:
        60px;

    width:
        100%;

    min-width:
        0;

}


/* =========================================
   REVERSE SPLIT
========================================= */

.section-layout--split.section-layout--reverse
.section-layout-split {

    grid-template-columns:

        minmax(
            0,
            7fr
        )

        minmax(
            0,
            3fr
        );

}


/* =========================================
   REVERSE ELEMENT ORDER
========================================= */

.section-layout--split.section-layout--reverse
.section-layout-split
.section-layout-text {

    grid-column:
        2;

}


.section-layout--split.section-layout--reverse
.section-layout-split
.section-layout-content {

    grid-column:
        1;

    grid-row:
        1;

}


/* =========================================
   CTA LAYOUT
========================================= */

.section-layout--cta
.section-layout-cta {

    display: grid;

    grid-template-columns:

        minmax(
            0,
            3fr
        )

        minmax(
            0,
            7fr
        );

    align-items:
        center;

    gap:
        60px;

    width:
        100%;

    min-width:
        0;

}


/* =========================================
   CTA TEXT
========================================= */

.section-layout--cta
.section-layout-text {

    justify-content:
        center;

}


.section-layout--cta
.section-layout-text h2 {

    margin-top:
        20px;

}


/* =========================================
   CTA DESCRIPTION
========================================= */

.section-layout-cta-description {

    max-width:
        700px;

    margin:
        0 0 32px;

    color:
        rgba(
            255,
            255,
            255,
            0.66
        );

    font-size:
        clamp(
            1rem,
            1.2vw,
            1.35rem
        );

    line-height:
        1.8;

}


/* =========================================
   SECTION REVEAL
========================================= */

.section-reveal {

    opacity:
        0;

    transition:

        opacity 800ms ease,

        transform 800ms
        cubic-bezier(
            0.2,
            0.8,
            0.2,
            1
        );

}


/* =========================================
   TEXT REVEAL
========================================= */

.section-reveal-left {

    transform:
        translateX(-70px);

}


/* =========================================
   CONTENT REVEAL
========================================= */

.section-reveal-right {

    transform:
        translateX(70px);

}


/* =========================================
   VISIBLE
========================================= */

.section-reveal.is-visible {

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
   REVERSE REVEAL
========================================= */

.section-layout--reverse
.section-reveal-left {

    transform:
        translateX(70px);

}


.section-layout--reverse
.section-reveal-right {

    transform:
        translateX(-70px);

}


/* =========================================
   TEXT
========================================= */

.section-layout-text {

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    min-width:
        0;

    width:
        100%;

    text-align:
        left;

}


.section-layout-text h2 {

    margin:
        20px 0 0;

    color:
        #ffffff;

    font-size:

        clamp(
            2.8rem,
            5vw,
            5.5rem
        );

    font-weight:
        600;

    line-height:
        1.10;

    letter-spacing:
        -0.05em;

}


.section-layout-text p {

    max-width:
        620px;

    margin:
        30px 0 0;

    color:
        rgba(
            255,
            255,
            255,
            0.66
        );

    font-size:
        clamp(
            1rem,
            1.2vw,
            1.35rem
        );

    line-height:
        1.8;

}


/* =========================================
   CONTENT
========================================= */

.section-layout-content {

    display:
        flex;

    align-items:
        stretch;

    justify-content:
        stretch;

    min-width:
        0;

    width:
        100%;

    max-width:
        none;

    /*
        Extra ruimte rondom de inhoud
        van iedere section.
    */

    padding:

        clamp(
            24px,
            3vw,
            56px
        )

        clamp(
            16px,
            2vw,
            40px
        );

}


/*
    Het eerste component in de contentkolom
    mag de volledige breedte gebruiken.
*/

.section-layout-content > * {

    width:
        100%;

    max-width:
        none;

    min-width:
        0;

}


/*
    Ook de reveal-wrapper mag niet
    kleiner worden dan de contentkolom.
*/

.section-layout-content > .section-reveal {

    width:
        100%;

    max-width:
        none;

    min-width:
        0;

}


/* =========================================
   CTA CONTENT
========================================= */

.section-layout--cta
.section-layout-content {

    display:
        flex;

    flex-direction:
        column;

    align-items:
        flex-start;

    justify-content:
        center;

}


.section-layout--cta
.section-layout-content > * {

    width:
        100%;

}


.section-layout--cta
.section-layout-content
.about-cta {

    width:
        100%;

}


/* =========================================
   DEFAULT
========================================= */

.section-layout-default {

    display:
        flex;

    flex-direction:
        column;

    width:
        100%;

    min-width:
        0;

}


.section-layout-default
.section-layout-text {

    max-width:
        850px;

    margin:
        0 auto 80px;

    text-align:
        center;

}


.section-layout-default
.section-layout-text p {

    margin-left:
        auto;

    margin-right:
        auto;

}


.section-layout-default
.section-layout-content {

    width:
        100%;

}


:deep(.home-disciplines .section-layout-content) {

    column-gap:
        120px;

}


/* =========================================
   TABLET
========================================= */

@media (max-width: 991px) {

    .section-layout {

        padding:
            90px
            0;

    }


    .section-layout > .container {

        max-width:
            100%;

        padding-left:
            16px;

        padding-right:
            16px;

    }


    /*
        Op tablet en mobiel wordt
        de split één kolom.
    */

    .section-layout--split
    .section-layout-split,

    .section-layout--split.section-layout--reverse
    .section-layout-split {

        display:
            grid;

        grid-template-columns:

            minmax(
                0,
                1fr
            );

        gap:
            60px;

        width:
            100%;

    }


    /*
        Reverse heeft op mobiel
        geen aparte kolommen meer.
    */

    .section-layout--split.section-layout--reverse
    .section-layout-split
    .section-layout-text {

        grid-column:
            auto;

        grid-row:
            auto;

    }


    .section-layout--split.section-layout--reverse
    .section-layout-split
    .section-layout-content {

        grid-column:
            auto;

        grid-row:
            auto;

    }


    .section-layout--split
    .section-layout-text {

        text-align:
            center;

    }


    .section-layout--split
    .section-layout-text p {

        margin-left:
            auto;

        margin-right:
            auto;

    }


    .section-layout--split
    .section-layout-content {

        width:
            100%;

        justify-content:
            stretch;

        padding:

            clamp(
                20px,
                4vw,
                40px
            )

            clamp(
                12px,
                3vw,
                24px
            );

    }


    .section-layout-content > * {

        width:
            100%;

        max-width:
            none;

    }


    /* =====================================
       CTA TABLET
    ====================================== */

    .section-layout--cta
    .section-layout-cta {

        grid-template-columns:
            1fr;

        gap:
            40px;

    }


    .section-layout--cta
    .section-layout-text {

        text-align:
            center;

    }


    .section-layout--cta
    .section-layout-content {

        align-items:
            center;

        padding:
            20px
            12px;

    }


    .section-layout-cta-description {

        max-width:
            700px;

        margin-left:
            auto;

        margin-right:
            auto;

        text-align:
            center;

    }


    /* -----------------------------
       MOBILE REVEAL
    ------------------------------ */

    .section-reveal-left,

    .section-reveal-right,

    .section-layout--reverse
    .section-reveal-left,

    .section-layout--reverse
    .section-reveal-right {

        transform:
            translateY(50px);

    }


    .section-reveal.is-visible {

        transform:
            translate3d(
                0,
                0,
                0
            );

    }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 576px) {

    .section-layout {

        padding:
            75px
            0;

    }


    .section-layout > .container {

        padding-left:
            12px;

        padding-right:
            12px;

    }


    .section-layout--split
    .section-layout-split,

    .section-layout--split.section-layout--reverse
    .section-layout-split {

        gap:
            45px;

    }


    /*
        Compactere padding op mobiel,
        zodat de content niet te veel
        horizontale ruimte verliest.
    */

    .section-layout-content {

        padding:
            20px
            8px;

    }


    .section-layout-text h2 {

        font-size:

            clamp(
                2.4rem,
                12vw,
                3.5rem
            );

    }


    /* =====================================
       CTA MOBILE
    ====================================== */

    .section-layout--cta
    .section-layout-cta {

        gap:
            30px;

    }


    .section-layout--cta
    .section-layout-content {

        padding:
            20px
            8px;

    }


    .section-layout-cta-description {

        margin-bottom:
            28px;

    }

}

</style>