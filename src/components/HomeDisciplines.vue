<script setup lang="ts">

import SectionLayout from './SectionLayout.vue';


</script>

<template>
    <div class="home-section-container disciplines-container">
        <SectionLayout
            class="home-disciplines"
            variant="split"
            label="MIJN WERKWIJZE"
            title="Vijf disciplines, één manier van werken"
            description="Verschillende disciplines komen samen in één manier van werken. Door techniek, creativiteit, communicatie, vernieuwing en een doelgerichte aanpak te combineren, ontstaan digitale oplossingen die zowel doordacht als bruikbaar zijn."
        >
            <template #title>
                Vijf
                <span class="heading-accent">disciplines</span>
                een werkwijze.
            </template>

            <div class="section-reveal reveal">
                

                <div class="discipline-mobile">
                    <div class="mobile-discipline-list">
                        <div>01 VERNIEUWING / Blijven ontdekken</div>
                        <div>02 TECHNISCH / Architectuur & structuur</div>
                        <div>03 PRAKTISCH / Van idee naar resultaat</div>
                        <div>04 CREATIEF / Denken buiten de standaard</div>
                        <div>05 COMMUNICATIE / Techniek begrijpelijk maken</div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    </div>
</template>

<style scoped>



   

     /* =================================
       MOBILE DISCIPLINE TIMELINE
    ================================= */

    .discipline-desktop {
        display: none;
    }


    .discipline-mobile {
        display: block;
    }


    .mobile-discipline-list {
        max-width: 100%;

        padding: 5px 0;
    }


    .mobile-discipline-list::before {
        left: 23px;
    }


    .mobile-discipline {
        min-height: 95px;
    }


    .mobile-discipline-marker {
        flex-basis: 48px;

        width: 48px;
        height: 48px;
    }


    .mobile-discipline-marker span {
        font-size: 0.6rem;
    }


    .mobile-discipline-content {
        gap: 12px;

        margin-left: 15px;

        padding: 14px;

        border-radius: 14px;
    }


    .mobile-discipline-icon {
        flex-basis: 40px;

        width: 40px;
        height: 40px;

        font-size: 1rem;
    }


    .mobile-discipline-content h3 {
        font-size: 0.72rem;
    }


    .mobile-discipline-content span {
        font-size: 0.62rem;
    }





</style>