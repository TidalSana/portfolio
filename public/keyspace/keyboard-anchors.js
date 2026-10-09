// Orthographic projections preserve the plane exactly with a CSS affine matrix.
export function anchorStyle(point,frame,nav,width,height){
 const {p,x,z}=point;
 const a=(x[0]-p[0])*frame.width,b=(x[1]-p[1])*frame.height;
 const c=(z[0]-p[0])*frame.width,d=(z[1]-p[1])*frame.height;
 return {left:frame.left-nav.left+p[0]*frame.width-width/2,top:frame.top-nav.top+p[1]*frame.height-height/2,matrix:`matrix(${a},${b},${c},${d},0,0)`};
}
export function initKeyboardAnchors(nav,frame){
 let points=null;
 const buttons=[...nav.querySelectorAll('[data-go]')];
 function update(){
  if(!points||document.body.classList.contains('visiting'))return;
  const rect=frame.getBoundingClientRect(),origin=nav.getBoundingClientRect();
  if(!rect.width||!rect.height)return;
  buttons.forEach((button,i)=>{
   const value=anchorStyle(points[i],rect,origin,button.offsetWidth,button.offsetHeight);
   button.style.setProperty('--anchor-left',value.left+'px');
   button.style.setProperty('--anchor-top',value.top+'px');
   button.style.setProperty('--anchor-plane',value.matrix);
  });
  nav.classList.add('keyboard-anchored');
 }
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.type!=='keyboard-anchors')return;
  const next=event.data.points;
  if(!Array.isArray(next)||next.length!==buttons.length||!next.every(point=>['p','x','z'].every(key=>Array.isArray(point[key])&&point[key].length===2&&point[key].every(Number.isFinite))))return;
  points=next;update();
 });
 window.addEventListener('section-layout',update);
 window.addEventListener('resize',update);
 const observer=new ResizeObserver(update);observer.observe(frame);observer.observe(nav);
}
