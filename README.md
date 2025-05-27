# PNPM Prune + Link issue example

This repo describes an issue where a "link:" dependency is not properly handled after using "deploy --legacy". This issue represents how Prisma wants you to use it when using its new [Driver adapters and custom output paths](https://www.prisma.io/docs/orm/overview/databases/database-drivers#driver-adapters-and-custom-output-paths).

[pnpm/pnpm issue 9575](https://github.com/pnpm/pnpm/issues/9575)

## Project structure:
- "a" and "b" exist in the workspace.
- "c" is located in "a", but not in the workspace.
- "c" is linked to "a" via "link:./c", and used in "a".
- "b" has "a" as a dependency, and should be able to call its exported function.

## How to use
```sh
pnpm --filter b deploy --legacy ./pruned
node ./pruned/main.mjs
```

## Error
```sh
node:internal/modules/esm/resolve:857
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'c' imported from /Users/me/pnpm-prune-link-example/pruned/node_modules/.pnpm/a@file+a/node_modules/a/index.mjs
    at packageResolve (node:internal/modules/esm/resolve:857:9)
    at moduleResolve (node:internal/modules/esm/resolve:926:18)
    at defaultResolve (node:internal/modules/esm/resolve:1056:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:654:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:603:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:586:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:242:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:135:49) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v22.12.0
```
