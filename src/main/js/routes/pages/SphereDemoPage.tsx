import * as BABYLON from 'babylonjs';
import * as React from 'react';

import BabylonScene, { SceneEventArgs } from '../../babylon/BabylonScene';

export interface ISphereDemoPageProps {

}

export const SphereDemoPage: React.FC<ISphereDemoPageProps> = (props) => (
    <BabylonScene
        onSceneMount={onSceneMount}
        height="100vh" width="100vh"
        engineOptions={{ engineAntialiasing: true }} />
);

const onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(-10, 0, 0), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    const ground = BABYLON.Mesh.CreateGround('ground1', 600, 600, 20, scene);

    engine.runRenderLoop(() => {
        if (scene) {
            scene.render();
        }
    });
};
