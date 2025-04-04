import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorDisplay from './ErrorDisplay';

describe('ErrorDisplay Component', () => {
  it('renders the error message', () => {
    const errorMessage = 'Something went wrong.';
    render(<ErrorDisplay message={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();

    const labelElement = screen.getByText(/Error:/i);
    expect(labelElement).toBeInTheDocument();
  });
});
