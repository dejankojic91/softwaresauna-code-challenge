import { MapKey } from '../../types/maps.types';

interface MapSelectorProps {
  selected: MapKey;
  onChange: (value: MapKey) => void;
  keys: MapKey[];
  id?: string;
  label?: string;
}

const MapSelector: React.FC<MapSelectorProps> = ({
  selected,
  onChange,
  keys,
  id = 'map-selector',
  label = 'Select Map',
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="font-semibold mr-2">
        {label}:
      </label>
      <select
        id={id}
        aria-label={label}
        value={selected}
        onChange={(e) => onChange(e.target.value as MapKey)}
        className=" w-full sm:w-auto border px-2 py-1 rounded bg-white shadow"
      >
        <option value="" disabled>
          --Select a Map--
        </option>
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
