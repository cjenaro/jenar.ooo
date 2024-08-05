import { toVec3, toEuler } from '@/helpers/three-helpers'
import { Html } from '@react-three/drei'
import { folder, useControls } from 'leva'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        if (ctaRef.current.classList.contains('focused')) {
          focusElement(linkRef.current)
          ctaRef.current.classList.toggle('focused')
        } else {
          linkRef.current.classList.toggle('focused')
          focusElement(ctaRef.current)
        }
      }

      if (event.key === 'Enter' && ([linkRef.current, ctaRef.current] as Element[]).includes(document.activeElement)) {
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
        position={toVec3(screenPosition)} // Position of the iframe relative to the mesh
        transform
        rotation={toEuler(screenRotation)}
        occlude
        distanceFactor={1}
      >
        {!loadGame ? (
          <div className='w-full h-full relative rounded-[52px] overflow-hidden'>
            <div className='w-full h-full absolute z-0'>
              <div className='bg img'></div>
              <div className='clouds img'></div>
              <div className='clouds-front img'></div>
              <div className='beach img'></div>
              <div className='char img'></div>
            </div>
            <div className='game-menu relative z-10 rounded bg-pink-50/50'>
              <h1>Jenaro Calviño</h1>
              <p>This is my resume, use the keyboard arrows to navigate the menu</p>
              <nav>
                <button className='focused' ref={ctaRef} onClick={handleLoadGame}>
                  Play Game!
                </button>
                <Link ref={linkRef} href='/cv'>
                  Take me to a regular CV
                </Link>
              </nav>
            </div>
          </div>
        ) : (
          <>
            <Link href='/game' className='absolute bottom-6 right-6 bg-pink-50/50 rounded w-8 h-8 z-10'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <title>Fullscreen</title>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                />
              </svg>
            </Link>
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
          </>
        )}
      </Html>
    </mesh>
  )
}
