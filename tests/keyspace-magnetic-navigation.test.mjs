import test from 'node:test';
import assert from 'node:assert/strict';
import {initMagneticNavigation} from '../public/keyspace/magnetic-navigation.js';

test('magnetic labels follow mouse, settle home, and respect reduced motion and touch',()=>{
 const win=new EventTarget(),doc=new EventTarget(),reduced=new EventTarget(),fine=new EventTarget();
 reduced.matches=false;fine.matches=true;
 const style={removeProperty(key){delete this[key];}};
 const button=new EventTarget();button.querySelector=()=>({style});
 button.getBoundingClientRect=()=>({left:0,top:0,width:100,height:44});
 const nav={inert:false,querySelectorAll:()=>[button]};
 const saved=Object.fromEntries(['window','document','matchMedia','requestAnimationFrame','cancelAnimationFrame'].map(key=>[key,globalThis[key]]));
 let queued=null,time=performance.now();
 globalThis.window=win;globalThis.document=doc;
 globalThis.matchMedia=query=>query.includes('reduced')?reduced:fine;
 globalThis.requestAnimationFrame=fn=>{queued=fn;return 1;};
 globalThis.cancelAnimationFrame=()=>{queued=null;};
 const tick=()=>{const fn=queued;queued=null;time+=1000/60;fn?.(time);};
 const send=(type,values={})=>button.dispatchEvent(Object.assign(new Event(type),values));
 try{
  initMagneticNavigation(nav);
  send('pointermove',{pointerType:'mouse',buttons:0,clientX:90,clientY:32});
  for(let i=0;i<120;i++)tick();
  assert.equal(style.translate,'4px 1.5px');assert.equal(queued,null);
  send('pointerleave');for(let i=0;i<120;i++)tick();
  assert.equal(style.translate,'0px 0px');assert.equal(queued,null);
  send('pointermove',{pointerType:'mouse',buttons:0,clientX:90,clientY:32});tick();
  const beforePress=style.translate;
  send('pointerdown');assert.equal(style.translate,beforePress,'press must not snap label home');
  win.dispatchEvent(new Event('section-transition-start'));
  send('pointermove',{pointerType:'mouse',buttons:0,clientX:90,clientY:32});
  for(let i=0;i<120;i++)tick();
  assert.equal(style.translate,'0px 0px','moving navigation must not chase the pointer');
  win.dispatchEvent(new Event('section-transition-end'));
  send('pointermove',{pointerType:'mouse',buttons:0,clientX:90,clientY:32});
  for(let i=0;i<120;i++)tick();
  assert.equal(style.translate,'4px 1.5px');
  win.dispatchEvent(new Event('hashchange'));
  for(let i=0;i<120;i++)tick();
  assert.equal(style.translate,'0px 0px');assert.equal(queued,null);
  reduced.matches=true;reduced.dispatchEvent(new Event('change'));
  send('pointermove',{pointerType:'mouse',buttons:0,clientX:90,clientY:32});assert.equal(queued,null);
  reduced.matches=false;
  send('pointermove',{pointerType:'touch',buttons:0,clientX:90,clientY:32});assert.equal(queued,null);
 }finally{for(const [key,value] of Object.entries(saved)){if(value===undefined)delete globalThis[key];else globalThis[key]=value;}}
});
