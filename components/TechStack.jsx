'use client';
import { Canvas } from '@react-three/fiber';
import { Float, Text, Environment, Grid } from '@react-three/drei';
import { Suspense } from 'react';

const technologies = [
  { name: "React", pos: [-2, 2, 0] },
  { name: "Next.js", pos: [2, 1, -1] },
  { name: "WebGL", pos: [-1, -1, 1] },
  { name: "Three.js", pos: [1, -2, -2] },
  { name: "GSAP", pos: [3, 0, 0] },
  { name: "Tailwind", pos: [-3, 0, -1] },
];

function FloatingText({ children, position }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        position={position}
        color="white"
        fontSize={0.6}
        // Убрали проп font="..." — теперь используется системный шрифт Three.js
        // Он грузится мгновенно и не ломает сцену
        anchorX="center"
        anchorY="middle"
      >
        {children}
        {/* Добавляем свечение тексту */}
        <meshStandardMaterial color="#c084fc" emissive="#7c3aed" emissiveIntensity={0.5} />
      </Text>
    </Float>
  );
}

export default function TechStack() {
  return (
    <section className="relative w-full h-[60vh] bg-black flex items-center justify-center overflow-hidden">
      
      {/* Заголовок (HTML слой) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
        <h3 className="text-gray-500 uppercase tracking-[0.5em] text-sm font-mono">
          Under the Hood
        </h3>
      </div>

      {/* 3D Слой */}
      <div className="absolute inset-0 z-10">
        <Canvas dpr={[1, 1]} camera={{ position: [0, 0, 8], fov: 40 }}>
          {/* Suspense теперь имеет fallback - если грузится, мы этого не заметим, но контент появится */}
          <Suspense fallback={null}>
            <group>
               {technologies.map((tech, i) => (
                 <FloatingText key={i} position={tech.pos}>
                   {tech.name}
                 </FloatingText>
               ))}
            </group>
            
            {/* Добавляем красивую сетку на пол, чтобы видеть глубину */}
            <Grid 
              position={[0, -4, 0]} 
              args={[10, 10]} 
              cellColor="#6b21a8" 
              sectionColor="#d8b4fe" 
              fadeDistance={20} 
            />
            
            <Environment preset="city" />
            <ambientLight intensity={1} />
          </Suspense>
        </Canvas>
      </div>
      
    </section>
  );
}