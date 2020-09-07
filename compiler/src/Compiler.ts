import { SyntaxTree } from "@nodus/parser";

export class Compiler {
  async compile(tree: SyntaxTree): Promise<void> {
    console.log("compile", tree);
    return;
  }
}
