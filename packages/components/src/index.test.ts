import { describe, expect, it } from 'bun:test'

import { ping } from '.'

describe('ping', () => {
  it('returns "pong"', () => {
    expect(ping()).toBe('pong')
  })
})
