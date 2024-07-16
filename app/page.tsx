'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Plane } from '@react-three/drei'
import * as THREE from 'three'
import { Leva, useControls } from 'leva'
import { ViewProps } from '@/components/canvas/View'

const Arcade = dynamic(() => import('@/components/canvas/Arcade').then((mod) => mod.Arcade), { ssr: false })

const View = dynamic<ViewProps & { className: string }>(
  () => import('@/components/canvas/View').then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-96 w-full flex-col items-center justify-center'>
        <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
      </div>
    ),
  },
)

const Common = dynamic<{ color?: string }>(() => import('@/components/canvas/View').then((mod) => mod.Common), {
  ssr: false,
})

export default function Page() {
  const { planeScale } = useControls({ planeScale: 160 })

  return (
    <div className='mx-auto flex h-full w-full flex-col flex-wrap items-center'>
      <View orbit className='flex h-full w-full flex-col items-center justify-center'>
        <Suspense fallback={null}>
          <Arcade />
          <Plane position={[0, -1.5, 0]} scale={planeScale} rotation-x={Math.PI / 2} castShadow receiveShadow>
            <meshStandardMaterial color='#ff618a' side={THREE.DoubleSide} />
          </Plane>
          <Common color='#ff618a' />
        </Suspense>
      </View>

      <Leva hidden={process.env.NODE_ENV === 'production'} />
    </div>
  )
}
