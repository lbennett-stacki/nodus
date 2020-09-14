import { YAMLParser, Node, SyntacticAnalyzer } from ".";

export class Parser {
  constructor(
    private readonly yaml = new YAMLParser(),
    private readonly syntactic = new SyntacticAnalyzer()
  ) {}

  async parse(path: string): Promise<Node> {
    const yaml = await this.yaml.parse(path);
    return this.syntactic.analyze(yaml);
  }
}
