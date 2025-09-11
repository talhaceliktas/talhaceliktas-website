"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const AboutAnimation = () => {
  const canvasRef = useRef();
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (!canvasRef.current) return;
      const { width } = canvasRef.current.getBoundingClientRect();

      // Parent div boyutlarına göre scale hesaplama
      const baseWidth = width < 768 ? 176 : 384; // w-44 = 176px, md:w-96 = 384px
      setScaleFactor(width / baseWidth);
      setIsMobile(width < 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-full w-full">
      <Canvas
        ref={canvasRef}
        className="h-full w-full"
        camera={{
          position: isMobile ? [0, 15, 25] : [0, 20, 35],
          fov: isMobile ? 60 : 45,
        }}
        shadows
      >
        <directionalLight
          position={isMobile ? [15, 15, 15] : [25, 25, 25]}
          intensity={isMobile ? 0.8 : 1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <ambientLight intensity={0.3} />
        <ContactShadows
          position={[0, -8, 0]}
          opacity={0.4}
          scale={isMobile ? 20 : 40}
          blur={2}
          far={20}
        />
        <Geometries scaleFactor={scaleFactor} isMobile={isMobile} />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

function Geometries({ scaleFactor, isMobile }) {
  // Mobile ve desktop için farklı pozisyonlar
  const geometriesConfig = isMobile
    ? [
        { position: [0, 2, 0], r: 0.4, type: "Icosahedron", size: 3 },
        { position: [6, -2, -3], r: 0.3, type: "Capsule", size: 2.5 },
        { position: [-6, -2, -3], r: 0.35, type: "TorusKnot", size: 3 },
      ]
    : [
        { position: [0, 5, 0], r: 0.3, type: "Icosahedron", size: 4 },
        { position: [12, -3, -5], r: 0.4, type: "Capsule", size: 3.5 },
        { position: [-12, -3, -5], r: 0.35, type: "TorusKnot", size: 4 },
      ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      roughness: 0.1,
      metalness: 0.9,
      envMapIntensity: 1.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: true,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.2,
      metalness: 0.8,
      envMapIntensity: 2,
    }),
  ];

  return geometriesConfig.map((config, i) => (
    <Geometry
      key={i}
      position={config.position.map((p) => p * scaleFactor)}
      r={config.r * scaleFactor}
      type={config.type}
      size={config.size * scaleFactor}
      materials={materials}
      index={i}
    />
  ));
}

function Geometry({ position, r, type, size, materials, index }) {
  const meshRef = useRef();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Spring animasyonu için
  const { scale, rotation } = useSpring({
    scale: clicked ? 1.3 : hovered ? 1.1 : 1,
    rotation: clicked ? [Math.PI * 2, Math.PI * 2, Math.PI * 2] : [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // Giriş animasyonu
  const { entryScale } = useSpring({
    from: { entryScale: 0 },
    to: { entryScale: 1 },
    delay: index * 200,
    config: { mass: 1, tension: 180, friction: 12 },
  });

  let geometry;
  switch (type) {
    case "Icosahedron":
      geometry = new THREE.IcosahedronGeometry(size, 0);
      break;
    case "Capsule":
      geometry = new THREE.CapsuleGeometry(size / 2, size, 4, 8);
      break;
    case "TorusKnot":
      geometry = new THREE.TorusKnotGeometry(size / 2, size / 4, 64, 8, 2, 3);
      break;
    default:
      geometry = new THREE.SphereGeometry(size);
  }

  function handleClick() {
    setClicked(!clicked);
    // Malzeme değiştir
    if (meshRef.current) {
      meshRef.current.material =
        materials[Math.floor(Math.random() * materials.length)];
    }
  }

  return (
    <animated.group position={position} scale={entryScale}>
      <Float
        speed={3 + r * 2}
        rotationIntensity={4 + r * 3}
        floatIntensity={2 + r}
      >
        <animated.mesh
          ref={meshRef}
          geometry={geometry}
          material={materials[index % materials.length]}
          castShadow
          receiveShadow
          scale={scale}
          rotation={rotation}
          onClick={handleClick}
          onPointerEnter={() => {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        />
      </Float>
    </animated.group>
  );
}

export default AboutAnimation;
