## Playing with Cursor.so

Install from [Cursor.so](https://www.cursor.so/)
- Highlight code. Hit Cmd+K to prompt edit
- Highlight code and hit Cmd+Shift+L to focus the AI on particular piece of code

### Install
```
yarn install
```
### Test
```
yarn test
```
### Run
```
yarn run
```

## Impressions
- Generating code via IDE prompt or AI Chat is super simple. Though there are inconsistencies on how the code is generated between the two but the AI learns pretty well based on your acceptance or rejections, your re-attempts and refactor.
- Generating the test in the IDE using Cmd+K spits out the test in the same file
- Providing command such as `generate test in seperate file` replaces/overrides the code with commented test in the same file. Test generation is better on AI chat to first review and copy over. 
- Refactoring for moving components into a separate file doesnt seem to work.
- The first attempt for test generated for App asserting if the compenent is getting render - it needed additional input to generate more elaborative tests
- The first attempt to write more elaborative test resulted into testing individual components such as `Header`, `TextInput` and `TooltipButton` as if all these components are an export - it needed an explicit instruction to test the behaviour using `App` component
- The output test did not had all the required imports e.g. `expect(...).toBeInTheDocument is not a function` ERROR - had to explicitly include jest-dom
- The test prefered using fireEvent over more recomended approach of userEvent. Needed an explicit command to refactor.


**Overall a decent React developer should be able to leverage this along with IDE shortcuts and react knowledge to be more effective**

<br >
<hr >

*Note*: Eryting inside callout is command to AI and `this is user action`
> command to AI

**Base Hello World Program that came as sample after installing Cursor**

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <div className="App">
    <header className="App-header">
      Hello world
    </header>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
`select App component and press Cmd+K`
> add a texbox and a button with tooltip component

```javascript
const App = () => (
  <div className="App">
    <header className="App-header">
      Hello world
    </header>
    <input type="text" placeholder="Enter text here" />
    <button data-tooltip="This is a tooltip">
      Click me
    </button>
  </div>
)
```

`select App component and press Cmd+Shift+L to start AI Chat`

> refactor code

Sure, I can refactor your code to make it more modular. Here's a version where each part of the app is broken down into its own component:

```javascript
const Header = () => (
  <header className="App-header">
    Hello world
  </header>
);

const TextInput = () => (
  <input type="text" placeholder="Enter text here" />
);

const TooltipButton = () => (
  <button data-tooltip="This is a tooltip">Click me</button>
);

const App = () => (
  <div className="App">
    <Header />
    <TextInput />
    <TooltipButton />
  </div>
);
```

In this refactored version, the Header, TextInput, and TooltipButton are all separate functional components. This makes the code easier to read and maintain, and it also makes it easier to reuse these components elsewhere in your app if needed.

`I had to manually copy the code into app.js`

`select TooltipButton code in IDE - press Cmd+K`
> show tooltip when mouse hover

```javascript
const TooltipButton = () => {
  return (
    <button onMouseOver={(e) => {
      e.currentTarget.setAttribute('title', 'This is a tooltip');
    }}>
      Click me
    </button>
  );
};
```

`press Cmd+Shift+L after selecting below code to start AI Chat`

```javascript
const App = () => (
  <div className="App">
    <Header />
    <TextInput />
    <TooltipButton />
  </div>
);
```

>write testing using react testing library

Sure, here's how you can write tests for the App component using React Testing Library. This test will check if the header "Hello world", the text input, and the button "Click me" are rendered correctly.

```javascript
import { render, screen } from '@testing-library/react';
import App from './index.js';

test('renders header, text input, and button', () => {
  render(<App />);
  
  const headerElement = screen.getByText(/Hello world/i);
  expect(headerElement).toBeInTheDocument();
  
  const inputElement = screen.getByPlaceholderText(/Enter text here/i);
  expect(inputElement).toBeInTheDocument();
  
  const buttonElement = screen.getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();
});
```

This test uses the `render` function from React Testing Library to render the `App` component. Then it uses the `getByText` and `getByPlaceholderText` functions to find the elements with the text "Hello world", the placeholder "Enter text here", and the text "Click me". Finally, it uses Jest's expect function to assert that these elements are in the document.

> what other tests can be written

Given the current structure of your components, here are some additional tests you could write using React Testing Library:  
  
1. **Test if the tooltip appears on mouse over**: You can simulate a mouse over event on the TooltipButton and check if the tooltip text appears.

```javascript
import { render, fireEvent } from '@testing-library/react';
import TooltipButton from './TooltipButton';

test('shows tooltip on mouse over', () => {
  const { getByText } = render(<TooltipButton />);
  const button = getByText(/Click me/i);
  fireEvent.mouseOver(button);
  expect(button.getAttribute('title')).toBe('This is a tooltip');
});
```

2. **Test if the text input accepts input**: You can simulate user typing in the TextInput component and check if the input value changes.

```javascript
import { render, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

test('accepts input', () => {
  const { getByPlaceholderText } = render(<TextInput />);
  const input = getByPlaceholderText(/Enter text here/i);
  fireEvent.change(input, { target: { value: 'Test input' } });
  expect(input.value).toBe('Test input');
});
```

3. **Test if the header renders the correct text**: You can check if the Header component renders the correct text.

```javascript
import { render } from '@testing-library/react';
import Header from './Header';

test('renders correct text', () => {
  const { getByText } = render(<Header />);
  const header = getByText(/Hello world/i);
  expect(header).toBeInTheDocument();
});
```

Remember to import each component from its respective file in the actual tests.

> can you write these testing using userEvent instead of fireEvent

Sure, `userEvent` is generally recommended over `fireEvent` as it provides a more realistic simulation of user interactions. userEvent is a library built on top of fireEvent that provides more advanced simulation of browser interactions. Here's how you can rewrite the tests using userEvent:

1. **Test if the tooltip appears on mouse over:**
```javascript
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TooltipButton from './TooltipButton';

test('shows tooltip on mouse over', () => {
  const { getByText } = render(<TooltipButton />);
  const button = getByText(/Click me/i);
  userEvent.hover(button);
  expect(button.getAttribute('title')).toBe('This is a tooltip');
});
```

2. **Test if the text input accepts input:**
```javascript
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './TextInput';

test('accepts input', () => {
  const { getByPlaceholderText } = render(<TextInput />);
  const input = getByPlaceholderText(/Enter text here/i);
  userEvent.type(input, 'Test input');
  expect(input.value).toBe('Test input');
});
```

3. **Test if the header renders the correct text**:
```javascript
import { render } from '@testing-library/react';
import Header from './Header';

test('renders correct text', () => {
  const { getByText } = render(<Header />);
  const header = getByText(/Hello world/i);
  expect(header).toBeInTheDocument();
});
```

Remember to install @testing-library/user-event if you haven't already, using the command npm install --save @testing-library/user-event.

> can you write all the testing using App

Sure, here's how you can write tests for the `App` component using React Testing Library and `userEvent`. These tests will check if the header "Hello world", the text input, and the button "Click me" are rendered correctly, and also if the tooltip appears on mouse over and the text input accepts input.

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './index.js';

test('renders header, text input, and button', () => {
  render(<App />);
  
  const headerElement = screen.getByText(/Hello world/i);
  expect(headerElement).toBeInTheDocument();
  
  const inputElement = screen.getByPlaceholderText(/Enter text here/i);
  expect(inputElement).toBeInTheDocument();
  
  const buttonElement = screen.getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('shows tooltip on mouse over', () => {
  render(<App />);
  const button = screen.getByText(/Click me/i);
  userEvent.hover(button);
  expect(button.getAttribute('title')).toBe('This is a tooltip');
});

test('accepts input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Enter text here/i);
  userEvent.type(input, 'Test input');
  expect(input.value).toBe('Test input');
});
```

These tests use the render function from React Testing Library to render the App component. Then they use the getByText and getByPlaceholderText functions to find the elements with the text "Hello world", the placeholder "Enter text here", and the text "Click me". The userEvent.hover and userEvent.type functions are used to simulate user interactions. Finally, Jest's expect function is used to assert that these elements are in the document, the tooltip appears, and the input value changes.
