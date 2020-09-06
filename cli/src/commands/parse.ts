import { Command, flags } from "@oclif/command";
import * as Listr from "listr";
import { Observable } from "rxjs";
import { IConfig } from "@oclif/command/lib";
import { Parser } from "@nodus/parser";
import { ConfigFinder } from "../";
import { ProgressLogger } from "../";

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
    private readonly configFinder = new ConfigFinder(),
    private readonly progressLoggerFactory = ProgressLogger.observe
  ) {
    super(argv, config);
  }

  async run() {
    const { args, flags } = this.parse(Parse);

    const tasks = new Listr([
      {
        title: "Finding Nodus config",
        task: (context: any) => {
          return this.progressLoggerFactory(logger => {
            context.path = this.configFinder.resolve(args.path, { logger });
          });
        }
      },
      {
        title: "Parsing Nodus config",
        task: (context: any) => {
          return this.progressLoggerFactory(async logger => {
            context.parsed = await this.parser.parse(context.path, { logger });
          });
        }
      }
    ]);

    tasks.run().then(context => {
      const { parsed } = context;
      if (!flags.json) {
        this.log("\n🌲 Root:\n\n", parsed);
        this.log("\n🍂 Immediate children:\n\n", parsed.children);
      } else {
        this.log("\n 🌲 Tree:\n\n", JSON.stringify(parsed, null, 2));
      }
    });
  }
}
