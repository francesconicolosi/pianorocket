/* Piano Rocket – scenari, HUD, schermate e loop */
'use strict';
/* ---------- scenari ---------- */
const winter=()=>songSel.value==='Jingle Bells';
function drawHeroRocket(x,y,s,accent){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(Math.sin(t*3)*.04);
 const fl=18+Math.random()*12+(playing?Math.min(combo,12)*1.5:0);const g=ctx.createLinearGradient(0,24,0,24+fl);
 g.addColorStop(0,'#fff6b0');g.addColorStop(.4,'#ffae2b');g.addColorStop(1,'rgba(255,60,60,0)');
 ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-10,24);ctx.quadraticCurveTo(0,24+fl*1.4,10,24);ctx.fill();
 ctx.fillStyle=accent;ctx.beginPath();ctx.moveTo(-14,10);ctx.lineTo(-26,30);ctx.lineTo(-12,26);ctx.fill();
 ctx.beginPath();ctx.moveTo(14,10);ctx.lineTo(26,30);ctx.lineTo(12,26);ctx.fill();
 const bg=ctx.createLinearGradient(-16,0,16,0);bg.addColorStop(0,'#c9d2f0');bg.addColorStop(.5,'#fff');bg.addColorStop(1,'#aeb8dd');
 ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(0,-38);ctx.bezierCurveTo(20,-20,17,10,13,26);ctx.lineTo(-13,26);ctx.bezierCurveTo(-17,10,-20,-20,0,-38);ctx.fill();
 ctx.fillStyle=accent;ctx.beginPath();ctx.moveTo(0,-38);ctx.bezierCurveTo(10,-30,13,-24,14,-20);ctx.lineTo(-14,-20);ctx.bezierCurveTo(-13,-24,-10,-30,0,-38);ctx.fill();
 ctx.fillStyle='#2b3a7a';ctx.beginPath();ctx.arc(0,-2,9,0,7);ctx.fill();
 ctx.fillStyle='#5ad1ff';ctx.beginPath();ctx.arc(0,-2,6.5,0,7);ctx.fill();
 ctx.restore();}
function snow(cam=0){ctx.fillStyle='#fff';stars.forEach(s=>{if(s.x>W+400)return;
 const x=((s.x+Math.sin(t+s.tw)*20-cam*.3)%W+W)%W,y=(s.y*.4+t*25*s.s)%H;ctx.globalAlpha=.55+.3*Math.sin(s.tw);ctx.beginPath();ctx.arc(x,y,s.s*1.3,0,7);ctx.fill();});ctx.globalAlpha=1;}
function bgRocket(){const p=seq.length?alt/seq.length:0;
 const g=ctx.createLinearGradient(0,0,0,H);
 g.addColorStop(0,`hsl(${235-p*10},60%,${14-p*8}%)`);g.addColorStop(1,`hsl(${220-p*20},65%,${34-p*26}%)`);
 ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 stars.forEach(s=>{if(s.x>W)return;const y=((s.y+alt*90*s.s)%(H*3))-H;if(y<0||y>H)return;ctx.globalAlpha=(.4+.6*Math.abs(Math.sin(t*1.5+s.tw)))*Math.min(1,.3+p*1.2);ctx.fillStyle='#fff';ctx.fillRect(s.x,y,s.s,s.s);});ctx.globalAlpha=1;
 const px=W-160,py=(alt*120)%(H*2.5)-180;let gp=ctx.createRadialGradient(px-20,py,10,px,py+20,70);
 if(winter()){gp.addColorStop(0,'#e8f6ff');gp.addColorStop(1,'#6aa8d8');}else{gp.addColorStop(0,'#ffb36b');gp.addColorStop(1,'#c2410c');}
 ctx.fillStyle=gp;ctx.beginPath();ctx.arc(px,py+20,60,0,7);ctx.fill();
 ctx.strokeStyle=winter()?'#ffffffaa':'#ffd9a8aa';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(px,py+20,95,18,-.3,0,7);ctx.stroke();
 const py2=(alt*70+260)%(H*2.2)-120;gp=ctx.createRadialGradient(150,py2-10,4,160,py2,40);gp.addColorStop(0,'#a5f3fc');gp.addColorStop(1,'#3b5bdb');
 ctx.fillStyle=gp;ctx.beginPath();ctx.arc(160,py2,34,0,7);ctx.fill();
 if(alt<3){ctx.globalAlpha=1-alt/3;ctx.fillStyle=winter()?'#dfefff':'#2a3f8f';ctx.beginPath();ctx.ellipse(W/2,H+alt*80+60,W*.8,120,0,0,7);ctx.fill();
  ctx.fillStyle='#ffffff22';for(let i=0;i<Math.ceil(W/230)+1;i++){ctx.beginPath();ctx.ellipse((i*230+t*10)%(W+200)-100,H-40+alt*80,90,22,0,0,7);ctx.fill();}ctx.globalAlpha=1;}
 if(winter()&&alt<6){ctx.globalAlpha=Math.max(0,1-alt/6);snow();ctx.globalAlpha=1;}}
