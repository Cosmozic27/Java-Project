import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const materials = {
  floor: new THREE.MeshStandardMaterial({ color: '#443a30', roughness: 0.94 }),
  kitchenWall: new THREE.MeshStandardMaterial({ color: '#765c43', roughness: 0.9 }),
  warmTile: new THREE.MeshStandardMaterial({ color: '#c4a780', roughness: 0.86 }),
  steel: new THREE.MeshStandardMaterial({ color: '#9ea9a4', metalness: 0.48, roughness: 0.42 }),
  darkSteel: new THREE.MeshStandardMaterial({ color: '#56615c', metalness: 0.36, roughness: 0.58 }),
  cream: new THREE.MeshStandardMaterial({ color: '#f2e7d3', roughness: 0.82 }),
  wood: new THREE.MeshStandardMaterial({ color: '#b57b45', roughness: 0.9 }),
  woodDark: new THREE.MeshStandardMaterial({ color: '#815432', roughness: 0.94 }),
  orange: new THREE.MeshStandardMaterial({ color: '#cf8250', roughness: 0.8 }),
  road: new THREE.MeshStandardMaterial({ color: '#343b39', roughness: 0.98 }),
  sidewalk: new THREE.MeshStandardMaterial({ color: '#b7b2a5', roughness: 0.95 }),
  asphaltMark: new THREE.MeshStandardMaterial({ color: '#e9dec6', roughness: 0.9 }),
  green: new THREE.MeshStandardMaterial({ color: '#1b8a4b', roughness: 0.64, emissive: '#0b5328', emissiveIntensity: 0.45 }),
  greenGlow: new THREE.MeshBasicMaterial({ color: '#47ed85' }),
  glass: new THREE.MeshStandardMaterial({ color: '#8dc4b5', roughness: 0.24, metalness: 0.1, emissive: '#315e55', emissiveIntensity: 0.25 }),
  building: new THREE.MeshStandardMaterial({ color: '#d4b995', roughness: 0.92 }),
  buildingGreen: new THREE.MeshStandardMaterial({ color: '#8eaa8a', roughness: 0.9 }),
  buildingRust: new THREE.MeshStandardMaterial({ color: '#c77c5c', roughness: 0.9 }),
  hub: new THREE.MeshStandardMaterial({ color: '#eee1c9', roughness: 0.9 }),
  dark: new THREE.MeshStandardMaterial({ color: '#273530', roughness: 0.88 }),
  van: new THREE.MeshStandardMaterial({ color: '#f4eee0', roughness: 0.58 }),
  tire: new THREE.MeshStandardMaterial({ color: '#202724', roughness: 0.94 }),
  tomato: new THREE.MeshStandardMaterial({ color: '#d56d43', roughness: 0.82 }),
  greens: new THREE.MeshStandardMaterial({ color: '#718d4b', roughness: 0.9 }),
  golden: new THREE.MeshStandardMaterial({ color: '#e2b661', roughness: 0.82 }),
  purple: new THREE.MeshStandardMaterial({ color: '#8c6573', roughness: 0.85 }),
};

const CAMERA_PATH = [
  { position: [0, 2.9, 12.5], target: [0, 2.1, 4.2] },
  { position: [0.2, 1.9, 0.7], target: [-0.2, 1.2, -6.4] },
  { position: [-2.1, 3.1, -9.6], target: [0.2, 1.8, -17.8] },
  { position: [1.6, 4.0, -15], target: [0, 1.5, -28.5] },
  { position: [0.8, 5.0, -28.5], target: [0, 1.8, -40.5] },
  { position: [0, 57, 19], target: [0, 0, -21] },
];

const SKY_COLORS = ['#31251d', '#74543a', '#3d5245', '#273c38', '#a47b50', '#b9cfad'].map((value) => new THREE.Color(value));
const v3 = (array) => new THREE.Vector3(array[0], array[1], array[2]);
const contactShadow = new THREE.MeshBasicMaterial({ color: '#536257', transparent: true, opacity: 0.18, depthWrite: false });

