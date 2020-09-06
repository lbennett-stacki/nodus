import { Node } from "./Node";

export interface Visitable {
  accept(visitor: Visitor): void;
}

export class Visitor {
  visit(node: Node) {
    return node;
  }
}
