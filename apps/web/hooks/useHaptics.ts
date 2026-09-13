import { useCallback } from "react";

export function useHaptics() {
  const vibrate = useCallback((duration: number = 50) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(duration);
    }
  }, []);

  return { vibrate };
}