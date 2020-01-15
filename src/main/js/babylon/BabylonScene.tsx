import * as BABYLON from 'babylonjs';
import * as React from 'react';

export interface SceneEventArgs {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    canvas: HTMLCanvasElement;
}

export interface SceneProps {
    engineOptions?: BABYLON.EngineOptions & { engineAntialiasing?: boolean };
    adaptToDeviceRatio?: boolean;
    onSceneMount?: (args: SceneEventArgs) => void;
    width?: number | string;
    height?: number | string;
}

export default class BabylonScene<P extends SceneProps & React.HTMLAttributes<HTMLCanvasElement>>
    extends React.Component<P, {}> {

    protected scene: BABYLON.Scene | undefined;
    protected engine: BABYLON.Engine | undefined;
    protected canvas: HTMLCanvasElement | undefined;

    private onResizeWindow = () => {
        if (this.engine) {
            this.engine.resize();
        }
    }

    private onCanvasLoaded = (c: HTMLCanvasElement) => {
        if (c !== null) {
            this.canvas = c;
        }
    }

    public componentDidMount() {
        if (this.canvas === undefined) {
            throw new Error('canvas is undefined');
        }

        const engine = new BABYLON.Engine(
            this.canvas,
            this.props.engineOptions && this.props.engineOptions.engineAntialiasing || false,
            this.props.engineOptions,
            this.props.adaptToDeviceRatio
        );
        this.engine = engine;

        const scene = new BABYLON.Scene(this.engine);
        this.scene = scene;

        if (typeof this.props.onSceneMount === 'function') {
            this.props.onSceneMount({
                scene,
                engine,
                canvas: this.canvas
            });
        } else {
            console.error('onSceneMount function not available');
        }

        // Resize the babylon engine when the window is resized
        window.addEventListener('resize', this.onResizeWindow);

        this.fitToContainer(this.canvas);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeWindow);
    }

    private fitToContainer(canvas: HTMLCanvasElement) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    public render() {
        // 'rest' can contain additional properties that you can flow through to canvas:
        // (id, className, etc.)
        const { width, height, ...rest } = this.props;

        const opts: any = {};

        if (width !== undefined && height !== undefined) {
            opts.width = width;
            opts.height = height;
        }

        return (
            <canvas
                {...opts}
                ref={this.onCanvasLoaded}
            />
        );
    }
}
