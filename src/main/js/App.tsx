import './App.css';
import '@material/react-button/dist/button.css';
import '@material/react-drawer/dist/drawer.css';
import '@material/react-icon-button/dist/icon-button.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-top-app-bar/dist/top-app-bar.css';

import * as React from 'react';

import { MaterialTopAppBar } from './components/MaterialTopAppBar';
import { AppRouter } from './routes/AppRouter';
import { initialState } from './state/IMasterState';
import { masterReducer, MasterReducerType } from './state/MasterStateReducer';

export interface IAppProps {
}

export const App: React.FC<IAppProps> = (props) => {

    const [state, dispatch] =
        React.useReducer<MasterReducerType>(masterReducer, initialState);

    return (
        <>
            {/* <TopBar meshOptions={state.meshOptions} dispatch={dispatch} /> */}
            <MaterialTopAppBar meshOptions={state.meshOptions} dispatch={dispatch} />
            <div className="appContainer">
                <AppRouter state={state} />
            </div>
        </>
    );

};
