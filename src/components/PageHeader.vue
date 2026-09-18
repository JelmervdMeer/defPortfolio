<script setup lang="ts">

import { computed } from 'vue';


// =====================================
// PROPS
// =====================================

interface Props {

    label: string;

    title: string;

    description: string;

    accent?: string;

    bottomLabel?: string;

    particles?: boolean;

    showLine?: boolean;

    showBottomBorder?: boolean;

    image?: string;

    imageAlt?: string;

}


const props = withDefaults(
    defineProps<Props>(),
    {
        accent: '',
        bottomLabel: '',
        particles: true,
        showLine: true,
        showBottomBorder: true,
        image: '',
        imageAlt: ''
    }
);


// =====================================
// TITLE
// =====================================

const titleParts = computed(() => {

    const title = props.title;
    const accent = props.accent;


    // Geen accent opgegeven

    if (!accent) {

        return [
            {
                text: title,
                accent: false
            }
        ];

    }


    // Zoek het accent in de volledige titel

    const index =
        title.indexOf(accent);


    // Accent staat niet in de titel

    if (index === -1) {

        return [
            {
                text: title,
                accent: false
            }
        ];

    }


    // Splits de titel rondom het accent

    return [

        // Tekst vóór het accent

        ...(index > 0
            ? [
                {
                    text:
                        title.slice(
                            0,
                            index
                        ),

                    accent:
                        false
                }
            ]
            : []),


        // Accent

        {
            text:
                accent,

            accent:
                true
        },


        // Tekst ná het accent

        ...(
            index +
            accent.length <
            title.length
                ? [
                    {
                        text:
                            title.slice(
                                index +
                                accent.length
                            ),

                        accent:
                            false
                    }
                ]
                : []
        )

    ];

});


// =====================================
// PARTICLES
// =====================================

const particles = Array.from(
    {
        length: 35
    },
    (_, index) => ({

        id:
            index,

        left:
            `${Math.random() * 100}%`,

        top:
            `${Math.random() * 100}%`,

        animationDelay:
            `${Math.random() * -8}s`,

        animationDuration:
            `${6 + Math.random() * 8}s`

    })
);

</script>


<template>

    <section
        class="page-header"
        :class="{
            'page-header--with-image':
                props.image
        }"
    >


        <!-- =====================================
             BACKGROUND
        ====================================== -->

        <div
            class="page-header-glow"
            aria-hidden="true"
        ></div>


        <!-- =====================================
             PARTICLES
        ====================================== -->

        <div
            v-if="props.particles"
            class="page-header-particles"
            aria-hidden="true"
        >

            <span
                v-for="particle in particles"
                :key="particle.id"
                class="particle"
                :style="{
                    left:
                        particle.left,

                    top:
                        particle.top,

                    animationDelay:
                        particle.animationDelay,

                    animationDuration:
                        particle.animationDuration
                }"
            ></span>

        </div>


        <!-- =====================================
             CONTENT
        ====================================== -->

        <div class="container">

            <div class="page-header-layout">


                <!-- =====================================
                     LEFT
                ====================================== -->

                <div class="page-header-content">


                    <!-- =====================================
                         LABEL
                    ====================================== -->

                    <div class="page-header-label">

                        {{ props.label }}

                    </div>


                    <!-- =====================================
                         TITLE
                    ====================================== -->

                    <h1 class="page-title">

                        <span
                            v-for="(
                                part,
                                index
                            ) in titleParts"
                            :key="index"
                            :class="{
                                'page-title-accent':
                                    part.accent
                            }"
                        >
                            {{ part.text }}
                        </span>

                    </h1>


                    <!-- =====================================
                         DESCRIPTION
                    ====================================== -->

                    <div
                        class="
                            page-header-description
                        "
                    >

                        <p>

                            {{ props.description }}

                        </p>


                        <!-- LINE -->

                        <div
                            v-if="props.showLine"
                            class="page-header-line"
                        ></div>


                        <!-- BOTTOM LABEL -->

                        <span
                            v-if="props.bottomLabel"
                            class="page-header-meta"
                        >

                            {{ props.bottomLabel }}

                        </span>

                    </div>

                </div>


                <!-- =====================================
                     RIGHT / IMAGE
                ====================================== -->

                <div
                    v-if="props.image"
                    class="
                        page-header-image-container
                    "
                >

                    <div
                        class="
                            page-header-image-glow
                        "
                        aria-hidden="true"
                    ></div>

                    <img
                        :src="props.image"
                        :alt="
                            props.imageAlt ||
                            props.label
                        "
                        class="page-header-image"
                    />

                </div>

            </div>

        </div>


        <!-- =====================================
             BOTTOM BORDER
        ====================================== -->

        <div
            v-if="props.showBottomBorder"
            class="page-header-bottom"
        ></div>

    </section>

