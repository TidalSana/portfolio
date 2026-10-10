export const nameVariants=[
 {name:'Joshua Semana'},
 {name:'Joshua S.'},
 {name:'J. Semana'},
 {name:'Joshua'},
 {name:'Semana'},
 {name:'JS'},
 {name:'TidalSana'},
 {name:'Mr. Semana'},
];
export function createNameDeck(random=Math.random){
 let deck=[];
 return previous=>{
  if(!deck.length){
   deck=[...nameVariants];
   for(let i=deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
   if(deck[0].name===previous)[deck[0],deck[1]]=[deck[1],deck[0]];
  }
  return deck.shift();
 };
}
export function initNameplate(link,app){
 const text=link.querySelector('.identity-name'),reduced=matchMedia('(prefers-reduced-motion: reduce)'),next=createNameDeck();
 let current=nameVariants[0],timer,hovered=false;
 function render(item){
  current=item;
  const letters=[...item.name].map((letter,i)=>{
   const span=document.createElement('span');span.className='identity-letter';span.style.setProperty('--letter',i);
   // Small independent variations keep the letters lively without changing the type.
   span.style.setProperty('--entry-x',`${(Math.random()*8-4).toFixed(1)}px`);
   span.style.setProperty('--entry-y',`${(75+Math.random()*40).toFixed(1)}%`);
   span.style.setProperty('--entry-tilt',`${(Math.random()*28-14).toFixed(1)}deg`);
   span.style.setProperty('--entry-delay',`${Math.round(i*16+Math.random()*45)}ms`);
   span.style.setProperty('--entry-duration',`${Math.round(380+Math.random()*140)}ms`);
   span.style.setProperty('--exit-delay',`${Math.round(Math.random()*70)}ms`);
   span.textContent=letter===' '?'\u00a0':letter;return span;
  });
  text.replaceChildren(...letters);
 }
 const paused=()=>app.inert||document.hidden||reduced.matches||hovered||link.contains(document.activeElement);
 function schedule(){
  clearTimeout(timer);text.classList.remove('is-leaving');
  if(paused())return;
  timer=setTimeout(()=>{
   if(paused())return;
   text.classList.add('is-leaving');
   timer=setTimeout(()=>{if(!paused())render(next(current.name));schedule();},250);
  },2000+Math.random()*1000);
 }
 link.addEventListener('pointerenter',()=>{hovered=true;schedule()});
 link.addEventListener('pointerleave',()=>{hovered=false;schedule()});
 link.addEventListener('focusin',schedule);link.addEventListener('focusout',schedule);
 document.addEventListener('visibilitychange',schedule);
 window.addEventListener('keyboard-loader-complete',schedule);
 reduced.addEventListener('change',()=>{if(reduced.matches)render(nameVariants[0]);schedule()});
 render(current);schedule();
}
