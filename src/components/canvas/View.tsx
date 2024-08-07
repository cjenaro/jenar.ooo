'use client'

import { forwardRef, Suspense, useEffect, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, PresentationControls, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import { useControls } from 'leva'
import { useThree } from '@react-three/fiber'

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

  const camera = useThree((t) => t.camera)
  useEffect(() => {
    if (!camera) return
    camera.position.set(8.8, 0.8, 8)
    camera.lookAt(-8.8, -0.8, -8)
    camera.updateProjectionMatrix()
  }, [camera])

  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <ambientLight intensity={2} />
      <fog attach='fog' color={fogColor} near={fog.near} far={fog.far} />
      <directionalLight castShadow color='#ff618a' position={lightPosition} intensity={intensity} />
      <PerspectiveCamera makeDefault fov={50} />
    </Suspense>
  )
}

export type ViewProps = {
  children: React.ReactNode
}

const View = forwardRef<HTMLDivElement, ViewProps>(({ children, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>{children}</ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
