import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { IMasterState } from '../state/IMasterState';
import { BoxMeshDemoPage } from './pages/BoxMeshDemoPage';
import { HomePage } from './pages/HomePage';
import { MeshPreviewPage } from './pages/MeshPreview';
import { PartMeshDemoPage } from './pages/PartMeshDemoPage';
import { SphereDemoPage } from './pages/SphereDemoPage';
import { TriangleMeshDemoPage } from './pages/TriangleMeshDemoPage';
import { Path } from './Path';

export interface IAppRouterProps {
    state: IMasterState;
}

export const AppRouter: React.FC<IAppRouterProps> = (props) => {
    return (
        <Switch>
            <Route
                path={Path.indexPath}
                exact={true}
                render={() => <Redirect to={Path.homeUrl()} />}
            />
            <Route
                path={Path.homePath}
                render={() => <HomePage />}
            />
            <Route
                path={Path.sphereDemoPath}
                render={() => <SphereDemoPage />}
            />
            <Route
                path={Path.triangleMeshDemoPath}
                render={() => <TriangleMeshDemoPage meshOptions={props.state.meshOptions} />}
            />
            <Route
                path={Path.boxMeshDemoPath}
                render={() => <BoxMeshDemoPage meshOptions={props.state.meshOptions} />}
            />
            <Route
                path={Path.partMeshDemoPath}
                render={() => <PartMeshDemoPage meshOptions={props.state.meshOptions} />}
            />
            <Route
                path={Path.previewMeshPath}
                render={() => <MeshPreviewPage meshOptions={props.state.meshOptions} />}
            />

            <Route render={() => <>Page not found</>} />
        </Switch>
    );
};
