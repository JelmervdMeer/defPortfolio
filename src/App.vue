```vue
<script setup lang="ts">

import { RouterView } from 'vue-router';

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from "@vercel/speed-insights/vue"

</script>


<template>

    <div id="app">

        <!-- =====================================
             NAVIGATION
        ====================================== -->

        <Navbar />


        <!-- =====================================
             PAGE CONTENT
        ====================================== -->

        <main>

            <RouterView />

        </main>


        <!-- =====================================
             FOOTER
        ====================================== -->

        <Footer />

        <!-- =====================================
             VERCEL WEB ANALYTICS
        ====================================== -->

        <Analytics />
        <SpeedInsights/>

    </div>

</template>


<style scoped>

#app {
    min-height: 100vh;

    display: flex;

    flex-direction: column;
}


main {
    flex: 1;
}

</style>
```
