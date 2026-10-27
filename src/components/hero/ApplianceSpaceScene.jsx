import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/Assets/kitchen_appliances.glb";
const CHANGE_INTERVAL = 4500;
const OBJECT_GAP = 2.2;
const ROTATION_SPEED = 0.22;
const TARGET_OBJECT_HEIGHT = 1.8;

// kitchen_appliances.glb contains 8 independent object groups.
const labels = [
  "Coffee machine",
  "Washing machine",
  "Refrigerator",
  "Oven",
  "Sink",
];

function cloneMaterials(object) {
  object.traverse((node) => {
    if (!node.isMesh) return;
    node.castShadow = true;
    node.receiveShadow = true;
    node.material = Array.isArray(node.material)
      ? node.material.map((material) => material.clone())
      : node.material.clone();
  });
}

function setAppearance(object, brightness = 0) {
  object.traverse((node) => {
    if (!node.isMesh || !node.material) return;
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    materials.forEach((material) => {
      // Keep every model fully opaque; inactive objects are de-emphasized by scale/light,
      // not by transparency, so their geometry remains readable.
      material.transparent = false;
      material.opacity = 1;
      material.depthWrite = true;
      material.emissiveIntensity = brightness;
    });
  });
}

function createCarouselItems(scene) {
  // Skip Sketchfab/root wrappers and take the eight actual appliance groups.
  const sceneRoot = scene.getObjectByName("GLTF_SceneRootNode");
  const sourceNodes = sceneRoot?.children.filter((node) => {
    const normalizedName = node.name.toLowerCase();
    return node.visible
      && !normalizedName.includes("pipe")
      && !normalizedName.includes("boiler");
  }) ?? [];
  const nodes = sourceNodes.length > 1 ? sourceNodes : [scene];

  const items = nodes.map((source, index) => {
    const object = source.clone(true);
    cloneMaterials(object);
    object.updateMatrixWorld(true);

    // Measure the real object, then move its geometry into a centered pivot.
    const bounds = new THREE.Box3().setFromObject(object);
    const size = bounds.getSize(new THREE.Vector3());
    const normalizationScale = THREE.MathUtils.clamp(
      TARGET_OBJECT_HEIGHT / Math.max(size.y, 0.01),
      0.12,
      3,
    );
    object.scale.setScalar(normalizationScale);
    object.updateMatrixWorld(true);
    const normalizedBounds = new THREE.Box3().setFromObject(object);
    const normalizedCenter = normalizedBounds.getCenter(new THREE.Vector3());
    const normalizedSize = normalizedBounds.getSize(new THREE.Vector3());
    const pivot = new THREE.Group();
    pivot.name = `carousel-item-${index}`;
    pivot.add(object);
    object.position.sub(normalizedCenter);

    return {
      pivot,
      width: Math.max(normalizedSize.x, 0.8),
      height: Math.max(normalizedSize.y, 0.8),
      baseX: 0,
    };
  });

  const totalWidth = items.reduce((sum, item) => sum + item.width, 0)
    + OBJECT_GAP * Math.max(items.length - 1, 0);
  let cursor = -totalWidth / 2;

  items.forEach((item) => {
    item.baseX = cursor + item.width / 2;
    cursor += item.width + OBJECT_GAP;
  });

  return {
    items,
    totalWidth,
    maxHeight: Math.max(...items.map((item) => item.height), TARGET_OBJECT_HEIGHT),
  };
}