function Box({ position, size, material, rotation }) {
  return (
    <mesh position={position} scale={size} rotation={rotation} material={material} castShadow={false} receiveShadow={false}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

function ContactShadow({ position = [0, 0.015, 0], scale = [1, 1, 1] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale} material={contactShadow} renderOrder={1}>
      <circleGeometry args={[1, 32]} />
    </mesh>
  );
}

function WarmPendant({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.65, 0]} material={materials.darkSteel}><cylinderGeometry args={[0.025, 0.025, 1.3, 6]} /></mesh>
      <mesh position={[0, 0, 0]} material={materials.golden}><coneGeometry args={[0.38, 0.26, 8, 1, true]} /></mesh>
      <pointLight position={[0, -0.2, 0]} color="#ffc27e" intensity={10} distance={7} decay={2} />
    </group>
  );
}

function Kitchen() {
  return (
    <group>
      <ContactShadow position={[0, 0.01, 2.4]} scale={[5.7, 4.5, 1]} />
      <Box position={[0, -0.19, 2.6]} size={[15, 0.35, 18]} material={materials.floor} />
      <Box position={[-6.7, 2.15, 0]} size={[0.34, 4.5, 14]} material={materials.kitchenWall} />
      <Box position={[6.7, 2.15, 0]} size={[0.34, 4.5, 14]} material={materials.kitchenWall} />
      <Box position={[0, 2.15, -5.8]} size={[13.3, 4.5, 0.34]} material={materials.kitchenWall} />
      <Box position={[0, 4.45, 1.1]} size={[13.6, 0.18, 9.2]} material={materials.dark} />
      <Box position={[0, 0.57, 4.1]} size={[8.2, 1.1, 1.35]} material={materials.darkSteel} />
      <Box position={[0, 1.17, 4.1]} size={[8.5, 0.12, 1.52]} material={materials.steel} />
      <Box position={[-4.5, 1.55, -1.7]} size={[2.2, 0.16, 4.2]} material={materials.steel} />
      <Box position={[-4.5, 0.72, -1.7]} size={[2, 1.55, 3.9]} material={materials.darkSteel} />
      <Box position={[4.5, 1.55, -1.7]} size={[2.2, 0.16, 4.2]} material={materials.steel} />
      <Box position={[4.5, 0.72, -1.7]} size={[2, 1.55, 3.9]} material={materials.darkSteel} />
      <Box position={[-4.45, 2.5, -2.2]} size={[1.68, 0.82, 1.3]} material={materials.dark} />
      <Box position={[4.42, 2.45, -2.2]} size={[1.72, 0.74, 1.45]} material={materials.cream} />
      <Box position={[4.42, 2.87, -2.2]} size={[1.42, 0.08, 1.12]} material={materials.green} />
      <Box position={[0, 1.95, -5.54]} size={[4.2, 1.4, 0.08]} material={materials.glass} />
      <Box position={[0, 1.95, -5.45]} size={[0.1, 1.5, 0.13]} material={materials.darkSteel} />
      <WarmPendant position={[-3.2, 3.55, 1.6]} />
      <WarmPendant position={[0, 3.55, 1.6]} />
      <WarmPendant position={[3.2, 3.55, 1.6]} />
      <Box position={[-2.25, 1.23, 4.06]} size={[0.9, 0.09, 0.72]} material={materials.cream} />
      <Box position={[1.55, 1.23, 4.06]} size={[0.82, 0.09, 0.68]} material={materials.golden} />
      <FoodCrate position={[-1.1, 0.15, -1.8]} large />
      <FoodCrate position={[1.05, 0.15, -2.55]} />
      <FoodCrate position={[2.0, 0.15, -1.95]} />
      <Box position={[-5.94, 3.15, 0.8]} size={[0.08, 0.09, 0.24]} material={materials.golden} />
      <Box position={[5.94, 3.15, 0.8]} size={[0.08, 0.09, 0.24]} material={materials.golden} />
    </group>
  );
}

