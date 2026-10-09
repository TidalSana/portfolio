// Move the label, never its hit target, so hovering stays easy to control.
export function initMagneticNavigation(nav){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 const items=[...nav.querySelectorAll('button')].map(button=>({button,label:button.querySelector('.word-idle'),x:0,y:0,vx:0,vy:0,tx:0,ty:0}));
 let frame=0,last=0;
 function draw(time){
  frame=0;
  const elapsed=Math.min((time-last)/1000,0.04);last=time;
  const steps=Math.max(1,Math.ceil(elapsed/(1/120))),dt=elapsed/steps;
  let moving=false;
  for(const item of items){
   for(let i=0;i<steps;i++)for(const axis of ['x','y']){
    const v='v'+axis,t='t'+axis;
    item[v]+=(180*(item[t]-item[axis])-15*item[v])*dt;
    item[axis]+=item[v]*dt;
   }
   const unsettled=Math.abs(item.tx-item.x)+Math.abs(item.ty-item.y)+Math.abs(item.vx)+Math.abs(item.vy)>.08;
   if(!unsettled){item.x=item.tx;item.y=item.ty;item.vx=item.vy=0;}
   item.label.style.translate=`${item.x}px ${item.y}px`;
   moving||=unsettled;
  }
  if(moving)frame=requestAnimationFrame(draw);
 }
 function start(){if(!frame){last=performance.now();frame=requestAnimationFrame(draw);}}
 function reset(){
  cancelAnimationFrame(frame);frame=0;
  for(const item of items){item.x=item.y=item.vx=item.vy=item.tx=item.ty=0;item.label.style.removeProperty('translate');}
 }
 for(const item of items){
  item.button.addEventListener('pointermove',event=>{
   if(event.pointerType!=='mouse'||reduced.matches||!fine.matches||event.buttons||nav.inert)return;
   const rect=item.button.getBoundingClientRect();
   item.tx=Math.max(-10,Math.min(10,(event.clientX-rect.left-rect.width/2)*.3));
   item.ty=Math.max(-7,Math.min(7,(event.clientY-rect.top-rect.height/2)*.3));
   start();
  });
  item.button.addEventListener('pointerleave',()=>{item.tx=item.ty=0;if(!reduced.matches)start();});
  item.button.addEventListener('pointerdown',reset);
 }
 for(const event of ['hashchange','section-layout','blur','resize'])window.addEventListener(event,reset);
 document.addEventListener('visibilitychange',reset);
 reduced.addEventListener('change',reset);fine.addEventListener('change',reset);
}
