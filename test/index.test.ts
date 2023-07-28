import { describe, expect, it } from 'vitest'

import { isDisposable } from '../src/index'

describe('disposable-email', () => {
  it('should work', () => {
    expect(isDisposable('internetkeno.com')).toBe(true)
    expect(isDisposable('INTERNetkeno.com')).toBe(true)

    expect(isDisposable('mail@internetkeno.com')).toBe(true)
    expect(isDisposable('mail@INTERNetkeno.com')).toBe(true)

    expect(isDisposable('tcwlm.com')).toBe(true)

    expect(isDisposable('window.dataLayer')).toBe(true)
    expect(isDisposable('navigator.userAgent')).toBe(true)
  })
})
