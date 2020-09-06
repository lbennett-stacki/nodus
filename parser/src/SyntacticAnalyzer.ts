// import { Lexer } from "./Lexer";
import { Visitor, TreePlanter, SyntaxTree, YAMLTree } from ".";

export class SyntacticAnalyzer {
  constructor(
    private readonly visitor = new Visitor(),
    private readonly planter = new TreePlanter()
    // private readonly lexer = new Lexer(),
  ) {}

  analyze(input: YAMLTree): SyntaxTree {
    const tree = this.planter.plant(input);
    tree.accept(this.visitor);

    return tree;
  }
}
