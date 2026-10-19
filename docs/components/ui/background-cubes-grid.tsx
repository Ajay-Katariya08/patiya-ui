"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SIM_HZ = 60;
const STEP = 1 / SIM_HZ;
const BRUSH_RADIUS = 1.1;
const PUSH_PER_CELL = 0.16;

export type IsometricCubesProps = {
  variant?: "isometric";
  className?: string;
  cellSize?: number;
  gap?: number;
  topColor?: string;
  leftColor?: string;
  rightColor?: string;
  amplitude?: number;
  speed?: number;
  damping?: number;
  idleRipples?: boolean;
  idleDelay?: number;
  glowColor?: string;
  glow?: number;
};

const isoVertexShader = `
  attribute vec2 aOffset;
  attribute float aHeight;
  attribute float aGlow;
  uniform float uAmplitude;
  varying vec3 vNormal;
  varying float vHeight;
  varying float vGlow;
  varying float vDepth;

  void main() {
    vec3 p = position;
    p.xz += aOffset;
    float x = aHeight;
    vHeight = mix( x * 1.5, tanh( x ), smoothstep( -0.6, 0.6, x ) );
    p.y += vHeight * uAmplitude;
    vNormal = normal;
    vGlow = aGlow;
    vDepth = position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
  }
`;

const isoFragmentShader = `
  uniform vec3 uTop;
  uniform vec3 uLeft;
  uniform vec3 uRight;
  uniform vec3 uGlowColor;
  uniform float uGlow;
  varying vec3 vNormal;
  varying float vHeight;
  varying float vGlow;
  varying float vDepth;

  void main() {
    bool isTop = vNormal.y > 0.5;
    vec3 color = isTop ? uTop : ( abs( vNormal.x ) > 0.5 ? uLeft : uRight );
    if ( isTop ) color = mix( color, uLeft, clamp( -vHeight, 0.0, 1.0 ) * 0.6 );

    float glow = clamp( vGlow * uGlow, 0.0, 1.0 );
    float falloff = isTop ? 0.2 : exp( vDepth * 1.6 ) * 0.6;
    color = mix( color, uGlowColor, glow * falloff );

    gl_FragColor = vec4( color, 1.0 );
    #include <colorspace_fragment>
  }
`;

