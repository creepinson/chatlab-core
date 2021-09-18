import { Component } from "typed-ecstasy";
import { vec3 } from "gl-matrix";

export class Velocity extends Component {
  constructor(public vel: vec3) {
    super();
  }

  public flipX() {
    this.vel[0] *= -1;
  }

  public flipY() {
    this.vel[1] *= -1;
  }
}
