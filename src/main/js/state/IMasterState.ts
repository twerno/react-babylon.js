export interface IMeshOptions {
    showEdges?: boolean;
    ghostMode?: boolean;
    debugMode?: boolean;
    showAxis?: boolean;
    rotate?: boolean;
}

export interface IMasterState {
    meshOptions?: IMeshOptions;
}

export const initialState: IMasterState = {

};
