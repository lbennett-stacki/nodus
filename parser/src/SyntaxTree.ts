import { Visitor, Visitable, Node } from ".";

export class SyntaxTree implements Visitable {
  constructor(readonly root: Node) {}

  accept(visitor: Visitor): Node {
    const result = visitor.visit(this);

    console.log("SYNTAX TREE RESULT", result.constructor.name, result.value);
    this.root.value = result.value;
    this.root.parent = result.parent;
    console.log("SYNTAX TREE visiting children");
    this.root.children = result.children.reduce((children, child) => {
      console.log("SYNTAX TREE visiting child");
      const res = child.accept(visitor);
      // res.parent = this.parent;
      console.log("SYNTAX TREE CHILD RES", res);
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
