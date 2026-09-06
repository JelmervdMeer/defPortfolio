```vue
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

}

const props = withDefaults(
    defineProps<Props>(),
    {
        accent: '',
        bottomLabel: '',
        particles: true,
        showLine: true,
        showBottomBorder: true
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
    const index = title.indexOf(accent);


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
                    text: title.slice(0, index),
                    accent: false
                }
            ]
            : []),


        // Accent
        {
            text: accent,
            accent: true
        },


        // Tekst ná het accent
        ...(index + accent.length < title.length
            ? [
                {
                    text: title.slice(
                        index + accent.length
                    ),
                    accent: false
                }
            ]
            : [])

    ];

});


// =====================================
// PARTICLES
// =====================================

const particles = Array.from(
    { length: 35 },
    (_, index) => ({

        id: index,

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
```

```



```vue
```vue
<template>

    <section class="page-header">


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
                    left: particle.left,
                    top: particle.top,
                    animationDelay: particle.animationDelay,
                    animationDuration: particle.animationDuration
                }"
            ></span>

        </div>


        <!-- =====================================
             CONTENT
        ====================================== -->

        <div class="container">

            <div class="page-header-content">


                <!-- =====================================
                     TITLE
                ====================================== -->

                <div class="page-header-title">


                    <!-- LABEL -->

                    <div class="page-header-label">

                        {{ props.label }}

                    </div>


                    <!-- TITLE -->

                    <h1 class="page-title">

                        <span
                            v-for="(part, index) in titleParts"
                            :key="index"
                            :class="{
                                'page-title-accent': part.accent
                            }"
                        >
                            {{ part.text }}
                        </span>

                    </h1>

                </div>


                <!-- =====================================
                     DESCRIPTION
                ====================================== -->

                <div class="page-header-description">

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
```

```



<style scoped>

/* =====================================
   PAGE HEADER
===================================== */

.page-header {

    position: relative;

    padding:
        190px
        0
        110px;

    overflow: hidden;

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
   CONTENT
===================================== */

.page-header-content {

    position: relative;

    z-index: 2;

    display: grid;

    grid-template-columns:
        minmax(0, 1.3fr)
        minmax(280px, 0.7fr);

    align-items: end;

    gap: 100px;

}


/* =====================================
   TITLE
===================================== */

.page-header-title {

    max-width:
        750px;

}


/* =====================================
   LABEL
===================================== */

/*.page-header-label { font-family: var(--font-heading); font-size: clamp( 1rem, 1.6vw, 3rem ); font-weight: 600; letter-spacing: 0.18em; color: var(--color-secondary); text-transform: uppercase; }*/


.page-header-label::before {

    content: "";

    width:
        28px;

    height:
        1px;

    margin-right:
        12px;

 

}


/* =====================================
   TITLE
===================================== */

.page-title {

    margin:
        0;

    color:
        #ffffff;

    font-family:
        'Space Grotesk',
        sans-serif;

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

/* ===================================== TITLE ACCENT ===================================== */ .page-title-accent { background: linear-gradient( 90deg, #8b5cf6, #c084fc, #22d3ee, #8b5cf6 ); background-size: 300% 100%; background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; animation: pageHeaderGradient 6s ease infinite; } @keyframes pageHeaderGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

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

    padding-bottom:
        8px;

}


.page-header-description p {

    max-width:
        420px;

    margin:
        0;

    color:
        rgba(
            255,
            255,
            255,
            0.62
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


    .page-header-content {

        grid-template-columns:
            1fr;

        gap:
            45px;

    }


    .page-header-description p {

        max-width:
            600px;

    }


    .page-header-line {

        max-width:
            600px;

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


    .page-header-content {

        gap:
            35px;

    }


    .page-header-description p {

        font-size:
            1rem;

        line-height:
            1.7;

    }


    .page-header-label {

        margin-bottom:
            20px;

    }


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


    .page-header-glow {

        width:
            450px;

        height:
            450px;

        left:
            50%;

    }

}

</style>
```
