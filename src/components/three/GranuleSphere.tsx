import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Cloud({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const count = 260;

  const items = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        scale: 0.08 + Math.random() * 0.09,
      });
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} scale={it.scale}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export function GranuleSphere({ color }: { color: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={2} color={color} />
      <Cloud color={color} />
    </Canvas>
  );
}
