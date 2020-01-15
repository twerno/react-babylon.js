import * as React from 'react';

import { ActionType, AllActionType } from './Actions';
import { IMasterState } from './IMasterState';

export type MasterReducerType = React.Reducer<IMasterState, AllActionType>;
export type MasterDispatcherType = React.Dispatch<AllActionType>;

export const masterReducer: MasterReducerType = (prevState, action) => {

    switch (action.type) {

        case (ActionType.CHANGE_PROP_ACTION): {
            return { ...prevState, meshOptions: { ...prevState.meshOptions, ...action.data } };
        }

        default:
            console.error(`There is no reducer defined for action type="${action.type}".`);
            return prevState;
    }
};
