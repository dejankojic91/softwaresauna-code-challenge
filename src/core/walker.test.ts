// import { describe, it, expect } from 'vitest';
// import { walk } from '../core/walker';
// import { maps, validMaps } from '../data/maps';
// import { MapKey } from '../types/maps.types';

// describe('walk()', () => {
//   it('returns expected letters and path for "Basic"', () => {
//       const mapData = Object.keys(validMaps)[0] as MapKey;
//       const result = walk(maps[mapData]);

//     expect(result.letters).toBe('ACB');
//     expect(result.path).toBe('@---A---+|C|+---+|+-B-x');
//   });

//   it('throws error for missing start', () => {
//     const invalidMap = `
//       -A---+
//            |
//       x-B-+   C
//           |   |
//           +---+
//     `;
//     expect(() => walk(invalidMap)).toThrow(/Start character '@' not found/);
//   });
// });

import { describe, it, expect } from 'vitest';
import { walk } from '../core/walker';
import { validMaps, invalidMaps } from '../data/maps';

describe('walk function', () => {
  describe('Valid Maps', () => {
    it('Basic returns expected letters and path', () => {
      const result = walk(validMaps['Basic']);
      expect(result.letters).toBe('ACB');
      expect(result.path).toBe('@---A---+|C|+---+|+-B-x');
    });

    it('Go straight returns expected letters and path', () => {
      const result = walk(validMaps['Go straight']);
      expect(result.letters).toBe('ABCD');
      expect(result.path).toBe('@|A+---B--+|+--C-+|-||+---D--+|x');
    });

    it('Letters on turn returns expected letters and path', () => {
      const result = walk(validMaps['Letters on turn']);
      expect(result.letters).toBe('ACB');
      expect(result.path).toBe('@---A---+|||C---+|+-B-x');
    });

    it('GOONIES returns expected letters and path', () => {
      const result = walk(validMaps['GOONIES']);
      expect(result.letters).toBe('GOONIES');
      expect(result.path).toBe('@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x');
    });

    it('Compact returns expected letters and path', () => {
      const result = walk(validMaps['Compact']);
      expect(result.letters).toBe('BLAH');
      expect(result.path).toBe('@B+++B|+-L-+A+++A-+Hx');
    });

    it('Ignore after end returns expected letters and path', () => {
      const result = walk(validMaps['Ignore after end']);
      expect(result.letters).toBe('AB');
      expect(result.path).toBe('@-A--+|+-B--x');
    });
  });

  describe('Invalid Maps', () => {
    it('Missing start throws an error', () => {
      expect(() => walk(invalidMaps['Missing start'])).toThrow(
        /Start character '@' not found/,
      );
    });

    it('Missing end throws an error', () => {
      expect(() => walk(invalidMaps['Missing end'])).toThrow(
        /End character 'x' not found/,
      );
    });

    it('Multiple starts throws an error', () => {
      expect(() => walk(invalidMaps['Multiple starts'])).toThrow(
        /Multiple start characters '@' found/,
      );
    });

    it('Fork in path throws an error', () => {
      expect(() => walk(invalidMaps['Fork in path'])).toThrow(
        /Multiple end characters 'x' found/,
      );
    });

    it('Broken Path throws an error', () => {
      expect(() => walk(invalidMaps['Broken Path'])).toThrow(/Broken path/);
    });

    it('Multiple start paths throws an error', () => {
      expect(() => walk(invalidMaps['Multiple start paths'])).toThrow(
        /Multiple end characters 'x' found/,
      );
    });

    it('Fake turn throws an error', () => {
      expect(() => walk(invalidMaps['Fake turn'])).toThrow(
        /Broken path, no valid turn found/,
      );
    });
  });
});
