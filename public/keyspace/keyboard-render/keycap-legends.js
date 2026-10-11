import {modifierWords} from './assets/modifier-words.js';
import {strikerOutlines} from './assets/striker-outlines.js';
import {paintStrikerLegend} from './striker-legends.js';

// Open Cherry vector outlines (MIT, Dakota Felder), already bundled with the study.
// Place ink by its visible bounds in millimetres, independent of font ascent metrics.
const paths=new Map();
// Keep square-bracket outer bounds, but reduce their 120-unit stems to 95
// to balance the adjacent curly braces at the same displayed height.
const squareBracketPaths={
 '[':'M328 -100C328 -74 307 -53 281 -53H150C136 -53 125 -42 125 -28V580C125 594 136 605 150 605H281C307 605 328 626 328 653C328 679 307 700 281 700H90C58 700 30 673 30 640V-88C30 -120 58 -148 90 -148H281C307 -148 328 -127 328 -100Z',
 ']':'M20 -100C20 -127 41 -148 67 -148H258C290 -148 318 -120 318 -88V640C318 673 290 700 258 700H67C41 700 20 679 20 653C20 626 41 605 67 605H198C212 605 223 594 223 580V-28C223 -42 212 -53 198 -53H67C41 -53 20 -74 20 -100Z'
};
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
   if(alpha)drawGlyph(ctx,g,3.95,1.6,4.62875);
   else{
    // One font-unit scale for digits AND punctuation, not one bounding-box height.
    // This preserves short quote strokes, thin hyphens, and compact star/hash shapes.
    const bracket=letter==='['||letter===']';
    const height=bracket?4.62875:g.boundsMM[3]*(.00335/g.scale);
    const glyph=bracket&&i===1?{...g,path:squareBracketPaths[letter]}:g;
    drawGlyph(ctx,glyph,4.65,(i===0?5.0:10.15)-height/2,height);
   }
  }
 }
 ctx.restore();
}
