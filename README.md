# next-minimal-state

Ultra-lightweight state management library for React and Next.js applications. Designed to be simple, performant, and TypeScript-friendly.

## Features

- 🪶 Lightweight and minimal
- 🔄 Simple and intuitive API
- ⚡ High performance with minimal re-renders
- 📦 TypeScript support out of the box
- 🔧 Zero configuration
- 🎯 Perfect for small to medium-sized applications
- ⚛️ Built for React and Next.js

## Installation

```bash
npm install next-minimal-state
# or
yarn add next-minimal-state
# or
pnpm add next-minimal-state
```

## Usage

### Basic Example

```typescript
import { createMinimalStore } from 'next-minimal-state';

// Create a store with initial state
const counterStore = createMinimalStore({ count: 0 });

// Use in your components
function Counter() {
  const count = counterStore.useStore(state => state.count);
  
  const increment = () => {
    counterStore.store.setState(state => ({ count: state.count + 1 }));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### With TypeScript

```typescript
interface TodoState {
  todos: string[];
  addTodo: (todo: string) => void;
}

const todoStore = createMinimalStore<TodoState>({
  todos: [],
  addTodo: (todo) => {
    todoStore.store.setState(state => ({
      todos: [...state.todos, todo]
    }));
  }
});

function TodoList() {
  const { todos, addTodo } = todoStore.useStore();
  
  return (
    <div>
      <button onClick={() => addTodo("New Todo")}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Selector Usage

```typescript
interface UserState {
  user: {
    name: string;
    email: string;
    preferences: {
      theme: 'light' | 'dark';
    };
  };
}

const userStore = createMinimalStore<UserState>({
  user: {
    name: 'John',
    email: 'john@example.com',
    preferences: {
      theme: 'light'
    }
  }
});

function ThemeDisplay() {
  // Only re-renders when theme changes
  const theme = userStore.useStore(state => state.user.preferences.theme);
  
  return <div>Current theme: {theme}</div>;
}
```

## API Reference

### `createMinimalStore<T>(initialState: T)`

Creates a new store with the given initial state.

Returns an object with:
- `store`: The store instance
- `useStore`: React hook to access the store state

### Store Methods

- `getState()`: Get the current state
- `setState(partial | updater)`: Update the state
- `subscribe(listener)`: Subscribe to state changes
- `destroy()`: Clean up the store

### `useStore` Hook

```typescript
const value = store.useStore();
// or with selector
const selectedValue = store.useStore(state => state.someValue);
```

## License

MIT