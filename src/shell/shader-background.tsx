"use client";

import { useEffect, useRef } from "react";

// Ported from "keshi backgrounds/{dark,light}/keshi Background *.dc.html".
// Single WebGL wave/relief shader; the dark and light palettes are selected by
// the u_light uniform (0 = dark, 1 = light), driven by the active theme.
const VERT = `
  attribute vec2 p;
  void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform float u_light; // 0 = dark, 1 = light

  // palette — near-black charcoal with a whisper of cool blue-grey
  vec3 c0 = vec3(0.027, 0.031, 0.039); // #070810 deep base
  vec3 c1 = vec3(0.055, 0.066, 0.086); // #0e111620 charcoal
  vec3 c2 = vec3(0.094, 0.110, 0.137); // #181c23 muted slate
  vec3 cg = vec3(0.180, 0.220, 0.275); // #2e3846 desaturated blue-grey

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }

  // wave height field — slow, abstract, self-mixing flow
  float waveField(vec2 cuv, float time){
    cuv.x = cuv.x; // no mirror -> major waves on the LEFT
    float t = time * 0.28;
    // very slight rotation only — avoid concentric "U" arcs
    float a = t * 0.05;
    mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 p = rot * (cuv - 0.5) + 0.5;

    // weight undulation toward screen-left
    float leftBias = 0.85 + 0.55 * (1.0 - p.x);

    // first warp layer — larger, slower domain warp for liquid motion
    float w1 = (sin(p.x * 1.1 + t * 0.6 + sin(p.y*0.7 - t*0.25)*1.0) * 0.55
             +  sin(p.y * 1.4 - t * 0.38 + sin(p.x*0.9 + t*0.3)*1.1) * 0.45) * leftBias;
    // second warp folds the first back on itself -> organic mixing
    float w2 = (sin((p.y + w1*1.5) * 1.0 + t * 0.3) * 0.45
             +  sin((p.x - w1*1.2) * 0.85 - t * 0.22 + w1*1.3) * 0.38) * leftBias;
    // third warp feeds on the previous two -> ever-shifting, non-rigid flow
    float w3 = sin((p.x * 2.0 - p.y * 1.3) + t * 0.16 + w1 * 2.0 + w2 * 1.2) * 0.30
             + sin((p.y * 2.6 + p.x * 0.7) - t * 0.12 + w2 * 1.8) * 0.20;

    // open, warped flow — different direction so motion reads fresh
    float d = p.x * 0.55 + p.y * 0.82 + (w1 + w2 + w3) * 1.9 + 6.5;
    // fewer, bigger waves — crests travel continuously so it never goes static
    float n = sin(d * 7.0 + t * 1.3 + w2 * 0.9);
    n += sin(d * 11.0 - t * 1.0 + w1 * 1.6) * 0.34;
    n += sin(d * 16.0 + t * 0.7 + w3 * 1.4) * 0.13;
    // taller crests on the left, calmer toward the right
    float leftAmp = 0.55 + 0.70 * (1.0 - p.x);
    return n * 0.86 * leftAmp;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    // correct aspect so the wave isn't stretched
    float aspect = u_res.x / u_res.y;
    vec2 cuv = (uv - 0.5) * vec2(aspect, 1.0) + 0.5;

    float time = u_time;
    // pulsing intensity — exactly like the reference code
    float intensity = 1.0 + sin(time * 2.0) * 0.3;

    // flowing diagonal waves (no diamond lattice)
    float noise = waveField(cuv, time);

    // --- relief lighting: derive a surface normal from the height field ---
    float e = 1.2 / u_res.y;
    float hx = waveField(cuv + vec2(e, 0.0), time) - waveField(cuv - vec2(e, 0.0), time);
    float hy = waveField(cuv + vec2(0.0, e), time) - waveField(cuv - vec2(0.0, e), time);
    // smaller z = steeper, more pronounced relief (broader = connected sheets)
    vec3 normal = normalize(vec3(-hx, -hy, 0.05));
    vec3 lightDir = normalize(vec3(-0.55, 0.75, 0.55));
    float diff = max(dot(normal, lightDir), 0.0);
    // tight specular highlight for sculpted crests
    float spec = pow(diff, 22.0);

    // ===== DARK palette rendering =====
    vec3 color1 = c1;          // charcoal navy
    vec3 color2 = mix(c2, cg, 0.6); // slate / cool glow
    vec3 colD = mix(color1, color2, noise * 0.5 + 0.5);
    colD *= 0.45 + diff * 1.3;
    colD += cg * spec * 0.4 * intensity;
    colD = mix(colD, cg * 1.5, pow(abs(noise), 2.5) * 0.18 * intensity);
    // platinum glints — soft, broad, no hard white lines
    vec3 platinum = vec3(0.88, 0.90, 0.95);
    float plat = pow(diff, 18.0);
    float band = smoothstep(0.5, 1.0, sin(noise * 3.0 + uv.x * 2.0 - time * 0.5) * 0.5 + 0.5);
    plat *= 0.5 + 0.5 * band;
    colD += platinum * plat * 0.22 * intensity;
    float vigD = 1.0 - length((uv - 0.5) * vec2(1.05, 1.1)) * 0.95;
    vigD = clamp(vigD, 0.0, 1.0); vigD = pow(vigD, 1.3);
    colD = mix(c0, colD, 0.4 + 0.6 * vigD);

    // ===== LIGHT palette rendering — white with cool light-grey flow =====
    vec3 lbase = vec3(1.0, 1.0, 1.0);          // pure white
    vec3 lfold = vec3(0.930, 0.933, 0.938);    // light grey fold (a touch more visible)
    vec3 colL = mix(lbase, lfold, noise * 0.5 + 0.5);
    // gentle relief — stays white, waves read a bit more
    colL *= 0.968 + diff * 0.07;
    colL -= vec3(0.026, 0.026, 0.029) * (1.0 - diff); // faint shadow in valleys
    // --- platinum reflections (cool silvery sheen on the crests) ---
    vec3 platL = vec3(0.78, 0.81, 0.88);
    float platl = pow(diff, 55.0);
    float bandl = smoothstep(0.55, 1.0, sin(noise * 3.0 + uv.x * 2.0 - time * 0.5) * 0.5 + 0.5);
    platl *= 0.6 + 0.4 * bandl;
    // tint toward cool platinum on the brightest crests, then a white spark
    colL = mix(colL, platL, platl * 0.18 * intensity);
    colL += vec3(0.06) * pow(max(platl, 0.0), 2.0) * intensity;
    float vigL = 1.0 - length((uv - 0.5) * vec2(1.05, 1.1)) * 0.6;
    vigL = clamp(vigL, 0.0, 1.0);
    colL = mix(vec3(0.988, 0.989, 0.992), colL, 0.62 + 0.38 * vigL);

    vec3 col = mix(colD, colL, u_light);

    // subtle film grain (lighter in light mode)
    float grain = hash(gl_FragCoord.xy + u_time) - 0.5;
    col += grain * mix(0.015, 0.006, u_light);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uLight = gl.getUniformLocation(prog, "u_light");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const start = performance.now() - 14000; // begin mid-flow so it's never static at load
    const frame = () => {
      const isDark = document.documentElement.classList.contains("dark");
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform1f(uLight, isDark ? 0.0 : 1.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // prefers-reduced-motion: un solo fotogramma, ridisegnato solo su resize e cambio
    // tema (classe di <html>), nessun loop. Altrimenti loop rAF, fermato quando la
    // scheda è nascosta e ripreso quando torna visibile.
    const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const loop = () => { frame(); raf = requestAnimationFrame(loop); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    const play = () => { if (!raf) loop(); };

    const onResize = () => { resize(); if (reduce) frame(); };
    window.addEventListener("resize", onResize);
    const onVisibility = () => { if (reduce) return; if (document.hidden) stop(); else play(); };
    document.addEventListener("visibilitychange", onVisibility);
    const themeObserver = reduce ? new MutationObserver(() => frame()) : null;
    themeObserver?.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (reduce) frame();
    else if (!document.hidden) loop();

    return () => {
      stop();
      themeObserver?.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full scale-110 opacity-90 blur-[2px] dark:blur-[12px]"
    />
  );
}
