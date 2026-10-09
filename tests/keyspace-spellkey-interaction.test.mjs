import test from 'node:test';
import assert from 'node:assert/strict';
import {initSpellkeyMotion} from '../public/keyspace/spellkey-interaction.js';

// Minimal DOM boundary: real EventTarget dispatch/cancellation, real motion model.
function setup(){
 const doc=new EventTarget(),win=new EventTarget(),media=new EventTarget();
 doc.hidden=false;doc.hasFocus=()=>true;doc.documentElement=new EventTarget();doc.querySelector=()=>null;
 media.matches=false;
 Object.assign(globalThis,{document:doc,window:win,matchMedia:()=>media,
  requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{},
  IntersectionObserver:class{observe(){}},
 });
 const nodes=new Map();
 const button=new EventTarget();button.dataset={};let captured=null;
 button.querySelector=selector=>{
  if(!nodes.has(selector))nodes.set(selector,{setAttribute(){}});
  return nodes.get(selector);
 };
 button.getBoundingClientRect=()=>({left:0,top:0,width:98,height:70});
 button.matches=()=>true;button.setPointerCapture=id=>{captured=id;};button.hasPointerCapture=id=>captured===id;
 button.releasePointerCapture=()=>{captured=null;button.dispatchEvent(new Event('lostpointercapture'));};
 initSpellkeyMotion(button);
 let casts=0;button.addEventListener('click',()=>casts++);
 function send(type,props={}){const event=new Event(type,{cancelable:true});Object.assign(event,{pointerId:1,isPrimary:true,button:0,clientX:10,clientY:10,...props});button.dispatchEvent(event);}
 return {send,casts:()=>casts};
}
test('small click jitter still activates the word trick; deliberate drag does not',()=>{
 const f=setup();f.send('pointerdown');f.send('pointermove',{clientX:12});f.send('pointerup');f.send('click',{detail:1});
 assert.equal(f.casts(),1);
 f.send('pointerdown');f.send('pointermove',{clientX:40});f.send('pointerup');f.send('click',{detail:1});
 assert.equal(f.casts(),1);
});
test('canceling a pointer gesture does not swallow the next keyboard activation',()=>{
 const f=setup();f.send('pointerdown');f.send('pointermove',{clientX:40});f.send('pointercancel');
 f.send('click',{detail:0});assert.equal(f.casts(),1);
});
