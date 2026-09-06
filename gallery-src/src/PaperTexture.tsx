import { useEffect } from 'react'

const vertex = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

// Periodic noise makes a seamless sheet, including the long, fine pulp fibres.
const fragment = `
precision highp float;
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p, vec2 period) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(mod(i, period)), hash(mod(i + vec2(1., 0.), period)), u.x),
             mix(hash(mod(i + vec2(0., 1.), period)), hash(mod(i + vec2(1.), period)), u.x), u.y);
}
float scratch(vec2 uv, float scale) {
  vec2 p = uv * scale;
  vec2 cell = floor(p);
  vec2 f = fract(p) - .5;
  float seed = hash(mod(cell, vec2(scale)));
  float angle = seed * 6.28318;
  vec2 axis = vec2(cos(angle), sin(angle));
  float along = dot(f, axis);
  float across = dot(f, vec2(-axis.y, axis.x));
  float line = 1. - smoothstep(.0008, .0045, abs(across));
  float ends = 1. - smoothstep(.15, .45, abs(along));
  return line * ends * step(.43, seed);
}
void main() {
  vec2 uv = gl_FragCoord.xy / 1024.0;
  float cloud = noise(uv * 8., vec2(8.)) * .50
              + noise(uv * 24., vec2(24.)) * .30
              + noise(uv * 64., vec2(64.)) * .20;
  float tooth = noise(uv * 512., vec2(512.));
  float grain = hash(gl_FragCoord.xy);
  float fibreA = noise(uv * vec2(48., 768.), vec2(48., 768.));
  float fibreB = noise(uv * vec2(768., 36.), vec2(768., 36.));
  float fibres = smoothstep(.66, .91, fibreA) * .045
               + smoothstep(.72, .94, fibreB) * .025;
  float flecks = smoothstep(.972, .998, grain) * .08;
  float scuffs = scratch(uv, 12.) * .10 + scratch(uv, 27.) * .07;
  float weave = noise(uv * vec2(256., 768.), vec2(256., 768.));
  float value = .80 + (cloud - .5) * .42 + (tooth - .5) * .19
              + (grain - .5) * .10 + (weave - .5) * .08
              - fibres - flecks + scuffs;
  gl_FragColor = vec4(vec3(clamp(value, .46, 1.)), 1.);
}
`

/** Bake one shader frame into a repeating background; no scroll or animation loop. */
export function PaperTexture() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1024
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: true, depth: false, stencil: false })
    if (!gl) return
    const shaders: WebGLShader[] = []
    let program: WebGLProgram | null = null
    let buffer: WebGLBuffer | null = null
    let cancelled = false
    let textureUrl: string | undefined
    const release = () => {
      if (buffer) gl.deleteBuffer(buffer)
      if (program) gl.deleteProgram(program)
      shaders.forEach(shader => gl.deleteShader(shader))
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
    try {
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)
        if (!shader) throw new Error('Shader unavailable')
        shaders.push(shader)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader compilation failed')
        return shader
      }
      program = gl.createProgram()
      if (!program) throw new Error('WebGL program unavailable')
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex))
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Shader link failed')
      gl.useProgram(program)
      buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      gl.viewport(0, 0, 1024, 1024)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      canvas.toBlob(blob => {
        if (!cancelled && blob) {
          textureUrl = URL.createObjectURL(blob)
          document.documentElement.style.setProperty('--paper-texture', `url("${textureUrl}")`)
          document.documentElement.dataset.paperTexture = 'shader'
        }
        release()
      }, 'image/png')
    } catch {
      // The CSS paper texture remains in place on devices without usable WebGL.
      release()
    }
    return () => {
      cancelled = true
      if (textureUrl) {
        document.documentElement.style.removeProperty('--paper-texture')
        delete document.documentElement.dataset.paperTexture
        URL.revokeObjectURL(textureUrl)
      }
    }
  }, [])
  return null
}
