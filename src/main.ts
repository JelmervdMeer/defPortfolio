import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './style.css';

import '@fontsource-variable/space-grotesk/wght.css';
import '@fontsource-variable/dm-sans/wght.css';


createApp(App)
    .use(router)
    .mount('#app');
