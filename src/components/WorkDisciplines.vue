<script setup lang="ts">

import {
    ref
} from 'vue';



// =====================================
// PROPS
// =====================================

const props =
    withDefaults(
        defineProps<{
            variant?: 'home' | 'about';
        }>(),
        {
            variant: 'home'
        }
    );



// =====================================
// TYPES
// =====================================

interface Discipline {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    icon: string;
    description: string;
    points: string[];
}



// =====================================
// STATE
// =====================================

const activeDiscipline = ref<string | null>(null);



// =====================================
// DISCIPLINES
// =====================================

const disciplines: Discipline[] = [

    {
        id: 'learning',
        number: '01',
        title: 'VERNIEUWING',
        subtitle: 'Blijven ontdekken',
        icon: 'bi-book',
        description:
            'Ik ben voortdurend bezig met het ontdekken van nieuwe technieken, tools en manieren om mezelf verder te ontwikkelen.',
        points: [
            'Nieuwe technologie leren',
            'Onderzoeken hoe dingen werken',
            'Blijven experimenteren'
        ]
    },

    {
        id: 'technical',
        number: '02',
        title: 'TECHNISCH',
        subtitle: 'Architectuur & structuur',
        icon: 'bi-code-slash',
        description:
            'Ik denk niet alleen na over wat een applicatie moet doen, maar ook over hoe deze technisch wordt opgebouwd.',
        points: [
            'Systemen ontwerpen',
            'Code structureren',
            'Complexe problemen vertalen'
        ]
    },

    {
        id: 'practical',
        number: '03',
        title: 'PRAKTISCH',
        subtitle: 'Van idee naar resultaat',
        icon: 'bi-gear',
        description:
            'Een goed idee is pas waardevol wanneer het ook daadwerkelijk wordt gebouwd, getest en verbeterd.',
        points: [
            'Oplossingsgericht werken',
            'Bouwen, testen en verbeteren',
            'Werkende resultaten opleveren'
        ]
    },

    {
        id: 'creative',
        number: '04',
        title: 'CREATIEF',
        subtitle: 'Denken buiten de standaard',
        icon: 'bi-brush',
        description:
            'Ik combineer techniek met creativiteit en zoek graag naar interactieve en visueel interessante oplossingen.',
        points: [
            'Nieuwe ideeën bedenken',
            'Experimenteren met interactie',
            '3D en visuele elementen gebruiken'
        ]
    },

    {
        id: 'communication',
        number: '05',
        title: 'COMMUNICATIE',
        subtitle: 'Techniek begrijpelijk maken',
        icon: 'bi-chat-square-text',
        description:
            'Goede communicatie helpt om ideeën, techniek en verwachtingen bij elkaar te brengen.',
        points: [
            'Luisteren en vragen stellen',
            'Ideeën duidelijk uitleggen',
            'Samenwerken en verbinden'
        ]
    }

];



// =====================================
// INTERACTION
// =====================================

function activateDiscipline(
    id: string
) {

    if (
        props.variant === 'about'
    ) {

        activeDiscipline.value =
            activeDiscipline.value === id
                ? null
                : id;

    }

}

</script>


