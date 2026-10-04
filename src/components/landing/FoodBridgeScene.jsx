import React, { Suspense, useEffect, useMemo, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FoodBuilding } from './FoodBuilding';
import { FoodBox, NetworkRoute, PickupVan } from './NetworkRoute';
import { createRouteCurve as makeRouteCurve, SCENE_GEOMETRIES, SCENE_MATERIALS } from './sceneUtils';

const ROUTE_ONE = [
  [-3.55, 0.18, 0.8],
  [-2.7, 0.2, 0.76],
  [-1.6, 0.2, 0.62],
  [-0.4, 0.2, 0.4],
  [1.1, 0.2, 0.24],
  [2.88, 0.18, 0.3],
];
const ROUTE_TWO = [
  [-3.75, 0.18, -1.9],
  [-2.7, 0.2, -1.45],
  [-1.6, 0.2, -0.9],
  [-0.2, 0.2, -0.28],
  [1.3, 0.2, 0.08],
  [2.9, 0.18, 0.28],
];

function sceneZoom(width) {
  if (width <= 430) return 23.5;
  if (width <= 900) return 31;
  if (width <= 1100) return 38;
  return 47;
}

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.045, 0.07, 0.38, 6]} />
        <meshStandardMaterial color="#9a7654" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <coneGeometry args={[0.24, 0.52, 7]} />
        <meshStandardMaterial color="#82a47a" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <coneGeometry args={[0.16, 0.38, 7]} />
        <meshStandardMaterial color="#9bb38b" roughness={0.92} />
      </mesh>
    </group>
  );
}

function CommunityHub({ position, reducedMotion }) {
  const beaconRef = useRef(null);
  useFrame(({ clock }) => {
    if (beaconRef.current && !reducedMotion) {
      const pulse = 0.94 + Math.sin(clock.elapsedTime * 1.8) * 0.06;
      beaconRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <mesh
        position={[0, 0.006, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.08, 0.9, 1]}
        geometry={SCENE_GEOMETRIES.shadow}
        material={SCENE_MATERIALS.softShadow}
        renderOrder={1}
        dispose={null}
      />
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[1.7, 1.12, 1.38]} />
        <meshStandardMaterial color="#dce9d6" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.3, 0.46, 4]} />
        <meshStandardMaterial color="#75a27c" roughness={0.84} />
      </mesh>
      <mesh position={[0, 0.48, 0.705]}>
        <boxGeometry args={[0.46, 0.88, 0.06]} />
        <meshStandardMaterial color="#f6efd9" roughness={0.75} />
      </mesh>
      <mesh position={[-0.52, 0.7, 0.71]}>
        <boxGeometry args={[0.28, 0.3, 0.045]} />
        <meshStandardMaterial color="#9cc6a3" roughness={0.56} />
      </mesh>
      <mesh position={[0.52, 0.7, 0.71]}>
        <boxGeometry args={[0.28, 0.3, 0.045]} />
        <meshStandardMaterial color="#9cc6a3" roughness={0.56} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.9, 0.12, 1.58]} />
        <meshStandardMaterial color="#c9d7bd" roughness={0.9} />
      </mesh>
      <group position={[0.88, 1.72, -0.25]}>
        <mesh ref={beaconRef} geometry={SCENE_GEOMETRIES.marker} material={SCENE_MATERIALS.marker} dispose={null} />
        <mesh position={[0, -0.18, 0]} geometry={SCENE_GEOMETRIES.markerStem} material={SCENE_MATERIALS.markerStem} dispose={null} />
      </group>
    </group>
  );
}

