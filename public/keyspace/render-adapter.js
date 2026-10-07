// Isolated local copy preserves the finished renderer's geometry and lighting.
export function mountScene(host,{onSelect=()=>{},onKey=()=>{},compact=false}={}){
 const frame=document.createElement('iframe');
 frame.title='Turquoise 60% WKL keyboard with GMK Rubrehose keycaps. Drag to rotate and scroll to zoom.';
 frame.src='./keyboard-render/embed.html?view=hero&caps=rubrehose&finish=turquoise&v=homing-shadows';
 frame.className='keyboard-render';host.append(frame);
 const receive=e=>{if(e.origin===location.origin&&e.source===frame.contentWindow&&e.data.type==='keyboard-route')onSelect(e.data.id);if(e.origin===location.origin&&e.source===frame.contentWindow&&e.data.type==='keyboard-key')onKey(e.data.key)};
 window.addEventListener('message',receive);
 const setView=view=>frame.contentWindow?.postMessage({type:'keyboard-view',view},location.origin);
 return {press(key){frame.contentWindow?.postMessage({type:"keyboard-press",key},location.origin)},setView,resetView(){setView('hero')},dispose(){window.removeEventListener('message',receive);frame.remove()}};
}
