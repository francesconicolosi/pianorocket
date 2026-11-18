/* Piano Rocket – personaggi */
'use strict';
/* ================= PERSONAGGI (origine = piedi) ================= */
function shadow(){ctx.fillStyle='#0004';ctx.beginPath();ctx.ellipse(0,0,20,5,0,0,7);ctx.fill();}
function drawFrog(){shadow();ctx.translate(0,-20);
 const g=ctx.createRadialGradient(-6,-4,4,0,4,26);g.addColorStop(0,'#8ff0a4');g.addColorStop(1,'#2fae5a');
 ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,6,22,17,0,0,7);ctx.fill();
 ctx.fillStyle='#ffe9b3';ctx.beginPath();ctx.ellipse(0,12,13,8,0,0,7);ctx.fill();
 [-9,9].forEach(d=>{ctx.fillStyle='#2fae5a';ctx.beginPath();ctx.arc(d,-10,8,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(d,-11,5.5,0,7);ctx.fill();
  ctx.fillStyle='#1a1a2e';ctx.beginPath();ctx.arc(d+1.5,-11,2.8,0,7);ctx.fill();});
 ctx.strokeStyle='#1a5c32';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,2,7,.3,2.84);ctx.stroke();
 ctx.fillStyle='#ff8fa3';ctx.globalAlpha=.6;[-14,14].forEach(d=>{ctx.beginPath();ctx.arc(d,4,3.5,0,7);ctx.fill();});ctx.globalAlpha=1;}
function drawCat(){shadow();
 ctx.strokeStyle='#e8892b';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(14,-12);ctx.quadraticCurveTo(32,-16+Math.sin(t*4)*6,26,-38);ctx.stroke();
 ctx.fillStyle='#f39c3c';ctx.beginPath();ctx.ellipse(0,-14,16,14,0,0,7);ctx.fill();
 ctx.fillStyle='#ffe2bf';ctx.beginPath();ctx.ellipse(0,-11,9,9,0,0,7);ctx.fill();
 ctx.fillStyle='#f39c3c';[-1,1].forEach(s=>{ctx.beginPath();ctx.moveTo(s*13,-44);ctx.lineTo(s*14,-60);ctx.lineTo(s*4,-50);ctx.fill();});
 ctx.beginPath();ctx.arc(0,-38,15,0,7);ctx.fill();
 const bl=(t%3)<.12;ctx.fillStyle='#1a1a2e';
 [-6,6].forEach(d=>{if(bl)ctx.fillRect(d-3,-40,6,1.5);else{ctx.beginPath();ctx.ellipse(d,-40,2.6,3.6,0,0,7);ctx.fill();}});
 ctx.fillStyle='#ff6f91';ctx.beginPath();ctx.moveTo(-2,-34);ctx.lineTo(2,-34);ctx.lineTo(0,-32);ctx.fill();
 ctx.strokeStyle='#5a3a1a';ctx.lineWidth=1;[-1,1].forEach(s=>[-2,1].forEach(o=>{ctx.beginPath();ctx.moveTo(s*5,-33+o);ctx.lineTo(s*17,-35+o*1.8);ctx.stroke();}));}
function drawRobot(){shadow();
 ctx.fillStyle='#6b7397';rr(-11,-12,8,12,3);ctx.fill();rr(3,-12,8,12,3);ctx.fill();
 const g=ctx.createLinearGradient(-15,0,15,0);g.addColorStop(0,'#aab3d6');g.addColorStop(.5,'#e6eaf8');g.addColorStop(1,'#98a2c9');
 ctx.fillStyle=g;rr(-15,-38,30,28,7);ctx.fill();
 ctx.fillStyle='#ff4d5e';ctx.beginPath();ctx.arc(0,-24,4,0,7);ctx.fill();
 ctx.fillStyle=g;rr(-13,-60,26,20,6);ctx.fill();
 ctx.strokeStyle='#98a2c9';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-60);ctx.lineTo(0,-68);ctx.stroke();
 ctx.fillStyle=Math.sin(t*6)>0?'#ffcb3d':'#ff9a3c';ctx.beginPath();ctx.arc(0,-70,3.5,0,7);ctx.fill();
 ctx.fillStyle='#1b2552';rr(-10,-56,20,11,4);ctx.fill();
 ctx.fillStyle='#5ad1ff';rr(-7,-53,5,5,2);ctx.fill();rr(2,-53,5,5,2);ctx.fill();
 ctx.fillStyle='#aab3d6';rr(-21,-36,6,16,3);ctx.fill();rr(15,-36,6,16,3);ctx.fill();}
