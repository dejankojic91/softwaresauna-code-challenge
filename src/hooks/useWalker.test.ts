import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWalker } from './useWalker';
import { maps } from '../data/maps';

const validMapKey = Object.keys(maps)[0] as keyof typeof maps;

describe('useWalker', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useWalker(validMapKey));

    expect(result.current.selectedMap).toBe(validMapKey);
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('updates selected map and resets state', () => {
    const { result } = renderHook(() => useWalker(validMapKey));
    const anotherKey = Object.keys(maps)[1] as keyof typeof maps;

    act(() => {
      result.current.handleMapChange(anotherKey);
    });

    expect(result.current.selectedMap).toBe(anotherKey);
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('computes walk result correctly', () => {
    const { result } = renderHook(() => useWalker(validMapKey));

    act(() => {
      result.current.handleWalkStart();
    });

    expect(result.current.result).not.toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('handles walk errors gracefully with mock', async () => {
    vi.resetModules();
    vi.doMock('../data/maps', () => {
      const brokenMap = ['invalid-map-data'] as any;
      return {
        maps: {
          broken: brokenMap,
        },
      };
    });

    const { useWalker: useWalkerMocked } = await import('./useWalker');
    const { result } = renderHook(() => useWalkerMocked('broken' as any));

    act(() => {
      result.current.handleWalkStart();
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeDefined();
  });
});
