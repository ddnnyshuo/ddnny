import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import * as THREE from "three";

import defaultPlanetTexture from "./assets/star-planet/default-planet-texture.png";
import figmaLayerBackground from "./assets/star-planet/figma-layer-background.png";
import figmaLayerElements from "./assets/star-planet/figma-layer-elements.png";
import figmaLayerPlanetLabel from "./assets/star-planet/figma-layer-planet-label.png";

type PlanetCanvasProps = {
  cycleSeconds: number;
  textureUrl?: string;
};

type StarRingCanvasProps = {
  cycleSeconds: number;
  layer: "back" | "front";
};

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (!file) {
      setUrl(undefined);
      return;
    }

    const nextUrl = URL.createObjectURL(file);
    setUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [file]);

  return url;
}

function createDefaultPlanetTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return canvas;
  }

  const sky = ctx.createLinearGradient(0, 0, 1024, 512);
  sky.addColorStop(0, "#c9fbff");
  sky.addColorStop(0.36, "#4fb9c2");
  sky.addColorStop(0.68, "#165777");
  sky.addColorStop(1, "#dff8ef");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 1024, 512);

  for (let i = 0; i < 34; i += 1) {
    const y = 34 + i * 14 + Math.sin(i * 0.8) * 14;
    const wave = new Path2D();
    wave.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 64) {
      wave.quadraticCurveTo(x + 28, y + Math.sin((x + i * 29) * 0.018) * 34, x + 64, y + Math.cos((x + i * 17) * 0.015) * 22);
    }
    ctx.strokeStyle = i % 3 === 0 ? "rgba(255,255,255,0.34)" : "rgba(23,93,121,0.32)";
    ctx.lineWidth = i % 3 === 0 ? 10 : 16;
    ctx.stroke(wave);
  }

  const glow = ctx.createRadialGradient(740, 148, 20, 740, 148, 360);
  glow.addColorStop(0, "rgba(255,255,255,0.44)");
  glow.addColorStop(0.28, "rgba(155,255,237,0.18)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1024, 512);

  return canvas;
}

