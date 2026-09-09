<script setup lang="ts">

import {
    onMounted,
    onUnmounted,
    ref
} from 'vue';

import PageHeader from '../components/PageHeader.vue';
import SectionLayout from '../components/SectionLayout.vue';


// =====================================
// FORM STATE
// =====================================

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const submitted = ref(false);
const submitting = ref(false);
const submitError = ref('');


// =====================================
// FORM SUBMIT
// =====================================

const handleSubmit =
    async () => {

        // Voorkomt dubbel verzenden
        if (submitting.value) {
            return;
        }


        submitted.value = false;
        submitting.value = true;
        submitError.value = '';


        try {

            const response =
                await fetch(
                    '/api/contact',
                    {
                        method:
                            'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify({
                                name:
                                    name.value,

                                email:
                                    email.value,

                                subject:
                                    subject.value,

                                message:
                                    message.value
                            })
                    }
                );


            let data:
                {
                    success?: boolean;
                    message?: string;
                } = {};


            try {

                data =
                    await response.json();

            }
            catch {

                // Response bevatte geen geldige JSON.
                data = {};

            }


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    'Het bericht kon niet worden verzonden.'
                );

            }


            // =====================================
            // SUCCESS
            // =====================================

            submitted.value = true;


            // Formulier leegmaken
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';

        }
        catch (error) {

            console.error(
                'Contactformulier fout:',
                error
            );


            submitError.value =
                error instanceof Error
                    ? error.message
                    : 'Het bericht kon niet worden verzonden. Probeer het later opnieuw.';

        }
        finally {

            submitting.value = false;

        }

    };


// =====================================
// REVEAL ANIMATION
// =====================================

let revealObserver:
    IntersectionObserver | null = null;


