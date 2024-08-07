import { Image } from '@react-three/drei'
import { geometry } from 'maath'
import { Euler, extend, Vector3 } from '@react-three/fiber'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

type ButtonProps = {
  position: Vector3
  rotation?: Euler
  url?: string
  onClick: () => void
  width?: number
  height?: number
  backgroundColor?: string
  opacity?: number
  iconUrl: string // Add iconUrl prop
  scale?: number
  borderRadius?: number
}

export default function IconButton({
  position,
  rotation,
  onClick,
  width = 1,
  height = 1,
  backgroundColor = 'hotpink',
  opacity = 0.5,
  scale = 0.07,
  borderRadius = 0.01,
  iconUrl,
}: ButtonProps) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/** @ts-ignore */}
      <roundedPlaneGeometry args={[width, height, borderRadius]} />
      <meshBasicMaterial color={backgroundColor} opacity={opacity} transparent />
      <Image url={iconUrl} transparent scale={scale} position={[0, 0, 0.001]} />
    </mesh>
  )
}
