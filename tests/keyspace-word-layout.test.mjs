import test from 'node:test';
import assert from 'node:assert/strict';
import {createWordLayout,placeWords} from '../public/keyspace/word-layout.js';
test('resizing back to a width restores the exact cast layout',()=>{
 const plan=createWordLayout(4),before=placeWords(900,plan);
 for(const width of [850,600,400,320,650])placeWords(width,plan);
 assert.deepEqual(placeWords(900,plan),before);
});
test('responsive changes preserve slots and idle animation timing',()=>{
 const plan=createWordLayout(4),saved=structuredClone(plan);
 assert.equal(new Set(plan.map(p=>p.slot)).size,4);
 for(const width of [280,400,519,520,800,1200]){
  const positions=placeWords(width,plan);
  positions.forEach((p,i)=>{assert(p.left>=0);assert(p.left+p.width<=width);assert.equal(p.delay,plan[i].delay);});
 }
 assert.deepEqual(plan,saved);
});
test('same width never introduces new randomness',()=>{
 let calls=0;const plan=createWordLayout(4,()=>{calls++;return .4;});const initial=calls;
 for(let i=0;i<100;i++)placeWords(800,plan);
 assert.equal(calls,initial);
});