</template>


<style scoped>

/* =====================================
   PAGE HEADER
===================================== */

.page-header {

    position:
        relative;

    width:
        100%;

    padding:
        190px
        0
        110px;

    overflow:
        hidden;

    background:

        radial-gradient(
            circle at 15% 30%,
            rgba(
                139,
                92,
                246,
                0.12
            ),
            transparent 32%
        ),

        radial-gradient(
            circle at 85% 65%,
            rgba(
                0,
                212,
                255,
                0.06
            ),
            transparent 30%
        ),

        #08090d;

}


/* =====================================
   LAYOUT
===================================== */

.page-header-layout {

    position:
        relative;

    z-index:
        2;

    width:
        100%;

}


/* =====================================
   LAYOUT WITH IMAGE
===================================== */

.page-header--with-image
.page-header-layout {

    display:
        grid;

    grid-template-columns:
        minmax(0, 1fr)
        minmax(0, 1fr);

    align-items:
        center;

    gap:
        clamp(
            50px,
            6vw,
            100px
        );

}


/* =====================================
   CONTENT
===================================== */

.page-header-content {

    position:
        relative;

    z-index:
        2;

    display:
        flex;

    flex-direction:
        column;

    align-items:
        flex-start;

    width:
        100%;

    min-width:
        0;

}


/* =====================================
   LABEL
===================================== */

.page-header-label {

    display:
        flex;

    align-items:
        center;

    margin-bottom:
        28px;

    color:
        var(--color-secondary);

    font-family:
        var(--font-heading);

    font-size:
        clamp(
            0.8rem,
            1vw,
            0.95rem
        );

    font-weight:
        600;

    letter-spacing:
        0.18em;

    text-transform:
        uppercase;

}


.page-header-label::before {

    content:
        "";

    flex-shrink:
        0;

    width:
        28px;

    height:
        1px;

    margin-right:
        12px;

    background:
        var(--color-secondary);

}


/* =====================================
   TITLE
===================================== */

.page-title {

    width:
        100%;

    max-width:
        750px;

    margin:
        0;

    color:
        #ffffff;

    font-family:
        var(--font-heading);

    font-size:
        clamp(
            3.5rem,
            7vw,
            7rem
        );

    font-weight:
        700;

    line-height:
        0.95;

    letter-spacing:
        -0.06em;

}


/* =====================================
   TITLE WITH IMAGE
===================================== */

.page-header--with-image
.page-title {

    max-width:
        650px;

    font-size:
        clamp(
            3.2rem,
            5vw,
            5.8rem
        );

}


/* =====================================
   TITLE ACCENT
===================================== */

.page-title-accent {

    background:
        linear-gradient(
            90deg,
            #8b5cf6,
            #c084fc,
            #22d3ee,
            #8b5cf6
        );

    background-size:
        300% 100%;

    background-clip:
        text;

    -webkit-background-clip:
        text;

    color:
        transparent;

    -webkit-text-fill-color:
        transparent;

    animation:
        pageHeaderGradient
        6s
        ease
        infinite;

}


@keyframes pageHeaderGradient {

    0% {

        background-position:
            0% 50%;

    }

    50% {

        background-position:
            100% 50%;

    }

    100% {

        background-position:
            0% 50%;

    }

}


/* =====================================
   DESCRIPTION
===================================== */

.page-header-description {

    display:
        flex;

    flex-direction:
        column;

    align-items:
        flex-start;

    width:
        100%;

    margin-top:
        34px;

    padding-bottom:
        8px;

}


.page-header-description p {

    width:
        100%;

    max-width:
        520px;

    margin:
        0;

    color:
        rgba(
            255,
            255,
            255,
            0.62
        );

    font-family:
        var(--font-body);

    font-size:
        clamp(
            1rem,
            1.2vw,
            1.35rem
        );

    line-height:
        1.8;

}


/* =====================================
   LINE
===================================== */

.page-header-line {

    width:
        100%;

    max-width:
        420px;

    height:
        1px;

    margin:
        32px
        0
        18px;

    background:
        linear-gradient(
            90deg,
            rgba(
                139,
                92,
                246,
                0.7
            ),
            rgba(
                34,
                211,
                238,
                0.3
            ),
            transparent
        );

}


/* =====================================
   META / BOTTOM LABEL
===================================== */

.page-header-meta {

    color:
        rgba(
            255,
            255,
            255,
            0.35
        );

    font-family:
        monospace;

    font-size:
        0.7rem;

    letter-spacing:
        0.16em;

}


/* =====================================
   IMAGE CONTAINER
===================================== */

