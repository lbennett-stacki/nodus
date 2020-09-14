import React, { useContext, useRef, useEffect, useState } from 'react'
import { extend, useThree, ReactThreeFiber } from 'react-three-fiber'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import NodeSelectionStore from '../../stores/nodes/NodeSelection.store'
import { observer } from 'mobx-react-lite'
// import { DragControls } from 'drei'

import { axisValueSnapper } from '../nodes/BaseNode'
import { useSpring } from '@react-spring/three'

extend({ DragControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dragControls': ReactThreeFiber.Object3DNode<DragControls, typeof DragControls>;
    }
  }
}

// export const NodeTranslator: React.FC = observer(() => {
//   const { gl: { domElement }, camera } = useThree()
//   const nodeSelectionStore = useContext(NodeSelectionStore)
//   const instance = nodeSelectionStore.selectedNode ? [nodeSelectionStore.selectedNode.mesh] : []

//   console.log('instances', instance)
//   return <dragControls args={[instance, camera, domElement]} />
// })

export const NodeTranslator: React.FC = observer(() => {
  const { gl: { domElement }, camera, scene } = useThree()
  const nodeSelectionStore = useContext(NodeSelectionStore)
  const instance = nodeSelectionStore.selectedNode ? [nodeSelectionStore.selectedNode.mesh] : []
  const ref = useRef<DragControls>()

  useEffect(() => {
    ref.current?.addEventListener('dragstart', function (event: any) {
      console.log('drag start');
    });

    ref.current?.addEventListener('drag', function (event: any) {
      console.log('drag');
      event.object.position.y = 1;
    });

    ref.current?.addEventListener('dragend', function (event: any) {
      console.log('drag end');
      event.object.position.y = 1;
      event.object.position.z = axisValueSnapper(event.object.position.z)
      event.object.position.x = axisValueSnapper(event.object.position.x)
    });

  }, [ref.current]);

  return <dragControls ref={ref} args={[scene.children, camera, domElement]}/>
})