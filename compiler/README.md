# @atomus/compiler

## Overview

| STEP | NAME              | DESCRIPTION                                                          |
| ---- | ----------------- | -------------------------------------------------------------------- |
| 1    | Semantic analysis | Decide on actions and implications of provided AST     |
| 2    | Optimization      | Optimize the actions                                     |
| 3    | Generation        | Perform the optimized actions, resulting in generated code |
| 4    | Printing          | Write the generated code to filesystem                               |

## Development

### Build

```bash
yarn build
# and
yarn build:watch
```
