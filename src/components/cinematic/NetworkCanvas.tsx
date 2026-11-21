import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * Fixed full-screen background canvas.
 * A glowing particle network whose camera evolves with page scroll progress:
 *  0.00–0.12 hero constellation (slow rotation, orbiting product nodes)
 *  0.12–0.28 z-axis dolly through the network (warp)
 *  0.28–0.50 light pulses flowing along connections
 *  0.50–0.85 settle + dim behind product content
 *  0.85–1.00 converge toward the final CTA (closing loop)
 * 2D canvas fallback (no WebGL dependency), DPR capped at 2, pauses when
 * the tab is hidden or the user prefers reduced motion.
 */

type Node = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
};

type OrbitNode = {
  label: string;
  angle: number;
  radius: number;
  speed: number;
  color: string;
};

const ORBIT_NODES: OrbitNode[] = [
  { label: "Firecrawl", angle: 0, radius: 1, speed: 0.14, color: "#22D3EE" },
  { label: "Claude MCP", angle: 1.25, radius: 1, speed: 0.11, color: "#8B5CF6" },
  { label: "Sheets", angle: 2.5, radius: 1, speed: 0.16, color: "#34D399" },
  { label: "WhatsApp", angle: 3.75, radius: 1, speed: 0.12, color: "#A78BFA" },
  { label: "Instagram", angle: 5.1, radius: 1, speed: 0.15, color: "#F472B6" },
];

