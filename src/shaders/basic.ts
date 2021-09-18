import { createShaderProgram, glsl } from "typed-glsl";

export const createBasicShader = (gl: WebGL2RenderingContext) => {
  const vertexShader = glsl`#version 300 es
  #pragma vscode_glsllint_stage: vert

  in vec3 inPosition;

  uniform mat4 uCameraMatrix;
  uniform mat4 uModelMatrix;
  uniform vec4 uColor;

  out vec4 color;

  void main() {
    color = uColor;
    gl_Position = uCameraMatrix * uModelMatrix * vec4(inPosition, 1.0);
  }
  `;

  const fragmentShader = glsl`#version 300 es
  #pragma vscode_glsllint_stage: vert

  precision highp float;

  in vec4 color;

  out vec4 outColor;

  void main() {
    outColor = color;
  }
  `;

  return createShaderProgram(gl, vertexShader, fragmentShader, {
    uCameraMatrix: "uniformMatrix4f",
    uModelMatrix: "uniformMatrix4f",
    inPosition: "vertexAttribPointer",
    uColor: "uniform4f",
  });
};
