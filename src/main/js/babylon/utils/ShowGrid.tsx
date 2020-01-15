import * as BABYLON from 'babylonjs';
import * as BABYLON_MATERIALS from 'babylonjs-materials';

export function showGrid(scene: BABYLON.Scene, center: BABYLON.Vector3) {
    const ground = BABYLON.Mesh.CreateGround('plane', 500, 500, 5, scene);
    ground.position = center;
    ground.position.y = 0;

    const grid = new BABYLON_MATERIALS.GridMaterial('gridTexture', scene);
    grid.gridRatio = 1;
    grid.lineColor = BABYLON.Color3.FromInts(42, 87, 154);
    grid.mainColor = BABYLON.Color3.FromInts(230, 230, 230);
    grid.majorUnitFrequency = 10;
    ground.material = grid;
}
