import { Command, flags } from "@oclif/command";
import { IConfig } from "@oclif/command/lib";
import { Compiler } from "@nodus/compiler";
import { ConfigFinder } from "../ConfigFinder";

export default class Compile extends Command {
  static description = "Compile a Nodus config file";

  static examples = [
    "$ nodus-cli compile",
    "$ nodus-cli compile ./domain/domain.nodus"
  ];

  static flags = {
    help: flags.help({ char: "h" })
  };

  static args = [{ name: "path" }];

  constructor(
    argv: string[],
    config: IConfig,
    private readonly compiler = new Compiler(),
    private readonly configFinder = new ConfigFinder()
  ) {
    super(argv, config);
  }

  async run() {
    const { args } = this.parse(Compile);

    const path = this.configFinder.resolve(args.path);

    await this.compiler.compile(path);
  }
}
