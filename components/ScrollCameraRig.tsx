'use client';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScrollCameraRig() {
    const { camera } = useThree();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = Math.min(scrollY / maxScroll, 1);

            if (scrollProgress < 0.3) {
                const localProgress = scrollProgress / 0.3;
                camera.position.x = THREE.MathUtils.lerp(0, -2, localProgress);
                camera.position.y = THREE.MathUtils.lerp(3, 1, localProgress);
                camera.position.z = THREE.MathUtils.lerp(8, 4, localProgress);
            } else if (scrollProgress < 0.6) {
                const localProgress = (scrollProgress - 0.3) / 0.3;
                camera.position.x = THREE.MathUtils.lerp(-2, 0, localProgress);
                camera.position.y = THREE.MathUtils.lerp(1, 0.2, localProgress);
                camera.position.z = THREE.MathUtils.lerp(4, 0.5, localProgress);
            } else {
                const localProgress = (scrollProgress - 0.6) / 0.4;
                camera.position.x = THREE.MathUtils.lerp(0, 0, localProgress);
                camera.position.y = THREE.MathUtils.lerp(0.2, 0, localProgress);
                camera.position.z = THREE.MathUtils.lerp(0.5, -0.5, localProgress);
            }

            camera.lookAt(0, 0, 0);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [camera]);

    return null;
}
