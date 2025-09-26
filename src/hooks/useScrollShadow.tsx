import { useState, RefObject, useEffect, useCallback } from "react";

export function useScrollShadow(ref: RefObject<HTMLElement | null>) {
  const [shadowState, setShadowState] = useState({
    showTopShadow: false,
    showBottomShadow: false,
  });

  const updateShadowState = useCallback(() => {
    if (ref.current == null) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = ref.current;

    const showTopShadow = scrollTop > 0;

    const showBottomShadow = scrollTop + clientHeight < scrollHeight;

    setShadowState({
      showTopShadow,
      showBottomShadow,
    });
  }, [ref]);

  useEffect(() => {
    const timer = setTimeout(updateShadowState, 100);

    return () => clearTimeout(timer);
  }, [updateShadowState]);

  return { shadowState, updateShadowState };
}
