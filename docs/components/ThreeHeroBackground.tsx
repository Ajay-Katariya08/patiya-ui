"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ThreeHeroBackgroundProps = {
  isDark?: boolean;
  className?: string;
};

function createStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const cx = 256;
    const cy = 256;

    ctx.clearRect(0, 0, 512, 512);

    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 240);
    halo.addColorStop(0, "rgba(255, 255, 255, 1)");
    halo.addColorStop(0.08, "rgba(224, 242, 254, 0.95)");
    halo.addColorStop(0.2, "rgba(186, 230, 253, 0.6)");
    halo.addColorStop(0.42, "rgba(96, 165, 250, 0.2)");
    halo.addColorStop(0.7, "rgba(59, 130, 246, 0.05)");
    halo.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, 240, 0, Math.PI * 2);
    ctx.fill();

    const rayCount = 36;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i * Math.PI) / rayCount;
      const rayLen = 95 + ((i * 47) % 75) + (i % 3 === 0 ? 55 : 0);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const rayGrad = ctx.createLinearGradient(-rayLen, 0, rayLen, 0);
      rayGrad.addColorStop(0, "rgba(147, 197, 253, 0)");
      rayGrad.addColorStop(0.35, "rgba(186, 230, 253, 0.12)");
      rayGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.35)");
      rayGrad.addColorStop(0.65, "rgba(186, 230, 253, 0.12)");
      rayGrad.addColorStop(1, "rgba(147, 197, 253, 0)");
      ctx.strokeStyle = rayGrad;
      ctx.lineWidth = i % 2 === 0 ? 1.8 : 1.0;
      ctx.beginPath();
      ctx.moveTo(-rayLen, 0);
      ctx.lineTo(rayLen, 0);
      ctx.stroke();
      ctx.restore();
    }

    const drawDiffractionNeedle = (
      angleRad: number,
      length: number,
      halfWidth: number,
      peakAlpha: number
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angleRad);

      const grad = ctx.createLinearGradient(-length, 0, length, 0);
      grad.addColorStop(0, "rgba(147, 197, 253, 0)");
      grad.addColorStop(0.2, `rgba(186, 230, 253, ${peakAlpha * 0.4})`);
      grad.addColorStop(0.5, `rgba(255, 255, 255, ${peakAlpha})`);
      grad.addColorStop(0.8, `rgba(186, 230, 253, ${peakAlpha * 0.4})`);
      grad.addColorStop(1, "rgba(147, 197, 253, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(-length, 0);
      ctx.quadraticCurveTo(0, halfWidth, length, 0);
      ctx.quadraticCurveTo(0, -halfWidth, -length, 0);
      ctx.closePath();
      ctx.fill();

      const coreGrad = ctx.createLinearGradient(-length * 0.88, 0, length * 0.88, 0);
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGrad.addColorStop(0.5, `rgba(255, 255, 255, ${Math.min(1, peakAlpha + 0.1)})`);
      coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.strokeStyle = coreGrad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-length * 0.88, 0);
      ctx.lineTo(length * 0.88, 0);
      ctx.stroke();

      ctx.restore();
    };

    drawDiffractionNeedle(Math.PI / 2, 248, 14, 0.98);
    drawDiffractionNeedle(Math.PI / 6, 220, 11, 0.92);
    drawDiffractionNeedle(-Math.PI / 6, 220, 11, 0.92);
    drawDiffractionNeedle(0, 145, 6, 0.4);

    ctx.save();
    ctx.translate(cx, cy);

    ctx.beginPath();
    const points = 6;
    const innerRadius = 24;
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const isTip = i % 2 === 0;
      let r = innerRadius;
      if (isTip) {
        const tipIndex = i / 2;
        r = tipIndex === 0 || tipIndex === 3 ? 95 : 78;
      }
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    const starPolyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 95);
    starPolyGrad.addColorStop(0, "#ffffff");
    starPolyGrad.addColorStop(0.45, "rgba(255, 255, 255, 0.96)");
    starPolyGrad.addColorStop(0.75, "rgba(224, 242, 254, 0.8)");
    starPolyGrad.addColorStop(1, "rgba(186, 230, 253, 0)");
    ctx.fillStyle = starPolyGrad;
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();

    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
    coreGrad.addColorStop(0, "#ffffff");
    coreGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.98)");
    coreGrad.addColorStop(0.65, "rgba(224, 242, 254, 0.7)");
    coreGrad.addColorStop(1, "rgba(186, 230, 253, 0)");
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const cx = 16;
    const cy = 16;
    ctx.clearRect(0, 0, 32, 32);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.35, "rgba(255, 255, 255, 0.85)");
    grad.addColorStop(0.7, "rgba(255, 255, 255, 0.2)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function ThreeHeroBackground({
  isDark = true,
  className = "",
}: ThreeHeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  const updateThemeRef = useRef<((dark: boolean) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 5.5, 11);
    camera.lookAt(0, 0, 0);

    const gl =
      canvas.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "default" }) ||
      canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "default" });

    if (!gl) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl as WebGLRenderingContext,
        alpha: true,
        antialias: false,
        powerPreference: "default",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    const starTexture = createStarTexture();
    const circleTexture = createCircleTexture();

    const cols = 55;
    const rows = 45;
    const count = cols * rows;
    const spacingX = 0.55;
    const spacingZ = 0.55;

    const positions = new Float32Array(count * 3);

    let idx = 0;
    const offsetX = ((cols - 1) * spacingX) / 2;
    const offsetZ = ((rows - 1) * spacingZ) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacingX - offsetX;
        const z = r * spacingZ - offsetZ;
        const y = 0;

        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;
        idx += 3;
      }
    }

    const gridGeometry = new THREE.BufferGeometry();
    gridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    const gridMaterial = new THREE.PointsMaterial({
      color: isDarkRef.current ? 0x3b82f6 : 0x2563eb,
      size: 0.08,
      map: circleTexture,
      transparent: true,
      opacity: isDarkRef.current ? 0.6 : 0.4,
      blending: isDarkRef.current ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const gridPoints = new THREE.Points(gridGeometry, gridMaterial);
    scene.add(gridPoints);

    const starCount = 16;
    const starPositions = new Float32Array(starCount * 3);
    const starBaseY = new Float32Array(starCount);
    const starFloatSpeed = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const sIdx = i * 3;
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 11 + 3.2;
      const z = (Math.random() - 0.5) * 16 - 1;

      starPositions[sIdx] = x;
      starPositions[sIdx + 1] = y;
      starPositions[sIdx + 2] = z;

      starBaseY[i] = y;
      starFloatSpeed[i] = 0.4 + Math.random() * 0.6;
      starPhases[i] = Math.random() * Math.PI * 2;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );

    const starMaterial = new THREE.PointsMaterial({
      color: isDarkRef.current ? 0xffffff : 0x60a5fa,
      size: 0.38,
      map: starTexture,
      transparent: true,
      opacity: isDarkRef.current ? 0.95 : 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    const dustCount = 85;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const dIdx = i * 3;
      dustPositions[dIdx] = (Math.random() - 0.5) * 28;
      dustPositions[dIdx + 1] = (Math.random() - 0.5) * 14 + 3;
      dustPositions[dIdx + 2] = (Math.random() - 0.5) * 18 - 2;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(dustPositions, 3),
    );

    const dustMaterial = new THREE.PointsMaterial({
      color: isDarkRef.current ? 0xe0f2fe : 0x3b82f6,
      size: 0.04,
      map: circleTexture,
      transparent: true,
      opacity: isDarkRef.current ? 0.75 : 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, worldX: 0, worldZ: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.targetX = nx;
      pointer.targetY = ny;
      pointer.worldX = nx * 10;
      pointer.worldZ = -ny * 7;
    };

    const host = container.parentElement ?? container;
    host.addEventListener("pointermove", onPointerMove as EventListener, {
      passive: true,
    });

    const updateTheme = (dark: boolean) => {
      if (dark) {
        gridMaterial.color.setHex(0x3b82f6);
        gridMaterial.opacity = 0.6;
        gridMaterial.blending = THREE.AdditiveBlending;
        starMaterial.color.setHex(0xffffff);
        starMaterial.opacity = 0.95;
        dustMaterial.color.setHex(0xe0f2fe);
        dustMaterial.opacity = 0.75;
      } else {
        gridMaterial.color.setHex(0x2563eb);
        gridMaterial.opacity = 0.4;
        gridMaterial.blending = THREE.NormalBlending;
        starMaterial.color.setHex(0x60a5fa);
        starMaterial.opacity = 0.75;
        dustMaterial.color.setHex(0x3b82f6);
        dustMaterial.opacity = 0.45;
      }
      gridMaterial.needsUpdate = true;
      starMaterial.needsUpdate = true;
      dustMaterial.needsUpdate = true;
    };

    updateThemeRef.current = updateTheme;

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    let rafId: number | null = null;
    let lastTime = performance.now();

    const animate = (now: number) => {
      if (!isVisible || document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      pointer.x += (pointer.targetX - pointer.x) * 0.04;
      pointer.y += (pointer.targetY - pointer.y) * 0.04;

      camera.position.x = pointer.x * 1.5;
      camera.position.y = 5.5 + pointer.y * 0.8;
      camera.lookAt(0, 0, 0);

      const pos = gridGeometry.attributes.position.array as Float32Array;
      const t = now * 0.0018;

      let pIdx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = pos[pIdx];
          const z = pos[pIdx + 2];

          const wave1 = Math.sin(x * 0.5 + t) * 0.4;
          const wave2 = Math.cos(z * 0.6 + t * 0.8) * 0.35;
          const ripple = Math.sin(Math.hypot(x, z) * 0.8 - t * 1.5) * 0.25;

          const dx = x - pointer.worldX;
          const dz = z - pointer.worldZ;
          const distSq = dx * dx + dz * dz;
          const mouseLift = Math.exp(-distSq * 0.18) * 0.9;

          pos[pIdx + 1] = wave1 + wave2 + ripple + mouseLift;
          pIdx += 3;
        }
      }
      gridGeometry.attributes.position.needsUpdate = true;

      const sPos = starGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        const sI = i * 3;
        sPos[sI + 1] = starBaseY[i] + Math.sin(t * starFloatSpeed[i] + starPhases[i]) * 0.35;
      }
      starGeometry.attributes.position.needsUpdate = true;
      starPoints.rotation.y = t * 0.015;
      dustPoints.rotation.y = t * 0.008;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove as EventListener);

      gridGeometry.dispose();
      starGeometry.dispose();
      dustGeometry.dispose();
      gridMaterial.dispose();
      starMaterial.dispose();
      dustMaterial.dispose();
      starTexture.dispose();
      circleTexture.dispose();

      renderer.dispose();
      updateThemeRef.current = null;
    };
  }, []);

  useEffect(() => {
    updateThemeRef.current?.(isDark);
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full outline-none" />
    </div>
  );
}
