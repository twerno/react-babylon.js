import * as BABYLON from 'babylonjs';

export class CameraHelper {

    /**
     * https://forum.babylonjs.com/t/positioning-mesh-in-the-center-of-the-canvas/1110
     * https://www.babylonjs-playground.com/#TT2BK1#14
     * @param mesh
     * @param engine
     * @param scene
     */
    public static fitToView(mesh: BABYLON.AbstractMesh, engine: BABYLON.Engine, scene: BABYLON.Scene) {
        const radius = mesh.getBoundingInfo().boundingSphere.radiusWorld;

        if (scene.activeCamera) {

            const aspectRatio = engine.getAspectRatio(scene.activeCamera);
            let halfMinFov = scene.activeCamera.fov / 2;
            if (aspectRatio < 1) {
                halfMinFov = Math.atan(aspectRatio * Math.tan(scene.activeCamera.fov / 2));
            }

            if (scene.activeCamera instanceof BABYLON.ArcRotateCamera) {
                const viewRadius = Math.abs(radius / Math.sin(halfMinFov));
                if (viewRadius > scene.activeCamera.radius) {
                    scene.activeCamera.radius = viewRadius;
                }
            }
        }
    }
}
