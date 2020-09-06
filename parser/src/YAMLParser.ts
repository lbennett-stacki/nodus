import { promisify } from "util";
import { readFile } from "fs";
import { safeLoad } from "js-yaml";

export type YAMLValue = string | number | undefined | YAMLTree | YAMLValue[];

export interface YAMLTree {
  [key: string]: YAMLValue;
}

export class YAMLParser {
  read(path: string): Promise<string> {
    return promisify(readFile)(path, "utf-8");
  }

  parse(path: string): Promise<YAMLTree> {
    return this.read(path).then(content => safeLoad(content) as YAMLTree);
  }

  static parse(path: string): Promise<YAMLTree> {
    const parser = new YAMLParser();
    return parser.parse(path);
  }
}
