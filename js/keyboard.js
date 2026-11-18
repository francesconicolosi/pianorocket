/* Piano Rocket – tastiera a schermo e tastiera del PC */
'use strict';
/* ---------- tastiera a schermo + tastiera PC ---------- */
const PCKEYS='zsxdcvgbhnjmq2w3er5t6y7u';let keyEls={};
function buildKb(){const kb=$('kb');kb.innerHTML='';keyEls={};const show=$('names').value==='1';
 const whites=[];for(let n=LOW;n<=HIGH;n++)if(!isBlack(n))whites.push(n);const ww=100/whites.length;
 for(let n=LOW;n<=HIGH;n++){const el=document.createElement('div');el.style.setProperty('--c',NC[pc(n)]);const k=PCKEYS[n-PCBASE];
  if(isBlack(n)){const wi=whites.indexOf(n-1);el.className='b';el.style.left=`calc(${(wi+1)*ww}% - ${ww*.3}%)`;el.style.width=ww*.6+'%';el.innerHTML=k?`<span class="k">${k.toUpperCase()}</span>`:'';}
  else{el.className='w';el.innerHTML=(show?`<span class="n">${IT[pc(n)]}</span>`:'')+(k?`<span class="k">${k.toUpperCase()}</span>`:'');}
  el.addEventListener('pointerdown',e=>{e.preventDefault();noteOn(n,95);});
  el.addEventListener('pointerup',()=>noteOff(n));el.addEventListener('pointerleave',()=>noteOff(n));
  kb.appendChild(el);keyEls[n]=el;}
 highlight();}
/* Range tastiera.
   24 tasti (1 Piano M, ottava 0) = C3..B4 (MIDI 48..71).
   48 tasti (2 Piano M collegati) = C2..B5 (MIDI 36..83): un'ottava in più sotto e una sopra.
   La tastiera del PC suona sempre le 2 ottave centrali. */
function setRange(){clearLights();const o=+$('octSel').value;KEYS=+$('kbSize').value;
 if(KEYS===48){LOW=36+o;HIGH=83+o;PCBASE=LOW+12;}else{LOW=48+o;HIGH=71+o;PCBASE=LOW;}
 SHIFT=o-12;
 const nm=n=>NAMES[pc(n)]+(Math.floor(n/12)-1);$('rangeHint').textContent='Range: '+nm(LOW)+' – '+nm(HIGH);
 $('kb').classList.toggle('k48',KEYS===48);buildKb();fullReset();}
const typing=e=>e.target.tagName==='TEXTAREA'||e.target.type==='text';
addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||typing(e))return;
 const i=PCKEYS.indexOf(e.key.toLowerCase());if(i>=0){e.preventDefault();noteOn(PCBASE+i,100);}
 else if((e.code==='Space'||e.key==='Enter')&&e.target.tagName!=='BUTTON'){e.preventDefault();start();}});
addEventListener('keyup',e=>{const i=PCKEYS.indexOf(e.key.toLowerCase());if(i>=0)noteOff(PCBASE+i);});
