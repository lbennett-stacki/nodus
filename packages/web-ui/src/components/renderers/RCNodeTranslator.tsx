import * as THREE from 'three'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { useFrame, ReactThreeFiber, useThree } from 'react-three-fiber';
import NodeSelectionStore from '../../stores/nodes/NodeSelection.store';
import { Plane } from 'drei'
import { Floor } from '../Floor';


interface RCNodeTranslatorProps {
  detectionPlane: THREE.Object3D;
}

export const RCNodeTranslator: React.FC<RCNodeTranslatorProps> = (props) => {
  return (
    <Plane rotation-x={- Math.PI / 2} receiveShadow >
      <planeBufferGeometry attach="geometry" args={[500, 500, 8, 8]} />
      <meshBasicMaterial attach="material" color="0xffffff" />
    </Plane>
  )
}
