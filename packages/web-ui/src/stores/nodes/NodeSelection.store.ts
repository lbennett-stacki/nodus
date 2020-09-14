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
  constructor() {
    // reaction(() => this.todos, _ => console.log(this.todos.length))
    reaction(() => this.selectedNodeId, _ => console.log(`[NodeSelectionStore] Node id: ${this.selectedNodeId}`))
    reaction(() => this.selectedNode, _ => console.log(`[NodeSelectionStore] Mesh: ${this.selectedNode}`))
  }

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

  // @computed get info() {
  //   return {
  //     total: this.todos.length,
  //     completed: this.todos.filter(todo => todo.completed).length,
  //     notCompleted: this.todos.filter(todo => !todo.completed).length,
  //   }
  // }

  @action createMetaNode = (props: BaseNodeProps) => {
    this.virtualMetaNodes.push(props)
  }
}

export default createContext(new NodeSelectionStore())