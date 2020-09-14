import { Node, SyntaxTree } from ".";

export interface Visitable {
  accept(visitor: Visitor): void;
}

export abstract class Visitor {
  abstract visit(node: Node | SyntaxTree): Node;
}

