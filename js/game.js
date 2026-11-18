/* Piano Rocket – logica di gioco (Con calma / A tempo) */
'use strict';
/* ================= LOGICA DI GIOCO ================= */
const platX=tb=>200+tb*PXB;
const platY=n=>H-115-(n-LOW)*Math.min(8,190/(HIGH-LOW));
const P=()=>players[cur];
function reset(){clearInterval(blinkT);clearLights();
 const s=parseSong(SONGS[songSel.value])||[];
 /* la melodia resta all'altezza scritta; si sposta di ottava solo se esce dai 24 tasti */
 const ns=s.map(x=>x.n);let sh=0;
 if(ns.length){for(let k=0;k<4&&Math.max(...ns)+sh>HIGH;k++)sh-=12;for(let k=0;k<4&&Math.min(...ns)+sh<LOW;k++)sh+=12;}
 seq=s.map(x=>({...x,n:x.n+sh,state:0}));
 idx=0;score=0;combo=0;errors=0;acc=0;playing=false;fws=[];parts=[];pops=[];alt=0;altT=0;heroPos=-1;beat=-99;
 highlight();}
function fullReset(){cur=0;results=[];phase='idle';reset();updateButtons();}
function begin(){const a=audio();reset();playing=true;phase='play';
 if(style==='tempo'){spb=60/+$('bpmSel').value;startTime=a.currentTime+.3+4*spb;nextClick=-4;beat=-4;}
 highlight();updateButtons();}
function start(){$('sheet').classList.remove('open');$('playersPanel').classList.remove('open');
 if(phase==='play')return;
 if(ended()){const nl=nextLevel();if(nl){songSel.value=nl;localStorage.setItem('pr_song',nl);}}   // passa al livello successivo
 if(phase!=='turn'){cur=0;results=[];}
 begin();}
function retry(){if(phase==='play')return;cur=0;results=[];begin();}
$('startBtn').onclick=()=>{$('startBtn').blur();start();};
$('retryBtn').onclick=()=>{$('retryBtn').blur();retry();};

const noteTime=s=>startTime+s.t*spb;
function dueNote(){
 if(!playing||idx>=seq.length)return null;const s=seq[idx];
 if(style!=='tempo')return s.n;
 const lead=+$('leadSel').value;if(lead<0)return s.n;
 if(!ac)return null;
 return ac.currentTime>=noteTime(s)-lead?s.n:null;}
let shown=null;
function highlight(){const n=dueNote();shown=n;
 Object.values(keyEls).forEach(e=>e.classList.remove('next'));
 if(n!=null){keyEls[n]?.classList.add('next');setLights([n]);}else setLights([]);}

function noteOn(n,vel){play(n,vel);const el=keyEls[n];el?.classList.add('down');
 if(!playing||idx>=seq.length)return;const s=seq[idx];
 if(style==='wait'){
  if(n===s.n){clearInterval(blinkT);combo++;score+=10*combo;s.state=1;sfxOk();success(s,vel);idx++;
   if(idx>=seq.length)finish();else highlight();}
  else{el?.classList.add('wrong');combo=0;errors++;flash=1;shake=8;sfxNo();blink(s.n);}
 }else{
  if(beat<-.5)return;
  const dt=ac.currentTime-noteTime(s),ad=Math.abs(dt);
  if(n===s.n&&ad<=.3){
   const g=ad<=.07?['Perfetto!',100,'#4ee08a']:ad<=.15?['Ottimo',70,'#5ad1ff']:['Bene',40,'#ffcb3d'];
   combo++;score+=g[1]*(1+Math.min(3,Math.floor(combo/4)));acc+=g[1];s.state=1;
   pops.push({text:g[0],col:g[2],sub:ad>.07?(dt<0?'un po\' presto':'un po\' tardi'):'',l:1});
   sfxOk();success(s,vel);idx++;highlight();
  }else{el?.classList.add('wrong');combo=0;flash=.6;sfxNo();}
 }}
function noteOff(n){keyEls[n]?.classList.remove('down','wrong');stopVoice(n,.35);}

function success(s,vel){const p=Math.max(vel,pressure)/127,col=NC[pc(s.n)];
 if(mode==='rocket'){const kx=40+(s.n-LOW)/(HIGH-LOW)*(W-80);
  fws.push({x:kx,y:H+10,vy:-(7+p*6),col,lab:IT[pc(s.n)],ty:130+Math.random()*90});altT+=1;}
 else landSq=0;
 burst(heroScreen.x,heroScreen.y-20,18,col);}
function miss(s){s.state=2;combo=0;errors++;pops.push({text:'Mancato',col:'#ff6b7a',sub:'',l:1});
 if(mode==='rocket'){for(let i=0;i<14;i++)parts.push({x:heroScreen.x+(Math.random()-.5)*30,y:heroScreen.y+30,vx:(Math.random()-.5)*2,vy:Math.random()*-1.5,l:60,c:'#8a91b8',r:5});shake=4;}}
function finish(){playing=false;setLights([]);sfxWin();
 let st,detail;
 if(style==='tempo'){const p=seq.length?acc/(100*seq.length):0;st=p>=.85?3:p>=.6?2:1;detail='Precisione '+Math.round(p*100)+'%';}
 else{st=errors===0?3:errors<=3?2:1;detail=errors?errors+(errors===1?' errore':' errori'):'Nessun errore!';}
 results[cur]={score,stars:st,detail};
 if(numP===2&&cur===0){phase='turn';cur=1;}else phase=numP===2?'results':'done';
 highlight();updateButtons();
 for(let i=0;i<6;i++)setTimeout(()=>burst(150+Math.random()*(W-300),120+Math.random()*140,60,NC[(Math.random()*12)|0],9),i*250);
 const wn=[];for(let n=LOW;n<=HIGH;n++)if(!isBlack(n))wn.push(n);
 wn.forEach((n,i)=>setTimeout(()=>lightOn(n),i*60));setTimeout(clearLights,wn.length*60+1200);}
function burst(x,y,k,c,sp=7){for(let i=0;i<k;i++){const a=Math.random()*6.28,s=Math.random()*sp;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:50+Math.random()*20,c});}}

function tempoTick(){const now=ac.currentTime;beat=(now-startTime)/spb;
 const last=seq[seq.length-1],endBeat=last?last.t+last.d:0;
 while(startTime+nextClick*spb<now+.12&&nextClick<endBeat){
  if($('metro').value==='1'||nextClick<0)tone(((nextClick%4)+4)%4===0?1600:1100,'square',.035,.05,startTime+nextClick*spb);
  nextClick++;}
 while(idx<seq.length&&now-noteTime(seq[idx])>.3){miss(seq[idx]);idx++;}
 if(dueNote()!==shown)highlight();
 if(idx>=seq.length&&beat>endBeat+.5)finish();}
