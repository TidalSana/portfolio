// Geometry and spring constants from Josh's approved one-eye motion study.
export const eyePaths = [
 'M81 113H163C161 144 145 158 122 158S85 144 81 113Z',
 'M86 107Q122 100 158 107C164 139 147 161 122 161S81 139 86 107Z',
 'M82 119Q121 108 161 108C161 140 143 157 121 157S85 143 82 119Z',
];
const w=18,z=.86,d=w*Math.sqrt(1-z*z),decay=z*w;
const clamp=(x,lo,hi)=>Math.max(lo,Math.min(hi,x));
export function step(t){
 if(t<=0)return 0;
 return 1-Math.exp(-decay*t)*(Math.cos(d*t)+decay/d*Math.sin(d*t));
}
// Analytic spring: event timestamps, not frame count, determine the pose.
export function createSpring(initial=0){
 let position=initial,velocity=0,target=initial,start=0;
 function state(time){
  const t=Math.max(0,time-start),a=position-target,b=(velocity+decay*a)/d;
  const c=Math.cos(d*t),s=Math.sin(d*t),e=Math.exp(-decay*t);
  return [target+e*(a*c+b*s),e*((-decay*a+d*b)*c+(-decay*b-d*a)*s)];
 }
 return {
  at:time=>state(time)[0],
  set(value,time){if(value===target)return;[position,velocity]=state(time);target=value;start=time;},
  reset(value,time){position=target=value;velocity=0;start=time;},
 };
}
export function eyeGeometry(mood=0,gaze=0,blink=0){
 const px=(mood===2?137:133)+gaze;
 return {
  aperture:eyePaths[mood]||eyePaths[0],
  pupil:`M${px} 100C${px-16} 99 ${px-19} 151 ${px-2} 151C${px+11} 151 ${px+13} 133 ${px+12} 128L${px+1} 122L${px+12} 116C${px+11} 105 ${px+6} 100 ${px} 100Z`,
  transform:`translate(0 ${123*blink}) scale(1 ${Math.max(.025,1-blink)})`,
  blinkLine:blink>.93?1:0,
 };
}
export function createSpellkeyMotion({reduced=false}={}){
 const springs=Object.fromEntries(['gaze','dx','stretch','squash','tilt','zoom'].map(k=>[k,createSpring()]));
 let active=true,hover=false,drag=null,clicked=-Infinity,reaction=null,epoch=0;
 function reset(t){Object.values(springs).forEach(s=>s.reset(0,t));drag=null;clicked=-Infinity;reaction=null;hover=false;epoch=t;}
 function idleTargets(t){springs.dx.set(0,t);springs.stretch.set(0,t);springs.squash.set(0,t);springs.zoom.set(hover?.025:0,t);springs.tilt.set(hover?-3:0,t);}
 return {
  enter(t){if(!active)return;hover=true;if(!reduced&&!drag)idleTargets(t);},
  leave(t){hover=false;if(!drag)idleTargets(t);},
  follow(x,y,t){if(!active||reduced||!Number.isFinite(x)||!Number.isFinite(y))return;springs.gaze.set(clamp(x,-1,1)*10,t);},
  down(x,y,t){if(!active)return;drag={x,y,moved:false};clicked=-Infinity;if(!reduced){springs.squash.set(1,t);springs.zoom.set(.025,t);}},
  move(x,y,t){
   if(!drag||!Number.isFinite(x)||!Number.isFinite(y))return;
   const dx=x-drag.x,dy=y-drag.y;
   if(Math.hypot(dx,dy)>18)drag.moved=true;
   if(!drag.moved||reduced)return;
   springs.squash.set(0,t);springs.dx.set(clamp(dx,-300,300)*.14/3.15,t);
   springs.stretch.set(clamp(-dy/1550,-.1,.1),t);springs.tilt.set(clamp(dx/75,-4,4),t);springs.zoom.set(.04,t);
  },
  up(t){const moved=!!drag?.moved;drag=null;idleTargets(t);return moved;},
  click(t){if(active&&!reduced){clicked=t;springs.squash.reset(0,t);}},
  react(name,t){if(!active||drag)return;reaction={mood:name==='shrugging'?2:1,until:t+1.8};if(!reduced)springs.tilt.set(name==='shrugging'?4:-3,t);},
  setReduced(value,t){reduced=value;reset(t);},
  setActive(value,t){active=value;reset(t);},
  sample(t){
   if(reaction&&t>=reaction.until){reaction=null;idleTargets(t);}
   const mood=drag?.moved?2:reaction?.mood??(hover?1:0);
   if(!active||reduced)return {mood,dx:0,sx:1,sy:1,tilt:0,zoom:1,gaze:0,blink:0};
   const ct=t-clicked;
   const pulse=Number.isFinite(ct)?step(ct)-step(ct-.5):0;
   const echo=Number.isFinite(ct)?step(ct-1)-step(ct-1.5):0;
   const squash=springs.squash.at(t),stretch=springs.stretch.at(t);
   const phase=((t-epoch)%14+14)%14;
   return {mood,dx:springs.dx.at(t),sx:1+.1*(pulse+squash)+.045*echo-stretch*.4,
    sy:1-.12*(pulse+squash)-.055*echo+stretch,tilt:springs.tilt.at(t),zoom:1+springs.zoom.at(t),
    gaze:springs.gaze.at(t),blink:phase>=10&&phase<10.5?Math.sin((phase-10)/.5*Math.PI):0};
  },
 };
}
