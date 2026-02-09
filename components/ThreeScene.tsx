'use client';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import DroneModel from './DroneModel';
import ScrollCameraRig from './ScrollCameraRig';

export default function ThreeScene() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none'
        }}>
            <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.7} color="#0066ff" />
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

                <DroneModel />
                <ScrollCameraRig />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
