// The waiting mascot hands off to the existing header mascot after the first frame.
export function mountKeyboardLoader(host, frame) {
 const mascot=document.querySelector('.spellkey-button');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const demo=['localhost','127.0.0.1'].includes(location.hostname)&&new URLSearchParams(location.search).get('preview')==='loader-after';
 const layer=document.createElement('div');
 layer.className='keyboard-loader';layer.setAttribute('role','status');
 const figure=document.createElement('div');figure.className='loader-friend';figure.setAttribute('aria-hidden','true');
 figure.innerHTML=mascot.querySelector('svg').outerHTML.replaceAll('spellkey-eye-clip','loader-eye-clip');
 figure.querySelector('.performer-pupil').setAttribute('d','M112 113H133V132Q122 145 112 132Z');
 const caption=document.createElement('span');caption.textContent='Getting comfy…';
 layer.append(figure,caption);host.append(layer);
 let shown=false,finished=false,showTimer,readyTimer,failureTimer;
 if(demo){
  const replay=document.createElement('button');replay.className='loader-replay';replay.textContent='Replay Spelky’s entrance';replay.addEventListener('click',()=>location.reload());document.body.append(replay);
 }
 const started=performance.now();
 function show(){if(finished||!host.getBoundingClientRect().height)return;shown=true;layer.classList.add('is-visible');mascot.style.visibility='hidden';}
 showTimer=setTimeout(show,demo?0:180);
 function clean(){clearTimeout(failureTimer);layer.remove();mascot.style.removeProperty('visibility');window.removeEventListener('message',receive);}
 async function finish(){
  if(finished)return;finished=true;clearTimeout(showTimer);clearTimeout(readyTimer);
  frame.classList.add('keyboard-is-ready');
  if(!shown||reduced.matches){clean();return;}
  caption.style.opacity='0';figure.classList.add('is-leaving');
  const from=figure.getBoundingClientRect(),to=mascot.getBoundingClientRect();
  // Fixed coordinates keep the hop independent of the keyboard's responsive layout.
  figure.style.cssText=`position:fixed;left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px;margin:0;z-index:100;transform-origin:0 0`;
  const dx=to.left-from.left,dy=to.top-from.top,scale=to.width/from.width;
  const hop=figure.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${dx*.45}px,${dy*.65-35}px) scale(.7)`,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(${scale})`}],{duration:500,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'});
  await hop.finished.catch(()=>{});clean();
 }
 function receive(event){if(event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.type!=='keyboard-ready')return;readyTimer=setTimeout(finish,demo?Math.max(0,2400-(performance.now()-started)):0);}
 window.addEventListener('message',receive);
 // Keep the header usable if rendering fails; do not claim the keyboard is ready.
 failureTimer=setTimeout(()=>{if(finished)return;clearTimeout(showTimer);caption.textContent='The keys are taking a little longer…';mascot.style.removeProperty('visibility');},15000);
 return ()=>{finished=true;clearTimeout(showTimer);clearTimeout(readyTimer);clearTimeout(failureTimer);clean();};
}
