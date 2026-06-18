---
title: "TypeScript"
description: "Notes on static typing, generics, and utility types."
lastUpdated: "2026-06-01"
---

## Core Concepts

TypeScript adds a static type system on top of JavaScript. Types are erased at compile time — the output is plain JS.

## Utility Types

### `Partial<T>`

Makes all properties optional:

```ts
interface User { id: number; name: string }
type PartialUser = Partial<User> // { id?: number; name?: string }
```

### `Pick<T, K>` and `Omit<T, K>`

```ts
type UserPreview = Pick<User, 'id' | 'name'>
type UserWithoutId = Omit<User, 'id'>
```

### `Record<K, V>`

```ts
const map: Record<string, number> = { a: 1, b: 2 }
```

## Generics

```ts
function identity<T>(value: T): T {
  return value
}
```

## Type Narrowing

```ts
function process(input: string | number) {
  if (typeof input === 'string') {
    // input is narrowed to string here
    return input.toUpperCase()
  }
  return input * 2
}
```

## `satisfies` operator

Validates a value against a type without widening it:

```ts
const config = {
  port: 3000,
  host: 'localhost',
} satisfies Record<string, string | number>
// config.port is still number, not string | number
```
