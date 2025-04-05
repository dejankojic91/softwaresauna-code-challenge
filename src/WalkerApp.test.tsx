import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock the maps before importing componenet
vi.mock('./data/maps', () => ({
  maps: {
    'Test Map': '@--A--B--C--x',
    'Broken Map': 'x-B-@-A-x',
  },
}));
import WalkerApp from './WalkerApp';

describe('WalkerApp Component', () => {
  it('renders initial UI elements', () => {
    render(<WalkerApp />);

    expect(screen.getByText(/Path Traversal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Map:/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Start Walk/i }),
    ).toBeInTheDocument();
  });

  it('shows collected letters when the walk is successful', async () => {
    render(<WalkerApp />);

    const mapSelect = screen.getByLabelText(/Select Map:/i);
    fireEvent.change(mapSelect, { target: { value: 'Test Map' } });

    const startButton = screen.getByRole('button', { name: /Start Walk/i });
    fireEvent.click(startButton);

    const result = await screen.findByTestId('result');
    expect(result).toHaveTextContent(/Collected Letters:.*ABC/i);
  });

  it('shows error message if the walk fails', async () => {
    render(<WalkerApp />);

    const mapSelect = screen.getByLabelText(/Select Map:/i);
    fireEvent.change(mapSelect, { target: { value: 'Broken Map' } });

    const startButton = screen.getByRole('button', { name: /Start Walk/i });
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});
