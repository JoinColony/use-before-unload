# use-before unload

React hook to install a `window.onbeforeunload` handler and control it inside a component.


## Installation

```
npm i use-before-unload
```

## Usage

Just use it in any component that you want to prevent a reload (or tab close) with. You can provide a string or a function as an argument to the hook.

Example:

```js
const ComponentThatControlsUnload = ({ children }: Props) => {
  useBeforeUnload('Really leave?');
  return children;
};
```

Note that the text you provide is [not shown in most modern browsers](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#Browser_compatibility).

When using a function it gets passed the `beforeunload` Event. If you return a truthy value (which can be a string) the page reload will be suppressed:

```js
const ComponentThatControlsUnload = ({ children }: Props) => {
  useBeforeUnload(evt => {
    /* Do some checks here if you like */
    return true; // Suppress reload
  });
  return children;
};
```

## API

```js
useBeforeUnload(value: ((evt: BeforeUnloadEvent) => any) | string)
```

## License

MIT