function createIsometricScene(
  canvas: HTMLCanvasElement,
  container: HTMLDivElement,
  options: Required<Omit<IsometricCubesProps, "className" | "variant">>,
) {
  const {
    cellSize,
    gap,
    topColor,
    leftColor,
    rightColor,
    amplitude,
    speed,
    damping,
    idleRipples,
    idleDelay,
    glowColor,
    glow,
  } = options;

  const c2 = Math.min((speed / SIM_HZ) ** 2, 0.5);
  const flowDrag = -Math.log(Math.min(Math.max(damping, 1e-4), 1));
  const settleDrag = -Math.log(0.01);
  const flowPull = 0.8;
  const settlePull = 4.0;
  const SETTLE_AFTER = 0.15;
  const SETTLE_RAMP = 0.6;

  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return { dispose: () => {} };

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl,
      antialias: false,
      powerPreference: "low-power",
    });
  } catch {
    return { dispose: () => {} };
  }
  renderer.setPixelRatio(1);
  renderer.setClearColor(topColor);
  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);

  const material = new THREE.ShaderMaterial({
    vertexShader: isoVertexShader,
    fragmentShader: isoFragmentShader,
    uniforms: {
      uAmplitude: { value: amplitude },
      uTop: { value: new THREE.Color(topColor) },
      uLeft: { value: new THREE.Color(leftColor) },
      uRight: { value: new THREE.Color(rightColor) },
      uGlowColor: { value: new THREE.Color(glowColor) },
      uGlow: { value: glow },
    },
  });

  let size = 0;
  let height = new Float32Array(0);
  let velocity = new Float32Array(0);
  let lastHeight = new Float32Array(0);
  let glowField = new Float32Array(0);
  let geometry: THREE.InstancedBufferGeometry | null = null;
  let heightAttribute: THREE.InstancedBufferAttribute | null = null;
  let glowAttribute: THREE.InstancedBufferAttribute | null = null;
  let mesh: THREE.Mesh | null = null;

  const build = (count: number) => {
    if (mesh) scene.remove(mesh);
    geometry?.dispose();
    size = count;
    height = new Float32Array(size * size);
    velocity = new Float32Array(size * size);
    lastHeight = new Float32Array(size * size);
    glowField = new Float32Array(size * size);

    const box = new THREE.BoxGeometry(1 - gap, 16, 1 - gap).translate(0, -8, 0);
    geometry = new THREE.InstancedBufferGeometry();
    geometry.index = box.index;
    geometry.setAttribute("position", box.getAttribute("position"));
    geometry.setAttribute("normal", box.getAttribute("normal"));

    const offsets = new Float32Array(size * size * 2);
    const half = (size - 1) / 2;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        offsets[(i * size + j) * 2] = i - half;
        offsets[(i * size + j) * 2 + 1] = j - half;
      }
    }
    geometry.setAttribute(
      "aOffset",
      new THREE.InstancedBufferAttribute(offsets, 2),
    );
    heightAttribute = new THREE.InstancedBufferAttribute(
      new Float32Array(size * size),
      1,
    );
    heightAttribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("aHeight", heightAttribute);
    glowAttribute = new THREE.InstancedBufferAttribute(glowField, 1);
    glowAttribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("aGlow", glowAttribute);
    geometry.instanceCount = size * size;

    mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);
  };

  let awake = false;
  let isRunning = false;
  let isVisible = true;
  let rafId: number | null = null;
  let lastFrameTime = 0;

  const resize = () => {
    const width = container.clientWidth;
    const viewHeight = container.clientHeight;
    if (width === 0 || viewHeight === 0) return;
    renderer.setSize(width, viewHeight, false);

    const scale = cellSize / Math.SQRT2;
    camera.left = -width / 2 / scale;
    camera.right = width / 2 / scale;
    camera.top = viewHeight / 2 / scale;
    camera.bottom = -viewHeight / 2 / scale;
    camera.updateProjectionMatrix();

    const needed = Math.min(
      Math.ceil(((width + viewHeight * 2) / cellSize) * 1.1) + 2,
      38,
    );
    if (needed > size) build(needed);
    renderer.render(scene, camera);
  };

  const brush = (
    gx: number,
    gz: number,
    strength: number,
    radius = BRUSH_RADIUS,
  ) => {
    const reach = Math.ceil(radius * 2);
    const inv = 1 / (2 * radius * radius);
    const ci = Math.round(gx);
    const cj = Math.round(gz);
    for (
      let i = Math.max(1, ci - reach);
      i <= Math.min(size - 2, ci + reach);
      i++
    ) {
      for (
        let j = Math.max(1, cj - reach);
        j <= Math.min(size - 2, cj + reach);
        j++
      ) {
        const dx = i - gx;
        const dz = j - gz;
        velocity[i * size + j] -=
          strength * Math.exp(-(dx * dx + dz * dz) * inv);
      }
    }
    awake = true;
  };

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  let target: { x: number; z: number } | null = null;
  let brushAt: { x: number; z: number } | null = null;
  let idleTime = 0;

  const applyPointer = () => {
    if (!target) return;
    if (!brushAt) {
      brushAt = { ...target };
      return;
    }
    const dx = target.x - brushAt.x;
    const dz = target.z - brushAt.z;
    const distance = Math.hypot(dx, dz);
    if (distance < 0.01) return;
    const samples = Math.ceil(distance / 0.5);
    const push = (Math.min(distance, 2.5) * PUSH_PER_CELL) / samples;
    for (let s = 1; s <= samples; s++) {
      brush(
        brushAt.x + (dx * s) / samples,
        brushAt.z + (dz * s) / samples,
        push,
      );
    }
    brushAt = { ...target };
  };

  const step = () => {
    const ramp = Math.min(
      Math.max((idleTime - SETTLE_AFTER) / SETTLE_RAMP, 0),
      1,
    );
    const s = ramp * ramp * (3 - 2 * ramp);
    const keep = Math.exp(-(flowDrag + (settleDrag - flowDrag) * s) / SIM_HZ);
    const relax = Math.exp(-(flowPull + (settlePull - flowPull) * s) / SIM_HZ);
    lastHeight.set(height);
    for (let i = 1; i < size - 1; i++) {
      for (let j = 1; j < size - 1; j++) {
        const k = i * size + j;
        const edges =
          height[k - 1] + height[k + 1] + height[k - size] + height[k + size];
        const corners =
          height[k - size - 1] +
          height[k - size + 1] +
          height[k + size - 1] +
          height[k + size + 1];
        const laplacian = (4 * edges + corners - 20 * height[k]) / 6;
        velocity[k] = (velocity[k] + c2 * laplacian) * keep;
      }
    }
    for (let k = 0; k < height.length; k++)
      height[k] = (height[k] + velocity[k]) * relax;

    for (let i = 1; i < size - 1; i++) {
      for (let j = 1; j < size - 1; j++) {
        const k = i * size + j;
        const energy =
          (Math.abs(height[k]) * 4 +
            Math.abs(height[k - 1]) +
            Math.abs(height[k + 1]) +
            Math.abs(height[k - size]) +
            Math.abs(height[k + size])) /
          8;
        glowField[k] +=
          (energy - glowField[k]) * (energy > glowField[k] ? 0.12 : 0.05);
      }
    }
  };

  let accumulator = 0;
  const update = (delta: number) => {
    if (!heightAttribute || !glowAttribute) return;

    idleTime += delta;
    applyPointer();
    if (!awake) return;

    accumulator = Math.min(accumulator + delta, STEP * 2);
    while (accumulator >= STEP) {
      step();
      accumulator -= STEP;
    }

    const alpha = accumulator / STEP;
    const display = heightAttribute.array as Float32Array;
    let wave = 0;
    let light = 0;
    for (let k = 0; k < height.length; k++) {
      display[k] = lastHeight[k] + (height[k] - lastHeight[k]) * alpha;
      wave = Math.max(wave, Math.abs(height[k]), Math.abs(velocity[k]) * 10);
      light = Math.max(light, glowField[k]);
    }

    const energy = Math.max(wave, light);

    if (energy < 0.005 || idleTime > 1.2) {
      height.fill(0);
      velocity.fill(0);
      glowField.fill(0);
      lastHeight.fill(0);
      display.fill(0);
      (glowAttribute.array as Float32Array).fill(0);
      heightAttribute.needsUpdate = true;
      glowAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      awake = false;
      isRunning = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      return;
    }

    heightAttribute.needsUpdate = true;
    glowAttribute.needsUpdate = true;
    renderer.render(scene, camera);
  };

  const renderFrame = (now: number) => {
    if (!isRunning || !isVisible) {
      isRunning = false;
      rafId = null;
      return;
    }

    if (now - lastFrameTime < 16) {
      rafId = requestAnimationFrame(renderFrame);
      return;
    }
    const delta = lastFrameTime
      ? Math.min((now - lastFrameTime) / 1000, 0.033)
      : 0.016;
    lastFrameTime = now;
    update(delta);

    if (!awake) {
      isRunning = false;
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(renderFrame);
  };

  const startLoop = () => {
    if (isRunning || !isVisible) return;
    isRunning = true;
    awake = true;
    lastFrameTime = performance.now();
    rafId = requestAnimationFrame(renderFrame);
  };

  const host = container.parentElement ?? container;
  let moveRaf: number | null = null;
  const onPointerMove = (e: PointerEvent) => {
    if (!isVisible) return;
    if (moveRaf !== null) return;
    moveRaf = requestAnimationFrame(() => {
      moveRaf = null;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (Math.abs(nx) > 1.05 || Math.abs(ny) > 1.05) {
        target = null;
        brushAt = null;
        return;
      }
      pointer.set(nx, ny);
      raycaster.setFromCamera(pointer, camera);
      if (!raycaster.ray.intersectPlane(ground, hit)) return;
      const half = (size - 1) / 2;
      target = { x: hit.x + half, z: hit.z + half };
      idleTime = 0;
      startLoop();
    });
  };

  const onPointerLeave = () => {
    target = null;
    brushAt = null;
    idleTime = 0.8;
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      isRunning = false;
      awake = false;
    }
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting;
        if (!isVisible && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
          isRunning = false;
          awake = false;
        }
      }
    },
    { threshold: 0.05 },
  );
  intersectionObserver.observe(container);

  host.addEventListener("pointermove", onPointerMove as EventListener, {
    passive: true,
  });
  host.addEventListener("pointerleave", onPointerLeave, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);

  const dispose = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    if (moveRaf !== null) cancelAnimationFrame(moveRaf);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    host.removeEventListener("pointermove", onPointerMove as EventListener);
    host.removeEventListener("pointerleave", onPointerLeave);
    intersectionObserver.disconnect();
    resizeObserver.disconnect();
    geometry?.dispose();
    material.dispose();
    renderer.dispose();
  };

  return { dispose };
}

