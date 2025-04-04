import React from 'react';
import { walk } from '../core/walker';

type ResultDisplayProps = ReturnType<typeof walk>;

const ResultDisplay: React.FC<ResultDisplayProps> = ({ letters, path }) => (
  <div className="my-4">
    <h2 className="text-xl font-semibold mb-2">Result</h2>
    <p className="mb-2">
      <span className="font-bold">Collected Letters:</span> {letters}
    </p>
    <p>
      <span className="font-bold">Path:</span> {path}
    </p>
  </div>
);

export default ResultDisplay;
