import { useState } from 'react';
import { maps } from './data/maps';
import { MapKey } from './types/maps.types';
import { walk } from './core/walker';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
import MapSelector from './components/MapSelector/MapSelector';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';
import MapPreview from './components/MapPreview/MapPreview';

const mapKeys: MapKey[] = Object.keys(maps) as MapKey[];
const initialMapKey = Object.keys(maps)[0] as MapKey;

const App = () => {
  const [selectedMap, setSelectedMap] = useState<MapKey>(initialMapKey);
  const [result, setResult] = useState<ReturnType<typeof walk> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMapChange = (newMap: MapKey) => {
    setSelectedMap(newMap);
    setResult(null);
    setError(null);
  };

  const handleStart = () => {
    setError(null);
    setResult(null);
    try {
      const result = walk(maps[selectedMap]);
      setResult(result);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="p-5 font-sans max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Map Path Traversal</h1>
      <div className="flex items-center gap-4 mb-4">
        <MapSelector
          selected={selectedMap}
          onChange={handleMapChange}
          keys={mapKeys}
        />
        <button
          onClick={handleStart}
          className="px-4 py-1 text-lg mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Walk
        </button>
      </div>

      <MapPreview
        mapData={maps[selectedMap]}
        status={result ? 'success' : error ? 'error' : 'default'}
      />

      {result && <ResultDisplay letters={result.letters} path={result.path} />}
      {error && <ErrorDisplay message={error} />}
    </div>
  );
};

export default App;
