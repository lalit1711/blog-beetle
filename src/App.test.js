import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import Login from "./pages/login/LogIn"


test('Checking if SignIn Button Is Rendered When User is not Logged In', () => {
  render(<App />);
  const ButtonText = screen.getByText(/Sign in/i);
  expect(ButtonText).toBeInTheDocument();
});


test('Click SignIn Button To See If Login Screen is rendered & Click Create Account to see Signup Screen is Rendered Properly', async() => {
  render(<App />);
  await act(async()=>{
    const SignInButton = screen.getByText(/Sign in/i);
    fireEvent.click(SignInButton)
    await waitFor(() => screen.getByText('Email')) 
    const linkElement = screen.getByText(/Create an account/i);
    expect(linkElement).toBeInTheDocument();    
  })  
});