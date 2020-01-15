import * as React from 'react';

import { mesh1 } from '../../babylon/demoMeshData/Mesh1';
import { MeshRendrer } from '../../components/MeshRendrer';
import { IMeshOptions } from '../../state/IMasterState';
import { Path } from '../Path';
import { routeMeshOptionsMap } from '../RouteMeshOptionsMap';

export interface ITriangleMeshDemoPageProps {
    meshOptions?: IMeshOptions;
}

export const TriangleMeshDemoPage: React.FC<ITriangleMeshDemoPageProps> = (props) => (
    <MeshRendrer meshData={mesh1} meshOptions={props.meshOptions} />
);

routeMeshOptionsMap[Path.triangleMeshDemoPath] = [
    { action: 'showAxis', icon: 'fas fa-map' },
    { action: 'ghostMode', icon: 'fas fa-ghost' },
    { action: 'rotate', icon: 'fas fa-play' },
];
