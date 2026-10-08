// Isolated local copy preserves the finished renderer's geometry and lighting.
export function mountScene(host,{onSelect=()=>{},onKey=()=>{},compact=false}={}){
 const frame=document.createElement('iframe');
 frame.title='Turquoise 60% WKL keyboard with GMK Rubrehose keycaps. Drag to rotate and scroll to zoom.';
 frame.src=new URL('./keyboard-render/embed.html?view=hero&caps=rubrehose&finish=turquoise&v=stable-hover',import.meta.url).href;
 frame.className='keyboard-render';host.append(frame);
 const receive=e=>{if(e.origin===location.origin&&e.source===frame.contentWindow&&e.data.type==='keyboard-route')onSelect(e.data.id);if(e.origin===location.origin&&e.source===frame.contentWindow&&e.data.type==='keyboard-key')onKey(e.data.key)};
 window.addEventListener('message',receive);
 window.addEventListener('message',e=>{
  if(e.origin!==location.origin||e.source!==frame.contentWindow)return;
  if(e.data.type==='keyboard-set-preview')window.dispatchEvent(new CustomEvent('keyboard-set-preview',{detail:e.data}));
  if(e.data.type==='keyboard-set-cue')window.dispatchEvent(new Event('keyboard-set-cue'));
  if(e.data.type==='keyboard-key'&&e.data.key==='Escape')window.dispatchEvent(new Event('keyboard-set-dismiss'));
 });
 const setView=view=>frame.contentWindow?.postMessage({type:'keyboard-view',view},location.origin);
 return {idleSet(active){frame.contentWindow?.postMessage({type:'keyboard-set-idle',active},location.origin)},hintSet(active){frame.contentWindow?.postMessage({type:'keyboard-set-hint',active},location.origin)},press(key){frame.contentWindow?.postMessage({type:"keyboard-press",key},location.origin)},setView,resetView(){setView('hero')},dispose(){window.removeEventListener('message',receive);frame.remove()}};
}
