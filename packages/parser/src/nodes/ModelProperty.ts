import { Node, NodeKeys } from '.';

export class ModelProperty extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModelProperty, value, parent, children);
  }
}
