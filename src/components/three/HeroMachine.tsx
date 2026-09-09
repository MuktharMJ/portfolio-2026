"use client";

/**
 * NIGHTBENCH hero machine — the signature 3D piece.
 *
 * Concept: a dark engineered core (flat-shaded icosahedron with an amber
 * wireframe skin) around which a system of instruments rotates — two
 * gyroscope rings, two sweeping energy arcs, a handful of low-poly
 * satellites riding inclined orbits (amber primary; the NIGHTBENCH project
 * hues appear only as tiny secondary signals), and a sparse "data shell"
 * of points giving depth and atmosphere.
 *
 * Performance contract:
 *  · client-only, loaded via next/dynamic — never in the initial bundle
 *  · module-scope shared geometries, ~a dozen low-poly meshes total
 *  · no textures, no shadows, no post-processing, 3 lights
 *  · per-frame work is O(satellites) trig + eased lerps
 *  · prefers-reduced-motion: frameloop switches to "demand" — a static,
 *    still-composed machine renders and the RAF loop is parked
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AMBER = "#ffb65c";
const INK = "#f4f2ed";
// Scene-wide footprint — the single knob for how much of the right hero zone
// the machine fills. Applied to the root group (initial + animation target).
const MACHINE_SCALE = 1.6;
// Project hues as environmental whispers — satellite-sized only, never dominant.
const WHISPER = ["#8f7bff", "#22d3ee", "#fbbf24", "#62b6ff"];

/* Shared low-poly geometries — created once, reused every render. */
const CORE_GEO = new THREE.IcosahedronGeometry(0.8, 1);
const CORE_WIRE_GEO = new THREE.IcosahedronGeometry(0.815, 1);
const PULSE_GEO = new THREE.IcosahedronGeometry(0.35, 0);
const SAT_GEOS = [
  new THREE.OctahedronGeometry(1, 0),
  new THREE.BoxGeometry(1.25, 1.25, 1.25),
  new THREE.TetrahedronGeometry(1.15, 0),
];

interface SatelliteDef {
  r: number;
  speed: number;
  phase: number;
  tilt: [number, number, number];
  color: string;
  intensity: number;
  geo: number;
  scale: number;
}

function makeSatellites(lite: boolean): SatelliteDef[] {
  const full: SatelliteDef[] = [
    { r: 1.55, speed: 0.42, phase: 0.4, tilt: [0.42, 0, 0.18], color: AMBER, intensity: 1.3, geo: 0, scale: 0.1 },
    { r: 1.85, speed: -0.3, phase: 2.4, tilt: [-0.5, 0, -0.24], color: WHISPER[0], intensity: 0.5, geo: 1, scale: 0.08 },
    { r: 2.1, speed: 0.24, phase: 4.4, tilt: [0.24, 0, 0.4], color: WHISPER[1], intensity: 0.45, geo: 2, scale: 0.08 },
    { r: 1.7, speed: -0.5, phase: 5.6, tilt: [-0.18, 0, -0.42], color: WHISPER[2], intensity: 0.45, geo: 0, scale: 0.07 },
    { r: 2.35, speed: 0.2, phase: 1.6, tilt: [0.62, 0, 0.1], color: WHISPER[3], intensity: 0.4, geo: 1, scale: 0.07 },
    { r: 2.5, speed: -0.16, phase: 3.4, tilt: [-0.34, 0, 0.3], color: AMBER, intensity: 0.9, geo: 2, scale: 0.09 },
  ];
  return lite ? full.slice(0, 3) : full;
}

/** One inclined orbit + one small shape, integrated per frame (cheap). */
function Orbiter({
  sat,
  reduced,
  speedRef,
}: {
  sat: SatelliteDef;
  reduced: boolean;
  speedRef: { current: number };
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const angle = useRef(sat.phase);

  useFrame((_, delta) => {
    if (reduced) return; // static composition
    const m = mesh.current;
    if (!m) return;
    const d = Math.min(delta, 0.05);
    angle.current += d * sat.speed * speedRef.current;
    m.position.set(Math.cos(angle.current) * sat.r, 0, Math.sin(angle.current) * sat.r);
    m.rotation.x += d * 0.7;
    m.rotation.y += d * 0.45;
  });

  return (
    <group rotation={sat.tilt}>
      <mesh
        ref={mesh}
        geometry={SAT_GEOS[sat.geo]}
        scale={sat.scale}
        position={[Math.cos(sat.phase) * sat.r, 0, Math.sin(sat.phase) * sat.r]}
      >
        <meshStandardMaterial
          color={sat.color}
          emissive={sat.color}
          emissiveIntensity={sat.intensity}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

/** Even point shell (golden-angle distribution, deterministic — no hydration drift). */
function useShellPoints(count: number) {
  return useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963; // golden angle
      const r = 2.12 + Math.sin(i * 12.9898) * 0.23;
      arr[i * 3] = Math.cos(theta) * rad * r;
      arr[i * 3 + 1] = y * r;
      arr[i * 3 + 2] = Math.sin(theta) * rad * r;
    }
    return arr;
  }, [count]);
}

