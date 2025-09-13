import React from "react";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
      <div className="flex space-x-2">
        <span className="bg-primary-400 h-4 w-4 animate-bounce rounded-full [animation-delay:-0.3s]"></span>
        <span className="bg-primary-400 h-4 w-4 animate-bounce rounded-full [animation-delay:-0.15s]"></span>
        <span className="bg-primary-400 h-4 w-4 animate-bounce rounded-full"></span>
      </div>

      <p className="text-primary-400 text-lg font-medium">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
