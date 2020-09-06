import { SyntaxTree } from '@nodus/parser';
// Compiling
//
// 1. semantic analysis - work out actions/implications
// 2. code optimization
// 3. code generation

export class Compiler {
  async compile(tree: SyntaxTree): Promise<void> {
    console.log("compile", tree);
    return;
  }
}