<template>

    <section
        class="work-disciplines"
        :class="`work-disciplines--${variant}`"
    >

        <div class="container">

            <!-- =====================================
                 DISCIPLINE SYSTEM
            ====================================== -->

            <div class="discipline-system">

                <!-- SVG CONNECTIONS -->

                <svg
                    class="discipline-connections"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="xMidYMid meet"
                >

                    <!-- LEERGIERIG -->

                    <path
                        id="learning-path"
                        class="connection-path"
                        d="M 500 170 L 500 500"
                    />

                    <circle
                        v-if="
                            activeDiscipline ===
                            'learning'
                        "
                        class="pulse-dot"
                        r="8"
                    >
                        <animateMotion
                            dur="1.2s"
                            repeatCount="indefinite"
                            path="M 500 170 L 500 500"
                        />
                    </circle>



                    <!-- TECHNISCH -->

                    <path
                        id="technical-path"
                        class="connection-path"
                        d="M 815 400 L 500 500"
                    />

                    <circle
                        v-if="
                            activeDiscipline ===
                            'technical'
                        "
                        class="pulse-dot"
                        r="8"
                    >
                        <animateMotion
                            dur="1.2s"
                            repeatCount="indefinite"
                            path="M 815 400 L 500 500"
                        />
                    </circle>



                    <!-- PRAKTISCH -->

                    <path
                        id="practical-path"
                        class="connection-path"
                        d="M 695 770 L 500 500"
                    />

                    <circle
                        v-if="
                            activeDiscipline ===
                            'practical'
                        "
                        class="pulse-dot"
                        r="8"
                    >
                        <animateMotion
                            dur="1.2s"
                            repeatCount="indefinite"
                            path="M 695 770 L 500 500"
                        />
                    </circle>



                    <!-- CREATIEF -->

                    <path
                        id="creative-path"
                        class="connection-path"
                        d="M 305 770 L 500 500"
                    />

                    <circle
                        v-if="
                            activeDiscipline ===
                            'creative'
                        "
                        class="pulse-dot"
                        r="8"
                    >
                        <animateMotion
                            dur="1.2s"
                            repeatCount="indefinite"
                            path="M 305 770 L 500 500"
                        />
                    </circle>



                    <!-- COMMUNICATIE -->

                    <path
                        id="communication-path"
                        class="connection-path"
                        d="M 185 400 L 500 500"
                    />

                    <circle
                        v-if="
                            activeDiscipline ===
                            'communication'
                        "
                        class="pulse-dot"
                        r="8"
                    >
                        <animateMotion
                            dur="1.2s"
                            repeatCount="indefinite"
                            path="M 185 400 L 500 500"
                        />
                    </circle>

                </svg>



                <!-- =================================
                     CENTER
                ================================== -->

                <div
                    class="discipline-center"
                >

                    <span>
                        DIGITALE
                    </span>

                    <strong>
                        OPLOSSING
                    </strong>

                </div>



                <!-- =================================
                     DISCIPLINES
                ================================== -->

                <button
                    v-for="
                        discipline in disciplines
                    "
                    :key="discipline.id"
                    type="button"
                    class="discipline-node"
                    :class="[
                        `discipline-node--${discipline.id}`,
                        {
                            'is-active':
                                activeDiscipline ===
                                discipline.id
                        }
                    ]"
                    @mouseenter="
                        activeDiscipline =
                            discipline.id
                    "
                    @mouseleave="
                        variant === 'home'
                            ? activeDiscipline = null
                            : null
                    "
                    @click="
                        activateDiscipline(
                            discipline.id
                        )
                    "
                >

                    <span
                        class="discipline-node-number"
                    >
                        {{ discipline.number }}
                    </span>



                    <div
                        class="discipline-node-icon"
                    >

                        <i
                            :class="[
                                'bi',
                                discipline.icon
                            ]"
                        ></i>

                    </div>



                    <div
                        class="discipline-node-content"
                    >

                        <h3>
                            {{ discipline.title }}
                        </h3>

                        <span>
                            {{ discipline.subtitle }}
                        </span>

                    </div>



                    <div
                        v-if="
                            variant === 'about'
                        "
                        class="discipline-node-description"
                    >

                        <p>
                            {{ discipline.description }}
                        </p>

                        <ul>

                            <li
                                v-for="
                                    point in discipline.points
                                "
                                :key="point"
                            >

                                <i
                                    class="bi bi-arrow-right"
                                ></i>

                                {{ point }}

                            </li>

                        </ul>

                    </div>

                </button>

            </div>

        </div>

    </section>

</template>



<style scoped>

/* =====================================
   SECTION
===================================== */

.work-disciplines {

    position: relative;

    width: 100%;

    padding: 160px 0;

    overflow: hidden;

    background:

        /* PAARSE GLOED */

        radial-gradient(
            circle at 48% 48%,
            rgba(139, 92, 246, 0.14) 0%,
            rgba(139, 92, 246, 0.07) 25%,
            transparent 50%
        ),

        /* BLAUWE GLOED */

        radial-gradient(
            circle at 62% 55%,
            rgba(0, 212, 255, 0.08) 0%,
            transparent 45%
        );
}

.discipline-center span {
    font-size: clamp(0.7rem, 0.65vw, 0.9rem);
}

.discipline-center strong {
    font-size: clamp(1.2rem, 1.15vw, 1.55rem);
}

.discipline-node-number {
    font-size: clamp(0.65rem, 0.55vw, 0.8rem);
}

.discipline-node-content h3 {
    font-size: clamp(0.85rem, 0.75vw, 1.05rem);
}

