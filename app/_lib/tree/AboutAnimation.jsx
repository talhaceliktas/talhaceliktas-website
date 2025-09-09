import { ContactShadows, Environment, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  CapsuleGeometry,
  IcosahedronGeometry,
  MeshNormalMaterial,
  MeshStandardMaterial,
  TorusGeometry,
} from "three";

const AboutAnimation = () => {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 40], fov: 70 }}
      shadows
    >
      <directionalLight position={[50, 50, 50]} intensity={1} castShadow />
      <ambientLight intensity={0.5} />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={30} />
      <Geometries />
      <Environment preset="studio" />
    </Canvas>
  );
};

function Geometries() {
  const geometries = [
    {
      position: [0, 0, -20],
      r: 0.3,
      geometry: new IcosahedronGeometry(15, 0),
    },
    {
      position: [20, 10, -20],
      r: 0.4,
      geometry: new CapsuleGeometry(10, 15, 32, 64, 64),
    },
    {
      position: [-20, 10, -20],
      r: 0.4,
      geometry: new TorusGeometry(15, 2, 30, 100, 3),
    },
  ];

  const materials = [
    new MeshNormalMaterial(),
    new MeshStandardMaterial({ color: 0x968d8d, roughness: 0, metalness: 0.8 }),
    new MeshStandardMaterial({
      color: 0xb007ed,
      roughness: 0.5,
      metalness: 0.4,
      wireframe: true,
    }),
    new MeshStandardMaterial({
      color: 0x07c7ed,
      roughness: 0.44,
      metalness: 0.4,
      vertexColors: true,
    }),
    new MeshStandardMaterial({ color: 0x27ae60, roughness: 0.1 }),
    new MeshStandardMaterial({ color: 0xe67e22, roughness: 0.3 }),
    new MeshStandardMaterial({
      color: 0xe67e22,
      roughness: 0.01,
      metalness: 0.4,
    }),
  ];

  return geometries.map(({ position, r, geometry }) => {
    return (
      <Geometry
        key={JSON.stringify(position)}
        position={position.map((p) => p * 2)}
        geometry={geometry}
        r={r}
        materials={materials}
      />
    );
  });
}

function Geometry({ position, r, geometry, materials }) {
  const meshRef = useRef();
  useEffect(() => {
    gsap.fromTo(
      meshRef.current.scale,
      { x: 0.001, y: 0.001, z: 0.001 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        delay: 0.3,
      },
    );
  }, []);

  function handleClick(e) {
    const mesh = e.object;

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    });

    mesh.material = gsap.utils.random(materials);
  }

  return (
    <group ref={meshRef} position={position}>
      <Float speed={5 * r} rotationIntensity={6 * r}>
        <mesh
          onClick={handleClick}
          geometry={geometry}
          material={gsap.utils.random(materials)}
          castShadow
          receiveShadow
          onPointerEnter={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "default";
          }}
        ></mesh>
      </Float>
    </group>
  );
}

export default AboutAnimation;
