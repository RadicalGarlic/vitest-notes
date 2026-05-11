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
If you're using vitest with a Typescript project that uses a custom baseUrl setting, you will have to set the following configuration in your "vitest.config.js" or similar.
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
Specify an `exclude` pattern to have TypeScript compiling skip unit test files (https://www.typescriptlang.org/tsconfig/#exclude). Otherwise, running vitest will run the compiled unit test files as well, unless explicitly ignored. The exclude pattern should also include the `outDir` (usually `dist`) in order to build.
```
{
  "exclude": ["dist/**", "**/*.test.ts"],
  "compilerOptions": {
    ...
  }
}
```





















Example vitest test

import { expect, test } from 'vitest'

import { sum } from './math';

test('add 1 and 2', () => {

  expect(sum(1, 2)).toBe(3);

}
File system mocking

https://vitest.dev/guide/mocking/file-system

Install the memfs package to use an in-memory file system instead of the actual one and then set up a "__mocks__" directory at the root of the project that'll have vitest use memfs whenever it uses any of the Node file system calls.

__mocks__/

fs.cjs

// we can also use `import`, but then

// every export should be explicitly defined

const { fs } = require('memfs')

module.exports = fs

fs/

promises.cjs

// we can also use `import`, but then

// every export should be explicitly defined

const { fs } = require('memfs')

module.exports = fs.promises



Tests should look like the following.

import { beforeEach, expect, test, vi } from 'vitest'

vi.mock('node:fs');

vi.mock('node:fs/promises');

import { fs, vol } from 'memfs'

import { filePathExists } from './files';

beforeEach(() => {

  // reset the state of in-memory fs

  vol.reset()

});

test('filePathExists does not exist', async () => {

  // Using files at / as memfs starts without any subdirs

  const filename = '/not_found';

  await fs.promises.rm(filename, { force: true });

  expect(await filePathExists(filename)).toBe(false);

});

test('filePathExists does not exist', async () => {

  // Using files at / as memfs starts without any subdirs

  const filename = '/file';

  await fs.promises.writeFile(filename, '');

  expect(await filePathExists(filename)).toBe(true);

});

The "__mocks__" directory only gets utilized once "vi.mock()" is called with the appropriate arg.

https://vitest.dev/api/vi.html#mock-modules
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