function setupRevealObserver() {

    const elements =
        document.querySelectorAll(
            '.contact-page .reveal'
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
                threshold:
                    0.08,

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

    <main class="contact-page">


        <!-- =====================================
             PAGE HEADER
        ====================================== -->

        <PageHeader
            label="CONTACT"
            title="Laten we iets moois bouwen."
            accent="moois"
            description="Heb je een idee, een project of een digitale uitdaging? Ik denk graag met je mee over een passende digitale oplossing."
            :particles="false"
        />


        <!-- =====================================
             CONTACT SECTIONS
        ====================================== -->

        <div class="contact-sections">


            <!-- =====================================
                 CONTACT INFORMATION
                 TITLE RIGHT
            ====================================== -->

            <div
                class="
                    contact-section-container
                    contact-info-container
                "
            >

                <SectionLayout
                    class="contact-section"
                    variant="split"
                    reverse
                    label="CONTACTGEGEVENS"
                    title="Neem contact op."
                    description="Ik sta open voor freelance opdrachten, samenwerkingen en interessante projecten."
                >

                    <template #title>

                        Neem

                        <span class="heading-accent">
                            contact
                        </span>

                        op.

                    </template>


                    <!-- =====================================
                         CONTACT INFORMATION
                    ====================================== -->

                    <div
                        class="
                            contact-info
                            reveal
                        "
                    >

                        <div class="contact-details">


                            <!-- E-MAIL -->

                            <a
                                href="mailto:jelmer@jelmervandermeer.nl"
                                class="contact-detail"
                            >

                                <span class="contact-detail-icon">

                                    <i class="bi bi-envelope"></i>

                                </span>


                                <div>

                                    <small>
                                        E-MAIL
                                    </small>

                                    <span>
                                        jelmer@jelmervandermeer.nl
                                    </span>

                                </div>

                            </a>


                            <!-- LINKEDIN -->

                            <a
                                href="https://www.linkedin.com/in/jelmer-van-der-meer-18614614b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="contact-detail"
                            >

                                <span class="contact-detail-icon">

                                    <i class="bi bi-linkedin"></i>

                                </span>


                                <div>

                                    <small>
                                        LINKEDIN
                                    </small>

                                    <span>
                                        LinkedIn
                                    </span>

                                </div>

                            </a>


                            <!-- GITHUB -->

                            <a
                                href="https://github.com/JelmervdMeer"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="contact-detail"
                            >

                                <span class="contact-detail-icon">

                                    <i class="bi bi-github"></i>

                                </span>


                                <div>

                                    <small>
                                        GITHUB
                                    </small>

                                    <span>
                                        GitHub
                                    </span>

                                </div>

                            </a>


                        </div>

                    </div>

                </SectionLayout>

            </div>


            <!-- =====================================
                 CONTACT FORM
                 TITLE LEFT
            ====================================== -->

            <div
                class="
                    contact-section-container
                    contact-form-container
                "
            >

                <SectionLayout
                    class="contact-section"
                    variant="split"
                    label="STUUR EEN BERICHT"
                    title="Vertel me over je idee"
                    description="Heb je een project in gedachten? Vul het formulier in en vertel me waar je aan werkt."
                >

                    <template #title>

                        Vertel me over je

                        <span class="heading-accent">
                            idee
                        </span>
                        .

                    </template>


                    <!-- =====================================
                         FORM
                    ====================================== -->

                    <div
                        class="
                            contact-form-wrapper
                            reveal
                        "
                    >

                        <form
                            class="contact-form"
                            @submit.prevent="handleSubmit"
                        >


                            <!-- =================================
                                 SUCCESS
                            ================================== -->

                            <div
                                v-if="submitted"
                                class="contact-success"
                            >

                                <i class="bi bi-check-circle"></i>


                                <div>

                                    <strong>
                                        Bericht verzonden.
                                    </strong>


                                    <p>

                                        Bedankt voor je bericht.
                                        Ik neem zo snel mogelijk
                                        contact met je op.

                                    </p>

                                </div>

                            </div>


                            <!-- =================================
                                 FORM
                            ================================== -->

                            <template v-else>

                                <div class="row g-4">


                                    <!-- NAME -->

                                    <div class="col-md-6">

                                        <label
                                            for="name"
                                            class="form-label"
                                        >

                                            Naam

                                        </label>


                                        <input
                                            id="name"
                                            v-model="name"
                                            type="text"
                                            class="form-control"
                                            placeholder="Je naam"
                                            autocomplete="name"
                                            :disabled="submitting"
                                            required
                                        />

                                    </div>


                                    <!-- EMAIL -->

                                    <div class="col-md-6">

                                        <label
                                            for="email"
                                            class="form-label"
                                        >

                                            E-mail

                                        </label>


                                        <input
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            class="form-control"
                                            placeholder="je@email.nl"
                                            autocomplete="email"
                                            :disabled="submitting"
                                            required
                                        />

                                    </div>


                                    <!-- SUBJECT -->

                                    <div class="col-12">

                                        <label
                                            for="subject"
                                            class="form-label"
                                        >

                                            Onderwerp

                                        </label>


                                        <input
                                            id="subject"
                                            v-model="subject"
                                            type="text"
                                            class="form-control"
                                            placeholder="Waar gaat je bericht over?"
                                            :disabled="submitting"
                                            required
                                        />

                                    </div>


                                    <!-- MESSAGE -->

                                    <div class="col-12">

                                        <label
                                            for="message"
                                            class="form-label"
                                        >

                                            Bericht

                                        </label>


                                        <textarea
                                            id="message"
                                            v-model="message"
                                            class="form-control"
                                            rows="7"
                                            placeholder="Vertel iets over je idee of project..."
                                            :disabled="submitting"
                                            required
                                        ></textarea>

                                    </div>


                                    <!-- ERROR -->

                                    <div
                                        v-if="submitError"
                                        class="col-12"
                                    >

                                        <div
                                            class="contact-error"
                                            role="alert"
                                        >

                                            <i
                                                class="
                                                    bi
                                                    bi-exclamation-circle
                                                "
                                            ></i>


                                            <span>
                                                {{ submitError }}
                                            </span>

                                        </div>

                                    </div>


                                    <!-- SUBMIT -->

                                    <div class="col-12">

                                        <button
                                            type="submit"
                                            class="
                                                btn
                                                btn-primary
                                                btn-lg
                                                contact-submit
                                            "
                                            :disabled="submitting"
                                        >

                                            <template v-if="submitting">

                                                Versturen...

                                                <span
                                                    class="
                                                        spinner-border
                                                        spinner-border-sm
                                                        ms-2
                                                    "
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>

                                            </template>


                                            <template v-else>

                                                Verstuur bericht

                                                <i
                                                    class="
                                                        bi
                                                        bi-arrow-up-right
                                                        ms-2
                                                    "
                                                ></i>

                                            </template>

                                        </button>

                                    </div>


                                </div>

                            </template>


                        </form>

                    </div>

                </SectionLayout>

            </div>


            <!-- =====================================
                 BOTTOM CTA
            ====================================== -->

            <div
                class="
                    contact-section-container
                    contact-cta-container
                "
            >

                &nbsp;

            </div>


        </div>


    </main>

</template>


<style scoped>

/* =========================================
   PAGE
========================================= */

.contact-page {

    position:
        relative;

    width:
        100%;

    min-height:
        100vh;

    overflow-x:
        clip;

    background:
        #08090d;

}


/* =========================================
   CONTACT SECTIONS
========================================= */

.contact-sections {

    position:
        relative;

    display:
        flex;

    flex-direction:
        column;

    gap:
        40px;

    width:
        100%;

    padding:
        40px
        0
        80px;

}


/* =========================================
   SECTION CONTAINER
========================================= */

.contact-section-container {

    position:
        relative;

    width:
        min(
            1400px,
            calc(100% - 40px)
        );

    margin:
        0 auto;

    overflow:
        hidden;

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


/* =========================================
   SECTION LAYOUT
========================================= */

.contact-section-container
:deep(.section-layout) {

    position:
        relative;

    width:
        100%;

    max-width:
        none;

    overflow:
        hidden;

    background:
        transparent;

}


/* =========================================
   SECTION CONTAINER CONTENT
========================================= */

.contact-section-container
:deep(.section-layout > .container) {

    width:
        100%;

    max-width:
        none;

}


/* =========================================
   CONTACT INFO CONTAINER
========================================= */

.contact-info-container {

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
                59,
                130,
                246,
                0.035
            ),

            transparent 35%
        ),

        rgba(
            10,
            9,
            17,
            0.72
        );

}


/* =========================================
   CONTACT INFO GLOW
========================================= */

:deep(.contact-info)::before {

    content:
        "";

    position:
        absolute;

    top:
        -150px;

    left:
        -180px;

    width:
        520px;

    height:
        520px;

    border-radius:
        50%;

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
                139,
                92,
                246,
                0.06
            ) 35%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events:
        none;

    z-index:
        -1;

}


