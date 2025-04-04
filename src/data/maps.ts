export const validMaps = {
  'Basic': `
    @---A---+
            |
    x-B-+   C
        |   |
        +---+
  `,
  'Go straight': `
    @
    | +-C--+
    A |    |
    +---B--+
      |      x
      |      |
      +---D--+
  `,
  'Letters on turn': `
    @---A---+
            |
    x-B-+   |
        |   |
        +---C
  `,
  'GOONIES': `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
  `,
  'Compact': `
   +-L-+
   |  +A-+
  @B+ ++ H
   ++    x
  `,
  'Ignore after end': `
    @-A--+
         |
         +-B--x-C--D
  `,
} as const;

export const invalidMaps = {
  'Missing start': `
       -A---+
            |
    x-B-+   C
        |   |
        +---+
  `,
  'Missing end': `
     @--A---+
            |
      B-+   C
        |   |
        +---+
  `,
  'Multiple starts': `
     @--A-@-+
            |
    x-B-+   C
        |   |
        +---+
     @--A---+
            |
            C
            x
        @-B-+
     @--A--x

    x-B-+
        |
        @
  `,
  'Fork in path': `
          x-B
            |
     @--A---+
            |
       x+   C
        |   |
        +---+
  `,
  'Broken Path': `
     @--A-+
          |
           
          B-x
  `,
  'Multiple start paths': `
    x-B-@-A-x
  `,
  'Fake turn': `
    @-A-+-B-x
  `,
} as const;

export const maps = {
  ...validMaps,
  ...invalidMaps,
} as const;