function drawToilet(){shadow();
 ctx.fillStyle='#dfe4f2';rr(-17,-74,34,30,6);ctx.fill();ctx.fillStyle='#c5cbe0';rr(-19,-77,38,6,3);ctx.fill();
 ctx.fillStyle='#eef1fb';ctx.beginPath();ctx.ellipse(0,-58,21,13,0,0,7);ctx.fill();ctx.strokeStyle='#c5cbe0';ctx.lineWidth=2;ctx.stroke();
 const hy=-48+Math.sin(t*9)*2.5;
 ctx.fillStyle='#f1c27d';ctx.beginPath();ctx.ellipse(0,hy,14,16,Math.sin(t*4.5)*.12,0,7);ctx.fill();
 ctx.fillStyle='#5a3a1a';ctx.beginPath();ctx.ellipse(0,hy-13,12,5,0,Math.PI,0);ctx.fill();
 ctx.strokeStyle='#5a3a1a';ctx.lineWidth=2.2;[-1,1].forEach(s=>{ctx.beginPath();ctx.moveTo(s*3,hy-8);ctx.lineTo(s*10,hy-10+Math.sin(t*9)*1.5);ctx.stroke();});
 [-6,6].forEach(d=>{ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(d,hy-3,3.8,0,7);ctx.fill();ctx.fillStyle='#1a1a2e';ctx.beginPath();ctx.arc(d+Math.sin(t*2)*1.4,hy-3,1.8,0,7);ctx.fill();});
 const mo=4+Math.abs(Math.sin(t*9))*4;ctx.fillStyle='#7a1f2b';ctx.beginPath();ctx.ellipse(0,hy+7,5,mo,0,0,7);ctx.fill();
 const g=ctx.createLinearGradient(-24,0,24,0);g.addColorStop(0,'#cfd6ea');g.addColorStop(.5,'#fff');g.addColorStop(1,'#c3cae2');
 ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-25,-34);ctx.quadraticCurveTo(-23,-12,-10,-12);ctx.lineTo(10,-12);ctx.quadraticCurveTo(23,-12,25,-34);ctx.closePath();ctx.fill();
 ctx.strokeStyle='#c5cbe0';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,-34,25,6,0,0,7);ctx.stroke();
 ctx.fillStyle='#dfe4f2';rr(-11,-13,22,13,4);ctx.fill();
 ctx.globalAlpha=.5+.5*Math.sin(t*5);txt('♪',22,hy-14-((t*20)%12),14,'#ffcb3d');ctx.globalAlpha=1;}
