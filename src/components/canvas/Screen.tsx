import { toVec3, toEuler } from '@/helpers/three-helpers'
import { Html, Image, SpriteAnimator } from '@react-three/drei'
import { folder, useControls } from 'leva'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { isMobile, isSafari } from 'react-device-detect'
import Button from './Button'
import AnimatedBackground from './AnimatedBackground'
import CharacterSprite from './CharacterSprite'
import { useRouter } from 'next/navigation'
import IconButton from './IconButton'

function focusElement(element?: HTMLElement) {
  element.focus()
  element.classList.add('focused')
}

function executeEvent(cta: HTMLButtonElement, link: HTMLAnchorElement) {
  if (cta.classList.contains('focused')) {
    cta.click()
  }

  if (link.classList.contains('focused')) {
    link.click()
  }
}

export default function Screen({ geometry, material }) {
  const { btn1Pos, btn2Pos, width, height } = useControls('buttons', {
    Screen: folder({
      screenPosition: { value: { x: 0, y: -0.01, z: 0.1 }, x: { step: 0.1 }, y: { step: 0.01 } },
      screenRotation: { value: { x: 0.14, y: 0, z: 0 }, x: { step: 0.1 }, y: { step: 0.01 } },
      screenSize: { value: { w: 800, h: 450 } },
    }),
    'Custom Button': folder({
      btn1Pos: { value: { x: 0, y: 0.15, z: 0 }, x: { step: 0.1 }, y: { step: 0.01 } },
      btn2Pos: { value: { x: 0, y: -0.15, z: 0 }, x: { step: 0.1 }, y: { step: 0.01 } },
      width: 1,
      height: 0.2,
    }),
  })
  const router = useRouter()
  const [loadGame, setLoadGame] = useState(false)
  const [activeCTA, setActiveCTA] = useState<'game' | 'cv'>('game')
  const iframeRef = useRef<HTMLIFrameElement>()

  function handleLoadGame() {
    setLoadGame(true)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        setActiveCTA((old) => (old === 'cv' ? 'game' : 'cv'))
      }

      if (event.key === 'Enter') {
        if (activeCTA === 'game') {
          handleLoadGame()
        } else if (activeCTA === 'cv') {
          router.push('/cv')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function requestFullScreen() {
    iframeRef.current.requestFullscreen()
  }

  return (
    <mesh castShadow receiveShadow position={[-0.4, 0.286, -0.06]} material={material}>
      <mesh rotation={[0.146, 0, 0]} renderOrder={0}>
        <Image url='/assets/cv/bg.png' position={[0, 0, 0.00001]}>
          {/** @ts-ignore */}
          <roundedPlaneGeometry args={[1.87, 1.1, 0.13]} />
        </Image>
        <AnimatedBackground textureUrl='/assets/cv/beach.png' renderOrder={1} />
        <AnimatedBackground textureUrl='/assets/cv/clouds.png' speed={0.003} renderOrder={2} />
        <AnimatedBackground textureUrl='/assets/cv/cloudsfront.png' speed={0.007} renderOrder={3} />
        <CharacterSprite textureUrl='/assets/cv/character.png' renderOrder={4} />

        {!loadGame ? (
          <group position={[0, 0, 0.001]} renderOrder={5}>
            <Button
              isActive={activeCTA === 'game'}
              label='Play game'
              position={toVec3(btn1Pos)}
              width={width}
              height={height}
              onClick={handleLoadGame}
            />
            <Button
              isActive={activeCTA === 'cv'}
              label='Go to the cv page'
              position={toVec3(btn2Pos)}
              width={width}
              height={height}
              url='/cv'
            />
          </group>
        ) : (
          <>
            <group renderOrder={5}>
              <IconButton
                width={0.08}
                height={0.08}
                position={[0.8, -0.67, 0.001]}
                onClick={requestFullScreen}
                iconUrl=' /assets/fullscreen.svg'
              />
            </group>

            <Html
              // position={toVec3(screenPosition)} // Position of the iframe relative to the mesh
              position={[0, 0, 0.001]}
              transform
              // rotation={toEuler(screenRotation)}
              occlude
              distanceFactor={1}
              className={isSafari && isMobile ? 'mt-[-260px]' : ''}
            >
              <iframe
                ref={iframeRef}
                src='/game'
                allowFullScreen
                allow='autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated; web-share'
                style={{
                  width: '760px',
                  height: '450px',
                  border: 'none',
                  transform: 'scale(1)',
                  transformOrigin: 'center center',
                  borderRadius: '52px',
                }}
              />
            </Html>
          </>
        )}
      </mesh>
    </mesh>
  )
}
