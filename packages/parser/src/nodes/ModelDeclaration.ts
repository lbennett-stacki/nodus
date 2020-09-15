import { Node, NodeKeys } from '.';

export class ModelDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModelDeclaration, value, parent, children);
  }
}
