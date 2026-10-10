export function initGreetingNote(story){
 const note=story.querySelector('.greeting-note');
 if(!note)return;
 const trigger=note.querySelector('button'),panel=note.querySelector('.greeting-popover');
 let closeTimer;
 function setOpen(open){
  clearTimeout(closeTimer);
  trigger.setAttribute('aria-expanded',String(open));
  panel.inert=!open;
 }
 note.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')setOpen(true)});
 note.addEventListener('pointerleave',()=>{closeTimer=setTimeout(()=>{if(!note.contains(document.activeElement))setOpen(false)},160)});
 trigger.addEventListener('focus',()=>setOpen(true));
 trigger.addEventListener('click',()=>setOpen(true));
 note.addEventListener('focusout',event=>{if(!note.contains(event.relatedTarget))setOpen(false)});
 note.addEventListener('keydown',event=>{
  if(event.key!=='Escape'||trigger.getAttribute('aria-expanded')!=='true')return;
  event.preventDefault();event.stopPropagation();trigger.focus();setOpen(false);
 });
 note.closest('.personal-note').addEventListener('pointerdown',event=>{if(!note.contains(event.target))setOpen(false)});
 setOpen(false);
}
