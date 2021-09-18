import { vec3, vec4 } from "gl-matrix";
import { Entity } from "typed-ecstasy";
import { App, createCube, Renderable, Transform } from "../../src";

export class ExampleApp extends App {
  constructor(gl: WebGL2RenderingContext) {
    super(gl);
    const testEntity = new Entity();
    testEntity.add(new Transform(vec3.fromValues(0, 0, 0)));
    testEntity.add(
      new Renderable(createCube(gl), {
        color: vec4.fromValues(1, 0, 0, 1),
      })
    );
    this.entityManager.add(testEntity);
  }
}