function IsometricCubes({
  className,
  cellSize = 105,
  gap = 0.025,
  topColor = "#fafaf9",
  leftColor = "#e7e5e4",
  rightColor = "#d6d3d1",
  amplitude = 0.6,
  speed = 6,
  damping = 0.12,
  idleRipples = false,
  idleDelay = 1.5,
  glowColor = "#a8a29e",
  glow = 0.4,
}: IsometricCubesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || reduceMotion) return;
    const { dispose } = createIsometricScene(
      canvasRef.current,
      containerRef.current,
      {
        cellSize,
        gap,
        topColor,
        leftColor,
        rightColor,
        amplitude,
        speed,
        damping,
        idleRipples,
        idleDelay,
        glowColor,
        glow,
      },
    );
    return () => {
      dispose();
    };
  }, [
    cellSize,
    gap,
    topColor,
    leftColor,
    rightColor,
    amplitude,
    speed,
    damping,
    idleRipples,
    idleDelay,
    glowColor,
    glow,
    reduceMotion,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className,
      )}
      style={{ backgroundColor: topColor }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

const MAX_TRAIL = 64;
const CUBE_WIDTH = 0.72;
const CUBE_HEIGHT = 3;
const CAMERA_RADIUS = 12;
const ALPHA_RANGE = Math.PI * 0.03;
const BETA_RANGE = Math.PI * 0.05;

const PERSPECTIVE_WAVE = {
  speed: 6.0,
  frequency: 1.2,
  width: 3.0,
  jitter: 0.2,
  fadeTime: 2.0,
  trailSpacing: 0.15,
  idleStrength: 0.8,
};

export type PerspectiveCubesProps = {
  variant: "perspective";
  className?: string;
  gridSize?: number;
  gap?: number;
  baseColor?: string;
  waveColor?: string;
  backgroundColor?: string;
  glow?: number;
  amplitude?: number;
  tilt?: number;
  idleRipples?: boolean;
};

const VignetteRGBShiftShader = {
  uniforms: {
    tDiffuse: { value: null },
    shiftAmount: { value: 0.004 },
    vignetteRadius: { value: 0.35 },
    vignetteSoftness: { value: 0.45 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float shiftAmount;
    uniform float vignetteRadius;
    uniform float vignetteSoftness;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      vec2 dir = sign(vUv - center);
      float vignetteFactor = smoothstep(vignetteRadius, vignetteRadius + vignetteSoftness, dist);
      vec2 shift = dir * shiftAmount * vignetteFactor;
      float r = texture2D(tDiffuse, vUv + shift).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - shift).b;
      gl_FragColor = vec4(vec3(r, g, b) * (1.0 - vignetteFactor * 0.7), 1.0);
    }
  `,
};

const overrideVertexShader = (vertexShader: string) =>
  vertexShader
    .replace(
      "#include <common>",
      `#include <common>
      varying float vHeight;
      attribute vec2 aOffset;
      uniform sampler2D uTrailTexture;
      uniform int       uTrailCount;
      uniform float     uWaveSpeed;
      uniform float     uWaveFreq;
      uniform float     uWaveWidth;
      uniform float     uFadeTime;
      uniform float     uAmplitude;
      uniform float     uJitter;
      uniform float     uMaxHeight;

      vec2 hash2( vec2 p ) {
        p = vec2(
          dot( p, vec2( 127.1, 311.7 ) ),
          dot( p, vec2( 269.5, 183.3 ) )
        );
        return fract( sin( p ) * 43758.5453123 ) - 0.5;
      }`,
    )
    .replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      vHeight = 0.0;
      if ( position.y > 0.0 ) {
        vec2 worldXZ = aOffset + hash2( aOffset ) * uJitter;
        float waveHeight  = 0.0;
        float totalWeight = 0.0;

        for ( int i = 0; i < uTrailCount; i++ ) {
          vec4 td = texture2D(
            uTrailTexture,
            vec2( ( float(i) + 0.5 ) / ${MAX_TRAIL}.0, 0.5 )
          );
          float dist    = length( worldXZ - td.rg );
          float relDist = dist - uWaveSpeed * td.b;
          float window  = exp( -( relDist * relDist ) / ( uWaveWidth * uWaveWidth ) );
          float fade    = exp( -td.b / uFadeTime );
          float atten   = 1.0 / ( 1.0 + dist * 0.1 );
          float weight  = fade * window * atten * td.a;

          waveHeight  += weight * cos( uWaveFreq * relDist );
          totalWeight += weight;
        }

        waveHeight /= max( totalWeight, 1.0 );

        float displacement = clamp( waveHeight * uAmplitude, -uMaxHeight, uMaxHeight );
        transformed.y += displacement;
        vHeight = displacement;
      }`,
    );

type TrailPoint = { x: number; z: number; age: number; distDelta: number };

type SceneOptions = Required<
  Omit<PerspectiveCubesProps, "className" | "variant">
>;

function createPerspectiveScene(
  canvas: HTMLCanvasElement,
  container: HTMLDivElement,
  options: SceneOptions,
) {
  const {
    gridSize,
    gap,
    baseColor,
    waveColor,
    backgroundColor,
    glow,
    amplitude,
    tilt,
    idleRipples,
  } = options;
  let width = container.clientWidth;
  let height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor);
  scene.fog = new THREE.Fog(backgroundColor, 9, 26);

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 200);
  const mouse = new THREE.Vector2();
  const lerpedMouse = new THREE.Vector2();
  const updateCamera = (mx: number, my: number) => {
    const alpha = tilt + my * ALPHA_RANGE;
    const beta = mx * BETA_RANGE;
    camera.position.set(
      -CAMERA_RADIUS * Math.cos(alpha) * Math.sin(beta),
      CAMERA_RADIUS * Math.cos(alpha) * Math.cos(beta),
      CAMERA_RADIUS * Math.sin(alpha),
    );
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);
  };
  updateCamera(0, 0);

  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return { dispose: () => {} };

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl,
      antialias: false,
      powerPreference: "low-power",
    });
  } catch {
    return { dispose: () => {} };
  }
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = false;
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(1);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new ShaderPass(VignetteRGBShiftShader));
  composer.addPass(new OutputPass());
  composer.setSize(width, height);
  composer.setPixelRatio(1);

  scene.add(new THREE.AmbientLight("#ffffff", 0.35));
  const keyLight = new THREE.DirectionalLight("#ffffff", 3.0);
  keyLight.position.set(-20, 12, -6);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(waveColor, 1.2);
  rimLight.position.set(12, 4, 10);
  scene.add(rimLight);

  const bounds = gridSize * (CUBE_WIDTH + gap);
  const maxHeight = amplitude;

  const trail: TrailPoint[] = [];
  let lastPoint: { x: number; z: number } | null = null;
  let isVisible = true;
  let isRunning = false;
  let rafId: number | null = null;
  let lastTime = 0;

  const trailData = new Float32Array(MAX_TRAIL * 4);
  const trailTexture = new THREE.DataTexture(
    trailData,
    MAX_TRAIL,
    1,
    THREE.RGBAFormat,
    THREE.FloatType,
  );
  trailTexture.needsUpdate = true;
  const trailUniforms = {
    uTrailTexture: { value: trailTexture },
    uTrailCount: { value: 0 },
    uFadeTime: { value: PERSPECTIVE_WAVE.fadeTime },
  };

  const rayPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(bounds, bounds),
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false }),
  );
  rayPlane.rotation.x = -Math.PI / 2;
  rayPlane.updateMatrixWorld(true);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const pushPoint = (point: TrailPoint) => {
    if (trail.length >= MAX_TRAIL) trail.shift();
    trail.push(point);
  };

  const waveUniforms = () => ({
    ...trailUniforms,
    uWaveSpeed: { value: PERSPECTIVE_WAVE.speed },
    uWaveFreq: { value: PERSPECTIVE_WAVE.frequency },
    uWaveWidth: { value: PERSPECTIVE_WAVE.width },
    uAmplitude: { value: amplitude },
    uJitter: { value: PERSPECTIVE_WAVE.jitter },
    uMaxHeight: { value: maxHeight },
  });

  const count = gridSize * gridSize;
  const geometry = new RoundedBoxGeometry(
    CUBE_WIDTH,
    CUBE_HEIGHT,
    CUBE_WIDTH,
    2,
    0.12,
  );
  const offsetAttribute = new THREE.InstancedBufferAttribute(
    new Float32Array(count * 2),
    2,
  );
  geometry.setAttribute("aOffset", offsetAttribute);

  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 60,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, waveUniforms(), {
      uColorBase: { value: new THREE.Color(baseColor) },
      uColorHigh: { value: new THREE.Color(waveColor) },
      uGlow: { value: glow },
    });
    shader.vertexShader = overrideVertexShader(shader.vertexShader);
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        varying float vHeight;
        uniform vec3  uColorBase;
        uniform vec3  uColorHigh;
        uniform float uMaxHeight;
        uniform float uGlow;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float crest  = clamp( vHeight / uMaxHeight, 0.0, 1.0 );
        float trough = clamp( -vHeight / uMaxHeight, 0.0, 1.0 );
        diffuseColor.rgb = mix( uColorBase, uColorHigh, crest ) * ( 1.0 - trough * 0.6 );`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        totalEmissiveRadiance += uColorHigh * crest * crest * uGlow;`,
      );
  };

  const depthMaterial = new THREE.MeshDepthMaterial();
  depthMaterial.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, waveUniforms());
    shader.vertexShader = overrideVertexShader(shader.vertexShader);
  };

  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.customDepthMaterial = depthMaterial;
  scene.add(mesh);

  const dummy = new THREE.Object3D();
  const spacing = CUBE_WIDTH + gap;
  const gridOffset = ((gridSize - 1) * spacing) / 2;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const index = i * gridSize + j;
      const x = i * spacing - gridOffset;
      const z = j * spacing - gridOffset;
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      offsetAttribute.setXY(index, x, z);
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  offsetAttribute.needsUpdate = true;

  const startLoop = () => {
    if (isRunning || !isVisible) return;
    isRunning = true;
    lastTime = performance.now();
    rafId = requestAnimationFrame(renderFrame);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isVisible) return;
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    if (Math.abs(nx) > 1 || Math.abs(ny) > 1) return;
    mouse.set(nx, ny);
    pointer.set(nx, ny);

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(rayPlane);
    if (hits.length === 0) return;

    const { x, z } = hits[0].point;
    let distDelta = 0;
    if (lastPoint) {
      distDelta = Math.hypot(x - lastPoint.x, z - lastPoint.z);
      if (distDelta < PERSPECTIVE_WAVE.trailSpacing) return;
    }
    pushPoint({ x, z, age: 0, distDelta });
    lastPoint = { x, z };
    startLoop();
  };

  const resize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    composer.render();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  const host = container.parentElement ?? container;
  const onVisibilityChange = () => {
    if (document.hidden) {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      isRunning = false;
    }
  };

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting;
        if (!isVisible && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
          isRunning = false;
        } else if (isVisible && trail.length > 0) {
          startLoop();
        }
      }
    },
    { threshold: 0.05 },
  );
  intersectionObserver.observe(container);

  host.addEventListener("pointermove", onPointerMove as EventListener, {
    passive: true,
  });
  document.addEventListener("visibilitychange", onVisibilityChange);

  const renderFrame = (now: number) => {
    if (!isRunning || !isVisible) {
      isRunning = false;
      rafId = null;
      return;
    }

    if (now - lastTime < 16) {
      rafId = requestAnimationFrame(renderFrame);
      return;
    }

    const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.033) : 0.016;
    lastTime = now;

    lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.04;
    lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.04;
    updateCamera(lerpedMouse.x, lerpedMouse.y);

    const expiry = PERSPECTIVE_WAVE.fadeTime * 2;
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].age += delta;
      if (trail[i].age > expiry) trail.splice(i, 1);
    }

    const live = Math.min(trail.length, MAX_TRAIL);
    if (live > 0 || trailUniforms.uTrailCount.value > 0) {
      for (let i = 0; i < live; i++) {
        trailData.set(
          [trail[i].x, trail[i].z, trail[i].age, trail[i].distDelta],
          i * 4,
        );
      }
      trailTexture.needsUpdate = true;
      trailUniforms.uTrailCount.value = live;
    }

    composer.render();

    if (trail.length === 0 && Math.abs(mouse.x - lerpedMouse.x) < 0.001) {
      isRunning = false;
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(renderFrame);
  };

  composer.render();

  const dispose = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    intersectionObserver.disconnect();
    resizeObserver.disconnect();
    host.removeEventListener("pointermove", onPointerMove as EventListener);
    geometry.dispose();
    material.dispose();
    depthMaterial.dispose();
    rayPlane.geometry.dispose();
    rayPlane.material.dispose();
    trailTexture.dispose();
    composer.dispose();
    renderer.dispose();
  };

  return { dispose };
}

function PerspectiveCubes({
  className,
  gridSize = 44,
  gap = 0.08,
  baseColor = "#2a2a30",
  waveColor = "#ff6a2b",
  backgroundColor = "#0b0b0d",
  glow = 0.9,
  amplitude = 0.5,
  tilt = 0.7,
  idleRipples = false,
}: PerspectiveCubesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || reduceMotion) return;
    const { dispose } = createPerspectiveScene(
      canvasRef.current,
      containerRef.current,
      {
        gridSize,
        gap,
        baseColor,
        waveColor,
        backgroundColor,
        glow,
        amplitude,
        tilt,
        idleRipples,
      },
    );
    return () => {
      dispose();
    };
  }, [
    gridSize,
    gap,
    baseColor,
    waveColor,
    backgroundColor,
    glow,
    amplitude,
    tilt,
    idleRipples,
    reduceMotion,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className,
      )}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block h-full w-full outline-none" />
    </div>
  );
}

export type BackgroundCubesGridProps =
  IsometricCubesProps | PerspectiveCubesProps;

export const BackgroundCubesGrid = (props: BackgroundCubesGridProps) =>
  props.variant === "perspective" ? (
    <PerspectiveCubes {...props} />
  ) : (
    <IsometricCubes {...props} />
  );