/* =========================================
   CONTACT FORM CONTAINER
========================================= */

.contact-form-container {

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
                139,
                92,
                246,
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


/* =========================================
   FORM GLOW
========================================= */

.contact-form-container::before {

    content:
        "";

    position:
        absolute;

    top:
        -120px;

    right:
        -180px;

    width:
        540px;

    height:
        540px;

    border-radius:
        50%;

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
                0.06
            ) 38%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events:
        none;

}


/* =========================================
   CTA CONTAINER
========================================= */

.contact-cta-container {

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


/* =========================================
   CTA GLOW
========================================= */

.contact-cta-container::before {

    content:
        "";

    position:
        absolute;

    top:
        -150px;

    left:
        35%;

    width:
        560px;

    height:
        560px;

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
                59,
                130,
                246,
                0.07
            ) 35%,

            transparent 72%
        );

    filter:
        blur(30px);

    pointer-events:
        none;

}


/* =========================================
   CONTACT DETAILS
========================================= */

.contact-info {

    position:
        relative;

    isolation:
        isolate;

    width:
        100%;

}


.contact-details {

    display:
        flex;

    flex-direction:
        column;

    gap:
        15px;

}


.contact-detail {

    display:
        flex;

    align-items:
        center;

    gap:
        15px;

    padding:
        15px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

    border-radius:
        10px;

    color:
        #ffffff;

    background:
        rgba(
            17,
            19,
            26,
            0.85
        );

    text-decoration:
        none;

    backdrop-filter:
        blur(10px);

    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background-color 0.25s ease,
        box-shadow 0.25s ease;

}


.contact-detail:hover {

    transform:
        translateX(6px);

    border-color:
        rgba(
            108,
            99,
            255,
            0.5
        );

    background:
        rgba(
            21,
            23,
            34,
            0.95
        );

    color:
        #ffffff;

    box-shadow:
        0 10px 30px
        rgba(
            0,
            0,
            0,
            0.2
        );

}


.contact-detail-icon {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    width:
        45px;

    height:
        45px;

    flex:
        0 0 45px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.1
        );

    border-radius:
        50%;

    color:
        #8b5cf6;

    background:
        rgba(
            139,
            92,
            246,
            0.08
        );

    font-size:
        1.1rem;

}


.contact-detail div {

    display:
        flex;

    flex-direction:
        column;

    gap:
        3px;

}


.contact-detail small {

    color:
        #6f7484;

    font-size:
        0.65rem;

    font-weight:
        700;

    letter-spacing:
        2px;

}


.contact-detail span {

    font-size:
        0.95rem;

}


/* =========================================
   CONTACT FORM
========================================= */

.contact-form-wrapper {

    width:
        100%;

}


.contact-form {

    width:
        100%;

    padding:
        40px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

    border-radius:
        14px;

    background:
        #11131a;

    box-shadow:
        0 25px 60px
        rgba(
            0,
            0,
            0,
            0.18
        );

}


.contact-form .form-label {

    margin-bottom:
        10px;

    color:
        #ffffff;

    font-size:
        0.85rem;

    font-weight:
        600;

}


.contact-form .form-control {

    padding:
        14px 16px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.1
        );

    border-radius:
        8px;

    color:
        #ffffff;

    background:
        #08090d;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background-color 0.2s ease,
        opacity 0.2s ease;

}


.contact-form .form-control::placeholder {

    color:
        #5f6472;

}


