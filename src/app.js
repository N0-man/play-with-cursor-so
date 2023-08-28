import React from 'react';

const Header = () => (
    <header className="App-header">
        Hello world
    </header>
);

const TextInput = () => (
    <input type="text" placeholder="Enter text here" />
);

const TooltipButton = () => {
    return (
        <button onMouseOver={(e) => {
            e.currentTarget.setAttribute('title', 'This is a tooltip');
        }}>
            Click me
        </button>
    );
};

const App = () => (
    <div className="App">
        <Header />
        <TextInput />
        <TooltipButton />
    </div>
);

export default App;