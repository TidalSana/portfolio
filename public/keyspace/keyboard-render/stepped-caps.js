import {steppedCAD as d} from './assets/stepped-cad.js';
// Dedicated R3 1.75u stepped community CAD by endeavoursc (MIT).
// Imported shape is preserved: only centering, axis rotation and mm-to-scene scaling.
export function createSteppedCaps(THREE){
 const body=new THREE.BufferGeometry();
 body.setAttribute('position',new THREE.Float32BufferAttribute(d.position,3));
 body.setAttribute('normal',new THREE.Float32BufferAttribute(d.normal,3));
 body.setAttribute('uv',new THREE.Float32BufferAttribute(d.uv,2));
 body.setIndex(d.index);body.computeBoundingBox();body.computeBoundingSphere();
 const top=body.clone();top.setIndex(d.topIndex);top.translate(0,.003,0);
 return {body,top,width:d.width};
}
