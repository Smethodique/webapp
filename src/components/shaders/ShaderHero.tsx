import { useEffect, useRef, useState } from 'react';

export type ShaderVariant = 'silk' | 'steam' | 'pulse' | 'petal' | 'dune';

export interface ShaderHeroProps {
  variant: ShaderVariant;
  /** [colorA, colorB] hex strings — mapped to uColorA / uColorB */
  colors?: [string, string];
  intensity?: number;
  className?: string;
  /**
   * Optional external 0→1 scroll progress (lerped internally). Use this when
   * the hero is pinned (its rect stops moving) and progress comes from a
   * ScrollTrigger onUpdate instead of the canvas position.
   */
  scrollProgress?: { current: number };
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const NOISE_LIB = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uIntensity;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v * 0.5 + 0.5;
}
float hash1(float n) { return fract(sin(n) * 43758.5453123); }
vec2 hash2(float n) { return fract(sin(vec2(n, n + 1.37)) * vec2(43758.5453, 22578.145912)); }

float grain(vec2 uv, float amt) {
  float g = fract(sin(dot(uv + fract(uTime), vec2(12.9898, 78.233))) * 43758.5453);
  return (g - 0.5) * amt;
}
float vignette(vec2 uv) {
  return smoothstep(1.25, 0.35, length(uv - 0.5));
}
`;

const FRAGS: Record<ShaderVariant, string> = {
  /* Variant 1 — liquid gold silk */
  silk: `
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  vec2 dm = p - m;
  float md = length(dm);
  p += (dm / max(md, 0.0001)) * 0.15 * smoothstep(0.35, 0.0, md);

  float warpAmp = 1.0 + uScroll * 1.5;
  float n = fbm(p * 2.2 + fbm(p * 3.0 + uTime * 0.05) * 1.4 * warpAmp);

  vec3 ink = vec3(0.039, 0.039, 0.055);
  vec3 ramp = mix(uColorA, uColorB, smoothstep(0.35, 0.85, n));
  vec3 col = mix(ink, ramp, smoothstep(0.16, 0.52, n) * uIntensity);
  col += uColorA * 0.10;
  float band = pow(smoothstep(0.6, 0.75, n) * smoothstep(0.85, 0.75, n), 2.0);
  col += band * uColorB * 1.1;
  col = mix(col, ink, uScroll * 0.7);
  col *= vignette(uv) * 0.35 + 0.65;
  col += grain(uv, 0.03);
  gl_FragColor = vec4(col, 1.0);
}
`,
  /* Variant 2 — steam / rising vapor + particles */
  steam: `
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);

  vec2 sp = p;
  sp.y += uTime * 0.12;
  float amp = 1.0 - uScroll * 0.6;
  float n = fbm(sp * 2.0) * amp;
  float n2 = fbm(sp * 4.5 + vec2(0.0, uTime * 0.05)) * amp;

  vec3 espresso = vec3(0.102, 0.070, 0.047);
  vec3 col = espresso;
  col = mix(col, uColorA, smoothstep(0.45, 0.85, n) * 0.55 * uIntensity);
  col = mix(col, uColorB, smoothstep(0.6, 0.95, n2) * 0.35 * uIntensity);

  float glow = 0.0;
  float rise = 1.0 + uScroll;
  for (int i = 0; i < 48; i++) {
    float fi = float(i);
    vec2 seed = hash2(fi * 7.31);
    float speed = 0.04 + 0.12 * seed.y;
    vec2 pos;
    pos.x = seed.x * aspect + 0.04 * sin(uTime * (0.4 + seed.x) + fi);
    pos.y = fract(seed.y + uTime * speed * rise);
    vec2 rep = pos - m;
    float rd = length(rep);
    pos += (rep / max(rd, 0.0001)) * 0.2 * smoothstep(0.2, 0.0, rd);
    float d = length((p - pos) * vec2(1.0, aspect));
    float r = 0.002 + 0.004 * seed.x;
    float fade = smoothstep(0.0, 0.15, pos.y) * smoothstep(1.0, 0.8, pos.y);
    glow += smoothstep(r, 0.0, d) * 0.5 * fade;
  }
  col += uColorB * glow * 0.5;
  col *= vignette(uv) * 0.4 + 0.6;
  col += grain(uv, 0.03);
  gl_FragColor = vec4(col, 1.0);
}
`,
  /* Variant 3 — pulse / glitch energy */
  pulse: `
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec3 ink = vec3(0.043, 0.051, 0.039);
  float t = uTime;

  float cell = floor(t * 0.8);
  float h = hash1(cell);
  float burst = step(0.72, fract(h * 7.13)) * clamp(0.5 + uScroll * 1.5, 0.0, 1.6);

  float bandIdx = floor(uv.y * 24.0);
  float shift = (hash1(bandIdx + cell * 17.0) - 0.5) * 0.08 * burst;

  vec2 m = uMouse;
  float mouseD = length((uv - m) * vec2(uRes.x / uRes.y, 1.0));
  float mouseBoost = smoothstep(0.35, 0.0, mouseD);
  float ab = 0.008 * (1.0 + burst * 3.0) * (1.0 + mouseBoost * 1.5);

  vec2 buv = vec2(uv.x + shift, uv.y);
  float nC = fbm(vec2(buv.x * 4.0, buv.y * 10.0 + t * 0.6));
  float nR = fbm(vec2((buv.x + ab) * 4.0, buv.y * 10.0 + t * 0.6));
  float nB = fbm(vec2((buv.x - ab) * 4.0, buv.y * 10.0 + t * 0.6));

  float lC = step(0.97, fract(buv.y * 40.0 + nC));
  float lR = step(0.97, fract(buv.y * 40.0 + nR));
  float lB = step(0.97, fract(buv.y * 40.0 + nB));

  float beat = pow(0.5 + 0.5 * sin(t * 1.2), 8.0);
  vec3 volt = uColorB;
  vec3 col = ink * (0.85 + beat * 0.3);
  col += volt * lC * (0.35 + beat * 0.65) * uIntensity;
  col.r += lR * burst * 0.35;
  col.b += lB * burst * 0.35;
  col += volt * mouseBoost * 0.05;
  col += nC * 0.04;

  col = mix(col, ink, step(0.9, uScroll));
  col *= vignette(uv) * 0.35 + 0.65;
  col += grain(uv, 0.03);
  gl_FragColor = vec4(col, 1.0);
}
`,
  /* Variant 4 — petal cinematic drift */
  petal: `
