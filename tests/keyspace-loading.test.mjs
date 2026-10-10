import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Drive the actual loader/performer with controlled time and animation completion.
function fixture(file,{reduced=false}={}){
 const timers=new Map(),flights=[];let timerId=0;
 class Element extends EventTarget{
  constructor(){super();this.outerHTML="<svg></svg>";this.dataset={};this.style={removeProperty(name){delete this[name]},setProperty(name,value){this[name]=value}};this.children=[];this.inert=false;this.attrs={};const classes=new Set();this.classList={add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle:(x,on)=>on?classes.add(x):classes.delete(x)};}
  setAttribute(k,v){this.attrs[k]=v;} removeAttribute(k){delete this.attrs[k];}
  append(...nodes){this.children.push(...nodes)} remove(){this.removed=true}
  querySelector(){return new Element()} querySelectorAll(){return []}
  getBoundingClientRect(){return {left:10,top:10,width:64,height:64}}
  animate(){let resolve,reject;const finished=new Promise((a,b)=>{resolve=a;reject=b});const animation={finished,cancel(){reject(new Error('canceled'))},resolve};flights.push(animation);return animation}
 }
 const app=new Element(),body=new Element(),button=new Element(),nav=new Element(),host=new Element(),frame=new Element(),input=new Element();frame.contentWindow={};
 const words=Array.from({length:4},()=>{const w=new Element();w.parentElement=new Element();return w});nav.querySelectorAll=()=>words;nav.clientWidth=1000;
 const nodes={'#app':app,'.spellkey-button':button,'.spell-nav':nav,'#destination':input,'.keyboard-render':frame};
 const doc=new EventTarget();Object.assign(doc,{body,hidden:false,hasFocus:()=>true,querySelector:s=>nodes[s]||new Element(),createElement:()=>new Element()});
 const win=new EventTarget(),media=new EventTarget();media.matches=reduced;
 const context={document:doc,window:win,location:{hostname:'example.com',origin:'https://example.com',hash:'#home',search:''},matchMedia:()=>media,performance:{now:()=>0},URLSearchParams,Event,Promise,
  setTimeout:(fn,ms)=>{timers.set(++timerId,{fn,ms});return timerId},clearTimeout:id=>timers.delete(id),
  getComputedStyle:e=>({transform:e.style.transform||'none',opacity:e.style.opacity||'1'}),
  initSpellkeyMotion:()=>({react(){}}),createWordLayout:()=>[],placeWords:()=>words.map(()=>({width:100,left:0,top:0,delay:0})),
  ResizeObserver:class{observe(){}},requestAnimationFrame:()=>1};
 vm.createContext(context);vm.runInContext(readFileSync(new URL('../public/keyspace/'+file,import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replaceAll('export ',''),context);
 const tick=ms=>{for(const [id,t] of [...timers])if(t.ms===ms){timers.delete(id);t.fn()}};
 const ready=()=>{const e=new Event('message');Object.assign(e,{origin:context.location.origin,source:frame.contentWindow,data:{type:'keyboard-ready'}});win.dispatchEvent(e);tick(0)};
 return {context,app,body,button,nav,host,frame,words,flights,timers,tick,ready,win};
}
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve()};
test('home stays inert until the loader hop finishes',async()=>{
 const f=fixture('keyboard-loader.js');f.context.mountKeyboardLoader(f.host,f.frame);
 assert.equal(f.app.inert,true);f.tick(180);f.ready();
 assert.equal(f.app.inert,true);assert.equal(f.flights.length,1);
 f.flights[0].resolve();await flush();assert.equal(f.app.inert,false);
});
test('fast and reduced-motion loads unlock without a hop',()=>{
 for(const reduced of [false,true]){const f=fixture('keyboard-loader.js',{reduced});f.context.mountKeyboardLoader(f.host,f.frame);if(reduced)f.tick(180);f.ready();assert.equal(f.app.inert,false);assert.equal(f.flights.length,0)}
});
test('loader timeout releases navigation without claiming renderer ready',()=>{
 const f=fixture('keyboard-loader.js');f.context.mountKeyboardLoader(f.host,f.frame);f.tick(180);f.tick(15000);
 assert.equal(f.app.inert,false);assert.equal(f.frame.classList.contains('keyboard-is-ready'),false);
});
test('repeated mascot clicks cannot restart a word trick',async()=>{
 const f=fixture('spellkey-performer.js');f.context.initPerformer();
 f.button.dispatchEvent(new Event('click'));f.button.dispatchEvent(new Event('click'));f.button.dispatchEvent(new Event('click'));
 assert.equal(f.flights.length,4);
 f.flights.slice().forEach(a=>a.resolve());await flush();assert.equal(f.flights.length,8);
 f.flights.slice(4).forEach(a=>a.resolve());await flush();
 assert.equal(f.nav.inert,false);f.button.dispatchEvent(new Event('click'));assert.equal(f.flights.length,12);
});
test('loading and startup never trigger an independent word flight',()=>{
 const f=fixture('spellkey-performer.js');f.app.inert=true;f.body.classList.add('keyboard-loading');f.context.initPerformer();
 f.button.dispatchEvent(new Event('click'));f.tick(1300);assert.equal(f.flights.length,0);
});
test('direct sections remain usable and returning home waits for readiness',()=>{
 const f=fixture('keyboard-loader.js');f.context.location.hash='#work';const dispose=f.context.mountKeyboardLoader(f.host,f.frame);
 assert.equal(f.app.inert,false);f.context.location.hash='#home';f.win.dispatchEvent(new Event('hashchange'));assert.equal(f.app.inert,true);
 dispose();assert.equal(f.app.inert,false);
});
test('section changes cancel the trick and restore usable words',async()=>{
 const f=fixture('spellkey-performer.js');f.context.initPerformer();f.button.dispatchEvent(new Event('click'));
 f.win.dispatchEvent(new Event('section-layout'));await flush();
 assert.equal(f.nav.inert,false);assert.ok(f.words.every(w=>w.style.opacity==='1'));
 f.button.dispatchEvent(new Event('click'));assert.equal(f.flights.length,8);
});
