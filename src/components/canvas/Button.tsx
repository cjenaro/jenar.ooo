import { Image, Text } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { geometry } from 'maath'
import { extend, Vector3 } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Mesh } from 'three'

const font = '/PressStart2P-Regular.ttf'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

type ButtonProps = {
  position: Vector3
  label: string
  url?: string
  onClick?: () => void
  width?: number
  height?: number
  backgroundColor?: string
  isActive?: boolean
}

export default function Button({
  position,
  label,
  url,
  width = 1,
  height = 1,
  backgroundColor = 'hotpink',
  isActive,
  onClick,
}: ButtonProps) {
  const router = useRouter()
  const handRef = useRef<Mesh>()

  const handleClick = () => {
    if (onClick) {
      onClick()
    }

    if (url) {
      router.push(url)
    }
  }

  useGSAP(() => {
    if (!handRef.current || !isActive) return
    gsap.to(handRef.current.position, {
      y: 0.02,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    gsap.to(handRef.current.rotation, {
      z: -(Math.PI / 2) - 0.23,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
  }, [isActive])

  return (
    <mesh
      position={position}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/** @ts-ignore */}
      <roundedPlaneGeometry args={[width, height, 0.1]} />
      <meshBasicMaterial color={backgroundColor} opacity={0.5} transparent />
      <Text position={[0, 0, 0.001]} fontSize={0.05} color='black' anchorX='center' anchorY='middle' font={font}>
        {isActive ? (
          <Image
            ref={handRef}
            url='/img/hand.png'
            transparent
            position={[-0.6, 0, 0.001]}
            rotation={[0, 0, -(Math.PI / 2) - 0.2]}
          >
            <planeGeometry args={[0.1, 0.1]} />
          </Image>
        ) : null}
        {label}
      </Text>
    </mesh>
  )
}
