"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Looping hero visual: a mocked live pricing dashboard where a competitor's
 * price ticks down, another ticks up, and a "sync sweep" resets the board —
 * illustrating the 3-hour live refresh cycle.
 *
 * Ported from a design-tool animation export (dean-hero.jsx). The original
 * ran inside an authoring harness (CompositionStage/useComposition, a tweak
 * panel, a scrubber). Those are dropped here in favor of a plain
 * requestAnimationFrame loop, fixed defaults, and a responsive scale wrapper
 * so it can drop straight into a Next.js page.
 */

const INK = "#f2ecdf";
const MUTED = "#9a9184";
const LINE = "#332f27";
const PANEL = "#1c1a15";
const BGPAGE = "#121110";
const DOWN = "oklch(0.78 0.135 85)";
const UP = "oklch(0.62 0.135 40)";
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
const WORDFONT = `var(--font-display), ${FONT}`;

const ROW_H = 96;
const ROW_GAP = 14;
const HEAD_H = 118;
const PANEL_W = 860;
const PAD = 36;
const PANEL_H = HEAD_H + PAD + 4 * ROW_H + 3 * ROW_GAP + PAD;
const PANEL_TOP = (720 - PANEL_H) / 2;
const rowCenterY = (i: number) => PANEL_TOP + HEAD_H + i * (ROW_H + ROW_GAP) + ROW_H / 2;

const CARDS = [
  { name: "Northgate Grocer", meta: "Mill Street · 0.8 km", base: 12.4 },
  { name: "Bayview Market", meta: "Harbour Road · 1.4 km", base: 13.1 },
  { name: "Cedar & Co.", meta: "Old Town · 2.1 km", base: 12.75 },
  { name: "Halston Foods", meta: "Ring Road · 3.6 km", base: 13.6 },
];

// ── scene timing (ported from the original OM_SCENES config) ──────────────
const SCENES = [
  { name: "Idle", dur: 1.8 },
  { name: "Drop", dur: 2.6 },
  { name: "Hold", dur: 1.8 },
  { name: "Rise", dur: 2.2 },
  { name: "Sync", dur: 1.6 },
] as const;

const CUES = (() => {
  const out: Record<string, number> = {};
  let t = 0;
  for (const s of SCENES) {
    out[s.name] = t;
    t += s.dur;
  }
  return out;
})();
const TOTAL = SCENES.reduce((sum, s) => sum + s.dur, 0);

// ── easing + tween helpers ──────────────────────────────────────────────
const Easing = {
  linear: (t: number) => t,
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}: {
  from?: number;
  to?: number;
  start?: number;
  end?: number;
  ease?: (t: number) => number;
}) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

const MOTION = {
  glide: Easing.easeInOutCubic,
  settle: Easing.easeOutQuart,
  fade: Easing.easeInOutSine,
};

// trapezoid envelope: 0 -> 1 (a..b) -> hold -> 0 (c..d)
function env(T: number, a: number, b: number, c: number, d: number) {
  if (T <= a || T >= d) return 0;
  if (T < b) return MOTION.settle((T - a) / (b - a));
  if (T <= c) return 1;
  return 1 - MOTION.fade((T - c) / (d - c));
}
// single 0 -> 1 ramp
const ramp = (T: number, a: number, b: number, ease?: (t: number) => number) => {
  if (T <= a) return 0;
  if (T >= b) return 1;
  return (ease || MOTION.glide)((T - a) / (b - a));
};

