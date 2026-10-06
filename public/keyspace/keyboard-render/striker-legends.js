import {strikerOutlines} from './assets/striker-outlines.js';
/** Striker visual reference: Open Cherry Latin / outlined kana substitutes.
 * Coordinates are millimeters. Caller has scaled its canvas to the CAD UV bounds.
 * Supported scene labels: Esc 1..0 − = Backspace Tab Q..P [ ] \\ Caps
 * A..L ; ' Enter Shift Z..M , . / Ctrl Alt and blank 7u spacebar.
 */
export const STRIKER_DARK='#33455F';
const paths=new Map();
function path(d){if(!paths.has(d))paths.set(d,new Path2D(d));return paths.get(d);}
export function paintStrikerLegend(ctx,letter,widthMM,ink='#FFFCF7'){
 if(!letter)return;
 const records=strikerOutlines[letter];if(!records)return;
 ctx.save();ctx.fillStyle=ink;ctx.strokeStyle=ink;
 for(const g of records){ctx.save();ctx.translate(...g.translate);ctx.scale(g.scale,-g.scale);ctx.fill(path(g.path));ctx.restore();}
 ctx.lineWidth=.29;ctx.lineJoin='round';ctx.lineCap='round';
 const line=(p)=>{ctx.beginPath();p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();};
 if(letter==='Backspace'){
  line([[6.8,5.72],[4.5,5.72]]);line([[5.25,5.0],[4.5,5.72],[5.25,6.44]]);
 }
 if(letter==='Enter'){
  line([[6.7,4.5],[6.7,5.75],[4.35,5.75]]);line([[5.13,4.98],[4.35,5.75],[5.13,6.52]]);
 }
 if(letter==='Shift'){
  ctx.beginPath();ctx.moveTo(4.2,5.55);ctx.lineTo(5.55,4.15);ctx.lineTo(6.9,5.55);ctx.lineTo(6.2,5.55);ctx.lineTo(6.2,6.9);ctx.lineTo(4.9,6.9);ctx.lineTo(4.9,5.55);ctx.closePath();ctx.stroke();
 }
 if(letter==='Tab'){
  line([[4.55,8.4],[7.05,8.4]]);line([[6.3,7.7],[7.05,8.4],[6.3,9.1]]);line([[7.5,7.7],[7.5,9.1]]);
 }
 ctx.restore();
}
