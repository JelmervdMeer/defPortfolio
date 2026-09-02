```vue
<script setup lang="ts">

defineProps<{
    label: string;
    title: string;
    description: string;
}>();

</script>


<template>

    <header class="page-header">

        <!-- =====================================
             BACKGROUND EFFECTS
        ====================================== -->

        <div
            class="page-header-glow"
            aria-hidden="true"
        ></div>


        <!-- =====================================
             CONTENT
        ====================================== -->

        <div class="container">

            <div class="page-header-content">


                <!-- =====================================
                     TITLE
                ====================================== -->

                <div class="page-header-title">

                    <div class="page-header-label">

                        {{ label }}

                    </div>


                    <h1 class="page-title">

                        {{ title }}

                    </h1>

                </div>


                <!-- =====================================
                     DESCRIPTION
                ====================================== -->

                <div class="page-header-description">

                    <p>

                        {{ description }}

                    </p>

                </div>

            </div>

        </div>

    </header>

</template>


<style scoped>

/* =====================================
   PAGE HEADER
===================================== */

.page-header {

    position: relative;

    padding:

        180px
        0
        100px;

    overflow: hidden;

    background:
        #08090d;

    isolation: isolate;

}


/* =====================================
   BACKGROUND GLOW
===================================== */

.page-header::before {

    content: "";

    position: absolute;

    top: -250px;
    left: -200px;

    width: 650px;
    height: 650px;

    border-radius: 50%;

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
                139,
                92,
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
   SECONDARY GLOW
===================================== */

.page-header::after {

    content: "";

    position: absolute;

    right: -180px;
    bottom: -250px;

    width: 550px;
    height: 550px;

    border-radius: 50%;

    background:

        radial-gradient(

            circle,

            rgba(
                0,
                212,
                255,
                0.08
            ) 0%,

            rgba(
                139,
                92,
                246,
                0.04
            ) 40%,

            transparent 72%

        );

    filter:
        blur(30px);

    pointer-events: none;

    z-index: -1;

}


/* =====================================
   CONTENT
===================================== */

.page-header-content {

    display: grid;

    grid-template-columns:

        minmax(
            0,
            1.2fr
        )

        minmax(
            0,
            0.8fr
        );

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

.page-header-label {

    display:
        inline-flex;

    align-items:
        center;

    margin-bottom:
        28px;

    color:
        rgba(
            255,
            255,
            255,
            0.6
        );

    font-size:
        0.75rem;

    font-weight:
        600;

    letter-spacing:
        0.22em;

    text-transform:
        uppercase;

}


.page-header-label::before {

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

        0 0 10px

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


/* =====================================
   DESCRIPTION
===================================== */

.page-header-description {

    max-width:
        500px;

    padding-bottom:
        8px;

}


.page-header-description p {

    margin: 0;

    color: rgba(
        255,
        255,
        255,
        0.62
    );

    font-size:
        clamp(
            1.2rem,
            1.5vw,
            1.4rem
        );

    line-height:
        1.7;

}


/* =====================================
   RESPONSIVE
===================================== */

@media (max-width: 991px) {

    .page-header {

        padding:

            150px
            0
            80px;

    }


    .page-header-content {

        grid-template-columns:
            1fr;

        gap:
            40px;

        align-items:
            start;

    }


    .page-header-description {

        max-width:
            650px;

    }

}


@media (max-width: 576px) {

    .page-header {

        padding:

            130px
            0
            70px;

    }


    .page-header-label {

        margin-bottom:
            20px;

    }


    .page-header-content {

        gap:
            30px;

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

}

</style>
```
