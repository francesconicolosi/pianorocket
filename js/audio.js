/* Piano Rocket – audio: pianoforte, effetti, volume */
'use strict';
/* ---------- audio ---------- */
let ac,master;const vol=$('vol');vol.value=LS('pr_vol',70);
function audio(){if(!ac){ac=new AudioContext();master=ac.createGain();master.connect(ac.destination);}master.gain.value=(vol.value/100)**1.5;if(ac.state==='suspended')ac.resume();return ac;}
vol.oninput=()=>{localStorage.setItem('pr_vol',vol.value);if(master)master.gain.value=(vol.value/100)**1.5;};
function tone(f,type,g0,dur,at){const a=audio(),o=a.createOscillator(),g=a.createGain(),t0=Math.max(a.currentTime,at??a.currentTime);
 o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(g0,t0+.008);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
 o.connect(g).connect(master);o.start(t0);o.stop(t0+dur+.05);}

/* Pianoforte: campioni reali (Salamander Grand Piano, CC-BY 3.0) con fallback sintetico */
const SAMPLE_BASE='https://tonejs.github.io/audio/salamander/',SN=['C','Ds','Fs','A'],samples={};let sampleState='idle';
function loadSamples(){if(sampleState!=='idle')return;sampleState='loading';soundUI();const a=audio(),jobs=[];
 for(let o=1;o<=7;o++)SN.forEach((nm,i)=>{const midi=12*(o+1)+i*3;if(midi<33||midi>99)return;
  jobs.push(fetch(SAMPLE_BASE+nm+o+'.mp3').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer();})
   .then(b=>new Promise((res,rej)=>a.decodeAudioData(b,res,rej))).then(buf=>{samples[midi]=buf;}).catch(()=>{}));});
 Promise.all(jobs).then(()=>{sampleState=Object.keys(samples).length>=8?'ready':'failed';soundUI();});}
function soundUI(){const m={idle:'',loading:'Caricamento pianoforte…',ready:'✅ Pianoforte vero pronto',failed:'⚠️ Offline: uso il piano sintetico'};
 $('soundStatus').textContent=$('soundSel').value==='piano'?m[sampleState]:'';}
$('soundSel').value=LS('pr_sound','piano');
$('soundSel').onchange=()=>{localStorage.setItem('pr_sound',$('soundSel').value);$('soundSel').blur();if($('soundSel').value==='piano')loadSamples();soundUI();};
const voices={};let reverb;
function getReverb(){if(reverb)return reverb;const a=audio(),len=a.sampleRate*1.8,ir=a.createBuffer(2,len,a.sampleRate);
 for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3);}
 const c=a.createConvolver();c.buffer=ir;const wet=a.createGain();wet.gain.value=.18;c.connect(wet).connect(master);reverb=c;return c;}
function out(node){node.connect(master);node.connect(getReverb());}
function stopVoice(n,rel){const v=voices[n];if(!v)return;delete voices[n];const a=audio(),t0=a.currentTime;
 v.g.gain.cancelScheduledValues(t0);v.g.gain.setValueAtTime(v.g.gain.value,t0);v.g.gain.setTargetAtTime(0,t0,rel/4);
 v.srcs.forEach(s=>{try{s.stop(t0+rel+.1);}catch(e){}});}
function playSample(n,vel){const a=audio();let best=null;
 for(const k in samples)if(best===null||Math.abs(k-n)<Math.abs(best-n))best=+k;
 const src=a.createBufferSource();src.buffer=samples[best];src.playbackRate.value=2**((n-best)/12);
 const g=a.createGain(),v=vel/127;g.gain.value=.25+.9*v*v;
 const f=a.createBiquadFilter();f.type='lowpass';f.frequency.value=1800+v*9000;
 src.connect(f).connect(g);out(g);src.start();return{g,srcs:[src]};}
function playSynth(n,vel){const a=audio(),t0=a.currentTime,f0=440*2**((n-69)/12),v=vel/127;
 const g=a.createGain();g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.18+.32*v,t0+.004);
 const decay=Math.max(1.2,6-(n-48)*.08);g.gain.setTargetAtTime(.0001,t0+.004,decay/4);
 const lp=a.createBiquadFilter();lp.type='lowpass';lp.Q.value=.4;lp.frequency.setValueAtTime(Math.min(16000,f0*(6+10*v)),t0);
 lp.frequency.exponentialRampToValueAtTime(Math.max(f0*1.5,300),t0+decay*.6);lp.connect(g);out(g);
 const B=.0004,amps=[1,.55,.32,.2,.12,.08,.05,.03],srcs=[];
 amps.forEach((am,i)=>{const k=i+1,o=a.createOscillator(),og=a.createGain();o.type='sine';
  o.frequency.value=f0*k*Math.sqrt(1+B*k*k)*(1+(Math.random()-.5)*.0008);
  og.gain.value=am;og.gain.setTargetAtTime(0,t0,decay/(2+k*1.4));o.connect(og).connect(lp);o.start(t0);o.stop(t0+decay*1.5);srcs.push(o);});
 const nb=a.createBuffer(1,a.sampleRate*.03,a.sampleRate),d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length)**2;
 const ns=a.createBufferSource(),bp=a.createBiquadFilter(),ng=a.createGain();ns.buffer=nb;bp.type='bandpass';bp.frequency.value=Math.min(8000,f0*4);ng.gain.value=.12*v;
 ns.connect(bp).connect(ng).connect(g);ns.start(t0);return{g,srcs};}
function playToy(n,vel){const f=440*2**((n-69)/12),v=.15+.35*vel/127;tone(f,'triangle',v,1.4);tone(f*2,'sine',v*.25,.8);return null;}
function play(n,vel){stopVoice(n,.08);const m=$('soundSel').value;
 const vo=m==='toy'?playToy(n,vel):(m==='piano'&&sampleState==='ready')?playSample(n,vel):playSynth(n,vel);if(vo)voices[n]=vo;}
const sfxOk=()=>{const a=audio();tone(1318,'sine',.05,.16);tone(1760,'sine',.04,.2,a.currentTime+.05);};
const sfxNo=()=>tone(150,'square',.05,.2);
const sfxWin=()=>{const a=audio();[0,4,7,12].forEach((s,i)=>tone(523*2**(s/12),'triangle',.12,.5,a.currentTime+i*.12));};
