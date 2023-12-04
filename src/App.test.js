import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nominate Applicants title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Nominate Applicants/i);
  expect(linkElement).toBeInTheDocument();
});
