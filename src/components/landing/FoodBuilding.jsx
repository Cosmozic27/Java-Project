import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const BUILDING_STYLES = {
  restaurant: {
    width: 1.55,
    depth: 1.35,
    height: 1.55,
    wall: '#f1d9b5',
    roof: '#c96e4b',
    trim: '#fff3d7',
    floors: 2,
  },
  hostel: {
    width: 1.45,
    depth: 1.4,
    height: 2.25,
    wall: '#d5e2c8',
    roof: '#7e9a72',
    trim: '#f5f0df',
    floors: 3,
  },
  hotel: {
    width: 1.65,
    depth: 1.45,
    height: 1.9,
    wall: '#d6d8ca',
    roof: '#718b73',
    trim: '#f7f0dc',
    floors: 3,
  },
};

function Windows({ style }) {
  const columns = style.width > 1.5 ? [-0.46, 0, 0.46] : [-0.38, 0.38];
  return Array.from({ length: style.floors }, (_, floor) =>
    columns.map((x, index) => (
      <mesh
        key={`${floor}-${index}`}
        position={[x, 0.48 + floor * 0.48, style.depth / 2 + 0.012]}
        castShadow={false}
      >
        <boxGeometry args={[0.22, 0.28, 0.035]} />
        <meshStandardMaterial color={floor === style.floors - 1 && index === 0 ? '#f4c76c' : '#97b9a5'} roughness={0.6} />
      </mesh>
    )),
  );
}

export function FoodBuilding({ type = 'restaurant', position = [0, 0, 0], compact = false }) {
  const style = BUILDING_STYLES[type] || BUILDING_STYLES.restaurant;
  const markerRef = useRef(null);
  const indicatorHeight = style.height + 0.42;

  useFrame(({ clock }) => {
    if (!markerRef.current || compact) return;
    const pulse = 0.92 + Math.sin(clock.elapsedTime * 2.4) * 0.1;
    markerRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh position={[0, style.height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[style.width, style.height, style.depth]} />
        <meshStandardMaterial color={style.wall} roughness={0.82} />
      </mesh>
      <mesh position={[0, style.height + 0.08, 0]} castShadow>
        <boxGeometry args={[style.width + 0.18, 0.18, style.depth + 0.18]} />
        <meshStandardMaterial color={style.roof} roughness={0.76} />
      </mesh>
      <mesh position={[0, 0.43, style.depth / 2 + 0.035]} castShadow={false}>
        <boxGeometry args={[0.32, 0.78, 0.08]} />
        <meshStandardMaterial color={style.trim} roughness={0.8} />
      </mesh>
      <Windows style={style} />
      {type === 'restaurant' && (
        <group position={[0, 1.06, style.depth / 2 + 0.11]}>
          <mesh castShadow={false}>
            <boxGeometry args={[style.width + 0.08, 0.18, 0.09]} />
            <meshStandardMaterial color="#d98256" roughness={0.7} />
          </mesh>
          {[-0.55, -0.28, 0, 0.28, 0.55].map((x) => (
            <mesh key={x} position={[x, -0.15, 0]} castShadow={false}>
              <boxGeometry args={[0.18, 0.15, 0.095]} />
              <meshStandardMaterial color={x % 0.56 === 0 ? '#fff1d2' : '#d98256'} roughness={0.7} />
            </mesh>
          ))}
        </group>
      )}
      {type === 'hostel' && (
        <mesh position={[0, 0.16, style.depth / 2 + 0.06]} castShadow={false}>
          <boxGeometry args={[0.42, 0.34, 0.1]} />
          <meshStandardMaterial color="#91a77f" roughness={0.7} />
        </mesh>
      )}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[style.width + 0.22, 0.12, style.depth + 0.22]} />
        <meshStandardMaterial color="#d1c4a9" roughness={0.9} />
      </mesh>
      <group position={[style.width * 0.34, indicatorHeight, style.depth * 0.2]}>
        <mesh ref={markerRef} castShadow={false}>
          <sphereGeometry args={[0.12, 12, 10]} />
          <meshStandardMaterial color="#36a968" emissive="#36a968" emissiveIntensity={0.55} roughness={0.38} />
        </mesh>
        <mesh position={[0, -0.16, 0]} castShadow={false}>
          <cylinderGeometry args={[0.018, 0.025, 0.2, 8]} />
          <meshStandardMaterial color="#629372" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default FoodBuilding;
