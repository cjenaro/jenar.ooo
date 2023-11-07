import { animated, config, useSpring } from '@react-spring/three'
import { useEffect, useState } from 'react'

export default function RoundButton({ position, bodyMaterial, bodyGeometry, tipMaterial, tipGeometry }) {
  const [active, setActive] = useState(false)
  const { y } = useSpring({
    y: active ? position[1] - 0.03 : position[1],
    config: {
      ...config.default,
      mass: 0.02,
    },
  })

  function handleAnimation() {
    setActive(!active)
  }

  useEffect(() => {
    if (active) {
      const timeout = setTimeout(() => {
        setActive(false)
      }, 200)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [active])

  return (
    <animated.group onClick={handleAnimation} position={position} position-y={y}>
      <mesh castShadow receiveShadow geometry={bodyGeometry} material={bodyMaterial} />
      <mesh castShadow receiveShadow geometry={tipGeometry} material={tipMaterial} />
    </animated.group>
  )
}
