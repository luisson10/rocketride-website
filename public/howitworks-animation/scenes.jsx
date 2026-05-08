// scenes.jsx — RocketRide "How it works" — abstract agent-tree pipeline

const RR_TOKENS = {
  bg: '#0f0f0f', surface: '#1a1a1a', card: '#373737',
  iconTile: '#1f1f1f', border: '#2a2a2a', borderStrong: '#3a3a3a',
  accent: '#00b9ec', accentSoft: 'rgba(0,185,236,0.10)',
  text: '#ffffff', textMuted: '#cbcbcb', textDim: '#afafaf', textLabel: '#616161',
};
const MONO = 'JetBrains Mono, ui-monospace, monospace';
const SANS = 'Figtree, system-ui, sans-serif';

// Role colors (subtly different to convey hierarchy)
const ROLE = {
  SOURCE: { fill: 'rgba(0,185,236,0.16)', stroke: 'rgba(0,185,236,0.55)', dot: '#00b9ec' },
  AGENT:  { fill: 'rgba(0,185,236,0.22)', stroke: 'rgba(0,185,236,0.7)',  dot: '#00b9ec' },
  LLM:    { fill: 'rgba(180,200,230,0.10)', stroke: 'rgba(180,200,230,0.45)', dot: '#cbd5e1' },
  TOOL:   { fill: 'rgba(255,170,80,0.14)', stroke: 'rgba(255,170,80,0.55)', dot: '#ffaa50' },
  OUTPUT: { fill: 'rgba(120,220,180,0.14)', stroke: 'rgba(120,220,180,0.55)', dot: '#78dcb4' },
};

