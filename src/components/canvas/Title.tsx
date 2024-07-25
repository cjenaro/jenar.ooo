import { folder, useControls } from 'leva'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export function Title() {
  const textProps = useControls({
    'Title Props': folder({
      maxWidth: 2,
      color: '#ffffff',
      fontSize: 0.5,
      fontWeight: 500,
      position: [-2.25, 1, 0],
    }),
  })

  return <Text {...textProps}>Jenaro Calviño</Text>
}

export function Instructions() {
  const textProps = useControls({
    'Click Props': folder({
      maxWidth: 2,
      color: '#000000',
      fontSize: 0.3,
      fontWeight: 500,
      position: [6, -1.49, 5],
      rotation: [-Math.PI / 2, 0, 0.8],
    }),
  })

  return (
    <Text {...textProps} material={new THREE.MeshBasicMaterial()}>
      click or press enter!
    </Text>
  )
}
