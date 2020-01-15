import { IMeshData } from '../utils/MeshProcessor';

const vertices: number[][] = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 1],
];

const facets: number[][] = [
    [0, 1, 2],
    [1, 2, 3],

    [1, 3, 5],
    [3, 5, 7],

    [5, 4, 7],
    [4, 7, 6],

    [2, 4, 0],
    [2, 4, 6],

    [0, 1, 5],
    [0, 5, 4],

    [2, 3, 7],
    [2, 7, 6]

];

export const mesh0: IMeshData = { vertices, facets };