function tree(x,base,s){ctx.fillStyle='#5a3a22';ctx.fillRect(x-3*s,base-10*s,6*s,10*s);ctx.fillStyle='#1f6b4a';
 for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(x,base-(46-i*10)*s-10*s);ctx.lineTo(x-(14+i*5)*s,base-(18-i*8)*s-10*s+ (i*8)*s);ctx.lineTo(x+(14+i*5)*s,base-(18-i*8)*s-10*s+(i*8)*s);ctx.fill();}
 ctx.fillStyle='#ffffffcc';ctx.beginPath();ctx.moveTo(x,base-56*s);ctx.lineTo(x-6*s,base-44*s);ctx.lineTo(x+6*s,base-44*s);ctx.fill();}
function bgPlatform(cam){const wt=winter();const g=ctx.createLinearGradient(0,0,0,H);
 if(wt){g.addColorStop(0,'#0e1a4a');g.addColorStop(.6,'#3b5aa8');g.addColorStop(1,'#9ec3ec');}
 else{g.addColorStop(0,'#3a2c8a');g.addColorStop(.6,'#ff7eb6');g.addColorStop(1,'#ffc078');}
 ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.fillStyle=wt?'#f4f8ff':'#fff6d6';ctx.shadowColor=wt?'#cfe3ff':'#fff3b0';ctx.shadowBlur=40;ctx.beginPath();ctx.arc(W-180,wt?120:H-150,wt?38:50,0,7);ctx.fill();ctx.shadowBlur=0;
 const hill=(par,amp,base,col,fr)=>{ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W+12;x+=12)ctx.lineTo(x,base-Math.sin((x+cam*par)*fr)*amp-Math.sin((x+cam*par)*fr*2.3)*amp*.4);ctx.lineTo(W,H);ctx.fill();};
 if(wt){hill(.2,40,H-120,'#c9dcf5',.006);
  for(let i=-1;i<W/140+1;i++){const wx=i*140-((cam*.45)%140);tree(wx,H-80-Math.sin((wx+cam*.45)*.009)*20,.9);}
  hill(.45,30,H-70,'#e3eefb',.009);hill(.8,18,H-25,'#ffffff',.014);snow(cam);}
 else{hill(.2,40,H-120,'#6a3fa0',.006);hill(.45,30,H-70,'#4a2a7a',.009);hill(.8,18,H-25,'#2c1a52',.014);}}
function heroAt(pos){
 const pts=[{t:-1,x:platX(-1),y:GROUND()},...seq.map(s=>({t:s.t,x:platX(s.t),y:platY(s.n)}))];
 if(pos<=pts[0].t)return{x:pts[0].x,y:pts[0].y,air:0};
 for(let k=0;k<pts.length-1;k++){const a=pts[k],b=pts[k+1];if(pos<b.t){
  const u=Math.max(0,((pos-a.t)/(b.t-a.t)-.3)/.7);if(u<=0)return{x:a.x,y:a.y,air:0};
  const h=40+Math.min(50,Math.abs(b.x-a.x)*.15);
  return{x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u-h*Math.sin(Math.PI*u),air:u};}}
 const l=pts[pts.length-1];return{x:l.x,y:l.y,air:0};}
