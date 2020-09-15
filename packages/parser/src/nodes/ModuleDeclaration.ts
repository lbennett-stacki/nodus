import { Node, NodeKeys } from '.';

export class ModuleDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModuleDeclaration, value, parent, children);
  }
}
