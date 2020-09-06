# @nodus/parser

## Overview

| STEP | NAME               | DESCRIPTION                                                                                         |
| ---- | ------------       | --------------------------------------------------------------------------------------------------- |
| 1    | Read config        | Find and read the Nodus config as a utf8 string. This may involve searching the cwd and parent dirs |
| 2    | Parse config       | Deserialize the config string, loading POJO representation into memory                              |
| 3    | Plant tree         | Build an skeleton tree of the config using recurssive descent                                       |
| 4    | Syntactic analysis | Visiting each node in the tree, analyze the syntax and build a Nodus AST                            |
| 4.1  | Tokenization       | Deserialize Nodus Syntax tokens for the analyzer to build information rich AST nodes                    |

## Development

### Build

```bash
yarn build
# and
yarn build:watch
```
