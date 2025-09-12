import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function AnimatedModel({ onAnimationsLoaded, playAnimRef }) {
  const { scene, animations } = useGLTF("/Meshy_Merged_Animations.glb");
  const mixer = useRef();
  const clock = useRef(new THREE.Clock());
  const [currentAction, setCurrentAction] = useState(null);

  useEffect(() => {
    if (!animations || animations.length === 0) return;

    mixer.current = new THREE.AnimationMixer(scene);

    // Başlangıçta "Wave Hand" animasyonunu oynat
    const waveAnimation =
      animations.find((a) => a.name === "Wave_One_Hand") || animations[0];
    if (waveAnimation) {
      const action = mixer.current.clipAction(waveAnimation);
      action.play();
      setCurrentAction(action);
    }

    if (onAnimationsLoaded) onAnimationsLoaded(animations);

    return () => {
      if (mixer.current) mixer.current.stopAllAction();
    };
  }, [scene, animations, onAnimationsLoaded]);

  useEffect(() => {
    if (playAnimRef) {
      playAnimRef.current = (name) => {
        const clip = animations.find((a) => a.name === name);
        if (!clip) return;

        if (currentAction) {
          currentAction.stop();
        }

        const newAction = mixer.current.clipAction(clip);
        newAction.reset().play();
        setCurrentAction(newAction);
      };
    }
  }, [animations, currentAction]);

  useFrame(() => {
    if (mixer.current) {
      mixer.current.update(clock.current.getDelta());
    }
  });

  return <primitive object={scene} scale={[1, 1, 1]} />;
}

export default function Model() {
  const [animations, setAnimations] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const playAnimRef = useRef();
  const buttonContainerRef = useRef();

  useEffect(() => {
    // Animasyonlar yüklendikten sonra butonları animate et
    if (animations.length > 0 && !showButtons) {
      setTimeout(() => {
        setShowButtons(true);
        if (buttonContainerRef.current) {
          buttonContainerRef.current.style.opacity = "0";
          buttonContainerRef.current.style.transform = "translateY(-10px)";

          requestAnimationFrame(() => {
            buttonContainerRef.current.style.transition = "all 0.6s ease-out";
            buttonContainerRef.current.style.opacity = "1";
            buttonContainerRef.current.style.transform = "translateY(0px)";
          });
        }
      }, 2000);
    }
  }, [animations, showButtons]);

  const getAnimationDisplayName = (name) => {
    const nameMap = {
      Backflip: "Flip",
      Fall1: "Fall",
      Running: "Run",
      Wake_Up_and_Look_Up: "Wake",
      Walking: "Walk",
      Wave_One_Hand: "Wave",
      air_squat: "Squat",
    };
    return nameMap[name] || name;
  };

  const getAnimationIcon = (name) => {
    const iconMap = {
      Backflip: "🤸",
      Fall1: "💥",
      Running: "🏃",
      Wake_Up_and_Look_Up: "😴",
      Walking: "🚶",
      Wave_One_Hand: "👋",
      air_squat: "🏋️",
    };
    return iconMap[name] || "🎭";
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        shadows
        camera={{ position: [0, 2, 3.5], fov: 50 }}
        className="h-full w-full"
        style={{ backgroundColor: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />

        <AnimatedModel
          onAnimationsLoaded={setAnimations}
          playAnimRef={playAnimRef}
        />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>

      {/* Animation Controls - Sadece hover'da görün */}
      {showButtons && (
        <div
          ref={buttonContainerRef}
          className={`absolute bottom-2 left-1/2 z-10 -translate-x-1/2 transform transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 sm:opacity-30"
          }`}
        >
          {/* Mobile ve Desktop için tek çözüm - yatay scroll */}
          <div className="scrollbar-hide flex gap-1 overflow-x-auto px-2 pb-1 sm:gap-2">
            <div className="flex min-w-max gap-1 sm:gap-2">
              {animations.map((animation) => (
                <button
                  key={animation.name}
                  onClick={() =>
                    playAnimRef.current && playAnimRef.current(animation.name)
                  }
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-xs backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 active:scale-95 sm:h-8 sm:w-8 sm:text-sm md:h-10 md:w-10 md:text-base"
                  title={getAnimationDisplayName(animation.name)}
                >
                  {getAnimationIcon(animation.name)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Küçük ipucu - sadece desktop'ta görün */}
      <div className="pointer-events-none absolute right-1 bottom-0 hidden text-[10px] text-black/20 select-none lg:block">
        Hover
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
