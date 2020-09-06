// Compiling
//
// 1. semantic analysis - work out actions/implications
// 2. code optimization
// 3. code generation

export class Compiler {
  async compile(path: string): Promise<void> {
    console.log("compile", path);
    return;
  }
}
