'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'

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

  // useFrame((state) => {
  //   console.log(state.camera.position.x)
  //   if (state.camera.position.x > 0) {
  //     state.camera.position.x -= 0.1
  //   } else {
  //     state.camera.position.x = 9
  //   }
  // })

  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <ambientLight intensity={1} />
      <fog attach='fog' color={fogColor} near={fog.near} far={fog.far} />
      <directionalLight castShadow color='#ff618a' position={lightPosition} intensity={intensity} />
      <PerspectiveCamera fov={40} position={[9, 0, 8]} />
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
