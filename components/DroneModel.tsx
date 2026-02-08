'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export default function DroneModel() {
    const groupRef = useRef<Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating animation
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            // Slow rotation
            groupRef.current.rotation.y += 0.002;
        }
    });

    const bodyColor = "#e5e7eb"; // Cool Grey
    const armColor = "#1f2937"; // Dark Grey
    const propColor = "#0066ff"; // Tech Blue accents

    return (
        <group ref={groupRef} scale={[1, 1, 1]}>
            {/* Central Body - Main */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.2, 0.4, 2.2]} />
                <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Central Body - Top Plate Detail */}
            <mesh position={[0, 0.25, 0]} castShadow>
                <boxGeometry args={[1, 0.1, 1.8]} />
                <meshStandardMaterial color="#374151" roughness={0.5} />
            </mesh>

            {/* Arms - X Configuration */}
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

            {/* Motors & Props */}
            {[
                [2.5, 0.1, 2.5],
                [-2.5, 0.1, 2.5],
                [2.5, 0.1, -2.5],
                [-2.5, 0.1, -2.5],
            ].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    {/* Motor Bell */}
                    <mesh position={[0, 0.15, 0]} castShadow>
                        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                        <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.2} />
                    </mesh>
                    {/* Prop Disc Outline (Static visual) */}
                    <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0]}>
                        <torusGeometry args={[1.5, 0.02, 16, 100]} />
                        <meshBasicMaterial color={propColor} transparent opacity={0.4} />
                    </mesh>
                    {/* Prop Hub */}
                    <mesh position={[0, 0.4, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                        <meshStandardMaterial color={bodyColor} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
