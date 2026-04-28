import type { ReactNode } from "react";

type WindowProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function DashboardWindow({
  title = "rocketride.cloud/pipelines",
  children,
  className = "",
}: WindowProps) {
  return (
    <div
      className={`relative rounded-2xl border border-border-strong bg-surface overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-xs text-text-dim font-mono px-3 py-1 rounded-md bg-bg/60 border border-border">
            {title}
          </div>
        </div>
        <div className="w-12" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* Hero pipeline: Input → LLM → Eval → Deploy */
export function HeroPipeline() {
  return (
    <DashboardWindow className="glow-accent">
      <div className="p-8 sm:p-10">
        <svg
          viewBox="0 0 760 280"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nodeGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#232323" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#00b9ec" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00b9ec" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00b9ec" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* connecting lines */}
          <line x1="120" y1="140" x2="260" y2="140" stroke="url(#lineGrad)" strokeWidth="2" />
          <line x1="380" y1="140" x2="520" y2="140" stroke="url(#lineGrad)" strokeWidth="2" />
          <line x1="640" y1="140" x2="700" y2="140" stroke="url(#lineGrad)" strokeWidth="2" />

          {/* arrow tips */}
          {[260, 520, 700].map((x) => (
            <polygon
              key={x}
              points={`${x - 6},134 ${x - 6},146 ${x + 2},140`}
              fill="#00b9ec"
              opacity="0.9"
            />
          ))}

          {/* Input */}
          <g>
            <rect
              x="40"
              y="105"
              width="80"
              height="70"
              rx="14"
              fill="url(#nodeGrad)"
              stroke="#3a3a3a"
            />
            <circle cx="80" cy="135" r="12" fill="#00b9ec" opacity="0.2" />
            <circle cx="80" cy="135" r="6" fill="#00b9ec" filter="url(#glow)" />
            <text x="80" y="165" textAnchor="middle" fill="#cbcbcb" fontSize="11" fontFamily="ui-sans-serif">
              Input
            </text>
          </g>

          {/* LLM */}
          <g>
            <rect
              x="260"
              y="95"
              width="120"
              height="90"
              rx="14"
              fill="url(#nodeGrad)"
              stroke="#3a3a3a"
            />
            <rect x="284" y="118" width="72" height="6" rx="3" fill="#00b9ec" opacity="0.8" />
            <rect x="284" y="132" width="56" height="6" rx="3" fill="#00b9ec" opacity="0.5" />
            <rect x="284" y="146" width="64" height="6" rx="3" fill="#00b9ec" opacity="0.3" />
            <text x="320" y="175" textAnchor="middle" fill="#cbcbcb" fontSize="11" fontFamily="ui-sans-serif">
              LLM
            </text>
          </g>

          {/* Eval */}
          <g>
            <rect
              x="520"
              y="105"
              width="120"
              height="70"
              rx="14"
              fill="url(#nodeGrad)"
              stroke="#3a3a3a"
            />
            <polyline
              points="540,150 560,135 580,142 600,120 620,128"
              fill="none"
              stroke="#00b9ec"
              strokeWidth="2"
              filter="url(#glow)"
            />
            <text x="580" y="165" textAnchor="middle" fill="#cbcbcb" fontSize="11" fontFamily="ui-sans-serif">
              Eval
            </text>
          </g>

          {/* Deploy */}
          <g>
            <rect
              x="700"
              y="105"
              width="40"
              height="70"
              rx="14"
              fill="url(#nodeGrad)"
              stroke="#00b9ec"
            />
            <path
              d="M 712 145 L 720 130 L 728 145 M 720 130 L 720 158"
              stroke="#00b9ec"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <text x="720" y="195" textAnchor="middle" fill="#cbcbcb" fontSize="10" fontFamily="ui-sans-serif">
              Deploy
            </text>
          </g>

          {/* status row */}
          <g opacity="0.6">
            <circle cx="50" cy="240" r="3" fill="#00b9ec" />
            <text x="62" y="244" fill="#8a8a8a" fontSize="10" fontFamily="ui-monospace">
              build #2034 — 2.1s
            </text>
            <circle cx="260" cy="240" r="3" fill="#28c840" />
            <text x="272" y="244" fill="#8a8a8a" fontSize="10" fontFamily="ui-monospace">
              passing
            </text>
            <circle cx="380" cy="240" r="3" fill="#00b9ec" />
            <text x="392" y="244" fill="#8a8a8a" fontSize="10" fontFamily="ui-monospace">
              live · us-east-1
            </text>
          </g>
        </svg>
      </div>
    </DashboardWindow>
  );
}

/* Platform section: more complex DAG view */
export function PlatformDashboard() {
  return (
    <DashboardWindow title="rocketride.cloud/dashboard" className="glow-accent">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[420px]">
        {/* Sidebar */}
        <aside className="hidden lg:block border-r border-border bg-bg/40 p-4">
          <div className="text-[10px] uppercase tracking-wider text-text-label mb-3">
            Workspace
          </div>
          {["Pipelines", "Runs", "Datasets", "Keys", "Billing"].map((item, i) => (
            <div
              key={item}
              className={`text-sm px-3 py-2 rounded-md mb-1 ${
                i === 0
                  ? "bg-accent-soft text-accent"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {item}
            </div>
          ))}
        </aside>

        {/* Canvas */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-text font-medium">customer-summary-pipeline</div>
              <div className="text-xs text-text-dim">main · last run 12s ago</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-1 rounded-full bg-[#28c840]/10 text-[#28c840] border border-[#28c840]/30">
                ● live
              </span>
              <span className="text-[11px] px-2 py-1 rounded-full bg-surface-2 text-text-muted border border-border">
                v1.4.2
              </span>
            </div>
          </div>

          <svg
            viewBox="0 0 600 320"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pNode" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>
              <linearGradient id="pLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#00b9ec" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00b9ec" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* edges */}
            <path d="M 100 80 C 160 80, 180 160, 240 160" stroke="url(#pLine)" strokeWidth="1.5" fill="none" />
            <path d="M 100 240 C 160 240, 180 160, 240 160" stroke="url(#pLine)" strokeWidth="1.5" fill="none" />
            <path d="M 340 160 C 400 160, 420 80, 480 80" stroke="url(#pLine)" strokeWidth="1.5" fill="none" />
            <path d="M 340 160 C 400 160, 420 240, 480 240" stroke="url(#pLine)" strokeWidth="1.5" fill="none" />

            {/* source nodes */}
            <g>
              <rect x="20" y="55" width="100" height="50" rx="10" fill="url(#pNode)" stroke="#3a3a3a" />
              <circle cx="40" cy="80" r="5" fill="#00b9ec" />
              <text x="55" y="84" fill="#cbcbcb" fontSize="11" fontFamily="ui-sans-serif">Postgres</text>
            </g>
            <g>
              <rect x="20" y="215" width="100" height="50" rx="10" fill="url(#pNode)" stroke="#3a3a3a" />
              <circle cx="40" cy="240" r="5" fill="#00b9ec" />
              <text x="55" y="244" fill="#cbcbcb" fontSize="11" fontFamily="ui-sans-serif">S3 docs</text>
            </g>

            {/* central LLM */}
            <g>
              <rect x="240" y="125" width="100" height="70" rx="12" fill="url(#pNode)" stroke="#00b9ec" />
              <rect x="258" y="146" width="64" height="5" rx="2" fill="#00b9ec" opacity="0.9" />
              <rect x="258" y="158" width="48" height="5" rx="2" fill="#00b9ec" opacity="0.6" />
              <rect x="258" y="170" width="56" height="5" rx="2" fill="#00b9ec" opacity="0.4" />
              <text x="290" y="138" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="ui-sans-serif">Claude 4</text>
            </g>

            {/* output nodes */}
            <g>
              <rect x="480" y="55" width="100" height="50" rx="10" fill="url(#pNode)" stroke="#3a3a3a" />
              <circle cx="500" cy="80" r="5" fill="#28c840" />
              <text x="515" y="84" fill="#cbcbcb" fontSize="11" fontFamily="ui-sans-serif">Webhook</text>
            </g>
            <g>
              <rect x="480" y="215" width="100" height="50" rx="10" fill="url(#pNode)" stroke="#3a3a3a" />
              <circle cx="500" cy="240" r="5" fill="#28c840" />
              <text x="515" y="244" fill="#cbcbcb" fontSize="11" fontFamily="ui-sans-serif">Slack</text>
            </g>
          </svg>

          {/* metrics row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "p95 latency", val: "412ms", glow: false },
              { label: "cost / 1k runs", val: "$0.18", glow: true },
              { label: "success", val: "99.7%", glow: false },
            ].map((m) => (
              <div
                key={m.label}
                className={`rounded-lg border p-3 ${
                  m.glow
                    ? "border-accent/40 bg-accent-soft"
                    : "border-border bg-surface-2"
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider text-text-label">
                  {m.label}
                </div>
                <div
                  className={`text-lg font-semibold mt-1 ${
                    m.glow ? "text-accent" : "text-text"
                  }`}
                >
                  {m.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardWindow>
  );
}

/* Cloud Builder — drag & drop canvas */
export function CloudBuilderMock() {
  return (
    <DashboardWindow title="rocketride.cloud/builder">
      <div className="grid grid-cols-[80px_1fr] min-h-[300px]">
        <div className="border-r border-border bg-bg/40 p-3 flex flex-col gap-3">
          {["▢", "◯", "◇", "△", "⬡"].map((g, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg border border-border bg-surface-2 flex items-center justify-center text-text-dim hover:text-accent hover:border-accent/40"
            >
              {g}
            </div>
          ))}
        </div>
        <div className="relative p-4">
          <svg viewBox="0 0 480 280" className="w-full h-auto">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#232323" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="480" height="280" fill="url(#grid)" />

            {/* connection */}
            <path d="M 120 100 C 170 100, 190 160, 240 160" stroke="#00b9ec" strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M 320 160 C 360 160, 380 100, 420 100" stroke="#00b9ec" strokeWidth="1.5" fill="none" opacity="0.7" />

            <g>
              <rect x="40" y="75" width="80" height="50" rx="8" fill="#1a1a1a" stroke="#3a3a3a" />
              <text x="80" y="105" textAnchor="middle" fill="#cbcbcb" fontSize="11">Trigger</text>
            </g>
            <g>
              <rect x="240" y="135" width="80" height="50" rx="8" fill="#1a1a1a" stroke="#00b9ec" />
              <text x="280" y="165" textAnchor="middle" fill="#fff" fontSize="11">Transform</text>
            </g>
            <g>
              <rect x="380" y="75" width="80" height="50" rx="8" fill="#1a1a1a" stroke="#3a3a3a" />
              <text x="420" y="105" textAnchor="middle" fill="#cbcbcb" fontSize="11">Output</text>
            </g>

            {/* drag handle indicator */}
            <circle cx="280" cy="160" r="5" fill="#00b9ec" opacity="0.3" />
            <circle cx="280" cy="160" r="3" fill="#00b9ec" />
          </svg>
        </div>
      </div>
    </DashboardWindow>
  );
}

/* Benchmarking chart for use cases */
export function BenchmarkChart() {
  const models = [
    { name: "Claude 4", val: 92, color: "#00b9ec" },
    { name: "GPT-5", val: 88, color: "#a78bfa" },
    { name: "Gemini Ultra", val: 85, color: "#f472b6" },
    { name: "Llama 4", val: 79, color: "#fbbf24" },
  ];
  return (
    <DashboardWindow title="rocketride.cloud/eval">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium">Quality score</div>
            <div className="text-xs text-text-dim">customer-summary · 1,200 prompts</div>
          </div>
          <div className="text-xs text-text-dim font-mono">live</div>
        </div>
        <div className="space-y-3">
          {models.map((m) => (
            <div key={m.name}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-text-muted">{m.name}</span>
                <span className="text-text font-mono">{m.val}</span>
              </div>
              <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${m.val}%`,
                    background: m.color,
                    boxShadow: `0 0 12px ${m.color}66`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-border grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-text-label">Total runs</div>
            <div className="text-sm font-semibold mt-1">4,800</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-text-label">Avg cost</div>
            <div className="text-sm font-semibold mt-1 text-accent">$0.0021</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-text-label">Winner</div>
            <div className="text-sm font-semibold mt-1">Claude 4</div>
          </div>
        </div>
      </div>
    </DashboardWindow>
  );
}

/* Small mock previews for the 3 core feature cards */
export function CostMiniChart() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <defs>
        <linearGradient id="ccg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00b9ec" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00b9ec" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0 60 L 30 50 L 60 55 L 90 35 L 120 40 L 150 25 L 180 18 L 200 15 L 200 80 L 0 80 Z"
        fill="url(#ccg)"
      />
      <path
        d="M 0 60 L 30 50 L 60 55 L 90 35 L 120 40 L 150 25 L 180 18 L 200 15"
        stroke="#00b9ec"
        strokeWidth="1.5"
        fill="none"
      />
      <text x="8" y="14" fill="#8a8a8a" fontSize="9" fontFamily="ui-monospace">cost / run</text>
      <text x="160" y="14" fill="#00b9ec" fontSize="9" fontFamily="ui-monospace">-40%</text>
    </svg>
  );
}

export function DeployMini() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-bg/60 border border-border">
      <div className="w-8 h-8 rounded-md bg-accent-soft border border-accent/40 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00b9ec" strokeWidth="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="text-xs text-text">Deploy to production</div>
        <div className="text-[10px] text-text-dim font-mono">us-east-1 · v1.4.2</div>
      </div>
      <div className="text-[10px] text-accent font-mono">4.2s</div>
    </div>
  );
}

export function KeyMini() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 p-2 rounded-md bg-bg/60 border border-accent/40">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00b9ec" strokeWidth="2">
          <circle cx="8" cy="14" r="4" />
          <path d="M11 11l9-9M16 6l3 3" />
        </svg>
        <code className="text-[10px] text-accent font-mono flex-1 truncate">rr_live_•••••8f2a</code>
        <span className="text-[9px] text-text-dim">universal</span>
      </div>
      {["OpenAI", "Anthropic", "Mistral"].map((p) => (
        <div key={p} className="flex items-center justify-between text-[10px] text-text-dim px-2">
          <span>↳ {p}</span>
          <span className="font-mono">routed</span>
        </div>
      ))}
    </div>
  );
}
