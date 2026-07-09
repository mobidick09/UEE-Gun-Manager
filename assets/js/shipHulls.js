// Ship hull maps: turret positions + hull background art (extracted PNG assets)
// One function per ship preset, returning {W,H,hull,tp,style} for the SVG map renderer.

// IDRIS — top-view, ship pointing RIGHT (fore=right, aft=left)
// T1 = Port Fore Wing (far left, mid height)
// T2 = Dorsal Fore-Port (top-center-left area)
// T3 = Dorsal Fore-Stbd (top-center, right of T2)
// T4 = Ventral Fore-Port (bottom-center-left)
// T5 = Ventral Fore-Stbd (bottom-center, right of T4)
// T6 = Starboard Mid (far right, mid height)
// T7 = Port Mid (center-right, port side)
// T8 = Stbd Mid (center-right, stbd side)
export function mapIdris(){
  const W=640,H=419;
  const tp=[
    {x:89,y:201},
    {x:394,y:93},
    {x:389,y:302},
    {x:459,y:94},
    {x:457,y:303},
    {x:561,y:195},
    {x:346,y:263},
    {x:345,y:133}
  ];
  const hull=`<rect x="0" y="0" width="${W}" height="${H}" fill="#030803"/><image href="assets/hulls/idris.png" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid meet"/>`;
  return {W,H,hull,tp,style:"idris"};
}

export function mapHammerhead(){
  const W=640,H=320;
  const tp=[
    {x:335,y:160},
    {x:105,y:58},
    {x:119,y:254},
    {x:304,y:25},
    {x:301,y:266},
    {x:525,y:153}
  ];
  const hull=`<rect x="0" y="0" width="${W}" height="${H}" fill="#030803"/><image href="assets/hulls/hammerhead.png" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid meet"/>`;
  return {W,H,hull,tp,style:"hammerhead"};
}

export function mapPolaris(){
  const W=640,H=419;
  const tp=[
    {x:110,y:193},
    {x:233,y:157},
    {x:229,y:231},
    {x:317,y:123},
    {x:317,y:268},
    {x:529,y:196}
  ];
  const hull=`<rect x="0" y="0" width="${W}" height="${H}" fill="#030803"/><image href="assets/hulls/polaris.png" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid meet"/>`;
  return {W,H,hull,tp,style:"polaris"};
}

export function mapPerseus(){
  const W=640,H=427;
  const tp=[
    {x:164,y:210},
    {x:412,y:209},
    {x:136,y:209},
    {x:371,y:209}
  ];
  const hull=`<rect x="0" y="0" width="${W}" height="${H}" fill="#030803"/><image href="assets/hulls/perseus.png" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid meet"/>`;
  return {W,H,hull,tp,style:"perseus"};
}
