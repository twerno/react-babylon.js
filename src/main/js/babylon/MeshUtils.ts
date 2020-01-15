import * as BABYLON from 'babylonjs';

import { showAxis } from './utils/ShowAxis';

export class MeshUtils {

    public static hideShowAxis(
        scene: BABYLON.Scene,
        isVisible: boolean | undefined,
        axisMeshName: string,
        mainMeshName?: string): void {

        const axis = scene.getMeshByName(axisMeshName);
        if (axis) {
            axis.setEnabled(isVisible || false);
        }
        else if (isVisible) {
            MeshUtils.addAxis(scene, axisMeshName, mainMeshName);
        }

    }

    public static addAxis(
        scene: BABYLON.Scene,
        axisMeshName: string,
        mainMeshName: string | undefined,
        defaultSize?: number) {

        let binfo: BABYLON.BoundingInfo | null = null;
        if (mainMeshName) {
            const mainMesh = scene.getMeshByName(mainMeshName);
            binfo = mainMesh && mainMesh.getBoundingInfo();
        }

        showAxis(axisMeshName,
            scene,
            binfo ? binfo.maximum.x - binfo.minimum.x : defaultSize || 10,
            binfo ? binfo.maximum.y - binfo.minimum.y : defaultSize || 10,
            binfo ? binfo.maximum.z - binfo.minimum.z : defaultSize || 10
        );
    }

    public static showMode(scene: BABYLON.Scene, meshName: string, mode: 'ghost' | 'normal'): void {
        const mesh = scene.getMeshByName(meshName);
        if (mesh) {
            if (mode === 'ghost') {
                mesh.overlayColor = BABYLON.Color3.FromHexString('#D5FDE1');
                mesh.renderOverlay = true;
                mesh.renderOutline = true;
                const material = mesh.material;
                if (material) {
                    material.wireframe = true;
                    if (material instanceof BABYLON.StandardMaterial) {
                        material.disableLighting = true;
                    }
                }
            } else if (mode === 'normal') {
                mesh.renderOverlay = false;
                mesh.renderOutline = false;
                const material = mesh.material;
                if (material) {
                    material.wireframe = false;
                    if (material instanceof BABYLON.StandardMaterial) {
                        material.disableLighting = false;
                    }
                }
            }

        }
    }
}
