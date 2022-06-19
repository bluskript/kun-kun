import * as BABYLON from "babylonjs";

export class Game {
  constructor(private canvas: HTMLCanvasElement) {
    const engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    const createScene = function () {
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.UniversalCamera(
        "camera1",
        new BABYLON.Vector3(0, 5, -10),
        scene
      );
      camera.setTarget(BABYLON.Vector3.Zero());
      camera.attachControl(canvas, true);
      const light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      const sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere1",
        { segments: 16, diameter: 2, sideOrientation: BABYLON.Mesh.FRONTSIDE },
        scene
      );
      sphere.position.y = 1;
      const ground = BABYLON.MeshBuilder.CreateGround(
        "ground1",
        { width: 6, height: 6, subdivisions: 2, updatable: false },
        scene
      );
      return scene;
    };
    const scene = createScene();
    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());
  }
}
