import { IMeshOptions } from './IMasterState';

export enum ActionType {
    CHANGE_PROP_ACTION
}

export interface IChangePropAction {
    type: ActionType.CHANGE_PROP_ACTION;
    data: Partial<IMeshOptions>;
}

export type AllActionType = IChangePropAction;