function PlanetCanvas({ cycleSeconds, textureUrl }: PlanetCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      return;
    }
    const renderCanvas: HTMLCanvasElement = canvasElement;

    let disposed = false;
    let animationFrame = 0;
    let activeTexture: THREE.Texture | undefined;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: renderCanvas,
      premultipliedAlpha: false
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.04;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 5.1);

    const group = new THREE.Group();
    scene.add(group);

    const sphereGeometry = new THREE.SphereGeometry(1.44, 128, 72);
    const planetMaterial = new THREE.MeshBasicMaterial({
      color: 0xf1f1f1
    });
    planetMaterial.toneMapped = false;
    const planet = new THREE.Mesh(sphereGeometry, planetMaterial);
    planet.rotation.set(-0.08, -0.42, -0.08);
    planet.renderOrder = 1;
    group.add(planet);

    const surfaceLightMaterial = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertexShader: `
        varying vec3 vNormalView;
        void main() {
          vNormalView = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormalView;
        void main() {
          vec3 normalView = normalize(vNormalView);
          vec3 lightDirection = normalize(vec3(0.58, 0.66, 0.48));
          float facing = clamp(dot(normalView, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
          float lightAmount = clamp(dot(normalView, lightDirection) * 0.5 + 0.5, 0.0, 1.0);
          float broadLift = smoothstep(0.52, 0.96, lightAmount) * smoothstep(0.08, 0.92, facing);
          float specularLift = pow(smoothstep(0.74, 1.0, lightAmount), 2.6) * smoothstep(0.24, 1.0, facing);
          float alpha = broadLift * 0.018 + specularLift * 0.028;
          gl_FragColor = vec4(1.0, 0.985, 0.92, alpha);
        }
      `
    });
    const surfaceLight = new THREE.Mesh(sphereGeometry.clone(), surfaceLightMaterial);
    surfaceLight.scale.setScalar(1.004);
    surfaceLight.renderOrder = 2;
    group.add(surfaceLight);

    const edgeMaterial = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertexShader: `
        varying vec3 vNormalView;
        void main() {
          vNormalView = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormalView;
        void main() {
          vec3 normalView = normalize(vNormalView);
          vec3 lightDirection = normalize(vec3(0.58, 0.66, 0.48));
          float facing = clamp(dot(normalView, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
          float lightAmount = clamp(dot(normalView, lightDirection) * 0.5 + 0.5, 0.0, 1.0);
          float terminator = 1.0 - smoothstep(0.38, 0.86, lightAmount);
          float lowerLeft = smoothstep(0.10, 1.0, -normalView.x * 0.56 - normalView.y * 0.72);
          float rim = smoothstep(0.48, 0.98, 1.0 - facing);
          float alpha = terminator * 0.2 + lowerLeft * 0.1 + rim * 0.14;
          gl_FragColor = vec4(0.012, 0.044, 0.052, alpha);
        }
      `
    });
    const edgeShade = new THREE.Mesh(sphereGeometry.clone(), edgeMaterial);
    edgeShade.scale.setScalar(1.008);
    edgeShade.renderOrder = 3;
    group.add(edgeShade);

    const atmosphereMaterial = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      uniforms: {
        glowColor: { value: new THREE.Color(0xb8ffff) }
      },
      vertexShader: `
        varying vec3 vNormalView;
        void main() {
          vNormalView = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormalView;
        void main() {
          float facing = clamp(dot(normalize(vNormalView), vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
          float fresnel = pow(1.0 - facing, 2.15);
          float topLift = smoothstep(-0.35, 0.92, vNormalView.y);
          gl_FragColor = vec4(glowColor, fresnel * (0.16 + topLift * 0.06));
        }
      `
    });
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.55, 128, 72), atmosphereMaterial);
    atmosphere.renderOrder = 4;
    group.add(atmosphere);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(-2.8, 1.9, 3.8);
    scene.add(keyLight);

    const cyanFill = new THREE.PointLight(0xdfffff, 0.75, 7.5);
    cyanFill.position.set(1.5, -1.15, 2.4);
    scene.add(cyanFill);

    const deepSideLight = new THREE.DirectionalLight(0xffffff, 0.32);
    deepSideLight.position.set(2.2, -1.8, 1.4);
    scene.add(deepSideLight);

    function resizeRenderer() {
      const rect = renderCanvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      const targetWidth = Math.max(1, Math.round(rect.width * pixelRatio));
      const targetHeight = Math.max(1, Math.round(rect.height * pixelRatio));

      if (renderCanvas.width !== targetWidth || renderCanvas.height !== targetHeight) {
        renderer.setSize(targetWidth, targetHeight, false);
        renderer.setPixelRatio(1);
        camera.aspect = targetWidth / targetHeight;
        camera.updateProjectionMatrix();
      }
    }

    function applyTexture(nextTexture: THREE.Texture) {
      activeTexture?.dispose();
      activeTexture = nextTexture;
      nextTexture.colorSpace = THREE.SRGBColorSpace;
      nextTexture.wrapS = THREE.ClampToEdgeWrapping;
      nextTexture.wrapT = THREE.ClampToEdgeWrapping;
      nextTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      planetMaterial.map = nextTexture;
      planetMaterial.needsUpdate = true;
    }

    function applyFallbackTexture() {
      const fallback = createDefaultPlanetTexture();
      applyTexture(new THREE.CanvasTexture(fallback));
    }

    if (textureUrl) {
      const loader = new THREE.TextureLoader();
      loader.load(textureUrl, applyTexture, undefined, applyFallbackTexture);
    } else {
      applyFallbackTexture();
    }

    const render = () => {
      if (disposed) {
        return;
      }

      resizeRenderer();
      const cycle = Math.max(1, cycleSeconds);
      const phase = (((performance.now() / 1000) % cycle) / cycle) * Math.PI * 2;
      planet.rotation.y = -0.42 + phase;
      planet.rotation.x = -0.08;
      planet.rotation.z = -0.08;
      edgeShade.rotation.copy(planet.rotation);
      atmosphere.rotation.copy(planet.rotation);
      surfaceLight.rotation.copy(planet.rotation);
      group.rotation.set(0, 0, 0);
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      activeTexture?.dispose();
      sphereGeometry.dispose();
      surfaceLight.geometry.dispose();
      edgeShade.geometry.dispose();
      atmosphere.geometry.dispose();
      planetMaterial.dispose();
      surfaceLightMaterial.dispose();
      edgeMaterial.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  }, [cycleSeconds, textureUrl]);

  return <canvas aria-label="rotating planet preview" className="star-planet-canvas" ref={canvasRef} />;
}

