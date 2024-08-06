import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
type Direction = 'left' | 'right' | 'up' | 'down' | 'center'

export default function Joystick({ material, whiteMaterial, stickGeometry, whiteGeometry }) {
  const [direction, setDirection] = useState<Direction>('center')
  const directions: { [key: string]: [x: number, y: number, z: number] } = {
    down: [1, 0, 0],
    up: [-1, 0, 0],
    center: [0, 0, 0],
    left: [0, 0, 1],
    right: [0, 0, -1],
  }
  const groupRef = useRef<THREE.Group<THREE.Object3DEventMap>>()
  useGSAP(() => {
    if (!groupRef.current) return

    const [x, y, z] = directions[direction]

    gsap.to(groupRef.current.rotation, {
      x,
      y,
      z,
    })
  }, [direction])

  useEffect(() => {
    function keyboardListener(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowDown':
        case 's':
          setDirection('down')
          break
        case 'ArrowUp':
        case 'w':
          setDirection('up')
          break
        case 'ArrowLeft':
        case 'a':
          setDirection('left')
          break
        case 'ArrowRight':
        case 'd':
          setDirection('right')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', keyboardListener)

    return () => {
      removeEventListener('keydown', keyboardListener)
    }
  }, [])

  useEffect(() => {
    if (direction === 'center') return

    const timeout = setTimeout(() => {
      setDirection('center')
    }, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [direction])

  return (
    <group ref={groupRef} position={[-1.077, -0.664, 0.514]}>
      <mesh castShadow receiveShadow geometry={stickGeometry} material={material} />
      <mesh castShadow receiveShadow geometry={whiteGeometry} material={whiteMaterial} />
    </group>
  )
}
