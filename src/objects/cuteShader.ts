export const CUTE_SHADER = (scene: BABYLON.Scene) =>
  new BABYLON.ShaderMaterial("cutePixel", scene, "./shaders/CUTE_PIXEL", {
    attributes: ["position", "normal", "uv"],
    uniforms: [
      "world",
      "worldView",
      "worldViewProjection",
      "view",
      "projection",
      "time",
      "direction",
    ],
    samplers: ["textureSampler"],
    defines: ["MyDefine"],
    needAlphaBlending: true,
    needAlphaTesting: true,
  });
