// Randomness belongs to a cast, never to a resize.
export function createWordLayout(count,random=Math.random){
 const slots=Array.from({length:count},(_,i)=>i);
 for(let i=count-1;i>0;i--){const j=Math.floor(random()*(i+1));[slots[i],slots[j]]=[slots[j],slots[i]];}
 return slots.map(slot=>({slot,x:random(),y:random(),delay:-random()*6}));
}
export function placeWords(width,layout){
 const compact=width<520,cols=compact?2:4,cell=width/cols;
 return layout.map(({slot,x,y,delay})=>{
  const w=Math.max(0,Math.min(105,cell-8));
  return {width:w,left:slot%cols*cell+4+x*Math.max(0,cell-w-8),top:compact?Math.floor(slot/2)*78+8+y*16:16+y*80,delay};
 });
}
