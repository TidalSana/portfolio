import {createSpellkeyMotion,eyeGeometry} from './spellkey-motion.js';

export function initSpellkeyMotion(button){
 const actor=button.querySelector('.performer-body'),camera=button.querySelector('.performer-camera');
 const eye=button.querySelector('.performer-eye'),white=button.querySelector('.performer-white');
 const aperture=button.querySelector('.performer-aperture'),pupil=button.querySelector('.performer-pupil');
 const blinkLine=button.querySelector('.performer-blink-line');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const motion=createSpellkeyMotion({reduced:reduced.matches});
 const now=()=>performance.now()/1000;
 let raf=0,visible=true,active=false,pointer=null,suppressClick=false;
 const names=['original','soft-oval','knowing'];
 function draw(time){
  const p=motion.sample(time),g=eyeGeometry(p.mood,p.gaze,p.blink);
  button.dataset.mood=names[p.mood];
  white.setAttribute('d',g.aperture);aperture.setAttribute('d',g.aperture);pupil.setAttribute('d',g.pupil);
  eye.setAttribute('transform',g.transform);blinkLine.setAttribute('opacity',g.blinkLine);
  actor.setAttribute('transform',`translate(${120+p.dx} 208) rotate(${p.tilt}) scale(${p.sx} ${p.sy}) translate(-120 -208)`);
  camera.setAttribute('transform',`translate(120 120) scale(${p.zoom}) translate(-120 -120)`);
 }
 function frame(time){raf=0;draw(time/1000);if(active&&!reduced.matches)raf=requestAnimationFrame(frame);}
 function refresh(){draw(now());if(active&&!reduced.matches&&!raf)raf=requestAnimationFrame(frame);}
 function releaseCapture(){
  const id=pointer?.id;pointer=null;
  if(id!==undefined&&button.hasPointerCapture(id))button.releasePointerCapture(id);
 }
 function activity(){
  const next=visible&&!document.hidden&&document.hasFocus();
  if(next!==active){active=next;motion.setActive(next,now());releaseCapture();suppressClick=false;}
  cancelAnimationFrame(raf);raf=0;refresh();
 }
 function follow(x,y){
  if(!active||reduced.matches)return;
  const r=button.getBoundingClientRect(),dx=x-r.left-r.width/2,dy=y-r.top-r.height/2;
  const distance=Math.max(150,Math.hypot(dx,dy));motion.follow(dx/distance,dy/distance,now());
 }
 button.addEventListener('pointerenter',()=>{motion.enter(now());refresh();});
 button.addEventListener('pointerleave',()=>{motion.leave(now());refresh();});
 button.addEventListener('focus',()=>{motion.enter(now());refresh();});
 button.addEventListener('blur',()=>{motion.leave(now());refresh();});
 button.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||e.button!==0)return;
  suppressClick=false;const r=button.getBoundingClientRect();
  // Express drag distance in the approved study's 1440-unit stage coordinates.
  pointer={id:e.pointerId,x:e.clientX,y:e.clientY,scale:1440/Math.max(1,r.width),moved:false};
  motion.down(0,0,now());button.setPointerCapture(e.pointerId);refresh();
 });
 button.addEventListener('pointermove',e=>{
  if(!pointer||pointer.id!==e.pointerId)return;
  const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;
  if(Math.hypot(dx,dy)>=6)pointer.moved=true;
  if(pointer.moved)motion.move(dx*pointer.scale,dy*pointer.scale,now());refresh();
 });
 button.addEventListener('pointerup',e=>{
  if(!pointer||pointer.id!==e.pointerId)return;
  suppressClick=motion.up(now());releaseCapture();
  if(!button.matches(':hover'))motion.leave(now());refresh();
 });
 function cancelDrag(){if(pointer){motion.up(now());releaseCapture();suppressClick=true;}refresh();}
 button.addEventListener('pointercancel',cancelDrag);
 button.addEventListener('lostpointercapture',()=>{if(pointer)cancelDrag();});
 // A drag is expression-only; a click still casts the existing navigation words.
 button.addEventListener('click',e=>{
  if(suppressClick&&e.detail!==0){suppressClick=false;e.preventDefault();e.stopImmediatePropagation();return;}
  suppressClick=false;
  motion.click(now());refresh();
 },true);
 window.addEventListener('pointermove',e=>{if(e.pointerType!=='touch')follow(e.clientX,e.clientY);},{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>{motion.follow(0,0,now());motion.leave(now());refresh();});
 window.addEventListener('message',e=>{
  const iframe=document.querySelector('.keyboard-render');
  if(e.origin!==location.origin||e.source!==iframe?.contentWindow)return;
  if(e.data?.type==='keyboard-page-focus'){activity();return;}
  if(e.data?.type!=='keyboard-pointer'||!Number.isFinite(e.data.x)||!Number.isFinite(e.data.y))return;
  const r=iframe.getBoundingClientRect();follow(r.left+e.data.x,r.top+e.data.y);
 });
 window.addEventListener('focus',activity);
 window.addEventListener('blur',activity);
 document.addEventListener('visibilitychange',activity);
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;activity();});observer.observe(button);
 reduced.addEventListener('change',()=>{motion.setReduced(reduced.matches,now());releaseCapture();activity();});
 window.addEventListener('hashchange',cancelDrag);
 activity();
 return {react(name){motion.react(name,now());refresh();}};
}
