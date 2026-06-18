---
title: "React"
description: "Hooks, patterns, and performance notes."
lastUpdated: "2026-05-20"
---

## Hooks

### `useState`

```tsx
const [count, setCount] = useState(0)
// functional update for derived state
setCount(prev => prev + 1)
```

### `useEffect`

Runs after render. The cleanup function runs before the next effect and on unmount.

```tsx
useEffect(() => {
  const id = setInterval(() => tick(), 1000)
  return () => clearInterval(id)
}, []) // empty array = run once on mount
```

### `useCallback` / `useMemo`

Memoize functions and computed values. Only add when profiling shows a real performance problem — they add cognitive overhead.

```tsx
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

const sorted = useMemo(() => [...items].sort(), [items])
```

### `useRef`

Holds a mutable value that doesn't trigger re-renders:

```tsx
const inputRef = useRef<HTMLInputElement>(null)
// focus without re-rendering
inputRef.current?.focus()
```

## Patterns

### Lifting State Up

When two sibling components need to share state, lift it to their closest common ancestor and pass it down as props.

### Composition over Configuration

Prefer `children` or render props over a growing list of boolean flags:

```tsx
// prefer this
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>

// over this
<Card title="Title" body="Content" hasHeader showBorder />
```