// ── Background ────────────────────────────────────────────────────────────
function RRBackground() {
  const t = useTime();
  const dx = Math.sin(t * 0.15) * 6;
  const dy = Math.cos(t * 0.18) * 4;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: -40,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.045) 1px, transparent 0)`,
        backgroundSize: '28px 28px',
        transform: `translate(${dx}px, ${dy}px)` }} />
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(60% 60% at 50% 55%, rgba(0,185,236,0.06), transparent 65%)` }} />
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(120% 90% at 50% 50%, transparent 60%, rgba(0,0,0,0.55) 100%)` }} />
    </div>
  );
}

function Cursor({ x, y, opacity = 1, clicking = 0 }) {
  const s = 1 - clicking * 0.12;
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity,
      transform: `translate(-2px, -2px) scale(${s})`,
      pointerEvents: 'none', zIndex: 50,
      filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7))' }}>
      <svg width="22" height="26" viewBox="0 0 22 26">
        <path d="M2 2 L2 20 L7 16 L10 22 L13 21 L10 15 L17 14 Z" fill="#fff" stroke="#000" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ── Abstract icon glyphs (no text inside nodes) ──────────────────────────
function NodeGlyph({ kind }) {
  const c = '#fff';
  if (kind === 'source') return (
    <div style={{ width: 12, height: 9, borderRadius: 2, border: `1.5px solid ${c}`, position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: -3, left: 2, width: 0, height: 0,
        borderTop: `3px solid ${c}`, borderLeft: '2px solid transparent', borderRight: '2px solid transparent' }}/>
    </div>);
  if (kind === 'agent') return (
    <div style={{ position: 'relative', width: 12, height: 12 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 6, border: `1.5px solid ${c}` }}/>
      <div style={{ position: 'absolute', inset: 4, borderRadius: 2, background: c }}/>
    </div>);
  if (kind === 'llm') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <div style={{ width: 12, height: 1.5, background: c }}/>
      <div style={{ width: 8, height: 1.5, background: c }}/>
      <div style={{ width: 11, height: 1.5, background: c }}/>
    </div>);
  if (kind === 'tool') return (
    <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent', borderBottom: `10px solid ${c}` }}/>);
  if (kind === 'output') return (
    <div style={{ width: 12, height: 12, borderRadius: 6, border: `1.5px solid ${c}`, position: 'relative' }}>
      <div style={{ position: 'absolute', left: -2, top: 4, width: 6, height: 1.5, background: c }}/>
      <div style={{ position: 'absolute', left: 8, top: 4, width: 6, height: 1.5, background: c }}/>
    </div>);
  return null;
}

// Square port (left/right)
function PortDot({ active, role = 'AGENT' }) {
  const r = ROLE[role];
  return (
    <div style={{ width: 7, height: 7, borderRadius: 1.5,
      background: active ? r.dot : r.stroke,
      boxShadow: active ? `0 0 8px ${r.dot}` : 'none' }} />
  );
}

// Diamond port (top/bottom — used for sub-agent calls)
function DiamondPort({ active, role = 'AGENT' }) {
  const r = ROLE[role];
  return (
    <div style={{ width: 8, height: 8,
      background: active ? r.dot : r.stroke,
      transform: 'rotate(45deg)',
      boxShadow: active ? `0 0 8px ${r.dot}` : 'none' }} />
  );
}

// ── Abstract Pipeline Node ────────────────────────────────────────────────
function PipelineNode({ node }) {
  const t = useTime();
  const since = t - node.appearAt;
  if (since < -0.05) return null;
  const enter = clamp(since / 0.55, 0, 1);
  const eased = Easing.easeOutBack(enter);
  const scale = 0.7 + 0.3 * eased;
  const opacity = clamp(since / 0.4, 0, 1);
  const ty = (1 - enter) * 14;
  const active = node.active || 0;
  const r = ROLE[node.role];
  const litBorder = active > 0
    ? `rgba(${parseInt(r.dot.slice(1,3),16)*0.6+90}, ${parseInt(r.dot.slice(3,5),16)*0.6+90}, ${parseInt(r.dot.slice(5,7),16)*0.6+90}, ${0.6+active*0.4})`
    : 'rgba(120,125,135,0.55)';
  const glow = active > 0
    ? `0 0 0 1px ${r.stroke}, 0 14px 32px ${r.fill}`
    : '0 12px 24px rgba(0,0,0,0.45)';

  // left/right ports
  const leftPorts  = (node.inputs  || []).filter(p => (p.side || 'left') === 'left');
  const rightPorts = (node.outputs || []).filter(p => (p.side || 'right') === 'right');
  const bottomPorts = (node.outputs || []).filter(p => p.side === 'bottom');

  const leftCount = leftPorts.length, rightCount = rightPorts.length;
  const sideMax = Math.max(leftCount, rightCount, 1);

  return (
    <div style={{
      position: 'absolute', left: node.x, top: node.y, width: node.w, height: node.h,
      transform: `translate(-50%, calc(-50% + ${ty}px)) scale(${scale})`,
      opacity, transformOrigin: 'center',
      borderRadius: 12,
      background: 'rgba(26,26,26,0.96)',
      border: `1px solid ${litBorder}`,
      boxShadow: glow,
      fontFamily: SANS,
    }}>
      {/* header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 10px',
        borderBottom: `1px solid rgba(255,255,255,0.04)`,
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: 7,
          background: r.fill, border: `1px solid ${r.stroke}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <NodeGlyph kind={node.iconKind}/>
        </div>
        {/* role color chip strip — replaces name text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          <div style={{ height: 5, borderRadius: 2.5, background: r.fill, width: '70%' }}/>
          <div style={{ height: 3, borderRadius: 1.5, background: 'rgba(255,255,255,0.06)', width: '45%' }}/>
        </div>
        {/* cog */}
        <div style={{
          width: 12, height: 12, borderRadius: 6,
          border: `1.5px solid ${node.cogActive ? '#ff7a4d' : RR_TOKENS.textLabel}`,
          background: node.cogActive ? 'rgba(255,122,77,0.15)' : 'transparent',
          flexShrink: 0,
        }}/>
        {/* dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 2.5, height: 2.5, borderRadius: 1.5, background: RR_TOKENS.textLabel }}/>)}
        </div>
      </div>

      {/* body — port rows (left/right), no text */}
      <div style={{ position: 'relative', flex: 1, padding: '10px 0' }}>
        {Array.from({ length: sideMax }).map((_, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingLeft: 8, paddingRight: 8,
            height: 14,
          }}>
            <div style={{ visibility: i < leftCount ? 'visible' : 'hidden' }}>
              <PortDot
                active={leftPorts[i] && (node.activePorts?.[leftPorts[i].id] > 0.4)}
                role={leftPorts[i]?.portRole || node.role}
              />
            </div>
            <div style={{ visibility: i < rightCount ? 'visible' : 'hidden' }}>
              <PortDot
                active={rightPorts[i] && (node.activePorts?.[rightPorts[i].id] > 0.4)}
                role={rightPorts[i]?.portRole || node.role}
              />
            </div>
          </div>
        ))}
      </div>

      {/* bottom progress bar — fills once and stays */}
      <div style={{ height: 4, margin: '0 8px 8px', borderRadius: 2,
        background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ width: `${(node.progress || 0) * 100}%`, height: '100%',
          background: `linear-gradient(90deg, ${r.fill}, ${r.dot})`,
          boxShadow: (node.progress || 0) > 0.05 ? `0 0 8px ${r.dot}` : 'none' }}/>
      </div>

      {/* bottom diamond ports for sub-agent calls */}
      {bottomPorts.length > 0 && (
        <React.Fragment>
          {bottomPorts.map((p, i) => {
            const xPct = (i + 1) / (bottomPorts.length + 1);
            const lit = (node.activePorts?.[p.id] || 0) > 0.4;
            return (
              <div key={p.id} style={{
                position: 'absolute',
                left: `${xPct * 100}%`, bottom: -4,
                transform: 'translateX(-50%)',
              }}>
                <DiamondPort active={lit} role={p.portRole || 'AGENT'} />
              </div>
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
}

// ── Connectors ────────────────────────────────────────────────────────────
function bezierPath(x1, y1, x2, y2, vertical = false) {
  if (vertical) {
    const dy = Math.max(40, Math.abs(y2 - y1) * 0.5);
    return { p0: [x1,y1], p1: [x1,y1+dy], p2: [x2,y2-dy], p3: [x2,y2],
      d: `M ${x1} ${y1} C ${x1} ${y1+dy}, ${x2} ${y2-dy}, ${x2} ${y2}` };
  }
  const dx = Math.max(40, Math.abs(x2 - x1) * 0.45);
  return { p0: [x1,y1], p1: [x1+dx,y1], p2: [x2-dx,y2], p3: [x2,y2],
    d: `M ${x1} ${y1} C ${x1+dx} ${y1}, ${x2-dx} ${y2}, ${x2} ${y2}` };
}
function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return [
    u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
    u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1],
  ];
}

function Connector({ x1, y1, x2, y2, drawAt = 0, drawDur = 0.55, lit = false, vertical = false, dashed = false }) {
  const t = useTime();
  if (t < drawAt - 0.02) return null;
  const drawT = clamp((t - drawAt) / drawDur, 0, 1);
  const eased = Easing.easeOutCubic(drawT);
  const path = bezierPath(x1, y1, x2, y2, vertical);
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
      <path d={path.d} fill="none"
        stroke={lit ? RR_TOKENS.accent : 'rgba(140,140,150,0.5)'}
        strokeWidth={lit ? 1.6 : 1.2}
        strokeDasharray={dashed ? '5 5' : '700'}
        strokeDashoffset={dashed ? 0 : (1 - eased) * 700}
        style={{
          opacity: dashed ? eased : 1,
          filter: lit ? `drop-shadow(0 0 6px rgba(0,185,236,0.55))` : 'none',
        }}
      />
    </svg>
  );
}

// ── Pipeline graph (abstract agent tree) ──────────────────────────────────
const TL = {
  // Phase 1 build (0–5s)
  appearSource: 0.4,
  appearAgent:  1.0,
  appearOutput: 1.6,
  appearLLM1:   2.2,
  appearSubAg:  2.6,
  appearLLM2:   3.2,
  appearTool:   3.5,

  drawW1: 1.3, // source → agent
  drawW2: 1.9, // agent → output
  drawW3: 2.5, // agent.LLM → LLM1
  drawW4: 2.9, // agent.Tool → subAgent
  drawW5: 3.5, // subAgent.LLM → LLM2
  drawW6: 3.8, // subAgent.Tool → tool

  fillSource: 0.7, fillAgent: 1.3, fillOutput: 1.9,
  fillLLM1: 2.5,   fillSubAg: 2.9, fillLLM2: 3.5, fillTool: 3.8,

  // Phase 2 (5–10s)
  tabBarAt: 5.1,
  packetStart: 5.5,
  packetEnd: 7.0,
  traceClickAt: 7.5,
  metricsClickAt: 8.6,
  backToPipelineAt: 9.6,

  // Phase 3 (10–15s) — faster transition
  cursorOnDeployAt: 10.4,
  deployClickAt: 10.8,
  scaleStartAt: 10.95,
  scaleEndAt: 11.45,    // 0.5s scale
  fanStartAt: 11.45,
  fanEndAt: 12.10,      // 0.65s fan-out
};

function pipelineNodes() {
  // Layout for 1080x720, leaving room for top bar at y~60 and pips at bottom
  return {
    source: {
      id: 'source', appearAt: TL.appearSource,
      x: 130, y: 200, w: 150, h: 78,
      iconKind: 'source', role: 'SOURCE',
      inputs: [],
      outputs: [{ id: 'q', portRole: 'AGENT' }],
    },
    agent: {
      id: 'agent', appearAt: TL.appearAgent,
      x: 410, y: 200, w: 200, h: 92,
      iconKind: 'agent', role: 'AGENT',
      inputs: [{ id: 'q' }],
      outputs: [
        { id: 'a', side: 'right', portRole: 'AGENT' },
        { id: 'llm-down', side: 'bottom', portRole: 'LLM' },
        { id: 'tool-down', side: 'bottom', portRole: 'AGENT' },
      ],
    },
    output: {
      id: 'output', appearAt: TL.appearOutput,
      x: 770, y: 200, w: 175, h: 78,
      iconKind: 'output', role: 'OUTPUT',
      inputs: [{ id: 'a' }], outputs: [],
    },
    llm1: {
      id: 'llm1', appearAt: TL.appearLLM1,
      x: 245, y: 440, w: 170, h: 70,
      iconKind: 'llm', role: 'LLM',
      inputs: [{ id: 'in' }], outputs: [],
      cogActive: true,
    },
    subAgent: {
      id: 'subAgent', appearAt: TL.appearSubAg,
      x: 555, y: 440, w: 200, h: 80,
      iconKind: 'agent', role: 'AGENT',
      inputs: [{ id: 'in' }],
      outputs: [
        { id: 'llm-down', side: 'bottom', portRole: 'LLM' },
        { id: 'tool-down', side: 'bottom', portRole: 'TOOL' },
      ],
    },
    llm2: {
      id: 'llm2', appearAt: TL.appearLLM2,
      x: 470, y: 605, w: 165, h: 70,
      iconKind: 'llm', role: 'LLM',
      inputs: [{ id: 'in' }], outputs: [],
      cogActive: true,
    },
    tool: {
      id: 'tool', appearAt: TL.appearTool,
      x: 700, y: 605, w: 165, h: 70,
      iconKind: 'tool', role: 'TOOL',
      inputs: [{ id: 'in' }], outputs: [],
    },
  };
}

const HEADER_H = 44, ROW_PAD_TOP = 10, ROW_H = 14;
function portPos(node, portId, side) {
  // side 'in'  => left edge port; 'out' => right or bottom
  if (side === 'in') {
    const idx = (node.inputs || []).findIndex(p => p.id === portId);
    if (idx < 0) return [node.x, node.y];
    const yLocal = HEADER_H + ROW_PAD_TOP + idx * ROW_H + 3;
    return [(node.x - node.w/2 + 8 + 3), (node.y - node.h/2) + yLocal];
  }
  // out — find in outputs
  const out = (node.outputs || []);
  const p = out.find(p => p.id === portId);
  if (!p) return [node.x, node.y];
  if (p.side === 'bottom') {
    const bottoms = out.filter(q => q.side === 'bottom');
    const i = bottoms.findIndex(q => q.id === portId);
    const xPct = (i + 1) / (bottoms.length + 1);
    const x = (node.x - node.w/2) + xPct * node.w;
    const y = (node.y + node.h/2);
    return [x, y];
  }
  // right side
  const rights = out.filter(q => (q.side || 'right') === 'right');
  const i = rights.findIndex(q => q.id === portId);
  const yLocal = HEADER_H + ROW_PAD_TOP + i * ROW_H + 3;
  return [(node.x + node.w/2 - 8 - 3), (node.y - node.h/2) + yLocal];
}

function fillProgress(t, start, dur = 0.6) { return clamp((t - start) / dur, 0, 1); }

// ── Pipeline graph composition ────────────────────────────────────────────
function PipelineGraph({ nodes, t }) {
  // Packet flow: source → agent → output happens on top row
  // Bottom branches light up in sequence: agent.LLM-down→llm1, agent.Tool-down→subAgent
  // Then subAgent.LLM-down→llm2, subAgent.Tool-down→tool
  // Finally subAgent answers back up to agent → output
  const ps = TL.packetStart, pe = TL.packetEnd;
  const pT = clamp((t - ps) / (pe - ps), 0, 1);

  const litMap = {
    source:   t > ps + 0.05 ? 1 : 0,
    agent:    t > ps + 0.30 ? 1 : 0,
    llm1:     t > ps + 0.55 ? 1 : 0,
    subAgent: t > ps + 0.75 ? 1 : 0,
    llm2:     t > ps + 1.00 ? 1 : 0,
    tool:     t > ps + 1.10 ? 1 : 0,
    output:   t > ps + 1.40 ? 1 : 0,
  };

  const portsLit = {
    source:   { q: litMap.source },
    agent:    { q: litMap.agent, a: litMap.output, 'llm-down': litMap.llm1, 'tool-down': litMap.subAgent },
    output:   { a: litMap.output },
    llm1:     { in: litMap.llm1 },
    subAgent: { in: litMap.subAgent, 'llm-down': litMap.llm2, 'tool-down': litMap.tool },
    llm2:     { in: litMap.llm2 },
    tool:     { in: litMap.tool },
  };

  const progressMap = {
    source: fillProgress(t, TL.fillSource),
    agent:  fillProgress(t, TL.fillAgent),
    output: fillProgress(t, TL.fillOutput),
    llm1:   fillProgress(t, TL.fillLLM1),
    subAgent: fillProgress(t, TL.fillSubAg),
    llm2:   fillProgress(t, TL.fillLLM2),
    tool:   fillProgress(t, TL.fillTool),
  };

  const nodesWithState = {};
  for (const k in nodes) nodesWithState[k] = {
    ...nodes[k],
    active: litMap[k] || 0,
    activePorts: portsLit[k] || {},
    progress: progressMap[k] || 0,
  };

  // wires
  const wires = [
    { from: ['source','q','out'], to: ['agent','q','in'], drawAt: TL.drawW1, lit: litMap.agent>=1 },
    { from: ['agent','a','out'], to: ['output','a','in'], drawAt: TL.drawW2, lit: litMap.output>=1, dashed: false },
    { from: ['agent','llm-down','out'], to: ['llm1','in','in'], drawAt: TL.drawW3, lit: litMap.llm1>=1, vertical: true, dashed: true },
    { from: ['agent','tool-down','out'], to: ['subAgent','in','in'], drawAt: TL.drawW4, lit: litMap.subAgent>=1, vertical: true, dashed: true },
    { from: ['subAgent','llm-down','out'], to: ['llm2','in','in'], drawAt: TL.drawW5, lit: litMap.llm2>=1, vertical: true, dashed: true },
    { from: ['subAgent','tool-down','out'], to: ['tool','in','in'], drawAt: TL.drawW6, lit: litMap.tool>=1, vertical: true, dashed: true },
  ];

  // Packet positions per segment (just one moving packet through topline + branches abstractly)
  let packets = [];
  const segs = [
    { kS: 0.00, kE: 0.20, from: ['source','q','out'], to: ['agent','q','in'], vertical: false },
    { kS: 0.30, kE: 0.50, from: ['agent','llm-down','out'], to: ['llm1','in','in'], vertical: true },
    { kS: 0.50, kE: 0.70, from: ['agent','tool-down','out'], to: ['subAgent','in','in'], vertical: true },
    { kS: 0.70, kE: 0.85, from: ['subAgent','tool-down','out'], to: ['tool','in','in'], vertical: true },
    { kS: 0.78, kE: 0.92, from: ['subAgent','llm-down','out'], to: ['llm2','in','in'], vertical: true },
    { kS: 0.92, kE: 1.00, from: ['agent','a','out'], to: ['output','a','in'], vertical: false },
  ];
  if (t >= ps && t <= pe) {
    for (const seg of segs) {
      if (pT >= seg.kS && pT <= seg.kE) {
        const local = (pT - seg.kS) / (seg.kE - seg.kS);
        const [a,ap,as] = seg.from;
        const [b,bp,bs] = seg.to;
        const [x1,y1] = portPos(nodes[a], ap, as);
        const [x2,y2] = portPos(nodes[b], bp, bs);
        const path = bezierPath(x1,y1,x2,y2, seg.vertical);
        const [px,py] = bezierPoint(local, path.p0, path.p1, path.p2, path.p3);
        packets.push({ x: px, y: py });
      }
    }
  }

  return (
    <React.Fragment>
      {wires.map((w, i) => {
        const [a,ap,as] = w.from;
        const [b,bp,bs] = w.to;
        const [x1,y1] = portPos(nodes[a], ap, as);
        const [x2,y2] = portPos(nodes[b], bp, bs);
        return <Connector key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          drawAt={w.drawAt} drawDur={0.55} lit={w.lit}
          vertical={!!w.vertical} dashed={!!w.dashed} />;
      })}
      {Object.values(nodesWithState).map(n => <PipelineNode key={n.id} node={n}/>)}
      {packets.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: p.x - 6, top: p.y - 6,
          width: 12, height: 12, borderRadius: 6,
          background: RR_TOKENS.accent,
          boxShadow: `0 0 14px rgba(0,185,236,0.95), 0 0 28px rgba(0,185,236,0.5)`,
          pointerEvents: 'none', zIndex: 30,
        }}/>
      ))}
    </React.Fragment>
  );
}

