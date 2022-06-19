import * as BABYLON from "babylonjs";
import { ArcRotateCamera } from "babylonjs";
import { KeyManager } from "../lib/keyManager";

export class Player {
  public mesh: BABYLON.Mesh;

  public constructor(
    private scene: BABYLON.Scene,
    private camera: ArcRotateCamera,
    private keys: KeyManager,
    id?: string
  ) {
    this.mesh = BABYLON.CreateBox(
      `player_${id}`,
      {
        size: 0.5,
        width: 1,
        height: 1,
        depth: 1,
      },
      scene
    );
    this.mesh.position = new BABYLON.Vector3(0, 7.27, 0);
    this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
      this.mesh,
      BABYLON.PhysicsImpostor.BoxImpostor,
      {
        mass: 1,
        restitution: 0.9,
      },
      this.scene
    );
    this.camera.setTarget(this.mesh, false, false);
  }

  public update() {
    const forwardDirection = this.camera.getDirection(
      BABYLON.Vector3.Forward()
    );
    const rightDirection = this.camera.getDirection(BABYLON.Vector3.Right());

    // Note to blusk from blusk:
    //    dont try to put this in an object
    //    everything is just worse
    //    you will hate your life
    this.keys.has("w") &&
      this.mesh.position.addInPlace(forwardDirection.scale(0.1));
    this.keys.has("a") &&
      this.mesh.position.addInPlace(rightDirection.scale(-0.1));
    this.keys.has("s") &&
      this.mesh.position.addInPlace(forwardDirection.scale(-0.1));
    this.keys.has("d") &&
      this.mesh.position.addInPlace(rightDirection.scale(0.1));
  }
}