function drawPlatforms(){const G=GROUND(),wt=winter();
 ctx.fillStyle=wt?'#ffffff':'#2fae5a';rr(platX(-1)-90,G,150,20,10);ctx.fill();ctx.fillStyle=wt?'#7a8fb8':'#7a4a2a';rr(platX(-1)-84,G+14,138,60,8);ctx.fill();
 seq.forEach(s=>{const x=platX(s.t)-28,y=platY(s.n),w=Math.max(58,s.d*PXB-26),c=NC[pc(s.n)];
  if(s.state===1){ctx.fillStyle=c;ctx.shadowColor=c;ctx.shadowBlur=16;rr(x,y,w,18,9);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#ffffff55';rr(x+6,y+3,w-12,5,3);ctx.fill();
   if(wt){ctx.fillStyle='#fff';rr(x+2,y-4,w-4,7,4);ctx.fill();}}
  else if(s.state===2){ctx.fillStyle='#6b6f8a';rr(x,y+2,w,16,8);ctx.fill();ctx.strokeStyle='#3b3f58';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+w*.45,y+2);ctx.lineTo(x+w*.52,y+10);ctx.lineTo(x+w*.46,y+18);ctx.stroke();}
  else{ctx.setLineDash([6,5]);ctx.strokeStyle=c;ctx.lineWidth=2.5;ctx.globalAlpha=.85;rr(x,y,w,18,9);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=c;ctx.globalAlpha=.18;rr(x,y,w,18,9);ctx.fill();ctx.globalAlpha=1;}
  txt(IT[pc(s.n)],x+w/2,y+40,15,s.state===2?'#c9cbe0':'#fff');});}

/* ---------- HUD e schermate ---------- */
function drawLane(){const y=86;ctx.fillStyle='#0b1030b0';rr(12,64,W-24,44,22);ctx.fill();
 ctx.save();ctx.beginPath();ctx.roundRect(12,64,W-24,44,22);ctx.clip();
 seq.forEach(s=>{const x=HIT_X+(s.t-beat)*LANE_PPB;if(x<-40||x>W+40)return;const c=NC[pc(s.n)];
  ctx.globalAlpha=s.state===0?1:.22;ctx.fillStyle=c;
  if(s.d>1){rr(x,y-4,s.d*LANE_PPB-18,8,4);ctx.fill();}
  ctx.beginPath();ctx.arc(x,y,15,0,7);ctx.fill();txt(IT[pc(s.n)],x,y+4,11,'#fff');});
 ctx.globalAlpha=1;ctx.restore();
 ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(HIT_X,y,19,0,7);ctx.stroke();
 ctx.globalAlpha=.25+.25*Math.max(0,Math.cos((beat%1)*Math.PI*2));ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(HIT_X,y,19,0,7);ctx.fill();ctx.globalAlpha=1;}
function hud(){
 const pl=P(),pcol=PCOL[cur];
 ctx.fillStyle='#0b1030cc';rr(16,12,250,46,14);ctx.fill();ctx.fillStyle=pcol;rr(16,12,6,46,3);ctx.fill();
 txt(pl.name,32,31,14,pcol,'left',800);txt('★ '+score,32,52,20,'#ffcb3d','left');
 if(combo>1)txt('×'+combo,250,52,20,'#ff9a3c','right');
 if(numP===2&&results[0]&&cur===1)txt(players[0].name+': '+results[0].score,280,40,14,PCOL[0],'left',700);
 const pw=260,px=W-pw-18;
 const li=lvlOf(songSel.value);if(li>=0)txt('Livello '+(li+1),px,20,12,'#c9d0f5','left',800);
 ctx.fillStyle='#0b1030cc';rr(px,26,pw,14,7);ctx.fill();
 const gr=ctx.createLinearGradient(px,0,px+pw,0);gr.addColorStop(0,'#5ad1ff');gr.addColorStop(1,'#4ee08a');
 ctx.fillStyle=gr;rr(px,26,Math.max(14,pw*(seq.length?idx/seq.length:0)),14,7);ctx.fill();
 if(style==='tempo'&&playing)drawLane();
 else if(playing){seq.slice(idx,idx+6).forEach((s,i)=>{const x=px+20+i*44+(i?8:0),y=72,r=i?15:20,c=NC[pc(s.n)];
  ctx.globalAlpha=i?.55:1;ctx.fillStyle=c;if(!i){ctx.shadowColor=c;ctx.shadowBlur=18;}ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.shadowBlur=0;
  txt(IT[pc(s.n)],x,y+5,i?11:14,'#fff');ctx.globalAlpha=1;});}
 pops.forEach(p=>{p.l-=.018;const y=150-(1-p.l)*30;ctx.globalAlpha=Math.max(0,p.l);txt(p.text,HIT_X+40,y,26,p.col,'left');if(p.sub)txt(p.sub,HIT_X+40,y+22,14,'#e6e9ff','left',600);ctx.globalAlpha=1;});
 pops=pops.filter(p=>p.l>0).slice(-2);}
