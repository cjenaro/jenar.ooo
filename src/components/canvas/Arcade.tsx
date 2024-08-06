import { useCallback, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { folder, useControls } from 'leva'
import RoundButton from './RoundButton'
import Joystick from './Joystick'
import Switches from './Switches'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { extend, useThree } from '@react-three/fiber'

import { geometry } from 'maath'
import Screen from './Screen'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

function useCameraAnimation() {
  const camera = useThree((state) => state.camera)
  const hasRan = useRef(false)

  const { contextSafe } = useGSAP()

  const animate = contextSafe(() => {
    if (camera && !hasRan.current) {
      hasRan.current = true
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

  const handleMove = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if ((event instanceof KeyboardEvent && event.key === 'Enter') || event instanceof MouseEvent) {
        animate()
      }
    },
    [animate],
  )

  useEffect(() => {
    window.addEventListener('click', handleMove)
    window.addEventListener('keydown', handleMove)

    camera.lookAt(0, 0, 0)

    return () => {
      window.removeEventListener('click', handleMove)
      window.removeEventListener('keydown', handleMove)
    }
  }, [camera, handleMove])
}

export function Arcade(props) {
  const { nodes, materials } = useGLTF('/arcade.glb')
  const nodesWithGeometry = nodes as { [name: string]: typeof nodes[''] & { geometry: any } }

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
  useCameraAnimation()

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
