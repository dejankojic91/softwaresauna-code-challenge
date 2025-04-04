import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders initial UI elements', () => {
    render(<App />);
    expect(screen.getByText(/Path Traversal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Map:/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Start Walk/i }),
    ).toBeInTheDocument();
  });

  it('displays result or error after clicking Start Walk', async () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /Start Walk/i });
    fireEvent.click(startButton);

    await waitFor(() => {
      const resultText = screen.queryByText(/Collected Letters:/i);
      const errorText = screen.queryByText(/Error/i);
      expect(resultText || errorText).toBeInTheDocument();
    });
  });
});
