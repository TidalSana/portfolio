import {hitsRestingKey} from './stable-key-hit.js';
import './studio.js?v=mascot-loader';
import * as THREE from './assets/three.module.js';
const {renderer,camera,root,setView}=window.studio;
const groups=root.children.filter(o=>o.isGroup&&Math.abs(o.position.y-.83)<.001);
const letters=['Escape',...'1234567890-=', 'Backspace','Tab',...'QWERTYUIOP[]','\\','CapsLock',...'ASDFGHJKL;',"'",'Enter','Shift',...'ZXCVBNM,./','Shift','Control','Alt',' ','Alt','Control'];
const keyGroups=new Map(groups.map((g,i)=>[g,letters[i]]));const motions=new Map();
let hovered=null;
// One label per key: overlapping presses fade independently; repeats reuse it.
const hints=new Map();
function keyHint(g,label){
 let hint=hints.get(g);
 if(!hint){hint=document.createElement('div');hint.setAttribute('aria-hidden','true');hint.className='key-feedback';hint.style.cssText='position:fixed;pointer-events:none;z-index:3;padding:5px 10px;border-radius:5px;background:#183c3d;color:#fff;font:500 12px Arial,sans-serif;transform:translate(-50%,-100%);white-space:nowrap';document.body.append(hint);hints.set(g,hint)}
 hint.textContent=label;
 // Keep fast typing readable without accumulating a screenful of labels.
 hints.delete(g);hints.set(g,hint);
 if(hints.size>6){const [old,node]=hints.entries().next().value;node.remove();hints.delete(old)}
 return hint;
}
function illuminate(g,intensity){g?.children.forEach(mesh=>{if(mesh.material?.emissive){mesh.material.emissive.set('#b4f5ed');mesh.material.emissiveIntensity=intensity;}})}
function press(key){
 const g=groups.find(g=>keyGroups.get(g)?.toLowerCase()===key.toLowerCase());if(!g)return;
 cancelAnimationFrame(motions.get(g));
 const label=key===' '?'Space':key.length===1?key.toUpperCase():key;
 const hint=keyHint(g,label),initialY=g.position.y;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,start=performance.now();
 function step(now){
  const elapsed=now-start,t=Math.min(elapsed/600,1);
  // Fast downstroke, a readable hold, then a small damped rebound.
  const travel=t<.16?.36*Math.sin(t/.16*Math.PI/2):t<.42?.36:t<.82?.36*Math.pow(1-(t-.42)/.4,2):-.035*Math.sin((t-.82)/.18*Math.PI);
  g.position.y=reduced?.83:t<.16?initialY+(.47-initialY)*Math.sin(t/.16*Math.PI/2):.83-travel;
  const fade=Math.max(0,Math.min((elapsed-140)/660,1));
  const opacity=1-fade*fade*(3-2*fade);
  hint.style.opacity=String(opacity);
  const point=g.localToWorld(new THREE.Vector3(0,2.4,0)).project(camera);
  hint.style.left=((point.x+1)*innerWidth/2)+'px';hint.style.top=((-point.y+1)*innerHeight/2)+'px';
  illuminate(g,.48*opacity+(hovered===g?.10:0));renderer.shadowMap.needsUpdate=true;
  if(elapsed<800)motions.set(g,requestAnimationFrame(step));else{hint.remove();if(hints.get(g)===hint)hints.delete(g);g.position.y=.83;illuminate(g,hovered===g?.10:0);motions.delete(g)}
 }
 motions.set(g,requestAnimationFrame(step));
}
const send=key=>parent.postMessage({type:'keyboard-key',key},location.origin);
window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent)return;if(e.data.type==='keyboard-view')setView(e.data.view);if(e.data.type==='keyboard-press')press(e.data.key)});
window.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||e.repeat||e.key==='Tab')return;e.preventDefault();send(e.key)});
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down;
function hitKey(e){const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(groups,true)[0];if(hitsRestingKey(ray,escapeCap))return escapeCap;if(!hit)return null;let o=hit.object;while(o&&o.parent!==root)o=o.parent;return keyGroups.has(o)?o:null;}
function hover(g){if(hovered===g)return;
 const point=g?.localToWorld(new THREE.Vector3(0,1.5,0)).project(camera);
 parent.postMessage({type:'keyboard-set-preview',active:keyGroups.get(g)==='Escape',x:point?(point.x+1)*innerWidth/2:0,y:point?(-point.y+1)*innerHeight/2:0},location.origin);
const old=hovered;hovered=g;if(!motions.has(old))illuminate(old,0);if(!motions.has(g))illuminate(g,.10);renderer.domElement.style.cursor=g?'pointer':'grab'}
renderer.domElement.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;if(down){renderer.domElement.style.cursor='grabbing';return}hover(hitKey(e))});
renderer.domElement.addEventListener('pointerleave',()=>hover(null));
renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});
renderer.domElement.addEventListener('pointercancel',()=>{down=null;hover(null)});
renderer.domElement.addEventListener('pointerup',e=>{const origin=down;down=null;if(!origin)return;const g=hitKey(e);hover(g);if(Math.hypot(e.clientX-origin[0],e.clientY-origin[1])>5)return;const key=keyGroups.get(g);if(key)send(key)});