// ── Top bar (tabs + Deploy) ──────────────────────────────────────────────
function TopBar({ activeTab, t, hideAt }) {
  const showT = clamp((t - TL.tabBarAt) / 0.4, 0, 1);
  const fadeOut = clamp((t - hideAt) / 0.3, 0, 1);
  const op = Easing.easeOutCubic(showT) * (1 - fadeOut);
  if (op <= 0) return null;
  const ty = (1 - showT) * -8;
  const tabs = ['Pipeline', 'Trace', 'Metrics'];
  return (
    <div style={{
      position: 'absolute', left: '50%', top: 60,
      transform: `translate(-50%, ${ty}px)`,
      opacity: op,
      display: 'flex', alignItems: 'center', gap: 8, zIndex: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 4,
        background: 'rgba(26,26,26,0.95)',
        border: `1px solid rgba(120,120,130,0.45)`,
        borderRadius: 10,
        boxShadow: '0 14px 32px rgba(0,0,0,0.55)' }}>
        {tabs.map((label, i) => {
          const active = activeTab === i;
          return (
            <div key={i} style={{
              padding: '6px 14px',
              fontFamily: SANS, fontSize: 12, fontWeight: 600,
              color: active ? '#000' : RR_TOKENS.textMuted,
              background: active ? RR_TOKENS.accent : 'transparent',
              borderRadius: 7,
              transition: 'background 200ms, color 200ms',
              boxShadow: active ? `0 0 14px rgba(0,185,236,0.5)` : 'none',
            }}>{label}</div>
          );
        })}
      </div>
      <DeployButton t={t}/>
    </div>
  );
}

