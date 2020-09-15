import { Node, SyntaxTree } from "..";

export interface Visitable {
  accept(visitor: Visitor): void;
}

export abstract class Visitor {
  abstract visit(node: Node | SyntaxTree): Node;

  visitEachChild(node: Node, visitor: Visitor = this): Node {
    node.children = node.children.map(child => visitor.visit(child));
    return node;
  }
}

