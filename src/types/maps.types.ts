import { invalidMaps, maps, validMaps } from '../data/maps';

export type MapKey = keyof typeof maps;
export type ValidMapKey = keyof typeof validMaps;
export type InvalidMapKey = keyof typeof invalidMaps;
