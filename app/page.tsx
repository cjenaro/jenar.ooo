'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Plane, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'
import { Leva, useControls } from 'leva'
import { ViewProps } from '@/components/canvas/View'

const Arcade = dynamic(() => import('@/components/canvas/Arcade').then((mod) => mod.Arcade), { ssr: false })
const Title = dynamic(() => import('@/components/canvas/Title').then((mod) => mod.Title), { ssr: false })
const Instructions = dynamic(() => import('@/components/canvas/Title').then((mod) => mod.Instructions), { ssr: false })

const View = dynamic<ViewProps & { className: string }>(
  () => import('@/components/canvas/View').then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-full w-full flex-col items-center justify-center bg-pink-500'>
        <p>now loading...</p>

        <div className='mt-4 w-4/12 h-2 flex bg-white overflow-hidden'>
          <div className='progress h-2 w-1 bg-pink-900'></div>
        </div>
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
      <View className='flex h-full w-full flex-col items-center justify-center'>
        <Suspense fallback={null}>
          <PresentationControls>
            <Title />
            <Arcade />
            <Instructions />
            <Plane position={[0, -1.5, 0]} scale={planeScale} rotation-x={Math.PI / 2} receiveShadow>
              <meshStandardMaterial color='#ff618a' side={THREE.DoubleSide} />
            </Plane>
          </PresentationControls>
          <Common color='#ff618a' />
        </Suspense>
      </View>

      <Leva hidden={process.env.NODE_ENV === 'production'} />
    </div>
  )
}
