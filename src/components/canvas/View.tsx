'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import { useControls } from 'leva'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export type CommonProps = {
  color?: string
}

export const Common = ({ color }: CommonProps) => {
  const { lightPosition, intensity, fog, fogColor } = useControls({
    lightPosition: [1, 1, 1],
    intensity: 4,
    fog: {
      near: 40,
      far: 100,
    },
    fogColor: '#ff618a',
  })

  const cameraRef = useRef(null)
  const cameraPosition = useRef({ x: 9, y: 0, z: 8 })

  useGSAP(() => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 0.9,
        z: 3.5,
        duration: 1,
      })
    }
  })

  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <ambientLight intensity={1} />
      <fog attach='fog' color={fogColor} near={fog.near} far={fog.far} />
      <directionalLight castShadow color='#ff618a' position={lightPosition} intensity={intensity} />
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        fov={40}
        position={[cameraPosition.current.x, cameraPosition.current.y, cameraPosition.current.z]}
      />
    </Suspense>
  )
}

export type ViewProps = {
  children: React.ReactNode
  orbit: boolean
}

const View = forwardRef<HTMLDivElement, ViewProps>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
