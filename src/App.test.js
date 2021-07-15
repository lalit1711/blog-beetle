import { render, screen ,fireEvent} from '@testing-library/react';
import App from './App';
import Login from "./pages/login/LogIn"
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sign in/i);
  fireEvent.click(linkElement)
  expect(linkElement).toBeInTheDocument();
});



test('should show login form', () => {
  render(<Login />)
  const input = screen.getByLabelText('Email')
  // Events and assertions...
})