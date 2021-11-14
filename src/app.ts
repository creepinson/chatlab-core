import "@abraham/reflection";
import { mat4, vec3 } from "gl-matrix";
import { Engine } from "typed-ecstasy";
import { createBasicShader } from "./shaders/basic";
import { Transform } from "./components";
import { Renderable } from "./components/renderable";

export class App {
  protected readonly engine: Engine;

  loop = true;

  constructor(public readonly gl: WebGL2RenderingContext) {
    this.engine = new Engine();
  }

  get entityManager() {
    return this.engine.entities;
  }

  start() {
    requestAnimationFrame(this.run.bind(this));
  }

  render() {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    const shader = createBasicShader(this.gl);

    let cameraMatrix = mat4.perspective(
      mat4.create(),
      Math.PI / 4,
      this.gl.drawingBufferWidth / this.gl.drawingBufferHeight,
      0.1,
      1000
    );
    cameraMatrix = mat4.mul(
      mat4.create(),
      cameraMatrix,
      mat4.fromTranslation(mat4.create(), vec3.fromValues(0, 0, -5))
    );

    for (const entity of this.entityManager.getAll()) {
      const transform = entity.get(Transform);

      if (!transform) continue;

      const renderable = entity.get(Renderable);
      // Make sure the entity has a renderable component before rendering it
      if (!renderable) continue;

      // TODO: shader should be a component

      shader.use();
      shader.uModelMatrix.set(false, transform.createMatrix());
      shader.uCameraMatrix.set(false, cameraMatrix);
      shader.inPosition.enable();
      shader.inPosition.set(3, this.gl.FLOAT, false, 0, 0);
      shader.uColor.setV(renderable.material.color);

      renderable.model.draw();
    }
  }

  run(time: number) {
    this.engine.update(time);
    this.render();

    if (this.loop) requestAnimationFrame(this.run.bind(this));
  }
}

export const createApp = <T extends App>(appConstructor: {
  new (gl: WebGL2RenderingContext): T;
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;

  const gl = canvas.getContext("webgl2");

  if (!gl) throw new Error("WebGL failed to initialize");

  const app = new appConstructor(gl);

  return { app, gl, canvas };
};
