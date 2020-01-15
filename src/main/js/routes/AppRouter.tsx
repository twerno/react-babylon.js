import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { IMasterState } from '../state/IMasterState';
import { BoxMeshDemoPage } from './pages/BoxMeshDemoPage';
import { HomePage } from './pages/HomePage';
import { MeshPreviewPage } from './pages/MeshPreview';
import { IPartMeshDemoPageProps } from './pages/PartMeshDemoPage';
import { TriangleMeshDemoPage } from './pages/TriangleMeshDemoPage';
import { Path } from './Path';

export interface IAppRouterProps {
    state: IMasterState;
}

const SphereDemoLoader = React.lazy(
    () => import(/* webpackChunkName: "sphere" */ './pages/SphereDemoPage')
        .then(r => new Promise<any>(resolve => setTimeout(() => resolve(r), 1000))));

const PartDemoLoader: React.LazyExoticComponent<React.FC<IPartMeshDemoPageProps>> = React.lazy(
    () => import(/* webpackChunkName: "part" */ './pages/PartMeshDemoPage')
        .then(r => new Promise<any>(resolve => setTimeout(() => resolve(r), 1000))));

const SphereDemoPage: React.FC<{}> = (props) => (
    <React.Suspense fallback={<div>Wczytywanie...</div>}>
        <SphereDemoLoader />
    </React.Suspense>
);

const PartMeshDemoPage: React.FC<IPartMeshDemoPageProps> = (props) => (
    <React.Suspense fallback={<div>Wczytywanie...</div>}>
        <PartDemoLoader {...props} />
    </React.Suspense>
);

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