function DeployButton({ t }) {
  const armed = t > TL.cursorOnDeployAt - 0.4;
  const clicked = t >= TL.deployClickAt && t < TL.deployClickAt + 0.3;
  return (
    <div style={{
      padding: '7px 14px', borderRadius: 10,
      background: armed ? RR_TOKENS.accent : 'rgba(0,185,236,0.85)',
      color: '#000', fontFamily: SANS, fontSize: 12, fontWeight: 700,
      display: 'flex', alignItems: 'center', gap: 6,
      boxShadow: armed
        ? `0 0 22px rgba(0,185,236,0.7), 0 0 0 2px rgba(0,185,236,0.25)`
        : `0 0 12px rgba(0,185,236,0.45)`,
      transform: clicked ? 'scale(0.96)' : 'scale(1)',
      transition: 'transform 120ms, box-shadow 200ms',
    }}>
      <div style={{ width: 6, height: 6, borderRadius: 1, background: '#000' }}/>
      <span>Deploy</span>
    </div>
  );
}

// ── Trace view ───────────────────────────────────────────────────────────
function TraceView({ t, showAt, hideAt }) {
  const showT = clamp((t - showAt) / 0.4, 0, 1);
  const fadeOut = clamp((t - hideAt) / 0.3, 0, 1);
  const op = Easing.easeOutCubic(showT) * (1 - fadeOut);
  if (op <= 0) return null;
  const ty = (1 - showT) * 18;
  const rows = [
    { off: 0.00, w: 0.12, role: 'SOURCE' },
    { off: 0.12, w: 0.30, role: 'AGENT' },
    { off: 0.18, w: 0.18, role: 'LLM' },
    { off: 0.36, w: 0.25, role: 'AGENT' },
    { off: 0.42, w: 0.16, role: 'LLM' },
    { off: 0.42, w: 0.20, role: 'TOOL' },
    { off: 0.62, w: 0.30, role: 'AGENT' },
    { off: 0.92, w: 0.08, role: 'OUTPUT' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 130, top: 130,
      width: 820, height: 460,
      transform: `translateY(${ty}px)`, opacity: op,
      borderRadius: 12, background: 'rgba(20,20,20,0.96)',
      border: `1px solid rgba(120,120,130,0.4)`,
      padding: 24,
      boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      display: 'flex', flexDirection: 'column', gap: 14,
      fontFamily: SANS,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 5, height: 5, borderRadius: 1, background: RR_TOKENS.accent, boxShadow: `0 0 6px ${RR_TOKENS.accent}` }}/>
        <div style={{ fontSize: 11, fontFamily: MONO, letterSpacing: '0.14em', color: RR_TOKENS.textLabel, textTransform: 'uppercase' }}>// trace · run #2148</div>
        <div style={{ flex: 1 }}/>
        <div style={{ fontSize: 11, fontFamily: MONO, color: RR_TOKENS.textDim }}>1.84s · 8 steps · ok</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, justifyContent: 'center' }}>
        {rows.map((r, i) => {
          const localT = clamp((t - showAt - 0.15 - i * 0.06) / 0.4, 0, 1);
          const e = Easing.easeOutCubic(localT);
          const rc = ROLE[r.role];
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 22, display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: rc.fill, border: `1px solid ${rc.stroke}` }}/>
              </div>
              <div style={{ flex: 1, height: 16, position: 'relative', background: 'rgba(255,255,255,0.04)', borderRadius: 4 }}>
                <div style={{
                  position: 'absolute',
                  left: `${r.off * 100}%`,
                  width: `${r.w * 100 * e}%`, height: '100%',
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${rc.fill}, ${rc.dot})`,
                  boxShadow: `0 0 10px ${rc.fill}`,
                }}/>
              </div>
              <div style={{ width: 56, textAlign: 'right', fontFamily: MONO, fontSize: 11, color: RR_TOKENS.textMuted, opacity: localT }}>
                {Math.round(r.w * 1840)}ms
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 9, color: RR_TOKENS.textLabel }}>
        {['0ms','460ms','920ms','1380ms','1840ms'].map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
}

// ── Metrics view ─────────────────────────────────────────────────────────
function MetricsView({ t, showAt, hideAt }) {
  const showT = clamp((t - showAt) / 0.4, 0, 1);
  const fadeOut = clamp((t - hideAt) / 0.3, 0, 1);
  const op = Easing.easeOutCubic(showT) * (1 - fadeOut);
  if (op <= 0) return null;
  const ty = (1 - showT) * 18;

  const N = 60;
  const points = [];
  for (let i = 0; i < N; i++) {
    const localT = t - showAt;
    const v = 0.55 + 0.18 * Math.sin(i*0.32 + localT*0.8) + 0.10 * Math.sin(i*0.7 + localT*1.6);
    points.push(v);
  }
  const W = 360, H = 90;
  const path = points.map((v, i) => {
    const x = (i / (N - 1)) * W;
    const y = H - v * H * 0.85 - H * 0.05;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const bars = [];
  for (let i = 0; i < 12; i++) {
    const localT = t - showAt - i * 0.06;
    const v = 0.4 + 0.5 * Math.abs(Math.sin(localT * 1.0 + i * 0.7));
    bars.push(clamp(v, 0.15, 1));
  }

  return (
    <div style={{
      position: 'absolute', left: 130, top: 130,
      width: 820, height: 460,
      transform: `translateY(${ty}px)`, opacity: op,
      borderRadius: 12, background: 'rgba(20,20,20,0.96)',
      border: `1px solid rgba(120,120,130,0.4)`,
      padding: 24, boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto 1fr', gap: 16,
      fontFamily: SANS,
    }}>
      <div style={{ gridColumn: '1 / 3', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 5, height: 5, borderRadius: 1, background: RR_TOKENS.accent, boxShadow: `0 0 6px ${RR_TOKENS.accent}` }}/>
        <div style={{ fontSize: 11, fontFamily: MONO, letterSpacing: '0.14em', color: RR_TOKENS.textLabel, textTransform: 'uppercase' }}>// metrics · last 1h</div>
      </div>
      <MetricCard label="latency p95" value="312ms" sub="−18ms vs hr">
        <svg width="100%" height="90" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="lat-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,185,236,0.55)"/>
              <stop offset="100%" stopColor="rgba(0,185,236,0)"/>
            </linearGradient>
          </defs>
          <path d={`${path} L${W},${H} L0,${H} Z`} fill="url(#lat-fill)"/>
          <path d={path} fill="none" stroke={RR_TOKENS.accent} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </MetricCard>
      <MetricCard label="throughput" value="48.6k/s" sub="+4% vs hr">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
          {bars.map((v, i) => (
            <div key={i} style={{
              flex: 1, height: `${v * 100}%`, borderRadius: 3,
              background: `linear-gradient(180deg, ${RR_TOKENS.accent}, rgba(0,185,236,0.3))`,
              boxShadow: v > 0.7 ? '0 0 8px rgba(0,185,236,0.5)' : 'none',
            }}/>
          ))}
        </div>
      </MetricCard>
    </div>
  );
}
function MetricCard({ label, value, sub, children }) {
  return (
    <div style={{ borderRadius: 10, background: 'rgba(28,28,28,0.85)',
      border: `1px solid rgba(120,120,130,0.3)`, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: RR_TOKENS.textLabel, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
        <span style={{ flex: 1 }}/>
        <span style={{ fontSize: 10, color: RR_TOKENS.accent, fontFamily: MONO }}>{sub}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', color: '#fff' }}>{value}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

// ── Cursor scripted path ─────────────────────────────────────────────────
function computeCursor(t) {
  if (t < 4.8) return { visible: false, x: 0, y: 0, opacity: 0, clicking: 0 };
  const tabPos = (i) => ({ x: [468, 540, 612][i], y: 78 });
  const deployPos = { x: 700, y: 78 };
  const kf = [];
  kf.push({ t: 5.0, x: 250, y: 280, opacity: 0, clicking: 0 });
  kf.push({ t: 6.5, x: 350, y: 230, opacity: 0.95, clicking: 0 });
  kf.push({ t: TL.traceClickAt - 0.05, x: tabPos(1).x, y: tabPos(1).y, opacity: 1, clicking: 0 });
  kf.push({ t: TL.traceClickAt + 0.05, x: tabPos(1).x, y: tabPos(1).y, opacity: 1, clicking: 1 });
  kf.push({ t: TL.traceClickAt + 0.25, x: tabPos(1).x, y: tabPos(1).y, opacity: 1, clicking: 0 });
  kf.push({ t: 8.3, x: 540, y: 320, opacity: 1, clicking: 0 });
  kf.push({ t: TL.metricsClickAt - 0.05, x: tabPos(2).x, y: tabPos(2).y, opacity: 1, clicking: 0 });
  kf.push({ t: TL.metricsClickAt + 0.05, x: tabPos(2).x, y: tabPos(2).y, opacity: 1, clicking: 1 });
  kf.push({ t: TL.metricsClickAt + 0.25, x: tabPos(2).x, y: tabPos(2).y, opacity: 1, clicking: 0 });
  kf.push({ t: 9.3, x: 600, y: 320, opacity: 1, clicking: 0 });
  kf.push({ t: TL.backToPipelineAt - 0.05, x: tabPos(0).x, y: tabPos(0).y, opacity: 1, clicking: 0 });
  kf.push({ t: TL.backToPipelineAt + 0.05, x: tabPos(0).x, y: tabPos(0).y, opacity: 1, clicking: 1 });
  kf.push({ t: TL.backToPipelineAt + 0.25, x: tabPos(0).x, y: tabPos(0).y, opacity: 1, clicking: 0 });
  kf.push({ t: TL.cursorOnDeployAt - 0.05, x: deployPos.x, y: deployPos.y, opacity: 1, clicking: 0 });
  kf.push({ t: TL.deployClickAt - 0.02, x: deployPos.x, y: deployPos.y, opacity: 1, clicking: 0 });
  kf.push({ t: TL.deployClickAt + 0.02, x: deployPos.x, y: deployPos.y, opacity: 1, clicking: 1 });
  kf.push({ t: TL.deployClickAt + 0.18, x: deployPos.x, y: deployPos.y, opacity: 1, clicking: 0 });
  kf.push({ t: TL.scaleStartAt + 0.2, x: deployPos.x, y: deployPos.y, opacity: 0, clicking: 0 });
  kf.push({ t: 15.0, x: deployPos.x, y: deployPos.y, opacity: 0, clicking: 0 });

  let prev = kf[0], next = kf[kf.length - 1];
  for (let i = 0; i < kf.length - 1; i++) {
    if (t >= kf[i].t && t <= kf[i+1].t) { prev = kf[i]; next = kf[i+1]; break; }
  }
  if (t < kf[0].t) { prev = next = kf[0]; }
  if (t > kf[kf.length - 1].t) { prev = next = kf[kf.length - 1]; }
  const dt = next.t - prev.t;
  const k = dt > 0 ? clamp((t - prev.t) / dt, 0, 1) : 1;
  const e = Easing.easeInOutCubic(k);
  const x = prev.x + (next.x - prev.x) * e;
  const y = prev.y + (next.y - prev.y) * e;
  const opacity = prev.opacity + (next.opacity - prev.opacity) * k;
  const clicking = prev.clicking + (next.clicking - prev.clicking) * k;

  const clickTimes = [TL.traceClickAt, TL.metricsClickAt, TL.backToPipelineAt, TL.deployClickAt];
  let ripple = null;
  for (const ct of clickTimes) {
    if (t >= ct && t < ct + 0.55) { ripple = { x, y, progress: (t - ct) / 0.55 }; break; }
  }
  return { visible: opacity > 0.01, x, y, opacity, clicking, ripple };
}

function ClickRipple({ x, y, progress }) {
  const r = 6 + progress * 30;
  const op = (1 - progress) * 0.6;
  return (
    <div style={{ position: 'absolute', left: x - r, top: y - r,
      width: r * 2, height: r * 2, borderRadius: r,
      border: `1.5px solid ${RR_TOKENS.accent}`,
      opacity: op, pointerEvents: 'none', zIndex: 49 }}/>
  );
}

// ── Phase 3 deployed grid ────────────────────────────────────────────────
function DeployedGrid({ t, fanT }) {
  const cols = 6, rows = 4;
  const cx = 540, cy = 380;
  const gx = 90, gy = 90;
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const tx = cx + (c - (cols - 1) / 2) * gx;
      const ty = cy + (r - (rows - 1) / 2) * gy;
      const stagger = ((Math.abs(c - (cols - 1) / 2)) + Math.abs(r - (rows - 1) / 2)) * 0.04;
      const local = clamp((t - TL.fanStartAt - stagger) / 0.55, 0, 1);
      const e = Easing.easeOutBack(local);
      const x = cx + (tx - cx) * e;
      const y = cy + (ty - cy) * e;
      const op = Math.min(1, local * 1.8);
      const heart = 0.6 + 0.4 * Math.abs(Math.sin(t * 2.4 + idx * 0.5));
      tiles.push({ x, y, op, heart, idx });
    }
  }
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(40% 40% at 50% 50%, rgba(0,185,236,${0.20 * (1 - Math.abs(fanT - 0.4) * 1.3)}), transparent 70%)`,
        mixBlendMode: 'screen' }}/>
      {tiles.map(tile => (
        <div key={tile.idx} style={{
          position: 'absolute', left: tile.x - 36, top: tile.y - 28,
          width: 72, height: 56, borderRadius: 8,
          background: 'rgba(28,28,28,0.95)',
          border: `1px solid rgba(120,120,130,0.5)`,
          opacity: tile.op,
          boxShadow: `0 0 0 1px rgba(0,185,236,${0.20*tile.heart}), 0 8px 16px rgba(0,185,236,${0.12*tile.heart})`,
          padding: 8, display: 'flex', flexDirection: 'column', gap: 5,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(0,185,236,0.18)', border: `1px solid rgba(0,185,236,0.4)` }}/>
            <div style={{ flex: 1, height: 2.5, borderRadius: 1.5, background: 'rgba(255,255,255,0.18)' }}/>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: RR_TOKENS.accent, opacity: tile.heart, boxShadow: `0 0 4px ${RR_TOKENS.accent}` }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'space-between' }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ flex: 1, height: 14, borderRadius: 2,
                background: 'rgba(0,185,236,0.18)', border: `1px solid rgba(0,185,236,0.35)` }}/>
            ))}
          </div>
          <div style={{ height: 3, borderRadius: 1.5, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ width: `${50 + tile.heart * 50}%`, height: '100%', background: RR_TOKENS.accent, boxShadow: `0 0 4px ${RR_TOKENS.accent}` }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function PhasePips({ t }) {
  const phase = t < 5 ? 0 : t < 10 ? 1 : 2;
  return (
    <div style={{ position: 'absolute', left: '50%', bottom: 28,
      transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 5 }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: i === phase ? 24 : 6, height: 6, borderRadius: 3,
          background: i === phase ? RR_TOKENS.accent : 'rgba(255,255,255,0.18)',
          boxShadow: i === phase ? `0 0 8px ${RR_TOKENS.accent}` : 'none',
          transition: 'width 360ms cubic-bezier(0.4, 0, 0.2, 1), background 200ms',
        }}/>
      ))}
    </div>
  );
}

