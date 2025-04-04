import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MapKey } from '../../types/maps.types';
import MapSelector from './MapSelector';

describe('MapSelector Component', () => {
  it('renders options and triggers onChange', () => {
    const dummyMaps = {
      Basic: 'dummy',
      'Go straight': 'dummy',
    };
    const keys = Object.keys(dummyMaps) as MapKey[];

    const handleChange = vi.fn();
    render(
      <MapSelector selected={keys[0]} onChange={handleChange} keys={keys} />,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'Basic' } });
    expect(handleChange).toHaveBeenCalledWith('Basic');
  });
});
