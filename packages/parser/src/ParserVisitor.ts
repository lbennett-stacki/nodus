import {
  Node,
  Visitor,
  DeserializedNode,
  DescriptionDeclaration,
  ModulesCollection,
  ModuleDeclaration
} from ".";

export class ParserVisitor extends Visitor {
  // lexer type inference
  visit(node: DeserializedNode): Node {
    // infer base types from node 'key' props
    // if token is found, visit lexer
    // ----- myabe need lexer to detect token so everything that can have reference etc should go to lexer

    // TODO: replace with a map
    switch (node.key) {
      case "root":
        // TODO: RootNode
        return new Node(node.value, node.parent, node.children);
      case "description":
        if (node.value && typeof node.value === "string") {
          return new DescriptionDeclaration(node.value, node.parent);
        }
        break;
      case "modules":
        return new ModulesCollection(node.value, node.parent, node.children);
      default:
        // TODO: visitModuleDeclaration()
        console.log(node.parent, "PARENTO");
        if (node.parent instanceof ModulesCollection) {
          console.log("DO IT");
          return new ModuleDeclaration(node.key, node.parent, node.children);
        }
      // console.log("\n\nUnhandled Key:", node, "\n\n", node.children[1]);
      // throw new Error(`Unhandled Key: ${node.key}`);
    }

    return node;
  }
}
