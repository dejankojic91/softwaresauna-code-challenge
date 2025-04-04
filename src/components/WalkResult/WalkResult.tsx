import React from 'react';
import { walk } from '../../core/walker';

type WalkResultProps = ReturnType<typeof walk>;

const WalkResult: React.FC<WalkResultProps> = ({ letters, path }) => (
  <div className="my-4">
    <h2 className="text-xl font-semibold mb-2">Result</h2>
    <p className="mb-2">
      <span className="font-bold">Collected Letters:</span>{' '}
      <code className="bg-gray-100 px-1 rounded">{letters}</code>
    </p>
    <p>
      <span className="font-bold">Path:</span>{' '}
      <code className="bg-gray-100 px-1 rounded">{path}</code>
    </p>
  </div>
);

export default WalkResult;
