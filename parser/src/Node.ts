import { Visitor, Visitable, YAMLValue } from ".";

export class Node implements Visitable {
  constructor(
    public value?: YAMLValue,
    public parent?: Node,
    public children: Node[] = []
  ) {}

  accept(visitor: Visitor): Node {
    const result = visitor.visit(this);

    console.log("RESULT", result.constructor.name, result.value, result);

    result.children = result.children.reduce((children, child) => {
      console.log("visiting child", result.parent, result);
      child.parent = result;
      const res = child.accept(visitor);
      console.log("CHILD RES", res);
      debugger;
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

export class DeserializedNode extends Node {
  constructor(
    public key?: string,
    public value?: YAMLValue, // TODO: rename to Value?
    parent?: Node,
    children: Node[] = []
  ) {
    super(value, parent, children);
  }
}

export class DescriptionDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(value, parent, children);
  }
}

export class ModulesCollection extends Node {
  constructor(public value: YAMLValue, parent?: Node, children: Node[] = []) {
    super(value, parent, children);
  }
}

export class ModuleDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(value, parent, children);
  }
}
