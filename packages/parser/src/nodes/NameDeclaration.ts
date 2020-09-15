import { Node, NodeKeys } from ".";

export class NameDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.NameDeclaration, value, parent, children);
  }
}
