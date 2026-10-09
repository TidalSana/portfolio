import test from 'node:test';
import assert from 'node:assert/strict';
import {edgeAmount} from '../public/keyspace/edge-peek.js';
test('camera stays centered in the middle 70 percent of the viewport',()=>{
 for(const x of [150,300,500,700,850])assert.equal(edgeAmount(x,1000),0);
});
test('edge peek ramps symmetrically and remains bounded outside the viewport',()=>{
 assert.equal(edgeAmount(0,1000),-1);assert.equal(edgeAmount(1000,1000),1);
 assert.equal(edgeAmount(-50,1000),-1);assert.equal(edgeAmount(1050,1000),1);
 assert(Math.abs(edgeAmount(75,1000)+edgeAmount(925,1000))<1e-10);
 assert(edgeAmount(900,1000)>0&&edgeAmount(900,1000)<edgeAmount(950,1000));
});
test('missing dimensions and invalid coordinates leave camera centered',()=>{
 assert.equal(edgeAmount(NaN,1000),0);assert.equal(edgeAmount(20,0),0);
});
