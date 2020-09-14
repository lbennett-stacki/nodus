import * as THREE from 'three'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { useControl } from 'react-three-gui';
import { Html } from 'drei'
import { useBaseNodeControls } from '../controls/debug.controls';
import { ScaleUp } from '../side-menu/Animations.scaleup';
import { NodeTag } from '../tags/NodeTag';
import { useFrame, ReactThreeFiber, useThree } from 'react-three-fiber';
import NodeSelectionStore, { ISelectableNode, ISelectableNodeMeta } from '../../stores/nodes/NodeSelection.store';

import { NodeIndicator } from './Indicator.styles.tw'
import { useFloatable } from './floatable.hooks';

import { Plane } from 'drei'

const Gray = "#2e2f33"
const Black = "#000000"
const White = "#e3e3e3"

export interface BaseNodeProps {
  label: string;
  position?: THREE.Vector3
  floatable?: boolean;
  meta?: ISelectableNodeMeta
}

const Orange = "#CC5500"
const DrakGray = "#2b3038"

export const axisValueSnapper = (value: number) => Math.round(value * 2) / 2

export const BaseNode: React.FC<BaseNodeProps> = ({ label, position, ...props }) => {

  const nodeSelectionStore = useContext(NodeSelectionStore)
  const { selectedNode, selectNode, deSelectNode, onHoverOn, onHoverOut } = nodeSelectionStore

  const [hovered, setHovered] = useState<boolean>(false)
  const [showLabel, setShowLabel] = useState<boolean>(true);

  const [meta, setMeta] = useState<ISelectableNodeMeta>(props.meta ?? {
    group: "common",
    groupColor: "bg-orange-500",
    subGroupName: "Missing",
    name: "Untitled"
  });

  const colors = {
    normal: DrakGray,
    selected: Orange
  }

  const mesh = useRef<THREE.Mesh>()

  useControl('Show label', {
    type: 'boolean',
    state: [showLabel, setShowLabel],
    group: label
  });

  useFloatable(props.floatable, mesh.current, hovered)

  const controls = useBaseNodeControls(label, position ?? new THREE.Vector3(0.5, 0.5, 0.5));
  const defaultY = props.floatable ? 1 : 0.5

  const getColor = (): string => {
    if (selectedNode || hovered) return colors.selected
    return colors.normal
  }



  const { raycaster } = useThree()





  const baseTransitions = "transition duration-500 ease-in-out"
  let labelClass = hovered ? "transition-opacity-0" : "transition-opacity-0"
  labelClass = `${baseTransitions} ${labelClass}`

  const selectableNodeData: ISelectableNode = {
    meta,
    mesh: mesh.current!
  }

  return (
    <>
      {/* <group ref={ref => console.log('we have access to the instance', ref)}> */}
      <mesh
        ref={mesh}
        castShadow
        receiveShadow
        position={[axisValueSnapper(controls.x), defaultY, axisValueSnapper(controls.z)]}
        onPointerDown={e => {
          if (!selectedNode) {
            selectNode(label, selectableNodeData)
          } else {
            // deSelectNode()
          }
        }}
        onPointerOver={e => {
          e.stopPropagation()
          setHovered(true)
          onHoverOn(selectableNodeData)
        }}
        onPointerOut={() => {
          setHovered(false)
          onHoverOut(selectableNodeData)
        }}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshPhongMaterial attach="material" color={getColor()} />
        {
          showLabel && <Html scaleFactor={0.018} className="">
            <div className={`transform -translate-y-32 -translate-x-20 ${labelClass}`}>
              <ScaleUp on={hovered}>
                <NodeTag {...meta} />
              </ScaleUp>
            </div>
            {selectedNode && <NodeIndicator />}
          </Html>
        }
      </mesh>
      {/* </group> */}
    </>
  )
};
