import { Node, NodeKeys, SyntaxTree, YAMLTree, YAMLValue } from '.';

export class TreePlanter {
  constructor(
    private tree?: SyntaxTree,
    private treeFactory = SyntaxTree.create,
  ) {}

  recursiveDescent([key, value]: [string, YAMLValue], parent?: Node) {
    let node = new Node(
      (key as unknown) as NodeKeys,
      // TODO: use YAMLPrimitive enum of some kind?
      ['string', 'number'].includes(typeof value) ? value : undefined,
      parent,
    );
    if (!parent) {
      this.tree = this.treeFactory(node);
      parent = this.tree.root;
      node = parent;
    } else {
      parent.addChild(node);
    }

    if (value && typeof value === 'object') {
      this.descendObject(value, node);
    } else if (Array.isArray(value)) {
      this.descendArray(value, node);
    }
  }

  descendObject(object: { [key: string]: YAMLValue }, node?: Node) {
    return Object.entries(object).forEach((entry) =>
      this.recursiveDescent(entry, node),
    );
  }

  descendArray(array: YAMLValue[], node?: Node) {
    return array.forEach((v) =>
      this.recursiveDescent([NodeKeys.Node.toString(), v], node),
    );
  }

  plant(seed: YAMLTree): SyntaxTree {
    this.descendObject(seed);

    (<Node>this.tree.root).key = NodeKeys.Root;

    return this.tree;
  }
}
