export interface Project {
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    technologies: string[];
    image: string;
    images?: string[];
    role?: string[];
    features?: string[];
    challenges?: string;
    solution?: string;
    github?: string;
    demo?: string;
    video?: string;
}

export const projects: Project[] = [
    {
        slug: '3d-drum-machine',

        title: '3D Drum Machine',

        shortDescription:
            'Een interactieve 3D drummachine gebouwd met Three.js en TypeScript.',

        description:
            'Een interactieve 3D drummachine waarin 3D-modellen, gebruikersinteractie, een sequencer en verschillende audiouncties samenkomen. Het project combineert Three.js, TypeScript, Blender en de Web Audio API.',

        category: '3D / Interactive',

        technologies: [
            'TypeScript',
            'Three.js',
            'Web Audio API',
            'Blender',
            'Vite'
        ],

        image: '/images/drummachine/preview.png',

        images: [
            '/images/drummachine/01.png',
            '/images/drummachine/02.png',
            '/images/drummachine/03.png',
            '/images/drummachine/04.png',
            '/images/drummachine/05.png'
        ],

        video:'/videos/dmmovie3.mp4',

        role: [
            'Concept en ontwikkeling',
            '3D modelling',
            'Frontend development',
            'Audio-engine',
            'Sequencer',
            'Software architecture'
        ],

        features: [
            'Interactieve 3D drum pads',
            '16-step sequencer',
            'Tempo control',
            'Web Audio API',
            '3D interface',
            'Object-oriented TypeScript architectuur',
            'Blender 3D modellen',
            'Audiowaveform visualisatie',
            'Opnemen van gemaakte beats en exporteren als .wav-bestand',
            'Eigen stem toevoegen en bewerken met effecten',
            'Realtime audio-effecten zoals reverb, delay en distortion',
            'De mogelijkheid om patterns op te slaan en te laden',
            'Samples toevoegen en beheren via een sample library'
        ],

        challenges:
            'Een belangrijk onderdeel van het project was het combineren van een interactieve 3D-interface met een realtime audiosysteem. De gebruikersinteractie met de 3D-objecten moest direct gekoppeld worden aan de sequencer en audio. Daarnaast was het een uitdaging om de timing van de sequencer nauwkeurig en betrouwbaar te laten verlopen.',

        solution:
            'De applicatie is opgesplitst in verschillende verantwoordelijkheden. Onder andere de DrumMachine, DrumGrid, Pad, AudioEngine, ModelLoader en SceneManager hebben ieder hun eigen taak. Hierdoor blijven de 3D-rendering, gebruikersinteractie en audiologica van elkaar gescheiden.',

        github: '',

        demo: ''
    },

    {
        slug: 'klantenhulpportaal',

        title: 'Klantenhulpportaal',

        shortDescription:
            'Een full-stack klantenserviceplatform met tickets, gebruikers en authenticatie.',

        description:
            'Een full-stack klantenhulpportaal waarmee gebruikers tickets kunnen aanmaken en beheren. Het systeem bevat authenticatie, gebruikersrollen, categorieën, reacties, interne notities en ticketbeheer.',

        category: 'Full-stack',

        technologies: [
            'Vue 3',
            'TypeScript',
            'Pinia',
            'Laravel',
            'MySQL',
            'Sanctum',
            'Bootstrap'
        ],

        image: '/images/klantenhulpportaal/preview.png',

        images: [
            '/images/klantenhulpportaal/01.png',
            '/images/klantenhulpportaal/02.png',
            '/images/klantenhulpportaal/03.png',
            '/images/klantenhulpportaal/04.png',
            '/images/klantenhulpportaal/05.png',
            '/images/klantenhulpportaal/06.png'
        ],

        role: [
            'Full-stack development',
            'Frontend development',
            'Backend development',
            'Database ontwerp',
            'Authenticatie',
            'API development',
            'UI/UX implementatie'
        ],

        features: [
            'Gebruikersregistratie en login',
            'Authenticatie met Laravel Sanctum',
            'Rollen voor gebruikers en administrators',
            'Tickets aanmaken en beheren',
            'Ticketstatussen en prioriteiten',
            'Tickets categoriseren',
            'Tickets toewijzen aan gebruikers',
            'Reacties plaatsen op tickets',
            'Interne notities',
            'Beveiligde API-endpoints',
            'Vue 3 frontend met TypeScript',
            'Pinia state management',
            'MySQL database'
        ],

        challenges:
            'Een belangrijke uitdaging was het bouwen van een duidelijke verbinding tussen de Vue frontend en de Laravel backend. Daarnaast moest rekening worden gehouden met authenticatie, gebruikersrollen en toegangsrechten. Een administrator moet bijvoorbeeld alle tickets kunnen bekijken, terwijl een normale gebruiker alleen zijn eigen tickets mag zien.',

        solution:
            'De applicatie is opgebouwd als een gescheiden frontend en backend. Laravel verzorgt de API, authenticatie, database en autorisatie. Vue 3 verzorgt de gebruikersinterface en gebruikt Pinia voor centrale state management. Door deze verantwoordelijkheden te scheiden blijft de applicatie overzichtelijk, onderhoudtbaar en uitbreidbaar.',

        github: '',

        demo: ''
    },

    {
        slug: 'Koudum the Game',

        title: 'Koudum the Game',

        shortDescription:
            'Een digitaal bordspel gebaseerd op het dorp Koudum.',

        description:
            'Een digitaal bordspel gebaseerd op het dorp waar ik woon: Koudum. Het dorp is volledig in 3D nagebouwd en vormt de basis voor een interactief bordspel. Het project combineert 3D-rendering, game-logica, een tilemap en gebruikersinteractie.. Het weer in degame is hetzelfde als het weer in de echte wereld dorr te verbinden met een weerAPI. Er zijn verschillende minigames aanwezig',

        category: 'Game / Interactive',

        technologies: [
            'JavaScript',
            'Three.js',
            'Game Development',
            'Blender',
            'Vite'
        ],

        image: '/images/boardgame/preview.png',

        images: [
            '/images/boardgame/01.png',
            '/images/boardgame/02.png',
            '/images/boardgame/03.png',
            '/images/boardgame/04.png',
            '/images/boardgame/05.png',
            '/images/boardgame/07.png',
            '/images/boardgame/08.png',
            '/images/boardgame/09.png',
            '/images/boardgame/10.png',

        ],

        role: [
            'Concept en game design',
            '3D modelling',
            '3D-omgeving bouwen',
            'Frontend development',
            'Game-logica',
            'Tilemap-systeem',
            'Gebruikersinteractie'
        ],

        features: [
            'Volledig 3D nagebouwde omgeving',
            'Interactieve spelwereld',
            'Tilemap gebaseerd op het 3D-bord',
            'Interactieve speelvelden',
            'Game-logica',
            'Spelers kunnen over het bord bewegen',
            'Verschillende soorten speelvelden',
            'Interactieve objecten',
            'Three.js 3D-rendering',
            'Blender 3D-modellen',
            'Dynamische camera en navigatie',
            'Verschillende minigames en uitdagingen binnen het spel',
            'Realtime weer en dag/nachtcyclus in de 3D-omgeving',
            'Grotere herkenbare gebouwen zijn gedetailleerder gemodelleerd, zodat ze daadwerkelijk herkenbaar zijn'
        ],

        challenges:
            'De grootste uitdaging was het vertalen van een echte omgeving naar een interactieve 3D-spelwereld. Het dorp moest niet alleen visueel herkenbaar worden nagebouwd, maar de omgeving moest ook bruikbaar zijn als speelbord. Daarnaast moest de 3D-wereld worden gekoppeld aan game-logica en interactieve speelvelden.',

        solution:
            'Het dorp is in Blender opgebouwd als een 3D-omgeving en vervolgens geïmporteerd in Three.js. Binnen de applicatie is een tilemap gebruikt om het speelbord logisch op te delen. Hierdoor kunnen spelregels en interacties worden gekoppeld aan specifieke gebieden van de 3D-wereld.',

        github: '',

        demo: ''
    },
    {
    slug: 'maggy',

    title: 'Maggy',

    shortDescription:
        'Een interactief dobbelspel waarin spelers strategisch omgaan met worpen, scores en levens.',

    description:
        'Maggy is een interactief dobbelspel waarin spelers met twee dobbelstenen spelen en strategische keuzes maken tijdens het rollen. Het spel bevat onder andere een scoresysteem, levens, een beperkt aantal worpen en een mogelijkheid om tegen de computer te spelen.',

    category: 'Game / Interactive',

    technologies: [
        'TypeScript',
        'JavaScript',
        'HTML',
        'CSS',
        'Game Development'
    ],

    image: '/images/maggy/preview.png',

    images: [
        '/images/maggy/01.png',
        '/images/maggy/02.png',
        '/images/maggy/03.png',
        '/images/maggy/04.png'
    ],

    role: [
        'Concept en game design',
        'Frontend development',
        'Game-logica',
        'Dobbelsteen-systeem',
        'Scoresysteem',
        'Gebruikersinteractie'
    ],

    features: [
        'Interactief dobbelspel',
        'Twee dobbelstenen per speler',
        'Strategische keuzes tijdens het rollen',
        'Scoresysteem',
        'Levenssysteem',
        'Beperkt aantal worpen',
        'Spelen tegen de computer',
        'Dynamische spelinterface',
        'Realtime spelstatus'
    ],

    challenges:
        'Een belangrijke uitdaging was het vertalen van de spelregels naar een duidelijke en betrouwbare game-flow. De worpen, scores, levens en keuzes van de speler moesten correct met elkaar worden verbonden.',

    solution:
        'De game-logica is opgesplitst in verschillende verantwoordelijkheden. Hierdoor kunnen het dobbelsteensysteem, de spelstatus, de scoreberekening en de gebruikersinterface onafhankelijk van elkaar worden beheerd.',

    github: '',

    demo: ''
}
];