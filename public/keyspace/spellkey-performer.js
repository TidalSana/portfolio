import {createWordLayout,placeWords} from './word-layout.js';
import {initSpellkeyMotion} from './spellkey-interaction.js?v=pointer-safe';
export const performer=`<button class="spellkey-button" type="button" aria-label="Play Spellkey’s word trick" title="Click for a word trick · drag for a reaction"><svg viewBox="-85 -25 410 280" aria-hidden="true"><defs><clipPath id="spellkey-eye-clip"><path class="performer-aperture" d="M81 113H163C161 144 145 158 122 158S85 144 81 113Z"/></clipPath></defs><g class="performer-camera"><g class="performer-body"><path fill="#111" d="M66 32H174Q191 32 197 53L224 177Q233 208 201 208H39Q7 208 16 177L43 53Q49 32 66 32Z"/><path fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" d="M59 59L34 178Q31 190 45 190H195Q209 190 206 178L181 59"/><g class="performer-eye"><path class="performer-white" fill="white" d="M81 113H163C161 144 145 158 122 158S85 144 81 113Z"/><g clip-path="url(#spellkey-eye-clip)"><path class="performer-pupil" fill="#111"/></g><path class="performer-blink-line" d="M82 119Q121 124 161 119" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0"/></g></g></g></svg></button>`;
export function initPerformer(){
 const button=document.querySelector('.spellkey-button'),nav=document.querySelector('.spell-nav');
 const words=[...nav.querySelectorAll('button span')];
 const motion=initSpellkeyMotion(button);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let animations=[],epoch=0,variant=0,intro,focusTimer,away=false;
 function cancel(){++epoch;clearTimeout(intro);animations.forEach(a=>a.cancel());animations=[];}
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
 async function travel(pulling){
  // Snapshot first, so fast focus changes continue from the visible position.
  const current=words.map(w=>({transform:getComputedStyle(w).transform,opacity:getComputedStyle(w).opacity}));
  cancel();const token=epoch;nav.inert=pulling;if(!pulling)scatter();
  if(reduced.matches){words.forEach(w=>{w.style.opacity=pulling?'0':'1';w.style.transform='none'});return true;}
  const source=button.getBoundingClientRect(),mode=variant++%3;
  motion.react(pulling?'thinking':'welcoming');
  const flights=words.map((word,i)=>{
   const rect=word.parentElement.getBoundingClientRect(),dx=source.left+source.width*.57-rect.left-rect.width/2,dy=source.top+source.height*.6-rect.top-rect.height/2;
   const near=`translate(${dx}px,${dy}px) scale(.06)`,bend=(mode===0?-1:mode===1?1:(i%2?-1:1))*35;
   const middle=`translate(${dx*.5}px,${dy*.5-30}px) rotate(${bend}deg) scale(.85)`;
   return animate(word,[pulling?current[i]:{transform:near,opacity:0},{transform:middle,opacity:.8,offset:.48},{transform:pulling?near:'none',opacity:pulling?0:1}],{duration:850+i*55,delay:(pulling?120:550)+i*65,easing:'cubic-bezier(.3,.05,.25,1)'});
  });
  await Promise.allSettled(flights.map(a=>a.finished));if(token!==epoch)return false;
  words.forEach(w=>{const style=getComputedStyle(w);w.style.transform=style.transform;w.style.opacity=style.opacity});
  // Let outstanding word flights settle before clearing the cast.
  await Promise.allSettled(animations.map(a=>a.finished));if(token!==epoch)return false;cancel();return true;
 }
 function updateActivity(){const inactive=document.hidden||!document.hasFocus();if(inactive===away)return;away=inactive;travel(away);}
 button.addEventListener('click',async()=>{if(away)return;if(await travel(true)){if(!away)travel(false)}});
 window.addEventListener('spellkey-reaction',e=>{if(['thinking','shrugging'].includes(e.detail))motion.react(e.detail)});
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
