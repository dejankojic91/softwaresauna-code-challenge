import { Direction, Point } from '../types/walker.types';
import {
  isValidPathChar,
  isLetter,
  ALLOWED_CHARS,
  transformMap,
  DIRECTIONS,
  getCharFromGrid,
} from '../utils';

export function walk(map: string | string[][]): {
  letters: string;
  path: string;
} {
  const grid: string[][] = typeof map === 'string' ? transformMap(map) : map;

  let startCount = 0;
  let endCount = 0;
  let startPos: Point | null = null;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const ch = grid[y][x];
      if (!ALLOWED_CHARS.has(ch)) {
        throw new Error(`Invalid character '${ch}'.`);
      }
      if (ch === '@') {
        startCount++;
        startPos = { x, y };
      }
      if (ch === 'x') {
        endCount++;
      }
    }
  }
  if (startCount === 0) {
    throw new Error("Start character '@' not found.");
  }
  if (startCount > 1) {
    throw new Error("Multiple start characters '@' found.");
  }
  if (endCount === 0) {
    throw new Error("End character 'x' not found.");
  }
  if (endCount > 1) {
    throw new Error("Multiple end characters 'x' found.");
  }
  if (!startPos) {
    throw new Error('Could not determine start position.');
  }

  const initialCandidates = DIRECTIONS.filter((d) => {
    const p: Point = { x: startPos!.x + d.dx, y: startPos!.y + d.dy };
    return isValidPathChar(getCharFromGrid(grid, p));
  });

  if (initialCandidates.length === 0) {
    throw new Error("No valid path from start '@'.");
  }
  if (initialCandidates.length > 1) {
    throw new Error("Multiple starting paths from '@'.");
  }

  let currentDir: Direction = initialCandidates[0];
  let currentPos: Point = { ...startPos };
  let pathStr = '';
  let collectedLetters = '';
  const visitedLetterPositions = new Set<string>();

  let steps = 0;
  const MAX_STEPS = 10000;

  while (true) {
    steps++;
    if (steps > MAX_STEPS) {
      throw new Error('Maximum step count exceeded');
    }

    const currentChar = getCharFromGrid(grid, currentPos);
    pathStr += currentChar;

    if (isLetter(currentChar)) {
      const key = `${currentPos.x},${currentPos.y}`;
      if (!visitedLetterPositions.has(key)) {
        collectedLetters += currentChar;
        visitedLetterPositions.add(key);
      }
    }

    if (currentChar === 'x') {
      break;
    }

    const candidateStraight: Point = {
      x: currentPos.x + currentDir.dx,
      y: currentPos.y + currentDir.dy,
    };

    let nextPos: Point;

    if (
      currentChar === '+' ||
      (isLetter(currentChar) &&
        !isValidPathChar(getCharFromGrid(grid, candidateStraight)))
    ) {
      let possibleDirs: Direction[];
      if (currentDir.dx === 0) {
        possibleDirs = DIRECTIONS.filter((d) => d.dy === 0);
      } else if (currentDir.dy === 0) {
        possibleDirs = DIRECTIONS.filter((d) => d.dx === 0);
      } else {
        throw new Error(
          `Unexpected current direction.`,
        );
      }

      const reverse: Point = {
        x: currentPos.x - currentDir.dx,
        y: currentPos.y - currentDir.dy,
      };

      const candidates = possibleDirs.filter((d) => {
        const p: Point = { x: currentPos.x + d.dx, y: currentPos.y + d.dy };
        if (p.x === reverse.x && p.y === reverse.y) return false;
        return isValidPathChar(getCharFromGrid(grid, p));
      });

      if (candidates.length === 0) {
        throw new Error(
          `Broken path, no valid turn found.`,
        );
      }

      if (candidates.length > 1) {
        throw new Error(
          `Fork in path, multiple valid turns found.`,
        );
      }

      currentDir = candidates[0];
      nextPos = {
        x: currentPos.x + currentDir.dx,
        y: currentPos.y + currentDir.dy,
      };

      if (!isValidPathChar(getCharFromGrid(grid, nextPos))) {
        throw new Error(
          `Path leads to an invalid cell after turning.`,
        );
      }
    } else {
      if (!isValidPathChar(getCharFromGrid(grid, candidateStraight))) {
        throw new Error(
          `Broken path.`,
        );
      }
      nextPos = candidateStraight;
    }

    currentPos = nextPos;
  }

  return { letters: collectedLetters, path: pathStr };
}