function RocketRideHowItWorks() {
  const t = useTime();
  const tRoot = React.useRef(null);
  const nodes = React.useMemo(pipelineNodes, []);

  React.useEffect(() => {
    if (!tRoot.current) return;
    tRoot.current.setAttribute('data-screen-label', `t=${Math.floor(t)}s`);
  }, [t]);

  let activeTab = 0;
  if (t >= TL.traceClickAt && t < TL.metricsClickAt) activeTab = 1;
  else if (t >= TL.metricsClickAt && t < TL.backToPipelineAt) activeTab = 2;

  const scaleT = clamp((t - TL.scaleStartAt) / (TL.scaleEndAt - TL.scaleStartAt), 0, 1);
  const fanT = clamp((t - TL.fanStartAt) / (TL.fanEndAt - TL.fanStartAt), 0, 1);
  const pipeScale = 1 - scaleT * 0.6;
  const pipeOpacity = scaleT < 0.7 ? 1 - scaleT * 0.4 : 1 - 0.28 - (scaleT - 0.7) / 0.3 * 0.72;
  const gridVisible = fanT > 0.01;

  const cursor = computeCursor(t);

  return (
    <div ref={tRoot} data-screen-label="t=0s" style={{ position: 'absolute', inset: 0 }}>
      <RRBackground/>
      {activeTab === 0 && t < TL.scaleEndAt && (
        <div style={{ position: 'absolute', inset: 0,
          opacity: pipeOpacity, transform: `scale(${pipeScale})`,
          transformOrigin: '50% 50%' }}>
          <PipelineGraph nodes={nodes} t={t}/>
        </div>
      )}
      {activeTab === 1 && <TraceView t={t} showAt={TL.traceClickAt} hideAt={TL.metricsClickAt - 0.001}/>}
      {activeTab === 2 && <MetricsView t={t} showAt={TL.metricsClickAt} hideAt={TL.backToPipelineAt - 0.001}/>}
      {t >= TL.tabBarAt - 0.1 && <TopBar activeTab={activeTab} t={t} hideAt={TL.scaleStartAt}/>}
      {gridVisible && <DeployedGrid t={t} fanT={fanT}/>}
      {cursor.visible && <Cursor x={cursor.x} y={cursor.y} opacity={cursor.opacity} clicking={cursor.clicking}/>}
      {cursor.ripple && <ClickRipple x={cursor.ripple.x} y={cursor.ripple.y} progress={cursor.ripple.progress}/>}
      <PhasePips t={t}/>
    </div>
  );
}

Object.assign(window, { RocketRideHowItWorks, RR_TOKENS });
