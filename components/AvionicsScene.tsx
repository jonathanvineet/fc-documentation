'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { useGLTF, Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';

/* =============================================
   STAR FIELD — thousands of twinkling stars
   ============================================= */
function StarField() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      const brightness = 0.5 + Math.random() * 0.5;
      col[i * 3] = brightness * (0.7 + Math.random() * 0.3);
      col[i * 3 + 1] = brightness;
      col[i * 3 + 2] = brightness;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* =============================================
   FLOATING PARTICLES — close-range atmosphere
   ============================================= */
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.04} color="#00f0ff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

/* =============================================
   REALISTIC DRONE MODEL (from existing GLTF)
   ============================================= */
function DroneModel({ visible, position }: { visible: boolean; position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/drone.gltf');
  
  // Clone to ensure materials can be tweaked safely
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      groupRef.current.rotation.y += 0.005;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position} scale={0.4} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* =============================================
   REALISTIC HELICOPTER MODEL
   ============================================= */
function HelicopterModel({ visible, position }: { visible: boolean; position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/helicopter.glb');
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    // Ensure all materials are highly reflective/metallic if needed
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 1.5;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position} scale={0.05} rotation={[0, Math.PI / 2, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* =============================================
   REALISTIC AIRLINER MODEL
   ============================================= */
function AirlinerModel({ visible, position }: { visible: boolean; position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/airliner.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 1.5;
          (mesh.material as THREE.MeshStandardMaterial).metalness = 0.8;
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.2;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
      // Slight pitch
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position} scale={0.15}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* =============================================
   GROUND GRID
   ============================================= */
function GroundGrid() {
  return (
    <gridHelper
      args={[80, 80, '#0a2a4a', '#071830']}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

/* =============================================
   SCROLL CAMERA RIG
   ============================================= */

function ScrollDrivenCamera() {
  const cameraStateRef = useRef({ targetX: 0, targetY: 2, targetZ: 12 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);

      if (progress < 0.2) {
        // Hero / Drone setup
        cameraStateRef.current = { targetX: -3, targetY: 2, targetZ: 10 };
      } else if (progress < 0.45) {
        // Helicopter
        cameraStateRef.current = { targetX: 2, targetY: 1.5, targetZ: 9 };
      } else if (progress < 0.70) {
        // Airliner
        cameraStateRef.current = { targetX: -2, targetY: 2, targetZ: 11 };
      } else {
        // Specs / footer
        cameraStateRef.current = { targetX: 0, targetY: 4, targetZ: 14 };
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ camera }) => {
    const t = cameraStateRef.current;
    camera.position.x += (t.targetX - camera.position.x) * 0.02;
    camera.position.y += (t.targetY - camera.position.y) * 0.02;
    camera.position.z += (t.targetZ - camera.position.z) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* =============================================
   MAIN SCENE COMPONENT
   ============================================= */
export default function AvionicsScene() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);

      if (progress < 0.25) setActiveSection(0);
      else if (progress < 0.5) setActiveSection(1);
      else if (progress < 0.75) setActiveSection(2);
      else setActiveSection(3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas camera={{ position: [0, 3, 14], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#050a14']} />
        <fog attach="fog" args={['#050a14', 20, 60]} />

        <Environment preset="city" />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 15]} intensity={1.5} color="#ffffff" castShadow />
        <pointLight position={[-8, 5, -8]} intensity={2} color="#40c0cb" distance={40} />
        <pointLight position={[8, -3, 8]} intensity={1.5} color="#d49c20" distance={30} />
        
        {/* Cinematic Post-Processing */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.2} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>

        {/* Stars & Particles */}
        <StarField />
        <FloatingParticles />

        {/* Ground */}
        <GroundGrid />

        <Suspense fallback={null}>
          {/* Aircraft Models — visible based on scroll */}
          <DroneModel visible={activeSection <= 0} position={[-2, 1, 0]} />
          <HelicopterModel visible={activeSection === 1} position={[3, 0.5, -3]} />
          <AirlinerModel visible={activeSection >= 2} position={[-2, 1, -9]} />
        </Suspense>

        {/* Camera */}
        <ScrollDrivenCamera />
      </Canvas>
    </div>
  );
}
