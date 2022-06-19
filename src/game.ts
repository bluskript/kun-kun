import {
  Engine,
  Scene,
  HemisphericLight,
  ArcRotateCamera,
  CannonJSPlugin,
  StandardMaterial,
  Texture,
  MeshBuilder,
  PhysicsImpostor,
  Vector3,
} from "babylonjs";
import * as CANNON from "cannon";
import { KeyManager } from "./lib/keyManager";
import { Player } from "./objects/player";

export class Game {
  public engine: Engine;
  public scene: Scene;
  public keys: KeyManager;
  public globalLight: HemisphericLight;
  public camera: ArcRotateCamera;
  public player: Player;

  public constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    this.scene = new Scene(this.engine);
    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(undefined, undefined, CANNON)
    );
    this.keys = new KeyManager(this.scene);
    this.globalLight = new HemisphericLight(
      "light1",
      new Vector3(0, 1, 0),
      this.scene
    );

    const degreeToRadians = (degree: number) => degree * (Math.PI / 180);


    this.camera = new ArcRotateCamera(
      "camera",
      degreeToRadians(45), // x
      degreeToRadians(35), // y
      30,
      new Vector3(0, 0, 0),
      this.scene,
      true
    );
    // this.camera.attachControl(canvas, true);
    this.player = new Player(this.scene, this.camera, this.keys);

    const tiledTexture = new StandardMaterial("material2", this.scene);

    tiledTexture.diffuseTexture = new Texture(
      "/assets/dev.png",
      this.scene
    );

    const ground = MeshBuilder.CreateTiledBox("ground1", {
      width: 24,
      height: 0.1,
      depth: 24,
    }, this.scene);

    ground.material = tiledTexture;
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      {
        mass: 0,
        restitution: 0.9,
      },
      this.scene
    );
    ground.material = tiledTexture;
    this.engine.runRenderLoop(() => {
      const forwardDirection = this.camera.getDirection(
        Vector3.Forward()
      );
      const rightDirection = this.camera.getDirection(Vector3.Right());
      this.player.update();
      this.scene.render();
    });
    window.addEventListener("resize", () => this.engine.resize());
  }
}
