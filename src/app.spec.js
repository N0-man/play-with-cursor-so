import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import App from './app.js';

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