import * as BABYLON from 'babylonjs';

export interface IMeshData {
    vertices: number[][];
    facets: number[][];
    edges?: number[][];
}

export class MeshProcessor {

    private static getPositions(mesh: IMeshData): number[] {
        const result: number[] = [];

        mesh.vertices.forEach(v =>
            v.forEach(p => result.push(p))
        );
        return result;
    }

    private static getIndices(mesh: IMeshData): number[] {
        const result: number[] = [];
        mesh.facets.forEach(facet =>
            facet.forEach(v => result.push(v))
        );
        return result;
    }

    public static getVertexData(meshData: IMeshData): BABYLON.VertexData {
        const vertexData = new BABYLON.VertexData();

        vertexData.positions = this.getPositions(meshData);
        vertexData.indices = this.getIndices(meshData);

        return vertexData;
    }

    private static getEdges(meshData: IMeshData): BABYLON.Vector3[][] {

        if (meshData.edges) {
            const result = meshData.edges.map(edge => (
                [
                    meshData.vertices[edge[0]],
                    meshData.vertices[edge[1]]
                ]
            ))
                .map(points => (
                    [
                        new BABYLON.Vector3(points[0][0], points[0][1], points[0][2]),
                        new BABYLON.Vector3(points[1][0], points[1][1], points[1][2])
                    ]
                )
                );
            return result;
        }
        return [];
    }

    public static renderEdges(name: string, meshData: IMeshData, scene: BABYLON.Scene): BABYLON.LinesMesh | null {
        if (meshData.edges && meshData.edges.length > 0) {
            const edges = this.getEdges(meshData);

            return BABYLON.MeshBuilder.CreateLineSystem(name, { lines: edges }, scene);

        }
        return null;
    }

    // low performance
    // public static createEdgesFrom2(meshData: IMeshData, scene: Scene): null {
    //     if (meshData.edges) {
    //         const edges = this.prepEdges(meshData);
    //         const rootNode = new TransformNode('edges', scene);

    //         const lines = edges
    //             .map((v, idx) => MeshBuilder.CreateLines(`edge_${idx}`, { points: v }, scene))
    //             .map(m => {
    //                 m.parent = rootNode;
    //                 return m;
    //             });
    //     }
    //     return null;
    // }

}
