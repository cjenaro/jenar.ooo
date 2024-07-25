import { folder, useControls } from 'leva'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

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
  const textProps = useControls({
    'Click Props': folder({
      color: 'black',
      fontSize: 0.15,
      fontWeight: 500,
      position: [5.2, -1.49, 4.6],
      rotation: [-Math.PI / 2, 0, 0.8],
    }),
  })

  return (
    <Text {...textProps} material={new THREE.MeshBasicMaterial()} font={font}>
      click or press enter!
    </Text>
  )
}
