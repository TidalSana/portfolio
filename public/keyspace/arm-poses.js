export const poses={
 relaxed:[ [-2,188,172,-24,160,'rest'], [242,188,188,267,162,'rest'] ],
 welcoming:[ [-40,145,-62,-32,181,'cup'], [242,188,188,267,162,'rest'] ],
 thinking:[ [-2,188,172,-24,160,'rest'], [205,126,-30,267,186,'think'] ],
 casting:[ [-4,153,32,-37,183,'rest'], [284,114,66,250,164,'open'] ],
 shrugging:[ [-34,159,-62,-35,194,'cup'], [269,143,62,273,184,'cup'] ],
 gathering:[ [65,166,20,-23,208,'rest'], [185,160,-20,264,202,'rest'] ]
};
const posture={relaxed:[0,1,1],welcoming:[-3,1.015,.99],thinking:[-5,.99,1.01],casting:[6,1.035,.97],shrugging:[-2,1.025,.975],gathering:[-4,.97,1.03]};
export function createPoseRig(svg){
 const arms=[...svg.querySelectorAll('.rubber-arm')];
 // One shared actor keeps shoulders attached as the body leans and settles.
 const actor=document.createElementNS('http://www.w3.org/2000/svg','g');actor.setAttribute('class','spellkey-actor');
 actor.append(svg.querySelector('.performer-body'),...arms);svg.append(actor);
 let current=poses.relaxed.map(p=>[...p]),currentPosture=[...posture.relaxed],active;
 function draw(state,stance=posture.relaxed){currentPosture=[...stance];actor.setAttribute('transform',`translate(120 175) rotate(${stance[0]}) scale(${stance[1]} ${stance[2]}) translate(-120 -175)`);current=state.map(p=>[...p]);arms.forEach((arm,i)=>{
  const [x,y,angle,cx,cy,hand]=state[i],a=angle*Math.PI/180;
  const ex=x-32*Math.sin(a),ey=y+32*Math.cos(a),sx=i?190:48,sy=i?129:130;
  arm.style.opacity='1';arm.style.transform='none';
  arm.querySelector('.arm-tube').setAttribute('d',`M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}`);
  arm.querySelector('.glove').setAttribute('transform',`translate(${x} ${y}) rotate(${angle})`);
  arm.querySelector('.rubber-hand').style.transform='none';
  ['open','fist','point','rest','cup','think'].forEach(name=>arm.querySelector('.hand-'+name).style.opacity=name===hand?'1':'0');
 });}
 function set(name){active?.cancel();draw(poses[name],posture[name]);}
 function sequence(names,{duration=1400,reduced=false}={}){
  active?.cancel();const states=[current,...names.map(n=>poses[n])],stances=[currentPosture,...names.map(n=>posture[n])];
  let frame,done=false,resolve;const finished=new Promise(r=>resolve=r),start=performance.now();
  const animation={finished,cancel(){if(done)return;done=true;cancelAnimationFrame(frame);resolve();}};active=animation;
  if(reduced){draw(states.at(-1),stances.at(-1));animation.cancel();return animation;}
  function step(now){if(done)return;const progress=Math.max(0,Math.min(1,(now-start)/duration))*(states.length-1),index=Math.min(states.length-2,Math.floor(progress));
   const t=progress-index,eased=t*t*(3-2*t),from=states[index],to=states[index+1];
   draw(from.map((p,i)=>p.map((v,j)=>j===5?(t<.5?v:to[i][j]):v+(to[i][j]-v)*eased)),stances[index].map((v,j)=>v+(stances[index+1][j]-v)*eased));
   if(progress===states.length-1)animation.cancel();else frame=requestAnimationFrame(step);
  }frame=requestAnimationFrame(step);return animation;
 }
 draw(current);return {set,sequence,cancel:()=>active?.cancel()};
}
