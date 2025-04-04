import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MapPreview from './MapPreview';

describe('MapPreview Component', () => {
  it('displays the provided map data', () => {
    const mapData = `
      @---A---+
              |
      x-B-+   C
          |   |
          +---+
    `;
    render(<MapPreview mapData={mapData} />);

    const previewElement = screen.getByText(/@---A---\+/);
    expect(previewElement).toBeInTheDocument();
  });
});
