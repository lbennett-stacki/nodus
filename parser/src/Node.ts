import { Visitor, Visitable } from ".";

export class Node implements Visitable {
  constructor(
    public key?: string,
    public value?: any, // TODO
    public children: Node[] = []
  ) {}

  accept(visitor: Visitor) {
    visitor.visit(this);
    this.children.forEach(child => {
      child.accept(visitor);
    });
  }

  addChild(child: Node) {
    this.children.push(child);
  }

  merge(node: Node) {
    this.key = node.key || this.key;
    this.value = node.value || this.value;
    this.children = [...this.children, ...node.children];
  }
}
