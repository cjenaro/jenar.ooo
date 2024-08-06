import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function RoundButton({ position, bodyMaterial, bodyGeometry, tipMaterial, tipGeometry }) {
  const [active, setActive] = useState(false)

  const groupRef = useRef<THREE.Group<THREE.Object3DEventMap>>()
  const originalYPosition = useRef(position[1])
  useGSAP(() => {
    if (!groupRef.current) return

    gsap.to(groupRef.current.position, {
      ...groupRef.current.position,
      y: active ? originalYPosition.current - 0.03 : originalYPosition.current,
    })
  }, [active])

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
    <group ref={groupRef} onClick={handleAnimation} position={position}>
      <mesh castShadow receiveShadow geometry={bodyGeometry} material={bodyMaterial} />
      <mesh castShadow receiveShadow geometry={tipGeometry} material={tipMaterial} />
    </group>
  )
}
