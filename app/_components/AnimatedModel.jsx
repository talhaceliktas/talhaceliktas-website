import React, { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

let globalModelCache = {
  isLoaded: false,
  loadedAt: null,
};

export default function AnimatedModel({
  onAnimationsLoaded,
  playAnimRef,
  onModelReady,
}) {
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
