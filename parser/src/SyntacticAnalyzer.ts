// import { Lexer } from "./Lexer";
import { Node, ParserVisitor, TreePlanter, YAMLTree } from ".";

export class SyntacticAnalyzer {
  constructor(
    private readonly visitor = new ParserVisitor(),
    private readonly planter = new TreePlanter()
    // private readonly lexer = new Lexer(),
  ) {}

  // `TODO: currently this is a multi-pass, we should be able to run lexer build ast AND build empty/basic/yaml ast with one pass if visitors are wired correctly?
  analyze(input: YAMLTree): Node {
    const tree = this.planter.plant(input);
    return tree.root.accept(this.visitor);
  }
}
