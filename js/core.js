/* Piano Rocket – costanti, utilità, canvas e stato condiviso */
'use strict';
const NAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const IT=['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si'];
const NC=['#ff4d5e','#ff4d5e','#ff9a3c','#ff9a3c','#ffd93d','#4ee08a','#4ee08a','#3cc8ff','#3cc8ff','#5b6cff','#5b6cff','#b05bff'];
const PCOL=['#ff6b7a','#5ad1ff'];
const pc=n=>((n%12)+12)%12, isBlack=n=>NAMES[pc(n)].includes('#');
const $=id=>document.getElementById(id);
const LS=(k,d)=>localStorage.getItem(k)??d;
function parseSong(str){let t=0;const out=[];
 for(const tok of str.trim().split(/\s+/)){const m=tok.match(/^([A-G]#?)(\d)(?::(\d*\.?\d+))?$/i);if(!m)return null;
  const d=m[3]?parseFloat(m[3]):1;if(!(d>0))return null;
  out.push({n:NAMES.indexOf(m[1].toUpperCase())+12*(+m[2]+1),t,d});t+=d;}
 return out.length?out:null;}

Object.assign(SONGS,JSON.parse(LS('pr_songs','{}')));   // melodie create dall'utente
const lvlOf=n=>LEVELS.indexOf(n);
const FONT=getComputedStyle(document.body).fontFamily;

/* ---------- canvas adattivo (full screen) ---------- */
const H=440;let W=960;
const cv=$('cv'),stage=$('stage');let ctx=cv.getContext('2d');
function resize(){const r=stage.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
 cv.width=Math.round(r.width*dpr);cv.height=Math.round(r.height*dpr);
 const s=cv.height/H;W=Math.max(600,cv.width/s);ctx.setTransform(s,0,0,s,0,0);}
new ResizeObserver(resize).observe(stage);resize();
function rr(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function txt(s,x,y,size,col,align='center',weight=800){ctx.font=`${weight} ${size}px ${FONT}`;ctx.fillStyle=col;ctx.textAlign=align;ctx.fillText(s,x,y);ctx.textAlign='left';}

$('fsBtn').onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{});$('fsBtn').blur();};
document.addEventListener('fullscreenchange',()=>{$('fsBtn').textContent=document.fullscreenElement?'🗗':'⛶';$('fsBtn').title=document.fullscreenElement?'Esci da schermo intero':'Schermo intero';});

/* ---------- stato ---------- */
let LOW=48,HIGH=71,SHIFT=-12,KEYS=24,PCBASE=48;
let mode=LS('pr_mode','rocket'),style=LS('pr_style','wait');
let seq=[],idx=0,playing=false,score=0,combo=0,errors=0,acc=0,t=0;
let parts=[],fws=[],pops=[],alt=0,altT=0,shake=0,flash=0,pressure=0;
let heroPos=-1,heroScreen={x:0,y:0},landSq=0;
let startTime=0,spb=.75,beat=-99,nextClick=0;
let phase='idle';
let numP=+LS('pr_np','1'),cur=0,results=[];
let players=JSON.parse(LS('pr_players','null'))||[{name:'Giocatore 1',char:'frog'},{name:'Giocatore 2',char:'miner'}];
const PXB=110,HIT_X=150,LANE_PPB=90,GROUND=()=>H-70;
const stars=Array.from({length:260},()=>({x:Math.random()*2400,y:Math.random()*H*3,s:Math.random()*1.8+.4,tw:Math.random()*6}));
