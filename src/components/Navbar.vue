```vue
<script setup lang="ts">

import { ref } from 'vue';


// =========================================
// NAVIGATION STATE
// =========================================

const menuOpen = ref(false);


// =========================================
// CLOSE MENU
// =========================================

function closeMenu() {

    menuOpen.value = false;

}


// =========================================
// TOGGLE MENU
// =========================================

function toggleMenu() {

    menuOpen.value = !menuOpen.value;

}

</script>


<template>

    <nav class="portfolio-navbar">

        <div class="portfolio-nav-container">


            <!-- =====================================
                 LOGO
            ====================================== -->

            <RouterLink
                to="/"
                class="portfolio-nav-logo"
                @click="closeMenu"
            >

                JELMER<span>.</span>

            </RouterLink>


            <!-- =====================================
                 MOBILE MENU BUTTON
            ====================================== -->

            <button
                type="button"
                class="portfolio-nav-toggle"
                :class="{ 'is-open': menuOpen }"
                :aria-expanded="menuOpen"
                aria-controls="portfolioNavigation"
                aria-label="Menu openen"
                @click="toggleMenu"
            >

                <span></span>
                <span></span>
                <span></span>

            </button>


            <!-- =====================================
                 NAVIGATION
            ====================================== -->

            <div
                id="portfolioNavigation"
                class="portfolio-nav-menu"
                :class="{ 'is-open': menuOpen }"
            >

                <ul class="portfolio-nav-list">


                    <!-- HOME -->

                    <li class="portfolio-nav-item">

                        <RouterLink
                            to="/"
                            class="portfolio-nav-link"
                            @click="closeMenu"
                        >
                            Home
                        </RouterLink>

                    </li>


                    <!-- PROJECTS -->

                    <li class="portfolio-nav-item">

                        <RouterLink
                            to="/projects"
                            class="portfolio-nav-link"
                            @click="closeMenu"
                        >
                            Projects
                        </RouterLink>

                    </li>


                    <!-- ABOUT -->

                    <li class="portfolio-nav-item">

                        <RouterLink
                            to="/about"
                            class="portfolio-nav-link"
                            @click="closeMenu"
                        >
                            About
                        </RouterLink>

                    </li>


                    <!-- CONTACT -->

                    <li class="portfolio-nav-item portfolio-nav-contact-item">

                        <RouterLink
                            to="/contact"
                            class="portfolio-nav-contact"
                            @click="closeMenu"
                        >

                            <span class="work">
                                Let's work together
                            </span>

                            <i class="bi bi-arrow-up-right"></i>

                        </RouterLink>

                    </li>

                </ul>

            </div>

        </div>

    </nav>

</template>


<style scoped>

/* =========================================
   NAVBAR
========================================= */

.work { color: #ffffff !important; } /* Active contact page */ .portfolio-nav-contact.router-link-active .work { color: #a855f7 !important; }

.lets-work:hover {
  color: #c084fc !important;
}

.portfolio-navbar {

    position: fixed;

    top: 0;
    left: 0;
    right: 0;

    z-index: 1000;

    width: 100%;

    background:
        rgba(8, 9, 13, 0.85);

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.08);

    backdrop-filter:
        blur(15px);

}


/* =========================================
   NAVBAR CONTAINER
========================================= */

.portfolio-nav-container {

    display: flex;

    align-items: center;

    justify-content: space-between;

    width: 100%;

    max-width: 1320px;

    min-height: 80px;

    margin: 0 auto;

    padding:
        0 24px;

}


/* =========================================
   LOGO
========================================= */

.portfolio-nav-logo {

    display: inline-block;

    color: #ffffff !important;

    font-size: 1.1rem;

    font-weight: 700;

    letter-spacing: 3px;

    text-decoration: none !important;

    transition:
        color 0.25s ease,
        transform 0.3s ease;

}


.portfolio-nav-logo:hover {

    color: #ffffff !important;

    transform:
        translateX(5px)
        scale(1.03);

}


.portfolio-nav-logo span {

    color: #6c63ff;

}


/* =========================================
   NAVIGATION MENU
========================================= */

.portfolio-nav-menu {

    display: flex;

    align-items: center;

}


.portfolio-nav-list {

    display: flex;

    align-items: center;

    gap: 35px;

    margin: 0;

    padding: 0;

    list-style: none;

}


.portfolio-nav-item {

    margin: 0;

    padding: 0;

}


/* =========================================
   NAVIGATION LINKS
========================================= */

.portfolio-nav-link {

    display: inline-block;

    margin: 0;

    padding: 20px 0;

    color: #ffffff !important;

    font-size: 0.9rem;

    font-weight: 500;

    text-decoration: none !important;

    transition:
        color 0.2s ease,
        transform 0.25s ease;

}


.portfolio-nav-link:visited {

    color: #ffffff !important;

}


.portfolio-nav-link:hover {

    color: #ffffff !important;

    transform:
        translateY(-2px);

}


.portfolio-nav-link.router-link-active {

    color: #6c63ff !important;

    font-weight: 600;

}


/* =========================================
   CONTACT BUTTON
========================================= */

.portfolio-nav-contact {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding:
        10px 17px;

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    border-radius: 30px;

    color: #ffffff !important;

    font-size: 0.85rem;

    font-weight: 500;

    text-decoration: none !important;

    transition:
        background 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease;

}


.portfolio-nav-contact:visited {

    color: #ffffff !important;

}


.portfolio-nav-contact:hover {

    border-color:
        #6c63ff;

    background:
        rgba(108, 99, 255, 0.12);

    color: #ffffff !important;

    transform:
        translateY(-1px);

}


.portfolio-nav-contact i {

    color: #ffffff !important;

    font-size: 0.8rem;

}


/* =========================================
   MOBILE BUTTON
========================================= */

.portfolio-nav-toggle {

    display: none;

    align-items: center;

    justify-content: center;

    flex-direction: column;

    gap: 5px;

    width: 42px;

    height: 42px;

    padding: 8px;

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    border-radius: 8px;

    background:
        rgba(255, 255, 255, 0.03);

    cursor: pointer;

    transition:
        background 0.2s ease,
        border-color 0.2s ease;

}


.portfolio-nav-toggle:hover {

    border-color:
        rgba(108, 99, 255, 0.6);

    background:
        rgba(108, 99, 255, 0.12);

}


.portfolio-nav-toggle:focus {

    outline: none;

    box-shadow:
        0 0 0 3px
        rgba(108, 99, 255, 0.2);

}


.portfolio-nav-toggle span {

    display: block;

    width: 24px;

    height: 2px;

    background:
        #ffffff;

    transition:
        transform 0.25s ease,
        opacity 0.25s ease;

}


/* =========================================
   MOBILE BUTTON ANIMATION
========================================= */

.portfolio-nav-toggle.is-open span:nth-child(1) {

    transform:
        translateY(7px)
        rotate(45deg);

}


.portfolio-nav-toggle.is-open span:nth-child(2) {

    opacity: 0;

}


.portfolio-nav-toggle.is-open span:nth-child(3) {

    transform:
        translateY(-7px)
        rotate(-45deg);

}


/* =========================================
   TABLET
========================================= */

@media (max-width: 991px) {

    .portfolio-nav-container {

        min-height: 75px;

    }


    .portfolio-nav-toggle {

        display: flex;

    }


    .portfolio-nav-menu {

        display: none;

        position: absolute;

        top: 75px;

        left: 0;
        right: 0;

        width: 100%;

        padding:
            15px 24px 25px;

        background:
            rgba(8, 9, 13, 0.97);

        border-bottom:
            1px solid
            rgba(255, 255, 255, 0.08);

        backdrop-filter:
            blur(15px);

    }


    .portfolio-nav-menu.is-open {

        display: block;

    }


    .portfolio-nav-list {

        flex-direction: column;

        align-items: stretch;

        gap: 5px;

        width: 100%;

    }


    .portfolio-nav-item {

        width: 100%;

    }


    .portfolio-nav-link {

        display: block;

        width: 100%;

        margin: 0;

        padding:
            12px 5px;

    }


    .portfolio-nav-contact-item {

        margin-top: 10px;

    }


    .portfolio-nav-contact {

        display: inline-flex;

    }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 576px) {

    .portfolio-nav-container {

        min-height: 70px;

        padding:
            0 20px;

    }


    .portfolio-nav-menu {

        top: 70px;

        padding:
            10px 20px 20px;

    }


    .portfolio-nav-logo {

        font-size: 1rem;

        letter-spacing: 2px;

    }

}

</style>
```