function FoodCrate({ position, large = false }) {
  const scale = large ? 1.25 : 1;
  return (
    <group position={position} scale={scale}>
      <Box position={[0, 0.34, 0]} size={[1.08, 0.68, 0.88]} material={materials.wood} />
      <Box position={[0, 0.7, 0]} size={[1.14, 0.08, 0.94]} material={materials.woodDark} />
      <Box position={[0, 0.37, 0.45]} size={[0.48, 0.28, 0.025]} material={materials.cream} />
      <Box position={[0, 0.38, 0.47]} size={[0.25, 0.045, 0.012]} material={materials.green} />
      <mesh position={[-0.23, 0.81, 0.02]} scale={0.18} material={materials.tomato}><dodecahedronGeometry args={[1, 0]} /></mesh>
      <mesh position={[0.04, 0.82, -0.12]} scale={0.17} material={materials.greens}><icosahedronGeometry args={[1, 0]} /></mesh>
      <mesh position={[0.23, 0.81, 0.12]} scale={0.17} material={materials.golden}><dodecahedronGeometry args={[1, 0]} /></mesh>
    </group>
  );
}

function CommunityBuilding() {
  return (
    <group position={[0, 0, -40.4]}>
      <ContactShadow position={[0, 0.02, 1.2]} scale={[5.8, 3.8, 1]} />
      <Box position={[0, 2.1, 0]} size={[9.6, 4.2, 5.7]} material={materials.hub} />
      <Box position={[0, 4.38, 0]} size={[10.2, 0.38, 6.2]} material={materials.green} />
      <Box position={[0, 0.7, 2.89]} size={[9.7, 1.3, 0.16]} material={materials.orange} />
      <Box position={[0, 1.98, 2.91]} size={[2.1, 2.8, 0.16]} material={materials.dark} />
      <Box position={[-3.4, 2.42, 2.91]} size={[1.75, 1.8, 0.18]} material={materials.glass} />
      <Box position={[3.4, 2.42, 2.91]} size={[1.75, 1.8, 0.18]} material={materials.glass} />
      <Box position={[0, 3.88, 2.97]} size={[3.6, 0.5, 0.12]} material={materials.cream} />
      <Box position={[-2.65, 0.77, 4.2]} size={[2.2, 0.16, 1.6]} material={materials.wood} />
      <FoodCrate position={[-3.05, 0.1, 3.6]} />
      <FoodCrate position={[-2.05, 0.1, 3.8]} />
      <Person position={[3.25, 0, 4.8]} shirt={materials.green} />
      <Person position={[-4.3, 0, 5.2]} shirt={materials.orange} />
      <pointLight position={[0, 3, 3.7]} color="#ffd290" intensity={5} distance={12} />
    </group>
  );
}

function Person({ position, shirt }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} material={shirt}><capsuleGeometry args={[0.22, 0.8, 3, 7]} /></mesh>
      <mesh position={[0, 1.58, 0]} material={materials.golden}><sphereGeometry args={[0.19, 10, 8]} /></mesh>
    </group>
  );
}

