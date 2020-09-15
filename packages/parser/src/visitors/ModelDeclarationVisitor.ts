import { ModelDeclaration, Node } from '..';
import { ModelPropertyVisitor, Visitor } from '.';

export class ModelDeclarationVisitor extends Visitor {
  visit(node: Node): Node {
    return this.visitEachChild(
      new ModelDeclaration(node.key.toString(), node.parent, node.children),
      new ModelPropertyVisitor(),
    );
  }
}