const VIOLET = "139, 92, 246";
const CYAN = "34, 211, 238";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionQuery.matches) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const NODE_COUNT = mobile ? 34 : 78;
    const LINK_DIST = mobile ? 110 : 130;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let progress = 0; // smoothed page progress 0..1
    let targetProgress = 0;
    let mx = 0;
    let my = 0; // parallax targets
    let pmx = 0;
    let pmy = 0; // parallax smoothed
    let time = 0;
    let pulses: { a: number; b: number; t: number; speed: number }[] = [];

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random() * 2 - 1,
      vx: (Math.random() - 0.5) * 0.0016,
      vy: (Math.random() - 0.5) * 0.0016,
      vz: (Math.random() - 0.5) * 0.001,
      r: 1 + Math.random() * 1.8,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    };

    const onPointer = (e: PointerEvent) => {
      mx = (e.clientX / width - 0.5) * 2;
      my = (e.clientY / height - 0.5) * 2;
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(frame);
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    let lastTime = 0;
    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const dt = lastTime ? Math.min(48, now - lastTime) : 16;
      lastTime = now;
      time += dt * 0.001;

      progress = lerp(progress, targetProgress, 0.06);
      pmx = lerp(pmx, mx, 0.05);
      pmy = lerp(pmy, my, 0.05);

      const p = progress;
      const warp = clamp((p - 0.1) / 0.16, 0, 1); // dolly amount
      const dim = clamp((p - 0.5) / 0.15, 0, 1) * (1 - clamp((p - 0.85) / 0.1, 0, 1));
      const converge = clamp((p - 0.85) / 0.15, 0, 1);
      const baseAlpha = (1 - dim * 0.78) * (1 - warp * 0.25);

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * (mobile ? 0.32 : 0.42);
      const dolly = 1 + warp * 2.6; // camera flies through
      const spin = time * 0.06 + p * Math.PI * 1.4;

      // converge target: center of the final CTA band (slightly above middle)
      const targetX = cx;
      const targetY = cy + Math.sin(time * 0.6) * 6;

      ctx.clearRect(0, 0, width, height);

      // project nodes
      const pts: { x: number; y: number; a: number; r: number }[] = [];
      const cos = Math.cos(spin);
      const sin = Math.sin(spin);

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.z += n.vz * dt;
        if (n.x > 1 || n.x < -1) n.vx *= -1;
        if (n.y > 1 || n.y < -1) n.vy *= -1;
        if (n.z > 1 || n.z < -1) n.vz *= -1;

        // rotate around Y then apply perspective + dolly
        const rx = n.x * cos - n.z * sin;
        const rz = n.x * sin + n.z * cos;
        const zCam = (rz + 1.6) * dolly;
        const perspective = 1.6 / Math.max(0.35, zCam);
        let x = cx + rx * scale * perspective + pmx * 26 * (1 - warp);
        let y = cy + n.y * scale * perspective + pmy * 20 * (1 - warp);

        if (converge > 0) {
          const jitter = Math.sin(time * 3 + n.x * 12) * 8 * (1 - converge);
          x = lerp(x, targetX + jitter, converge * 0.92);
          y = lerp(y, targetY + jitter * 0.6, converge * 0.92);
        }

        pts.push({
          x,
          y,
          a: clamp(perspective * 0.85, 0.15, 1) * baseAlpha,
          r: n.r * clamp(perspective, 0.5, 1.6),
        });
      }

      // links
      const linkAlpha = baseAlpha * (0.32 + warp * 0.3 + converge * 0.25);
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i += 1) {
        for (let j = i + 1; j < pts.length; j += 1) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          const maxD = LINK_DIST * (1 + warp * 1.6);
          if (d2 > maxD * maxD) continue;
          const alpha = (1 - Math.sqrt(d2) / maxD) * linkAlpha;
          if (alpha < 0.02) continue;
          ctx.strokeStyle = `rgba(${VIOLET},${alpha * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }

      // light pulses along random links (scene 3)
      const pulseStrength = clamp((p - 0.26) / 0.1, 0, 1) * (1 - clamp((p - 0.62) / 0.1, 0, 1)) + converge * 0.8;
      if (pulseStrength > 0.05) {
        const wanted = Math.round(pulseStrength * (mobile ? 6 : 14));
        while (pulses.length < wanted) {
          pulses.push({
            a: (Math.random() * pts.length) | 0,
            b: (Math.random() * pts.length) | 0,
            t: Math.random(),
            speed: 0.0004 + Math.random() * 0.0008,
          });
        }
        if (pulses.length > wanted) pulses.length = wanted;
        for (const pulse of pulses) {
          pulse.t += pulse.speed * dt;
          if (pulse.t > 1) {
            pulse.t = 0;
            pulse.a = (Math.random() * pts.length) | 0;
            pulse.b = (Math.random() * pts.length) | 0;
          }
          const A = pts[pulse.a];
          const B = pts[pulse.b];
          if (!A || !B) continue;
          const px = lerp(A.x, B.x, pulse.t);
          const py = lerp(A.y, B.y, pulse.t);
          const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
          g.addColorStop(0, `rgba(${CYAN},${0.85 * pulseStrength})`);
          g.addColorStop(1, `rgba(${CYAN},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        pulses = [];
      }

      // nodes
      for (const pt of pts) {
        const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.r * 4);
        g.addColorStop(0, `rgba(${VIOLET},${0.9 * pt.a})`);
        g.addColorStop(1, `rgba(${VIOLET},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(237,233,250,${0.85 * pt.a})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // hero orbiting product nodes with labels (fade out after warp)
      const orbitAlpha = (1 - clamp((p - 0.08) / 0.1, 0, 1)) * (1 - converge * 0.6);
      if (orbitAlpha > 0.02) {
        const orbitR = scale * (mobile ? 0.72 : 0.95) * (1 - warp * 0.7);
        const font = mobile ? 10 : 11;
        ctx.font = `600 ${font}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // links from centre to each orbit node
        for (const node of ORBIT_NODES) {
          const a = node.angle + time * node.speed;
          const ox = cx + Math.cos(a) * orbitR + pmx * 14;
          const oy = cy + Math.sin(a) * orbitR * 0.62 + pmy * 10;
          ctx.strokeStyle = `rgba(${CYAN},${0.28 * orbitAlpha})`;
          ctx.setLineDash([4, 6]);
          ctx.lineDashOffset = -time * 20;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ox, oy);
          ctx.stroke();
          ctx.setLineDash([]);

          const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 14);
          g.addColorStop(0, `${node.color}${Math.round(orbitAlpha * 200).toString(16).padStart(2, "0")}`);
          g.addColorStop(1, `${node.color}00`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(ox, oy, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(ox, oy, 3.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(226,232,240,${0.92 * orbitAlpha})`;
          ctx.fillText(node.label, ox, oy - 16);
        }

        // centre halo (logo node)
        const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, mobile ? 54 : 72);
        halo.addColorStop(0, `rgba(${VIOLET},${0.34 * orbitAlpha})`);
        halo.addColorStop(1, `rgba(${VIOLET},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, mobile ? 54 : 72, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full"
    />
  );
}
