import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div role="alert" className="my-4 text-red-600 flex items-center">
    <span className="text-xl font-semibold mr-2">Error:</span>
    <span>{message}</span>
  </div>
);

export default ErrorMessage;
