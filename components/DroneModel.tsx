'use client';
import React, { useRef, Suspense, Component, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { Group } from 'three';

// Fallback geometric drone model
function DroneModelFallback() {
    const groupRef = useRef<Group>(null);
    const bodyColor = "#e5e7eb";
    const armColor = "#1f2937";
    const propColor = "#0066ff";

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            groupRef.current.rotation.y += 0.002;
        }
    });

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

// GLTF Model Component
function DroneModelGLTF() {
    const groupRef = useRef<Group>(null);
    const drone = useGLTF('/models/drone.gltf');

    useFrame((state) => {
        if (groupRef.current) {
            // Very gentle hovering animation
            // Reduced amplitude to 0.05 to prevent "going inside" feeling
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            // Slow rotation around the Y vertical axis (which is Z in the model local space if rotated)
            // But we are rotating the GROUP, so Y is world up.
            groupRef.current.rotation.y += 0.001;
        }
    });

    return (
        <group ref={groupRef}>
            {/*
                - Scale reduced to 0.4 ("zoom out")
                - Rotation X -90 deg to lay flat (assuming typical Blender Z-up export)
            */}
            <primitive
                object={drone.scene.clone()}
                scale={0.4}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error loading drone model:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default function DroneModel() {
    return (
        <ErrorBoundary fallback={<DroneModelFallback />}>
            <Suspense fallback={<DroneModelFallback />}>
                <DroneModelGLTF />
            </Suspense>
        </ErrorBoundary>
    );
}
