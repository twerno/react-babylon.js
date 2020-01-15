import { IMeshOptions } from '../state/IMasterState';

export interface IRouteMeshOption {
    icon: string;
    action: keyof IMeshOptions;
}

export interface IRouteMeshOptionsMap {
    [key: string]: IRouteMeshOption[] | undefined;
}

export const routeMeshOptionsMap: IRouteMeshOptionsMap = {};
