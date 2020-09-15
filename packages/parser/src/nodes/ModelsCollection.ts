import { YAMLValue } from "..";
import { Node, NodeKeys } from '.';

export class ModelsCollection extends Node {
  constructor(public value: YAMLValue, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModelsCollection, value, parent, children);
  }
}