.contact-form .form-control:focus {

    border-color:
        #6c63ff;

    color:
        #ffffff;

    background:
        #08090d;

    box-shadow:
        0 0 0 3px
        rgba(
            108,
            99,
            255,
            0.12
        );

}


.contact-form .form-control:disabled {

    opacity:
        0.6;

    cursor:
        not-allowed;

}


.contact-form textarea.form-control {

    resize:
        vertical;

    min-height:
        180px;

}


/* =========================================
   ERROR
========================================= */

.contact-error {

    display:
        flex;

    align-items:
        center;

    gap:
        12px;

    padding:
        16px 18px;

    border:
        1px solid
        rgba(
            239,
            68,
            68,
            0.35
        );

    border-radius:
        10px;

    color:
        #fecaca;

    background:
        rgba(
            239,
            68,
            68,
            0.08
        );

    font-size:
        0.9rem;

    line-height:
        1.5;

}


.contact-error i {

    flex-shrink:
        0;

    color:
        #f87171;

    font-size:
        1.2rem;

}


/* =========================================
   SUBMIT
========================================= */

.contact-submit {

    margin-top:
        10px;

    min-width:
        190px;

    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        opacity 0.25s ease;

}


.contact-submit:hover:not(:disabled) {

    transform:
        translateY(-3px);

    box-shadow:
        0 12px 30px
        rgba(
            139,
            92,
            246,
            0.3
        );

}


.contact-submit:disabled {

    opacity:
        0.65;

    cursor:
        not-allowed;

    transform:
        none;

}


/* =========================================
   SUCCESS
========================================= */

.contact-success {

    display:
        flex;

    align-items:
        flex-start;

    gap:
        20px;

    padding:
        25px;

    border:
        1px solid
        rgba(
            108,
            99,
            255,
            0.35
        );

    border-radius:
        10px;

    background:
        rgba(
            108,
            99,
            255,
            0.08
        );

    color:
        #ffffff;

}


.contact-success > i {

    color:
        #6c63ff;

    font-size:
        1.5rem;

}


.contact-success strong {

    display:
        block;

    margin-bottom:
        8px;

}


.contact-success p {

    margin:
        0;

    color:
        #a8adbd;

    line-height:
        1.6;

}


/* =========================================
   CTA
========================================= */

.contact-cta {

    display:
        flex;

    flex-direction:
        column;

    align-items:
        flex-start;

    gap:
        25px;

    width:
        100%;

    max-width:
        480px;

}


.contact-cta-icon {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    width:
        70px;

    height:
        70px;

    border:
        1px solid
        rgba(
            139,
            92,
            246,
            0.35
        );

    border-radius:
        50%;

    color:
        #a78bfa;

    background:
        rgba(
            139,
            92,
            246,
            0.08
        );

    box-shadow:
        0 0 35px
        rgba(
            139,
            92,
            246,
            0.12
        );

    font-size:
        1.5rem;

}


.contact-cta p {

    margin:
        0;

    color:
        #a8adbd;

    font-size:
        1.05rem;

    line-height:
        1.8;

}


/* =========================================
   REVEAL
========================================= */

.reveal {

    opacity:
        0;

    transform:
        translateY(50px);

    transition:
        opacity 700ms ease,
        transform 700ms
        cubic-bezier(
            .2,
            .8,
            .2,
            1
        );

}


.reveal.is-visible {

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
   REDUCED MOTION
========================================= */

@media (prefers-reduced-motion: reduce) {

    .reveal {

        opacity:
            1;

        transform:
            none;

        transition:
            none;

    }

}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 991px) {

    .contact-sections {

        gap:
            28px;

        padding:
            28px
            0
            60px;

    }


    .contact-section-container {

        width:
            calc(100% - 28px);

        border-radius:
            24px;

    }

}


@media (max-width: 768px) {

    .contact-sections {

        gap:
            24px;

        padding:
            24px
            0
            50px;

    }


    .contact-section-container {

        width:
            calc(100% - 20px);

        border-radius:
            22px;

    }


    .contact-form {

        padding:
            25px;

    }


    .contact-detail {

        padding:
            13px;

    }


    .contact-cta {

        max-width:
            100%;

    }

}


@media (max-width: 576px) {

    .contact-sections {

        gap:
            18px;

        padding:
            18px
            0
            40px;

    }


    .contact-section-container {

        width:
            calc(100% - 12px);

        border-radius:
            18px;

    }


    .contact-form {

        padding:
            20px;

    }


    .contact-detail-icon {

        width:
            40px;

        height:
            40px;

        flex-basis:
            40px;

    }


    .contact-success {

        padding:
            20px;

    }


    .contact-error {

        padding:
            14px;

    }


    .contact-submit {

        width:
            100%;

    }

}

</style>