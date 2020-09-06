import { Node, SyntaxTree, YAMLTree, YAMLValue } from ".";

export class TreePlanter {
  constructor(private tree = new SyntaxTree()) {}

  recursiveDescent([key, value]: [string, YAMLValue], parent?: Node) {
    let node = new Node(key, value);
    if (!parent) {
      parent = this.tree;
      parent.merge(node);
      node = parent
    } else {
      parent.addChild(node);
    }

    if (value && typeof value === "object") {
      Object.entries(value).forEach(entry =>
        this.recursiveDescent(entry, node)
      );
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => this.recursiveDescent([`${i}`, v], node));
    }
  }

  plant(seed: YAMLTree): SyntaxTree {
    Object.entries(seed).forEach(entry => this.recursiveDescent(entry));

    return this.tree;
  }
}
