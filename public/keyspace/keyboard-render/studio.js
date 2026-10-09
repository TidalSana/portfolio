import {bottomModCAD} from './assets/bottom-mod-cad.js';
import {EffectComposer} from './assets/post/postprocessing/EffectComposer.js';
import {RenderPass} from './assets/post/postprocessing/RenderPass.js';
import {SSAOPass} from './assets/post/postprocessing/SSAOPass.js';
import {OutputPass} from './assets/post/postprocessing/OutputPass.js';
import * as THREE from './assets/three.module.js';
import {OrbitControls} from './assets/OrbitControls.js';
import {boardCAD} from './assets/board-cad.js';
import {buildCase} from './case-model.js?v=light48';
import {createSteppedCaps} from './stepped-caps.js?v=light48';
import {STRIKER_DARK} from './striker-legends.js';
import {paintKeycapLegend} from './keycap-legends.js?v=light48';
import {rubrehoseNovelty,paintRubrehoseNovelty} from './rubrehose-novelties.js?v=light48';
import {applyAbsSurface} from './abs-surface.js?v=light48';
const host=document.querySelector('#scene');
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.VSMShadowMap;
host.append(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#f5f4ef').multiplyScalar(5); // Match the studio floor through the output tone-mapping pass, including beyond its edges.
// Large luminous cards create broad photographic reflections without a visible HDRI.
const studio=new THREE.Scene();studio.background=new THREE.Color('#b8b8b8');
function card(w,h,p,power,color='#ffffff'){const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide}));o.material.color.multiplyScalar(power);o.position.set(...p);o.lookAt(0,0,0);studio.add(o);}
card(18,24,[-18,26,8],4.5);card(20,24,[22,14,-12],2.2);card(26,4,[0,12,-24],2.2);card(34,22,[-8,8,26],3.5);
const pmrem=new THREE.PMREMGenerator(renderer);const environment=pmrem.fromScene(studio,.02);scene.environment=environment.texture;pmrem.dispose();
const root=new THREE.Group();root.rotation.x=THREE.MathUtils.degToRad(7);root.position.y=1.57;scene.add(root);
const camera=new THREE.OrthographicCamera(-20,20,12,-12,.1,160);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.08;controls.enablePan=false;controls.minZoom=.65;controls.maxZoom=2.6;controls.minPolarAngle=.02;controls.maxPolarAngle=1.48;controls.rotateSpeed=.55;
scene.add(new THREE.HemisphereLight('#ffffff','#aaa6a0',.12));
const keyLight=new THREE.DirectionalLight('#ffffff',1.6);keyLight.position.set(-18,24,8);keyLight.castShadow=true;keyLight.shadow.mapSize.set(4096,4096);keyLight.shadow.radius=4;keyLight.shadow.blurSamples=16;Object.assign(keyLight.shadow.camera,{left:-24,right:24,top:22,bottom:-22,near:1,far:80});keyLight.shadow.bias=-.00007;keyLight.shadow.normalBias=.015;scene.add(keyLight);
const fill=new THREE.DirectionalLight('#ffffff',.35);fill.position.set(15,14,-14);scene.add(fill);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshBasicMaterial({color:'#f5f4ef',toneMapped:false}));floor.material.color.multiplyScalar(5);floor.rotation.x=-Math.PI/2;floor.position.y=-.13;scene.add(floor);const floorShadow=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.ShadowMaterial({opacity:.94}));floorShadow.rotation.x=-Math.PI/2;floorShadow.position.y=-.125;floorShadow.receiveShadow=true;scene.add(floorShadow);
// Subtle broad contact occlusion complements the crisp near-contact real shadows.
const ac=document.createElement('canvas');ac.width=ac.height=256;const ax=ac.getContext('2d');const ag=ax.createRadialGradient(128,128,20,128,128,128);ag.addColorStop(0,'rgba(12,12,12,.94)');ag.addColorStop(.55,'rgba(12,12,12,.72)');ag.addColorStop(1,'rgba(60,49,40,0)');ax.fillStyle=ag;ax.fillRect(0,0,256,256);const at=new THREE.CanvasTexture(ac);const ambientShadow=new THREE.Mesh(new THREE.PlaneGeometry(38,16),new THREE.MeshBasicMaterial({map:at,transparent:true,depthWrite:false}));ambientShadow.rotation.x=-Math.PI/2;ambientShadow.position.y=-.115;scene.add(ambientShadow);
const cache={};function geo(id,top=false){const k=id+':'+top;if(cache[k])return cache[k];const d=id===29?bottomModCAD:boardCAD[id],g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(d.position,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(d.normal,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(d.uv,2));g.setIndex(top?d.topIndex:d.index);if(top)g.translate(0,.003,0);return cache[k]=g;}
// Microscopic moulded ABS grain: scale is far below the profile and legend detail.
const grain=document.createElement('canvas');grain.width=grain.height=128;const gx=grain.getContext('2d'),pixels=gx.createImageData(128,128);let seed=54;for(let i=0;i<pixels.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;const n=110+(seed%36);pixels.data.set([n,n,n,255],i);}gx.putImageData(pixels,0,0);const micro=new THREE.CanvasTexture(grain);micro.wrapS=micro.wrapT=THREE.RepeatWrapping;micro.repeat.set(9,9);
const stepped=createSteppedCaps(THREE),keys=[];
const rows=[
[['Esc',1,10],...['1','2','3','4','5','6','7','8','9','0','−','='].map(l=>[l,1,10]),['Backspace',2,26]],
[['Tab',1.5,34],...['Q','W','E','R','T','Y','U','I','O','P','[',']'].map(l=>[l,1,9]),['\\',1.5,34]],
[['Caps',1.75,39],...['A','S','D','F','G','H','J','K','L',';',"'"].map(l=>[l,1,7]),['Enter',2.25,24]],
[['Shift',2.25,25],...['Z','X','C','V','B','N','M',',','.','/'].map(l=>[l,1,8]),['Shift',2.75,21]],
[['Ctrl',1.5,29],['',1,null],['Alt',1.5,29],['',7,3],['Alt',1.5,29],['',1,null],['Ctrl',1.5,29]]];
rows.forEach((row,r)=>{let x=-15*1.905/2;for(const [letter,u,id] of row){const cx=x+u*1.905/2;x+=u*1.905;if(id===null)continue;const group=new THREE.Group();group.position.set(cx,.83,(r-2)*1.905);root.add(group);const material=new THREE.MeshStandardMaterial({color:['Esc','Enter'].includes(letter)?STRIKER_DARK:'#345B94',roughness:.36,metalness:0,envMapIntensity:.50,bumpMap:micro,bumpScale:.003});applyAbsSurface(material);const body=letter==='Caps'?stepped.body:geo(id);const mesh=new THREE.Mesh(body,material);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
const c=document.createElement('canvas');c.width=u>2?1024:512;c.height=512;const ctx=c.getContext('2d'),w=(letter==='Caps'?stepped.width:id===29?bottomModCAD.width:boardCAD[id].width)*10;ctx.scale(c.width/w,512/18);paintKeycapLegend(ctx,letter,w,'#FFFCF7',{kana:true});const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();const lm=new THREE.MeshStandardMaterial({map:tex,transparent:true,depthWrite:false,roughness:.48,bumpMap:micro,bumpScale:.003,envMapIntensity:.50,polygonOffset:true,polygonOffsetFactor:-1});applyAbsSurface(lm,{legend:true});const legend=new THREE.Mesh(letter==='Caps'?stepped.top:geo(id,true),lm);legend.receiveShadow=true;group.add(legend);keys.push({x:cx,z:(r-2)*1.905,u,group,letter,material,legend,canvas:c,texture:tex,widthMM:w});}});
// Raised F/J homing bars share the keycap material and travel with each key.
const homingGeometry=new THREE.CapsuleGeometry(.028,.31,6,12);
homingGeometry.rotateZ(Math.PI/2);
for(const key of keys.filter(k=>k.letter==='F'||k.letter==='J')){
 const top=new THREE.Mesh(geo(7,true),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));
 const hit=new THREE.Raycaster(new THREE.Vector3(0,5,.48),new THREE.Vector3(0,-1,0)).intersectObject(top)[0];
 if(!hit)throw new Error('Homing bar missed keycap surface');
 const bar=new THREE.Mesh(homingGeometry,key.material);bar.name='homing-bar-'+key.letter;
 const normal=hit.face.normal.clone();if(normal.y<0)normal.negate();
 bar.position.copy(hit.point).addScaledVector(normal,.003);
 bar.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),normal);
 bar.castShadow=true;bar.receiveShadow=true;key.group.add(bar);top.material.dispose();
 // A tight, softly feathered contact shadow follows the curved cap surface.
 // Only F/J receive this extra occlusion; the board lighting stays unchanged.
 const contactMaterial=new THREE.ShaderMaterial({
  transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,
  vertexShader:`varying vec2 capPosition;
   void main(){capPosition=position.xz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader:`varying vec2 capPosition;
   void main(){
    vec2 p=capPosition-vec2(.022,.461);
    float distanceToBar=length(vec2(max(abs(p.x)-.155,0.0),p.y));
    float opacity=.70*(1.0-smoothstep(.018,.065,distanceToBar));
    if(opacity<.005)discard;
    gl_FragColor=vec4(.10,.115,.095,opacity);
   }`
 });
 const contact=new THREE.Mesh(geo(7,true),contactMaterial);
 contact.name='homing-contact-shadow-'+key.letter;contact.position.y=.002;
 key.group.add(contact);
}
const caseModel=buildCase(THREE,root,keys);caseModel.setFinish('#d5b7b3');
// Color studies use the same lighting and geometry; palette values are visual approximations.
const palettes={
 rubrehose:{name:'GMK Rubrehose',alpha:'#d7d3bc',mods:'#a8aba2',esc:'#a8aba2',enter:'#a8aba2',ink:'#292b28'},
 striker:{name:'Striker',alpha:'#345B94',mods:'#345B94',esc:STRIKER_DARK,enter:STRIKER_DARK,ink:'#FFFCF7'},
 neutral:{name:'Neutral study',alpha:'#a5a5a5',mods:'#a5a5a5',esc:'#a5a5a5',enter:'#a5a5a5',ink:'#292929'},
 modo:{name:'Modern Dolch',alpha:'#777b7c',mods:'#44494b',esc:'#83bfb8',enter:'#83bfb8',ink:'#f2f1eb'},
 beige:{name:'9009',alpha:'#d5d0bd',mods:'#b7b4a6',esc:'#bd8d87',enter:'#9daa8e',ink:'#393b37'},
 wob:{name:'White on Black',alpha:'#222425',mods:'#222425',esc:'#222425',enter:'#222425',ink:'#f3f0e8'}
};
const finishes={turquoise:{name:'Turquoise',color:'#25c5cc'},mint:{name:'Mint',color:'#a7d9c7'},rose:{name:'Rose gold',color:'#d5b7b3'},silver:{name:'Silver',color:'#c6c9cc'},ink:{name:'Graphite',color:'#5c6066'},olive:{name:'Olive',color:'#777c5a'}};
function applyPalette(){
 const id=document.querySelector('#keycaps').value,p=palettes[id],f=finishes[document.querySelector('#finish').value];
 caseModel.setFinish(f.color);
 for(const k of keys){
  const novelty=id==='rubrehose'?rubrehoseNovelty(k):null;
  const color=novelty?.color ?? (k.letter==='Esc'?p.esc:k.letter==='Enter'?p.enter:k.u>1&&k.u!==7&&!(id==='rubrehose'&&k.letter==='\\')?p.mods:p.alpha);k.material.color.set(color);
  const c=k.canvas,ctx=c.getContext('2d');ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,c.width,c.height);ctx.scale(c.width/k.widthMM,512/18);
  if(novelty)paintRubrehoseNovelty(ctx,k,novelty);
  else paintKeycapLegend(ctx,k.letter,k.widthMM,p.ink,{kana:id==='striker',layout:id==='rubrehose'?'rubrehose':'standard'});
  k.texture.needsUpdate=true;
 }
 document.querySelector('header p').textContent=f.name+' / '+p.name+' / 60% WKL';
 const url=new URL(location.href);url.searchParams.set('caps',id);url.searchParams.set('finish',document.querySelector('#finish').value);history.replaceState(null,'',url);
}
const query=new URLSearchParams(location.search);for(const [selector,values,param] of [['#keycaps',palettes,'caps'],['#finish',finishes,'finish']]){const el=document.querySelector(selector);if(Object.hasOwn(values,query.get(param)))el.value=query.get(param);el.addEventListener('change',applyPalette);}
await document.fonts.load('12px OpenCherry');applyPalette();
const undersideLight=new THREE.DirectionalLight('#fff8ef',2.7);undersideLight.position.set(-12,-25,-18);undersideLight.visible=false;scene.add(undersideLight);
const postTarget=new THREE.WebGLRenderTarget(innerWidth,innerHeight,{type:THREE.HalfFloatType,samples:4});const composer=new EffectComposer(renderer,postTarget);composer.addPass(new RenderPass(scene,camera));
const creviceShadows=new SSAOPass(scene,camera,innerWidth,innerHeight);creviceShadows.ssaoMaterial.defines.PERSPECTIVE_CAMERA=0;creviceShadows.kernelRadius=1.1;creviceShadows.minDistance=.0008;creviceShadows.maxDistance=.035;composer.addPass(creviceShadows);composer.addPass(new OutputPass());
// Peek offsets are removed before OrbitControls updates, so they never accumulate.
const peekTarget=new THREE.Vector2(),peekCurrent=new THREE.Vector2(),peekOffset=new THREE.Vector3();
const peekRight=new THREE.Vector3(),peekUp=new THREE.Vector3();
const peekMotion=matchMedia('(prefers-reduced-motion: reduce)');
let peekDragging=false,peekTime=0;
function clearPeekOffset(){camera.position.sub(peekOffset);controls.target.sub(peekOffset);peekOffset.set(0,0,0);}
function setPeek(x=0,y=0){peekTarget.set(Number.isFinite(x)?Math.max(-1,Math.min(1,x)):0,Number.isFinite(y)?Math.max(-1,Math.min(1,y)):0);}
controls.addEventListener('start',()=>{peekDragging=true;clearPeekOffset();peekCurrent.set(0,0);setPeek();controls.update();});
controls.addEventListener('end',()=>{peekDragging=false;});
peekMotion.addEventListener('change',()=>{clearPeekOffset();peekCurrent.set(0,0);setPeek();controls.update();});
let current='hero';const poses={hero:{p:[-18,25,36],t:[0,1.5,0],span:20},top:{p:[0,46,.01],t:[0,1.5,0],span:19},tabDetail:{p:[-5,23,20],t:[-11,2,-1],span:6},legends:{p:[13,14,24],t:[10,2,-1],span:6},detail:{p:[-24,18,28],t:[-6,2,1],span:13},side:{p:[-36,50,32],t:[-9,2,0],span:18,zoom:1.8},rear:{p:[0,8,-40],t:[0,1,0],span:18},plate:{p:[0,27,-34],t:[0,1,0],span:19},underside:{p:[0,28,-35],t:[0,2,0],span:19}};
function resize(){const w=innerWidth,h=innerHeight,aspect=w/h;const span=poses[current].span;const half=Math.max(span/aspect,9);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();renderer.setSize(w,h);composer.setSize(w,h);}
function setView(view){clearPeekOffset();peekCurrent.set(0,0);setPeek();current=view;const underside=view==='underside'||view==='side';renderer.toneMappingExposure=underside?.78:.95;keyLight.position.set(...(underside?[8,28,-18]:[-18,24,8]));floor.visible=floorShadow.visible=ambientShadow.visible=!underside;undersideLight.visible=false;root.rotation.order='ZXY';root.rotation.z=underside?Math.PI:0;controls.minPolarAngle=.02;controls.maxPolarAngle=1.48;keys.forEach(k=>k.group.visible=!underside&&view!=='plate');caseModel.setView(view==='plate'?'plate':'assembled');renderer.shadowMap.needsUpdate=true;const pose=poses[view];camera.position.set(...pose.p);controls.target.set(...pose.t);camera.zoom=pose.zoom||1;controls.update();resize();document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-pressed',String(b.dataset.view===view));});}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));window.addEventListener('resize',resize);const requestedView=new URLSearchParams(location.search).get('view');setView(Object.hasOwn(poses,requestedView)?requestedView:'hero');
document.querySelector('#save').addEventListener('click',()=>{composer.render();const a=document.createElement('a');a.download='korsa-mini-case-v3-'+current+'.png';a.href=renderer.domElement.toDataURL('image/png');a.click();});
renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
function tick(now=0){
 requestAnimationFrame(tick);clearPeekOffset();controls.update();
 const dt=Math.min((now-peekTime)/1000,.05);peekTime=now;
 if(peekDragging||peekMotion.matches||document.hidden){peekCurrent.set(0,0);}
 else peekCurrent.lerp(peekTarget,1-Math.exp(-7*Math.max(0,dt)));
 peekRight.setFromMatrixColumn(camera.matrixWorld,0);peekUp.setFromMatrixColumn(camera.matrixWorld,1);
 peekOffset.copy(peekRight).multiplyScalar(peekCurrent.x*1.35).addScaledVector(peekUp,peekCurrent.y*.8);
 camera.position.add(peekOffset);controls.target.add(peekOffset);camera.updateMatrixWorld();
 composer.render();
}tick();document.querySelector('#loading').remove();window.studio={scene,renderer,camera,controls,root,setView,setPeek};