function NetworkGateway({ position, reducedMotion }) {
  const beaconRef = useRef(null);
  useFrame(({ clock }) => {
    if (!beaconRef.current || reducedMotion) return;
    beaconRef.current.scale.setScalar(0.96 + Math.sin(clock.elapsedTime * 2.1) * 0.04);
  });

  return (
    <group position={position}>
      <mesh
        position={[0, 0.006, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.48, 0.34, 1]}
        geometry={SCENE_GEOMETRIES.shadow}
        material={SCENE_MATERIALS.softShadow}
        renderOrder={1}
        dispose={null}
      />
      <mesh position={[0, 0.065, 0]}>
        <boxGeometry args={[0.72, 0.1, 0.48]} />
        <meshStandardMaterial color="#e4eadb" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.34]} />
        <meshStandardMaterial color="#398958" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.245, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.022, 6, 20]} />
        <meshBasicMaterial color="#53a76d" transparent opacity={0.72} />
      </mesh>
      <mesh ref={beaconRef} position={[0, 0.29, 0]} geometry={SCENE_GEOMETRIES.marker} material={SCENE_MATERIALS.marker} dispose={null} />
    </group>
  );
}

function SceneContents({ isMobile, reducedMotion }) {
  const worldRef = useRef(null);
  const routeOneCurve = useMemo(() => makeRouteCurve(ROUTE_ONE), []);
  const routeTwoCurve = useMemo(() => makeRouteCurve(ROUTE_TWO), []);

  useFrame(({ pointer }) => {
    if (!worldRef.current || reducedMotion || isMobile) return;
    worldRef.current.rotation.y = THREE.MathUtils.lerp(worldRef.current.rotation.y, pointer.x * 0.035, 0.035);
    worldRef.current.rotation.x = THREE.MathUtils.lerp(worldRef.current.rotation.x, -0.035 - pointer.y * 0.012, 0.035);
  });

  return (
    <group ref={worldRef}>
      <ambientLight intensity={isMobile ? 1.02 : 1.12} />
      <hemisphereLight args={['#fff8e9', '#b7cdb7', isMobile ? 0.82 : 0.95]} />
      <directionalLight position={[-5, 8, 5]} intensity={isMobile ? 1.72 : 2.05} color="#fff0d1" />
      {!isMobile && <directionalLight position={[5, 6, -5]} intensity={0.48} color="#d9eedc" />}
      <mesh position={[0, -0.23, 0]}>
        <boxGeometry args={[12.8, 0.45, 7.7]} />
        <meshStandardMaterial color="#e1dbcc" roughness={0.96} />
      </mesh>
      <mesh position={[0, -0.015, 0]}>
        <boxGeometry args={[12.35, 0.08, 7.25]} />
        <meshStandardMaterial color="#f0e9d9" roughness={0.94} />
      </mesh>
      <mesh position={[0, 0.028, 0]}>
        <boxGeometry args={[11.8, 0.025, 6.7]} />
        <meshStandardMaterial color="#eee9dc" roughness={0.95} />
      </mesh>

      <NetworkRoute points={ROUTE_ONE} curve={routeOneCurve} reducedMotion={reducedMotion} particles={isMobile ? 2 : 4} activity={1} />
      {!isMobile && <NetworkRoute points={ROUTE_TWO} curve={routeTwoCurve} reducedMotion={reducedMotion} particles={2} activity={0.48} />}

      <NetworkGateway position={[0, 0.045, 0.36]} reducedMotion={reducedMotion} />
      <FoodBuilding type="restaurant" position={[-4.45, 0.045, 1]} compact={isMobile || reducedMotion} />
      <FoodBuilding type="hostel" position={[-4.55, 0.045, -2.55]} compact={isMobile || reducedMotion} />
      {!isMobile && <FoodBuilding type="hotel" position={[-1.95, 0.045, -2.55]} compact={reducedMotion} />}
      <CommunityHub position={[3.55, 0.045, 0.55]} reducedMotion={reducedMotion} />

      <PickupVan curve={routeOneCurve} reducedMotion={reducedMotion} speed={isMobile ? 0.026 : 0.036} />
      {!isMobile && <PickupVan curve={routeTwoCurve} reducedMotion={reducedMotion} speed={0.024} offset={0.5} />}
      <FoodBox position={[1.5, 0.21, 1.15]} delay={0.7} reducedMotion={reducedMotion} />
      {!isMobile && <FoodBox position={[3.9, 0.21, -0.65]} delay={1.7} reducedMotion={reducedMotion} />}
      <FoodBox position={[-3.35, 0.21, 2.42]} delay={2.4} reducedMotion={reducedMotion} />

      <Tree position={[-5.7, 0.02, -0.95]} scale={0.85} />
      <Tree position={[1.15, 0.02, 2.55]} scale={0.75} />
      {!isMobile && <Tree position={[5.2, 0.02, 1.95]} scale={0.9} />}
      {!isMobile && <Tree position={[0.2, 0.02, -2.8]} scale={0.7} />}
    </group>
  );
}

