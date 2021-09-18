import { mat4, vec3 } from "gl-matrix";
import { Component } from "typed-ecstasy";

/**
 * A component that can be used to transform an entity.
 * Takes in a position, rotation, and scale.
 */
export class Transform extends Component {
  public position: vec3;
  public rotation: vec3;
  public scale: vec3;

  constructor(position?: vec3, rotation?: vec3, scale?: vec3) {
    super();

    this.position = position ?? vec3.fromValues(0, 0, 0);
    this.rotation = rotation ?? vec3.fromValues(0, 0, 0);
    this.scale = scale ?? vec3.fromValues(1, 1, 1);
  }

  /**
   *
   * @returns A new matrix that represents the transformation (model) matrix of this transform.
   */
  createMatrix() {
    const matrix = mat4.create();
    mat4.translate(matrix, matrix, this.position);
    mat4.rotateX(matrix, matrix, this.rotation[0]);
    mat4.rotateY(matrix, matrix, this.rotation[1]);
    mat4.rotateZ(matrix, matrix, this.rotation[2]);
    mat4.scale(matrix, matrix, this.scale);
    return matrix;
  }
}
