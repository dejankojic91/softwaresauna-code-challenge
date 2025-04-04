import { Direction, Point } from '../types/walker.types';

export const ALLOWED_CHARS = new Set<string>([
  ' ',
  '@',
  'x',
  '-',
  '|',
  '+',
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
]);

export function isValidPathChar(ch: string): boolean {
  return ch !== ' ' && ALLOWED_CHARS.has(ch);
}

export function isLetter(ch: string): boolean {
  return /^[A-Z]$/.test(ch);
}

export const transformMap = (flatMap: string): string[][] => {
  const lines = flatMap.split(/\r?\n/);

  if (lines[0].trim() === '') {
    lines.shift();
  }
  if (lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  const numCols = Math.max(...lines.map((line) => line.length));
  return lines.map((line) => line.padEnd(numCols, ' ').split(''));
};

export const DIRECTIONS: Direction[] = [
  { name: 'up', dx: 0, dy: -1 },
  { name: 'down', dx: 0, dy: 1 },
  { name: 'left', dx: -1, dy: 0 },
  { name: 'right', dx: 1, dy: 0 },
];

export function getCharFromGrid(grid: string[][], p: Point): string {
  if (p.y < 0 || p.y >= grid.length) return ' ';
  if (p.x < 0 || p.x >= grid[p.y].length) return ' ';
  return grid[p.y][p.x];
}
