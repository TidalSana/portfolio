import test from 'node:test';
import assert from 'node:assert/strict';
import {nameVariants,createNameDeck,initNameplate} from '../public/keyspace/nameplate.js';

test('each shuffle visits every alias and avoids repeats at the cycle boundary',()=>{
 const next=createNameDeck(()=>0.4);let last='Joshua Semana';
 for(let cycle=0;cycle<3;cycle++){
  const seen=new Set();
  for(let i=0;i<nameVariants.length;i++){const item=next(last);assert.notEqual(item.name,last);seen.add(item.name);last=item.name;}
  assert.equal(seen.size,nameVariants.length);
 }
});
test('loading, hover, hidden pages and reduced motion pause the loop',()=>{
 const timers=new Map();let id=0;
 const node=()=>Object.assign(new EventTarget(),{style:{setProperty(name,value){this[name]=value}},classList:{add(){},remove(){}},replaceChildren(...children){this.children=children},append(){}});
 const doc=Object.assign(new EventTarget(),{hidden:false,createElement:node,activeElement:null});
 const win=new EventTarget(),media=Object.assign(new EventTarget(),{matches:false});
 const text=node(),link=node(),app={inert:true};link.dataset={};link.querySelector=()=>text;link.matches=()=>false;link.contains=()=>false;
 Object.assign(globalThis,{document:doc,window:win,matchMedia:()=>media,setTimeout:(fn,ms)=>{timers.set(++id,{fn,ms});return id},clearTimeout:i=>timers.delete(i)});
 initNameplate(link,app);assert.equal(timers.size,0);
 app.inert=false;win.dispatchEvent(new Event('keyboard-loader-complete'));assert.equal(timers.size,1);
 assert.ok([...timers.values()][0].ms>=2000&&[...timers.values()][0].ms<=3000);
 assert.ok(text.children.every(letter=>letter.style['--entry-y']&&letter.style['--entry-tilt']));
 link.dispatchEvent(new Event('pointerenter'));assert.equal(timers.size,0);
 link.dispatchEvent(new Event('pointerleave'));assert.equal(timers.size,1);
 doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));assert.equal(timers.size,0);
 doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));assert.equal(timers.size,1);
 media.matches=true;media.dispatchEvent(new Event('change'));assert.equal(timers.size,0);assert.equal(text.children.map(letter=>letter.textContent).join(''),'Joshua\u00a0Semana');
});
