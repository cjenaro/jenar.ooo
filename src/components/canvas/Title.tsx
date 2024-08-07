import { folder, useControls } from 'leva'
import { Text } from '@react-three/drei'
import IconButton from './IconButton'
import { useGSAP } from '@gsap/react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'

const font = '/PressStart2P-Regular.ttf'

export function Title() {
  const textProps = useControls({
    'Title Props': folder({
      maxWidth: 2,
      color: '#ffffff',
      fontSize: 0.5,
      fontWeight: 500,
      position: [-3.5, 1, 0],
    }),
  })

  return (
    <Text {...textProps} font={font}>
      Jenaro Calviño
    </Text>
  )
}

export function Instructions() {
  const animateCamera = useCameraAnimation()
  const textProps = useControls({
    'Click Props': folder({
      position: [5.2, -1.49, 4.6],
      rotation: [-Math.PI / 2, 0, 0.8],
      scale: 0.8,
      borderRadius: 0.5,
    }),
  })

  return <IconButton {...textProps} iconUrl={'/assets/arrow.svg'} onClick={animateCamera} />
}

function useCameraAnimation() {
  const camera = useThree((state) => state.camera)

  const { contextSafe } = useGSAP()

  const animate = contextSafe(() => {
    if (camera) {
      gsap.to(camera.position, {
        x: -0.4,
        y: 0.9,
        z: 3.6,
        duration: 1,
      })
      gsap.to(camera.rotation, {
        x: -0.24497866312686414,
        y: 0.013473386047539958,
        z: 0.003368231864717482,
        duration: 1,
      })
    }
  })

  return animate
}