.discipline-node-content span {
    font-size: clamp(0.65rem, 0.6vw, 0.8rem);
}

.discipline-node-description p {
    font-size: clamp(0.72rem, 0.65vw, 0.9rem);
}

.discipline-node-description li {
    font-size: clamp(0.65rem, 0.55vw, 0.78rem);
}

/* =====================================
   SYSTEM
===================================== */

.discipline-system {

    position: relative;

    /*
     * De figuur neemt nu de volledige
     * beschikbare breedte van de container.
     */
    width: 100%;

    /*
     * Behoudt de vierkante verhouding
     * van het SVG-systeem.
     */
    aspect-ratio: 1 / 1;

    margin: 0;

}



/* =====================================
   CONNECTIONS
===================================== */

.discipline-connections {

    position: absolute;

    inset: 0;

    width: 100%;

    height: 100%;

    overflow: visible;

    pointer-events: none;

    z-index: 1;

}



.connection-path {

    fill: none;

    stroke:
        rgba(
            139,
            92,
            246,
            0.28
        );

    stroke-width: 2;

    transition:
        stroke 0.3s ease,
        stroke-width 0.3s ease;

}



/* =====================================
   CENTER
===================================== */

.discipline-center {

    position: absolute;

    top: 50%;

    left: 50%;

    z-index: 5;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    width: 230px;

    height: 230px;

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.55
        );

    border-radius: 50%;

    background:

        radial-gradient(
            circle at 50% 40%,
            rgba(
                139,
                92,
                246,
                0.18
            ),
            rgba(
                8,
                9,
                13,
                0.95
            )
        );

    box-shadow:

        0 0 60px
        rgba(
            139,
            92,
            246,
            0.18
        ),

        inset 0 0 30px
        rgba(
            139,
            92,
            246,
            0.08
        );

    transform:
        translate(
            -50%,
            -50%
        );

}



.discipline-center span {

    color:
        rgba(
            255,
            255,
            255,
            0.55
        );

    font-family: monospace;

    font-size: 0.7rem;

    letter-spacing: 0.25em;

}



.discipline-center strong {

    margin-top: 8px;

    color: #ffffff;

    font-size: 1.2rem;

    letter-spacing: 0.08em;

}



/* =====================================
   PULSE
===================================== */

.pulse-dot {

    fill: #c084fc;

    filter:
        drop-shadow(
            0 0 8px
            rgba(
                192,
                132,
                252,
                1
            )
        );

    z-index: 10;

}



/* =====================================
   DISCIPLINE NODE
===================================== */

.discipline-node {

    position: absolute;

    z-index: 10;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    width: 190px;

    height: 190px;

    padding: 20px;

    color: #ffffff;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.1
        );

    border-radius: 50%;

    background:

        radial-gradient(
            circle at 50% 35%,
            rgba(
                255,
                255,
                255,
                0.06
            ),
            rgba(
                17,
                19,
                26,
                0.95
            )
        );

    cursor: pointer;

    transform:
        translate(
            -50%,
            -50%
        );

    transition:

        transform 0.4s
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        ),

        border-color 0.3s ease,

        box-shadow 0.3s ease,

        background 0.3s ease;

    appearance: none;

}



/* =====================================
   HOVER / ACTIVE
===================================== */

.discipline-node:hover,
.discipline-node.is-active {

    z-index: 20;

    border-color:
        rgba(
            139,
            92,
            246,
            0.75
        );

    background:

        radial-gradient(
            circle at 50% 35%,
            rgba(
                139,
                92,
                246,
                0.18
            ),
            rgba(
                17,
                19,
                26,
                0.98
            )
        );

    box-shadow:

        0 0 45px
        rgba(
            139,
            92,
            246,
            0.22
        );

    transform:
        translate(
            -50%,
            -50%
        )
        scale(1.08);

}



/* =====================================
   NODE POSITIONS
===================================== */

.discipline-node--learning {

    top: 17%;

    left: 50%;

}



.discipline-node--technical {

    top: 40%;

    left: 81.5%;

}



.discipline-node--practical {

    top: 77%;

    left: 69.5%;

}



.discipline-node--creative {

    top: 77%;

    left: 30.5%;

}



.discipline-node--communication {

    top: 40%;

    left: 18.5%;

}



/* =====================================
   NUMBER
===================================== */

