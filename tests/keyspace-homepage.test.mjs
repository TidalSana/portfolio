import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {destinations} from '../public/keyspace/destinations.js';
const require=createRequire(import.meta.url);
test('root rewrite takes priority over the legacy homepage',async()=>{
 const rules=await require('../next.config.js').rewrites();
 assert.deepEqual(rules.beforeFiles,[{source:'/',destination:'/keyspace/index.html'}]);
});
test('document assets resolve identically from root and checkpoint URL',async()=>{
 const html=await readFile(new URL('../public/keyspace/index.html',import.meta.url),'utf8');
 const refs=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]);
 assert(refs.length>=5);
 for(const ref of refs){
  assert.equal(new URL(ref,'https://example.com/').href,new URL(ref,'https://example.com/keyspace/index.html').href);
  assert(ref.startsWith('/keyspace/'));
 }
});
test('destination photos resolve beside the module rather than the document',()=>{
 for(const id of ['josh','keyboards']){
  const src=destinations[id].match(/src="([^"]+)"/)[1];
  assert(src.startsWith(new URL('../public/keyspace/assets/',import.meta.url).href));
 }
});
