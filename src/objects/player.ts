import {
  Mesh,
  Scene,
  CreateBox,
  Vector3,
  PhysicsImpostor,
} from "babylonjs";
import { ArcRotateCamera } from "babylonjs";
import { KeyManager } from "../lib/keyManager";

export class Player {
  public mesh: Mesh;

  public constructor(
    private scene: Scene,
    private camera: ArcRotateCamera,
    private keys: KeyManager,
    id?: string
  ) {
    this.mesh = CreateBox(
      `player_${id}`,
      {
        size: 1,
        width: 1,
        height: 1,
        depth: 1,
      },
      scene
    );
    this.mesh.position = new Vector3(0, 7.27, 0);
    this.mesh.physicsImpostor = new PhysicsImpostor(
      this.mesh,
      PhysicsImpostor.BoxImpostor,
      {
        mass: 1,
        restitution: 0.35,
      },
      this.scene
    );
    this.camera.setTarget(this.mesh, false, false);
  }

  // This makes it so the player can't against the camera into the world
  public clamp3DVectorTo2DMovement(vector: Vector3) {
    vector.y = 0;
    return vector;
  }

  public update() {
    const forwardDirection = this.camera.getDirection(
      Vector3.Forward()
    );
    const rightDirection = this.camera.getDirection(Vector3.Right());

    // Note to blusk from blusk:
    //    dont try to put this in an object
    //    everything is just worse
    //    you will hate your life
    this.keys.has("w") &&
      this.mesh.position.addInPlace(this.clamp3DVectorTo2DMovement(forwardDirection.scale(0.1)));
    this.keys.has("a") &&
      this.mesh.position.addInPlace (this.clamp3DVectorTo2DMovement(rightDirection.scale(-0.1)));
    this.keys.has("s") &&
      this.mesh.position.addInPlace(this.clamp3DVectorTo2DMovement(forwardDirection.scale(-0.1)));
    this.keys.has("d") &&
      this.mesh.position.addInPlace (this.clamp3DVectorTo2DMovement(rightDirection.scale(0.1)));
  }
}
