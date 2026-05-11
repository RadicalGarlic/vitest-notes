// https://vitest.dev/guide/mocking/file-system
import { beforeEach, describe, test, expect, vi } from "vitest";

// Install the memfs package to use an in-memory file system instead of the actual one and then set up a "__mocks__" directory at the root of the project that'll have vitest use memfs whenever it uses any of the Node file system calls.
import { fs, vol } from 'memfs'

import { getFileLen } from "./file-system-util.js";

// vi.mock() calls get hoisted (https://vitest.dev/api/vi.html#vi-mock)
vi.mock('node:fs');
vi.mock('node:fs/promises');

beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset()
});

describe('getFileLen', () => {
  test('missing file', () => {
    expect(getFileLen('filePath')).rejects.toThrow();
  });

  test('empty file', async () => {
    // Must specify file at / (memfs starts without any subdirs and '.' doesn't exist)
    const TEST_FILE_PATH = '/testFile'
    await fs.promises.writeFile(TEST_FILE_PATH, '');
    expect(getFileLen(TEST_FILE_PATH)).resolves.toEqual(0);
  });

  test('non-empty file', async () => {
    // Must specify file at / (memfs starts without any subdirs and '.' doesn't exist)
    const TEST_FILE_PATH = '/testFile'
    await fs.promises.writeFile(TEST_FILE_PATH, '1234');
    expect(getFileLen(TEST_FILE_PATH)).resolves.toEqual(4);
  });
});