.page-header-image-container {

    position:
        relative;

    z-index:
        2;

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

}


/* =====================================
   IMAGE GLOW
===================================== */

.page-header-image-glow {

    position:
        absolute;

    top:
        50%;

    left:
        50%;

    width:
        85%;

    height:
        85%;

    transform:
        translate(
            -50%,
            -50%
        );

    border-radius:
        50%;

    background:
        radial-gradient(
            circle,
            rgba(
                139,
                92,
                246,
                0.22
            ) 0%,
            rgba(
                34,
                211,
                238,
                0.08
            ) 45%,
            transparent 72%
        );

    filter:
        blur(40px);

    pointer-events:
        none;

}


/* =====================================
   IMAGE
===================================== */

.page-header-image {

    position:
        relative;

    z-index:
        2;

    display:
        block;

    width:
        100%;

    max-width:
        650px;

    height:
        auto;

    max-height:
        520px;

    object-fit:
        contain;

    border-radius:
        24px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

    box-shadow:

        0 30px 80px
        rgba(
            0,
            0,
            0,
            0.45
        ),

        0 0 45px
        rgba(
            139,
            92,
            246,
            0.12
        );

}


/* =====================================
   BACKGROUND GLOW
===================================== */

.page-header-glow {

    position:
        absolute;

    top:
        50%;

    left:
        40%;

    width:
        650px;

    height:
        650px;

    transform:
        translate(
            -50%,
            -50%
        );

    border-radius:
        50%;

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
                139,
                92,
                246,
                0.05
            ) 40%,

            transparent 70%
        );

    filter:
        blur(30px);

    pointer-events:
        none;

}


/* =====================================
   PARTICLES
===================================== */

.page-header-particles {

    position:
        absolute;

    inset:
        0;

    z-index:
        1;

    overflow:
        hidden;

    pointer-events:
        none;

}


.particle {

    position:
        absolute;

    width:
        3px;

    height:
        3px;

    border-radius:
        50%;

    background:
        #a78bfa;

    opacity:
        0.45;

    box-shadow:

        0 0 8px
        rgba(
            167,
            139,
            250,
            0.8
        ),

        0 0 20px
        rgba(
            139,
            92,
            246,
            0.4
        );

    animation:
        particleFloat
        linear
        infinite;

}


@keyframes particleFloat {

    0% {

        transform:
            translate3d(
                0,
                0,
                0
            );

    }

    50% {

        transform:
            translate3d(
                25px,
                -45px,
                0
            );

    }

    100% {

        transform:
            translate3d(
                0,
                0,
                0
            );

    }

}


/* =====================================
   BOTTOM BORDER
===================================== */

.page-header-bottom {

    position:
        absolute;

    bottom:
        0;

    left:
        0;

    z-index:
        3;

    width:
        100%;

    height:
        1px;

    background:

        linear-gradient(
            90deg,

            transparent,

            rgba(
                139,
                92,
                246,
                0.45
            ),

            transparent
        );

}


/* =====================================
   TABLET
===================================== */

@media (max-width: 991px) {

    .page-header {

        padding:
            160px
            0
            90px;

    }


    .page-header--with-image
    .page-header-layout {

        grid-template-columns:
            1fr;

        gap:
            50px;

    }


    .page-header--with-image
    .page-title {

        max-width:
            750px;

        font-size:
            clamp(
                3.5rem,
                8vw,
                6rem
            );

    }


    .page-header-description p {

        max-width:
            600px;

    }


    .page-header-line {

        max-width:
            600px;

    }


    .page-header-image-container {

        justify-content:
            flex-start;

    }


    .page-header-image {

        width:
            100%;

        max-width:
            700px;

        max-height:
            480px;

    }

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 576px) {

    .page-header {

        padding:
            130px
            0
            75px;

    }


    .page-header--with-image
    .page-header-layout {

        gap:
            38px;

    }


    .page-header-label {

        margin-bottom:
            20px;

    }


    .page-title,
    .page-header--with-image
    .page-title {

        font-size:
            clamp(
                3rem,
                16vw,
                4.5rem
            );

        line-height:
            1;

    }


    .page-header-description {

        margin-top:
            28px;

    }


    .page-header-description p {

        font-size:
            1rem;

        line-height:
            1.7;

    }


    .page-header-image {

        max-height:
            340px;

        border-radius:
            18px;

    }


    .page-header-glow {

        width:
            450px;

        height:
            450px;

        left:
            50%;

    }

}


/* =====================================
   REDUCED MOTION
===================================== */

@media (prefers-reduced-motion: reduce) {

    .particle,
    .page-title-accent {

        animation:
            none;

    }

}

</style>