// Artwork sampled from Oblotzky Industries' GMK CYL Rubrehose base-kit render.
// Crop coordinates use the 1920-wide reference; only dark legend ink is retained.
const definitions={
 face:{crop:[1691,622,30,31],width:9.7},
 wolf:{crop:[1218,835,34,31],width:10.5},
 eyes:{crop:[1424,839,52,24],width:15.8},
 hose:{crop:[1555,838,60,26],width:18.2},
 backspace:{crop:[1745,621,79,34],width:26},
 enter:{crop:[1627,735,89,22],width:28},
 caps:{crop:[1409,731,40,29],width:10.7}
};
const image=new Image();image.src=new URL('./assets/rubrehose-kit.jpg',import.meta.url).href;
await image.decode();
for(const definition of Object.values(definitions)){
 const [x,y,w,h]=definition.crop,scale=image.naturalWidth/1920;
 const canvas=document.createElement('canvas');canvas.width=Math.round(w*scale);canvas.height=Math.round(h*scale);
 const ctx=canvas.getContext('2d',{willReadFrequently:true});
 ctx.drawImage(image,x*scale,y*scale,w*scale,h*scale,0,0,canvas.width,canvas.height);
 const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
 const peaks=[];for(let i=0;i<pixels.data.length;i+=4)peaks.push(Math.max(pixels.data[i],pixels.data[i+1],pixels.data[i+2]));
 peaks.sort((a,b)=>a-b);const background=peaks[Math.floor(peaks.length*.8)];
 for(let i=0;i<pixels.data.length;i+=4){
  const peak=Math.max(pixels.data[i],pixels.data[i+1],pixels.data[i+2]);
  pixels.data[i]=41;pixels.data[i+1]=43;pixels.data[i+2]=40;
  pixels.data[i+3]=Math.round(255*Math.max(0,Math.min(1,(background-12-peak)/(background-100))));
 }
 ctx.putImageData(pixels,0,0);
 // Reconstruct a smooth ink boundary at decal resolution, then tighten coverage.
 // This avoids magnifying the source's soft, partly transparent edge pixels.
 const crisp=document.createElement('canvas');crisp.width=canvas.width*8;crisp.height=canvas.height*8;
 const sharp=crisp.getContext('2d',{willReadFrequently:true});
 sharp.imageSmoothingEnabled=true;sharp.imageSmoothingQuality='high';
 sharp.drawImage(canvas,0,0,crisp.width,crisp.height);
 const coverage=sharp.getImageData(0,0,crisp.width,crisp.height);
 for(let i=0;i<coverage.data.length;i+=4){
  const t=Math.max(0,Math.min(1,(coverage.data[i+3]/255-.025)/.65));
  coverage.data[i]=41;coverage.data[i+1]=43;coverage.data[i+2]=40;
  coverage.data[i+3]=Math.round(255*t*t*(3-2*t));
 }
 sharp.putImageData(coverage,0,0);definition.canvas=crisp;
}
export function rubrehoseNovelty(key){
 const name=key.letter;
 if(name==='Esc')return {art:'face',color:'#e95594'};
 if(name==='Backspace')return {art:'backspace',color:'#f6cf19'};
 if(name==='Enter')return {art:'enter',color:'#80ce43'};
 if(name==='Caps')return {art:'caps',color:'#aa79df'};
 if(name==='Ctrl')return {art:key.x<0?'eyes':'hose',color:'#ed5c70'};
 if(name==='Alt')return {art:key.x<0?'wolf':'face',color:'#08b7dc'};
 return null;
}
export function paintRubrehoseNovelty(ctx,key,novelty){
 const d=definitions[novelty.art],width=d.width,height=width*d.canvas.height/d.canvas.width;
 const centerX=key.letter==='Caps'?10.3:key.widthMM/2;
 ctx.drawImage(d.canvas,centerX-width/2,8.2-height/2,width,height);
}
