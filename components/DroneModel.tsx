'use client';
import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

function DroneModelContent() {
    const groupRef = useRef<Group>(null);

    let drone;
    try {
        drone = useGLTF('/models/drone.gltf');
    } catch (error) {
        console.log('Using fallback drone model');
        drone = null;
    }

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            groupRef.current.rotation.y += 0.002;
        }
    });

    if (drone && drone.scene) {
        return (
            <group ref={groupRef}>
                <primitive object={drone.scene.clone()} scale={2} />
            </group>
        );
    }

    const bodyColor = "#e5e7eb";
    const armColor = "#1f2937";
    const propColor = "#0066ff";

    return (
        <group ref={groupRef} scale={[1, 1, 1]}>
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.2, 0.4, 2.2]} />
                <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.8} />
            </mesh>

            <mesh position={[0, 0.25, 0]} castShadow>
                <boxGeometry args={[1, 0.1, 1.8]} />
                <meshStandardMaterial color="#374151" roughness={0.5} />
            </mesh>

            <mesh position={[1.5, 0, 1.5]} rotation={[0, Math.PI / 4, 0]} castShadow>
                <boxGeometry args={[3.5, 0.15, 0.4]} />
                <meshStandardMaterial color={armColor} />
            </mesh>
            <mesh position={[-1.5, 0, 1.5]} rotation={[0, -Math.PI / 4, 0]} castShadow>
                <boxGeometry args={[3.5, 0.15, 0.4]} />
                <meshStandardMaterial color={armColor} />
            </mesh>
            <mesh position={[1.5, 0, -1.5]} rotation={[0, -Math.PI / 4, 0]} castShadow>
                <boxGeometry args={[3.5, 0.15, 0.4]} />
                <meshStandardMaterial color={armColor} />
            </mesh>
            <mesh position={[-1.5, 0, -1.5]} rotation={[0, Math.PI / 4, 0]} castShadow>
                <boxGeometry args={[3.5, 0.15, 0.4]} />
                <meshStandardMaterial color={armColor} />
            </mesh>

            {[
                [2.5, 0.1, 2.5],
                [-2.5, 0.1, 2.5],
                [2.5, 0.1, -2.5],
                [-2.5, 0.1, -2.5],
            ].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    <mesh position={[0, 0.15, 0]} castShadow>
                        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                        <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0]}>
                        <torusGeometry args={[1.5, 0.02, 16, 100]} />
                        <meshBasicMaterial color={propColor} transparent opacity={0.4} />
                    </mesh>
                    <mesh position={[0, 0.4, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                        <meshStandardMaterial color={bodyColor} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

export default function DroneModel() {
    return (
        <Suspense fallback={null}>
            <DroneModelContent />
        </Suspense>
    );
}
