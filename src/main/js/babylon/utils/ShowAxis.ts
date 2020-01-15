import * as BABYLON from 'babylonjs';

function makeTextPlane(scene: BABYLON.Scene, text: string, color: string, size: number) {
    const dynamicTexture = new BABYLON.DynamicTexture('DynamicTexture', 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true);
    const plane = BABYLON.Mesh.CreatePlane('TextPlane', size, scene, true);
    const material = new BABYLON.StandardMaterial('TextPlaneMaterial', scene);
    material.backFaceCulling = false;
    material.specularColor = new BABYLON.Color3(0, 0, 0);
    material.diffuseTexture = dynamicTexture;
    plane.material = material;

    return plane;
}

export function showAxis(meshName: string, scene: BABYLON.Scene, sizeX: number, sizeY: number, sizeZ: number) {

    const axisX = BABYLON.Mesh.CreateLines('axisX', [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(sizeX, 0, 0),
        new BABYLON.Vector3(sizeX * 0.95, 0.05 * sizeX, 0),
        new BABYLON.Vector3(sizeX, 0, 0),
        new BABYLON.Vector3(sizeX * 0.95, -0.05 * sizeX, 0)
    ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);

    const xChar = makeTextPlane(scene, 'X', 'red', sizeX / 10);
    xChar.position = new BABYLON.Vector3(0.9 * sizeX, -0.05 * sizeX, 0);
    xChar.renderOverlay = true;

    const axisY = BABYLON.Mesh.CreateLines('axisY', [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, sizeY, 0),
        new BABYLON.Vector3(-0.05 * sizeY, sizeY * 0.95, 0),
        new BABYLON.Vector3(0, sizeY, 0),
        new BABYLON.Vector3(0.05 * sizeY, sizeY * 0.95, 0)
    ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);

    const yChar = makeTextPlane(scene, 'Y', 'green', sizeY / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * sizeY, -0.05 * sizeY);
    yChar.renderOverlay = true;

    const axisZ = BABYLON.Mesh.CreateLines('axisZ', [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, 0, sizeZ),
        new BABYLON.Vector3(0, -0.05 * sizeZ, sizeZ * 0.95),
        new BABYLON.Vector3(0, 0, sizeZ),
        new BABYLON.Vector3(0, 0.05 * sizeZ, sizeZ * 0.95)
    ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);

    const zChar = makeTextPlane(scene, 'Z', 'blue', sizeZ / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * sizeZ, 0.9 * sizeZ);
    zChar.renderOverlay = true;

    const mesh = new BABYLON.Mesh(meshName, scene);

    axisX.parent = mesh;
    xChar.parent = mesh;
    axisY.parent = mesh;
    yChar.parent = mesh;
    axisZ.parent = mesh;
    zChar.parent = mesh;
}
