import { Visitor, Visitable, YAMLValue } from ".";

export enum NodeKeys {
  DescriptionDeclaration = "description",
  ModelDeclaration = "model",
  ModelProperty = "model:property",
  ModelsCollection = "models",
  ModuleDeclaration = "module",
  ModulesCollection = "modules",
  NameDeclaration = "name",
  Node = "node",
  Root = "root"
}

export class Node implements Visitable {
  constructor(
    public key?: NodeKeys,
    public value?: YAMLValue,
    public parent?: Node,
    public children: Node[] = []
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

export class DescriptionDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.DescriptionDeclaration, value, parent, children);
  }
}

export class NameDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.NameDeclaration, value, parent, children);
  }
}

export class ModulesCollection extends Node {
  constructor(public value: YAMLValue, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModulesCollection, value, parent, children);
  }
}

export class ModuleDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModuleDeclaration, value, parent, children);
  }
}

export class ModelsCollection extends Node {
  constructor(public value: YAMLValue, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModelsCollection, value, parent, children);
  }
}

export class ModelDeclaration extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModelDeclaration, value, parent, children);
  }
}

export class ModelProperty extends Node {
  constructor(public value: string, parent?: Node, children: Node[] = []) {
    super(NodeKeys.ModelProperty, value, parent, children);
  }
}
