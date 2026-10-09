import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../public/keyspace/keyboard-render/assets/three.module.js';
import {hitsRestingKey} from '../public/keyspace/keyboard-render/stable-key-hit.js';

test('Escape retains its resting hover area throughout the lift without moving the rendered key',()=>{
 const cap=new THREE.Group();cap.add(new THREE.Mesh(new THREE.BoxGeometry(.4,.2,.4),new THREE.MeshBasicMaterial()));
 const ray=new THREE.Raycaster(new THREE.Vector3(0,.83,3),new THREE.Vector3(0,0,-1));
 for(const height of [.83,1.1,1.35]){
  cap.position.y=height;cap.updateWorldMatrix(true,true);
  assert.equal(hitsRestingKey(ray,cap),true);
  assert.equal(cap.position.y,height);
  assert.equal(cap.children[0].matrixWorld.elements[13],height);
 }
 ray.ray.origin.x=2;
 assert.equal(hitsRestingKey(ray,cap),false);
});

// The bridge owns studio loading, preventing separately versioned duplicate scenes.
test('embedded keyboard has one renderer entry point',async()=>{
 const {readFile}=await import('node:fs/promises');
 const html=await readFile(new URL('../public/keyspace/keyboard-render/embed.html',import.meta.url),'utf8');
 assert.equal((html.match(/<script type="module"/g)||[]).length,1);
 assert.match(html,/portfolio-bridge\.js/);
});