function drawMiner(){shadow();const sw=Math.sin(t*5)*.25;
 ctx.fillStyle='#3b3fb0';ctx.fillRect(-9,-22,8,20);ctx.fillRect(1,-22,8,20);
 ctx.fillStyle='#55556b';ctx.fillRect(-9,-4,8,4);ctx.fillRect(1,-4,8,4);
 ctx.fillStyle='#2bb3b1';ctx.fillRect(-11,-44,22,22);
 ctx.save();ctx.translate(-14,-43);ctx.rotate(sw);ctx.fillStyle='#2bb3b1';ctx.fillRect(-3,0,6,7);ctx.fillStyle='#c69466';ctx.fillRect(-3,7,6,14);ctx.restore();
 ctx.save();ctx.translate(14,-43);ctx.rotate(-sw-.5);ctx.fillStyle='#2bb3b1';ctx.fillRect(-3,0,6,7);ctx.fillStyle='#c69466';ctx.fillRect(-3,7,6,14);
  ctx.translate(0,20);ctx.rotate(-.9);ctx.fillStyle='#7a5230';ctx.fillRect(-1.5,-16,3,24);ctx.fillStyle='#8fd6e8';ctx.fillRect(-10,-18,20,4);ctx.restore();
 ctx.fillStyle='#c69466';ctx.fillRect(-11,-66,22,22);
 ctx.fillStyle='#4a2f1b';ctx.fillRect(-11,-66,22,6);ctx.fillRect(-11,-60,3,4);ctx.fillRect(8,-60,3,4);
 ctx.fillStyle='#fff';ctx.fillRect(-7,-56,5,3);ctx.fillRect(2,-56,5,3);
 ctx.fillStyle='#4b3fa8';ctx.fillRect(-4,-56,2,3);ctx.fillRect(5,-56,2,3);
 ctx.fillStyle='#9a6a45';ctx.fillRect(-2,-53,4,3);
 ctx.fillStyle='#6b4226';ctx.fillRect(-5,-49,10,3);}
