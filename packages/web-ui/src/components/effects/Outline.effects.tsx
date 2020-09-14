import * as THREE from 'three';
import React, { useRef, useMemo, useState, useEffect, useContext } from 'react'
import { useThree, useFrame, extend, ReactThreeFiber } from 'react-three-fiber'
import NodeSelectionStore from '../../stores/nodes/NodeSelection.store'

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import { Color } from 'three';
import { observer } from 'mobx-react-lite';


extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'effectComposer': ReactThreeFiber.Object3DNode<EffectComposer, typeof EffectComposer>;
      'renderPass': ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>;
      'outlinePass': ReactThreeFiber.Object3DNode<OutlinePass, typeof OutlinePass>;
      'shaderPass': ReactThreeFiber.Object3DNode<ShaderPass, typeof ShaderPass>;
    }
  }
}

export const Outliner: React.FC = observer(({ children }) => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef<any>()

  const store = useContext(NodeSelectionStore)
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  useEffect(() => composer.current?.setSize(size.width, size.height), [size])
  useFrame(() => composer.current?.render(), 1)
  return (
    <>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <outlinePass
          attachArray="passes"
          args={[aspect, scene, camera]}
          selectedObjects={store.hoveredNodes.map(node => node.mesh)}
          visibleEdgeColor={new Color("white")}
          edgeStrength={35}
          edgeThickness={0.1}
          pulsePeriod={3}
        />
        <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
      </effectComposer>
    </>
  )
})