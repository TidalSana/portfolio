import {createWordLayout,placeWords} from './word-layout.js';
import {createPoseRig} from './arm-poses.js';
export const performer=`<button class="spellkey-button" type="button" aria-label="Play Spellkey’s word trick" title="Click for a word trick"><svg viewBox="-85 -25 410 280" aria-hidden="true"><g class="rubber-arm arm-left"><path class="arm-tube" d="M48 130 C-8 119 -63 188 -55 119 C-53 99 -47 96 -45 94"/><g class="glove" transform="translate(-45 65)"><g class="rubber-hand"><g class="hand-art"><g class="hand-open"><path d="M-18 18 C-28 9 -29 0 -42 -7 C-55 -14 -50 -29 -38 -25 C-29 -23 -25 -16 -20 -17 C-26 -28 -39 -48 -33 -55 C-24 -66 -13 -48 -5 -29 C-9 -44 -19 -68 -7 -72 C6 -76 8 -51 12 -32 C15 -44 18 -63 29 -59 C41 -54 28 -30 26 -17 C29 -7 35 0 32 10 C31 24 18 31 2 29 C-7 29 -15 25 -18 18 Z"/><path class="glove-crease" d="M-9 5 Q-6 10 -7 15 M4 4 Q8 9 7 15 M18 1 Q22 6 20 12" fill="none"/></g><g class="hand-fist"><path d="M-23 17 C-37 11 -38 -4 -30 -12 C-32 -26 -17 -35 -7 -28 C0 -39 15 -34 20 -26 C33 -30 45 -17 40 -5 C46 8 35 23 23 24 C10 36 -11 32 -23 17 Z"/><path d="M-29 -9 C-20 -18 -6 -13 0 -4 C6 7 -4 16 -14 11 L-23 5 M-7 -27 Q-15 -17 -10 -9 M20 -25 Q9 -18 14 -7 M37 -10 Q25 -13 25 1" fill="none"/><path class="glove-crease" d="M-5 20 L0 23 M9 20 L14 21" fill="none"/></g><g class="hand-point"><path d="M-19 20 C-31 10 -36 -3 -29 -14 C-23 -23 -13 -20 -10 -10 L-11 -50 C-12 -68 -2 -77 7 -68 C14 -61 9 -28 12 -21 C23 -30 34 -20 32 -10 C45 -15 51 -1 44 8 C46 21 29 33 11 32 C-2 33 -12 28 -19 20 Z"/><path d="M-28 -8 Q-13 -13 -9 1 Q-8 12 -17 13 M12 -20 Q5 -12 13 -4 Q22 2 31 -10 M31 -7 Q22 1 30 8 Q37 13 44 8" fill="none"/><path class="glove-crease" d="M1 19 L5 23 M13 20 L18 23" fill="none"/></g><g class="hand-rest"><path d="M-19 18 C-32 12 -36 -1 -30 -13 C-25 -22 -15 -24 -7 -20 C-1 -28 11 -26 17 -20 C29 -23 38 -15 37 -4 C42 7 33 21 24 24 C10 32 -7 30 -19 18 Z"/><path d="M-29 -6 C-18 -14 -8 -6 -8 4 Q-10 12 -18 9 M-8 -19 Q-13 -10 -7 -5 M17 -19 Q8 -12 13 -5 M34 -9 Q24 -11 24 -1" fill="none"/></g><g class="hand-cup"><path d="M-19 20 C-31 12 -34 0 -43 -9 C-51 -18 -44 -27 -36 -24 L-19 -12 C-19 -24 -29 -37 -20 -42 C-12 -47 -7 -32 -3 -27 C-3 -41 0 -52 9 -49 C17 -46 11 -30 13 -25 C19 -36 24 -44 32 -39 C40 -33 29 -20 27 -12 C37 -21 45 -21 47 -13 C49 -6 35 3 31 13 C27 29 6 34 -8 29 Z"/><path d="M-18 -9 Q-5 0 -7 13 M0 12 Q10 18 22 10" fill="none"/></g><g class="hand-think"><path d="M-20 19 C-32 14 -35 1 -28 -9 C-23 -16 -17 -14 -13 -8 C-20 -25 -32 -39 -23 -46 C-13 -53 -1 -32 6 -20 C15 -28 28 -21 27 -11 C40 -16 46 -2 39 8 C38 23 22 32 7 30 C-5 31 -15 27 -20 19 Z"/><path d="M-28 -4 Q-16 -10 -10 0 Q-6 9 -15 12 M7 -18 Q0 -10 8 -3 Q17 3 27 -10 M27 -6 Q18 2 27 10" fill="none"/></g><path class="glove-cuff" d="M-21 22 Q1 32 27 22 C34 22 36 30 29 36 Q5 48 -22 36 C-29 32 -28 24 -21 22 Z"/><path class="glove-crease" d="M-18 29 Q3 38 24 29" fill="none"/></g></g></g></g><g class="rubber-arm arm-right"><path class="arm-tube" d="M190 129 C245 117 302 178 290 110 C286 96 282 94 281 88"/><g class="glove" transform="translate(281 59)"><g class="rubber-hand"><g class="hand-art" transform="scale(-1 1)"><g class="hand-open"><path d="M-18 18 C-28 9 -29 0 -42 -7 C-55 -14 -50 -29 -38 -25 C-29 -23 -25 -16 -20 -17 C-26 -28 -39 -48 -33 -55 C-24 -66 -13 -48 -5 -29 C-9 -44 -19 -68 -7 -72 C6 -76 8 -51 12 -32 C15 -44 18 -63 29 -59 C41 -54 28 -30 26 -17 C29 -7 35 0 32 10 C31 24 18 31 2 29 C-7 29 -15 25 -18 18 Z"/><path class="glove-crease" d="M-9 5 Q-6 10 -7 15 M4 4 Q8 9 7 15 M18 1 Q22 6 20 12" fill="none"/></g><g class="hand-fist"><path d="M-23 17 C-37 11 -38 -4 -30 -12 C-32 -26 -17 -35 -7 -28 C0 -39 15 -34 20 -26 C33 -30 45 -17 40 -5 C46 8 35 23 23 24 C10 36 -11 32 -23 17 Z"/><path d="M-29 -9 C-20 -18 -6 -13 0 -4 C6 7 -4 16 -14 11 L-23 5 M-7 -27 Q-15 -17 -10 -9 M20 -25 Q9 -18 14 -7 M37 -10 Q25 -13 25 1" fill="none"/><path class="glove-crease" d="M-5 20 L0 23 M9 20 L14 21" fill="none"/></g><g class="hand-point"><path d="M-19 20 C-31 10 -36 -3 -29 -14 C-23 -23 -13 -20 -10 -10 L-11 -50 C-12 -68 -2 -77 7 -68 C14 -61 9 -28 12 -21 C23 -30 34 -20 32 -10 C45 -15 51 -1 44 8 C46 21 29 33 11 32 C-2 33 -12 28 -19 20 Z"/><path d="M-28 -8 Q-13 -13 -9 1 Q-8 12 -17 13 M12 -20 Q5 -12 13 -4 Q22 2 31 -10 M31 -7 Q22 1 30 8 Q37 13 44 8" fill="none"/><path class="glove-crease" d="M1 19 L5 23 M13 20 L18 23" fill="none"/></g><g class="hand-rest"><path d="M-19 18 C-32 12 -36 -1 -30 -13 C-25 -22 -15 -24 -7 -20 C-1 -28 11 -26 17 -20 C29 -23 38 -15 37 -4 C42 7 33 21 24 24 C10 32 -7 30 -19 18 Z"/><path d="M-29 -6 C-18 -14 -8 -6 -8 4 Q-10 12 -18 9 M-8 -19 Q-13 -10 -7 -5 M17 -19 Q8 -12 13 -5 M34 -9 Q24 -11 24 -1" fill="none"/></g><g class="hand-cup"><path d="M-19 20 C-31 12 -34 0 -43 -9 C-51 -18 -44 -27 -36 -24 L-19 -12 C-19 -24 -29 -37 -20 -42 C-12 -47 -7 -32 -3 -27 C-3 -41 0 -52 9 -49 C17 -46 11 -30 13 -25 C19 -36 24 -44 32 -39 C40 -33 29 -20 27 -12 C37 -21 45 -21 47 -13 C49 -6 35 3 31 13 C27 29 6 34 -8 29 Z"/><path d="M-18 -9 Q-5 0 -7 13 M0 12 Q10 18 22 10" fill="none"/></g><g class="hand-think"><path d="M-20 19 C-32 14 -35 1 -28 -9 C-23 -16 -17 -14 -13 -8 C-20 -25 -32 -39 -23 -46 C-13 -53 -1 -32 6 -20 C15 -28 28 -21 27 -11 C40 -16 46 -2 39 8 C38 23 22 32 7 30 C-5 31 -15 27 -20 19 Z"/><path d="M-28 -4 Q-16 -10 -10 0 Q-6 9 -15 12 M7 -18 Q0 -10 8 -3 Q17 3 27 -10 M27 -6 Q18 2 27 10" fill="none"/></g><path class="glove-cuff" d="M-21 22 Q1 32 27 22 C34 22 36 30 29 36 Q5 48 -22 36 C-29 32 -28 24 -21 22 Z"/><path class="glove-crease" d="M-18 29 Q3 38 24 29" fill="none"/></g></g></g></g><g class="performer-body"><path fill="#111" d="M66 32H174Q191 32 197 53L224 177Q233 208 201 208H39Q7 208 16 177L43 53Q49 32 66 32Z"/><path fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" d="M59 59L34 178Q31 190 45 190H195Q209 190 206 178L181 59"/><g class="performer-eye"><path fill="#fff" d="M83 116H161C159 141 144 156 122 156S86 142 83 116Z"/><circle class="performer-pupil" cx="136" cy="120" r="12" fill="#111"/></g></g></svg></button>`;
export function initPerformer(){
 const button=document.querySelector('.spellkey-button'),body=button.querySelector('.performer-body'),nav=document.querySelector('.spell-nav');
 const arms=[...button.querySelectorAll('.rubber-arm')],hands=[...button.querySelectorAll('.rubber-hand')],words=[...nav.querySelectorAll('button span')];
 const rig=createPoseRig(button.querySelector('svg'));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let animations=[],epoch=0,variant=0,intro,focusTimer,away=false;
 // Follow the pointer only while this page owns focus, including its keyboard iframe.
 const pupil=button.querySelector('.performer-pupil');let gazeFrame=0,pointerPosition;
 function resetGaze(){cancelAnimationFrame(gazeFrame);gazeFrame=0;pointerPosition=null;pupil.style.removeProperty('transform');button.style.setProperty('--look','0px');}
 function followPointer(x,y){
  if(away||document.hidden||!document.hasFocus()||reduced.matches)return;
  pointerPosition={x,y};if(gazeFrame)return;
  gazeFrame=requestAnimationFrame(()=>{
   gazeFrame=0;if(!pointerPosition||away||document.hidden||!document.hasFocus())return;
   const rect=button.getBoundingClientRect(),dx=pointerPosition.x-(rect.left+rect.width*.5),dy=pointerPosition.y-(rect.top+rect.height*.52);
   const distance=Math.max(150,Math.hypot(dx,dy));
   pupil.style.transform=`translate(${dx/distance*12}px,${dy/distance*9}px)`;
  });
 }
 window.addEventListener('pointermove',e=>{if(e.pointerType!=='touch')followPointer(e.clientX,e.clientY)},{passive:true});
 document.documentElement.addEventListener('pointerleave',resetGaze);
 window.addEventListener('message',e=>{
  const frame=document.querySelector('.keyboard-render');
  if(e.origin!==location.origin||e.source!==frame?.contentWindow||e.data?.type!=='keyboard-pointer')return;
  if(!Number.isFinite(e.data.x)||!Number.isFinite(e.data.y))return;
  const rect=frame.getBoundingClientRect();followPointer(rect.left+e.data.x,rect.top+e.data.y);
 });
 reduced.addEventListener('change',resetGaze);
 function cancel(){++epoch;clearTimeout(intro);animations.forEach(a=>a.cancel());animations=[];rig.set('relaxed');}
 function animate(el,frames,options){const a=el.animate(frames,{fill:'forwards',...options});animations.push(a);return a;}
 let layout=createWordLayout(words.length),resizeFrame=0;
 function layoutWords(){
  const positions=placeWords(nav.clientWidth,layout);
  words.forEach((word,i)=>{const el=word.parentElement,p=positions[i];el.style.width=p.width+'px';el.style.left=p.left+'px';el.style.top=p.top+'px';el.style.setProperty('--idle-delay',p.delay+'s');});
 }
 function scatter(){
  layout=createWordLayout(words.length);layoutWords();
  const input=document.querySelector('#destination');
  const choices=['work','projects','me','keyboards'];let pick=choices.filter(w=>w!==input.dataset.suggestion);input.dataset.suggestion=pick[Math.floor(Math.random()*pick.length)];
  document.querySelector('.suggested-word').textContent=input.dataset.suggestion;
  window.dispatchEvent(new Event('spellkey-suggestion'));
 }
 function gesture(pulling){
  const duration=pulling?1200:1500;
  animations.push(rig.sequence(pulling?['gathering','thinking','relaxed']:['gathering','casting','relaxed'],{duration}));
 }
 async function travel(pulling){
  // Snapshot first, so fast focus changes continue from the visible position.
  const current=words.map(w=>({transform:getComputedStyle(w).transform,opacity:getComputedStyle(w).opacity}));
  cancel();const token=epoch;nav.inert=pulling;if(!pulling)scatter();
  if(reduced.matches){words.forEach(w=>{w.style.opacity=pulling?'0':'1';w.style.transform='none'});return true;}
  const source=button.getBoundingClientRect(),mode=variant++%3;
  gesture(pulling);
  const flights=words.map((word,i)=>{
   const rect=word.parentElement.getBoundingClientRect(),dx=source.left+source.width*.57-rect.left-rect.width/2,dy=source.top+source.height*.6-rect.top-rect.height/2;
   const near=`translate(${dx}px,${dy}px) scale(.06)`,bend=(mode===0?-1:mode===1?1:(i%2?-1:1))*35;
   const middle=`translate(${dx*.5}px,${dy*.5-30}px) rotate(${bend}deg) scale(.85)`;
   return animate(word,[pulling?current[i]:{transform:near,opacity:0},{transform:middle,opacity:.8,offset:.48},{transform:pulling?near:'none',opacity:pulling?0:1}],{duration:850+i*55,delay:(pulling?120:550)+i*65,easing:'cubic-bezier(.3,.05,.25,1)'});
  });
  await Promise.allSettled(flights.map(a=>a.finished));if(token!==epoch)return false;
  words.forEach(w=>{const style=getComputedStyle(w);w.style.transform=style.transform;w.style.opacity=style.opacity});
  // Retain only the brief arm/body gesture until its retract finishes.
  await Promise.allSettled(animations.map(a=>a.finished));if(token!==epoch)return false;cancel();return true;
 }
 function updateActivity(){const inactive=document.hidden||!document.hasFocus();if(inactive===away)return;away=inactive;if(away)resetGaze();travel(away);}
 button.addEventListener('click',async()=>{if(away)return;if(await travel(true)){if(!away)travel(false)}});
 function react(pose){
  if(away||animations.length)return;
  const token=epoch;
  const reaction=rig.sequence([pose,pose,'relaxed'],{duration:1800,reduced:reduced.matches});animations.push(reaction);
  reaction.finished.then(()=>{if(token===epoch)cancel();});
 }
 button.addEventListener('pointerenter',()=>react('welcoming'));
 window.addEventListener('spellkey-reaction',e=>{if(['thinking','shrugging'].includes(e.detail))react(e.detail)});
 window.addEventListener('blur',()=>{clearTimeout(focusTimer);focusTimer=setTimeout(updateActivity,80)});
 window.addEventListener('focus',()=>{clearTimeout(focusTimer);updateActivity()});
 document.addEventListener('visibilitychange',updateActivity);
 window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===document.querySelector('.keyboard-render')?.contentWindow&&e.data.type==='keyboard-page-focus')updateActivity()});
 function settle(){cancel();layoutWords();nav.inert=away;words.forEach(w=>{w.style.transform='none';w.style.opacity=away?'0':'1'});}
 window.addEventListener('hashchange',settle);window.addEventListener('resize',()=>{if(!resizeFrame)resizeFrame=requestAnimationFrame(()=>{resizeFrame=0;settle();});});reduced.addEventListener('change',settle);
 // Reflow stable word slots as the section transition changes scene width.
 const navResize=new ResizeObserver(()=>layoutWords());navResize.observe(nav);
 scatter();
 intro=setTimeout(async()=>{if(!away&&!document.hidden){if(await travel(true))if(!away)travel(false)}},1300);
}
