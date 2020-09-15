import {
  Node,
  NodeKeys,
  DescriptionDeclaration,
  NameDeclaration,
  ModulesCollection,
  ModelsCollection,
} from '..';
import { Visitor, ModuleDeclarationVisitor, ModelDeclarationVisitor } from '.';

export class ParserVisitor extends Visitor {
  private readonly moduleDeclarationVisitor = new ModuleDeclarationVisitor();
  private readonly modelDeclarationVisitor = new ModelDeclarationVisitor();

  visit(node: Node): Node {
    // TODO: replace with a map/factory
    switch (node.key) {
      case NodeKeys.Root:
        return new Node(node.key, node.value, node.parent, node.children);
      case NodeKeys.DescriptionDeclaration:
        if (node.value && typeof node.value === 'string') {
          return new DescriptionDeclaration(node.value, node.parent);
        }
        break;
      case NodeKeys.NameDeclaration:
        if (node.value && typeof node.value === 'string') {
          return new NameDeclaration(node.value, node.parent);
        }
        break;
      case NodeKeys.ModulesCollection:
        return this.visitEachChild(
          new ModulesCollection(node.value, node.parent, node.children),
          this.moduleDeclarationVisitor,
        );
      case NodeKeys.ModelsCollection:
        return this.visitEachChild(
          new ModelsCollection(node.value, node.parent, node.children),
          this.modelDeclarationVisitor,
        );
      default:
        return node;
    }

    return node;
  }
}
