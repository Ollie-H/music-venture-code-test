import { useCallback, useEffect, EffectCallback } from "react";

export const useDebouncedEffect = (effect: EffectCallback, delay: number, deps: ReadonlyArray<any>) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export default useDebouncedEffect;
