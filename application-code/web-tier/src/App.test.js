import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Emraay Cloud Platform', () => {
  render(<App />);
  const heading = screen.getByText(/Emraay Cloud/i);
  expect(heading).toBeInTheDocument();
});
