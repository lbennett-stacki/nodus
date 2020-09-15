import { Visitor, Visitable, Node } from ".";

export class SyntaxTree implements Visitable {
  constructor(readonly root: Node) {}

  accept(visitor: Visitor): Node {
    const result = visitor.visit(this);

    this.root.value = result.value;
    this.root.parent = result.parent;
    this.root.children = result.children.reduce((children, child) => {
      const res = child.accept(visitor);
      // res.parent = this.parent;
      if (res !== undefined) {
        children.push(res);
      }
      return children;
    }, []);

    return result;
  }

  static create(root: Node): SyntaxTree {
    return new SyntaxTree(root);
  }
}
