import * as THREE from 'three'
import React, { useContext, useRef, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame } from 'react-three-fiber'
import { ControlsProvider, Controls } from 'react-three-gui';
import { MapControls } from 'drei'

import { Floor } from '../Floor';
import { Outliner } from '../effects/Outline.effects';
import { NodeTranslator } from './NodeTranslator';
import { observer } from 'mobx-react-lite';
import NodeSelectionStore from '../../stores/nodes/NodeSelection.store';
import { RCNodeTranslator } from './RCNodeTranslator';

import Effects from '../effects/test.effects'

export interface IsometricRendererProps {
  gridHelper?: boolean;
}

const Lights: React.FC = () => {
  const store = useContext(NodeSelectionStore)
  return (
    <>
      <ambientLight intensity={3.5} />
      <spotLight intensity={2} position={[-35, 35, 35]} angle={1} penumbra={1} castShadow />
      <spotLight intensity={2} position={[-35, 0, 35]} angle={1} penumbra={1} castShadow />
    </>
  )
}

const PanControl = observer(() => {
  const zoomRange = { minZoom: 30, maxZoom: 40 }
  const store = useContext(NodeSelectionStore)
  return <MapControls
    enabled={!!!store.selectedNode}
    enableRotate={false}
    dampingFactor={0.1}
    {...zoomRange}
    enablePan={!!!store.selectedNodeId}
  />
})

export const IsometricRenderer: React.FC<IsometricRendererProps> = ({ children, ...props }) => {

  const zoomRange = { minZoom: 30, maxZoom: 40 }

  const floor = useRef<any>();

  return (
    <ControlsProvider>
      <THREECanvas
        colorManagement
        orthographic
        camera={{
          zoom: 40,
          position: [35, 35, 35],
        }}
        gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('white')
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >

        {props.gridHelper && <gridHelper args={[1000, 1000]} />}

        <NodeTranslator />

        <PanControl />

        <Lights />

        {/* <ambientLight intensity={2.5} /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}

        
          {children}

        <Floor />


        {/* <RCNodeTranslator detectionPlane={floor.current} /> */}
        {/* 
        {
          floor.current && 
        } */}

        <Suspense fallback={null}>
          <Outliner/>
          {/* <Effects /> */}
        </Suspense>
      </THREECanvas>
      <Controls />
    </ControlsProvider>
  )
}