import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createRouteCurve, SCENE_GEOMETRIES, SCENE_MATERIALS } from './sceneUtils';

const PARCEL_SPEEDS = [0.062, 0.081, 0.097, 0.071];

function RouteParcel({ curve, offset, speed, reducedMotion }) {
  const parcelRef = useRef(null);
  const initialPoint = curve.getPointAt(offset);
  const initialTangent = curve.getTangentAt(offset);

  useFrame(({ clock }) => {
    if (!parcelRef.current) return;
    const progress = reducedMotion ? offset : (offset + clock.elapsedTime * speed) % 1;
    const point = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(progress);
    parcelRef.current.position.set(point.x, point.y + 0.06, point.z);
    parcelRef.current.rotation.y = Math.atan2(-tangent.z, tangent.x);
  });

  return (
    <group
      ref={parcelRef}
      position={[initialPoint.x, initialPoint.y + 0.06, initialPoint.z]}
      rotation={[0, Math.atan2(-initialTangent.z, initialTangent.x), 0]}
      scale={1.2}
    >
      <mesh geometry={SCENE_GEOMETRIES.parcel} material={SCENE_MATERIALS.parcel} dispose={null} />
      <mesh position={[0, 0.035, 0]} geometry={SCENE_GEOMETRIES.parcelBand} material={SCENE_MATERIALS.parcelBand} dispose={null} />
    </group>
  );
}

export function NetworkRoute({ points, curve, reducedMotion = false, particles = 3, activity = 1 }) {
  const route = useMemo(() => curve || createRouteCurve(points), [curve, points]);
  const geometry = useMemo(() => new THREE.TubeGeometry(route, 64, 0.026 + activity * 0.02, 5, false), [route, activity]);
  const underlay = useMemo(() => new THREE.TubeGeometry(route, 64, 0.07 + activity * 0.028, 5, false), [route, activity]);

  return (
    <group>
      <mesh geometry={underlay}>
        <meshBasicMaterial color="#b8d7bd" transparent opacity={0.1 + activity * 0.2} depthWrite={false} />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#328c57" transparent opacity={0.42 + activity * 0.47} depthWrite={false} />
      </mesh>
      {Array.from({ length: particles }, (_, index) => (
        <RouteParcel
          key={index}
          curve={route}
          offset={(index + 0.16) / particles}
          speed={PARCEL_SPEEDS[index % PARCEL_SPEEDS.length] * activity}
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
    boxRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.05 + delay) * 0.035;
    boxRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.38 + delay) * 0.045;
  });

  return (
    <group ref={boxRef} position={position}>
      <mesh
        position={[0, 0.045 - position[1], 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.31, 0.27, 1]}
        geometry={SCENE_GEOMETRIES.shadow}
        material={SCENE_MATERIALS.softShadow}
        renderOrder={1}
        dispose={null}
      />
      <mesh geometry={SCENE_GEOMETRIES.crate} material={SCENE_MATERIALS.crate} dispose={null} />
      <mesh position={[0, 0.17, 0]} geometry={SCENE_GEOMETRIES.crateLid} material={SCENE_MATERIALS.crateLid} dispose={null} />
      <mesh position={[0, 0.01, 0.196]} geometry={SCENE_GEOMETRIES.crateLabel} material={SCENE_MATERIALS.crateLabel} dispose={null} />
      <mesh position={[0, 0.01, 0.204]} geometry={SCENE_GEOMETRIES.crateStrap} material={SCENE_MATERIALS.crateStrap} dispose={null} />
    </group>
  );
}

function Wheel({ position, reducedMotion }) {
  const wheelRef = useRef(null);
  useFrame(() => {
    if (!reducedMotion && wheelRef.current) wheelRef.current.rotation.z += 0.045;
  });

  return (
    <mesh
      ref={wheelRef}
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
      geometry={SCENE_GEOMETRIES.wheel}
      material={SCENE_MATERIALS.wheel}
      dispose={null}
    />
  );
}

