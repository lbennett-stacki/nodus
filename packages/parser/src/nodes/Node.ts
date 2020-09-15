import { Visitor, Visitable, YAMLValue } from '..';
import { NodeKeys } from '.';

export class Node implements Visitable {
  constructor(
    public key?: NodeKeys,
    public value?: YAMLValue,
    public parent?: Node,
    public children: Node[] = [],
  ) {}

  accept(visitor: Visitor): Node {
    const result = visitor.visit(this);

    result.children = result.children.reduce((children, child) => {
      child.parent = result;
      const res = child.accept(visitor);
      if (res !== undefined) {
        children.push(res);
      }
      return children;
    }, []);

    return result;
  }

  addChild(child: Node) {
    child.parent = this;
    this.children.push(child);
  }
}
