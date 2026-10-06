export const performer=`<button class="spellkey-button" type="button" aria-label="Play Spellkey’s word trick" title="Click for a word trick"><svg viewBox="-85 -25 410 280" aria-hidden="true"><g class="rubber-arm arm-left"><path class="arm-tube" d="M48 130 C10 127 -44 167 -47 112 C-49 95 -46 88 -45 83"/><g class="glove" transform="translate(-45 65)"><g class="rubber-hand"><g class="hand-art"><g class="hand-open"><path d="M-12 14 C-19 7 -28 0 -25 -7 C-22 -12 -17 -9 -12 -4 L-14 -26 C-15 -35 -6 -37 -4 -27 L-2 -15 L0 -33 C1 -42 10 -40 10 -31 L10 -15 L15 -27 C19 -35 27 -29 23 -21 L17 0 C22 10 13 19 4 21 Z"/><path d="M-7 0 L-5 7 M1 -2 L2 6 M9 -1 L8 7" fill="none"/></g><g class="hand-fist"><path d="M-15 14 C-24 9 -25 -4 -18 -9 L-13 -10 L-13 -16 Q-7 -25 -1 -17 Q6 -26 12 -17 Q23 -20 24 -8 L21 10 Q16 22 -1 22 Z"/><path d="M-17 2 Q-4 -8 3 1 L-2 9 M-3 -13 L-3 -5 M8 -14 L8 -6 M17 -12 L17 -5" fill="none"/></g><path d="M-9 17 Q1 22 12 17 L11 27 Q0 31 -10 26 Z"/></g></g></g></g><g class="rubber-arm arm-right"><path class="arm-tube" d="M190 129 C230 130 286 160 285 108 C284 90 282 84 281 77"/><g class="glove" transform="translate(281 59)"><g class="rubber-hand"><g class="hand-art" transform="scale(-1 1)"><g class="hand-open"><path d="M-12 14 C-19 7 -28 0 -25 -7 C-22 -12 -17 -9 -12 -4 L-14 -26 C-15 -35 -6 -37 -4 -27 L-2 -15 L0 -33 C1 -42 10 -40 10 -31 L10 -15 L15 -27 C19 -35 27 -29 23 -21 L17 0 C22 10 13 19 4 21 Z"/><path d="M-7 0 L-5 7 M1 -2 L2 6 M9 -1 L8 7" fill="none"/></g><g class="hand-fist"><path d="M-15 14 C-24 9 -25 -4 -18 -9 L-13 -10 L-13 -16 Q-7 -25 -1 -17 Q6 -26 12 -17 Q23 -20 24 -8 L21 10 Q16 22 -1 22 Z"/><path d="M-17 2 Q-4 -8 3 1 L-2 9 M-3 -13 L-3 -5 M8 -14 L8 -6 M17 -12 L17 -5" fill="none"/></g><path d="M-9 17 Q1 22 12 17 L11 27 Q0 31 -10 26 Z"/></g></g></g></g><g class="performer-body"><path fill="#111" d="M66 32H174Q191 32 197 53L224 177Q233 208 201 208H39Q7 208 16 177L43 53Q49 32 66 32Z"/><path fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" d="M59 59L34 178Q31 190 45 190H195Q209 190 206 178L181 59"/><g class="performer-eye"><path fill="#fff" d="M83 116H161C159 141 144 156 122 156S86 142 83 116Z"/><circle class="performer-pupil" cx="136" cy="120" r="12" fill="#111"/></g></g></svg></button>`;
export function initPerformer(){
 const button=document.querySelector('.spellkey-button'),body=button.querySelector('.performer-body'),nav=document.querySelector('.spell-nav');
 const arms=[...button.querySelectorAll('.rubber-arm')],hands=[...button.querySelectorAll('.rubber-hand')],words=[...nav.querySelectorAll('button span')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let animations=[],epoch=0,variant=0,intro,focusTimer,away=false;
 function cancel(){++epoch;clearTimeout(intro);animations.forEach(a=>a.cancel());animations=[];}
 function animate(el,frames,options){const a=el.animate(frames,{fill:'forwards',...options});animations.push(a);return a;}
 function scatter(){
  const targets=words.map(w=>w.parentElement),width=nav.clientWidth,compact=width<520;
  const order=[0,1,2,3].sort(()=>Math.random()-.5);
  targets.forEach((el,i)=>{const slot=order[i],cols=compact?2:4,cell=width/cols,w=Math.min(105,cell-8);el.style.width=w+'px';el.style.left=(slot%cols*cell+4+Math.random()*Math.max(0,cell-w-8))+'px';el.style.top=(compact?Math.floor(slot/2)*78+8+Math.random()*16:16+Math.random()*80)+'px';el.style.setProperty('--idle-delay',(-Math.random()*6)+'s');});
  const input=document.querySelector('#destination');
  const choices=['work','projects','me','keyboards'];let pick=choices.filter(w=>w!==input.dataset.suggestion);input.dataset.suggestion=pick[Math.floor(Math.random()*pick.length)];
  document.querySelector('.suggested-word').textContent=input.dataset.suggestion;
  window.dispatchEvent(new Event('spellkey-suggestion'));
 }
 function gesture(pulling){
  const duration=pulling?1200:1500;
  animate(body,[{transform:'scale(1)'},{transform:pulling?'rotate(7deg) scale(.94,1.08)':'rotate(-12deg) scale(1.13,.83)',offset:.35},{transform:pulling?'rotate(-5deg) scale(1.13,.87)':'rotate(9deg) scale(.9,1.12)',offset:.63},{transform:'rotate(-2deg) scale(1.03,.98)',offset:.85},{transform:'none'}],{duration,easing:'ease-in-out'});
  arms.forEach((arm,i)=>{
   const sign=i?1:-1;
   const poses=pulling?[0,30,-52,-18,0]:[0,-62,-78,42,12,0];
   const offsets=pulling?[0,.26,.60,.83,1]:[0,.22,.43,.64,.84,1];
   animate(arm,poses.map((angle,j)=>({offset:offsets[j],opacity:j===0||j===poses.length-1?0:1,transform:`rotate(${angle*sign}deg) scale(${j===0||j===poses.length-1?.12:j===2?.86:1})`})),{duration,delay:i*65,easing:'cubic-bezier(.35,0,.25,1)'});
   const tube=arm.querySelector('.arm-tube');
   const rest=i?'M190 129 C230 130 286 160 285 108 C284 90 282 84 281 77':'M48 130 C10 127 -44 167 -47 112 C-49 95 -46 88 -45 83';
   const coil=i?'M190 129 C258 175 223 85 270 99 C289 105 280 84 281 77':'M48 130 C-18 175 10 82 -34 102 C-54 113 -46 90 -45 83';
   animate(tube,[{d:`path("${rest}")`},{d:`path("${coil}")`,offset:.42},{d:`path("${rest}")`,offset:.76},{d:`path("${rest}")`}],{duration,delay:i*65,easing:'ease-in-out'});
   const hand=hands[i];
   animate(hand,[{transform:'rotate(0deg)'},{transform:`rotate(${-35*sign}deg) scale(1.05,.95)`,offset:.3},{transform:`rotate(${25*sign}deg) scale(.94,1.05)`,offset:.55},{transform:`rotate(${-22*sign}deg)`,offset:.72},{transform:'rotate(0deg)'}],{duration,delay:i*65,easing:'ease-in-out'});
   const open=hand.querySelector('.hand-open'),fist=hand.querySelector('.hand-fist');
   animate(open,[{opacity:1},{opacity:1,offset:.22},{opacity:0,offset:.32},{opacity:0,offset:pulling?.73:.52},{opacity:1,offset:pulling?.85:.62},{opacity:1}],{duration,delay:i*65});
   animate(fist,[{opacity:0},{opacity:0,offset:.22},{opacity:1,offset:.32},{opacity:1,offset:pulling?.73:.52},{opacity:0,offset:pulling?.85:.62},{opacity:0}],{duration,delay:i*65});
  });
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
 function updateActivity(){const inactive=document.hidden||!document.hasFocus();if(inactive===away)return;away=inactive;travel(away);}
 button.addEventListener('click',async()=>{if(away)return;if(await travel(true)){if(!away)travel(false)}});
 button.addEventListener('pointerenter',()=>{if(away||animations.length||reduced.matches)return;const arm=arms[1],hand=hands[1];arm.animate([{opacity:0,transform:'scale(.15)'},{opacity:1,transform:'scale(1)',offset:.2},{opacity:1,transform:'scale(1)',offset:.8},{opacity:0,transform:'scale(.15)'}],{duration:750});hand.animate([{transform:'rotate(0deg)'},{transform:'rotate(30deg)'},{transform:'rotate(-20deg)'},{transform:'rotate(25deg)'},{transform:'rotate(0deg)'}],{duration:650});});
 window.addEventListener('blur',()=>{clearTimeout(focusTimer);focusTimer=setTimeout(updateActivity,80)});
 window.addEventListener('focus',()=>{clearTimeout(focusTimer);updateActivity()});
 document.addEventListener('visibilitychange',updateActivity);
 window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===document.querySelector('.keyboard-render')?.contentWindow&&e.data.type==='keyboard-page-focus')updateActivity()});
 function settle(){cancel();scatter();nav.inert=away;words.forEach(w=>{w.style.transform='none';w.style.opacity=away?'0':'1'});}
 window.addEventListener('hashchange',settle);window.addEventListener('resize',settle);reduced.addEventListener('change',settle);
 scatter();
 intro=setTimeout(async()=>{if(!away&&!document.hidden){if(await travel(true))if(!away)travel(false)}},1300);
}