function StarRingCanvas({ cycleSeconds, layer }: StarRingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let disposed = false;
    let animationFrame = 0;
    let seed = 17;
    const ringParticles = Array.from({ length: layer === "front" ? 1600 : 980 }, () => {
      seed = (seed * 16807) % 2147483647;
      const a = (seed % 10000) / 10000;
      seed = (seed * 16807) % 2147483647;
      const b = (seed % 10000) / 10000;
      seed = (seed * 16807) % 2147483647;
      const c = (seed % 10000) / 10000;
      seed = (seed * 16807) % 2147483647;
      const d = (seed % 10000) / 10000;
      const radial = b ** 1.9;
      return {
        angle: a * Math.PI * 2,
        alpha: ((layer === "front" ? 0.42 : 0.22) + d * (layer === "front" ? 0.42 : 0.2)) * (1 - radial * 0.62),
        lane: (c - 0.5) * (4 + radial * 28),
        radial,
        size: (0.22 + d * (layer === "front" ? 0.82 : 0.48)) * (1 - radial * 0.28)
      };
    });

    const drawStar = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = Math.max(0.8, size * 0.16);
      ctx.shadowColor = "rgba(255,255,255,0.9)";
      ctx.shadowBlur = size * 0.8;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      ctx.restore();
    };

    const drawOrbit = (cx: number, cy: number, rx: number, ry: number, rotation: number, alpha: number, start = 0, end = Math.PI * 2) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.scale(1, ry / rx);
      ctx.strokeStyle = `rgba(215, 246, 248, ${alpha})`;
      ctx.lineWidth = Math.max(0.8, 1.15 * (canvas.width / 320));
      ctx.beginPath();
      ctx.arc(0, 0, rx, start, end);
      ctx.stroke();
      ctx.restore();
    };

    const drawStarTrack = (
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      rotation: number,
      phase: number,
      alpha: number,
      front: boolean
    ) => {
      const segments = 150;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      ctx.save();
      ctx.strokeStyle = `rgba(225, 248, 250, ${alpha})`;
      ctx.shadowColor = "rgba(206, 255, 255, 0.28)";
      ctx.shadowBlur = 2.2 * (canvas.width / 320);
      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(0.65, 0.9 * (canvas.width / 320));

      for (let i = 0; i < segments; i += 1) {
        const t0 = (i / segments) * Math.PI * 2;
        const t1 = ((i + 0.72) / segments) * Math.PI * 2;
        const depth = Math.sin(t0 + phase);
        if ((front && depth < -0.04) || (!front && depth >= -0.04)) {
          continue;
        }

        const x0 = Math.cos(t0 + phase) * rx;
        const y0 = Math.sin(t0 + phase) * ry;
        const x1 = Math.cos(t1 + phase) * rx;
        const y1 = Math.sin(t1 + phase) * ry;
        const px0 = cx + x0 * cos - y0 * sin;
        const py0 = cy + x0 * sin + y0 * cos;
        const px1 = cx + x1 * cos - y1 * sin;
        const py1 = cy + x1 * sin + y1 * cos;

        ctx.globalAlpha = (front ? 0.9 : 0.48) * (0.58 + 0.42 * Math.abs(depth));
        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.lineTo(px1, py1);
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = () => {
      if (disposed) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      const targetWidth = Math.max(1, Math.round(rect.width * pixelRatio));
      const targetHeight = Math.max(1, Math.round(rect.height * pixelRatio));

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const scaleX = canvas.width / 340;
      const scaleY = canvas.height / 218;
      const scale = Math.min(scaleX, scaleY);
      const cycle = Math.max(1, cycleSeconds);
      const phase = (((performance.now() / 1000) % cycle) / cycle) * Math.PI * 2;
      const orbitPhase = -phase;
      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.48;
      const rx = 150 * scale;
      const ry = 42 * scale;
      const rotation = -15 * Math.PI / 180;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      if (layer === "front") {
        drawStarTrack(cx - 1 * scale, cy + 1 * scale, 54 * scale, 88 * scale, -0.16, orbitPhase, 0.34, true);
        drawStarTrack(cx + 4 * scale, cy + 1 * scale, 72 * scale, 78 * scale, 0.48, orbitPhase + 1.18, 0.32, true);
      } else {
        drawStarTrack(cx - 1 * scale, cy + 1 * scale, 54 * scale, 88 * scale, -0.16, orbitPhase, 0.23, false);
        drawStarTrack(cx + 4 * scale, cy + 1 * scale, 72 * scale, 78 * scale, 0.48, orbitPhase + 1.18, 0.21, false);
      }

      for (const particle of ringParticles) {
        const angle = particle.angle + orbitPhase;
        const frontHalf = Math.sin(angle) > -0.04;
        if ((layer === "front" && !frontHalf) || (layer === "back" && frontHalf)) {
          continue;
        }
        const localRx = rx * (0.48 + particle.radial * 0.62);
        const localRy = ry * (0.42 + particle.radial * 0.48);
        const localX = Math.cos(angle) * localRx;
        const localY = Math.sin(angle) * localRy + particle.lane * scale;
        const x = cx + localX * cos - localY * sin;
        const y = cy + localX * sin + localY * cos;
        const sideFade = 0.56 + 0.44 * Math.abs(Math.cos(angle));
        const alpha = Math.min(0.94, particle.alpha * sideFade * (layer === "front" ? 1 : 0.55));
        ctx.fillStyle = `rgba(238, 255, 255, ${alpha})`;
        ctx.shadowColor = "rgba(172, 255, 255, 0.42)";
        ctx.shadowBlur = (layer === "front" ? 2.2 : 1.2) * scale;
        ctx.beginPath();
        ctx.arc(x, y, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [cycleSeconds, layer]);

  return <canvas aria-label="animated star ring" className={`star-planet-ring-canvas star-planet-ring-canvas-${layer}`} ref={canvasRef} />;
}

function UploadField({
  label,
  accept,
  fileName,
  onChange
}: {
  label: string;
  accept: string;
  fileName?: string;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.files?.[0] ?? null);
  }

  return (
    <label className="star-planet-upload">
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} />
      <span>{label}</span>
      <strong>{fileName || "默认素材"}</strong>
      {fileName ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            onChange(null);
          }}
        >
          清除
        </button>
      ) : null}
    </label>
  );
}

