import React from 'react'
import { Plane } from 'drei'

const Gray = "#2e2f33"

export const Floor=  React.forwardRef((props, ref) => {
  return (
    <Plane ref={ref} rotation-x={- Math.PI / 2} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color={Gray} />
    </Plane>
  )
})
