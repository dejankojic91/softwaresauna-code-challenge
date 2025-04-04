import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="my-4 text-red-600 flex items-center">
    <span className="text-xl font-semibold mr-2">Error:</span>
    <span>{message}</span>
  </div>
);

export default ErrorDisplay;
