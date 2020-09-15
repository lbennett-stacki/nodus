import { YAMLValue } from '..';
import { Node, NodeKeys } from '.';

export class ModulesCollection extends Node {
  constructor(public value: YAMLValue, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModulesCollection, value, parent, children);
  }
}
