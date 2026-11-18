/* Piano Rocket – barra, impostazioni e livelli */
'use strict';
/* ---------- livelli e barra ---------- */
const songSel=$('songSel');
function fillSongs(sel){songSel.innerHTML='';
 const g1=document.createElement('optgroup');g1.label='Livelli';
 LEVELS.forEach((k,i)=>g1.appendChild(new Option(`⭐ Livello ${i+1} · ${k}`,k)));songSel.appendChild(g1);
 const g2=document.createElement('optgroup');g2.label='Gioco libero';
 Object.keys(SONGS).filter(k=>!LEVELS.includes(k)).forEach(k=>g2.appendChild(new Option(k,k)));songSel.appendChild(g2);
 if(sel)songSel.value=sel;}
const songTitle=n=>{const i=lvlOf(n);return i>=0?`Livello ${i+1} · ${n}`:n;};
function nextLevel(){const i=lvlOf(songSel.value);return i>=0&&i<LEVELS.length-1?LEVELS[i+1]:null;}
const ended=()=>phase==='done'||phase==='results';
function updateButtons(){const nl=ended()?nextLevel():null;
 $('startBtn').textContent=nl?`▶ Livello ${lvlOf(nl)+1}`:'▶ Gioca';
 $('retryBtn').classList.toggle('hide',!nl);}
songSel.onchange=()=>{songSel.blur();localStorage.setItem('pr_song',songSel.value);fullReset();};
function seg(id,get,set,after){const el=$(id);const sync=()=>el.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===String(get())));sync();
 el.querySelectorAll('button').forEach(b=>b.onclick=()=>{set(b.dataset.v);sync();b.blur();syncBar();after&&after();});}
seg('modeSeg',()=>mode,v=>{mode=v;localStorage.setItem('pr_mode',v);},()=>fullReset());
seg('playSeg',()=>style,v=>{style=v;localStorage.setItem('pr_style',v);},()=>fullReset());
seg('npSeg',()=>numP,v=>{numP=+v;localStorage.setItem('pr_np',v);},()=>{buildPlayers();fullReset();});
function syncBar(){$('bpmSel').classList.toggle('hide',style!=='tempo');$('npLabel').textContent=numP+'P';}
const persist=(id,key,def,cb)=>{$(id).value=LS(key,def);$(id).onchange=()=>{localStorage.setItem(key,$(id).value);$(id).blur();cb&&cb();};};
persist('bpmSel','pr_bpm','80',()=>fullReset());
persist('octSel','pr_oct','0',()=>setRange());
persist('kbSize','pr_kb','24',()=>setRange());
persist('names','pr_names','1',()=>buildKb());
persist('metro','pr_metro','1');
persist('leadSel','pr_lead','0.3',()=>highlight());
const openPanel=id=>{['sheet','playersPanel'].forEach(p=>$(p).classList.toggle('open',p===id&&!$(p).classList.contains('open')));};
$('setBtn').onclick=()=>openPanel('sheet');
$('playersBtn').onclick=()=>openPanel('playersPanel');
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).classList.remove('open'));
$('saveSong').onclick=()=>{const n=$('songName').value.trim()||'La mia melodia',notes=$('songNotes').value.trim();
 if(LEVELS.includes(n)){alert('Questo nome è già usato da un livello: scegline un altro');return;}
 if(!parseSong(notes)){alert('Formato non valido: usa C4, F#4, G4:2, A4:0.5…');return;}
 SONGS[n]=notes;const c=JSON.parse(LS('pr_songs','{}'));c[n]=notes;localStorage.setItem('pr_songs',JSON.stringify(c));
 fillSongs(n);fullReset();$('songName').value='';$('songNotes').value='';};
