export function initKeyboardGallery(story){
 const links=[...story.querySelectorAll('[data-keyboard-photo]')];
 if(!links.length)return;
 const dialog=document.createElement('dialog');dialog.className='keyboard-lightbox';dialog.setAttribute('aria-label',links[0].dataset.keyboardPhoto==='ExtrasOnly'?'ExtrasOnly screenshot':'Keyboard photograph');
 dialog.innerHTML='<button type="button" class="photo-close" aria-label="Close photograph">Close <span aria-hidden="true">×</span></button><img alt=""><p></p>';
 story.append(dialog);
 const image=dialog.querySelector('img'),caption=dialog.querySelector('p');
 links.forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();const thumbnail=link.querySelector('img');image.src=link.href;image.alt=thumbnail.alt;caption.textContent=link.dataset.keyboardPhoto;dialog.showModal();
 }));
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
 // Escape belongs to the photograph, not the page-level return-home shortcut.
 dialog.addEventListener('keydown',event=>event.stopPropagation());
}
