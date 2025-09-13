import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AnimatedModel from "./AnimatedModel";

export default function Scene({
  animations,
  setAnimations,
  playAnimRef,
  onModelReady,
  orbitControlsRef,
}) {
  return (
    <div className="min-h-0 flex-1">
      <Canvas
        shadows
        camera={{
          position: [0, 2, 3],
          fov: window.innerWidth < 798 ? 70 : 58,
        }}
        className="h-full w-full"
        style={{ backgroundColor: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 3]} intensity={0.9} castShadow />
        <pointLight position={[-2, 2, 2]} intensity={0.4} />

        <AnimatedModel
          onAnimationsLoaded={setAnimations}
          playAnimRef={playAnimRef}
          onModelReady={onModelReady}
        />
        <OrbitControls
          ref={orbitControlsRef}
          enablePan={false}
          minDistance={1.5}
          maxDistance={4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
