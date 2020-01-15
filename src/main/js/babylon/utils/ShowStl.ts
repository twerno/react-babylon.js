import { Scene, Engine, SceneLoader } from 'babylonjs';
import 'babylonjs-loaders';

export function renderStl(canvas: HTMLElement, engine: Engine, modelName: string): Promise<Scene> {
    return new Promise<Scene>((resolve, reject) => {
        const scene = new Scene(engine);

        SceneLoader.ImportMesh('', 'models/', modelName, scene,
            () => {
                scene.createDefaultCameraOrLight(true, true, true);
                scene.createDefaultEnvironment();
                resolve(scene);
            },
            undefined,
            (s, message, exception) => reject(exception));

    });
}