window.addEventListener('focus',()=>parent.postMessage({type:'keyboard-page-focus'},location.origin));

// Keep Spellkey aware of the pointer over the embedded keyboard.
window.addEventListener('pointermove',e=>{
 if(e.pointerType!=='touch'&&!document.hidden)parent.postMessage({type:'keyboard-pointer',x:e.clientX,y:e.clientY},location.origin);
},{passive:true});

// Use the same motion owner as key presses so Escape cannot get stuck raised.
const escapeCap=groups.find(g=>keyGroups.get(g)==='Escape');
const hintMotion=matchMedia('(prefers-reduced-motion: reduce)');
let hintHeld=false,idleEnabled=false,idleFrame=0,idleStart=0;
function liftEscape(active){
 hintHeld=active;
 if(!escapeCap)return;
 cancelAnimationFrame(motions.get(escapeCap));
 const oldHint=hints.get(escapeCap);if(oldHint){oldHint.remove();hints.delete(escapeCap);}
 const from=escapeCap.position.y,to=active&&!hintMotion.matches?1.35:.83,start=performance.now();
 function move(now){const t=hintMotion.matches?1:Math.min((now-start)/220,1);escapeCap.position.y=from+(to-from)*(1-Math.pow(1-t,3));renderer.shadowMap.needsUpdate=true;if(t<1)motions.set(escapeCap,requestAnimationFrame(move));else motions.delete(escapeCap);}
 motions.set(escapeCap,requestAnimationFrame(move));
}
window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===parent&&e.data?.type==='keyboard-set-hint')liftEscape(e.data.active===true);});
hintMotion.addEventListener('change',()=>liftEscape(false));
window.addEventListener('blur',()=>{if(!parent.document.hasFocus())liftEscape(false);});

// Start only after the initial page choreography, then float slowly without rebounding.
function idleTick(now){
 idleFrame=0;
 if(!idleEnabled||document.hidden||hintMotion.matches||!escapeCap)return;
 if(!hintHeld&&!motions.has(escapeCap)&&!down){
  const elapsed=now-idleStart,fade=Math.min(elapsed/1300,1);
  const target=.83+fade*(.27+.09*Math.sin(elapsed/1250));
  escapeCap.position.y+=(target-escapeCap.position.y)*.035;
  renderer.shadowMap.needsUpdate=true;
 }
 idleFrame=requestAnimationFrame(idleTick);
}
function syncIdle(){cancelAnimationFrame(idleFrame);idleFrame=0;if(idleEnabled&&!document.hidden&&!hintMotion.matches){idleStart=performance.now();idleFrame=requestAnimationFrame(idleTick);}else if(!hintHeld)liftEscape(false);}
window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===parent&&e.data?.type==='keyboard-set-idle'){idleEnabled=e.data.active===true;syncIdle();}});
document.addEventListener('visibilitychange',syncIdle);hintMotion.addEventListener('change',syncIdle);
setTimeout(()=>parent.postMessage({type:'keyboard-set-cue'},location.origin),4200);

window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===parent&&e.data?.type==='keyboard-peek')window.studio.setPeek(e.data.x,e.data.y);});

parent.postMessage({type:'keyboard-ready'},location.origin);
