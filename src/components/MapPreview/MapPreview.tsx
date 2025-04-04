interface MapPreviewProps {
  content: string;
  status?: 'success' | 'error' | 'default';
}

const MapPreview: React.FC<MapPreviewProps> = ({
  content,
  status = 'default',
}) => {
  const borderColor =
    status === 'success'
      ? 'border-green-500'
      : status === 'error'
        ? 'border-red-500'
        : 'border-gray-300';

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">Map Preview</h2>
      <pre
        aria-live="polite"
        className={`bg-gray-100 p-4 rounded border-2 whitespace-pre-wrap ${borderColor}`}
      >
        {content}
      </pre>
    </div>
  );
};

export default MapPreview;
