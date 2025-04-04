import { maps } from './data/maps';
import { MapKey } from './types/maps.types';
import ErrorDisplay from './components/ErrorMessage/ErrorMessage';
import MapSelector from './components/MapSelector/MapSelector';
import WalkResult from './components/WalkResult/WalkResult';
import MapPreview from './components/MapPreview/MapPreview';
import { useWalker } from './hooks/useWalker';

const mapKeys = Object.keys(maps) as MapKey[];
const initialMapKey = mapKeys[0];

const WalkerApp = () => {
  const { selectedMap, handleMapChange, handleWalkStart, result, error } =
    useWalker(initialMapKey);

  return (
    <div className="p-5 font-sans max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Map Path Traversal</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
        <MapSelector
          selected={selectedMap}
          onChange={handleMapChange}
          keys={mapKeys}
        />
        <button
          onClick={handleWalkStart}
          className="px-4 py-1 text-lg mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Walk
        </button>
      </div>

      <MapPreview
        key={selectedMap}
        content={maps[selectedMap]}
        status={result ? 'success' : error ? 'error' : 'default'}
      />

      {result && <WalkResult letters={result.letters} path={result.path} />}
      {error && <ErrorDisplay message={error} />}
    </div>
  );
};

export default WalkerApp;
