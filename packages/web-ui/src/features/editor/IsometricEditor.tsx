import * as THREE from 'three'
import React, { useEffect, useContext } from 'react'
import { BaseNode } from '../../components/nodes/BaseNode';
import { IsometricRenderer } from '../../components/renderers/IsometricRenderer';
import { SideMenu } from '../../components/side-menu/SideMenu';
import NodeSelectionStore from '../../stores/nodes/NodeSelection.store';
import { observer } from 'mobx-react-lite';

export const IsometricEditor: React.FC = observer(() => {

  const store = useContext(NodeSelectionStore)

  const nodes = [
    {
      label: 'Test',
      position: new THREE.Vector3(0, 0, 0),
      floatable: true,
      meta: {
        group: "common",
        groupColor: "bg-orange-500",
        subGroupName: "Schema",
        name: "Untitled"
      }
    },
    {
      label: 'Product',
      position: new THREE.Vector3(2, 2, -5),
      floatable: true,
      meta: {
        group: "common",
        groupColor: "bg-orange-500",
        subGroupName: "Schema",
        name: "Untitled"
      }
    },
    {
      label: 'Router',
      position: new THREE.Vector3(3, 3, 5),
      floatable: true,
      meta: {
        group: "common",
        groupColor: "bg-orange-500",
        subGroupName: "Schema",
        name: "Untitled"
      }
    }
  ]

  useEffect(() => {
    nodes.forEach(node => store.createMetaNode(node))
  }, [])

  return (
    <>
      <SideMenu />
      <IsometricRenderer>
        {
          store.virtualMetaNodes.map(node => <BaseNode {...node} />)
        }
        {/* <BaseNode label="Test" position={new THREE.Vector3(0, 0, 0)} floatable />
        <BaseNode label="Product" position={new THREE.Vector3(2, 2, 2)} floatable />
        <BaseNode label="Luke" position={new THREE.Vector3(4, 1, 0)} floatable /> */}
      </IsometricRenderer>
    </>
  )
})