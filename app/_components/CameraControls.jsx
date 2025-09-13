import React from "react";
import * as THREE from "three";

export default function CameraControls({
  orbitControlsRef,
  showButtons,
  isLoading,
}) {
  const zoomIn = () => {
    if (orbitControlsRef.current) {
      const controls = orbitControlsRef.current;
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(
        controls.object.position.clone().sub(controls.target),
      );
      spherical.radius = Math.max(spherical.radius * 0.8, controls.minDistance);
      const newPosition = new THREE.Vector3()
        .setFromSpherical(spherical)
        .add(controls.target);
      controls.object.position.copy(newPosition);
      controls.update();
    }
  };

  const zoomOut = () => {
    if (orbitControlsRef.current) {
      const controls = orbitControlsRef.current;
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(
        controls.object.position.clone().sub(controls.target),
      );
      spherical.radius = Math.min(
        spherical.radius * 1.25,
        controls.maxDistance,
      );
      const newPosition = new THREE.Vector3()
        .setFromSpherical(spherical)
        .add(controls.target);
      controls.object.position.copy(newPosition);
      controls.update();
    }
  };

  const rotateLeft = () => {
    if (orbitControlsRef.current) {
      const controls = orbitControlsRef.current;
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(
        controls.object.position.clone().sub(controls.target),
      );
      spherical.theta += Math.PI / 6;
      const newPosition = new THREE.Vector3()
        .setFromSpherical(spherical)
        .add(controls.target);
      controls.object.position.copy(newPosition);
      controls.update();
    }
  };

  const rotateRight = () => {
    if (orbitControlsRef.current) {
      const controls = orbitControlsRef.current;
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(
        controls.object.position.clone().sub(controls.target),
      );
      spherical.theta -= Math.PI / 6;
      const newPosition = new THREE.Vector3()
        .setFromSpherical(spherical)
        .add(controls.target);
      controls.object.position.copy(newPosition);
      controls.update();
    }
  };

  if (!showButtons || isLoading) return null;

  return (
    <div className="absolute bottom-28 left-1/2 flex -translate-x-1/2 gap-2 md:top-4 md:right-4 md:left-auto md:translate-x-0 md:flex-col">
      <div className="flex flex-col gap-1 rounded-lg bg-white/80 p-2 shadow-md backdrop-blur-sm">
        <button
          onClick={zoomIn}
          className="flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-white/90 text-sm font-bold shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-md active:scale-95 md:h-10 md:w-10 md:text-lg"
          title="Zoom In"
          aria-label="Zoom camera in"
        >
          ➕
        </button>
        <button
          onClick={zoomOut}
          className="flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-white/90 text-sm font-bold shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-md active:scale-95 md:h-10 md:w-10 md:text-lg"
          title="Zoom Out"
          aria-label="Zoom camera out"
        >
          ➖
        </button>
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-white/80 p-2 shadow-md backdrop-blur-sm">
        <button
          onClick={rotateLeft}
          className="flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-white/90 text-sm font-bold shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-md active:scale-95 md:h-10 md:w-10 md:text-lg"
          title="Rotate Left"
          aria-label="Rotate camera left"
        >
          ⬅️
        </button>
        <button
          onClick={rotateRight}
          className="flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-white/90 text-sm font-bold shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-md active:scale-95 md:h-10 md:w-10 md:text-lg"
          title="Rotate Right"
          aria-label="Rotate camera right"
        >
          ➡️
        </button>
      </div>
    </div>
  );
}
