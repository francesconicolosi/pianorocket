/* Piano Rocket – giocatori (1–2) e scelta personaggio */
'use strict';
/* ---------- pannello giocatori ---------- */
let previews=[];
function savePlayers(){localStorage.setItem('pr_players',JSON.stringify(players));}
function buildPlayers(){const box=$('pcards');box.innerHTML='';previews=[];
 for(let p=0;p<numP;p++){const card=document.createElement('div');card.className='pcard p'+(p+1);
  card.innerHTML=`<div class="field">Nome giocatore ${p+1}</div>`;
  const inp=document.createElement('input');inp.type='text';inp.maxLength=14;inp.value=players[p].name;
  inp.oninput=()=>{players[p].name=inp.value.trim()||('Giocatore '+(p+1));savePlayers();};
  card.appendChild(inp);const grid=document.createElement('div');grid.className='chars';
  for(const id in CHARS){const b=document.createElement('button');b.type='button';b.classList.toggle('on',players[p].char===id);
   const c=document.createElement('canvas');const dpr=window.devicePixelRatio||1;c.width=64*dpr;c.height=76*dpr;
   b.appendChild(c);b.appendChild(document.createTextNode(CHARS[id][0]));
   b.onclick=()=>{players[p].char=id;savePlayers();grid.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));};
   grid.appendChild(b);previews.push({c,id,dpr});}
  card.appendChild(grid);box.appendChild(card);}
 syncBar();}
function drawPreviews(){if(!$('playersPanel').classList.contains('open'))return;const main=ctx;
 previews.forEach(({c,id,dpr})=>{ctx=c.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,64,76);drawChar(id,32,72,0,.85);});ctx=main;}
