import * as React from 'react';

import { mesh0 } from '../../babylon/demoMeshData/Mesh0';
import { MeshRendrer } from '../../components/MeshRendrer';
import { IMeshOptions } from '../../state/IMasterState';
import { Path } from '../Path';
import { routeMeshOptionsMap } from '../RouteMeshOptionsMap';

export interface IBoxMeshDemoPageProps {
    meshOptions?: IMeshOptions;
}

export const BoxMeshDemoPage: React.FC<IBoxMeshDemoPageProps> = (props) => (
    <MeshRendrer meshData={mesh0} meshOptions={props.meshOptions} />
);

routeMeshOptionsMap[Path.boxMeshDemoPath] = [
    { action: 'showAxis', icon: 'fas fa-map' },
    { action: 'ghostMode', icon: 'fas fa-ghost' },
    { action: 'rotate', icon: 'fas fa-play' },
];