function StreetBuilding({ position, height, material, mobile }) {
  const windows = mobile ? [0] : [-1.65, 0, 1.65];
  const floors = mobile ? [1] : Array.from({ length: Math.max(1, Math.floor((height - 1) / 2)) }, (_, i) => 1.2 + i * 1.65);
  return (
    <group position={position}>
      <ContactShadow position={[0, 0.02, 0]} scale={[2.5, 2.9, 1]} />
      <Box position={[0, height / 2, 0]} size={[4.8, height, 6.4]} material={material} />
      <Box position={[0, height + 0.16, 0]} size={[5.15, 0.32, 6.7]} material={materials.dark} />
      <Box position={[0, 0.12, 3.24]} size={[4.7, 0.24, 0.18]} material={materials.woodDark} />
      {windows.flatMap((z) => floors.map((y) => (
        <React.Fragment key={`${z}-${y}`}>
          <Box position={[-2.42, y, z]} size={[0.08, 0.82, 0.72]} material={materials.glass} />
          <Box position={[2.42, y, z]} size={[0.08, 0.82, 0.72]} material={materials.glass} />
        </React.Fragment>
      )))}
      <Box position={[-2.46, 0.66, 0]} size={[0.12, 1.22, 1.05]} material={materials.dark} />
      <Box position={[2.46, 0.66, 0]} size={[0.12, 1.22, 1.05]} material={materials.dark} />
      <Box position={[0, 0.9, 3.36]} size={[1.15, 1.8, 0.14]} material={materials.woodDark} />
      <Box position={[0, 2.05, 3.38]} size={[2.3, 0.12, 0.2]} material={materials.golden} />
    </group>
  );
}

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <ContactShadow position={[0, 0.02, 0]} scale={[0.75, 0.48, 1]} />
      <mesh position={[0, 0.7, 0]} material={materials.woodDark}><cylinderGeometry args={[0.12, 0.16, 1.4, 6]} /></mesh>
      <mesh position={[0, 1.65, 0]} material={materials.greens}><icosahedronGeometry args={[0.9, 1]} /></mesh>
      <mesh position={[0.42, 1.9, -0.12]} scale={0.55} material={materials.buildingGreen}><dodecahedronGeometry args={[0.75, 0]} /></mesh>
    </group>
  );
}

const ROUTE_POINTS = [
  [-2.3, 0.055, -8], [-2.6, 0.06, -13], [-1.8, 0.06, -17], [1.6, 0.06, -21], [2.4, 0.06, -26], [0.5, 0.06, -31], [-0.8, 0.06, -36],
];
const DONOR_ROUTE_POINTS = [
  [-14, 0.075, -17.5], [-10, 0.075, -17.5], [-6, 0.075, -16.5], [-2.4, 0.075, -16.8], [1.5, 0.075, -21], [5.6, 0.075, -29], [11, 0.075, -33], [14, 0.075, -33],
];

function RouteNetwork({ mobile, reducedMotion }) {
  const route = useMemo(() => new THREE.CatmullRomCurve3(ROUTE_POINTS.map(v3)), []);
  const donorRoute = useMemo(() => new THREE.CatmullRomCurve3(DONOR_ROUTE_POINTS.map(v3)), []);
  const particlesRef = useRef([]);
  const geometry = useMemo(() => new THREE.TubeGeometry(route, 90, 0.045, 5, false), [route]);
  const sideGeometry = useMemo(() => new THREE.TubeGeometry(donorRoute, 64, 0.028, 5, false), [donorRoute]);
  const dots = mobile ? 5 : 11;

  useFrame(({ clock }) => {
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;
      const progress = reducedMotion ? (index * 0.21) % 1 : (clock.elapsedTime * 0.085 + index / dots) % 1;
      const point = route.getPointAt(progress);
      particle.position.set(point.x, point.y + 0.07, point.z);
    });
  });

  return (
    <group>
      <mesh geometry={geometry} material={materials.green} />
      <mesh geometry={sideGeometry} material={materials.green} />
      {Array.from({ length: dots }, (_, index) => (
        <mesh key={index} ref={(element) => { particlesRef.current[index] = element; }} scale={index % 3 === 0 ? 0.105 : 0.067} material={materials.greenGlow}>
          <sphereGeometry args={[1, 8, 7]} />
        </mesh>
      ))}
    </group>
  );
}

