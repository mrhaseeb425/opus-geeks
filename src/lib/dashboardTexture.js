// The laptop screen in the hero is a real product dashboard drawn to a 2D
// canvas and used as a WebGL texture. Drawing it (rather than shipping a
// screenshot) keeps it crisp at any size, costs no image request, and lets it
// follow the site's accent colour.

const W = 1024;
const H = 640;

const COLORS = {
  panel: "#0d1526",
  surface: "#141d33",
  surfaceAlt: "#18233c",
  line: "#22304e",
  text: "#eef3fb",
  muted: "#93a2bd",
  accent: "#3b7bff",
  accentSoft: "rgba(59, 123, 255, 0.22)",
  positive: "#4ade80",
};

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fillRound(ctx, x, y, w, h, r, fill) {
  roundRect(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

function text(ctx, str, x, y, { size = 18, color = COLORS.text, weight = 500 } = {}) {
  ctx.font = `${weight} ${size}px "DM Sans", system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(str, x, y);
}

// A smooth line through the points, used for the chart.
function smoothLine(ctx, pts) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
  }
}

export function drawDashboard(canvas) {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = COLORS.panel;
  ctx.fillRect(0, 0, W, H);

  /* Sidebar ------------------------------------------------------------- */
  const sideW = 190;
  ctx.fillStyle = COLORS.surface;
  ctx.fillRect(0, 0, sideW, H);
  ctx.fillStyle = COLORS.line;
  ctx.fillRect(sideW - 1, 0, 1, H);

  fillRound(ctx, 28, 30, 34, 34, 10, COLORS.accent);
  text(ctx, "O", 39, 54, { size: 19, weight: 700, color: "#fff" });
  text(ctx, "Opus", 74, 53, { size: 18, weight: 700 });

  const nav = ["Overview", "Projects", "Releases", "Team", "Settings"];
  nav.forEach((label, i) => {
    const y = 110 + i * 46;
    if (i === 0) fillRound(ctx, 18, y - 22, sideW - 40, 38, 10, COLORS.accentSoft);
    fillRound(ctx, 34, y - 9, 12, 12, 3, i === 0 ? COLORS.accent : COLORS.muted);
    text(ctx, label, 58, y + 1, {
      size: 16,
      color: i === 0 ? COLORS.text : COLORS.muted,
      weight: i === 0 ? 600 : 500,
    });
  });

  /* Header -------------------------------------------------------------- */
  text(ctx, "Overview", sideW + 38, 60, { size: 26, weight: 700 });
  fillRound(ctx, W - 210, 36, 170, 34, 17, COLORS.surfaceAlt);
  text(ctx, "Last 30 days", W - 190, 58, { size: 15, color: COLORS.muted });

  /* KPI cards ----------------------------------------------------------- */
  const kpis = [
    ["Active users", "24.9k", "+18%"],
    ["Uptime", "99.98%", "30 days"],
    ["Releases", "42", "+6 this week"],
  ];
  const cardW = 196;
  const gap = 18;
  kpis.forEach(([label, value, meta], i) => {
    const x = sideW + 38 + i * (cardW + gap);
    fillRound(ctx, x, 92, cardW, 112, 14, COLORS.surface);
    text(ctx, label, x + 20, 122, { size: 15, color: COLORS.muted });
    text(ctx, value, x + 20, 162, { size: 32, weight: 700 });
    text(ctx, meta, x + 20, 186, {
      size: 14,
      color: i === 0 ? COLORS.positive : COLORS.muted,
    });
  });

  /* Chart --------------------------------------------------------------- */
  const cx = sideW + 38;
  const cy = 228;
  const cw = W - cx - 40;
  const ch = H - cy - 44;
  fillRound(ctx, cx, cy, cw, ch, 14, COLORS.surface);
  text(ctx, "Weekly active users", cx + 22, cy + 36, { size: 16, color: COLORS.muted });

  const plotX = cx + 22;
  const plotY = cy + 58;
  const plotW = cw - 44;
  const plotH = ch - 86;

  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = plotY + (plotH / 3) * i;
    ctx.beginPath();
    ctx.moveTo(plotX, y);
    ctx.lineTo(plotX + plotW, y);
    ctx.stroke();
  }

  const series = [0.28, 0.42, 0.36, 0.55, 0.48, 0.68, 0.62, 0.82, 0.95];
  const pts = series.map((v, i) => [
    plotX + (plotW / (series.length - 1)) * i,
    plotY + plotH - v * plotH,
  ]);

  const grad = ctx.createLinearGradient(0, plotY, 0, plotY + plotH);
  grad.addColorStop(0, "rgba(59, 123, 255, 0.42)");
  grad.addColorStop(1, "rgba(59, 123, 255, 0)");
  smoothLine(ctx, pts);
  ctx.lineTo(plotX + plotW, plotY + plotH);
  ctx.lineTo(plotX, plotY + plotH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  smoothLine(ctx, pts);
  ctx.strokeStyle = COLORS.accent;
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  const [lx, ly] = pts.at(-1);
  ctx.beginPath();
  ctx.arc(lx, ly, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = COLORS.accent;
  ctx.stroke();

  return canvas;
}

export const DASHBOARD_SIZE = { width: W, height: H };

/* Phone screen ------------------------------------------------------------ */

const PW = 420;
const PH = 880;

export function drawPhoneScreen(canvas) {
  canvas.width = PW;
  canvas.height = PH;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = COLORS.panel;
  ctx.fillRect(0, 0, PW, PH);

  // Status bar
  text(ctx, "9:41", 34, 58, { size: 22, weight: 600 });
  fillRound(ctx, PW - 78, 38, 44, 22, 11, COLORS.muted);

  // Balance card
  const g = ctx.createLinearGradient(30, 96, PW - 30, 340);
  g.addColorStop(0, "#2f6bff");
  g.addColorStop(1, "#6f46ff");
  roundRect(ctx, 30, 96, PW - 60, 244, 26);
  ctx.fillStyle = g;
  ctx.fill();
  text(ctx, "Total balance", 58, 152, { size: 22, color: "rgba(255,255,255,0.78)" });
  text(ctx, "$12,480", 58, 220, { size: 54, weight: 700, color: "#fff" });
  fillRound(ctx, 58, 250, 122, 48, 24, "rgba(255,255,255,0.22)");
  text(ctx, "Send", 88, 281, { size: 21, weight: 600, color: "#fff" });
  fillRound(ctx, 194, 250, 132, 48, 24, "rgba(255,255,255,0.22)");
  text(ctx, "Top up", 222, 281, { size: 21, weight: 600, color: "#fff" });

  // Transactions
  text(ctx, "Recent", 34, 404, { size: 24, weight: 600 });
  const rows = [
    ["Payroll", "+$2,400", COLORS.positive],
    ["Hosting", "-$84", COLORS.muted],
    ["Stripe payout", "+$980", COLORS.positive],
    ["Figma", "-$45", COLORS.muted],
  ];
  rows.forEach(([label, amount, tone], i) => {
    const y = 438 + i * 92;
    fillRound(ctx, 30, y, PW - 60, 76, 18, COLORS.surface);
    fillRound(ctx, 50, y + 20, 36, 36, 12, COLORS.surfaceAlt);
    text(ctx, label, 102, y + 46, { size: 22, weight: 500 });
    ctx.textAlign = "right";
    text(ctx, amount, PW - 50, y + 46, { size: 22, weight: 600, color: tone });
    ctx.textAlign = "left";
  });

  return canvas;
}
