import { YAMLParser } from "./YAMLParser";
import { SyntacticAnalyzer } from "./SyntacticAnalyzer";
import { SyntaxTree } from "./SyntaxTree";

export class Parser {
  constructor(
    private readonly yaml = new YAMLParser(),
    private readonly syntactic = new SyntacticAnalyzer()
  ) {}

  async parse(path: string): Promise<SyntaxTree> {
    const yaml = await this.yaml.parse(path);
    return this.syntactic.analyze(yaml);
  }
}
