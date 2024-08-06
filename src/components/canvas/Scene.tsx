'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas
      {...props}
      style={{ position: 'fixed', top: 0, left: 0, width: '100dvw', height: '100dvh', pointerEvents: 'none' }}
    >
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
}
