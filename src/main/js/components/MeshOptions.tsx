import './MeshOptions.css';

import * as React from 'react';

import { IRouteMeshOption, routeMeshOptionsMap } from '../routes/RouteMeshOptionsMap';
import { ActionType, IChangePropAction } from '../state/Actions';
import { IMeshOptions } from '../state/IMasterState';

export interface IMeshOptionsProps {
    meshOptions?: IMeshOptions;
    dispatch: React.Dispatch<IChangePropAction>;
}

export const MeshOptions: React.FC<IMeshOptionsProps> = (props) => {
    const optionsToRender = routeMeshOptionsMap[document.location.pathname];

    const icons = optionsToRender && optionsToRender
        .map(routeMeshOptionMapper(props));

    return (
        <div className="topBar__meshOptionIconContainer">
            {icons}
        </div>
    );
};

const routeMeshOptionMapper = (props: IMeshOptionsProps) => {
    return (data: IRouteMeshOption, idx: number) => {
        const isActive = !!(props.meshOptions && props.meshOptions[data.action]);

        const actionHandler = () => dispatchChange(data, isActive, props.dispatch);
        const className = 'topBar__meshOptionIconContainer__element' + (isActive ? '--active' : '');

        return (
            <div
                className={className}
                onClick={actionHandler}
                key={`icon_${idx}`}
            >
                <i className={`${data.icon}`}></i>
            </div>
        );
    };
};

const dispatchChange = (
    data: IRouteMeshOption,
    isActive: boolean,
    dispatch: React.Dispatch<IChangePropAction>
) => {
    const newVal: Partial<IMeshOptions> = {};
    newVal[data.action] = !isActive;
    const action: IChangePropAction = {
        type: ActionType.CHANGE_PROP_ACTION,
        data: newVal
    };
    dispatch(action);
};