export function StarPlanetDemo() {
  const [planetFile, setPlanetFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [rotationSeconds, setRotationSeconds] = useState(28);
  const [backgroundSeconds, setBackgroundSeconds] = useState(8);
  const handleRotationSeconds = (event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>) => setRotationSeconds(Number(event.currentTarget.value));
  const handleBackgroundSeconds = (event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>) => setBackgroundSeconds(Number(event.currentTarget.value));

  const planetUrl = useObjectUrl(planetFile);
  const backgroundUrl = useObjectUrl(backgroundFile);
  const activePlanetTexture = planetUrl ?? defaultPlanetTexture;
  const stageStyle = useMemo(
    () =>
      ({
        "--star-planet-bg-duration": `${backgroundSeconds}s`,
        "--star-planet-ring-duration": `${rotationSeconds}s`
      }) as React.CSSProperties,
    [backgroundSeconds, rotationSeconds]
  );

  return (
    <main className="star-planet-page dui-root">
      <section className="star-planet-preview">
        <div className="star-planet-phone" style={stageStyle}>
          <img className="star-planet-layer star-planet-layer-background" src={backgroundUrl ?? figmaLayerBackground} alt="" aria-hidden="true" />
          <img className="star-planet-layer star-planet-layer-elements" src={figmaLayerElements} alt="" aria-hidden="true" />

          <div className="star-planet-meteor-layer" aria-hidden="true">
            <span className="star-planet-meteor star-planet-meteor-a" />
            <span className="star-planet-meteor star-planet-meteor-b" />
            <span className="star-planet-meteor star-planet-meteor-c" />
          </div>

          <div className="star-planet-space" aria-label="动态星球预览">
            <div className="star-planet-orbit">
              <span className="star-planet-ring star-planet-ring-one" />
              <span className="star-planet-ring star-planet-ring-two" />
              <span className="star-planet-ring star-planet-ring-three" />
              <StarRingCanvas cycleSeconds={rotationSeconds} layer="back" />
              <span className="star-planet-dust" />
              <span className="star-planet-flare star-planet-flare-left" />
              <span className="star-planet-flare star-planet-flare-right" />
              <span className="star-planet-flare star-planet-flare-bottom" />
              <span className="star-planet-scan-line" />
              <PlanetCanvas cycleSeconds={rotationSeconds} textureUrl={activePlanetTexture} />
              <StarRingCanvas cycleSeconds={rotationSeconds} layer="front" />
            </div>
          </div>
          <img className="star-planet-planet-label" src={figmaLayerPlanetLabel} alt="宋雨琦" />
        </div>
      </section>

      <aside className="star-planet-controls">
        <h1>明星星球动效预览</h1>
        <UploadField label="星球纹理" accept="image/*" fileName={planetFile?.name} onChange={setPlanetFile} />
        <UploadField label="星空背景" accept="image/*" fileName={backgroundFile?.name} onChange={setBackgroundFile} />

        <label className="star-planet-slider">
          <span>星环循环</span>
          <input min="5" max="28" step="1" type="range" value={rotationSeconds} onChange={handleRotationSeconds} onInput={handleRotationSeconds} />
          <input aria-label="星环循环秒数" min="5" max="28" type="number" value={rotationSeconds} onChange={handleRotationSeconds} />
          <strong>s</strong>
        </label>

        <label className="star-planet-slider">
          <span>背景循环</span>
          <input min="8" max="36" step="1" type="range" value={backgroundSeconds} onChange={handleBackgroundSeconds} onInput={handleBackgroundSeconds} />
          <input aria-label="背景循环秒数" min="8" max="36" type="number" value={backgroundSeconds} onChange={handleBackgroundSeconds} />
          <strong>s</strong>
        </label>

        <div className="star-planet-note">
          <code>Three.js</code>
          <span>球体自转</span>
          <code>CSS</code>
          <span>背景与流星</span>
        </div>
      </aside>
    </main>
  );
}
