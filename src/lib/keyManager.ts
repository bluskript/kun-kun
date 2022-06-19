import * as BABYLON from "babylonjs";

export class KeyManager extends Set {
  constructor(scene: BABYLON.Scene) {
    super();
    scene.onKeyboardObservable.add((kbInfo) => {
      if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
        this.add(kbInfo.event.key.toLowerCase());
      } else {
        this.delete(kbInfo.event.key.toLowerCase());
      }
    });
  }
}
