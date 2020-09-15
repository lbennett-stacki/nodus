import { ModuleDeclaration, Node } from '..';
import { Visitor } from '.';

export class ModuleDeclarationVisitor extends Visitor {
  visit(node: Node): Node {
    return new ModuleDeclaration(
      node.key.toString(),
      node.parent,
      node.children,
    );
  }
}
