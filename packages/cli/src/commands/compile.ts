import { Command, flags } from "@oclif/command";
import { IConfig } from "@oclif/command/lib";
import * as Listr from "listr";
import { Compiler } from "@atomus/compiler";
import { Parser } from "@atomus/parser";
import { ConfigFinder, ProgressLogger } from "../";

export default class Compile extends Command {
  static description = "Compile a Atomus config file";

  static examples = [
    "$ atomus-cli compile",
    "$ atomus-cli compile ./domain/domain.atomus"
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

    this.tasks(args)
      .run()
      .then(context => {
        const { parsed } = context;
        this.log("\n🖨  Compiled:\n\n", parsed);
      });
  }

  tasks(args: { [key: string]: string }): Listr {
    return new Listr([
      {
        title: "Finding Atomus config",
        task: (context: any) => {
          return this.progressLoggerFactory(() => {
            context.path = this.configFinder.resolve(args.path);
          });
        }
      },
      {
        title: "Parsing Atomus config",
        task: (context: any) => {
          return this.progressLoggerFactory(async () => {
            context.parsed = await this.parser.parse(context.path);
          });
        }
      },
      {
        title: "Compiling Atomus config",
        task: (context: any) => {
          return this.progressLoggerFactory(async () => {
            context.compiled = await this.compiler.compile(context.parsed);
          });
        }
      }
    ]);
  }
}
