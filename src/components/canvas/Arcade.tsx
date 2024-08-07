import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { folder, useControls } from 'leva'
import RoundButton from './RoundButton'
import Joystick from './Joystick'
import Switches from './Switches'
import { extend } from '@react-three/fiber'

import { geometry } from 'maath'
import Screen from './Screen'
import { type BufferGeometry } from 'three'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

export function Arcade(props) {
  const { nodes, materials } = useGLTF('/arcade.glb')
  const nodesWithGeometry = nodes as { [name: string]: typeof nodes[''] & { geometry: BufferGeometry } }

  const { bPosition, aPosition, cPosition, dPosition, ePosition, fPosition } = useControls('buttons', {
    box: folder({
      boxPosition: [-0.307, -0.296, 0.115],
    }),
    roundButtons: folder({
      aPosition: { step: 0.01, value: [0.418, -0.675, 0.572] },
      bPosition: { step: 0.01, value: [0.267, -0.675, 0.572] },
      cPosition: { step: 0.01, value: [0.115, -0.675, 0.572] },
      dPosition: { step: 0.01, value: [0.115, -0.637, 0.403] },
      ePosition: { step: 0.01, value: [0.267, -0.637, 0.403] },
      fPosition: { step: 0.01, value: [0.418, -0.637, 0.403] },
    }),
    rectAreaLight: folder({
      position: [-0.1, 0.5, 0],
      intensity: 50,
      color: '#ff618a',
      size: [2, 1],
    }),
    Plane: folder({
      planeRotation: [0.15, 0, 0],
      planeSize: { value: { h: 1.2, w: 1.82 }, step: 0.01 },
      planeBorderRadius: { value: 0.14, step: 0.1 },
    }),
  })

  const roundButtonBodyMaterial = materials['1']
  const roundButtonTipMaterial = materials['3']

  const arcadeRef = useRef(null)

  return (
    <group {...props} dispose={null} ref={arcadeRef}>
      <group position={[-0.307, -0.296, 0.115]}>
        <mesh castShadow receiveShadow geometry={nodesWithGeometry.Cube001.geometry} material={materials['1']} />
        <mesh castShadow receiveShadow geometry={nodesWithGeometry.Cube001_1.geometry} material={materials['2']} />
        <mesh castShadow receiveShadow geometry={nodesWithGeometry.Cube001_2.geometry} material={materials['3']} />
        <mesh castShadow receiveShadow geometry={nodesWithGeometry.Cube001_3.geometry} material={materials['4']} />
      </group>

      <Screen geometry={nodesWithGeometry.parent.geometry} material={materials['3']} />
      <group name='roundButtons'>
        <RoundButton
          position={aPosition}
          bodyGeometry={nodesWithGeometry.Cube002.geometry}
          bodyMaterial={roundButtonBodyMaterial}
          tipGeometry={nodesWithGeometry.Cube002_1.geometry}
          tipMaterial={roundButtonTipMaterial}
        />
        <RoundButton
          position={bPosition}
          bodyGeometry={nodesWithGeometry.Cube003.geometry}
          bodyMaterial={roundButtonBodyMaterial}
          tipGeometry={nodesWithGeometry.Cube003_1.geometry}
          tipMaterial={roundButtonTipMaterial}
        />
        <RoundButton
          position={cPosition}
          bodyGeometry={nodesWithGeometry.Cube004.geometry}
          bodyMaterial={roundButtonBodyMaterial}
          tipGeometry={nodesWithGeometry.Cube004_1.geometry}
          tipMaterial={roundButtonTipMaterial}
        />
        <RoundButton
          position={dPosition}
          bodyGeometry={nodesWithGeometry.Cube005.geometry}
          bodyMaterial={roundButtonBodyMaterial}
          tipGeometry={nodesWithGeometry.Cube005_1.geometry}
          tipMaterial={roundButtonTipMaterial}
        />
        <RoundButton
          position={ePosition}
          bodyGeometry={nodesWithGeometry.Cube006.geometry}
          bodyMaterial={roundButtonBodyMaterial}
          tipGeometry={nodesWithGeometry.Cube006_1.geometry}
          tipMaterial={roundButtonTipMaterial}
        />
        <RoundButton
          position={fPosition}
          bodyGeometry={nodesWithGeometry.Cube007.geometry}
          tipGeometry={nodesWithGeometry.Cube007_1.geometry}
          bodyMaterial={roundButtonBodyMaterial}
          tipMaterial={roundButtonTipMaterial}
        />
      </group>
      <Joystick
        material={roundButtonBodyMaterial}
        whiteMaterial={roundButtonTipMaterial}
        stickGeometry={nodesWithGeometry.Cube008.geometry}
        whiteGeometry={nodesWithGeometry.Cube008_1.geometry}
      />
      <Switches material={roundButtonBodyMaterial} geometry={nodesWithGeometry.button006.geometry} />
    </group>
  )
}

useGLTF.preload('/arcade.glb')
