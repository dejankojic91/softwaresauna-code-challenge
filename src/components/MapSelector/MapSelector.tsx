import { MapKey } from "../../types/maps.types";


interface MapSelectorProps {
  selected: MapKey;
  onChange: (value: MapKey) => void;
  keys: MapKey[];
}
const selectId = 'map-selector';
const MapSelector: React.FC<MapSelectorProps> = ({
  selected,
  onChange,
  keys,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={selectId} className="font-semibold mr-2">
        Select Map:
      </label>
      <select
        id={selectId}
        value={selected}
        onChange={(e) => onChange(e.target.value as MapKey)}
        className="border px-2 py-1 rounded bg-white shadow"
      >
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MapSelector;