export function PickupVan({ curve, reducedMotion = false, speed = 0.035, offset = 0.08 }) {
  const vehicleRef = useRef(null);
  const initialProgress = (0.22 + offset) % 1;
  const initialPoint = curve?.getPointAt(initialProgress) || new THREE.Vector3();
  const initialTangent = curve?.getTangentAt(initialProgress) || new THREE.Vector3(1, 0, 0);

  useFrame(({ clock }) => {
    if (!vehicleRef.current || !curve) return;
    const progress = reducedMotion ? initialProgress : (clock.elapsedTime * speed + offset) % 1;
    const point = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(progress);
    vehicleRef.current.position.set(point.x, point.y - 0.14, point.z);
    vehicleRef.current.rotation.y = Math.atan2(-tangent.z, tangent.x);
  });

  return (
    <group
      ref={vehicleRef}
      position={[initialPoint.x, initialPoint.y - 0.14, initialPoint.z]}
      rotation={[0, Math.atan2(-initialTangent.z, initialTangent.x), 0]}
      scale={1.38}
    >
      <mesh
        position={[0, 0.008, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.68, 0.32, 1]}
        geometry={SCENE_GEOMETRIES.shadow}
        material={SCENE_MATERIALS.softShadow}
        renderOrder={1}
        dispose={null}
      />
      <mesh position={[0, 0.18, 0]} geometry={SCENE_GEOMETRIES.vanBody} material={SCENE_MATERIALS.vanBody} dispose={null} />
      {/* Enclosed rear cargo bay and green band make this read as a food pickup van, not a shuttle. */}
      <mesh position={[-0.2, 0.33, 0]} geometry={SCENE_GEOMETRIES.vanCargo} material={SCENE_MATERIALS.vanCargo} dispose={null} />
      <mesh position={[0.25, 0.32, 0]} geometry={SCENE_GEOMETRIES.vanCab} material={SCENE_MATERIALS.vanCab} dispose={null} />
      <mesh position={[-0.2, 0.31, 0.247]} geometry={SCENE_GEOMETRIES.vanStripe} material={SCENE_MATERIALS.vanStripe} dispose={null} />
      <mesh position={[-0.2, 0.31, 0.257]} geometry={SCENE_GEOMETRIES.vanBadge} material={SCENE_MATERIALS.vanBadge} dispose={null} />
      <mesh position={[0.25, 0.33, 0.24]} geometry={SCENE_GEOMETRIES.vanSideWindow} material={SCENE_MATERIALS.vanGlass} dispose={null} />
      <mesh position={[0.25, 0.33, -0.24]} geometry={SCENE_GEOMETRIES.vanSideWindow} material={SCENE_MATERIALS.vanGlass} dispose={null} />
      <mesh position={[0.463, 0.33, 0]} geometry={SCENE_GEOMETRIES.vanWindshield} material={SCENE_MATERIALS.vanGlass} dispose={null} />
      <mesh position={[0.49, 0.18, 0]} geometry={SCENE_GEOMETRIES.vanBumper} material={SCENE_MATERIALS.vanCargo} dispose={null} />
      <mesh position={[0.485, 0.2, 0.155]} geometry={SCENE_GEOMETRIES.vanLamp} material={SCENE_MATERIALS.vanLamp} dispose={null} />
      <mesh position={[0.485, 0.2, -0.155]} geometry={SCENE_GEOMETRIES.vanLamp} material={SCENE_MATERIALS.vanLamp} dispose={null} />
      <Wheel position={[-0.31, 0.125, 0.27]} reducedMotion={reducedMotion} />
      <Wheel position={[0.31, 0.125, 0.27]} reducedMotion={reducedMotion} />
      <Wheel position={[-0.31, 0.125, -0.27]} reducedMotion={reducedMotion} />
      <Wheel position={[0.31, 0.125, -0.27]} reducedMotion={reducedMotion} />
    </group>
  );
}
