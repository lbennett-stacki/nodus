import * as THREE from 'three';
import { observable, action, computed, reaction } from "mobx"
import { createContext } from "react"

import { BaseNodeProps } from '../../components/nodes/BaseNode'

export interface NodeSelection {
  id?: string;
  title: string;
  completed: boolean;
}

export interface ISelectableNodeMeta {
  group: string
  groupColor: string
  subGroupName: string;
  name: string;
}

export interface ISelectableNode {
  mesh: THREE.Object3D;
  meta: ISelectableNodeMeta;
}


class NodeSelectionStore {
  @observable selectedNodeId?: string;
  @observable selectedNode?: ISelectableNode;
  @observable hoveredNodes: ISelectableNode[] = [];

  @observable virtualMetaNodes: BaseNodeProps[] = []

  @action selectNode = (id: string, mesh: ISelectableNode) => {
    this.selectedNodeId = id;
    this.selectedNode = mesh;
  }

  @action deSelectNode = () => {
    this.selectedNodeId = undefined
    this.selectedNode = undefined
  }

  @action onHoverOn = (node: ISelectableNode) => { this.hoveredNodes.push(node); }

  @action onHoverOut = (node: ISelectableNode) => {
    this.hoveredNodes = this.hoveredNodes.filter(item => node !== item);
  }

  @action createMetaNode = (props: BaseNodeProps) => {
    this.virtualMetaNodes.push(props)
  }
}

export default createContext(new NodeSelectionStore())