function PickupVan({ progressRef, reducedMotion, mobile }) {
  const vanRef = useRef(null);
  const wheelsRef = useRef([]);
  const route = useMemo(() => new THREE.CatmullRomCurve3(ROUTE_POINTS.map(v3)), []);
  useFrame(({ clock }) => {
    if (!vanRef.current) return;
    const progress = progressRef.current;
    const travel = Math.max(0, Math.min(1, (progress - 0.4) / 0.46));
    const eased = travel * travel * (3 - 2 * travel);
    const routeProgress = 0.08 + eased * 0.86;
    const point = route.getPointAt(routeProgress);
    const tangent = route.getTangentAt(routeProgress);
    vanRef.current.visible = progress >= 0.36;
    vanRef.current.position.set(point.x, 0.03 + Math.sin(clock.elapsedTime * 7) * (reducedMotion || mobile ? 0 : 0.018), point.z);
    vanRef.current.rotation.y = Math.atan2(-tangent.z, tangent.x);
    if (!reducedMotion) wheelsRef.current.forEach((wheel) => { if (wheel) wheel.rotation.x += 0.085; });
  });

  return (
    <group ref={vanRef} position={[0, 0.03, -18.5]} scale={mobile ? 0.72 : 0.84}>
      <ContactShadow position={[0, -0.01, 0]} scale={[1.2, 1.8, 1]} />
      <mesh position={[0, 0.94, 0]} material={materials.van}><boxGeometry args={[1.72, 0.96, 3.22]} /></mesh>
      <mesh position={[0, 1.52, 0.28]} material={materials.van}><boxGeometry args={[1.66, 0.34, 2.2]} /></mesh>
      <mesh position={[0, 1.42, -1.3]} material={materials.glass}><boxGeometry args={[1.48, 0.55, 0.08]} /></mesh>
      <mesh position={[0, 0.97, 1.63]} material={materials.green}><boxGeometry args={[1.74, 0.2, 0.07]} /></mesh>
      <mesh position={[0, 1.16, 0.15]} material={materials.green}><boxGeometry args={[0.36, 0.34, 0.04]} /></mesh>
      <mesh position={[0, 0.22, -0.05]} material={materials.dark}><boxGeometry args={[1.9, 0.16, 3.1]} /></mesh>
      {[[-0.92, 0.38, -1.03], [0.92, 0.38, -1.03], [-0.92, 0.38, 1.02], [0.92, 0.38, 1.02]].map((position, index) => (
        <mesh key={index} ref={(element) => { wheelsRef.current[index] = element; }} position={position} rotation={[0, 0, Math.PI / 2]} material={materials.tire}>
          <cylinderGeometry args={[0.38, 0.38, 0.19, 10]} />
        </mesh>
      ))}
      <FoodCrate position={[-0.34, 1.48, 0.35]} />
      <pointLight position={[0, 1.7, 0]} color="#4af08a" intensity={1.2} distance={3.5} />
    </group>
  );
}