function drawHedgehog(){shadow();const run=Math.sin(t*10)*3;
 ctx.fillStyle='#2457d6';ctx.fillRect(-7,-14,4,10);ctx.fillRect(4,-14,4,10);
 [[-6+run,-4],[7-run,-4]].forEach(([x,y])=>{ctx.fillStyle='#e8263b';ctx.beginPath();ctx.ellipse(x,y,9,5,0,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(x-2,y-5,4,4);});
 ctx.fillStyle='#2457d6';
 for(let i=0;i<4;i++){const y=-50+i*9;ctx.beginPath();ctx.moveTo(-2,y-5);ctx.lineTo(-32+i*3,y+3+i*2);ctx.lineTo(-2,y+9);ctx.fill();}
 ctx.beginPath();ctx.arc(0,-32,18,0,7);ctx.fill();
 ctx.beginPath();ctx.moveTo(-4,-46);ctx.lineTo(-2,-58);ctx.lineTo(6,-48);ctx.fill();
 ctx.fillStyle='#f6d2a8';ctx.beginPath();ctx.ellipse(4,-22,9,8,0,0,7);ctx.fill();
 ctx.beginPath();ctx.ellipse(11,-31,9,7,0,0,7);ctx.fill();
 ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(3,-40,6,7,0,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(11,-40,5,6,0,0,7);ctx.fill();
 ctx.fillStyle='#1a1a2e';ctx.beginPath();ctx.ellipse(6,-39,2.2,3.6,0,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(13,-39,2,3.2,0,0,7);ctx.fill();
 ctx.beginPath();ctx.arc(19,-34,2.6,0,7);ctx.fill();
 ctx.strokeStyle='#1a1a2e';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(12,-30,5,.3,1.9);ctx.stroke();
 ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-15,-24,4.5,0,7);ctx.fill();ctx.beginPath();ctx.arc(16,-20,4.5,0,7);ctx.fill();}
function drawPuff(){shadow();const b=Math.abs(Math.sin(t*3))*2;
 ctx.fillStyle='#e0304a';ctx.beginPath();ctx.ellipse(-9,-4,10,5,-.1,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(9,-4,10,5,.1,0,7);ctx.fill();
 const g=ctx.createRadialGradient(-6,-30-b,4,0,-22-b,24);g.addColorStop(0,'#ffd1e3');g.addColorStop(1,'#ff8fbf');
 ctx.fillStyle=g;ctx.beginPath();ctx.arc(-19,-24-b,6,0,7);ctx.fill();ctx.beginPath();ctx.arc(19,-28-b,6,0,7);ctx.fill();
 ctx.beginPath();ctx.arc(0,-22-b,20,0,7);ctx.fill();
 const bl=(t%3.5)<.12;
 [-5,5].forEach(d=>{if(bl){ctx.fillStyle='#1a1a2e';ctx.fillRect(d-3,-28-b,6,2);}else{ctx.fillStyle='#1a1a2e';ctx.beginPath();ctx.ellipse(d,-28-b,3,7,0,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(d,-31-b,1.6,2.6,0,0,7);ctx.fill();ctx.fillStyle='#3c7bff';ctx.beginPath();ctx.ellipse(d,-24-b,1.8,1.8,0,0,7);ctx.fill();}});
 ctx.fillStyle='#ff5c8a';ctx.globalAlpha=.7;[-11,11].forEach(d=>{ctx.beginPath();ctx.ellipse(d,-19-b,4,2,0,0,7);ctx.fill();});ctx.globalAlpha=1;
 ctx.fillStyle='#b3123a';ctx.beginPath();ctx.ellipse(0,-17-b,3,2.4,0,0,Math.PI);ctx.fill();}
function drawExplorer(){shadow();
 ctx.fillStyle='#4a2e1a';ctx.fillRect(-9,-6,8,6);ctx.fillRect(1,-6,8,6);
 ctx.fillStyle='#b9a27a';rr(-9,-26,8,21,2);ctx.fill();rr(1,-26,8,21,2);ctx.fill();
 ctx.fillStyle='#d8c9a3';rr(-10,-48,20,24,4);ctx.fill();
 ctx.fillStyle='#7a4a26';rr(-12,-48,8,24,3);ctx.fill();rr(4,-48,8,24,3);ctx.fill();
 ctx.fillStyle='#3b2615';ctx.fillRect(-11,-28,22,3);
 ctx.strokeStyle='#5a3a1e';ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(11,-22,5,5,0,0,7);ctx.stroke();ctx.beginPath();ctx.ellipse(11,-22,2.5,2.5,0,0,7);ctx.stroke();
 ctx.fillStyle='#7a4a26';rr(-16,-46,5,18,2);ctx.fill();rr(11,-46,5,18,2);ctx.fill();
 ctx.fillStyle='#e0b088';ctx.beginPath();ctx.arc(-13.5,-27,3,0,7);ctx.fill();ctx.beginPath();ctx.arc(13.5,-27,3,0,7);ctx.fill();
 ctx.fillRect(-3,-52,6,5);
 ctx.beginPath();ctx.ellipse(0,-59,10,11,0,0,7);ctx.fill();
 ctx.fillStyle='#8a6a50';ctx.globalAlpha=.45;ctx.beginPath();ctx.ellipse(0,-53,8,5,0,0,Math.PI);ctx.fill();ctx.globalAlpha=1;
 ctx.fillStyle='#1a1a2e';ctx.beginPath();ctx.arc(-3,-60,1.5,0,7);ctx.fill();ctx.beginPath();ctx.arc(4,-60,1.5,0,7);ctx.fill();
 ctx.strokeStyle='#5a3a1e';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-2,-54);ctx.quadraticCurveTo(2,-52,5,-55);ctx.stroke();
 ctx.fillStyle='#6b4a2b';ctx.beginPath();ctx.ellipse(0,-66,18,4.5,0,0,7);ctx.fill();
 ctx.fillStyle='#7d5a35';rr(-10,-80,20,15,6);ctx.fill();
 ctx.fillStyle='#3b2615';ctx.fillRect(-10,-70,20,3);
 ctx.fillStyle='#6b4a2b';ctx.beginPath();ctx.moveTo(-4,-80);ctx.lineTo(0,-76);ctx.lineTo(4,-80);ctx.fill();}

const CHARS={
 frog:['Rana',drawFrog],cat:['Gatto',drawCat],robot:['Robot',drawRobot],toilet:['Toilet canterino',drawToilet],
 miner:['Minatore cubico',drawMiner],hedgehog:['Riccio sprint',drawHedgehog],puff:['Pallina rosa',drawPuff],explorer:['Esploratore',drawExplorer]};
function drawChar(id,x,y,sq=0,sc=1){ctx.save();ctx.translate(x,y);ctx.scale(sc*(1+sq*.14),sc*(1-sq*.14));(CHARS[id]||CHARS.frog)[1]();ctx.restore();}
