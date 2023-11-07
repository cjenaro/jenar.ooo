import { animated, useSpring } from '@react-spring/three'
import { ThreeEvent } from '@react-three/fiber'
import { useEffect, useState } from 'react'

function Switch({ material, geometry, position }) {
  const [clicked, setClicked] = useState<'up' | 'down' | null>(null)
  const { rotation } = useSpring<{ rotation: [x: number, y: number, z: number] }>({
    rotation: clicked === 'down' ? [0.2, 0, 0] : clicked === 'up' ? [-0.2, 0, 0] : [0, 0, 0],
  })

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
    <animated.mesh
      castShadow
      receiveShadow
      onClick={handleClicked}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation as unknown as [x: number, y: number, z: number]}
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
