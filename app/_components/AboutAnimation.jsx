import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Scene from "./Scene";
import LoadingSpinner from "./LoadingSpinner";
import CameraControls from "./CameraControls";
import AnimationButtons from "./AnimationButtons";
import useLoading from "../hooks/useLoading";

export default function AboutAnimation() {
  const [animations, setAnimations] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const playAnimRef = useRef();
  const orbitControlsRef = useRef();

  const { isLoading, loadingProgress, handleModelReady } = useLoading();

  useEffect(() => {
    if (animations.length > 0 && !showButtons && !isLoading) {
      const timer = setTimeout(() => {
        setShowButtons(true);
        toast(
          "Use animation buttons and camera controls to interact with the 3D character",
          {
            icon: "🔥",
            duration: 3,
          },
        );
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [animations, showButtons, isLoading]);

  return (
    <div className="relative flex h-full w-full flex-col">
      <Scene
        animations={animations}
        setAnimations={setAnimations}
        playAnimRef={playAnimRef}
        onModelReady={handleModelReady}
        orbitControlsRef={orbitControlsRef}
      />

      {isLoading && <LoadingSpinner progress={loadingProgress} />}

      <CameraControls
        orbitControlsRef={orbitControlsRef}
        showButtons={showButtons}
        isLoading={isLoading}
      />

      <AnimationButtons
        animations={animations}
        playAnimRef={playAnimRef}
        showButtons={showButtons}
        isLoading={isLoading}
      />
    </div>
  );
}
