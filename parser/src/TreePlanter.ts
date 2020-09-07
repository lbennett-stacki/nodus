import { DeserializedNode, SyntaxTree, YAMLTree, YAMLValue } from ".";

export class TreePlanter {
  constructor(
    private tree?: SyntaxTree,
    private treeFactory = SyntaxTree.create
  ) {}

  recursiveDescent(
    [key, value]: [string, YAMLValue],
    parent?: DeserializedNode
  ) {
    let node = new DeserializedNode(
      key,
      // TODO: use YAMLPrimitive enum of some kind?
      ["string", "number"].includes(typeof value) ? value : undefined,
      parent
    );
    if (!parent) {
      this.tree = this.treeFactory(node);
      parent = this.tree.root;
      node = parent;
    } else {
      parent.addChild(node);
    }

    if (value && typeof value === "object") {
      this.descendObject(value, node);
    } else if (Array.isArray(value)) {
      this.descendArray(value, node);
    }
  }

  descendObject(object: object, node?: DeserializedNode) {
    return Object.entries(object).forEach(entry =>
      this.recursiveDescent(entry, node)
    );
  }

  descendArray(array: YAMLValue[], node?: DeserializedNode) {
    return array.forEach((v, i) => this.recursiveDescent([`${i}`, v], node));
  }

  plant(seed: YAMLTree): SyntaxTree {
    this.descendObject(seed);

    (<DeserializedNode>this.tree.root).key = "root";

    return this.tree;
  }
}
