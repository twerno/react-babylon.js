import './TopBar.css';

import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { IMeshOptions } from '../state/IMasterState';
import { MasterDispatcherType } from '../state/MasterStateReducer';
import { MainMenu } from './MainMenu';
import { MeshOptions } from './MeshOptions';

export interface ITopBarProps extends RouteComponentProps {
    meshOptions?: IMeshOptions;
    dispatch: MasterDispatcherType;
}

const TopBar: React.FC<ITopBarProps> = (props) => {
    return (
        <div className="topBar">
            <MainMenu />
            <MeshOptions {...props} />
        </div>
    );
};

export default withRouter(TopBar);
