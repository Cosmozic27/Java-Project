import * as THREE from 'three';

// Reuse static resources for repeated low-poly elements (windows, packages, wheels, and shadows).
// The handful of shared resources stays resident with the lazy-loaded scene and avoids duplicating
// identical geometry/material state for every building and vehicle.
export const SCENE_GEOMETRIES = Object.freeze({
  window: new THREE.BoxGeometry(0.22, 0.28, 0.035),
  marker: new THREE.SphereGeometry(0.12, 12, 10),
  markerStem: new THREE.CylinderGeometry(0.018, 0.025, 0.2, 8),
  shadow: new THREE.CircleGeometry(1, 24),
  crate: new THREE.BoxGeometry(0.42, 0.3, 0.38),
  crateLid: new THREE.BoxGeometry(0.45, 0.045, 0.41),
  crateLabel: new THREE.BoxGeometry(0.19, 0.12, 0.012),
  crateStrap: new THREE.BoxGeometry(0.045, 0.305, 0.012),
  parcel: new THREE.BoxGeometry(0.15, 0.1, 0.13),
  parcelBand: new THREE.BoxGeometry(0.035, 0.104, 0.135),
  vanBody: new THREE.BoxGeometry(0.94, 0.34, 0.5),
  vanCargo: new THREE.BoxGeometry(0.5, 0.27, 0.48),
  vanCab: new THREE.BoxGeometry(0.42, 0.28, 0.47),
  vanSideWindow: new THREE.BoxGeometry(0.19, 0.13, 0.018),
  vanWindshield: new THREE.BoxGeometry(0.018, 0.14, 0.3),
  vanStripe: new THREE.BoxGeometry(0.26, 0.055, 0.014),
  vanBadge: new THREE.BoxGeometry(0.08, 0.08, 0.016),
  vanLamp: new THREE.BoxGeometry(0.035, 0.065, 0.025),
  vanBumper: new THREE.BoxGeometry(0.045, 0.065, 0.44),
  wheel: new THREE.CylinderGeometry(0.12, 0.12, 0.07, 12),
});

export const SCENE_MATERIALS = Object.freeze({
  window: new THREE.MeshStandardMaterial({ color: '#97b9a5', roughness: 0.6 }),
  warmWindow: new THREE.MeshStandardMaterial({ color: '#f4c76c', roughness: 0.6 }),
  marker: new THREE.MeshStandardMaterial({ color: '#36a968', emissive: '#36a968', emissiveIntensity: 0.48, roughness: 0.38 }),
  markerStem: new THREE.MeshStandardMaterial({ color: '#629372', roughness: 0.6 }),
  softShadow: new THREE.MeshBasicMaterial({ color: '#586b59', transparent: true, opacity: 0.16, depthWrite: false }),
  crate: new THREE.MeshStandardMaterial({ color: '#d6a96a', roughness: 0.88 }),
  crateLid: new THREE.MeshStandardMaterial({ color: '#b9834f', roughness: 0.85 }),
  crateLabel: new THREE.MeshStandardMaterial({ color: '#fff2d1', roughness: 0.75 }),
  crateStrap: new THREE.MeshStandardMaterial({ color: '#6b9469', roughness: 0.85 }),
  parcel: new THREE.MeshStandardMaterial({ color: '#e0b477', roughness: 0.82 }),
  parcelBand: new THREE.MeshStandardMaterial({ color: '#378b56', roughness: 0.72 }),
  vanBody: new THREE.MeshStandardMaterial({ color: '#f7f2e5', roughness: 0.62 }),
  vanCargo: new THREE.MeshStandardMaterial({ color: '#e9eee2', roughness: 0.68 }),
  vanCab: new THREE.MeshStandardMaterial({ color: '#e5ebdf', roughness: 0.52 }),
  vanGlass: new THREE.MeshStandardMaterial({ color: '#85a994', roughness: 0.44, metalness: 0.04 }),
  vanStripe: new THREE.MeshStandardMaterial({ color: '#247a47', roughness: 0.72 }),
  vanBadge: new THREE.MeshStandardMaterial({ color: '#e4b56c', roughness: 0.78 }),
  vanLamp: new THREE.MeshStandardMaterial({ color: '#f2c66f', emissive: '#d9983d', emissiveIntensity: 0.2, roughness: 0.5 }),
  wheel: new THREE.MeshStandardMaterial({ color: '#49574e', roughness: 0.92 }),
});

export function createRouteCurve(points) {
  return new THREE.CatmullRomCurve3(
    points.map((point) => new THREE.Vector3(...point)),
    false,
    'catmullrom',
    0.18,
  );
}