mat2 rot(float a) { float c = cos(a); float s = sin(a); return mat2(c, -s, s, c); }
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);

  float n = fbm(p * 1.6 + vec2(uTime * 0.02, 0.0));
  vec3 warmInk = vec3(0.078, 0.066, 0.078);
  vec3 col = warmInk;
  col = mix(col, uColorA, smoothstep(0.4, 0.9, n) * 0.30 * uIntensity);
  col = mix(col, uColorB, smoothstep(0.55, 0.95, fbm(p * 2.6 - uTime * 0.015)) * 0.22 * uIntensity);

  /* god rays — two diagonal bands */
  vec2 ruv = rot(0.6) * (uv - 0.5);
  float rays = smoothstep(0.06, 0.0, abs(ruv.x - 0.12)) + smoothstep(0.10, 0.0, abs(ruv.x + 0.22));
  col += vec3(0.89, 0.73, 0.31) * rays * 0.08 * (1.0 - uScroll * 0.8);

  float drift = 1.0 + uScroll;
  for (int i = 0; i < 24; i++) {
    float fi = float(i);
    vec2 seed = hash2(fi * 3.77);
    float scale = 0.3 + 0.7 * seed.x;
    float speed = 0.015 + 0.03 * seed.y;
    vec2 pos;
    pos.y = fract(seed.y - uTime * speed * drift);
    pos.x = fract(seed.x + uTime * speed * 0.4 * drift) * aspect;
    pos.x += sin(uTime * (0.3 + seed.y * 0.5) + fi * 2.1) * 0.05 * scale;
    vec2 rep = pos - m;
    float rd = length(rep);
    pos += (rep / max(rd, 0.0001)) * 0.12 * smoothstep(0.18, 0.0, rd);

    vec2 q = (p - pos);
    q = rot(uTime * 0.15 * (seed.x - 0.5) + fi) * q;
    q /= 0.045 * scale;
    /* petal SDF: pinched ellipse */
    float petal = length(vec2(q.x * (1.0 + abs(q.y) * 0.6), q.y * 0.8)) - 1.0;
    float alpha = smoothstep(0.12, -0.25, petal) * (0.28 + 0.35 * seed.y) * (1.15 - scale * 0.5);
    col = mix(col, mix(uColorA, uColorB, seed.y), alpha * 0.6);
  }
  col *= vignette(uv) * 0.4 + 0.6;
  col += grain(uv, 0.03);
  gl_FragColor = vec4(col, 1.0);
}
`,
  /* Variant 5 — dune terracotta strata */
  dune: `
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float compress = 1.0 - uScroll * 0.45;
  vec2 p = vec2(uv.x * aspect, (uv.y - 0.5) * compress + 0.5);
  p.x += uMouse.x * 0.3;

  float n = fbm(vec2(p.x * 3.0, p.y * 6.0 - uTime * 0.03));
  float steps = floor(n * 12.0) / 12.0;

  vec3 sand = vec3(0.910, 0.835, 0.718);
  vec3 terra = uColorA;
  vec3 umber = vec3(0.360, 0.227, 0.157);
  vec3 ink = vec3(0.039, 0.039, 0.055);
  vec3 col = ink;
  col = mix(col, umber, smoothstep(0.15, 0.45, steps));
  col = mix(col, terra, smoothstep(0.45, 0.72, steps));
  col = mix(col, mix(sand, uColorB, 0.35), smoothstep(0.72, 0.95, steps));
  col *= 0.55 + 0.45 * uIntensity;
  col *= vignette(uv) * 0.45 + 0.55;
  col += grain(uv, 0.06);
  gl_FragColor = vec4(col, 1.0);
}
`,
};

const DEFAULT_COLORS: Record<ShaderVariant, [string, string]> = {
  silk: ['#6E1423', '#D8B25C'],
  steam: ['#C96F4A', '#F3E7D7'],
  pulse: ['#0B0D0A', '#D6FF3F'],
  petal: ['#EAD3CE', '#F8F1EC'],
  dune: ['#C96F4A', '#E8D5B7'],
};

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const v = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

function shouldUseStaticFallback(): boolean {
  if (typeof navigator === 'undefined') return true;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return true;
  if ((nav.hardwareConcurrency ?? 8) < 4) return true;
  return false;
}

export default function ShaderHero({ variant, colors, intensity = 1, className, scrollProgress }: ShaderHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [staticFallback] = useState(shouldUseStaticFallback);

  useEffect(() => {
    if (staticFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) {
      setFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('ShaderHero compile error:', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, NOISE_LIB + FRAGS[variant]);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u('uRes');
    const uTime = u('uTime');
    const uMouse = u('uMouse');
    const uScroll = u('uScroll');
    const uColorA = u('uColorA');
    const uColorB = u('uColorB');
    const uIntensity = u('uIntensity');

    const [ca, cb] = colors ?? DEFAULT_COLORS[variant];
    gl.uniform3fv(uColorA, hexToVec3(ca));
    gl.uniform3fv(uColorB, hexToVec3(cb));
    gl.uniform1f(uIntensity, intensity);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mouseTX = 0.5;
    let mouseTY = 0.5;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let scrollT = 0;
    let scrollV = 0;
    let visible = true;
    let raf = 0;
    const start = performance.now();

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseTX = (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouseTY = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1);
    };
    const onScroll = () => {
      if (scrollProgress) return;
      const rect = canvas.getBoundingClientRect();
      const total = rect.height * 1.2;
      scrollT = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const draw = (t: number) => {
      mouseX += (mouseTX - mouseX) * 0.06;
      mouseY += (mouseTY - mouseY) * 0.06;
      if (scrollProgress) scrollT = scrollProgress.current;
      scrollV += (scrollT - scrollV) * 0.08;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform1f(uScroll, scrollV);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduced) {
      draw(0);
    } else {
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        draw((performance.now() - start) / 1000);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [variant, colors, intensity, staticFallback, scrollProgress]);

  const showFallback = failed || staticFallback;

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} aria-hidden="true">
      {/* CSS fallback always sits beneath the canvas: covers first paint, GPU-less environments and context loss */}
      <div className={`shader-fallback shader-fallback--${variant}`} />
      {!showFallback && (
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      )}
    </div>
  );
}

export { DEFAULT_COLORS };
