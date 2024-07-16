import { animated, useSpring } from '@react-spring/three'
import { MutableRefObject, useEffect, useState } from 'react'
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

  const { rotation: springRotation } = useSpring<{ rotation: [x: number, y: number, z: number] }>({
    rotation: directions[direction],
  })

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
    <animated.group
      position={[-1.077, -0.664, 0.514]}
      rotation={springRotation as unknown as [x: number, y: number, z: number]}
    >
      <mesh castShadow receiveShadow geometry={stickGeometry} material={material} />
      <mesh castShadow receiveShadow geometry={whiteGeometry} material={whiteMaterial} />
    </animated.group>
  )
}
