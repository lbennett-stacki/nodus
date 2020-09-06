export enum EXTENSIONS {
  NODUS = ".nodus",
  YAML = ".yaml",
}

export const EXTENSION_REGEX = new RegExp(
  `(${Object.values(EXTENSIONS).join("|").replace(/\./g, "\\.")})$`);

export class ConfigFinder {
  resolve(path?: string): string {
    let resolved = path || process.cwd();

    if (!EXTENSION_REGEX.test(path)) {
      // find
    }

    return resolved;
  }
}