function MovingFoodCrate({ progressRef, route, startProgress, endProgress, startRoute, endRoute, destination, mobile, reducedMotion, retainAtEnd = false }) {
  const crateRef = useRef(null);
  const destinationVector = useMemo(() => v3(destination), [destination]);

  useFrame(() => {
    if (!crateRef.current) return;
    const progress = progressRef.current;
    const normalized = Math.max(0, Math.min(1, (progress - startProgress) / (endProgress - startProgress)));
    const eased = normalized * normalized * (3 - 2 * normalized);
    const routePoint = route.getPointAt(THREE.MathUtils.lerp(startRoute, endRoute, eased));
    const point = normalized < 1 ? routePoint : destinationVector;
    crateRef.current.visible = normalized > 0 && (normalized < 1 || (retainAtEnd && progress >= endProgress));
    crateRef.current.position.set(point.x, point.y + 0.16 + (reducedMotion ? 0 : Math.sin(progress * Math.PI * 6) * 0.025), point.z);
    crateRef.current.rotation.y = reducedMotion ? 0 : eased * Math.PI * 0.8;
    const scale = (mobile ? 0.72 : 0.92) * (0.72 + Math.sin(normalized * Math.PI) * 0.28);
    crateRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={crateRef} position={destination}>
      <FoodCrate />
    </group>
  );
}

function FoodTransferSequence({ progressRef, mobile, reducedMotion }) {
  const route = useMemo(() => new THREE.CatmullRomCurve3(ROUTE_POINTS.map(v3)), []);
  return (
    <group>
      <MovingFoodCrate
        progressRef={progressRef}
        route={route}
        startProgress={0.31}
        endProgress={0.48}
        startRoute={0.03}
        endRoute={0.33}
        destination={[-2.3, 0.15, -8]}
        mobile={mobile}
        reducedMotion={reducedMotion}
      />
      <MovingFoodCrate
        progressRef={progressRef}
        route={route}
        startProgress={0.78}
        endProgress={0.96}
        startRoute={0.72}
        endRoute={0.98}
        destination={[-2.4, 0.15, -37.2]}
        mobile={mobile}
        reducedMotion={reducedMotion}
        retainAtEnd
      />
    </group>
  );
}

function StreetScene({ mobile, reducedMotion, progressRef }) {
  const buildings = mobile ? [
    { x: -7.3, z: -13, h: 6.2, mat: materials.buildingRust },
    { x: 7.3, z: -18, h: 7.7, mat: materials.buildingGreen },
    { x: -7.3, z: -25, h: 5.8, mat: materials.building },
    { x: 7.3, z: -30, h: 6.3, mat: materials.buildingRust },
  ] : [
    { x: -7.3, z: -11, h: 7.2, mat: materials.buildingRust },
    { x: 7.3, z: -12.5, h: 9.2, mat: materials.buildingGreen },
    { x: -14, z: -12, h: 5.8, mat: materials.building },
    { x: 14, z: -13.5, h: 6.7, mat: materials.buildingRust },
    { x: -7.3, z: -20.5, h: 6.5, mat: materials.building },
    { x: 7.3, z: -22, h: 7.3, mat: materials.buildingRust },
    { x: -14, z: -27.5, h: 7.1, mat: materials.buildingGreen },
    { x: 14, z: -29, h: 6.1, mat: materials.building },
    { x: -7.3, z: -29, h: 8.4, mat: materials.buildingGreen },
    { x: 7.3, z: -31, h: 6.8, mat: materials.building },
    { x: -7.3, z: -37, h: 6.4, mat: materials.buildingRust },
    { x: 7.3, z: -38, h: 7.6, mat: materials.buildingGreen },
  ];
  const trees = mobile ? [[-4.8, -17], [4.8, -29]] : [[-4.8, -15], [4.8, -19], [-4.8, -26], [4.8, -33], [-4.8, -37]];

  return (
    <group>
      <Box position={[0, -0.25, -26]} size={[12, 0.5, 45]} material={materials.road} />
      <Box position={[0, -0.24, -17.5]} size={[33, 0.48, 4.2]} material={materials.road} />
      <Box position={[-7.2, -0.33, -26]} size={[2.2, 0.34, 46]} material={materials.sidewalk} />
      <Box position={[7.2, -0.33, -26]} size={[2.2, 0.34, 46]} material={materials.sidewalk} />
      {Array.from({ length: 13 }, (_, index) => (
        <Box key={index} position={[0, 0.012, -5 - index * 3.35]} size={[0.13, 0.024, 1.5]} material={materials.asphaltMark} />
      ))}
      {buildings.map((building, index) => (
        <StreetBuilding key={index} position={[building.x, 0, building.z]} height={building.h} material={building.mat} mobile={mobile} />
      ))}
      {trees.map(([x, z], index) => <Tree key={index} position={[x, 0, z]} scale={index % 2 === 0 ? 0.9 : 0.74} />)}
      <RouteNetwork mobile={mobile} reducedMotion={reducedMotion} />
      <PickupVan progressRef={progressRef} reducedMotion={reducedMotion} mobile={mobile} />
      <FoodTransferSequence progressRef={progressRef} mobile={mobile} reducedMotion={reducedMotion} />
      <CommunityBuilding />
    </group>
  );
}

function CameraJourney({ progressRef, reducedMotion, mobile }) {
  const smoothProgress = useRef(0);
  const currentLook = useRef(v3(CAMERA_PATH[0].target));
  const backgroundColor = useRef(SKY_COLORS[0].clone());
  const goalColor = useRef(SKY_COLORS[0].clone());

  useFrame(({ camera, scene }, delta) => {
    let targetProgress = Math.max(0, Math.min(1, progressRef.current));
    if (reducedMotion) targetProgress = Math.round(targetProgress * 5) / 5;
    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, targetProgress, reducedMotion ? 5 : 2.8, delta);

    const scaled = smoothProgress.current * (CAMERA_PATH.length - 1);
    const index = Math.min(CAMERA_PATH.length - 2, Math.floor(scaled));
    const local = THREE.MathUtils.smootherstep(scaled - index, 0, 1);
    const from = CAMERA_PATH[index];
    const to = CAMERA_PATH[index + 1];
    const positionX = THREE.MathUtils.lerp(from.position[0], to.position[0], local) * (mobile ? 0.72 : 1);
    const positionY = THREE.MathUtils.lerp(from.position[1], to.position[1], local);
    const positionZ = THREE.MathUtils.lerp(from.position[2], to.position[2], local) * (mobile ? 0.9 : 1);
    const targetX = THREE.MathUtils.lerp(from.target[0], to.target[0], local) * (mobile ? 0.72 : 1);
    const targetY = THREE.MathUtils.lerp(from.target[1], to.target[1], local);
    const targetZ = THREE.MathUtils.lerp(from.target[2], to.target[2], local) * (mobile ? 0.9 : 1);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, positionX, 4.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, mobile ? 2.6 + (positionY - 2.6) * 0.68 : positionY, 4.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, positionZ, 4.2, delta);
    currentLook.current.x = THREE.MathUtils.damp(currentLook.current.x, targetX, 4.8, delta);
    currentLook.current.y = THREE.MathUtils.damp(currentLook.current.y, mobile ? 1.6 + (targetY - 1.6) * 0.8 : targetY, 4.8, delta);
    currentLook.current.z = THREE.MathUtils.damp(currentLook.current.z, targetZ, 4.8, delta);
    camera.lookAt(currentLook.current);

    const colorScaled = smoothProgress.current * (SKY_COLORS.length - 1);
    const colorIndex = Math.min(SKY_COLORS.length - 2, Math.floor(colorScaled));
    const colorLocal = THREE.MathUtils.smootherstep(colorScaled - colorIndex, 0, 1);
    goalColor.current.copy(SKY_COLORS[colorIndex]).lerp(SKY_COLORS[colorIndex + 1], colorLocal);
    backgroundColor.current.lerp(goalColor.current, Math.min(1, delta * 1.6));
    if (scene.background instanceof THREE.Color) scene.background.copy(backgroundColor.current);
    if (scene.fog) scene.fog.color.copy(backgroundColor.current);
  });

  return null;
}

