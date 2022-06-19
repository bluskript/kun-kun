import * as BABYLON from "babylonjs";
import * as CANNON from "cannon";
import { KeyManager } from "./lib/keyManager";
import { Player } from "./objects/player";
export class Game {
  public engine: BABYLON.Engine;
  public scene: BABYLON.Scene;
  public keys: KeyManager;
  public globalLight: BABYLON.HemisphericLight;
  public camera: BABYLON.ArcRotateCamera;
  public player: Player;

  public constructor(private canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    this.scene = new BABYLON.Scene(this.engine);
    this.scene.enablePhysics(
      new BABYLON.Vector3(0, -9.81, 0),
      new BABYLON.CannonJSPlugin(undefined, undefined, CANNON)
    );
    this.keys = new KeyManager(this.scene);
    this.globalLight = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );

    this.camera = new BABYLON.ArcRotateCamera(
      "camera1",
      0,
      0,
      20,
      new BABYLON.Vector3(0, 0, 0),
      this.scene,
      true
    );
    this.camera.attachControl(canvas, true);
    this.player = new Player(this.scene, this.camera, this.keys);

    const material2 = new BABYLON.StandardMaterial("material2", this.scene);
    material2.diffuseTexture = new BABYLON.Texture(
      "/assets/catnip.jpg",
      this.scene
    );
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { width: 6, height: 6, subdivisions: 2, updatable: false },
      this.scene
    );
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
      ground,
      BABYLON.PhysicsImpostor.BoxImpostor,
      {
        mass: 0,
        restitution: 0.9,
      },
      this.scene
    );
    ground.material = material2;
    this.engine.runRenderLoop(() => {
      const forwardDirection = this.camera.getDirection(
        BABYLON.Vector3.Forward()
      );
      const rightDirection = this.camera.getDirection(BABYLON.Vector3.Right());
      this.player.update();
      this.scene.render();
    });
    window.addEventListener("resize", () => this.engine.resize());
  }
}
