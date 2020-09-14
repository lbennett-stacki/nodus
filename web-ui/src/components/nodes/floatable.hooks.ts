import * as THREE from 'three';
import { useFrame } from "react-three-fiber";

export const useFloatable = (floatable?: boolean, mesh?: THREE.Mesh, hovered?: boolean) => {
  const speed: number = hovered ? 0.02 : 0.01
  useFrame(() => {
    if (!floatable) return
    (mesh?.rotation! as THREE.Euler).x += speed;
    (mesh?.rotation! as THREE.Euler).y += speed;
  })
}