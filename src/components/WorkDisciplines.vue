<script setup lang="ts">

// =====================================
// DISCIPLINES
// =====================================

interface Discipline {
    number: string;
    title: string;
    description: string;
    icon: string;
}

const disciplines: Discipline[] = [
    {
        number: '01',
        title: 'VERNIEUWING',
        description: 'Blijven ontdekken',
        icon: 'bi-book'
    },
    {
        number: '02',
        title: 'TECHNISCH',
        description: 'Architectuur & structuur',
        icon: 'bi-code-slash'
    },
    {
        number: '03',
        title: 'PRAKTISCH',
        description: 'Van idee naar resultaat',
        icon: 'bi-gear'
    },
    {
        number: '04',
        title: 'CREATIEF',
        description: 'Denken buiten de standaard',
        icon: 'bi-brush'
    },
    {
        number: '05',
        title: 'COMMUNICATIE',
        description: 'Techniek begrijpelijk maken',
        icon: 'bi-chat-square-text'
    }
];

</script>

<template>

    <div class="discipline-list">

        <div
            v-for="discipline in disciplines"
            :key="discipline.number"
            class="discipline-item"
        >

            <!-- NUMBER -->

            <div class="discipline-marker">
                {{ discipline.number }}
            </div>

            <!-- CONTENT -->

            <div class="discipline-content">

                <div class="discipline-icon">
                    <i :class="`bi ${discipline.icon}`"></i>
                </div>

                <div>
                    <h3>{{ discipline.title }}</h3>
                    <span>{{ discipline.description }}</span>
                </div>

            </div>

        </div>

    </div>

</template>

<style scoped>

/* =====================================
   DISCIPLINE LIST
   ===================================== */

.discipline-list {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
}


/* =====================================
   DISCIPLINE ITEM
   ===================================== */

.discipline-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 22px 0;

    border-bottom: 1px solid rgba(255, 255, 255, 0.07);

    transition:
        transform 250ms ease,
        border-color 250ms ease;
}

.discipline-item:first-child {
    padding-top: 0;
}

.discipline-item:last-child {
    padding-bottom: 0;
    border-bottom: none;
}

.discipline-item:hover {
    transform: translateX(6px);
    border-color: rgba(139, 92, 246, 0.25);
}


/* =====================================
   NUMBER
   ===================================== */

.discipline-marker {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    width: 42px;
    height: 42px;

    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 50%;

    background: rgba(139, 92, 246, 0.06);

    color: var(--color-primary-light);

    font-family: var(--font-heading);
    font-size: 0.72rem;
    font-weight: 600;

    transition:
        background-color 250ms ease,
        border-color 250ms ease,
        transform 250ms ease;
}

.discipline-item:hover .discipline-marker {
    transform: scale(1.08);

    border-color: rgba(139, 92, 246, 0.55);
    background: rgba(139, 92, 246, 0.12);
}


/* =====================================
   CONTENT
   ===================================== */

.discipline-content {
    display: flex;
    align-items: center;
    gap: 16px;

    min-width: 0;
}


/* =====================================
   ICON
   ===================================== */

.discipline-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    width: 42px;
    height: 42px;

    border-radius: 12px;

    background: rgba(255, 255, 255, 0.035);

    color: var(--color-secondary);

    font-size: 1.05rem;

    transition:
        background-color 250ms ease,
        transform 250ms ease;
}

.discipline-item:hover .discipline-icon {
    transform: translateY(-2px);

    background: rgba(34, 211, 238, 0.08);
}


/* =====================================
   TEXT
   ===================================== */

.discipline-content h3 {
    margin: 0 0 4px;

    color: var(--color-text);

    font-family: var(--font-heading);
    font-size: 0.92rem;
    font-weight: 600;

    letter-spacing: 0.08em;
}

.discipline-content span {
    display: block;

    color: var(--color-text-muted);

    font-family: var(--font-body);
    font-size: 0.88rem;
}


/* =====================================
   MOBILE
   ===================================== */

@media (max-width: 576px) {

    .discipline-item {
        gap: 14px;
        padding: 18px 0;
    }

    .discipline-marker,
    .discipline-icon {
        width: 38px;
        height: 38px;
    }

    .discipline-content {
        gap: 12px;
    }

    .discipline-content h3 {
        font-size: 0.82rem;
    }

    .discipline-content span {
        font-size: 0.78rem;
    }

}

</style>