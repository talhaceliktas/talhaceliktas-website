import React from "react";

export default function AnimationButtons({
  animations,
  playAnimRef,
  showButtons,
  isLoading,
}) {
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

  if (!showButtons || isLoading) return null;

  return (
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
  );
}
