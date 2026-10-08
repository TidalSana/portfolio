// A lifted key retains its resting hit area while its visible geometry moves.
export function hitsRestingKey(ray,key,restY=.83){
 if(!key)return false;
 const currentY=key.position.y;
 try{
  key.position.y=restY;
  key.updateWorldMatrix(true,true);
  return ray.intersectObject(key,true).length>0;
 }finally{
  key.position.y=currentY;
  key.updateWorldMatrix(true,true);
 }
}
