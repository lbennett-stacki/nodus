import { SyntaxTree } from "@atomus/parser";

export class Compiler {
  async compile(tree: SyntaxTree): Promise<void> {
    console.log("compile", tree);
    return;
  }
}
