import {edgeAmount} from './edge-peek.js';
// Isolated local copy preserves the finished renderer's geometry and lighting.
export function mountScene(host,{onSelect=()=>{},onKey=()=>{},compact=false}={}){
 const frame=document.createElement('iframe');
 frame.title='Turquoise 60% WKL keyboard with GMK Rubrehose keycaps. Drag to rotate and scroll to zoom.';
 frame.src=new URL('./keyboard-render/embed.html?view=hero&caps=rubrehose&finish=turquoise&v=no-cable',import.meta.url).href;
 frame.className='keyboard-render';host.append(frame);
 const receive=e=>{if(e.origin===location.origin&&e.source===frame.contentWindow&&e.data.type==='keyboard-route')onSelect(e.data.id);if(e.origin===location.origin&&e.source===frame.contentWindow&&e.data.type==='keyboard-key')onKey(e.data.key)};
 window.addEventListener('message',receive);
 window.addEventListener('message',e=>{
  if(e.origin!==location.origin||e.source!==frame.contentWindow)return;
  if(e.data.type==='keyboard-set-preview')window.dispatchEvent(new CustomEvent('keyboard-set-preview',{detail:e.data}));
  if(e.data.type==='keyboard-set-cue')window.dispatchEvent(new Event('keyboard-set-cue'));
  if(e.data.type==='keyboard-key'&&e.data.key==='Escape')window.dispatchEvent(new Event('keyboard-set-dismiss'));
 });
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover:hover) and (pointer:fine)');
 const sendPeek=(x=0,y=0)=>frame.contentWindow?.postMessage({type:'keyboard-peek',x,y},location.origin);
 const resetPeek=()=>sendPeek();
 function trackPeek(x,y){
  if(motion.matches||!finePointer.matches||document.hidden||document.body.classList.contains('visiting')){resetPeek();return;}
  sendPeek(edgeAmount(x,innerWidth),-edgeAmount(y,innerHeight));
 }
 const trackPage=e=>{if(e.pointerType==='mouse'&&!e.buttons)trackPeek(e.clientX,e.clientY);else resetPeek();};
 const trackFrame=e=>{
  if(e.origin!==location.origin||e.source!==frame.contentWindow||e.data?.type!=='keyboard-pointer')return;
  const rect=frame.getBoundingClientRect();trackPeek(rect.left+e.data.x,rect.top+e.data.y);
 };
 window.addEventListener('pointermove',trackPage,{passive:true});
 window.addEventListener('message',trackFrame);
 document.documentElement.addEventListener('pointerleave',resetPeek);
 window.addEventListener('blur',resetPeek);
 window.addEventListener('hashchange',resetPeek);
 document.addEventListener('visibilitychange',resetPeek);
 motion.addEventListener('change',resetPeek);
 finePointer.addEventListener('change',resetPeek);
 const setView=view=>frame.contentWindow?.postMessage({type:'keyboard-view',view},location.origin);
 return {idleSet(active){frame.contentWindow?.postMessage({type:'keyboard-set-idle',active},location.origin)},hintSet(active){frame.contentWindow?.postMessage({type:'keyboard-set-hint',active},location.origin)},press(key){frame.contentWindow?.postMessage({type:"keyboard-press",key},location.origin)},setView,resetView(){setView('hero')},dispose(){window.removeEventListener('message',receive);window.removeEventListener('pointermove',trackPage);window.removeEventListener('message',trackFrame);document.documentElement.removeEventListener('pointerleave',resetPeek);window.removeEventListener('blur',resetPeek);window.removeEventListener('hashchange',resetPeek);document.removeEventListener('visibilitychange',resetPeek);motion.removeEventListener('change',resetPeek);finePointer.removeEventListener('change',resetPeek);frame.remove()}};
}
