```vue
<script setup lang="ts">

import { ref } from 'vue';

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const submitted = ref(false);

const handleSubmit = () => {
    submitted.value = true;
};

</script>


<template>

    <main class="page-section contact-page">

        <div class="container">

            <!-- =====================================
                 INTRO
            ====================================== -->

            <section class="contact-intro">

                <div class="section-label">
                    CONTACT
                </div>

                <h1>
                    Laten we iets
                    <span class="animated-gradient-text">
                        bouwen.
                    </span>
                </h1>

                <p class="large-text contact-intro-text">
                    Heb je een idee voor een website, applicatie,
                    interactieve ervaring of ander digitaal project?
                    Neem gerust contact met me op.
                </p>

            </section>


            <!-- =====================================
                 CONTACT CONTENT
            ====================================== -->

            <section class="contact-content">

                <div class="row g-5">

                    <!-- =================================
                         CONTACT INFO
                    ================================== -->

                    <div class="col-lg-4">

                        <div class="section-label">
                            CONTACTGEGEVENS
                        </div>

                        <h2>
                            Neem contact op
                        </h2>

                        <p class="contact-info-text">
                            Ik sta open voor freelance opdrachten,
                            samenwerkingen en interessante projecten.
                        </p>


                        <div class="contact-details">

                            <!-- E-MAIL -->

                            <a
                                href="mailto:jou@email.nl"
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
                                        jou@email.nl
                                    </span>

                                </div>

                            </a>


                            <!-- LINKEDIN -->

                            <a
                                href="#"
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
                                href="#"
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


                    <!-- =================================
                         CONTACT FORM
                    ================================== -->

                    <div class="col-lg-8">

                        <form
                            class="contact-form"
                            @submit.prevent="handleSubmit"
                        >

                            <!-- SUCCESS -->

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


                            <!-- FORM -->

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
                                            required
                                        ></textarea>

                                    </div>


                                    <!-- SUBMIT -->

                                    <div class="col-12">

                                        <button
                                            type="submit"
                                            class="btn btn-primary btn-lg contact-submit"
                                        >
                                            Verstuur bericht

                                            <i
                                                class="bi bi-arrow-up-right ms-2"
                                            ></i>

                                        </button>

                                    </div>

                                </div>

                            </template>

                        </form>

                    </div>

                </div>

            </section>


            <!-- =====================================
                 BOTTOM CTA
            ====================================== -->

            <section class="contact-bottom">

                <div class="section-label">
                    SAMENWERKEN
                </div>

                <h2>
                    Een idee in je hoofd?
                </h2>

                <p>
                    Laten we kijken wat we ervan kunnen maken.
                </p>

            </section>

        </div>

    </main>

</template>


<style scoped>

/* =====================================
   CONTACT INTRO
===================================== */

.contact-intro {
    max-width: 1000px;

    margin-bottom: 120px;
}


.contact-intro h1 {
    max-width: 900px;

    margin-bottom: 35px;

    font-size: clamp(
        3.5rem,
        8vw,
        8rem
    );

    line-height: 0.9;

    letter-spacing: -5px;
}


.contact-intro-text {
    max-width: 750px;
}


/* =====================================
   ANIMATED GRADIENT
===================================== */

.animated-gradient-text {
    display: inline-block;

    background-image:
        linear-gradient(
            90deg,
            #6c63ff 0%,
            #9b5cff 20%,
            #00d4ff 40%,
            #c084fc 60%,
            #6c63ff 80%,
            #9b5cff 100%
        );

    background-size: 200% 100%;

    background-position: 0% 50%;

    background-repeat: no-repeat;

    background-clip: text;

    -webkit-background-clip: text;

    color: transparent;

    -webkit-text-fill-color: transparent;

    animation:
        gradientMove
        6s
        ease-in-out
        infinite;

    will-change: background-position;
}


/* =====================================
   CONTACT CONTENT
===================================== */

.contact-content {
    padding-bottom: 120px;
}


.contact-content h2 {
    margin-bottom: 20px;

    font-size:
        clamp(
            2rem,
            4vw,
            3.5rem
        );

    letter-spacing: -2px;
}


.contact-info-text {
    max-width: 400px;

    margin-bottom: 40px;

    color: #a8adbd;

    line-height: 1.8;
}


/* =====================================
   CONTACT DETAILS
===================================== */

.contact-details {
    display: flex;

    flex-direction: column;

    gap: 15px;
}


.contact-detail {
    display: flex;

    align-items: center;

    gap: 15px;

    padding: 15px;

    border:
        1px solid
        rgba(255, 255, 255, 0.08);

    border-radius: 10px;

    color: #ffffff;

    background: #11131a;

    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease;
}


.contact-detail:hover {
    transform:
        translateX(6px);

    border-color:
        rgba(108, 99, 255, 0.5);

    background: #151722;

    color: #ffffff;
}


.contact-detail-icon {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 45px;
    height: 45px;

    flex: 0 0 45px;

    border:
        1px solid
        rgba(255, 255, 255, 0.1);

    border-radius: 50%;

    color: #6c63ff;

    background:
        rgba(108, 99, 255, 0.08);

    font-size: 1.1rem;
}


.contact-detail div {
    display: flex;

    flex-direction: column;

    gap: 3px;
}


.contact-detail small {
    color: #6f7484;

    font-size: 0.65rem;

    font-weight: 700;

    letter-spacing: 2px;
}


.contact-detail span {
    font-size: 0.95rem;
}


/* =====================================
   CONTACT FORM
===================================== */

.contact-form {
    padding: 40px;

    border:
        1px solid
        rgba(255, 255, 255, 0.08);

    border-radius: 14px;

    background: #11131a;
}


.contact-form .form-label {
    margin-bottom: 10px;

    color: #ffffff;

    font-size: 0.85rem;

    font-weight: 600;
}


.contact-form .form-control {
    padding: 14px 16px;

    border:
        1px solid
        rgba(255, 255, 255, 0.1);

    border-radius: 8px;

    color: #ffffff;

    background: #08090d;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background 0.2s ease;
}


.contact-form .form-control::placeholder {
    color: #5f6472;
}


.contact-form .form-control:focus {
    border-color: #6c63ff;

    color: #ffffff;

    background: #08090d;

    box-shadow:
        0 0 0 3px
        rgba(108, 99, 255, 0.12);
}


.contact-form textarea.form-control {
    resize: vertical;

    min-height: 180px;
}


.contact-submit {
    margin-top: 10px;
}


/* =====================================
   SUCCESS MESSAGE
===================================== */

.contact-success {
    display: flex;

    align-items: flex-start;

    gap: 20px;

    padding: 25px;

    border:
        1px solid
        rgba(108, 99, 255, 0.35);

    border-radius: 10px;

    background:
        rgba(108, 99, 255, 0.08);

    color: #ffffff;
}


.contact-success > i {
    color: #6c63ff;

    font-size: 1.5rem;
}


.contact-success strong {
    display: block;

    margin-bottom: 8px;
}


.contact-success p {
    margin: 0;

    color: #a8adbd;

    line-height: 1.6;
}


/* =====================================
   BOTTOM CTA
===================================== */

.contact-bottom {
    padding: 100px 0;

    border-top:
        1px solid
        rgba(255, 255, 255, 0.08);

    text-align: center;
}


.contact-bottom h2 {
    margin-bottom: 20px;

    font-size:
        clamp(
            2.5rem,
            5vw,
            5rem
        );

    letter-spacing: -3px;
}


.contact-bottom p {
    margin: 0 auto;

    color: #a8adbd;

    font-size: 1.1rem;
}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 768px) {

    .contact-intro {
        margin-bottom: 80px;
    }


    .contact-intro h1 {
        letter-spacing: -3px;
    }


    .contact-content {
        padding-bottom: 80px;
    }


    .contact-form {
        padding: 25px;
    }


    .contact-bottom {
        padding: 70px 0;
    }

}

</style>
```


