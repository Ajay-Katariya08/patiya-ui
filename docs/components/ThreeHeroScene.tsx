"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

export type GeometryMode = "icosahedron" | "torus" | "sphere";

export type ThreeHeroSceneProps = {
  isDark?: boolean;
  className?: string;
  showControls?: boolean;
};

function createStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const cx = 128;
    const cy = 128;

    ctx.clearRect(0, 0, 256, 256);

    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
    halo.addColorStop(0, "rgba(255, 255, 255, 1)");
    halo.addColorStop(0.08, "rgba(224, 242, 254, 0.95)");
    halo.addColorStop(0.2, "rgba(186, 230, 253, 0.6)");
    halo.addColorStop(0.42, "rgba(96, 165, 250, 0.2)");
    halo.addColorStop(0.7, "rgba(59, 130, 246, 0.05)");
    halo.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.fill();

    const rayCount = 24;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i * Math.PI) / rayCount;
      const rayLen = 50 + ((i * 29) % 40) + (i % 3 === 0 ? 30 : 0);
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
      ctx.lineWidth = i % 2 === 0 ? 1.4 : 0.8;
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
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-length * 0.88, 0);
      ctx.lineTo(length * 0.88, 0);
      ctx.stroke();

      ctx.restore();
    };

    drawDiffractionNeedle(Math.PI / 2, 124, 7, 0.98);
    drawDiffractionNeedle(Math.PI / 6, 110, 5.5, 0.92);
    drawDiffractionNeedle(-Math.PI / 6, 110, 5.5, 0.92);
    drawDiffractionNeedle(0, 72, 3, 0.4);

    ctx.save();
    ctx.translate(cx, cy);

    ctx.beginPath();
    const points = 6;
    const innerRadius = 12;
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const isTip = i % 2 === 0;
      let r = innerRadius;
      if (isTip) {
        const tipIndex = i / 2;
        r = tipIndex === 0 || tipIndex === 3 ? 48 : 39;
      }
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    const starPolyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 48);
    starPolyGrad.addColorStop(0, "#ffffff");
    starPolyGrad.addColorStop(0.45, "rgba(255, 255, 255, 0.96)");
    starPolyGrad.addColorStop(0.75, "rgba(224, 242, 254, 0.8)");
    starPolyGrad.addColorStop(1, "rgba(186, 230, 253, 0)");
    ctx.fillStyle = starPolyGrad;
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();

    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16);
    coreGrad.addColorStop(0, "#ffffff");
    coreGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.98)");
    coreGrad.addColorStop(0.65, "rgba(224, 242, 254, 0.7)");
    coreGrad.addColorStop(1, "rgba(186, 230, 253, 0)");
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function ThreeHeroScene({
  isDark = true,
  className = "",
  showControls = true,
}: ThreeHeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsTextRef = useRef<HTMLSpanElement>(null);

  const [mode, setMode] = useState<GeometryMode>("icosahedron");
  const [wireframeOnly, setWireframeOnly] = useState(false);

  const sceneContextRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    coreMesh: THREE.Mesh;
    wireMesh: THREE.LineSegments;
    innerMesh: THREE.Mesh;
    ring1: THREE.Mesh;
    ring2: THREE.Mesh;
    particles: THREE.Points;
    pointLight1: THREE.PointLight;
    pointLight2: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
    setThemeColors: (dark: boolean) => void;
    setGeometry: (newMode: GeometryMode) => void;
    setWireframe: (wf: boolean) => void;
    pulseParticles: () => void;
    destroy: () => void;
  } | null>(null);

  const modeRef = useRef(mode);
  modeRef.current = mode;

  const wireframeRef = useRef(wireframeOnly);
  wireframeRef.current = wireframeOnly;

  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const gl =
      canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "default" }) ||
      canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "default" });

    if (!gl) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl as WebGLRenderingContext,
        alpha: true,
        antialias: true,
        powerPreference: "default",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 4, 30);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3, 30);
    pointLight2.position.set(-5, -4, 3);
    scene.add(pointLight2);

    const group = new THREE.Group();
    scene.add(group);

    const getGeometries = (currentMode: GeometryMode) => {
      let coreGeo: THREE.BufferGeometry;
      if (currentMode === "torus") {
        coreGeo = new THREE.TorusGeometry(1.4, 0.45, 24, 48);
      } else if (currentMode === "sphere") {
        coreGeo = new THREE.SphereGeometry(1.6, 28, 28);
      } else {
        coreGeo = new THREE.IcosahedronGeometry(1.65, 2);
      }
      const wireGeo = new THREE.WireframeGeometry(coreGeo);
      const innerGeo = new THREE.IcosahedronGeometry(1.0, 1);
      return { coreGeo, wireGeo, innerGeo };
    };

    const initialGeos = getGeometries(modeRef.current);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: isDarkRef.current ? 0x0f172a : 0xf1f5f9,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.65,
    });
    const coreMesh = new THREE.Mesh(initialGeos.coreGeo, coreMaterial);
    group.add(coreMesh);

    const wireMaterial = new THREE.LineBasicMaterial({
      color: isDarkRef.current ? 0x60a5fa : 0x2563eb,
      transparent: true,
      opacity: isDarkRef.current ? 0.75 : 0.6,
      linewidth: 1,
    });
    const wireMesh = new THREE.LineSegments(initialGeos.wireGeo, wireMaterial);
    group.add(wireMesh);

    const innerMaterial = new THREE.MeshBasicMaterial({
      color: isDarkRef.current ? 0x3b82f6 : 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(initialGeos.innerGeo, innerMaterial);
    group.add(innerMesh);

    const ringGeo1 = new THREE.TorusGeometry(2.5, 0.015, 16, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isDarkRef.current ? 0x818cf8 : 0x4f46e5,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.9, 0.012, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isDarkRef.current ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 4;
    group.add(ring2);

    const particleCount = 320;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 2.4 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[idx] = x;
      particlePositions[idx + 1] = y;
      particlePositions[idx + 2] = z;

      particleOriginals[idx] = x;
      particleOriginals[idx + 1] = y;
      particleOriginals[idx + 2] = z;

      particleSpeeds[idx] = (Math.random() - 0.5) * 0.003;
      particleSpeeds[idx + 1] = (Math.random() - 0.5) * 0.003;
      particleSpeeds[idx + 2] = (Math.random() - 0.5) * 0.003;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlePositions, 3),
    );

    const starTexture = createStarTexture();

    const particleMaterial = new THREE.PointsMaterial({
      color: isDarkRef.current ? 0x93c5fd : 0x2563eb,
      size: 0.16,
      map: starTexture,
      transparent: true,
      opacity: isDarkRef.current ? 0.85 : 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isInteracting = false;
    let prevPointer = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isInteracting) {
        const deltaX = e.clientX - prevPointer.x;
        const deltaY = e.clientY - prevPointer.y;
        group.rotation.y += deltaX * 0.008;
        group.rotation.x += deltaY * 0.008;
        prevPointer = { x: e.clientX, y: e.clientY };
      }

      mouse.targetX = nx * 0.6;
      mouse.targetY = ny * 0.4;
    };

    const onPointerDown = (e: PointerEvent) => {
      isInteracting = true;
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isInteracting = false;
    };

    const onPointerLeave = () => {
      isInteracting = false;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const onCanvasClick = () => {
      pulseParticles();
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onCanvasClick);

    const pulseParticles = () => {
      const pos = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pos[idx] *= 1.25;
        pos[idx + 1] *= 1.25;
        pos[idx + 2] *= 1.25;
      }
      particleGeometry.attributes.position.needsUpdate = true;
    };

    const setThemeColors = (dark: boolean) => {
      if (dark) {
        ambientLight.intensity = 1.2;
        pointLight1.color.setHex(0x3b82f6);
        pointLight1.intensity = 4.0;
        pointLight2.color.setHex(0xa855f7);
        pointLight2.intensity = 3.0;

        coreMaterial.color.setHex(0x0f172a);
        coreMaterial.opacity = 0.65;
        wireMaterial.color.setHex(0x60a5fa);
        wireMaterial.opacity = 0.75;
        innerMaterial.color.setHex(0x3b82f6);
        innerMaterial.opacity = 0.35;
        ringMat1.color.setHex(0x818cf8);
        ringMat1.opacity = 0.35;
        ringMat2.color.setHex(0x38bdf8);
        ringMat2.opacity = 0.25;
        particleMaterial.color.setHex(0x93c5fd);
        particleMaterial.opacity = 0.75;
      } else {
        ambientLight.intensity = 1.8;
        pointLight1.color.setHex(0x2563eb);
        pointLight1.intensity = 2.5;
        pointLight2.color.setHex(0x6366f1);
        pointLight2.intensity = 2.0;

        coreMaterial.color.setHex(0xf8fafc);
        coreMaterial.opacity = 0.75;
        wireMaterial.color.setHex(0x2563eb);
        wireMaterial.opacity = 0.65;
        innerMaterial.color.setHex(0x1d4ed8);
        innerMaterial.opacity = 0.4;
        ringMat1.color.setHex(0x4f46e5);
        ringMat1.opacity = 0.3;
        ringMat2.color.setHex(0x0284c7);
        ringMat2.opacity = 0.22;
        particleMaterial.color.setHex(0x2563eb);
        particleMaterial.opacity = 0.55;
      }
    };

    const setGeometry = (newMode: GeometryMode) => {
      const geos = getGeometries(newMode);
      coreMesh.geometry.dispose();
      wireMesh.geometry.dispose();
      innerMesh.geometry.dispose();

      coreMesh.geometry = geos.coreGeo;
      wireMesh.geometry = geos.wireGeo;
      innerMesh.geometry = geos.innerGeo;
    };

    const setWireframe = (wf: boolean) => {
      coreMesh.visible = !wf;
    };

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
    let frameCount = 0;
    let lastFpsUpdate = lastTime;

    const render = (now: number) => {
      if (!isVisible || document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      frameCount++;
      if (now - lastFpsUpdate >= 500) {
        const fps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
        if (fpsTextRef.current) {
          fpsTextRef.current.textContent = `${fps} FPS`;
        }
        frameCount = 0;
        lastFpsUpdate = now;
      }

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 2.2;
      camera.position.y = mouse.y * 1.8;
      camera.lookAt(0, 0, 0);

      group.rotation.y += 0.35 * delta;
      group.rotation.x += 0.18 * delta;

      ring1.rotation.z += 0.25 * delta;
      ring2.rotation.z -= 0.3 * delta;

      const scale = 1 + Math.sin(now * 0.0018) * 0.035;
      group.scale.set(scale, scale, scale);

      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx] += particleSpeeds[idx];
        positions[idx + 1] += particleSpeeds[idx + 1];
        positions[idx + 2] += particleSpeeds[idx + 2];

        const ox = particleOriginals[idx];
        const oy = particleOriginals[idx + 1];
        const oz = particleOriginals[idx + 2];

        positions[idx] += (ox - positions[idx]) * 0.02;
        positions[idx + 1] += (oy - positions[idx + 1]) * 0.02;
        positions[idx + 2] += (oz - positions[idx + 2]) * 0.02;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      particles.rotation.y += 0.08 * delta;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const destroy = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("click", onCanvasClick);

      coreMesh.geometry.dispose();
      wireMesh.geometry.dispose();
      innerMesh.geometry.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeometry.dispose();

      coreMaterial.dispose();
      wireMaterial.dispose();
      innerMaterial.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleMaterial.dispose();
      starTexture.dispose();

      renderer.dispose();
    };

    sceneContextRef.current = {
      renderer,
      scene,
      camera,
      coreMesh,
      wireMesh,
      innerMesh,
      ring1,
      ring2,
      particles,
      pointLight1,
      pointLight2,
      ambientLight,
      setThemeColors,
      setGeometry,
      setWireframe,
      pulseParticles,
      destroy,
    };

    return () => {
      destroy();
      sceneContextRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneContextRef.current?.setThemeColors(isDark);
  }, [isDark]);

  const handleModeChange = useCallback((newMode: GeometryMode) => {
    setMode(newMode);
    sceneContextRef.current?.setGeometry(newMode);
  }, []);

  const handleToggleWireframe = useCallback(() => {
    setWireframeOnly((prev) => {
      const next = !prev;
      sceneContextRef.current?.setWireframe(next);
      return next;
    });
  }, []);

  const handlePulse = useCallback(() => {
    sceneContextRef.current?.pulseParticles();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full outline-none cursor-grab active:cursor-grabbing"
      />

      {showControls && (
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 z-20 flex flex-wrap items-center justify-between sm:justify-end gap-2 text-xs pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/75 backdrop-blur-md shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span
              ref={fpsTextRef}
              className="font-mono text-[10px] text-[var(--patiya-color-muted-foreground)] font-semibold"
            >
              60 FPS
            </span>
            <span className="text-[var(--patiya-color-border)]">•</span>
            <span className="font-mono text-[10px] text-[var(--patiya-color-foreground)]">
              Three.js
            </span>
          </div>

          <div className="flex items-center gap-1 p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/85 backdrop-blur-md shadow-xs">
            <button
              type="button"
              onClick={() => handleModeChange("icosahedron")}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                mode === "icosahedron"
                  ? "bg-[var(--patiya-color-primary)] text-white"
                  : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
              }`}
            >
              Core
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("torus")}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                mode === "torus"
                  ? "bg-[var(--patiya-color-primary)] text-white"
                  : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
              }`}
            >
              Vortex
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("sphere")}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                mode === "sphere"
                  ? "bg-[var(--patiya-color-primary)] text-white"
                  : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
              }`}
            >
              Sphere
            </button>

            <button
              type="button"
              onClick={handleToggleWireframe}
              title="Toggle Wireframe Mode"
              className={`px-1.5 py-0.5 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                wireframeOnly
                  ? "bg-[var(--patiya-color-primary)]/20 text-[var(--patiya-color-primary)] font-bold"
                  : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
              }`}
            >
              Grid
            </button>

            <button
              type="button"
              onClick={handlePulse}
              title="Trigger Particle Wave"
              className="px-1.5 py-0.5 rounded-lg text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-primary)] transition-colors cursor-pointer"
            >
              Pulse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