function SceneFallback() {
  return (
    <div className="fb-scene-fallback" aria-hidden="true">
      <svg viewBox="0 0 760 500" role="presentation">
        <path className="fb-fallback-route" d="M135 252 C260 242 405 274 615 250" />
        <path className="fb-fallback-route fb-fallback-route-soft" d="M152 133 C300 158 424 208 615 250" />
        <g className="fb-fallback-building" transform="translate(74 152)">
          <path d="M8 64h116v92H8z" /><path d="M0 64 66 18l66 46z" /><path className="fb-fallback-window" d="M26 83h21v29H26zm42 0h21v29H68zm-22 45h28v28H46z" />
        </g>
        <g className="fb-fallback-building fb-fallback-hostel" transform="translate(179 48)">
          <path d="M8 42h84v137H8z" /><path d="M0 42 50 9l50 33z" /><path className="fb-fallback-window" d="M22 58h17v21H22zm38 0h17v21H60zM22 94h17v21H22zm38 0h17v21H60zm-3 47h22v38H57z" />
        </g>
        <g className="fb-fallback-hub" transform="translate(536 164)">
          <path d="M8 61h112v87H8z" /><path d="M0 61 64 16l64 45z" /><path className="fb-fallback-window" d="M22 80h25v28H22zm59 0h25v28H81zM50 108h30v40H50z" />
        </g>
        <g className="fb-fallback-gateway" transform="translate(380 253)">
          <circle r="23" /><rect x="-12" y="-7" width="24" height="14" rx="3" /><path d="M-4 0h8M0-4v8" />
        </g>
        <g className="fb-fallback-van" transform="translate(363 227)">
          <rect x="0" y="0" width="86" height="42" rx="9" /><path d="M53 0h19l14 17v25H53z" /><circle cx="20" cy="44" r="8" /><circle cx="69" cy="44" r="8" />
        </g>
        <circle className="fb-fallback-box" cx="475" cy="281" r="11" /><circle className="fb-fallback-box" cx="291" cy="217" r="9" />
      </svg>
    </div>
  );
}

function supportsWebGL2() {
  if (typeof document === 'undefined') return false;
  try {
    const probe = document.createElement('canvas');
    const context = probe.getContext('webgl2');
    const supported = Boolean(context);
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return supported;
  } catch {
    return false;
  }
}

export function FoodBridgeScene({ reducedMotion = false }) {
  const [webglAvailable] = useState(supportsWebGL2);
  const [viewportWidth, setViewportWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1280);
  const isMobile = viewportWidth <= 900;
  const cameraMode = viewportWidth <= 430 ? 'phone' : viewportWidth <= 900 ? 'compact' : viewportWidth <= 1100 ? 'medium' : 'desktop';
  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!webglAvailable) return <SceneFallback />;

  return (
    <Canvas
      key={cameraMode}
      orthographic
      dpr={isMobile ? [1, 1] : [1, 1.45]}
      shadows={false}
      frameloop={reducedMotion ? 'demand' : 'always'}
      camera={{ position: [9, 9, 12], zoom: sceneZoom(viewportWidth), near: 0.1, far: 80 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'low-power' }}
      fallback={<SceneFallback />}
      aria-label="Low-poly FoodBridge network: restaurant and hostel donations travel as food parcels on green routes through a FoodBridge relay to a community hub in pickup vans"
    >
      <Suspense fallback={null}>
        <SceneContents isMobile={isMobile} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default FoodBridgeScene;
