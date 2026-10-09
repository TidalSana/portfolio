export const sectionKeys = Object.freeze({1:'work',2:'projects',3:'josh',4:'keyboards'});
export function shortcutDestination(key,current){
 const id=Object.hasOwn(sectionKeys,key)?sectionKeys[key]:null;
 return id ? (id===current?'home':id) : null;
}
export function sectionKey(id){return Object.keys(sectionKeys).find(key=>sectionKeys[key]===id);}
export function layoutDelta(before,after){
 if(!before.width||!before.height||!after.width||!after.height)return null;
 return {x:before.left-after.left,y:before.top-after.top,sx:before.width/after.width,sy:before.height/after.height};
}
