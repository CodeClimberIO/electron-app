/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { forOwn, isPlainObject, snakeCase, camelCase } from '../helpers.util'

describe('forOwn', () => {
  it('should iterate over own enumerable properties', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result: [string, number][] = []

    forOwn(obj, (value, key) => {
      result.push([key, value])
    })

    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ])
  })

  it('should handle empty objects', () => {
    const obj = {}
    let count = 0

    forOwn(obj, () => {
      count++
    })

    expect(count).toBe(0)
  })
})

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject({ a: 1 })).toBe(true)
    expect(isPlainObject(Object.create(null))).toBe(true)
  })

  it('should return false for non-plain objects', () => {
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject(123)).toBe(false)
    expect(isPlainObject('string')).toBe(false)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
  })
})

describe('snakeCase', () => {
  it('should convert strings to snake case', () => {
    expect(snakeCase('hello world')).toBe('hello_world')
    expect(snakeCase('helloWorld')).toBe('hello_world')
    expect(snakeCase('HelloWorld')).toBe('hello_world')
    expect(snakeCase('hello-world')).toBe('hello_world')
  })

  it('should handle non-string inputs', () => {
    expect(snakeCase(null as any)).toBe('')
    expect(snakeCase(123 as any)).toBe('')
  })
})

describe('camelCase', () => {
  it('should convert strings to camel case', () => {
    expect(camelCase('hello world')).toBe('helloWorld')
    expect(camelCase('hello-world')).toBe('helloWorld')
    expect(camelCase('hello_world')).toBe('helloWorld')
    expect(camelCase('Hello World')).toBe('helloWorld')
    expect(camelCase('HELLO WORLD')).toBe('helloWorld')
  })

  it('should handle non-string inputs', () => {
    expect(camelCase(null as any)).toBe('')
    expect(camelCase(123 as any)).toBe('')
  })
})
