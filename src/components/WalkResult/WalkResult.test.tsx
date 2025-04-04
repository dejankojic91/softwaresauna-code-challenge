import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WalkResult from './WalkResult';

describe('WalkResult Component', () => {
  it('renders collected letters and path correctly', () => {
    const letters = 'ABC';
    const path = '@---A---+|---B-x';
    render(<WalkResult letters={letters} path={path} />);

    expect(screen.getByText(/Collected Letters:/i)).toBeInTheDocument();
    expect(screen.getByText(letters)).toBeInTheDocument();
    expect(screen.getByText(/Path:/i)).toBeInTheDocument();
    expect(screen.getByText(path)).toBeInTheDocument();
  });
});
