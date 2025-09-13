import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import toast from "react-hot-toast";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

let globalModelCache = {
  isLoaded: false,
  loadedAt: null,
};

function AnimatedModel({ onAnimationsLoaded, playAnimRef, onModelReady }) {
  const { scene, animations } = useLoader(GLTFLoader, "/my3d.glb", (loader) => {
    if (!globalModelCache.isLoaded) {
      loader.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        const percentage = Math.round((itemsLoaded / itemsTotal) * 100);
        console.log("Loading progress:", percentage + "%");
      };
    }

    loader.manager.onLoad = () => {
      globalModelCache.isLoaded = true;
      globalModelCache.loadedAt = Date.now();
    };
  });

  const mixer = useRef();
  const clock = useRef(new THREE.Clock());
  const [currentAction, setCurrentAction] = useState(null);

  useEffect(() => {
    if (scene) {
      onModelReady?.();
    }
  }, [scene, onModelReady]);

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

function LoadingSpinner({ progress }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Loading 3D Model
          </h3>
          <p className="text-sm text-gray-600">
            Please wait while we prepare your experience...
          </p>
        </div>

        <div className="h-2 w-64 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function AboutAnimation() {
  const [animations, setAnimations] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const playAnimRef = useRef();
  const progressInterval = useRef(null);

  useEffect(() => {
    if (globalModelCache.isLoaded) {
      setLoadingProgress(100);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setLoadingProgress(0);

      let progress = 0;
      progressInterval.current = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 90) {
          progress = 90;
          clearInterval(progressInterval.current);
        }
        setLoadingProgress(Math.min(progress, 90));
      }, 100);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const handleModelReady = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setLoadingProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (animations.length > 0 && !showButtons && !isLoading) {
      const timer = setTimeout(() => {
        setShowButtons(true);
        toast(
          "You can switch the character's animations with the buttons or rotate the camera",
          {
            icon: "🔥",
            duration: 3,
          },
        );
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [animations, showButtons, isLoading]);

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
            onModelReady={handleModelReady}
          />
          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={4}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>

      {isLoading && <LoadingSpinner progress={loadingProgress} />}

      {showButtons && !isLoading && (
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
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white/90 text-sm shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-md active:scale-95 md:h-8 md:w-8"
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