function ApplianceRow({ activeIndex }) {
  const { scene } = useGLTF(MODEL_PATH);
  const layout = useMemo(() => createCarouselItems(scene), [scene]);
  const carousel = layout.items;
  const rowRef = useRef();

  const itemCount = carousel.length;
  const focusedIndex = itemCount ? activeIndex % itemCount : 0;
  const selected = carousel[focusedIndex];

  useEffect(() => {
    carousel.forEach(({ pivot }) => {
      rowRef.current?.add(pivot);
    });

    return () => {
      carousel.forEach(({ pivot }) => rowRef.current?.remove(pivot));
    };
  }, [carousel]);

  useFrame((state, delta) => {
    if (!rowRef.current || !selected) return;

    carousel.forEach((item, index) => {
      const isFocused = index === focusedIndex;
      const targetScale = isFocused ? 1.48 : 0.64;
      const targetZ = isFocused ? 0.85 : 0;
      const targetY = isFocused ? 0.08 : -0.12;

      item.pivot.position.x = THREE.MathUtils.damp(
        item.pivot.position.x,
        item.baseX,
        5,
        delta,
      );
      item.pivot.position.y = THREE.MathUtils.damp(item.pivot.position.y, targetY, 5, delta);
      item.pivot.position.z = THREE.MathUtils.damp(item.pivot.position.z, targetZ, 5, delta);
      item.pivot.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        1 - Math.exp(-5 * delta),
      );
      item.pivot.rotation.y += delta * ROTATION_SPEED;
      item.pivot.rotation.x = Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.025;
      setAppearance(item.pivot, isFocused ? 0.14 : 0);
    });

    // Keep the focused object exactly in the camera center and fit the whole row.
    const cameraTargetX = selected.baseX;
    const aspect = state.size.width / Math.max(state.size.height, 1);
    const verticalFov = THREE.MathUtils.degToRad(state.camera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
    const horizontalExtent = Math.max(
      ...carousel.map((item) => Math.abs(item.baseX - cameraTargetX) + item.width * 0.72),
    );
    const rowDistance = horizontalExtent / Math.tan(horizontalFov / 2) * 0.64;
    const heightDistance = layout.maxHeight / (2 * Math.tan(verticalFov / 2)) * 0.84;
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      cameraTargetX,
      4,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0.25, 4, delta);
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      Math.max(6.4, rowDistance, heightDistance),
      4,
      delta,
    );
    state.camera.lookAt(cameraTargetX, -0.58, 0);
  });

  return <group ref={rowRef} position={[0, -0.7, 0]} />;
}

function SceneFallback() {
  return (
    <mesh rotation={[0.2, 0.4, 0]}>
      <icosahedronGeometry args={[1.3, 2]} />
      <meshStandardMaterial color="#e32e37" metalness={0.75} roughness={0.22} />
    </mesh>
  );
}

function SpaceScene({ activeIndex }) {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 6.4], fov: 34 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 4, 4]} intensity={3.5} color="#fff4e8" castShadow />
      <pointLight position={[-3, 1, 2]} intensity={18} distance={8} color="#ff5863" />
      <pointLight position={[3, -1, 1]} intensity={10} distance={7} color="#8fb9ff" />
      <Sparkles count={100} scale={[10, 5, 5]} size={1.6} speed={0.18} color="#fff6ef" />
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.22}>
        <Suspense fallback={<SceneFallback />}>
          <ApplianceRow activeIndex={activeIndex} />
        </Suspense>
      </Float>
    </Canvas>
  );
}

export function ApplianceSpaceScene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef(null);

  const selectAppliance = (index) => {
    setActiveIndex(index);
  };

  const move = useCallback((direction) => {
    const nextIndex = (activeIndex + direction + labels.length) % labels.length;
    selectAppliance(nextIndex);
  }, [activeIndex]);

  useEffect(() => {
    // Carousel autoplay interval. Increase/decrease CHANGE_INTERVAL to tune it.
    const timer = window.setInterval(() => move(1), CHANGE_INTERVAL);
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [move]);

  const handlePointerDown = (event) => {
    touchStart.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (touchStart.current === null) return;
    const distance = event.clientX - touchStart.current;
    if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div className="space-scene-shell">
      <div
        className="space-scene-canvas"
        aria-label="Interactive floating appliance carousel"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { touchStart.current = null; }}
      >
        <SpaceScene activeIndex={activeIndex} />
      </div>
      <button className="space-scene-arrow space-scene-arrow-prev" type="button" onClick={() => move(-1)} aria-label="Previous appliance">←</button>
      <button className="space-scene-arrow space-scene-arrow-next" type="button" onClick={() => move(1)} aria-label="Next appliance">→</button>
      <div className="space-scene-caption" aria-live="polite">
        <span>{labels[activeIndex]}</span>
        <div className="space-scene-dots" aria-label="Choose appliance">
          {labels.map((label, index) => (
            <button
              key={label}
              type="button"
              className={index === activeIndex ? "active" : ""}
              onClick={() => selectAppliance(index)}
              aria-label={`Show ${label}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
