import { useState } from 'react';
import { maps } from '../data/maps';
import { walk } from '../core/walker';
import { MapKey } from '../types/maps.types';

export const useWalker = (initialMapKey: MapKey) => {
  const [selectedMap, setSelectedMap] = useState<MapKey>(initialMapKey);
  const [result, setResult] = useState<ReturnType<typeof walk> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMapChange = (newMap: MapKey) => {
    setSelectedMap(newMap);
    setResult(null);
    setError(null);
  };

  const handleWalkStart = () => {
    setError(null);
    setResult(null);
    try {
      const result = walk(maps[selectedMap]);
      setResult(result);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return {
    selectedMap,
    handleMapChange,
    handleWalkStart,
    result,
    error,
  };
};
