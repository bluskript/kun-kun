export const makeObamna = (scene: BABYLON.Scene) => {
  const material = new BABYLON.StandardMaterial("obamna", scene);
  material.diffuseTexture = new BABYLON.Texture("/assets/obamna.png", scene);
  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere1",
    { segments: 16, diameter: 2, sideOrientation: BABYLON.Mesh.FRONTSIDE },
    scene
  );
  sphere.position.y = 1;
};
