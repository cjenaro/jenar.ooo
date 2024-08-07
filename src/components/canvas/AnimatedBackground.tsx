import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

function AnimatedBackground({ textureUrl, speed = 0.005, stepInterval = 0.1, renderOrder }) {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, textureUrl) as THREE.Texture
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.needsUpdate = true
  }, [texture])

  useFrame((_, delta) => {
    setElapsedTime((prev) => prev + delta)

    if (elapsedTime >= stepInterval) {
      texture.offset.x += speed
      setElapsedTime(0)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0.0002]} renderOrder={renderOrder}>
      {/** @ts-ignore */}
      <roundedPlaneGeometry args={[1.87, 1.1, 0.13]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  )
}

export default AnimatedBackground
