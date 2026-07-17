import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Brand palette (three.js needs literal color values, these ARE the CSS vars)
const BLUE = "#0E3A5D";
const TEAL = "#1D9E75";
const ICE = "#F4F8FA";
const DEEP = "#092C47";
const ABYSS = "#041624";

/* ------------------------- animated water surface ------------------------ */

function WaterSurface() {
  const mesh = useRef();
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(60, 60, 90, 90);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const base = useMemo(
    () => Float32Array.from(geo.attributes.position.array),
    [geo]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.55;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const z = base[i * 3 + 2];
      pos.array[i * 3 + 1] =
        Math.sin(x * 0.35 + t) * 0.18 +
        Math.cos(z * 0.3 + t * 0.8) * 0.14 +
        Math.sin((x + z) * 0.18 + t * 0.5) * 0.1;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} geometry={geo} position={[0, 0, 0]}>
      <meshStandardMaterial
        color={BLUE}
        transparent
        opacity={0.82}
        roughness={0.25}
        metalness={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Faint teal wireframe echo of the surface — the "digital twin" of the sea. */
function WaterWireframe() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(60, 60, 40, 40);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const base = useMemo(
    () => Float32Array.from(geo.attributes.position.array),
    [geo]
  );
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.55;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const z = base[i * 3 + 2];
      pos.array[i * 3 + 1] =
        0.35 +
        Math.sin(x * 0.35 + t) * 0.18 +
        Math.cos(z * 0.3 + t * 0.8) * 0.14;
    }
    pos.needsUpdate = true;
  });
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial color={TEAL} wireframe transparent opacity={0.06} />
    </mesh>
  );
}

/* ----------------------------- the structure ----------------------------- */

function Sensor({ position, phase = 0 }) {
  const ref = useRef();
  const light = useRef();
  useFrame(({ clock }) => {
    const pulse = (Math.sin(clock.elapsedTime * 2.2 + phase) + 1) / 2;
    const s = 1 + pulse * 0.5;
    ref.current.scale.setScalar(s);
    ref.current.material.emissiveIntensity = 1.2 + pulse * 2.2;
    if (light.current) light.current.intensity = 1.5 + pulse * 3;
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={TEAL}
          emissive={TEAL}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={light} color={TEAL} intensity={2} distance={6} />
    </group>
  );
}

/** A glowing data pulse travelling along the brace between two piles. */
function DataPulse({ from, to, speed = 0.5, phase = 0 }) {
  const ref = useRef();
  const a = useMemo(() => new THREE.Vector3(...from), [from]);
  const b = useMemo(() => new THREE.Vector3(...to), [to]);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * speed + phase) % 1;
    ref.current.position.lerpVectors(a, b, t);
    const fade = Math.sin(t * Math.PI);
    ref.current.material.opacity = fade;
    ref.current.scale.setScalar(0.5 + fade * 0.6);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshBasicMaterial color={TEAL} transparent toneMapped={false} />
    </mesh>
  );
}

function PileGroup() {
  const group = useRef();
  useFrame(({ clock }) => {
    // barely perceptible sway — a structure standing in moving water
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.004;
  });
  const pileMat = (
    <meshStandardMaterial color={DEEP} roughness={0.55} metalness={0.5} />
  );
  return (
    <group ref={group} position={[0, 0, 0]}>
      {[-2.4, 0, 2.4].map((x) => (
        <mesh key={x} position={[x, -1.4, 0]}>
          <cylinderGeometry args={[0.3, 0.34, 8.2, 24]} />
          {pileMat}
        </mesh>
      ))}
      {/* horizontal brace */}
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[5.4, 0.22, 0.22]} />
        {pileMat}
      </mesh>
      {/* sensors below the waterline */}
      <Sensor position={[0, -1.1, 0.34]} phase={0} />
      <Sensor position={[-2.4, -2.9, 0.36]} phase={1.4} />
      <Sensor position={[2.4, -2.9, 0.36]} phase={2.8} />
      {/* data pulses running along the brace toward the center pile */}
      <DataPulse from={[-2.4, -2.2, 0.3]} to={[0, -2.2, 0.3]} phase={0} />
      <DataPulse from={[2.4, -2.2, 0.3]} to={[0, -2.2, 0.3]} phase={0.5} />
    </group>
  );
}

/* ------------------------------- ice floes ------------------------------- */

function IceFloes() {
  const floes = useMemo(
    () =>
      [
        { pos: [-5.5, 0.15, -2.5], size: [2.4, 0.18, 1.8], rot: 0.4, ph: 0 },
        { pos: [5.2, 0.15, -1.2], size: [1.8, 0.16, 1.4], rot: -0.7, ph: 2 },
        { pos: [-3.8, 0.15, 2.8], size: [1.5, 0.14, 1.2], rot: 1.1, ph: 4 },
        { pos: [7.5, 0.15, 2.2], size: [2.8, 0.2, 2.0], rot: 0.2, ph: 1 },
      ].map((f) => ({ ...f, ref: null })),
    []
  );
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.children.forEach((child, i) => {
      const f = floes[i];
      child.position.y = f.pos[1] + Math.sin(clock.elapsedTime * 0.6 + f.ph) * 0.09;
      child.rotation.x = Math.sin(clock.elapsedTime * 0.4 + f.ph) * 0.03;
    });
  });
  return (
    <group ref={group}>
      {floes.map((f, i) => (
        <mesh key={i} position={f.pos} rotation={[0, f.rot, 0]}>
          <boxGeometry args={f.size} />
          <meshStandardMaterial color={ICE} roughness={0.35} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------------------- rising particles ---------------------------- */

function Particles({ count = 260 }) {
  const points = useRef();
  const seeds = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = -Math.random() * 7 - 0.4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const pos = points.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.array[i * 3 + 1] + delta * (0.12 + (i % 5) * 0.035);
      if (y > -0.15) y = -7.2;
      pos.array[i * 3 + 1] = y;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={seeds}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={ICE}
        size={0.05}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------ camera rig ------------------------------- */

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, -0.8, 0), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.08) * 1.4 + pointer.x * 1.1;
    camera.position.y = 1.55 + pointer.y * 0.55 + Math.sin(t * 0.12) * 0.15;
    camera.lookAt(target);
  });
  return null;
}

/* --------------------------------- scene --------------------------------- */

export default function Hero3D() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.55, 10.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={[ABYSS, 9, 30]} />
          <ambientLight intensity={0.45} />
          <directionalLight position={[6, 8, 4]} intensity={0.9} color={ICE} />
          <directionalLight position={[-6, 3, -4]} intensity={0.25} color={TEAL} />
          <CameraRig />
          <WaterSurface />
          <WaterWireframe />
          <PileGroup />
          <IceFloes />
          <Particles />
        </Suspense>
      </Canvas>
      {/* readability gradient over the canvas */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-vellamo-abyss/80 via-vellamo-abyss/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-vellamo-abyss to-transparent" />
    </div>
  );
}
