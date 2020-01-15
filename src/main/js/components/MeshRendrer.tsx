import * as BABYLON from 'babylonjs';
import * as React from 'react';

import { SceneEventArgs } from '../babylon/BabylonScene';
import { MeshScene } from '../babylon/MeshScene';
import { IMeshData, MeshProcessor } from '../babylon/utils/MeshProcessor';
import { IMeshOptions } from '../state/IMasterState';

export interface IMeshRendrerProps {
    meshData: IMeshData;
    meshOptions?: IMeshOptions;
}

export class MeshRendrer extends React.Component<IMeshRendrerProps> {

    public render() {
        return (
            <MeshScene
                engineAntialiasing={true}
                meshOptions={this.props.meshOptions || {}}
                meshFactory={(meshName, e) => this.mainMeshFactory(meshName, e)}
                edgesFactory={(meshName, e) => this.edgesFactory(meshName, e)}
            />
        );
    }

    private async mainMeshFactory(meshName: string, e: SceneEventArgs): Promise<BABYLON.Mesh> {
        const { scene } = e;

        const mainMesh = new BABYLON.Mesh(meshName, scene);

        // Create a vertexData object
        const vertexData = MeshProcessor.getVertexData(this.props.meshData);

        // Apply vertexData to mainMesh
        vertexData.applyToMesh(mainMesh);

        return mainMesh;
    }

    private async edgesFactory(meshName: string, e: SceneEventArgs): Promise<BABYLON.LinesMesh | null> {
        const { scene } = e;

        const edges = MeshProcessor.renderEdges(meshName, this.props.meshData, scene);

        return edges;
    }
}