function Machine({ reduced, lite }: { reduced: boolean; lite: boolean }) {
  const root = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const arcA = useRef<THREE.Mesh>(null);
  const arcB = useRef<THREE.Mesh>(null);
  const shellPts = useRef<THREE.Points>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const coreGlow = useRef<THREE.PointLight>(null);
  const speedRef = useRef(1);
  const hovering = useRef(false);
  const tiltX = useRef(0);
  const tiltZ = useRef(0);

  const satellites = useMemo(() => makeSatellites(lite), [lite]);
  const shellPositions = useShellPoints(lite ? 80 : 160);

  useFrame((state, delta) => {
    if (reduced) return; // static, composed pose — no per-frame work
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const g = root.current;
    if (!g) return;

    // Hover: the machine leans in — eased speed-up + scale.
    const targetSpeed = hovering.current ? 1.85 : 1;
    speedRef.current += (targetSpeed - speedRef.current) * (1 - Math.exp(-5 * d));

    // Pointer parallax: eased tilt toward the cursor.
    const k = 1 - Math.exp(-2.6 * d);
    tiltX.current += (state.pointer.y * 0.16 - tiltX.current) * k;
    tiltZ.current += (state.pointer.x * -0.12 - tiltZ.current) * k;
    g.rotation.x = 0.06 + tiltX.current;
    g.rotation.z = tiltZ.current;
    g.rotation.y += d * 0.12 * speedRef.current;

    const targetScale = hovering.current ? MACHINE_SCALE * 1.035 : MACHINE_SCALE;
    g.scale.setScalar(g.scale.x + (targetScale - g.scale.x) * (1 - Math.exp(-6 * d)));

    // Instruments: rings precess slowly, energy arcs sweep visibly.
    if (ringA.current) {
      ringA.current.rotation.x += d * 0.045 * speedRef.current;
      ringA.current.rotation.y += d * 0.03;
    }
    if (ringB.current) ringB.current.rotation.y -= d * 0.04 * speedRef.current;
    if (arcA.current) arcA.current.rotation.z += d * 0.12 * speedRef.current;
    if (arcB.current) arcB.current.rotation.z -= d * 0.08 * speedRef.current;
    if (shellPts.current) shellPts.current.rotation.y -= d * 0.02;

    // The core breathes; its lamp follows.
    const breathe = 0.82 + Math.sin(t * 1.35) * 0.18 + (hovering.current ? 0.3 : 0);
    if (pulse.current) {
      const m = pulse.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.55 + breathe * 0.3;
      pulse.current.scale.setScalar(0.92 + breathe * 0.16);
    }
    if (coreGlow.current) coreGlow.current.intensity = 22 + breathe * 10;
  });

  return (
    <group ref={root} rotation={[0.08, -0.35, 0]} scale={MACHINE_SCALE}>
      {/* Invisible hit volume — hover/tactile response for the whole machine */}
      <mesh
        onPointerOver={() => {
          hovering.current = true;
        }}
        onPointerOut={() => {
          hovering.current = false;
        }}
      >
        <sphereGeometry args={[2.9, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Core — dark faceted housing, amber wireframe skin, breathing lamp */}
      <mesh geometry={CORE_GEO}>
        <meshStandardMaterial
          color="#14141c"
          roughness={0.32}
          metalness={0.78}
          emissive={AMBER}
          emissiveIntensity={0.07}
          flatShading
        />
      </mesh>
      <mesh geometry={CORE_WIRE_GEO}>
        <meshBasicMaterial color={AMBER} wireframe transparent opacity={0.13} />
      </mesh>
      <mesh ref={pulse} geometry={PULSE_GEO}>
        <meshBasicMaterial color={AMBER} transparent opacity={0.8} />
      </mesh>
      <pointLight ref={coreGlow} color={AMBER} intensity={26} distance={8} decay={2} />

      {/* Gyroscope rings — hairline instruments at fixed, distinct tilts */}
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[1.5, 0.011, 8, 96]} />
        <meshBasicMaterial color={INK} transparent opacity={0.16} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.9, -0.5, 0.4]}>
        <torusGeometry args={[1.85, 0.009, 8, 96]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.3} />
      </mesh>

      {/* Energy arcs — partial rings whose gap sweeps around the core */}
      <mesh ref={arcA} rotation={[Math.PI / 2.1, 0.9, 0.2]}>
        <torusGeometry args={[1.68, 0.006, 6, 80, Math.PI * 1.15]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.5} />
      </mesh>
      <mesh ref={arcB} rotation={[Math.PI / 1.75, -0.9, -0.3]}>
        <torusGeometry args={[2.0, 0.005, 6, 80, Math.PI * 0.8]} />
        <meshBasicMaterial color={INK} transparent opacity={0.2} />
      </mesh>

      {/* Data shell — sparse points for depth and atmosphere */}
      <points ref={shellPts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[shellPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={AMBER}
          size={0.02}
          sizeAttenuation
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </points>

      {/* Satellites — amber first, project hues as whispers */}
      {satellites.map((sat, i) => (
        <Orbiter key={i} sat={sat} reduced={reduced} speedRef={speedRef} />
      ))}
    </group>
  );
}

/**
 * Canvas wrapper. `lite` halves the element count and caps DPR on narrow
 * viewports; `reduced` parks the RAF loop entirely (static machine).
 */
export default function HeroMachine({ reduced = false }: { reduced?: boolean }) {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 48rem)");
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ fov: 40, position: [0, 0.4, 10.6], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "demand" : "always"}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 7, 4]} intensity={1.15} color="#e8ecff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.3} color="#8f7bff" />
      <Machine reduced={reduced} lite={lite} />
    </Canvas>
  );
}
