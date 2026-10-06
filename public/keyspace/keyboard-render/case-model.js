// Photo-informed Korsa Mini visual reconstruction. Dimensions are estimates.
// Rear = negative Z. The lower body retreats at both sides up to front shoulders.
export function buildCase(THREE,root,keys){
 const assembly=new THREE.Group();assembly.name='Korsa photo study';root.add(assembly);
 const geometries=new Set(),materials=new Set();
 const mat=(color,roughness=.4,metalness=0)=>{const m=new THREE.MeshStandardMaterial({color,roughness,metalness});materials.add(m);return m;};
 const finish=mat('#d5b7b3',.31,.8),bottomFinish=mat('#d5b7b3',.35,.78),plateMat=mat('#e1e4e6',.28,.72),brass=mat('#b6a353',.43,.7),dark=mat('#292629',.72,.1),pcbMat=mat('#14382f',.72,.1),switchMat=mat('#31343b',.6),steel=mat('#a4a4a6',.3,.8);
 // In the upside-down reference the bottom shell is ABOVE the seam.
 // Its ledge has a substantial band of its own; the top shell is below it.
 const bottomDatum=-1.25,ledgeY=-.382,seamBottom=.038;
 const slope=Math.tan(7*Math.PI/180),bottomAt=z=>bottomDatum+slope*z;
 function mesh(g,m,parent=assembly){geometries.add(g);const o=new THREE.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 function rect(w,d,r=.1,cx=0,cz=0){const s=new THREE.Shape(),x=cx-w/2,z=cz-d/2;r=Math.min(r,w/2,d/2);s.moveTo(x+r,z);s.lineTo(x+w-r,z);s.quadraticCurveTo(x+w,z,x+w,z+r);s.lineTo(x+w,z+d-r);s.quadraticCurveTo(x+w,z+d,x+w-r,z+d);s.lineTo(x+r,z+d);s.quadraticCurveTo(x,z+d,x,z+d-r);s.lineTo(x,z+r);s.quadraticCurveTo(x,z,x+r,z);return s;}
 function polygon(points){const s=new THREE.Shape();points.forEach(([x,z],i)=>i?s.lineTo(x,z):s.moveTo(x,z));s.closePath();return s;}
 function hole(s,w,d,r,x=0,z=0){s.holes.push(rect(w,d,r,x,z));}
 function circleHole(s,x,z,r){const h=new THREE.Path();h.absarc(x,z,r,0,Math.PI*2,false);s.holes.push(h);}
 function extrude(shape,depth,top,m,bevel=.02,parent=assembly){const g=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:bevel>0,bevelSize:bevel,bevelThickness:bevel,bevelSegments:4,curveSegments:18,steps:1});g.rotateX(Math.PI/2);const o=mesh(g,m,parent);o.position.y=top;return o;}
 function slab(w,d,h,x,y,z,m,r=.08,parent=assembly){const o=extrude(rect(w,d,r),h,y+h/2,m,.015,parent);o.position.x=x;o.position.z=z;return o;}
 function sloped(o){const a=o.geometry.attributes.position;for(let i=0;i<a.count;i++)a.setY(i,a.getY(i)+slope*(a.getZ(i)+o.position.z));a.needsUpdate=true;o.geometry.computeVertexNormals();return o;}
 const screwPositions=[];for(const x of [-13.28,-4.55,4.55,13.28])for(const z of [-4.83,4.82])screwPositions.push([z<0&&Math.abs(x)>10?Math.sign(x)*12.85:x,z]);
 const upper=new THREE.Group();upper.name="Top case — key opening to seam";assembly.add(upper);
 // The upper shell remains full width; the WKL blockers belong to its aperture.
 const upperOutline=rect(29.5,10.6,.15),aperture=new THREE.Path();
 const boundary=[[-14.44,-4.81],[14.44,-4.81],[14.44,4.81],[11.4025,4.81],[11.4025,2.85],[9.5525,2.85],[9.5525,4.81],[-9.5525,4.81],[-9.5525,2.85],[-11.4025,2.85],[-11.4025,4.81],[-14.44,4.81]];
 boundary.forEach(([x,z],i)=>i?aperture.lineTo(x,z):aperture.moveTo(x,z));aperture.closePath();upperOutline.holes.push(aperture);const upperMesh=extrude(upperOutline,.90,.96,finish,.012,upper);
 {const a=upperMesh.geometry.attributes.position;for(let i=0;i<a.count;i++)if(a.getY(i)<-.885){a.setY(i,-.90);a.setX(i,Math.max(-14.75,Math.min(14.75,a.getX(i))));a.setZ(i,Math.max(-5.3,Math.min(5.3,a.getZ(i))));}a.needsUpdate=true;upperMesh.geometry.computeVertexNormals();}
 // Exactly one hairline shell join; both sides meet at the same outer silhouette.
 const seamPath=rect(29.42,10.52,.15).getPoints(20),seamVertices=[];
 for(let i=0;i<seamPath.length-1;i++){const a=seamPath[i],b=seamPath[i+1];seamVertices.push(a.x,.06,a.y,a.x,.038,a.y,b.x,.06,b.y,b.x,.06,b.y,a.x,.038,a.y,b.x,.038,b.y);}
 const seamG=new THREE.BufferGeometry();seamG.setAttribute('position',new THREE.Float32BufferAttribute(seamVertices,3));seamG.computeVertexNormals();const seamMat=dark.clone();seamMat.side=THREE.DoubleSide;materials.add(seamMat);mesh(seamG,seamMat).name="Top/bottom case seam";
 // Flush side band with a single flat exposed ledge. No stepped perimeter lips.
 const flange=rect(29.5,10.6,.15);hole(flange,25.80,9.35,.12);for(const [x,z] of screwPositions)circleHole(flange,x,z,.205);extrude(flange,seamBottom-ledgeY,seamBottom,bottomFinish,0).name="Bottom case ledge and seam band";
 // One shared smooth contour drives bottom, edge chamfer and the entire sidewall.
 function footprint(inset=0){
  const a=13.75-inset,b=14.75-inset,zr=-5.17+inset,zf=5.30-inset,t=1.15;
  // A diagonal return, tangent to the long side at both rounded ends.
  // Its outward travel and forward travel are comparable, as in the circled photo.
  const s=new THREE.Shape();
  s.moveTo(-a+.12,zr);s.lineTo(a-.12,zr);s.quadraticCurveTo(a,zr,a,zr+.12);
  s.lineTo(a,t);s.quadraticCurveTo(a,t+.24,a+.17,t+.41);
  s.lineTo(b-.17,t+1.30);s.quadraticCurveTo(b,t+1.47,b,t+1.71);
  s.lineTo(b,zf-.15);s.quadraticCurveTo(b,zf,b-.15,zf);
  s.lineTo(-b+.15,zf);s.quadraticCurveTo(-b,zf,-b,zf-.15);
  s.lineTo(-b,t+1.71);s.quadraticCurveTo(-b,t+1.47,-b+.17,t+1.30);
  s.lineTo(-a-.17,t+.41);s.quadraticCurveTo(-a,t+.24,-a,t);
  s.lineTo(-a,zr+.12);s.quadraticCurveTo(-a,zr,-a+.12,zr);return s;
 }

 // Closed underside plate with genuine openings for weight, screw counterbores, and foot pockets.
 const footPositions=[[-12.35,-4.18],[12.35,-4.18],[-13.40,4.10],[13.40,4.10]];
 const floorShape=footprint(.10);hole(floorShape,25.65,3.65,.18,0,-1.90);for(const [x,z] of screwPositions)circleHole(floorShape,x,z,.205);for(const [x,z] of footPositions)circleHole(floorShape,x,z,.37);
 // A single planar underside with pocket openings, no second overlapping edge extrusion.
 const undersideG=new THREE.ShapeGeometry(floorShape,24);undersideG.rotateX(Math.PI/2);const underside=mesh(undersideG,bottomFinish);underside.position.y=bottomDatum;sloped(underside);
 // Separate bevel and wall faces share the exact same rounded-shoulder outline.
 // The narrow straight bevel stays crisp; only the two plan-view return corners round.
 const outer=[],inner=[],outlinePoints=footprint().getPoints(48),bevelPoints=footprint(.10).getPoints(48);
 for(let i=0;i<outlinePoints.length-1;i++){
  const steps=Math.max(1,Math.ceil(outlinePoints[i].distanceTo(outlinePoints[i+1])/.12));
  for(let j=0;j<steps;j++){
   outer.push(outlinePoints[i].clone().lerp(outlinePoints[i+1],j/steps));
   inner.push(bevelPoints[i].clone().lerp(bevelPoints[i+1],j/steps));
  }
 }
 outer.push(outer[0].clone());inner.push(inner[0].clone());
 const shellMat=bottomFinish.clone();shellMat.side=THREE.DoubleSide;materials.add(shellMat);
 function outlineBand(bevel){
  const v=[],indices=[];
  for(let i=0;i<outer.length;i++){
   const a=outer[i],b=inner[i];
   if(bevel)v.push(b.x,bottomAt(b.y),b.y,a.x,bottomAt(a.y)+.10,a.y);
   else v.push(a.x,bottomAt(a.y)+.10,a.y,a.x,ledgeY,a.y);
  }
  for(let i=0;i<outer.length-1;i++){
   const rear=Math.abs(outer[i].y+5.17)<.00001&&Math.abs(outer[i+1].y+5.17)<.00001;
   if(rear&&!bevel)continue;
   const a=i*2,b=a+1,c=(i+1)*2,d=c+1;indices.push(a,b,c,b,d,c);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setIndex(indices);g.computeVertexNormals();mesh(g,shellMat);
 }
 outlineBand(true);
 // Draft only the shoulder between its two rounded bends. The long recessed
 // wall and the full-width front wall retain their original vertical profile.
 {
  const v=[],indices=[],count=outer.length;
  const levels=[[0,0],[.72,.17],[.82,.205],[.90,.25],[.96,.31],[.99,.375],[1,.44]];
  for(const [height,spread] of levels)for(let i=0;i<count;i++){
   const a=outer[i],prev=outer[(i-1+count-1)%(count-1)],next=outer[(i+1)%(count-1)];
   const dx=next.x-prev.x,dz=next.y-prev.y,len=Math.hypot(dx,dz)||1;
   const shoulder=THREE.MathUtils.smoothstep(a.y,1.15,1.56)*(1-THREE.MathUtils.smoothstep(a.y,2.45,2.86));
   const offset=spread*(1.00/1.55)*shoulder*THREE.MathUtils.smoothstep(14.75-Math.abs(a.x),0,.65);
   const start=bottomAt(a.y)+.10;
   v.push(a.x+dz/len*offset,THREE.MathUtils.lerp(start,ledgeY,height),a.y-dx/len*offset);
  }
  for(let j=0;j<levels.length-1;j++)for(let i=0;i<count-1;i++){
   if(Math.abs(outer[i].y+5.17)<.00001&&Math.abs(outer[i+1].y+5.17)<.00001)continue;
   const a=j*count+i,b=a+1,c=a+count,d=c+1;indices.push(a,c,b,b,c,d);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setIndex(indices);g.computeVertexNormals();mesh(g,shellMat).name='Case walls with shoulder-only slope';
 }
 // Rear wall geometry is cut all the way through; nothing projects beyond the case.
 const rearBottom=bottomAt(-5.17)+.15,rearTop=ledgeY,usbY=-1.08;
 const rearShape=rect(27.46,rearTop-rearBottom,.06,0,(rearTop+rearBottom)/2);hole(rearShape,1.46,.65,.325,0,usbY);
 const rearG=new THREE.ExtrudeGeometry(rearShape,{depth:.43,bevelEnabled:true,bevelThickness:.014,bevelSize:.014,bevelSegments:3,curveSegments:24});const rearWall=mesh(rearG,bottomFinish);rearWall.position.z=-5.155;
 // Drill the recessed screw passages through the intersecting rear-wall solid.
 // Apply the same cylindrical cut to color and shadow passes.
 function drillRear(material){
  material.onBeforeCompile=shader=>{
   shader.vertexShader='varying vec2 drillXZ;\n'+shader.vertexShader;
   shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ndrillXZ=position.xz+vec2(0.0,-5.155);');
   shader.fragmentShader='varying vec2 drillXZ;\n'+shader.fragmentShader;
   const cuts=screwPositions.filter(([,z])=>z<0).map(([x,z])=>`if(distance(drillXZ,vec2(${x.toFixed(3)},${z.toFixed(3)}))<0.205) discard;`).join('\n');
   shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\n'+cuts);
  };
  material.customProgramCacheKey=()=> 'rear-screw-passages';materials.add(material);return material;
 }
 const drilledRear=drillRear(bottomFinish.clone());rearWall.material=drilledRear;
 rearWall.customDepthMaterial=drillRear(new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking}));
 // A shallow, larger pill recess frames the opening within the wall face.
 const rimShape=rect(1.46,.65,.325,0,usbY);hole(rimShape,1.14,.39,.195,0,usbY);const rimG=new THREE.ExtrudeGeometry(rimShape,{depth:.012,bevelEnabled:true,bevelThickness:.018,bevelSize:.025,bevelSegments:4,curveSegments:24});const rim=mesh(rimG,bottomFinish);rim.position.z=-5.118;
 const tunnelShape=rect(1.13,.38,.19,0,usbY);hole(tunnelShape,.86,.23,.115,0,usbY);const tunnelG=new THREE.ExtrudeGeometry(tunnelShape,{depth:.20,bevelEnabled:false,curveSegments:20});const tunnel=mesh(tunnelG,dark);tunnel.position.z=-5.10;
 const portBack=new THREE.Mesh(new THREE.PlaneGeometry(.91,.25),dark);portBack.position.set(0,usbY,-4.85);portBack.rotation.y=Math.PI;assembly.add(portBack);
 // Weight is plain brass, below the bottom face by a small reveal, with no invented engraving.
 sloped(slab(25.48,3.48,.23,0,bottomDatum+.177,-1.90,brass,.15));
 const weightWell=rect(25.62,3.62,.17,0,-1.90);hole(weightWell,25.48,3.48,.15,0,-1.90);sloped(extrude(weightWell,.06,bottomDatum+.10,dark,.003));
 // Recess floors are deeper into the body (+Y); none are rubber feet.
 for(const [x,z] of footPositions){const disc=mesh(new THREE.CylinderGeometry(.366,.366,.018,48),bottomFinish);disc.position.set(x,bottomAt(z)+.080,z);disc.rotation.x=-7*Math.PI/180;const well=new THREE.Mesh(new THREE.CylinderGeometry(.37,.37,.075,48,1,true),bottomFinish);geometries.add(well.geometry);well.material=bottomFinish;well.position.set(x,bottomAt(z)+.042,z);well.rotation.x=-7*Math.PI/180;assembly.add(well);}
 // Screws run along the assembly Y axis, across the seam into the top case.
 // Heads sit deeply inside the unchanged openings in both rows of counterbores.
 const wellMat=dark.clone();wellMat.side=THREE.DoubleSide;materials.add(wellMat);const screwSteel=mat('#aaa9a7',.36,.72);
 for(const [x,z] of screwPositions){
  const group=new THREE.Group();group.name='Vertical case screw';group.position.set(x,bottomAt(z),z);assembly.add(group);
  // Head faces approach the ledge datum, rather than using equal depth
  // from the sloping underside. Keep the front row at least .30 deep.
  const headDepth=Math.max(.30,ledgeY-.04-bottomAt(z));
  const boreStart=-.03,boreEnd=headDepth+.06;
  const bore=mesh(new THREE.CylinderGeometry(.203,.203,boreEnd-boreStart,40,1,true),wellMat,group);bore.position.y=(boreStart+boreEnd)/2;
  const seat=mesh(new THREE.CylinderGeometry(.203,.203,.012,40),dark,group);seat.position.y=headDepth+.042;
  const head=mesh(new THREE.CylinderGeometry(.166,.166,.05,40),screwSteel,group);head.name='Recessed screw head';head.position.y=headDepth+.025;
  for(const rot of [0,Math.PI/2]){const cut=mesh(new THREE.BoxGeometry(.19,.005,.036),dark,group);cut.position.y=headDepth-.002;cut.rotation.y=rot;}
  const shaftStart=headDepth+.05,shaftEnd=.64-bottomAt(z);
  const shaft=mesh(new THREE.CylinderGeometry(.073,.073,shaftEnd-shaftStart,20),screwSteel,group);shaft.name='Shaft through both case halves';shaft.position.y=(shaftStart+shaftEnd)/2;
 }
 const chassis=new THREE.Group();assembly.add(chassis);
 // Internals follow photographed bare plate: brass below, no visible PCB in plate view.
 sloped(slab(25.45,3.45,.08,0,bottomDatum+.34,-1.90,brass,.14,chassis));
 const pcb=slab(27.0,9.1,.10,0,.06,0,pcbMat,.07);
 const plateShape=rect(28.58,9.33,.08);for(const k of keys){hole(plateShape,1.4,1.4,.018,k.x,k.z);if(k.u>=2){const dist=k.u>=6?5.72:(k.u>=2.75?1.9:1.19);for(const side of [-1,1])hole(plateShape,.29,.65,.025,k.x+side*dist,k.z);}}
 for(const x of [-10.4775,10.4775])hole(plateShape,1.87,1.7,.035,x,3.81);
 const plate=extrude(plateShape,.15,.48,plateMat,.006);
 // Local occlusion blocks studio reflections beneath caps while exposed silver
 // remains bright. Real directional shadows still provide the cast-shadow edge.
 const plateAO=document.createElement('canvas');plateAO.width=2048;plateAO.height=1024;
 const ao=plateAO.getContext('2d');ao.fillStyle='white';ao.fillRect(0,0,2048,1024);
 ao.filter='blur(15px)';ao.fillStyle='#303030';
 for(const k of keys){const w=k.widthMM/10+.12,d=1.94;
  ao.fillRect((k.x-w/2+14.5)/29*2048,(k.z-d/2+5)/10*1024,w/29*2048,d/10*1024);
 }
 const occlusion=new THREE.CanvasTexture(plateAO);occlusion.channel=1;
 plateMat.aoMap=occlusion;plateMat.aoMapIntensity=.85;plateMat.envMapIntensity=1.1;
 const platePositions=plate.geometry.attributes.position,plateUV=[];
 for(let i=0;i<platePositions.count;i++)plateUV.push((platePositions.getX(i)+14.5)/29,1-(platePositions.getZ(i)+5)/10);
 plate.geometry.setAttribute('uv1',new THREE.Float32BufferAttribute(plateUV,2));
 const switches=new THREE.Group();assembly.add(switches);const housingG=new THREE.BoxGeometry(1.36,.25,1.36),switchTopG=new THREE.BoxGeometry(1.05,.2,1.05),stemG=new THREE.BoxGeometry(.46,.14,.46);geometries.add(housingG);geometries.add(switchTopG);geometries.add(stemG);
 for(const k of keys){const a=mesh(housingG,switchMat,switches);a.position.set(k.x,.51,k.z);const b=mesh(switchTopG,switchMat,switches);b.position.set(k.x,.69,k.z);const c=mesh(stemG,steel,switches);c.position.set(k.x,.81,k.z);}
 return {setFinish(color){finish.color.set(color);bottomFinish.color.set(color);shellMat.color.set(color);drilledRear.color.set(color);},setView(mode){const open=mode==='chassis';plateMat.aoMapIntensity=mode==='plate'||mode==='internals'?0:.85;upper.visible=mode!=='internals'&&!open;switches.visible=!open&&mode!=='plate';plate.visible=!open;pcb.visible=!open&&mode!=='plate';},dispose(){occlusion.dispose();root.remove(assembly);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
