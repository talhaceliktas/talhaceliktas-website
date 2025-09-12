import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import toast from "react-hot-toast";

function AnimatedModel({ onAnimationsLoaded, playAnimRef }) {
  const { scene, animations } = useGLTF("/my3d.glb");
  const mixer = useRef();
  const clock = useRef(new THREE.Clock());
  const [currentAction, setCurrentAction] = useState(null);

  useEffect(() => {
    if (!animations?.length) return;

    mixer.current = new THREE.AnimationMixer(scene);
    const defaultAnim =
      animations.find((a) => a.name === "Wave_One_Hand") || animations[0];

    if (defaultAnim) {
      const action = mixer.current.clipAction(defaultAnim);
      action.play();
      setCurrentAction(action);
    }

    onAnimationsLoaded?.(animations);

    return () => mixer.current?.stopAllAction();
  }, [scene, animations, onAnimationsLoaded]);

  useEffect(() => {
    if (playAnimRef) {
      playAnimRef.current = (name) => {
        const clip = animations.find((a) => a.name === name);
        if (!clip || !mixer.current) return;

        currentAction?.stop();
        const newAction = mixer.current.clipAction(clip);
        newAction.reset().play();
        setCurrentAction(newAction);
      };
    }
  }, [animations, currentAction]);

  useFrame(() => {
    mixer.current?.update(clock.current.getDelta());
  });

  return <primitive object={scene} />;
}

export default function AboutAnimation() {
  const [animations, setAnimations] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const playAnimRef = useRef();

  useEffect(() => {
    if (animations.length > 0 && !showButtons) {
      setTimeout(() => {
        (setShowButtons(true),
          toast(
            "You can switch the character's animations with the buttons or rotate the camera",
            {
              icon: "🔥",
              duration: 3,
            },
          ));
      }, 1500);
    }
  }, [animations, showButtons]);

  const animationConfig = {
    Backflip: { name: "Flip", icon: "🤸‍♂️" },
    Fall1: { name: "Fall", icon: "🤕" },
    Hip_Hop_Dance_3: { name: "Hip Hop Dance", icon: "🕺" },
    Running: { name: "Run", icon: "🏃‍♂️" },
    Jump_Rope: { name: "Jump Rope", icon: "🪢" },
    Wake_Up_and_Look_Up: { name: "Wake", icon: "🌅" },
    Wave_One_Hand: { name: "Wave", icon: "👋" },
    air_squat: { name: "Squat", icon: "🏋️‍♂️" },
  };

  // Walking animasyonunu filtrele
  const filteredAnimations = animations.filter(
    (animation) =>
      !animation.name.toLowerCase().includes("walking") &&
      !animation.name.toLowerCase().includes("walk"),
  );

  return (
    <div className="relative flex h-full w-full flex-col">
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
          />
          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={4}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>

      {showButtons && (
        <div className="absolute right-0 bottom-0 left-0 flex justify-center bg-white/50 px-2 py-2 backdrop-blur-sm">
          <div className="flex flex-wrap justify-center gap-1.5">
            {filteredAnimations.map((animation) => {
              const config = animationConfig[animation.name] || {
                name: animation.name,
                icon: "🎭",
              };
              return (
                <button
                  key={animation.name}
                  onClick={() => playAnimRef.current?.(animation.name)}
                  className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white/90 text-sm shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-md active:scale-95 md:h-8 md:w-8"
                  title={config.name}
                  aria-label={`Play ${config.name} animation`}
                >
                  {config.icon}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
