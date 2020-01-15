import * as BABYLON from 'babylonjs';
import * as React from 'react';

import { IMeshOptions } from '../state/IMasterState';
import BabylonScene, { SceneEventArgs } from './BabylonScene';
import { MeshUtils } from './MeshUtils';
import { CameraHelper } from './utils/CameraHelper';

export interface IMeshSceneProps {
    meshFactory: (meshName: string, e: SceneEventArgs) => Promise<BABYLON.AbstractMesh>;
    edgesFactory: (meshName: string, e: SceneEventArgs) => Promise<BABYLON.LinesMesh | null>;
    engineAntialiasing?: boolean;
    meshOptions: IMeshOptions;
}

export const MESH_AXIS = 'MESH_AXIS';
export const MESH_MAIN = 'MESH_MAIN';
export const MESH_EDGES = 'MESH_EDGES';
export const CAMERA = 'myCamera';

export class MeshScene extends React.PureComponent<IMeshSceneProps> {

    private onSceneMount = async (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;

        // Create a mainMesh
        const mainMesh = await this.props.meshFactory(MESH_MAIN, e);

        const material = new BABYLON.StandardMaterial('mainMeshMaterial', scene);
        material.backFaceCulling = false;
        mainMesh.material = material;

        // edges
        const edgeMesh = await this.props.edgesFactory(MESH_EDGES, e);
        if (edgeMesh) {
            edgeMesh.material = material;
            edgeMesh.color = BABYLON.Color3.Red();
        }

        const center = mainMesh.getBoundingInfo().boundingBox.center;
        if (isNaN(center.x + center.y + center.z)) {
            throw new Error(`NaN in mainMesh.getBoundingInfo().boundingBox.center; \n ${JSON.stringify(mainMesh.getBoundingInfo())}`);
        }

        const camera = new BABYLON.ArcRotateCamera(CAMERA, 0, 0, 0, center, scene);
        CameraHelper.fitToView(mainMesh, engine, scene);
        camera.useAutoRotationBehavior = false;

        camera.attachControl(canvas, true);

        scene.createDefaultLight();
        const light2 = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(100, 200, 0), scene);
        // light2.diffuse = BABYLON.Color3.FromHexString('#000000');
        // light2.specular = BABYLON.Color3.FromHexString('#AECBFB');
        light2.diffuse = BABYLON.Color3.FromHexString('#555555');
        light2.specular = BABYLON.Color3.FromHexString('#969696');
        light2.intensity = 0.4;
        light2.parent = camera;

        // showGrid(scene, center);

        engine.runRenderLoop(() => {
            if (scene) {
                this.applyOptions(scene);

                scene.render();
            }
        });
    }

    private applyOptions(scene: BABYLON.Scene): void {
        MeshUtils.hideShowAxis(
            scene, this.props.meshOptions.showAxis, MESH_AXIS, MESH_MAIN
        );

        if (this.props.meshOptions.debugMode) {
            scene.debugLayer.show();
        } else {
            scene.debugLayer.hide();
        }

        const edges = scene.getMeshByName(MESH_EDGES);
        if (edges) {
            edges.setEnabled(this.props.meshOptions.showEdges || false);
        }

        const mode = this.props.meshOptions.ghostMode
            ? 'ghost'
            : 'normal';
        MeshUtils.showMode(scene, MESH_MAIN, mode);

        const camera = scene.getCameraByName(CAMERA);
        if (camera && camera instanceof BABYLON.ArcRotateCamera) {
            camera.useAutoRotationBehavior = this.props.meshOptions.rotate || false;
        }
    }

    public render() {
        return (
            <BabylonScene
                onSceneMount={this.onSceneMount}
                height="100vh" width="100vh"
                engineOptions={{ engineAntialiasing: true }}
            />
        );
    }
}
