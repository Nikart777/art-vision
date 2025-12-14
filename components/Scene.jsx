'use client';

import { useRef, useLayoutEffect, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function LiquidEye({ start }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const tl = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (meshRef.current) meshRef.current.scale.set(0, 0, 0);
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 5;
        materialRef.current.distort = 1.0;
      }

      tl.current = gsap.timeline({ 
        paused: true,
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
        {/* Уменьшаем полигоны для оптимизации: 64 -> 32 достаточно для DistortMaterial */}
        <sphereGeometry args={[1, 32, 32]} />
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

export default function Scene({ start }) {
  return (
    <div className="absolute inset-0 z-10 w-full h-full">
      <Canvas
        dpr={[1, 1.5]} // Ограничиваем DPI (макс 1.5 для ретины, чтобы не греть телефон)
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: true, // Можно false для супер-скорости, но true красивее
          stencil: false,  // Отключаем ненужный буфер
          depth: true      // Нужен для 3D
        }}
      >
        <LiquidEye start={start} />
        {/* Локальное освещение, чтобы не зависеть от внешних HDRI */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={3} color="#d8b4fe" />
        <pointLight position={[-10, -10, -10]} intensity={3} color="#6b21a8" />
      </Canvas>
    </div>
  );
}