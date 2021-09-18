import { Component } from "typed-ecstasy";
import { createDefaultMaterial, Material, Model as Model } from "../model";

/**
 * A renderable component.
 * Used to define properties that can be used to render a model.
 */
export class Renderable extends Component {
  model: Model;
  material: Material;

  constructor(mesh: Model, material: Material = createDefaultMaterial()) {
    super();
    this.model = mesh;
    this.material = material;
  }
}