function dim(){ctx.fillStyle='#070b1fb0';ctx.fillRect(0,0,W,H);}
function starsRow(n,x,y,size){for(let i=0;i<3;i++)txt('★',x+(i-1)*size*1.2,y,size,i<n?'#ffcb3d':'#ffffff30');}
function endHint(c,y){const nl=nextLevel(),li=lvlOf(songSel.value);
 if(nl)txt(`Premi ▶ per il Livello ${lvlOf(nl)+1}: ${nl}  ·  ↺ Rigioca per ripetere`,c,y,16,'#c9d0f5',undefined,700);
 else if(li===LEVELS.length-1)txt('🏆 Hai completato tutti i livelli!  ·  Premi ▶ per rigiocare',c,y,16,'#ffcb3d',undefined,700);
 else txt('Premi ▶ Gioca per rigiocare',c,y,16,'#c9d0f5',undefined,600);}
function screenIdle(){dim();const c=W/2;
 txt(songTitle(songSel.value),c,120,42,'#fff');
 txt(style==='tempo'?'⏱ A tempo: premi quando la nota arriva nel cerchio':'⏸ Con calma: segui il tasto colorato',c,156,17,'#5ad1ff',undefined,700);
 if(numP===1){drawChar(players[0].char,c,320,0,1.6);txt(players[0].name,c,350,20,PCOL[0]);}
 else{[0,1].forEach(i=>{const x=c+(i?150:-150);drawChar(players[i].char,x,320,0,1.6);txt(players[i].name,x,350,20,PCOL[i]);});txt('VS',c,280,40,'#ffcb3d');}
 txt('Premi ▶ Gioca (o barra spaziatrice)',c,H-40,17,'#c9d0f5',undefined,600);}
function screenDone(){dim();const c=W/2,r=results[0];
 txt('Bravissimo, '+players[0].name+'!',c,100,40,'#fff');
 txt(songTitle(songSel.value)+' completato',c,132,17,'#5ad1ff',undefined,700);
 drawChar(players[0].char,c,270,0,1.6);
 starsRow(r.stars,c,330,44);txt(r.score+' punti · '+r.detail,c,368,18,'#5ad1ff',undefined,700);
 endHint(c,H-30);}
function screenTurn(){dim();const c=W/2;
 txt(players[0].name+' ha fatto '+results[0].score+' punti',c,100,22,PCOL[0],undefined,700);
 txt('Tocca a '+players[1].name+'!',c,150,44,'#fff');
 drawChar(players[1].char,c,320,Math.max(0,Math.sin(t*6))*.3,1.8);
 txt('Premi ▶ Gioca quando sei pronto',c,H-36,17,'#c9d0f5',undefined,600);}
