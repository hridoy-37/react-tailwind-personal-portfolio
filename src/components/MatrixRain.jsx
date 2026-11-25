import { useEffect, useRef } from "react";
import { useUI } from "@/context/ui-context";
import { useEventListener } from "@/hooks/useEventListener";

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF{}[]<>/=;$#";
const FONT_SIZE = 16;
const FRAME_MS = 45;
const AUTO_CLOSE_MS = 12_000;

/** Starts the rain animation on `canvas`. Returns a cleanup function. */
function startRain(canvas) {
  const ctx = canvas.getContext("2d");
  let drops = [];
  let raf;
  let last = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = Array.from({ length: Math.ceil(canvas.width / FONT_SIZE) }, () =>
      Math.floor((Math.random() * -canvas.height) / FONT_SIZE)
    );
  };

  const draw = (t) => {
    raf = requestAnimationFrame(draw);
    if (t - last < FRAME_MS) return;
    last = t;
    ctx.fillStyle = "rgba(10, 14, 19, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
    drops.forEach((y, i) => {
      ctx.fillStyle = Math.random() > 0.975 ? "#e6fff2" : "#3ee08f";
      ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * FONT_SIZE, y * FONT_SIZE);
      drops[i] = y * FONT_SIZE > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  };

  resize();
  raf = requestAnimationFrame(draw);
  window.addEventListener("resize", resize);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}

/** Full-screen digital rain. Dismiss with Esc, a click, or wait for it to end. */
export const MatrixRain = () => {
  const { matrix, setMatrix } = useUI();
  const canvasRef = useRef(null);

  useEventListener("keydown", (e) => e.key === "Escape" && setMatrix(false), { enabled: matrix });

  useEffect(() => {
    if (!matrix) return;
    const stop = startRain(canvasRef.current);
    const timeout = setTimeout(() => setMatrix(false), AUTO_CLOSE_MS);
    return () => {
      stop();
      clearTimeout(timeout);
    };
  }, [matrix, setMatrix]);

  if (!matrix) return null;
  return (
    // data-theme="dark": the rain is always dark, whatever the site theme.
    <div
      data-theme="dark"
      className="fixed inset-0 z-300 bg-background cursor-pointer"
      onClick={() => setMatrix(false)}
      role="presentation"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-10 text-center">
        <p className="inline-block px-4 py-2 rounded bg-background/80 text-primary text-sm glow-text">
          wake up, neo… <span className="text-muted-foreground">(esc to exit)</span>
        </p>
      </div>
    </div>
  );
};
