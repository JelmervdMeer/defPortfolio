import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';

const router = createRouter({

    history: createWebHistory(),

    routes: [

        {
            path: '/',
            name: 'home',
            component: HomeView
        },

        {
            path: '/projects',
            name: 'projects',
            component: ProjectsView
        },

        {
            path: '/projects/:slug',
            name: 'project-detail',
            component: ProjectDetailView
        },

        {
            path: '/about',
            name: 'about',
            component: AboutView
        },

        {
            path: '/contact',
            name: 'contact',
            component: ContactView
        }

    ]

});

export default router;


