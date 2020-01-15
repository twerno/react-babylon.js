import * as React from 'react';

import { mesh2 } from '../../babylon/demoMeshData/Mesh2';
import { MeshRendrer } from '../../components/MeshRendrer';
import { IMeshOptions } from '../../state/IMasterState';
import { Path } from '../Path';
import { routeMeshOptionsMap } from '../RouteMeshOptionsMap';

export interface IPartMeshDemoPageProps {
    meshOptions?: IMeshOptions;
}

const PartMeshDemoPage: React.FC<IPartMeshDemoPageProps> = (props) => (
    <MeshRendrer meshData={mesh2} meshOptions={props.meshOptions} />
);

export default PartMeshDemoPage;

routeMeshOptionsMap[Path.partMeshDemoPath] = [
    { action: 'showAxis', icon: 'fas fa-map' },
    { action: 'ghostMode', icon: 'fas fa-ghost' },
    { action: 'rotate', icon: 'fas fa-play' },
];
