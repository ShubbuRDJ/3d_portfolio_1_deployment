import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loader from '../Loader';


const ReactLogo = () => {
    const react = useGLTF('./react_logo/scene.gltf');
    return (
        <primitive
            object={react.scene}
            scale={0.75}
            position={[0, -1.25, 1]}
            rotation={[0, 0, 0]}
        />
    )
}

const ReactLogoCanvas = () => (
    <Canvas
        frameloop='demand'
        shadows
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
    >
        <Suspense
            fallback={<Loader />}>
            <OrbitControls
                enableZoom={false}
                autoRotate
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
            <ReactLogo />
        </Suspense>
        <Preload all />
    </Canvas>
)

export default ReactLogoCanvas