"use client";

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const AMBER = "#ffb65c";
const RINGS: { radius: number; tilt: [number, number, number]; speed: number; color: string }[] = [
  { radius: 1.62, tilt: [0.65, -0.38, -0.5], speed: 0.045, color: AMBER },
  { radius: 2.02, tilt: [1.05, 0.48, 0.48], speed: -0.032, color: "#78b8da" },
  { radius: 2.38, tilt: [-0.55, 0.64, -0.38], speed: 0.023, color: AMBER },
  { radius: 2.62, tilt: [0.9, -0.65, 0.65], speed: -0.018, color: "#a497d2" },
];

/** Local studio reflections: no network assets or postprocessing. */
function Studio() {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const target = generator.fromScene(room, 0.035);
    const previous = scene.environment;
    scene.environment = target.texture;
    invalidate();
    room.dispose();
    generator.dispose();
    return () => { scene.environment = previous; target.dispose(); };
  }, [gl, scene, invalidate]);
  return null;
}

function Gimbal({ index, lite, reduced }: { index: number; lite: boolean; reduced: boolean }) {
  const moving = useRef<THREE.Group>(null);
  const ring = RINGS[index];
  useFrame((_, delta) => {
    if (!reduced && moving.current) moving.current.rotation.z += Math.min(delta, 0.05) * ring.speed;
  });
  return (
    <group rotation={ring.tilt}>
      <group ref={moving} rotation={[0, 0, index * 1.4]}>
        <mesh>
          <torusGeometry args={[ring.radius, index === 0 ? 0.055 : 0.032, lite ? 8 : 12, lite ? 80 : 144]} />
          <meshPhysicalMaterial color={index % 2 ? "#777a82" : "#8a7965"} metalness={0.95} roughness={0.22} clearcoat={0.65} envMapIntensity={1.3} />
        </mesh>
        <mesh rotation={[0, 0, 0.35]}>
          <torusGeometry args={[ring.radius + 0.006, 0.009, 6, lite ? 40 : 72, Math.PI * 0.64]} />
          <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={0.65} metalness={0.5} roughness={0.3} />
        </mesh>
        {index < 3 && (
          <group position={[ring.radius, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <mesh>
              <boxGeometry args={[0.13, 0.22, 0.13]} />
              <meshPhysicalMaterial color="#757782" metalness={0.9} roughness={0.2} clearcoat={1} />
            </mesh>
            <mesh position={[0, 0, 0.071]}>
              <boxGeometry args={[0.035, 0.13, 0.012]} />
              <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.8} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

function Artifact({ lite, reduced }: { lite: boolean; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const { size } = useThree();
  // Fit the full silhouette to the unchanged slot, including short mobile slots.
  const scale = Math.min(1, size.width / size.height) * 1.02;
  const profile = useMemo(() => [
    [0, -0.55], [0.72, -0.55], [0.91, -0.48], [1.04, -0.31],
    [1.08, -0.18], [1.08, 0.18], [1.02, 0.32], [0.86, 0.43], [0, 0.43],
  ].map(([x, y]) => new THREE.Vector2(x, y)), []);
  useFrame(({ pointer }, delta) => {
    const group = root.current;
    if (!group || reduced) return;
    const smoothing = 1 - Math.exp(-2 * Math.min(delta, 0.05));
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0.12 + pointer.y * 0.07, smoothing);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, -0.3 + pointer.x * 0.1, smoothing);
  });
  useEffect(() => {
    if (reduced && root.current) root.current.rotation.set(0.12, -0.3, -0.12);
  }, [reduced]);
  return (
    <group ref={root} scale={scale} rotation={[0.12, -0.3, -0.12]}>
      {/* Beveled housing with a recessed coated optical face, not a spherical core. */}
      <group rotation={[-Math.PI / 2 + 0.2, 0, -0.18]}>
        <mesh>
          <latheGeometry args={[profile, lite ? 48 : 96]} />
          <meshPhysicalMaterial color="#292c36" metalness={0.88} roughness={0.2} clearcoat={1} clearcoatRoughness={0.12} envMapIntensity={1.7} />
        </mesh>
        {[-0.34, 0.18].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.065, 0.018, 8, lite ? 64 : 112]} />
            <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.32} metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
        <mesh position={[0, -0.565, 0]}>
          <cylinderGeometry args={[0.71, 0.71, 0.035, lite ? 48 : 96]} />
          <meshPhysicalMaterial color="#080d18" metalness={0.45} roughness={0.08} clearcoat={1} clearcoatRoughness={0.04} envMapIntensity={2} />
        </mesh>
        <mesh position={[0, -0.59, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.73, 0.035, 10, lite ? 64 : 112]} />
          <meshPhysicalMaterial color="#9a8a78" metalness={1} roughness={0.19} clearcoat={0.6} />
        </mesh>
        <mesh position={[0, -0.595, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.46, 0.006, 6, 64, Math.PI * 1.35]} />
          <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
      {RINGS.slice(0, lite ? 3 : 4).map((_, index) => <Gimbal key={index} index={index} lite={lite} reduced={reduced} />)}
    </group>
  );
}

/** Renderer failures remain isolated to this decorative slot. */
class RendererBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function HeroMachine({ reduced = false }: { reduced?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [lite, setLite] = useState(true);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 48rem)");
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} className="h-full w-full">
      <RendererBoundary>
        <Canvas
          fallback={<span />}
          dpr={lite ? [1, 1.25] : [1, 1.75]}
          camera={{ fov: 38, position: [0, 0, 8.5], near: 0.1, far: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          frameloop={reduced || !visible || !pageVisible ? "demand" : "always"}
          style={{ background: "transparent", pointerEvents: lite || reduced ? "none" : "auto" }}
        >
          <Studio />
          <ambientLight intensity={0.2} />
          <directionalLight position={[3, 5, 5]} intensity={3} color="#f5e8d8" />
          <directionalLight position={[-4, 1, 2]} intensity={1.2} color="#8f7bff" />
          <pointLight position={[2, -2, 3]} intensity={12} color={AMBER} />
          <pointLight position={[-2, -1, -2]} intensity={6} color="#69c5c0" />
          {!lite && <pointLight position={[3, 2, -2]} intensity={5} color="#da8d83" />}
          <directionalLight position={[1, -3, -3]} intensity={0.6} color="#62b6ff" />
          <Artifact lite={lite} reduced={reduced} />
        </Canvas>
      </RendererBoundary>
    </div>
  );
}
