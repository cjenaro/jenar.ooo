import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ThreeEvent } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function Switch({ material, geometry, position }) {
  const [clicked, setClicked] = useState<'up' | 'down' | null>(null)

  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry>>()
  useGSAP(() => {
    if (!meshRef.current) return

    gsap.to(meshRef.current.rotation, {
      x: clicked === 'down' ? 0.2 : clicked === 'up' ? -0.2 : 0,
      y: 0,
      z: 0,
    })
  }, [clicked])

  function handleClicked(event: ThreeEvent<MouseEvent>) {
    const dir = event.intersections[0].uv.y > 0.39 ? 'up' : 'down'
    setClicked(dir)
  }

  useEffect(() => {
    if (!clicked) return

    const timeout = setTimeout(() => {
      setClicked(null)
    }, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [clicked])

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      onClick={handleClicked}
      geometry={geometry}
      material={material}
      position={position}
    />
  )
}

export default function Switches({ material, geometry }) {
  return (
    <group name='bottomLeftButtons'>
      <Switch geometry={geometry} material={material} position={[-1.236, -0.767, 0.99]} />
      <Switch geometry={geometry} material={material} position={[-1.069, -0.767, 0.99]} />
      <Switch geometry={geometry} material={material} position={[-0.902, -0.767, 0.99]} />
    </group>
  )
}
