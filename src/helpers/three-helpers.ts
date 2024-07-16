import { Euler } from '@react-three/fiber'
import * as THREE from 'three'

export function toEuler({ x, y, z }: { x: number; y: number; z: number }): Euler {
  return [x, y, z]
}

export function toVec3({ x, y, z }: { x: number; y: number; z: number }): THREE.Vector3 {
  return new THREE.Vector3(x, y, z)
}
