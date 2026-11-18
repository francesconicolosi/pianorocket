/* Piano Rocket – Web MIDI e luci del Piano M */
'use strict';
/* ---------- MIDI + luci ---------- */
let midiAcc=null,lightOuts=[],sysexOK=false;const lit=new Set();
$('midiBtn').onclick=async()=>{
 if(!navigator.requestMIDIAccess){alert('Usa Chrome o Edge per collegare il Piano M');return;}
 try{
  try{midiAcc=await navigator.requestMIDIAccess({sysex:true});sysexOK=true;}
  catch(e){midiAcc=await navigator.requestMIDIAccess();sysexOK=false;}
  const bind=()=>{const ins=[...midiAcc.inputs.values()];ins.forEach(i=>i.onmidimessage=onMidi);
   const outs=[...midiAcc.outputs.values()],prev=LS('pr_lightOut',''),sel=$('lightOut');
   const roli=outs.filter(o=>/roli|piano m|lumi/i.test(o.name));
   sel.innerHTML='';sel.add(new Option('— nessuna —',''));
   if(roli.length>1)sel.add(new Option('Tutti i Piano M ('+roli.length+')','*'));
   outs.forEach(o=>sel.add(new Option(o.name,o.id)));
   const want=prev&&[...sel.options].some(op=>op.value===prev)?prev:(roli.length>1?'*':(roli[0]?.id||''));
   sel.value=want;applyLightOut();
   $('dot').classList.toggle('ok',ins.length>0);$('midiBtn').title=ins.length?'Collegato: '+ins.map(i=>i.name).join(', '):'Nessun dispositivo';
   highlight();};
  bind();midiAcc.onstatechange=bind;
 }catch(e){alert('Accesso MIDI negato');}
};
function applyLightOut(){const v=$('lightOut').value;
 if(!midiAcc||!v)lightOuts=[];
 else if(v==='*')lightOuts=[...midiAcc.outputs.values()].filter(o=>/roli|piano m|lumi/i.test(o.name));
 else lightOuts=[midiAcc.outputs.get(v)].filter(Boolean);
 setBrightness();}
$('lightOut').onchange=e=>{clearLights();localStorage.setItem('pr_lightOut',e.target.value);applyLightOut();highlight();};
function onMidi(e){const [st,d1,d2]=e.data,c=st&0xf0;
 if(c===0x90&&d2>0)noteOn(d1,d2);else if(c===0x80||(c===0x90&&d2===0))noteOff(d1);
 else if(c===0xD0)pressure=d1;else if(c===0xA0)pressure=d2;}
/* con 2 Piano M le note vanno a entrambi: ognuno accende solo i tasti che ha fisicamente */
const send=m=>{lightOuts.forEach(o=>{try{o.send(m);}catch(e){}});};
function roliSysex(cmd){let c=cmd.length;for(const b of cmd)c=(c*3+b)&0xff;return[0xF0,0,0x21,0x10,0x77,0x37,...cmd,c&0x7f,0xF7];}
function setBrightness(){if(lightOuts.length&&sysexOK)send(roliSysex([0x10,0x40,0x04,0x19,0,0,0,0]));}
function lightOn(n){if(!lightOuts.length||lit.has(n)||n<LOW||n>HIGH)return;send([0x90,n,100]);lit.add(n);}
function lightOff(n){send([0x80,n,0]);lit.delete(n);}
function setLights(a){[...lit].forEach(n=>{if(!a.includes(n))lightOff(n);});a.forEach(lightOn);}
function clearLights(){[...lit].forEach(lightOff);if(lightOuts.length)for(let n=LOW;n<=HIGH;n++)send([0x80,n,0]);}
let blinkT;function blink(n){clearInterval(blinkT);let i=0;blinkT=setInterval(()=>{i%2?lightOff(n):lightOn(n);if(++i>=6){clearInterval(blinkT);highlight();}},140);}
$('testLights').onclick=()=>{if(!lightOuts.length){alert('Prima collega il Piano M (pallino in alto)');return;}clearLights();(KEYS===48?[0,4,7,24,28,31]:[0,4,7]).forEach(i=>lightOn(LOW+12+i));setTimeout(()=>{clearLights();highlight();},2500);};
addEventListener('beforeunload',clearLights);
