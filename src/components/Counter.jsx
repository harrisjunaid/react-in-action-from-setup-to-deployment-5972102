import { useEffect, useState } from "react";
const pageTitle = document.title;

function Counter() {
  const [count, setCount] = useState(0);
  /**
   This React code snippet uses the `useEffect` hook to conditionally update the browser tab's title based on the value of `count`. Here's a breakdown of how it works:

The `useEffect` hook is a built-in React function that allows you to perform side effects in function components—such as interacting with the DOM, fetching data, or setting up subscriptions. In this case, the side effect is updating `document.title`, which controls the text shown in the browser tab.

Inside the `useEffect`, there's a short-circuit conditional expression: `count && (document.title = \`${pageTitle}--${count}\`)`. This means that the assignment to `document.title` will only happen if `count` is truthy (i.e., not `0`, `null`, `undefined`, `false`, or an empty string). If `count` is falsy, the expression evaluates to false and nothing happens.

The new title is constructed using a template literal: it combines the value of `pageTitle` with `count`, separated by `--`. For example, if `pageTitle` is `"Dashboard"` and `count` is `3`, the resulting title would be `"Dashboard--3"`.

One thing to note is that this `useEffect` does not include a dependency array. That means it will run after every render, regardless of whether `count` or `pageTitle` has changed. To optimize performance and avoid unnecessary updates, you could add `[count, pageTitle]` as dependencies so the effect only runs when either of those values changes.

Here’s a clean and optimized refactor of your `useEffect` snippet:

```jsx
useEffect(() => {
  if (count) {
    document.title = `${pageTitle}--${count}`;
  }
}, [count, pageTitle]);
```

### 🔍 What’s improved:
- **Clarity**: Replaced the short-circuit expression with an explicit `if` statement for better readability.
- **Efficiency**: Added a dependency array `[count, pageTitle]` so the effect only runs when either value changes, avoiding unnecessary updates on every render.

Let me know if you want to debounce the title update or make it conditional on other state values too.

   */
  useEffect(() => {
    count && (document.title = `${pageTitle}--${count}`);
  })

  return (
    <button onClick={() => setCount(count + 1)}
    >Click Me { count === 0 ? ``:`${count} times` }</button>
  )
}

export default Counter;