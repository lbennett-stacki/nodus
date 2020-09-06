import { Command, flags } from "@oclif/command";
import { IConfig } from "@oclif/command/lib";
import * as Listr from "listr";
import { Compiler } from "@nodus/compiler";
import { Parser } from "@nodus/parser";
import { ConfigFinder, ProgressLogger } from "../";

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
    private readonly parser = new Parser(),
    private readonly compiler = new Compiler(),
    private readonly configFinder = new ConfigFinder(),
    private readonly progressLoggerFactory = ProgressLogger.observe
  ) {
    super(argv, config);
  }

  async run() {
    const { args } = this.parse(Compile);

    const tasks = new Listr([
      {
        title: "Finding Nodus config",
        task: (context: any) => {
          return this.progressLoggerFactory(() => {
            context.path = this.configFinder.resolve(args.path);
          });
        }
      },
      {
        title: "Parsing Nodus config",
        task: (context: any) => {
          return this.progressLoggerFactory(async () => {
            context.parsed = await this.parser.parse(context.path);
          });
        }
      },
      {
        title: "Compiling Nodus config",
        task: (context: any) => {
          return this.progressLoggerFactory(async () => {
            context.compiled = await this.compiler.compile(context.parsed);

          });
        }
      }
    ]);

    tasks.run().then(context => {
      const { parsed } = context;
        this.log("\n🖨  Compiled:\n\n", parsed);
    });
  }
}
