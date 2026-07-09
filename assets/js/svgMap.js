// Pure SVG template builders for the ship turret maps.
// Callers assemble the per-turret "dots" markup (depends on live app state)
// and pass it in along with the hull markup from shipHulls.js.

export function buildMapSVG({W,H,hull,dots,label}){
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    ${hull}
    ${dots}
    <text x="12" y="22" fill="#00ff66" font-size="13" font-family="Consolas,monospace" font-weight="bold" letter-spacing="2" opacity="0.9">${label.toUpperCase()}</text>
  </svg>`;
}

export function buildTaoMapSVG({W,H,hull,dots,label,shipId}){
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block"><defs><filter id="tg${shipId}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${hull}${dots}<text x="12" y="22" fill="#00ff66" font-size="13" font-family="Consolas,monospace" font-weight="bold" letter-spacing="2" opacity="0.9">${label.toUpperCase()}</text></svg>`;
}
