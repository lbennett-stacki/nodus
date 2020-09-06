import { Command, flags } from "@oclif/command";
import { IConfig } from "@oclif/command/lib";
import { Parser } from "@nodus/parser";
import { ConfigFinder } from "../ConfigFinder";

export default class Parse extends Command {
  static description = "Parse a Nodus config file";

  static examples = [
    "$ nodus-cli parse",
    "$ nodus-cli parse ./domain/domain.nodus"
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    json: flags.boolean({ char: "j", default: true, allowNo: true })
  };

  static args = [{ name: "path" }];

  constructor(
    argv: string[],
    config: IConfig,
    private readonly parser = new Parser(),
    private readonly configFinder = new ConfigFinder()
  ) {
    super(argv, config);
  }

  async run() {
    const { args, flags } = this.parse(Parse);

    const path = this.configFinder.resolve(args.path);

    const parsed = await this.parser.parse(path);

    if (!flags.json) {
      this.log(parsed);
    } else {
      this.log(JSON.stringify(parsed, null, 2));
    }
  }
}
