import * as BABYLON from 'babylonjs';
import { STLFileLoader } from 'babylonjs-loaders';
import * as React from 'react';

import { SceneEventArgs } from '../../babylon/BabylonScene';
import { MESH_MAIN, MeshScene } from '../../babylon/MeshScene';
import { FilePondWrapper } from '../../components/FilePondWrapper';
import { IMeshOptions } from '../../state/IMasterState';
import { Path } from '../Path';
import { routeMeshOptionsMap } from '../RouteMeshOptionsMap';

export interface IMeshPreviewPageProps {
    meshOptions?: IMeshOptions;
}

interface IMeshPreviewPageState {
    file: any;
}

export class MeshPreviewPage extends React.PureComponent<IMeshPreviewPageProps, IMeshPreviewPageState> {

    public constructor(props: IMeshPreviewPageProps) {
        super(props);
        this.state = { file: undefined };
    }

    private processFile = (fieldName: string, file: any, abort: () => void): Promise<string> => {
        return new Promise((_resolve, _reject) => {
            this.setState({ file });

            // simulate delay
            setTimeout(() => _resolve(), 500);
        });
    }

    private mainMeshFactory(meshName: string, e: SceneEventArgs): Promise<BABYLON.AbstractMesh> {
        return new Promise<BABYLON.AbstractMesh>((_resolve, _reject) => {
            const { canvas, scene, engine } = e;

            const loader = new STLFileLoader();
            const reader = new FileReader();

            reader.onerror = ev => _reject(ev);

            reader.onloadend = ev => {
                if (ev && ev.target && ev.target.result) {
                    loader.importMesh(MESH_MAIN, scene, ev.target.result, '', null, null, null);
                    const mesh = scene.getMeshByName('stlmesh');

                    if (mesh) {
                        mesh.name = MESH_MAIN;
                        _resolve(mesh);
                    }
                    else {
                        _reject(`No mesh created`);
                    }
                }
                else {
                    _reject(`no event target`);
                }
            };

            reader.readAsArrayBuffer(this.state.file);
        });
    }

    public render() {
        return (
            <>
                {this.state.file
                    ? (
                        <MeshScene
                            engineAntialiasing={true}
                            meshOptions={this.props.meshOptions || {}}
                            meshFactory={(meshName, e) => this.mainMeshFactory(meshName, e)}
                            edgesFactory={(meshName, e) => Promise.resolve(null)}
                        />
                    )
                    : <FilePondWrapper processFile={this.processFile} />
                }
            </>
        );
    }

}

routeMeshOptionsMap[Path.previewMeshPath] = [
    { action: 'showAxis', icon: 'fas fa-map' },
    { action: 'ghostMode', icon: 'fas fa-ghost' },
    { action: 'rotate', icon: 'fas fa-play' },
];
