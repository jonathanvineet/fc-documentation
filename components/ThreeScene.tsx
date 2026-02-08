'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import DroneModel from './DroneModel';

export default function ThreeScene() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
            opacity: 1, // Full opacity
            pointerEvents: 'none' // Don't block scroll
        }}>
            <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />

                <DroneModel />

                <Environment preset="city" />
                {/* Optional: Add gentle auto-rotation of the camera or model */}
            </Canvas>
        </div>
    );
}
