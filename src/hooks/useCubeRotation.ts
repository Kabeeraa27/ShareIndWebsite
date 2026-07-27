"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const DRAG_ROTATION_SPEED = Math.PI * 1.6; // radians per full viewport width dragged
const DRAG_CLICK_THRESHOLD = 10; // px of movement before a drag suppresses a click
const MOMENTUM_DAMPING = 0.94;
const MOMENTUM_EPSILON = 0.0004;
const SNAP_STEP = Math.PI / 2;

/**
 * Drives the cube group's rotation: static at rest (no idle spin, so tiles
 * stay put and are easy to aim at), direct drag-to-rotate, momentum + GSAP
 * snap-to-axis on release, and an imperative `focusToFront` used when a
 * tile is selected.
 */
export function useCubeRotation() {
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
    // A plain click on a tile also passes through here (see the pointerdown
    // capture listener below), but nothing actually rotated, so there's
    // nothing to settle — snapping here would just jump the cube out from
    // under the click.
    if (drag.current.totalMove <= DRAG_CLICK_THRESHOLD) return;
    const hadMomentum =
      Math.hypot(drag.current.velocityX, drag.current.velocityY) > MOMENTUM_EPSILON;
    if (hadMomentum && !reducedMotion) {
      momentumActive.current = true;
    } else {
      snapToNearestAxis();
    }
  }, [reducedMotion, snapToNearestAxis]);

  // Each front-face tile renders an HTML button (drei's <Html>) layered on
  // top of the canvas for its icon/label, which would otherwise swallow
  // pointerdown before it ever reaches the <canvas> element. Listening in
  // the capture phase on window (gated to the canvas's bounding box) lets
  // drag-start fire regardless of which DOM element is on top, while still
  // leaving the button's own bubble-phase click handler untouched.
  // The canvas itself has no mesh-level pointer interactivity in this app
  // (all clicks are handled by the DOM tile buttons), so it's kept
  // pointer-events:none — otherwise, with no `occlude="blending"` to force
  // that (we use raycast occlusion instead), the canvas sits on top of the
  // tile buttons for hit-testing and silently swallows every click.
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.pointerEvents = "none";
    canvas.style.position = "absolute";
    return () => {
      canvas.style.pointerEvents = "";
      canvas.style.position = "";
    };
  }, [gl]);

  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      if (isFocusedRef.current) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
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

    window.addEventListener("pointerdown", onPointerDown, { capture: true });
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
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
