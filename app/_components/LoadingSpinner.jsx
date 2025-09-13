import React from "react";

export default function LoadingSpinner({ progress }) {
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
          <h3 className="text-base font-semibold text-gray-800 md:text-lg">
            Loading 3D Model
          </h3>
          <p className="text-sm text-gray-600">
            Please wait while we prepare your experience...
          </p>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
