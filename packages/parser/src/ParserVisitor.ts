import {
  Node,
  NodeKeys,
  Visitor,
  DescriptionDeclaration,
  NameDeclaration,
  ModulesCollection,
  ModuleDeclaration,
  ModelsCollection,
  ModelDeclaration,
  ModelProperty,
} from ".";

export class ModuleDeclarationVisitor extends Visitor {
  visit(node: Node): Node {
    return new ModuleDeclaration(
      node.key.toString(),
      node.parent,
      node.children
    );
  }
}

export class ModelPropertyVisitor extends Visitor {
  visit(node: Node): Node {
    return new ModelProperty(
      node.key.toString(),
      node.parent,
      node.children
    );
  }
}

export class ModelDeclarationVisitor extends Visitor {
  visit(node: Node): Node {
    return this.visitEachChild(
      new ModelDeclaration(node.key.toString(), node.parent, node.children),
      new ModelPropertyVisitor()
    );
  }
}

export class ParserVisitor extends Visitor {
  visit(node: Node): Node {
    // TODO: replace with a map
    switch (node.key) {
      case NodeKeys.Root:
        return new Node(node.key, node.value, node.parent, node.children);
      case NodeKeys.DescriptionDeclaration:
        if (node.value && typeof node.value === "string") {
          return new DescriptionDeclaration(node.value, node.parent);
        }
        break;
      case NodeKeys.NameDeclaration:
        if (node.value && typeof node.value === "string") {
          return new NameDeclaration(node.value, node.parent);
        }
        break;
      case NodeKeys.ModulesCollection:
        return this.visitEachChild(
          new ModulesCollection(node.value, node.parent, node.children),
          new ModuleDeclarationVisitor()
        );
      case NodeKeys.ModelsCollection:
        return this.visitEachChild(
          new ModelsCollection(node.value, node.parent, node.children),
          new ModelDeclarationVisitor()
        );
      default:
        return node;
    }

    return node;
  }
}
