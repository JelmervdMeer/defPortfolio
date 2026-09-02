```vue
<script setup lang="ts">

// =====================================
// PROPS
// =====================================

interface Props {

    label: string;

    title: string;

    description: string;

    accent?: string;

    bottomLabel?: string;

}

const props = withDefaults(
    defineProps<Props>(),
    {
        accent: '',
        bottomLabel: ''
    }
);

</script>


<template>

    <section class="project-header">

        <!-- =====================================
             BACKGROUND GLOW
        ====================================== -->

        <div
            class="project-header-glow"
            aria-hidden="true"
        ></div>


        <!-- =====================================
             PARTICLES
        ====================================== -->

        <div
            class="project-header-particles"
            aria-hidden="true"
        >

            <span
                v-for="particle in 35"
                :key="particle"
                class="particle"
                :style="{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * -8}s`,
                    animationDuration: `${6 + Math.random() * 8}s`
                }"
            ></span>

        </div>


        <div class="container">

            <div class="project-header-content">


                <!-- =====================================
                     LEFT
                ====================================== -->

                <div class="project-header-title">

                    <div class="project-header-label">

                        {{ props.label }}

                    </div>


                    <h1 class="page-title">

                        {{ props.title }}

                        <span
                            v-if="props.accent"
                            class="animated-gradient-text"
                        >

                            {{ props.accent }}

                        </span>

                    </h1>

                </div>


                <!-- =====================================
                     RIGHT
                ====================================== -->

                <div class="project-header-description">

                    <p>

                        {{ props.description }}

                    </p>


                    <div class="project-header-line"></div>


                    <span
                        v-if="props.bottomLabel"
                        class="project-count"
                    >

                        {{ props.bottomLabel }}

                    </span>

                </div>

            </div>

        </div>


        <!-- =====================================
             BOTTOM LINE
        ====================================== -->

        <div class="project-header-bottom"></div>

    </section>

</template>


<style scoped>

/* =====================================
   PROJECT HEADER
===================================== */

.project-header {

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

.project-header-content {

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
   LABEL
===================================== */

.project-header-label {

    display: inline-flex;

    align-items: center;

    margin-bottom: 28px;

    color:
        rgba(
            255,
            255,
            255,
            0.65
        );

    font-size:
        0.75rem;

    font-weight:
        600;

    letter-spacing:
        0.22em;

}


.project-header-label::before {

    content: "";

    width:
        28px;

    height:
        1px;

    margin-right:
        12px;

    background:
        #8b5cf6;

    box-shadow:
        0 0 12px
        rgba(
            139,
            92,
            246,
            0.8
        );

}


/* =====================================
   TITLE
===================================== */

.project-header-title h1 {

    margin:
        0;

    color:
        #ffffff;

    font-weight:
        700;

    line-height:
        1;

    letter-spacing:
        -0.055em;

}


/* =====================================
   DESCRIPTION
===================================== */

.project-header-description {

    display:
        flex;

    flex-direction:
        column;

    align-items:
        flex-start;

    padding-bottom:
        8px;

}


.project-header-description p {

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

    line-height:
        1.8;

        font-size: clamp(
            1rem,
            1.2vw,
            1.35rem
        );

}


/* =====================================
   LINE
===================================== */

.project-header-line {

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
                0.8
            ),

            rgba(
                255,
                255,
                255,
                0.08
            )
        );

}


/* =====================================
   SMALL LABEL
===================================== */

.project-count {

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

.project-header-glow {

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

.project-header-particles {

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

.project-header-bottom {

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

    .project-header {

        padding:
            160px
            0
            90px;

    }


    .project-header-content {

        grid-template-columns:
            1fr;

        gap:
            45px;

    }


    .project-header-description p {

        max-width:
            600px;

    }


    .project-header-line {

        max-width:
            600px;

    }

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 576px) {

    .project-header {

        padding:
            130px
            0
            75px;

    }


    .project-header-content {

        gap:
            35px;

    }


    .project-header-description p {

        font-size:
            1rem;

        line-height:
            1.7;

    }


    .project-header-label {

        margin-bottom:
            20px;

    }


    .project-header-glow {

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
