interface MapPreviewProps {
  mapData: string;
}

const MapPreview: React.FC<MapPreviewProps> = ({ mapData }) => (
  <div className="my-4">
    <h2 className="text-xl font-semibold mb-2">Map Preview</h2>
    <pre className="bg-gray-100 p-4 rounded border border-gray-300 whitespace-pre-wrap">
      {mapData}
    </pre>
  </div>
);

export default MapPreview;
