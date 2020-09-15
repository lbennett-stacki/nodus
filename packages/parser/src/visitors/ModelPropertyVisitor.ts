import { Node, ModelProperty } from "..";
import { Visitor } from '.'

export class ModelPropertyVisitor extends Visitor {
  visit(node: Node): Node {
    return new ModelProperty(node.key.toString(), node.parent, node.children);
  }
}
