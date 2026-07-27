"use client";

import { useCallback, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";

/**
 * Tracks hover state for a 3D mesh and mirrors it onto the CSS cursor,
 * so a hovered cube tile feels like a real, clickable UI element.
 */
export function useHover(onChange?: (hovered: boolean) => void) {
  const [hovered, setHovered] = useState(false);

  const onPointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(true);
      onChange?.(true);
      document.body.style.cursor = "pointer";
    },
    [onChange]
  );

  const onPointerOut = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(false);
      onChange?.(false);
      document.body.style.cursor = "auto";
    },
    [onChange]
  );

  return { hovered, onPointerOver, onPointerOut };
}
