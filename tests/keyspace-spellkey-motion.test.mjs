import test from 'node:test';
import assert from 'node:assert/strict';
import {createSpring, createSpellkeyMotion} from '../public/keyspace/spellkey-motion.js';

test('spring interruption preserves position and settles independently of frame rate',()=>{
 const spring=createSpring(0);spring.set(10,0);
 const before=spring.at(.08);spring.set(-5,.08);
 assert.ok(Math.abs(spring.at(.08)-before)<1e-10);
 assert.ok(Math.abs(spring.at(2)+5)<1e-6);
 const other=createSpring(0);other.set(10,0);other.set(-5,.08);
 for(let t=.09;t<2;t+=1/60)other.at(t);
 assert.equal(other.at(2),spring.at(2));
});
test('click squishes then returns to the same resting geometry',()=>{
 const motion=createSpellkeyMotion();motion.click(0);
 const pressed=motion.sample(.25);
 assert.ok(pressed.sx>1.09);assert.ok(pressed.sy<.89);
 const rest=motion.sample(2.5);
 assert.ok(Math.abs(rest.sx-1)<.0001);assert.ok(Math.abs(rest.sy-1)<.0001);
});
test('drag movement is bounded, selects knowing eye, and release suppresses word click',()=>{
 const motion=createSpellkeyMotion();motion.down(0,0,0);motion.move(100000,-100000,.1);
 const held=motion.sample(.5);
 assert.equal(held.mood,2);assert.ok(held.dx<=13.5);assert.ok(held.sy<=1.101);
 assert.equal(motion.up(.6),true);
 const rest=motion.sample(3);
 assert.ok(Math.abs(rest.dx)<.0001);assert.ok(Math.abs(rest.sy-1)<.0001);
 assert.equal(motion.up(3),false);
});
test('all moods are reachable without opening a second eye; pointer gaze stays bounded',()=>{
 const motion=createSpellkeyMotion();assert.equal(motion.sample(0).mood,0);
 motion.enter(0);motion.follow(1e6,-1e6,0);
 assert.equal(motion.sample(.5).mood,1);assert.ok(Math.abs(motion.sample(.5).gaze)<=10.01);
 motion.react('shrugging',.5);assert.equal(motion.sample(1).mood,2);
 motion.leave(1);assert.equal(motion.sample(4).mood,0);
});
test('reduced motion and inactive page cancel dragging and return spatial movement to rest',()=>{
 const motion=createSpellkeyMotion();motion.down(0,0,0);motion.move(200,-120,.1);
 motion.setReduced(true,.2);let pose=motion.sample(.3);
 assert.deepEqual([pose.dx,pose.sx,pose.sy,pose.tilt,pose.zoom,pose.gaze,pose.blink],[0,1,1,0,1,0,0]);
 assert.equal(motion.up(.4),false);
 motion.setReduced(false,.5);motion.click(.6);motion.setActive(false,.7);
 pose=motion.sample(10.25);assert.deepEqual([pose.sx,pose.sy,pose.blink],[1,1,0]);
 motion.setActive(true,20);assert.equal(motion.sample(20).mood,0);
});
test('slow blink closes once at the approved 10 second beat and opens within half a second',()=>{
 const motion=createSpellkeyMotion();assert.equal(motion.sample(9.9).blink,0);
 assert.equal(motion.sample(10.25).blink,1);assert.equal(motion.sample(10.5).blink,0);
 assert.equal(motion.sample(24.25).blink,1);
});
