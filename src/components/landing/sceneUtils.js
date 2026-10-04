import * as THREE from 'three';

export function createRouteCurve(points) {
  return new THREE.CatmullRomCurve3(
    points.map((point) => new THREE.Vector3(...point)),
    false,
    'catmullrom',
    0.18,
  );
}
