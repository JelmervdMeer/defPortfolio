<script setup lang="ts">

// =====================================
// DISCIPLINES
// =====================================

interface Discipline {
    number: string;
    title: string;
    description: string;
    icon: string;
    position: string;
}

const disciplines: Discipline[] = [
    {
        number: '01',
        title: 'VERNIEUWING',
        description: 'Blijven ontdekken',
        icon: 'bi-book',
        position: 'top'
    },
    {
        number: '02',
        title: 'TECHNISCH',
        description: 'Architectuur & structuur',
        icon: 'bi-code-slash',
        position: 'right'
    },
    {
        number: '03',
        title: 'PRAKTISCH',
        description: 'Van idee naar resultaat',
        icon: 'bi-gear',
        position: 'bottom-right'
    },
    {
        number: '04',
        title: 'CREATIEF',
        description: 'Denken buiten de standaard',
        icon: 'bi-brush',
        position: 'bottom-left'
    },
    {
        number: '05',
        title: 'COMMUNICATIE',
        description: 'Techniek begrijpelijk maken',
        icon: 'bi-chat-square-text',
        position: 'left'
    }
];

</script>


<template>

    <div class="discipline-network">

        <!-- =====================================
             CONNECTIONS
        ====================================== -->

        <svg
            class="discipline-connections"
            viewBox="0 0 600 500"
            preserveAspectRatio="none"
            aria-hidden="true"
        >

            <!-- OUTER CONNECTIONS -->

            <line
                x1="300"
                y1="70"
                x2="500"
                y2="190"
            />

            <line
                x1="500"
                y1="190"
                x2="430"
                y2="410"
            />

            <line
                x1="430"
                y1="410"
                x2="170"
                y2="410"
            />

            <line
                x1="170"
                y1="410"
                x2="100"
                y2="190"
            />

            <line
                x1="100"
                y1="190"
                x2="300"
                y2="70"
            />


            <!-- INNER CONNECTIONS -->

            <line
                x1="300"
                y1="70"
                x2="430"
                y2="410"
            />

            <line
                x1="300"
                y1="70"
                x2="170"
                y2="410"
            />

            <line
                x1="100"
                y1="190"
                x2="500"
                y2="190"
            />

        </svg>


        <!-- =====================================
             CENTER
        ====================================== -->

        <div class="discipline-center">

            <span>
                WERKWIJZE
            </span>

        </div>


        <!-- =====================================
             NODES
        ====================================== -->

        <article
            v-for="discipline in disciplines"
            :key="discipline.number"
            class="discipline-node"
            :class="`discipline-node--${discipline.position}`"
        >

            <div class="discipline-node-inner">

                <!-- NUMBER -->

                <div class="discipline-number">
                    {{ discipline.number }}
                </div>


                <!-- ICON -->

                <div class="discipline-icon">

                    <i
                        :class="`
                            bi
                            ${discipline.icon}
                        `"
                    ></i>

                </div>


                <!-- TEXT -->

               <div class="discipline-text">

    <h3>
        {{ discipline.title }}
    </h3>

</div>


<p class="discipline-description">
    {{ discipline.description }}
</p>

            </div>

        </article>

    </div>

</template>


<style scoped>

/* =========================================
   NETWORK
========================================= */

.discipline-network {
    position: relative;

    width: 100%;
    max-width: 680px;

    min-height: 520px;

    margin: 0 auto;
}


/* =========================================
   CONNECTIONS
========================================= */

.discipline-connections {
    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;

    overflow: visible;

    pointer-events: none;
}


.discipline-connections line {
    stroke:
        rgba(
            139,
            92,
            246,
            0.16
        );

    stroke-width:
        1.2;

    vector-effect:
        non-scaling-stroke;

    transition:
        stroke 300ms ease,
        opacity 300ms ease;
}


/* =========================================
   CENTER
========================================= */

.discipline-center {
    position: absolute;

    top: 50%;
    left: 50%;

    display: flex;

    align-items: center;
    justify-content: center;

    width: 128px;
    height: 128px;

    transform:
        translate(
            -50%,
            -50%
        );

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.18
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
            ),
            rgba(
                34,
                211,
                238,
                0.035
            ) 55%,
            rgba(
                8,
                9,
                13,
                0.2
            ) 100%
        );

    box-shadow:
        0 0 60px
        rgba(
            139,
            92,
            246,
            0.08
        );

    z-index: 1;
}


.discipline-center::before {
    content: "";

    position: absolute;

    inset: 11px;

    border:
        1px solid
        rgba(
            34,
            211,
            238,
            0.09
        );

    border-radius:
        inherit;
}


.discipline-center span {
    position: relative;

    z-index: 1;

    color:
        rgba(
            255,
            255,
            255,
            0.5
        );

    font-family:
        var(--font-heading);

    font-size:
        0.7rem;

    font-weight:
        600;

    letter-spacing:
        0.18em;

    text-transform:
        uppercase;
}


/* =========================================
   NODE
========================================= */

.discipline-node {
    position: absolute;

    z-index: 2;

    width: 220px;

    cursor: default;
}


.discipline-node-inner {
    position: relative;

    display: grid;

    grid-template-columns:
        auto
        auto
        minmax(0, 1fr);

    align-items: center;

    gap: 12px;

    width: 100%;

    padding:
        14px
        16px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.055
        );

    border-radius:
        16px;

    background:
        linear-gradient(
            135deg,
            rgba(
                255,
                255,
                255,
                0.035
            ),
            rgba(
                255,
                255,
                255,
                0.01
            )
        );

    backdrop-filter:
        blur(10px);

    transition:
        transform 300ms
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        ),

        border-color
        300ms ease,

        background-color
        300ms ease,

        box-shadow
        300ms ease;
}


/* =========================================
   NODE POSITIONS
========================================= */

.discipline-node--top {
    top: 0;
    left: 50%;

    transform:
        translateX(-50%);
}


.discipline-node--right {
    top: 135px;
    right: 0;
}


.discipline-node--bottom-right {
    right: 55px;
    bottom: 0;
}


.discipline-node--bottom-left {
    left: 55px;
    bottom: 0;
}


.discipline-node--left {
    top: 135px;
    left: 0;
}


/* =========================================
   NUMBER
========================================= */

.discipline-number {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 34px;
    height: 34px;

    flex-shrink: 0;

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.28
        );

    border-radius:
        50%;

    background:
        rgba(
            139,
            92,
            246,
            0.055
        );

    color:
        var(--color-primary-light);

    font-family:
        var(--font-heading);

    font-size:
        0.66rem;

    font-weight:
        600;

    transition:
        transform 300ms ease,
        border-color 300ms ease,
        background-color 300ms ease,
        box-shadow 300ms ease;
}


/* =========================================
   ICON
========================================= */

.discipline-icon {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 34px;
    height: 34px;

    flex-shrink: 0;

    border-radius:
        10px;

    background:
        rgba(
            34,
            211,
            238,
            0.035
        );

    color:
        var(--color-secondary);

    font-size:
        0.95rem;

    transition:
        transform 300ms ease,
        background-color 300ms ease,
        box-shadow 300ms ease;
}


/* =========================================
   DESCRIPTION
========================================= */

.discipline-description {
    grid-column:
        1 / -1;

    max-height:
        0;

    margin:
        0;

    padding:
        0;

    opacity:
        0;

    overflow:
        hidden;

    color:
        var(--color-text-muted);

    font-family:
        var(--font-body);

    font-size:
        0.76rem;

    line-height:
        1.45;

    transform:
        translateY(-6px);

    transition:
        max-height 300ms ease,
        margin-top 300ms ease,
        opacity 250ms ease,
        transform 300ms ease;
}


.discipline-node:hover
.discipline-description {
    max-height:
        50px;

    margin-top:
        4px;

    opacity:
        1;

    transform:
        translateY(0);
}
/* =========================================
   NODE HOVER
========================================= */

.discipline-node:hover {
    z-index:
        5;
}


.discipline-node:hover
.discipline-node-inner {
    transform:
        translateY(-4px)
        scale(1.025);

    border-color:
        rgba(
            139,
            92,
            246,
            0.28
        );

    background:
        linear-gradient(
            135deg,
            rgba(
                139,
                92,
                246,
                0.095
            ),
            rgba(
                34,
                211,
                238,
                0.035
            )
        );

    box-shadow:
        0 18px 45px
        rgba(
            0,
            0,
            0,
            0.22
        ),

        0 0 25px
        rgba(
            139,
            92,
            246,
            0.08
        );
}


.discipline-node:hover
.discipline-number {
    transform:
        scale(1.08);

    border-color:
        rgba(
            167,
            139,
            250,
            0.6
        );

    background:
        rgba(
            139,
            92,
            246,
            0.14
        );

    box-shadow:
        0 0 20px
        rgba(
            139,
            92,
            246,
            0.16
        );
}


.discipline-node:hover
.discipline-icon {
    transform:
        translateY(-2px);

    background:
        rgba(
            34,
            211,
            238,
            0.08
        );

    box-shadow:
        0 0 18px
        rgba(
            34,
            211,
            238,
            0.09
        );
}


.discipline-node:hover
.discipline-text p {
    max-height:
        50px;

    margin-top:
        5px;

    opacity:
        1;

    transform:
        translateY(0);
}

.discipline-text h3 {
    margin: 0;

    color:
        var(--color-text);

    font-family:
        var(--font-heading);

    font-size:
        0.62rem;

    font-weight:
        600;

    line-height:
        1.2;

    letter-spacing:
        0.05em;

    white-space:
        nowrap;
}


/* =========================================
   NETWORK HOVER
========================================= */

.discipline-network:hover
.discipline-connections line {
    stroke:
        rgba(
            139,
            92,
            246,
            0.25
        );
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 991px) {

    .discipline-network {
        max-width:
            620px;

        min-height:
            500px;
    }


    .discipline-node {
        width:
            205px;
    }


    .discipline-node--right {
        right:
            0;
    }


    .discipline-node--left {
        left:
            0;
    }


    .discipline-node--bottom-right {
        right:
            35px;
    }


    .discipline-node--bottom-left {
        left:
            35px;
    }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 700px) {

    .discipline-network {
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
            12px;

        width:
            100%;

        max-width:
            520px;

        min-height:
            0;

        margin:
            0 auto;
    }


    .discipline-connections,
    .discipline-center {
        display:
            none;
    }


    .discipline-node {
        position:
            relative;

        top:
            auto;

        right:
            auto;

        bottom:
            auto;

        left:
            auto;

        width:
            100%;

        transform:
            none;
    }


    .discipline-node:last-child {
        grid-column:
            1 / -1;

        width:
            calc(
                50% - 6px
            );

        justify-self:
            center;
    }


    .discipline-node-inner {
        height:
            100%;

        padding:
            16px 14px;

        grid-template-columns:
            auto
            minmax(
                0,
                1fr
            );
    }


    .discipline-number {
        grid-row:
            1 / 3;
    }


    .discipline-icon {
        display:
            none;
    }


  


    .discipline-text p {
        max-height:
            none;

        margin-top:
            5px;

        opacity:
            1;

        transform:
            none;

        overflow:
            visible;

        font-size:
            0.72rem;
    }


    .discipline-node:hover
    .discipline-node-inner {
        transform:
            translateY(-3px);
    }

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {

    .discipline-network {
        grid-template-columns:
            1fr;

        gap:
            10px;
    }


    .discipline-node:last-child {
        grid-column:
            auto;

        width:
            100%;
    }


    .discipline-node-inner {
        grid-template-columns:
            auto
            auto
            minmax(
                0,
                1fr
            );

        min-height:
            76px;
    }


    .discipline-number {
        grid-row:
            auto;
    }


    .discipline-icon {
        display:
            flex;
    }

}


/* =========================================
   REDUCED MOTION
========================================= */

@media (
    prefers-reduced-motion:
    reduce
) {

    .discipline-node-inner,
    .discipline-number,
    .discipline-icon,
    .discipline-text p,
    .discipline-connections line {
        transition:
            none;
    }

}

</style>