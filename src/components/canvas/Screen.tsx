import { toVec3, toEuler } from '@/helpers/three-helpers'
import { Html } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import localFont from 'next/font/local'

const pixelify = localFont({ src: './PressStart2P-Regular.ttf' })

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
  const { screenPosition, screenRotation } = useControls('buttons', {
    Screen: folder({
      screenPosition: { value: { x: 0, y: -0.01, z: 0 }, x: { step: 0.1 }, y: { step: 0.01 } },
      screenRotation: { value: { x: 0.14, y: 0, z: 0 }, x: { step: 0.1 }, y: { step: 0.01 } },
      screenSize: { value: { w: 800, h: 450 } },
    }),
  })
  const [loadGame, setLoadGame] = useState(false)
  const ctaRef = useRef<HTMLButtonElement>()
  const linkRef = useRef<HTMLAnchorElement>()

  function handleLoadGame() {
    setLoadGame(true)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!ctaRef.current || !linkRef.current) return

      if (event.key === 'ArrowDown') {
        if (ctaRef.current.classList.contains('focused')) {
          focusElement(linkRef.current)
          ctaRef.current.classList.toggle('focused')
        } else {
          linkRef.current.classList.toggle('focused')
          focusElement(ctaRef.current)
        }
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        executeEvent(ctaRef.current, linkRef.current)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <mesh castShadow receiveShadow geometry={geometry} material={material} position={[-0.4, 0.286, -0.06]}>
      <Html
        className={pixelify.className}
        position={toVec3(screenPosition)} // Position of the iframe relative to the mesh
        transform
        rotation={toEuler(screenRotation)}
        occlude
        distanceFactor={1}
      >
        {!loadGame ? (
          <div className='game-menu'>
            <h1>Jenaro Calviño</h1>
            <p>This is my resume, use the keyboard arrows to navigate the menu</p>
            <nav>
              <button className='focused' ref={ctaRef} autoFocus onClick={handleLoadGame}>
                Play Game!
              </button>
              <a ref={linkRef} href='/cv'>
                Take me to a regular CV
              </a>
            </nav>
          </div>
        ) : (
          <iframe
            src='/game'
            allowTransparency
            allowFullScreen
            frameBorder={0}
            scrolling='no'
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
        )}
      </Html>
    </mesh>
  )
}