.discipline-node-number {

    position: absolute;

    top: 18px;

    left: 22px;

    color:
        rgba(
            139,
            92,
            246,
            0.8
        );

    font-family: monospace;

    font-size: 0.65rem;

    letter-spacing: 0.15em;

}



/* =====================================
   ICON
===================================== */

.discipline-node-icon {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 50px;

    height: 50px;

    margin-bottom: 14px;

    color: #a78bfa;

    border-radius: 50%;

    background:
        rgba(
            139,
            92,
            246,
            0.1
        );

    font-size: 1.4rem;

}



/* =====================================
   NODE CONTENT
===================================== */

.discipline-node-content {

    display: flex;

    flex-direction: column;

    align-items: center;

}



.discipline-node-content h3 {

    margin: 0;

    font-size: 0.85rem;

    font-weight: 700;

    letter-spacing: 0.08em;

}



.discipline-node-content span {

    margin-top: 7px;

    color:
        rgba(
            255,
            255,
            255,
            0.45
        );

    font-size: 0.65rem;

    text-align: center;

}



/* =====================================
   DESCRIPTION IN NODE
===================================== */

.discipline-node-description {

    position: absolute;

    top: 100%;

    left: 50%;

    width: 250px;

    padding: 18px;

    margin-top: 20px;

    opacity: 0;

    visibility: hidden;

    transform:
        translate(
            -50%,
            -10px
        );

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.3
        );

    border-radius: 12px;

    background:
        rgba(
            8,
            9,
            13,
            0.96
        );

    box-shadow:

        0 20px 50px
        rgba(
            0,
            0,
            0,
            0.4
        );

    pointer-events: none;

    transition:

        opacity 0.3s ease,

        transform 0.3s ease,

        visibility 0.3s ease;

}



.discipline-node:hover
.discipline-node-description,

.discipline-node.is-active
.discipline-node-description {

    opacity: 1;

    visibility: visible;

    transform:
        translate(
            -50%,
            0
        );

}



.discipline-node-description p {

    margin: 0 0 15px;

    color:
        rgba(
            255,
            255,
            255,
            0.65
        );

    font-size: 0.72rem;

    line-height: 1.6;

    text-align: left;

}



.discipline-node-description ul {

    display: flex;

    flex-direction: column;

    gap: 7px;

    margin: 0;

    padding: 0;

    list-style: none;

}



.discipline-node-description li {

    display: flex;

    align-items: flex-start;

    gap: 7px;

    color:
        rgba(
            255,
            255,
            255,
            0.8
        );

    font-size: 0.65rem;

    line-height: 1.4;

    text-align: left;

}



.discipline-node-description li i {

    flex-shrink: 0;

    color: #a78bfa;

}



/* =====================================
   ABOUT
===================================== */

.work-disciplines--about {

    padding:
        120px 0 160px;

}



.work-disciplines--about
.discipline-node {

    cursor: pointer;

}



/* =====================================
   PARAGRAPHS
===================================== */

p {

    font-size:
        clamp(
            1rem,
            1.2vw,
            1.35rem
        );

}



/* =====================================
   RESPONSIVE
===================================== */

@media (max-width: 768px) {

    .work-disciplines {

        padding: 100px 0;

    }



    .discipline-system {

        /*
         * Op mobiel mag de figuur groter zijn
         * dan de container, zodat hij niet
         * onnatuurlijk klein wordt weergegeven.
         */

        width: min(
            700px,
            127vw
        );

        max-width: none;

        margin-left: 50%;

        margin-right: 0;

        transform:
            translateX(-50%);

    }



    .discipline-center {

        width: 160px;

        height: 160px;

    }



    .discipline-node {

        width: 125px;

        height: 125px;

        padding: 12px;

    }



    .discipline-node-icon {

        width: 38px;

        height: 38px;

        margin-bottom: 8px;

        font-size: 1rem;

    }



    .discipline-node-content h3 {

        font-size: 0.6rem;

    }



    .discipline-node-content span {

        display: none;

    }



    .discipline-node-number {

        top: 12px;

        left: 15px;

        font-size: 0.5rem;

    }



    .discipline-node-description {

        width: 220px;

        padding: 14px;

        margin-top: 12px;

    }



    .discipline-node-description p {

        font-size: 0.65rem;

    }



    .discipline-node-description li {

        font-size: 0.58rem;

    }

}

</style>