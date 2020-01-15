import { IMeshData } from '../utils/MeshProcessor';

const vertices: number[][] = [
    [-5, 2, -3],
    [-7, -2, -3],
    [-3, -2, -3],
    [5, 2, 3],
    [7, -2, 3],
    [3, -2, 3]
];

const facets: number[][] = [
    [0, 1, 2],
    [3, 4, 5]
];

export const mesh1: IMeshData = { vertices, facets };
