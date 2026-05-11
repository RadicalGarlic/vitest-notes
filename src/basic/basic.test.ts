import { describe, beforeEach, expect, test, vi } from 'vitest'

import { add } from '#this/basic/basic.js';

describe('example', () => {
  test('sum', () => {
    expect(add(1, 1)).toBe(2);
  });
})
