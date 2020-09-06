# @nodus/nodus

## Contents

| COMPONENT       | DESCRIPTION                             | DOCS                           |
| --------------- | --------------------------------------- | ------------------------------ |
| @nodus/parser   | Parse config files to NodusAST          | [README](./parser/README.md)   |
| @nodus/compiler | Compile NodusAST to target code         | [README](./compiler/README.md) |
| @nodus/cli      | Interface parsing/compiling from shells | [README](./cli/README.md)      |

## Config files

### Nodus Syntax

| FEATURE   | TOKEN | DESCRIPTION                          | EXAMPLE                  |
| --------- | ----- | ------------------------------------ | ------------------------ |
| REFERENCE | ~     | Reference a node in the module scope | ~models.MyModel          |
|           | @     | Reference a node in the global scope | @MyModule.models.MyModel |
|           | []    | Declare a reference is an array      | ~models.MyModel[]        |
| MODELS    | :>    | Specifies a many-to-one relationship | > MyModel                |
|           | :<    | Specifies a one-to-many relationhip  | < MyModel                |
|           | :-    | Specifies a one-to-one relationship  | - MyModel                |

### Vim

Add support for `.nodus` files with `set filetype=nodus.yaml`

## Development

### Build

```bash
yarn build
# and
yarn build:watch
```