/** Drives a looping authored-time value via requestAnimationFrame. */
function useLoopTime(total: number) {
  const [T, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    function tick(ts: number) {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ((ts - startRef.current) / 1000) % total;
      setT(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [total]);

  return T;
}

/** Scales the fixed 1280x720 stage to fill its responsive container. */
function useStageScale(width: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setScale(w / width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return { ref, scale };
}

function DeanPiece({ T }: { T: number }) {
  const glow = 1;
  const showBadges = true;
  const density: string = "comfortable";

  const EV = [
    { i: 0, t: CUES.Drop, to: 11.9 },
    { i: 1, t: CUES.Rise, to: 13.35 },
  ];
  const sync = CUES.Sync;

  const priceOf = (i: number) => {
    const ev = EV.find((e) => e.i === i);
    const base = CARDS[i].base;
    if (!ev) return base;
    const down = animate({ from: base, to: ev.to, start: ev.t + 0.35, end: ev.t + 1.3, ease: MOTION.settle })(T);
    const back = animate({
      from: 0,
      to: 1,
      start: sync + 0.35 + i * 0.16,
      end: sync + 1.05 + i * 0.16,
      ease: MOTION.glide,
    })(T);
    return down + (base - down) * back;
  };
  const activeOf = (i: number) => {
    const ev = EV.find((e) => e.i === i);
    if (!ev) return 0;
    return env(T, ev.t + 0.15, ev.t + 0.55, ev.t + 1.7, ev.t + 2.35) * glow;
  };
  const badgeOf = (i: number) => {
    const ev = EV.find((e) => e.i === i);
    if (!ev || !showBadges) return 0;
    return env(T, ev.t + 0.55, ev.t + 1.0, ev.t + 1.75, ev.t + 2.3);
  };

  let camScale = 1;
  let camY = 720 / 2;
  const pushDrop = env(T, CUES.Drop + 0.1, CUES.Drop + 0.9, CUES.Drop + 1.8, CUES.Drop + 2.5);
  const pushRise = env(T, CUES.Rise + 0.05, CUES.Rise + 0.85, CUES.Rise + 1.5, CUES.Rise + 2.1);
  const w0 = MOTION.fade(pushDrop);
  const w1 = MOTION.fade(pushRise);
  camScale = 1 + 0.055 * (w0 + w1);
  camY = (720 / 2) * (1 - w0 - w1) + rowCenterY(0) * w0 + rowCenterY(1) * w1;
  const drift = 1 + 0.008 * Math.sin((T / TOTAL) * Math.PI * 2);

  const cycle =
    T < sync + 0.2
      ? ramp(T, 0, sync + 0.2, Easing.linear)
      : 1 - ramp(T, sync + 0.25, sync + 1.0, MOTION.glide);
  const sweep = ramp(T, sync + 0.1, sync + 1.35, MOTION.glide);
  const sweeping = T > sync + 0.05 && T < sync + 1.4;

  const pulses = [0.45, 4.1, sync + 0.15];
  const ringAt = (start: number) => {
    const u = (T - start) / 1.5;
    return u <= 0 || u >= 1 ? null : u;
  };

  const rowPad = density === "compact" ? 20 : 28;

  return (
    <div
      style={{
        width: 1280,
        height: 720,
        background: BGPAGE,
        fontFamily: FONT,
        color: INK,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(120% 90% at 50% 0%, #1a1815 0%, ${BGPAGE} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(115deg, #fff 0px, #fff 1px, transparent 1px, transparent 34px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: (1280 - PANEL_W) / 2,
          top: PANEL_TOP,
          width: PANEL_W,
          height: PANEL_H,
          background: PANEL,
          borderRadius: 22,
          border: `1px solid ${LINE}`,
          boxShadow: "0 1px 0 rgba(255,255,255,0.03) inset, 0 30px 70px -30px rgba(0,0,0,0.6)",
          transform: `scale(${camScale * drift})`,
          transformOrigin: `50% ${camY - PANEL_TOP}px`,
          padding: `0 ${PAD}px ${PAD}px`,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* header */}
        <div
          style={{
            height: HEAD_H,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: DOWN,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 4, background: BGPAGE, opacity: 0.85 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  fontFamily: WORDFONT,
                  textTransform: "uppercase",
                }}
              >
                Dean Enterprise
              </div>
              <div style={{ fontSize: 13, color: MUTED }}>Whole milk, 2 L · 4 competitors</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <div style={{ fontSize: 12, color: MUTED, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Your price
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: INK }}>
                $12.60
              </div>
            </div>
            <div style={{ width: 1, height: 42, background: LINE }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 9 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ position: "relative", width: 9, height: 9 }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: DOWN }} />
                  {pulses.map((p, k) => {
                    const u = ringAt(p);
                    if (u == null) return null;
                    const e = MOTION.glide(u);
                    return (
                      <div
                        key={k}
                        style={{
                          position: "absolute",
                          left: 4.5,
                          top: 4.5,
                          width: 9,
                          height: 9,
                          marginLeft: -4.5,
                          marginTop: -4.5,
                          boxSizing: "border-box",
                          borderRadius: 999,
                          border: `1.5px solid ${DOWN}`,
                          transform: `scale(${1 + e * 9})`,
                          opacity: 0.5 * (1 - e),
                        }}
                      />
                    );
                  })}
                </div>
                <div style={{ fontSize: 13, color: MUTED }}>Live · every 3 hours</div>
              </div>
              <div style={{ width: 132, height: 3, borderRadius: 999, background: LINE, overflow: "hidden" }}>
                <div
                  style={{
                    width: Math.max(0, cycle) * 132,
                    height: "100%",
                    borderRadius: 999,
                    background: DOWN,
                    opacity: 0.55,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: ROW_GAP, paddingTop: PAD }}>
          {CARDS.map((c, i) => {
            const a = activeOf(i);
            const price = priceOf(i);
            const delta = price - c.base;
            const dir = EV.find((e) => e.i === i);
            const tint = dir && dir.to < c.base ? DOWN : UP;
            const b = badgeOf(i);
            const shimmer = sweeping ? Math.max(0, 1 - Math.abs(sweep * 5 - (i + 0.6)) * 1.4) : 0;
            return (
              <div
                key={c.name}
                style={{
                  height: ROW_H,
                  borderRadius: 16,
                  boxSizing: "border-box",
                  border: `1px solid ${LINE}`,
                  background: "#242019",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `0 ${rowPad}px`,
                  position: "relative",
                  boxShadow:
                    a > 0.01
                      ? `0 0 0 ${1 + a * 1.4}px color-mix(in oklab, ${tint} ${18 + a * 26}%, transparent), 0 ${
                          4 + a * 14
                        }px ${16 + a * 26}px -10px color-mix(in oklab, ${tint} ${a * 42}%, transparent)`
                      : "0 1px 2px rgba(0,0,0,0.2)",
                  transform: `scale(${1 + a * 0.008})`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    pointerEvents: "none",
                    background: DOWN,
                    opacity: shimmer * 0.14,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    borderRadius: "16px 0 0 16px",
                    background: tint,
                    opacity: a * 0.85,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ fontSize: 17, fontWeight: 550, letterSpacing: "-0.005em" }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: MUTED }}>{c.meta}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  {b > 0.005 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "7px 12px 7px 10px",
                        borderRadius: 999,
                        background: `color-mix(in oklab, ${tint} 16%, ${PANEL})`,
                        border: `1px solid color-mix(in oklab, ${tint} 38%, ${PANEL})`,
                        opacity: b,
                        transform: `translateX(${(1 - b) * 10}px)`,
                      }}
                    >
                      <div style={{ width: 6, height: 6, borderRadius: 999, background: tint }} />
                      <div style={{ fontSize: 12.5, fontWeight: 550, color: tint, whiteSpace: "nowrap" }}>
                        Price changed
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 158, justifyContent: "flex-end" }}>
                    {Math.abs(delta) > 0.004 && (
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 550,
                          color: tint,
                          fontVariantNumeric: "tabular-nums",
                          opacity: Math.min(1, Math.abs(delta) * 6),
                        }}
                      >
                        {delta < 0 ? "−" : "+"}
                        {Math.abs(delta).toFixed(2)}
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.01em",
                        color: `color-mix(in oklab, ${tint} ${a * 100}%, ${INK})`,
                      }}
                    >
                      ${price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* sync sweep */}
        {sweeping && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: PANEL_H,
              pointerEvents: "none",
              background: `linear-gradient(180deg, transparent 0%, color-mix(in oklab, ${DOWN} 9%, transparent) 48%, transparent 100%)`,
              transform: `translateY(${-PANEL_H * 0.5 + sweep * PANEL_H * 1.5}px)`,
              opacity: 0.9 * Math.sin(Math.PI * Math.min(1, sweep)),
            }}
          />
        )}
      </div>
    </div>
  );
}

export function DeanHeroAnimation() {
  const T = useLoopTime(TOTAL);
  const { ref, scale } = useStageScale(1280);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", aspectRatio: "1280 / 720", overflow: "hidden" }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <DeanPiece T={T} />
      </div>
    </div>
  );
}
