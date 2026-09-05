```vue
<script setup lang="ts">
import {
    onMounted,
    onUnmounted,
    ref
} from 'vue'

import * as THREE from 'three'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'


// =====================================================
// PROPS
// =====================================================

const props = withDefaults(
    defineProps<{
        text: string
        level?: 'h1' | 'h2' | 'h3'
        variant?: 'heading' | 'label'
    }>(),
    {
        level: 'h2',
        variant: 'heading'
    }
)


// =====================================================
// DOM
// =====================================================

const container =
    ref<HTMLDivElement | null>(null)


// =====================================================
// THREE
// =====================================================

let scene: THREE.Scene | null = null

let camera:
    THREE.PerspectiveCamera | null = null

let renderer:
    THREE.WebGLRenderer | null = null

let textMesh:
    THREE.Mesh<
        TextGeometry,
        THREE.Material | THREE.Material[]
    > | null = null

let animationFrame = 0

let resizeObserver:
    ResizeObserver | null = null


// =====================================================
// MOUNT
// =====================================================

onMounted(() => {

    if (!container.value) {
        return
    }


    // =================================================
    // SCENE
    // =================================================

    scene = new THREE.Scene()


    // =================================================
    // CAMERA
    // =================================================

    camera =
        new THREE.PerspectiveCamera(
            35,
            1,
            0.1,
            1000
        )

    camera.position.set(
        0,
        0,
        8
    )

    camera.lookAt(
        0,
        0,
        0
    )


    // =================================================
    // RENDERER
    // =================================================

    renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    )

    renderer.setClearColor(
        0x000000,
        0
    )

    renderer.outputColorSpace =
        THREE.SRGBColorSpace

    renderer.domElement.style.display =
        'block'

    renderer.domElement.style.width =
        '100%'

    renderer.domElement.style.height =
        '100%'

    container.value.appendChild(
        renderer.domElement
    )


    // =================================================
    // LIGHTING
    // =================================================

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.8
        )

    scene.add(
        ambientLight
    )


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3
        )

    keyLight.position.set(
        3,
        4,
        6
    )

    scene.add(
        keyLight
    )


    const purpleLight =
        new THREE.PointLight(
            0x8b5cf6,
            10,
            15
        )

    purpleLight.position.set(
        -3,
        1,
        5
    )

    scene.add(
        purpleLight
    )


    // =================================================
    // FONT
    // =================================================

    const fontLoader =
        new FontLoader()


    fontLoader.load(
        '/fonts/helvetiker_bold.typeface.json',

        (font) => {

            createText(font)

            updateSize()

            animate()
        },

        undefined,

        (error) => {

            console.error(
                'ThreeHeading: font kon niet worden geladen.',
                error
            )
        }
    )


    // =================================================
    // RESIZE
    // =================================================

    resizeObserver =
        new ResizeObserver(() => {
            updateSize()
        })

    resizeObserver.observe(
        container.value
    )
})


// =====================================================
// CREATE TEXT
// =====================================================

function createText(
    font: Font
) {

    if (!scene) {
        return
    }


    // =================================================
    // TEXT SIZE
    // =================================================

    let size: number

    if (props.variant === 'label') {

        size = 0.38

    } else {

        size =
            props.level === 'h1'
                ? 1
                : props.level === 'h2'
                    ? 0.75
                    : 0.55
    }


    // =================================================
    // DEPTH
    // =================================================

    const depth =
        props.variant === 'label'
            ? 0.12
            : 0.22


    // =================================================
    // BEVEL
    // =================================================

    const bevelThickness =
        props.variant === 'label'
            ? 0.018
            : 0.035

    const bevelSize =
        props.variant === 'label'
            ? 0.012
            : 0.025

    const bevelSegments =
        props.variant === 'label'
            ? 3
            : 4


    // =================================================
    // GEOMETRY
    // =================================================

    const geometry =
        new TextGeometry(
            props.text,
            {
                font,

                size,

                depth,

                curveSegments: 12,

                bevelEnabled: true,

                bevelThickness,

                bevelSize,

                bevelSegments
            }
        )


    // =================================================
    // BOUNDING BOX
    // =================================================

    geometry.computeBoundingBox()


    if (!geometry.boundingBox) {
        geometry.dispose()
        return
    }


    // =================================================
    // CENTER TEXT
    // =================================================

    const center =
        new THREE.Vector3()

    geometry.boundingBox.getCenter(
        center
    )

 geometry.translate(
    -geometry.boundingBox.min.x,
    -center.y,
    -center.z
)


    // =================================================
    // FRONT MATERIAL
    // =================================================

    const frontMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffffff,

            metalness:
                props.variant === 'label'
                    ? 0.05
                    : 0.1,

            roughness:
                props.variant === 'label'
                    ? 0.4
                    : 0.3
        })


    // =================================================
    // DEPTH MATERIAL
    // =================================================

    const depthMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x7c3aed,

            metalness: 0.2,

            roughness: 0.35
        })


    // =================================================
    // MESH
    // =================================================

    textMesh =
        new THREE.Mesh(
            geometry,
            [
                frontMaterial,
                depthMaterial
            ]
        )


    textMesh.position.set(
        0,
        0,
        0
    )


    scene.add(
        textMesh
    )
}


// =====================================================
// RESIZE
// =====================================================

function updateSize() {

    if (
        !container.value ||
        !camera ||
        !renderer
    ) {
        return
    }


    const width =
        container.value.clientWidth

    const height =
        container.value.clientHeight


    if (
        width <= 0 ||
        height <= 0
    ) {
        return
    }


    // =================================================
    // RENDERER
    // =================================================

    renderer.setSize(
        width,
        height,
        false
    )


    // =================================================
    // CAMERA ASPECT
    // =================================================

    camera.aspect =
        width / height

    camera.updateProjectionMatrix()


    // =================================================
    // TEXT FIT
    // =================================================

    if (
        !textMesh ||
        !textMesh.geometry.boundingBox
    ) {
        return
    }


    const box =
        textMesh.geometry.boundingBox


    const textWidth =
        box.max.x - box.min.x

    const textHeight =
        box.max.y - box.min.y


    // =================================================
    // CAMERA DISTANCE
    // =================================================

    const fov =
        THREE.MathUtils.degToRad(
            camera.fov
        )


    const verticalDistance =
        (
            textHeight /
            2
        ) /
        Math.tan(
            fov / 2
        )


    const horizontalDistance =
        (
            textWidth /
            2
        ) /
        (
            Math.tan(
                fov / 2
            ) *
            camera.aspect
        )


    const padding =
        props.variant === 'label'
            ? 1.35
            : 1.25


    const distance =
        Math.max(
            verticalDistance,
            horizontalDistance
        ) * padding


    camera.position.set(
        0,
        0,
        Math.max(
            distance,
            1.5
        )
    )


    camera.lookAt(
        0,
        0,
        0
    )
}


// =====================================================
// ANIMATION
// =====================================================

function animate() {

    if (
        !renderer ||
        !scene ||
        !camera
    ) {
        return
    }


    animationFrame =
        requestAnimationFrame(
            animate
        )


    if (textMesh) {

        const time =
            performance.now() * 0.001


        // =================================================
        // HEADING ANIMATION
        // =================================================

        if (
            props.variant === 'heading'
        ) {

            textMesh.rotation.y =
                Math.sin(
                    time * 0.5
                ) * 0.035


            textMesh.rotation.x =
                Math.sin(
                    time * 0.4
                ) * 0.012


            textMesh.position.y =
                Math.sin(
                    time * 0.7
                ) * 0.025

        }


        // =================================================
        // LABEL ANIMATION
        // =================================================

        else {

            textMesh.rotation.y =
                Math.sin(
                    time * 0.45
                ) * 0.018


            textMesh.rotation.x =
                Math.sin(
                    time * 0.35
                ) * 0.006


            textMesh.position.y =
                Math.sin(
                    time * 0.6
                ) * 0.012
        }
    }


    renderer.render(
        scene,
        camera
    )
}


// =====================================================
// CLEANUP
// =====================================================

onUnmounted(() => {

    cancelAnimationFrame(
        animationFrame
    )


    resizeObserver?.disconnect()


    // =================================================
    // TEXT
    // =================================================

    if (textMesh) {

        textMesh.geometry.dispose()


        if (
            Array.isArray(
                textMesh.material
            )
        ) {

            textMesh.material.forEach(
                material => {
                    material.dispose()
                }
            )

        } else {

            textMesh.material.dispose()
        }


        scene?.remove(
            textMesh
        )

        textMesh = null
    }


    // =================================================
    // RENDERER
    // =================================================

    if (renderer) {

        renderer.dispose()

        renderer.domElement.remove()
    }


    renderer = null
    camera = null
    scene = null
})

</script>


<template>

    <div
        ref="container"
        class="three-heading"
        :class="[
            `three-heading-${level}`,
            `three-heading-${variant}`
        ]"
        :aria-label="text"
        role="img"
    >

        <!--
            Semantic heading.
            Deze blijft aanwezig voor SEO
            en accessibility.
        -->

        <component
            :is="level"
            class="semantic-heading"
        >
            {{ text }}
        </component>

    </div>

</template>


<style scoped>

/* =====================================================
   CONTAINER
===================================================== */

.three-heading {

    position: relative;

    display: block;

    width: 100%;

    height: 120px;

    overflow: visible;

}


/* =====================================================
   CANVAS
===================================================== */

.three-heading :deep(canvas) {

    position: absolute;

    inset: 0;

    display: block;

    width: 100% !important;

    height: 100% !important;

    pointer-events: none;

}


/* =====================================================
   SEMANTIC HEADING
===================================================== */

.semantic-heading {

    position: absolute;

    width: 1px;

    height: 1px;

    padding: 0;

    margin: -1px;

    overflow: hidden;

    clip: rect(0, 0, 0, 0);

    white-space: nowrap;

    border: 0;

}


/* =====================================================
   H1
===================================================== */

.three-heading-h1 {

    height: 130px;

}


/* =====================================================
   H2
===================================================== */

.three-heading-h2 {

    height: 110px;

}


/* =====================================================
   H3
===================================================== */

.three-heading-h3 {

    height: 90px;

}


/* =====================================================
   LABEL
===================================================== */

.three-heading-label {

    height: 45px;

}


/* =====================================================
   HEADING
===================================================== */

.three-heading-heading {

    display: block;

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {

    .three-heading-h1 {

        height: 110px;

    }


    .three-heading-h2 {

        height: 95px;

    }


    .three-heading-h3 {

        height: 80px;

    }


    .three-heading-label {

        height: 42px;

    }

}


@media (max-width: 576px) {

    .three-heading-h1 {

        height: 95px;

    }


    .three-heading-h2 {

        height: 85px;

    }


    .three-heading-h3 {

        height: 75px;

    }


    .three-heading-label {

        height: 40px;

    }

}

</style>
```


