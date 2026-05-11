# Vitest Notes
While Jest (https://jestjs.io) is the classic go-to unit testing framework for JavaScript/TypeScript, vitest (https://vitest.dev) is looking like it may soon usurp that throne. Apparently it fixes a lot of headaches around mocking.

Vitest can be used without the greater vite framework. Configuration can only be done through "vitest.config.js" (instead of combined with "vite.config.js") if vitest is being used standalone.
https://vitest.dev/guide/#configuring-vitest

## Installation and usage
Installation is straightforward. Just install vitest to the dev dependencies (`npm install -D vitest`).
https://vitest.dev/guide/#adding-vitest-to-your-project

From there, the command `npx vitest run` should work. Create `*.test.(js|ts)` or `*.spec.(js.ts)` files in the same directory as the files they're testing and they should get picked up automatically.

Run `npx vitest run --coverage` to also generate code coverage information.

## Notable configs
### TypeScript non-relative imports
If you're using vitest with a Typescript project configured to handle non-relative imports, you will have to set the following configuration in your "vitest.config.js" or similar.
```
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  }
});
```

This used to require the additional package "vite-tsconfig-paths", but is now included in the base vitest package. Configuration looked like the following.
https://vitest.dev/guide/common-errors.html#cannot-find-module-relative-path
```
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
});
```

### Exclude test files from TypeScript compilation
Specify an `exclude` pattern to have TypeScript compiling skip unit test files (https://www.typescriptlang.org/tsconfig/#exclude). Otherwise, running vitest will run the compiled unit test files as well, unless explicitly ignored. The exclude pattern should also include the `outDir` (usually `dist`) in order to prevent build issues.
```
{
  "exclude": ["dist/**", "**/*.test.ts"],
  "compilerOptions": {
    ...
  }
}
```






















Async/Await

Can handle asynchronous functions easily by marking test functions async.

import { expect, test } from 'vitest'

function fetchUser(id) {

  return Promise.resolve({ id, name: 'Alice' })

}

test('fetches user by id', async () => {

  const user = await fetchUser(1)

  expect(user.name).toBe('Alice')

})

https://vitest.dev/guide/learn/async.html#async-await
