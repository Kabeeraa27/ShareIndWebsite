"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const IDLE_SPEED = 0.12; // radians/sec
const DRAG_ROTATION_SPEED = Math.PI * 1.6; // radians per full viewport width dragged
const DRAG_CLICK_THRESHOLD = 6; // px of movement before a drag suppresses a click
const MOMENTUM_DAMPING = 0.94;
const MOMENTUM_EPSILON = 0.0004;
const SNAP_STEP = Math.PI / 2;

interface UseCubeRotationOptions {
  /** Pauses idle auto-rotation (hover, open panel, etc). Drag still works. */
  paused: boolean;
}

/**
 * Drives the cube group's rotation: slow idle spin at rest, direct
 * drag-to-rotate, momentum + GSAP snap-to-axis on release, and an
 * imperative `focusToFront` used when a tile is selected.
 */
export function useCubeRotation({ paused }: UseCubeRotationOptions) {
  const groupRef = useRef<THREE.Group>(null!);
  const reducedMotion = usePrefersReducedMotion();
  const { gl } = useThree();

  const drag = useRef({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    totalMove: 0,
    velocityX: 0,
    velocityY: 0,
  });
  const wasDraggingRef = useRef(false);
  const momentumActive = useRef(false);
  const snapTween = useRef<gsap.core.Tween | null>(null);
  const focusTween = useRef<gsap.core.Tween | null>(null);
  const isFocusedRef = useRef(false);

  const snapToNearestAxis = useCallback(() => {
    const group = groupRef.current;
    if (!group) return;
    const targetX = Math.round(group.rotation.x / SNAP_STEP) * SNAP_STEP;
    const targetY = Math.round(group.rotation.y / SNAP_STEP) * SNAP_STEP;
    const startQuat = group.quaternion.clone();
    const targetQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(targetX, targetY, group.rotation.z)
    );
    const proxy = { t: 0 };
    snapTween.current?.kill();
    snapTween.current = gsap.to(proxy, {
      t: 1,
      duration: reducedMotion ? 0.15 : 0.6,
      ease: "power3.out",
      onUpdate: () => group.quaternion.slerpQuaternions(startQuat, targetQuat, proxy.t),
    });
  }, [reducedMotion]);

  const endDrag = useCallback(() => {
    if (!drag.current.isDragging) return;
    drag.current.isDragging = false;
    const hadMomentum =
      Math.hypot(drag.current.velocityX, drag.current.velocityY) > MOMENTUM_EPSILON;
    if (hadMomentum && !reducedMotion) {
      momentumActive.current = true;
    } else {
      snapToNearestAxis();
    }
  }, [reducedMotion, snapToNearestAxis]);

  // Drag listeners live on the actual WebGL canvas (pointerdown) and the
  // window (move/up), so a drag started on the cube keeps tracking even if
  // the pointer strays outside the canvas bounds mid-gesture.
  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      if (isFocusedRef.current) return;
      drag.current.isDragging = true;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      drag.current.totalMove = 0;
      drag.current.velocityX = 0;
      drag.current.velocityY = 0;
      wasDraggingRef.current = false;
      momentumActive.current = false;
      snapTween.current?.kill();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current.isDragging || !groupRef.current) return;
      const dx = e.clientX - drag.current.lastX;
      const dy = e.clientY - drag.current.lastY;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      drag.current.totalMove += Math.abs(dx) + Math.abs(dy);
      if (drag.current.totalMove > DRAG_CLICK_THRESHOLD) {
        wasDraggingRef.current = true;
      }
      const deltaYaw = (dx / window.innerWidth) * DRAG_ROTATION_SPEED;
      const deltaPitch = (dy / window.innerHeight) * DRAG_ROTATION_SPEED;
      groupRef.current.rotation.y += deltaYaw;
      groupRef.current.rotation.x += deltaPitch;
      drag.current.velocityX = deltaYaw;
      drag.current.velocityY = deltaPitch;
    };

    const onPointerUp = () => endDrag();

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [gl, endDrag]);

  useFrame((_, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 1 / 30);
    const frameScale = delta * 60;

    if (drag.current.isDragging || isFocusedRef.current) return;

    if (momentumActive.current) {
      group.rotation.y += drag.current.velocityX * frameScale;
      group.rotation.x += drag.current.velocityY * frameScale;
      drag.current.velocityX *= MOMENTUM_DAMPING;
      drag.current.velocityY *= MOMENTUM_DAMPING;
      if (Math.hypot(drag.current.velocityX, drag.current.velocityY) < MOMENTUM_EPSILON) {
        momentumActive.current = false;
        snapToNearestAxis();
      }
      return;
    }

    if (!paused && !reducedMotion) {
      group.rotation.y += IDLE_SPEED * delta;
    }
  });

  /** Rotates the cube so the interactive front face points straight at the camera. */
  const focusToFront = useCallback(
    (duration = 0.9) =>
      new Promise<void>((resolve) => {
        const group = groupRef.current;
        if (!group) return resolve();
        isFocusedRef.current = true;
        momentumActive.current = false;
        snapTween.current?.kill();

        const localNormal = new THREE.Vector3(0, 0, 1);
        const currentWorldNormal = localNormal.clone().applyQuaternion(group.quaternion).normalize();
        const targetVec = new THREE.Vector3(0, 0, 1);
        const deltaQuat = new THREE.Quaternion().setFromUnitVectors(currentWorldNormal, targetVec);
        const startQuat = group.quaternion.clone();
        const targetQuat = deltaQuat.multiply(startQuat).normalize();

        const proxy = { t: 0 };
        focusTween.current?.kill();
        focusTween.current = gsap.to(proxy, {
          t: 1,
          duration: reducedMotion ? 0.2 : duration,
          ease: "power3.inOut",
          onUpdate: () => group.quaternion.slerpQuaternions(startQuat, targetQuat, proxy.t),
          onComplete: () => resolve(),
        });
      }),
    [reducedMotion]
  );

  const releaseFocus = useCallback(() => {
    isFocusedRef.current = false;
  }, []);

  return { groupRef, wasDraggingRef, focusToFront, releaseFocus };
}