function screenResults(){dim();const c=W/2,a=results[0],b=results[1];
 const win=a.score===b.score?-1:(a.score>b.score?0:1);
 txt(win<0?'Pareggio!':'Vince '+players[win].name+'!',c,70,40,win<0?'#fff':PCOL[win]);
 [0,1].forEach(i=>{const x=c+(i?170:-170),r=results[i],j=i===win?Math.abs(Math.sin(t*5))*12:0;
  ctx.fillStyle='#ffffff10';rr(x-140,95,280,300,20);ctx.fill();ctx.strokeStyle=PCOL[i];ctx.lineWidth=i===win?4:2;rr(x-140,95,280,300,20);ctx.stroke();
  if(i===win)txt('👑',x,140-j,34,'#fff');
  drawChar(players[i].char,x,255-j,0,1.5);
  txt(players[i].name,x,290,22,PCOL[i]);starsRow(r.stars,x,335,30);
  txt(r.score+' punti',x,368,20,'#ffcb3d');txt(r.detail,x,387,13,'#c9d0f5',undefined,600);});
 endHint(c,H-16);
 if(Math.random()<.05)burst(Math.random()*W,Math.random()*H*.4,40,NC[(Math.random()*12)|0]);}

/* ---------- loop ---------- */
function loop(){t+=1/60;
 if(style==='tempo'&&playing&&ac)tempoTick();
 ctx.save();
 if(shake>0){ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=.85;if(shake<.5)shake=0;}
 if(mode==='rocket'){
  alt+=(altT-alt)*.06;bgRocket();
  fws.forEach(o=>{if(!o.pop){o.y+=o.vy;o.vy*=.985;if(o.y<o.ty){o.pop=1;o.a=1;burst(o.x,o.y,45,o.col,6);}else{
    ctx.save();ctx.translate(o.x,o.y);ctx.fillStyle=o.col;ctx.shadowColor=o.col;ctx.shadowBlur=14;rr(-6,-14,12,24,6);ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle='#ffd27a';ctx.beginPath();ctx.moveTo(-4,10);ctx.lineTo(0,18+Math.random()*8);ctx.lineTo(4,10);ctx.fill();ctx.restore();}}
   else{o.a-=.02;ctx.globalAlpha=Math.max(0,o.a);txt(o.lab,o.x,o.y+6,20,'#fff');ctx.globalAlpha=1;}});
  fws=fws.filter(o=>!o.pop||o.a>0);
  const hy=H-90+Math.sin(t*2)*5;heroScreen={x:W/2,y:hy};
  drawChar(P().char,W/2,hy-44,0,.7);
  drawHeroRocket(W/2,hy,1.5,PCOL[cur]);
 }else{
  if(style==='tempo'&&playing)heroPos=Math.max(-1,beat);
  else{const target=idx>0?seq[idx-1].t:-1;heroPos+=(target-heroPos)*.08;if(Math.abs(target-heroPos)<.01)heroPos=target;}
  const h=heroAt(heroPos),cam=Math.max(0,h.x-Math.min(360,W*.3));bgPlatform(cam);
  ctx.save();ctx.translate(-cam,0);drawPlatforms();
  if(h.air===0&&landSq<1)landSq+=.12;const sq=h.air>0?-.25*Math.sin(Math.PI*h.air):Math.max(0,.6*(1-landSq))*Math.sin(landSq*Math.PI);
  if(h.air>0)landSq=0;
  drawChar(P().char,h.x,h.y,sq);txt(P().name,h.x,h.y-92,13,PCOL[cur],undefined,800);
  ctx.restore();heroScreen={x:h.x-cam,y:h.y};
 }
 parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.r?-.02:.08;p.vx*=.98;p.l--;ctx.globalAlpha=Math.max(0,p.l/70);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r||2.4,0,7);ctx.fill();});
 ctx.globalAlpha=1;parts=parts.filter(p=>p.l>0);
 if(flash>0){ctx.fillStyle=`rgba(255,60,80,${flash*.22})`;ctx.fillRect(0,0,W,H);flash-=.08;}
 ctx.restore();
 if(phase==='play'){hud();if(style==='tempo'&&beat<.6){txt(beat<0?String(Math.ceil(-beat)):'Via!',W/2,H/2+20,beat<0?96:72,'#fff');}}
 else if(phase==='idle')screenIdle();
 else if(phase==='done')screenDone();
 else if(phase==='turn')screenTurn();
 else if(phase==='results')screenResults();
 drawPreviews();
 requestAnimationFrame(loop);}
