import { Node, NodeKeys } from '.';

export class DescriptionDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.DescriptionDeclaration, value, parent, children);
  }
}
