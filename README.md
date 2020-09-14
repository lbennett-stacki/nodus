# @atomus/atomus

## Contents

| COMPONENT        | DESCRIPTION                             | DOCS                                    |
| ---------------  | --------------------------------------- | --------------------------------------- |
| @atomus/parser   | Parse config files to AtomusAST         | [README](./packages/parser/README.md)   |
| @atomus/compiler | Compile AtomusAST to target code        | [README](./packages/compiler/README.md) |
| @atomus/cli      | Interface parsing/compiling from shells | [README](./packages/cli/README.md)      |
| @atomus/web-ui   | Web interface built with ThreeJS        | [README](./packages/web-ui/README.md)   |

## Config files

### Atomus Syntax

| FEATURE   | TOKEN | DESCRIPTION                          | EXAMPLE                  |
| --------- | ----- | ------------------------------------ | ------------------------ |
| REFERENCE | ~     | Reference a node in the module scope | ~models.MyModel          |
|           | @     | Reference a node in the global scope | @MyModule.models.MyModel |
|           | []    | Declare a reference is an array      | ~models.MyModel[]        |
| MODELS    | :>    | Specifies a many-to-one relationship | > MyModel                |
|           | :<    | Specifies a one-to-many relationhip  | < MyModel                |
|           | :-    | Specifies a one-to-one relationship  | - MyModel                |

### Vim

Add support for `.atomus` files with `set filetype=atomus.yaml`

## Development

### Build

```bash
yarn build
# and
yarn build:watch
```
