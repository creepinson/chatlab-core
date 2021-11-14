import { vec4 } from "gl-matrix";

/**
 * A model contains the original mesh data,
 * and the buffers needed to create the primitive.
 */
export interface Model {
  buffer: WebGLBuffer | null;
  mesh: Mesh;
  draw(): void;
}

/**
 * A mesh contains the data needed to create a primitive.
 */
export interface Mesh {
  vertices: Float32Array;
  indices?: Uint16Array;
}

export interface Material {
  color: vec4;
}

export const createDefaultMaterial = (): Material => ({
  color: vec4.fromValues(1, 1, 1, 1),
});

export const createTriangleMesh = (): Mesh => ({
  vertices: new Float32Array([
    // x, y, z,
    -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
  ]),
});

export const createTriangle = (gl: WebGL2RenderingContext): Model => {
  const mesh = createTriangleMesh();
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(mesh.vertices),
    gl.STATIC_DRAW
  );

  return {
    buffer,
    mesh,
    draw: () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.drawArrays(gl.TRIANGLES, 0, mesh.vertices.length / 3);
    },
  };
};

export const createSquareMesh = (): Mesh => ({
  vertices: new Float32Array([
    // x, y, z,
    -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0,
  ]),
  indices: new Uint16Array([0, 1, 2, 0, 2, 3]),
});

export const createSquare = (gl: WebGL2RenderingContext): Model => {
  const { vertices, indices } = createSquareMesh();
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    indices ?? new Float32Array(),
    gl.STATIC_DRAW
  );

  return {
    buffer,
    mesh: { vertices, indices },
    draw: () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.drawElements(gl.TRIANGLES, indices?.length ?? 0, gl.UNSIGNED_SHORT, 0);
    },
  };
};

export const createCubeMesh = (): Mesh => ({
  vertices: new Float32Array([
    // x, y, z,
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
    -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1,
    1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1,
    -1, 1, 1, 1, 1, 1, 1, 1, -1,
  ]),
  indices: new Uint16Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
    15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
  ]),
});

export const createCube = (gl: WebGL2RenderingContext): Model => {
  const { vertices, indices } = createCubeMesh();
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    indices ?? new Float32Array(),
    gl.STATIC_DRAW
  );

  return {
    buffer,
    mesh: { vertices, indices },
    draw: () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.drawElements(gl.TRIANGLES, indices?.length ?? 0, gl.UNSIGNED_SHORT, 0);
    },
  };
};
