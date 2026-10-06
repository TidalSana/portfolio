import {modifierWords} from './assets/modifier-words.js';
import {strikerOutlines} from './assets/striker-outlines.js';
import {paintStrikerLegend} from './striker-legends.js';

// Open Cherry vector outlines (MIT, Dakota Felder), already bundled with the study.
// Place ink by its visible bounds in millimetres, independent of font ascent metrics.
const paths=new Map();
function drawGlyph(ctx,g,x,y,height){
 const [bx,by,,bh]=g.boundsMM,scale=height/bh;
 if(!paths.has(g.path))paths.set(g.path,new Path2D(g.path));
 ctx.save();ctx.translate(x-bx*scale,y-by*scale);ctx.scale(scale,scale);
 ctx.translate(...g.translate);ctx.scale(g.scale,-g.scale);ctx.fill(paths.get(g.path));ctx.restore();
}
function drawWord(ctx,word,x,y){
 const g=modifierWords[word],[left,, ,top]=g.bounds,scale=2.1/720;
 if(!paths.has(g.path))paths.set(g.path,new Path2D(g.path));
 ctx.save();ctx.translate(x-left*scale,y+top*scale);ctx.scale(scale,-scale);ctx.fill(paths.get(g.path));ctx.restore();
}
const modifiers=new Set(['Esc','Backspace','Tab','Caps','Enter','Shift','Ctrl','Alt']);
function icon(ctx,letter,x,y){
 ctx.save();ctx.translate(x,y);ctx.lineWidth=.28;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();
 if(letter==='Shift'){
  ctx.moveTo(0,1.3);ctx.lineTo(1.3,0);ctx.lineTo(2.6,1.3);ctx.lineTo(1.9,1.3);ctx.lineTo(1.9,2.5);ctx.lineTo(.7,2.5);ctx.lineTo(.7,1.3);ctx.closePath();
 }else if(letter==='Enter'){
  ctx.moveTo(5.0,-.2);ctx.lineTo(5.0,1.3);ctx.lineTo(0,1.3);ctx.moveTo(1.1,.4);ctx.lineTo(0,1.3);ctx.lineTo(1.1,2.2);
 }else if(letter==='Backspace'){
  ctx.moveTo(2.6,1.1);ctx.lineTo(0,1.1);ctx.moveTo(.8,.3);ctx.lineTo(0,1.1);ctx.lineTo(.8,1.9);
 }
 ctx.stroke();ctx.restore();
}
export function paintKeycapLegend(ctx,letter,widthMM,ink,{kana=false,layout='standard'}={}){
 if(!letter)return;
 const records=strikerOutlines[letter];if(!records)return;
 ctx.save();ctx.fillStyle=ctx.strokeStyle=ink;
 if(modifiers.has(letter)){
  const g=records[0],height=letter==='Caps'?2.0:2.1;
  const textWidth=g.boundsMM[2]*height/g.boundsMM[3];
  const hasIcon=['Shift','Enter','Backspace'].includes(letter),gap=letter==='Shift'?6.3:letter==='Enter'?6.2:hasIcon?3.8:0;
  const groupWidth=textWidth+gap;
  // Center vertically on the dish. Short bottom-row mods are centered horizontally;
  // wide modifiers use the left/right insets shown in the GMK kit reference.
  let x=['Ctrl','Alt'].includes(letter)?(widthMM-groupWidth)/2:4.5;
  if(['Enter','Backspace'].includes(letter))x=widthMM-7-groupWidth;
  if(letter==='Tab')x=6.0;
  if(letter==='Caps')x=4.2; // Keep the complete label on the raised part of stepped Caps.
  // Rubrehose base-kit text modifiers are left aligned, including Enter/Backspace.
  if(layout==='rubrehose')x=letter==='Caps'?4.2:4.8;
  // Shift stays left aligned; lift its arrow and label together slightly.
  if(letter==='Shift')ctx.translate(0,-1.0);
  // Keep Tab's group centered on its existing axis, slightly larger and higher.
  if(letter==='Tab'){const centerX=x+1.75;ctx.translate(centerX,8.5);ctx.scale(1.10,1.10);ctx.translate(-centerX,-9.1);}
  const y=9.1-height/2;
  if(hasIcon){
   if(letter==='Shift'){
    // Both Shift keys use the same taller arrow, centered on the label.
    ctx.save();ctx.translate(x+2.4375,9.1);ctx.scale(1.875,1.875);
    icon(ctx,letter,-1.3,-1.25);ctx.restore();
   }else icon(ctx,letter,x,7.85);
  }
  if(letter==='Caps'){
   // The reference's stepped 1.75u key puts two lines on its raised 1.25u dish.
   drawWord(ctx,'Caps',4.2,5.2);drawWord(ctx,'Lock',4.2,8.25);
  }else if(letter==='Ctrl')drawWord(ctx,'Ctrl',x,y);
  else drawGlyph(ctx,g,x+gap,y,height);
  if(letter==='Tab'){
   // Opposing tab-stop arrows, above and below the centered label.
   ctx.save();ctx.lineWidth=.27;ctx.lineCap='round';ctx.lineJoin='round';
   const arrow=(cy,right)=>{const left=x,rightX=x+3.5;ctx.beginPath();
    if(right){ctx.moveTo(left,cy);ctx.lineTo(rightX,cy);ctx.moveTo(rightX-.8,cy-.7);ctx.lineTo(rightX,cy);ctx.lineTo(rightX-.8,cy+.7);ctx.moveTo(rightX+.55,cy-.85);ctx.lineTo(rightX+.55,cy+.85);}
    else{ctx.moveTo(rightX,cy);ctx.lineTo(left,cy);ctx.moveTo(left+.8,cy-.7);ctx.lineTo(left,cy);ctx.lineTo(left+.8,cy+.7);ctx.moveTo(left-.55,cy-.85);ctx.lineTo(left-.55,cy+.85);}
    ctx.stroke();
    // Solid triangular tips; keep the shafts and tab stops at their current weight.
    const tip=right?rightX:left,base=tip+(right?-.8:.8);
    ctx.beginPath();ctx.moveTo(tip,cy);ctx.lineTo(base,cy-.7);
    ctx.lineTo(base,cy+.7);ctx.closePath();ctx.fill();};
   arrow(5.6,false);arrow(12.5,true);ctx.restore();
  }
 }else if(kana){
  paintStrikerLegend(ctx,letter,widthMM,ink);
 }else{
  // Alpha and paired number/punctuation outlines retain their actual Cherry weight.
  const alpha=/^[A-Z]$/.test(letter);
  const selected=alpha?records.slice(0,1):records.slice(0,2);
  for(const [i,g] of selected.entries()){
   if(alpha)drawGlyph(ctx,g,g.boundsMM[0],g.boundsMM[1],3.05);
   else{
    // One font-unit scale for digits AND punctuation, not one bounding-box height.
    // This preserves short quote strokes, thin hyphens, and compact star/hash shapes.
    const height=g.boundsMM[3]*(.00335/g.scale);
    drawGlyph(ctx,g,4.65,(i===0?5.0:10.15)-height/2,height);
   }
  }
 }
 ctx.restore();
}
