import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createRouteCurve } from './sceneUtils';

function RouteParticle({ curve, offset, speed, reducedMotion }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const progress = reducedMotion ? offset : (offset + clock.elapsedTime * speed) % 1;
    ref.current.position.copy(curve.getPointAt(progress));
  });
  return (
    <mesh ref={ref} castShadow={false}>
      <sphereGeometry args={[0.075, 10, 8]} />
      <meshStandardMaterial color="#3aa96b" emissive="#38a968" emissiveIntensity={0.55} roughness={0.28} />
    </mesh>
  );
}

export function NetworkRoute({ points, curve, reducedMotion = false, particles = 3 }) {
  const route = useMemo(() => curve || createRouteCurve(points), [curve, points]);
  const geometry = useMemo(() => new THREE.TubeGeometry(route, 64, 0.025, 5, false), [route]);
  const underlay = useMemo(() => new THREE.TubeGeometry(route, 64, 0.07, 5, false), [route]);
  return (
    <group>
      <mesh geometry={underlay} castShadow={false}>
        <meshBasicMaterial color="#b8d7bd" transparent opacity={0.36} />
      </mesh>
      <mesh geometry={geometry} castShadow={false}>
        <meshBasicMaterial color="#38a968" transparent opacity={0.88} />
      </mesh>
      {Array.from({ length: particles }, (_, index) => (
        <RouteParticle
          key={index}
          curve={route}
          offset={index / particles}
          speed={0.075 + index * 0.012}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

export function FoodBox({ position, delay = 0, reducedMotion = false }) {
  const boxRef = useRef(null);
  useFrame(({ clock }) => {
    if (!boxRef.current || reducedMotion) return;
    boxRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.3 + delay) * 0.06;
    boxRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.45 + delay) * 0.08;
  });
  return (
    <group ref={boxRef} position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.34, 0.28, 0.3]} />
        <meshStandardMaterial color="#d6a96a" roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.02, 0.156]} castShadow={false}>
        <boxGeometry args={[0.19, 0.12, 0.012]} />
        <meshStandardMaterial color="#fff2d1" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.145, 0]} castShadow={false}>
        <boxGeometry args={[0.37, 0.045, 0.33]} />
        <meshStandardMaterial color="#b9834f" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.17, 0]} castShadow={false}>
        <boxGeometry args={[0.2, 0.025, 0.04]} />
        <meshStandardMaterial color="#8f6a45" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Wheel({ position, reducedMotion }) {
  const wheelRef = useRef(null);
  useFrame(() => {
    if (!reducedMotion && wheelRef.current) wheelRef.current.rotation.x += 0.045;
  });
  return (
    <mesh ref={wheelRef} position={position} rotation={[0, 0, Math.PI / 2]} castShadow={false}>
      <cylinderGeometry args={[0.105, 0.105, 0.07, 12]} />
      <meshStandardMaterial color="#49574e" roughness={0.92} />
    </mesh>
  );
}

export function PickupVan({ curve, reducedMotion = false, speed = 0.035, offset = 0.08 }) {
  const vehicleRef = useRef(null);
  useFrame(({ clock }) => {
    if (!vehicleRef.current || !curve) return;
    const progress = reducedMotion ? (0.22 + offset) % 1 : (clock.elapsedTime * speed + offset) % 1;
    const point = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(progress);
    vehicleRef.current.position.set(point.x, point.y + 0.18, point.z);
    vehicleRef.current.rotation.y = Math.atan2(tangent.x, tangent.z);
  });
  return (
    <group ref={vehicleRef}>
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.3, 0.42]} />
        <meshStandardMaterial color="#f7f2e5" roughness={0.62} />
      </mesh>
      <mesh position={[0.13, 0.4, 0]} castShadow={false}>
        <boxGeometry args={[0.35, 0.22, 0.4]} />
        <meshStandardMaterial color="#dfead9" roughness={0.52} />
      </mesh>
      <mesh position={[-0.25, 0.18, 0.216]} castShadow={false}>
        <boxGeometry args={[0.18, 0.13, 0.012]} />
        <meshStandardMaterial color="#4f8e68" roughness={0.5} />
      </mesh>
      <mesh position={[0.27, 0.18, 0.216]} castShadow={false}>
        <boxGeometry args={[0.12, 0.1, 0.012]} />
        <meshStandardMaterial color="#f0c16e" emissive="#e7a850" emissiveIntensity={0.18} />
      </mesh>
      <Wheel position={[-0.22, 0.04, 0.22]} reducedMotion={reducedMotion} />
      <Wheel position={[0.24, 0.04, 0.22]} reducedMotion={reducedMotion} />
      <Wheel position={[-0.22, 0.04, -0.22]} reducedMotion={reducedMotion} />
      <Wheel position={[0.24, 0.04, -0.22]} reducedMotion={reducedMotion} />
      <FoodBox position={[-0.02, 0.34, 0]} reducedMotion />
    </group>
  );
}
