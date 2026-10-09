export function edgeAmount(position,size){
 if(!Number.isFinite(position)||!Number.isFinite(size)||size<=0)return 0;
 const normalized=Math.max(-1,Math.min(1,position/size*2-1));
 const t=Math.max(0,(Math.abs(normalized)-.7)/.3);
 return t===0?0:Math.sign(normalized)*t*t*(3-2*t);
}
