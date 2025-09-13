import { useState, useEffect, useRef } from "react";

export const globalModelCache = {
  isLoaded: false,
  loadedAt: null,
};

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
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

  return {
    isLoading,
    loadingProgress,
    handleModelReady,
  };
}
