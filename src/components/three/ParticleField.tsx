import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMotionValue, type MotionValue } from "framer-motion";
import * as THREE from "three";

const WASTE = new THREE.Color("#8a6d4b");
const RECYCLE = new THREE.Color("#2563eb");
const PRODUCT = new THREE.Color("#22c55e");

function phaseColor(t: number, target: THREE.Color) {
  // t in [0,1] across three phases
  if (t < 0.5) {
    target.copy(WASTE).lerp(RECYCLE, t / 0.5);
  } else {
    target.copy(RECYCLE).lerp(PRODUCT, (t - 0.5) / 0.5);
  }
  return target;
}

function Particles({ progress }: { progress: MotionValue<number> }) {
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const count = 1800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const color = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const t = progress.get();
    const speed = 0.05 + t * 0.25;
    if (points.current) {
      points.current.rotation.y += delta * speed;
      const scale = 1 - t * 0.25;
      points.current.scale.setScalar(scale);
    }
    if (mat.current) {
      mat.current.color.copy(phaseColor(t, color));
      mat.current.opacity = 0.6 + t * 0.3;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Crystal({ progress }: { progress: MotionValue<number> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const t = progress.get();
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * (0.15 + t * 0.3);
    }
    if (mat.current) {
      mat.current.color.copy(phaseColor(t, color));
      mat.current.emissive.copy(color);
      mat.current.emissiveIntensity = 0.25 + t * 0.4;
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.4, 0]} />
      <meshPhysicalMaterial
        ref={mat}
        transmission={0.9}
        thickness={1.5}
        roughness={0.15}
        metalness={0.1}
        transparent
        opacity={0.85}
        clearcoat={1}
      />
    </mesh>
  );
}

export function ParticleField({ progress }: { progress?: MotionValue<number> }) {
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#22c55e" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#2563eb" />
      <Crystal progress={p} />
      <Particles progress={p} />
    </Canvas>
  );
}
