import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, NearestFilter, ClampToEdgeWrapping, Texture } from 'three'

function CharacterSprite({
  textureUrl,
  frames = 4,
  frameWidth = 16,
  frameHeight = 32,
  animationSpeed = 100,
  renderOrder,
}) {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, textureUrl) as Texture
  const [currentFrame, setCurrentFrame] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    texture.magFilter = NearestFilter
    texture.minFilter = NearestFilter
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping
    texture.repeat.set(1 / frames, 1)
    texture.needsUpdate = true
  }, [texture, frames])

  useFrame((state, delta) => {
    setElapsedTime((prev) => prev + delta * 1000)

    if (elapsedTime > animationSpeed) {
      setCurrentFrame((prev) => (prev + 1) % frames)
      texture.offset.x = currentFrame / frames
      setElapsedTime(0)
    }
  })

  return (
    <mesh ref={meshRef} position={[-0.75, -0.38, 0.01]} scale={0.2} renderOrder={renderOrder}>
      <planeGeometry args={[frameWidth / 32, frameHeight / 32]} />
      <meshBasicMaterial map={texture} transparent depthTest={false} />
    </mesh>
  )
}

export default CharacterSprite
