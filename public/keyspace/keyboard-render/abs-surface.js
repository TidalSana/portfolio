// Object-space mould grain keeps the same physical size on every key,
// including long modifiers and the spacebar. Legends share the same surface.
export function applyAbsSurface(material,{legend=false}={}){
 material.roughness=.48;
 material.onBeforeCompile=shader=>{
  shader.vertexShader=shader.vertexShader.replace('#include <common>',`#include <common>
   varying vec3 vAbsPosition;`)
   .replace('#include <begin_vertex>',`#include <begin_vertex>
   vAbsPosition=position-vec3(0.0,${legend?'0.003':'0.0'},0.0);`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
   varying vec3 vAbsPosition;
   float absHash(vec3 p){p=fract(p*.3183099+vec3(.13,.27,.41));p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
   float absNoise(vec3 p){
    vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
    return mix(mix(mix(absHash(i),absHash(i+vec3(1,0,0)),f.x),mix(absHash(i+vec3(0,1,0)),absHash(i+vec3(1,1,0)),f.x),f.y),
     mix(mix(absHash(i+vec3(0,0,1)),absHash(i+vec3(1,0,1)),f.x),mix(absHash(i+vec3(0,1,1)),absHash(i+vec3(1,1,1)),f.x),f.y),f.z);
   }`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`
   // Fade subpixel grain to prevent sparkle in the full-board view.
   float footprint=max(length(dFdx(vAbsPosition)),length(dFdy(vAbsPosition)));
   float grainFade=1.0-smoothstep(.025,.08,footprint);
   float grainHeight=(absNoise(vAbsPosition*65.0)*.75+absNoise(vAbsPosition*130.0)*.25)*.0035*grainFade;
   normal=perturbNormalArb(-vViewPosition,normal,vec2(dFdx(grainHeight)/max(length(dFdx(vAbsPosition)),.0001),dFdy(grainHeight)/max(length(dFdy(vAbsPosition)),.0001)),faceDirection);
  `);
 };
 material.customProgramCacheKey=()=>legend?'abs-grain-legend-v1':'abs-grain-body-v1';
}
