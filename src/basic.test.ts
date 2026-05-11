import { describe, beforeEach, expect, test, vi } from 'vitest'

import { add } from './basic';

describe('example', () => {
  test('sum', () => {
    expect(add(1, 1)).toBe(2);
  });
})
