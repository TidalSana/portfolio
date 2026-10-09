import test from 'node:test';
import assert from 'node:assert/strict';
import {shortcutDestination,sectionKey,layoutDelta} from '../public/keyspace/section-navigation.js';
test('number keys open, switch, and toggle each destination back home',()=>{
 for(const [key,id] of [['1','work'],['2','projects'],['3','josh'],['4','keyboards']]){
  assert.equal(shortcutDestination(key,'home'),id);
  assert.equal(shortcutDestination(key,id),'home');
  assert.equal(sectionKey(id),key);
 }
 assert.equal(shortcutDestination('2','work'),'projects');
});
test('word typing and unrelated keys remain available',()=>{
 for(const key of ['w','m','Enter','Escape','0','5',''])assert.equal(shortcutDestination(key,'work'),null);
});
test('layout continuity maps the new rectangle to the old, including interrupted positions',()=>{
 const old={left:17.5,top:42,width:900,height:480},next={left:50,top:120,width:300,height:240};
 assert.deepEqual(layoutDelta(old,next),{x:-32.5,y:-78,sx:3,sy:2});
 assert.equal(layoutDelta(old,{...next,width:0}),null);
});
