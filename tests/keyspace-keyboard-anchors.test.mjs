import test from 'node:test';
import assert from 'node:assert/strict';
import {anchorStyle} from '../public/keyspace/keyboard-anchors.js';
test('projected anchor stays centered relative to the iframe and nav offsets',()=>{
 const style=anchorStyle({p:[.5,.25],x:[.51,.25],z:[.5,.27]},
  {left:50,top:100,width:1000,height:500},{left:100,top:120},100,40);
 assert.equal(style.left,400);assert.equal(style.top,85);
});
test('plane matrix includes rotation and skew rather than facing the camera',()=>{
 const style=anchorStyle({p:[0,0],x:[.01,-.02],z:[.03,.01]},
  {left:0,top:0,width:100,height:100},{left:0,top:0},0,0);
 assert.equal(style.matrix,'matrix(1,-2,3,1,0,0)');
});