function World({ progressRef, reducedMotion, mobile }) {
  return (
    <>
      <color attach="background" args={['#31251d']} />
      <fog attach="fog" args={['#31251d', 24, 145]} />
      <ambientLight intensity={0.86} />
      <hemisphereLight args={['#ffdfb7', '#35493f', 0.95]} />
      <directionalLight position={[-7, 13, 9]} color="#ffe2bb" intensity={2.15} />
      <directionalLight position={[6, 10, -23]} color="#bddfc1" intensity={1.15} />
      <pointLight position={[0, 3.8, 2]} color="#ffb15e" intensity={15} distance={16} decay={2} />
      <pointLight position={[0, 4, -39]} color="#f7bf74" intensity={10} distance={15} decay={2} />
      <Kitchen />
      <StreetScene mobile={mobile} reducedMotion={reducedMotion} progressRef={progressRef} />
      <CameraJourney progressRef={progressRef} reducedMotion={reducedMotion} mobile={mobile} />
    </>
  );
}

function CinematicFallback() {
  return (
    <div className="fb-cinematic-fallback" aria-label="FoodBridge connects surplus food donors with community organizations">
      <svg viewBox="0 0 1440 900" role="img" aria-label="A restaurant, pickup road, and community center connected by a green route">
        <defs>
          <linearGradient id="fb-fallback-sky" x2="0" y2="1"><stop stopColor="#8b7054" /><stop offset="1" stopColor="#d9b783" /></linearGradient>
          <linearGradient id="fb-fallback-road" x2="0" y2="1"><stop stopColor="#343b39" /><stop offset="1" stopColor="#202927" /></linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#fb-fallback-sky)" />
        <path d="M0 520 Q720 430 1440 520 V900 H0Z" fill="#606b52" />
        <path d="M515 460 Q720 495 870 900 H395Q640 575 515 460Z" fill="url(#fb-fallback-road)" />
        <path d="M720 545 712 606M675 675l-24 80M590 850l-22 45" stroke="#f2e7d3" strokeWidth="10" strokeDasharray="27 25" />
        <g fill="#bc8058" stroke="#4d4236" strokeWidth="5"><path d="M90 405h310v190H90zM65 410l178-150 180 150z" /><path d="M1010 350h295v230h-295zM982 355l166-133 180 133z" /></g>
        <g fill="#bfe8c8"><path d="M135 453h58v68h-58zm96 0h58v68h-58zm-45 108h73v34h-73z"/><path d="M1050 401h60v75h-60zm110 0h60v75h-60zm-47 113h75v66h-75z"/></g>
        <path d="M280 650C470 580 650 602 780 685s210 33 347-17" fill="none" stroke="#35d978" strokeWidth="8" strokeDasharray="2 21" strokeLinecap="round" />
        <g transform="translate(644 565)"><rect width="160" height="82" rx="18" fill="#f4eee0"/><path d="M99 0h34l27 28v54H99z" fill="#dbece1"/><path d="M0 55h160v14H0z" fill="#1b8a4b"/><circle cx="38" cy="85" r="18" fill="#202724"/><circle cx="125" cy="85" r="18" fill="#202724"/><rect x="27" y="21" width="50" height="27" rx="5" fill="#c4e5d5"/></g>
        <g fill="#b57b45" stroke="#815432" strokeWidth="5"><rect x="405" y="572" width="78" height="65"/><rect x="450" y="515" width="70" height="59"/></g>
      </svg>
    </div>
  );
}

export function FoodBridgeScene({ progressRef, reducedMotion = false, isMobile = false }) {
  const [webglAvailable] = useState(() => {
    if (typeof document === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2');
      const available = Boolean(context);
      context?.getExtension('WEBGL_lose_context')?.loseContext();
      return available;
    } catch {
      return false;
    }
  });

  if (!webglAvailable) return <CinematicFallback />;

  return (
    <Canvas
      className="fb-cinematic-webgl"
      dpr={isMobile ? [1, 1.1] : [1, 1.45]}
      camera={{ position: CAMERA_PATH[0].position, fov: isMobile ? 54 : 47, near: 0.1, far: 150 }}
      gl={{ antialias: !isMobile, alpha: false, powerPreference: 'low-power' }}
      frameloop="always"
      aria-label="Continuous perspective journey from a donor kitchen through FoodBridge collection routes to a community center"
    >
      <Suspense fallback={null}>
        <World progressRef={progressRef} reducedMotion={reducedMotion} mobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}

export default FoodBridgeScene;
