import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SOLO by Legalight app', () => {
  render(<App />);
  const titleElement = screen.getByText(/SOLO by Legalight/i);
  expect(titleElement).toBeInTheDocument();
});
