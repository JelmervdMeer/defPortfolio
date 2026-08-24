<script setup lang="ts">
import type { Project } from '../data/projects';

defineProps<{
    project: Project;
}>();
</script>

<template>
    <article class="project-card">

        <RouterLink
            :to="`/projects/${project.slug}`"
            class="project-card-link"
        >

            <div class="project-image">

                <img
                    :src="project.image"
                    :alt="project.title"
                />

                <div class="project-overlay">
                    <span>
                        Bekijk project
                        <i class="bi bi-arrow-up-right"></i>
                    </span>
                </div>

            </div>

            <div class="project-content">

                <div class="project-category">
                    {{ project.category }}
                </div>

                <h3>
                    {{ project.title }}
                </h3>

                <p>
                    {{ project.shortDescription }}
                </p>

                <div class="technology-list">

                    <span
                        v-for="technology in project.technologies"
                        :key="technology"
                        class="technology"
                    >
                        {{ technology }}
                    </span>

                </div>

            </div>

        </RouterLink>

    </article>
</template>