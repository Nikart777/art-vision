'use client';

import { useRef, useLayoutEffect, useEffect } from 'react'; // Добавили useEffect
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Добавляем проп start
function LiquidEye({ start }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const tl = useRef(null); // Храним таймлайн

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Исходное состояние: шар скрыт
      if (meshRef.current) meshRef.current.scale.set(0, 0, 0);
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 5;
        materialRef.current.distort = 1.0;
      }

      // Создаем таймлайн, но ставим на ПАУЗУ (paused: true)
      tl.current = gsap.timeline({ 
        paused: true, // <--- ВАЖНО
        defaults: { ease: "power3.out" } 
      });

      tl.current
        .to(meshRef.current.scale, {
          x: 2.2, y: 2.2, z: 2.2,
          duration: 2.5,
          ease: "elastic.out(1, 0.3)",
        }, "start")
        .to(materialRef.current, {
          emissiveIntensity: 0.5,
          duration: 2,
          ease: "power2.inOut"
        }, "start+=0.1")
        .to(materialRef.current, {
          distort: 0.3,
          duration: 3,
          ease: "circ.out"
        }, "start");

    }, meshRef);

    return () => ctx.revert();
  }, []);

  // Следим за пропом start. Если он true — запускаем анимацию.
  useEffect(() => {
    if (start && tl.current) {
      tl.current.play();
    }
  }, [start]);

  useFrame((state) => {
    const { mouse } = state;
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.4, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.4, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#3b0764"       
          emissive="#7e22ce"    
          emissiveIntensity={0.5}
          envMapIntensity={1.5} 
          clearcoat={1}
          metalness={0.8}       
          roughness={0.1}
          distort={0.3}         
          speed={2}
        />
      </mesh>
    </Float>
  );
}

// Пробрасываем проп start внутрь
export default function Scene({ start }) {
  return (
    <div className="absolute inset-0 z-10 w-full h-full">
      <Canvas dpr={[1, 1]} camera={{ position: [0, 0, 8], fov: 35 }}>
        <LiquidEye start={start} />
        <Environment preset="studio" /> 
        <pointLight position={[10, 10, 10]} intensity={4} color="#d8b4fe" />
        <pointLight position={[-10, -10, -10]} intensity={4} color="#6b21a8" />
      </Canvas>
    </div>
  );
}