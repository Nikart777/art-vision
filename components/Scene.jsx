'use client';

import { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function LiquidEye() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // АНИМАЦИЯ РОЖДЕНИЯ (INTRO)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Начальное состояние: Шар невидим (размер 0), но очень яркий (горячий)
      if (meshRef.current) {
        meshRef.current.scale.set(0, 0, 0);
      }
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 5; // Ослепительная вспышка
        materialRef.current.distort = 1.0;         // Максимальный хаос
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 2. ВЗРЫВ (через 0.5 сек после загрузки)
      tl.to(meshRef.current.scale, {
        x: 2.2, y: 2.2, z: 2.2,
        duration: 2.5,
        ease: "elastic.out(1, 0.3)", // Эффект пружины/резины при появлении
        delay: 0.2
      }, "start");

      // 3. ОСТЫВАНИЕ (Свет гаснет до нормального)
      tl.to(materialRef.current, {
        emissiveIntensity: 0.5, // Возвращаем к норме
        duration: 2,
        ease: "power2.inOut"
      }, "start+=0.1");

      // 4. СТАБИЛИЗАЦИЯ (Искажение успокаивается)
      tl.to(materialRef.current, {
        distort: 0.3, // Нормальное состояние жидкости
        duration: 3,
        ease: "circ.out"
      }, "start");

    }, meshRef); // Scope

    return () => ctx.revert();
  }, []);

  // Стандартное вращение за мышкой
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
          ref={materialRef} // Ссылка для анимации материала
          color="#3b0764"       
          emissive="#7e22ce"    
          emissiveIntensity={0.5} // Стартовое значение (будет перезаписано GSAP)
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

export default function Scene() {
  return (
    <div className="absolute inset-0 z-10 w-full h-full">
      <Canvas dpr={[1, 1]} camera={{ position: [0, 0, 8], fov: 35 }}>
        <LiquidEye />
        <Environment preset="studio" /> 
        <pointLight position={[10, 10, 10]} intensity={4} color="#d8b4fe" />
        <pointLight position={[-10, -10, -10]} intensity={4} color="#6b21a8" />
      </Canvas>
    </div>
  );
}