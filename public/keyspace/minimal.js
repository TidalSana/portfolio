import {initGreetingNote} from './greeting-note.js';
import {initKeyboardGallery} from './keyboard-gallery.js?v=project-story';
import {initNameplate} from './nameplate.js?v=independent-shuffle';
import {initPortraitInk} from './portrait-ink.js?v=signature';
import {icon} from './icons.js';
import {initMagneticNavigation} from './magnetic-navigation.js?v=soft-tabs';
import {shortcutDestination,sectionKey,layoutDelta} from './section-navigation.js';
import {wordPrefix,completeWord} from './word-matching.js';
import {performer,initPerformer} from './spellkey-performer.js?v=quiet-arrival';
import {mountScene} from './render-adapter.js?v=quiet-arrival';
import {destinations} from './destinations.js?v=mt-nyc-location';
const app=document.querySelector('#app');
const stops=[['work','Work','work'],['projects','Projects','projects'],['josh','Me','me'],['keyboards','Keyboards','keyboards']];
app.innerHTML=`<a class="skip" href="#spell-navigation">Skip to navigation</a><header><div class="header-identity">${performer}<a class="identity" href="#home" aria-label="Joshua Semana, home"><span class="identity-name" aria-hidden="true">${[...'Joshua Semana'].map((letter,i)=>`<span class="identity-letter" style="--letter:${i}">${letter===' '?'&nbsp;':letter}</span>`).join('')}</span></a></div></header><main id="content" class="travel"><section class="destination-bar" aria-label="Explore the portfolio"><form id="travel-form"><label for="destination">What would you like to explore?</label><div class="type-line"><input id="destination" name="destination" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder=" " aria-describedby="travel-feedback"><span class="typing-suggestion" aria-hidden="true"><span class="suggested-word">work</span></span><button type="submit" aria-label="Go to destination">${icon('corner-down-left')}</button></div></form><p id="travel-feedback" role="status">Type a name + Enter, or choose a word.</p></section><div class="board-stage"><div id="key-scene"></div><nav id="spell-navigation" tabindex="-1" class="spell-nav" aria-label="Destinations">${stops.map(([id,label,word])=>`<button type="button" aria-label="${label}" data-go="${id}" data-word="${word}" aria-keyshortcuts="${sectionKey(id)}"><span><em class="word-idle">${label}</em></span></button>`).join('')}</nav><button class="set-hint" aria-expanded="false" aria-controls="set-detail">About this set</button><aside id="set-detail" class="set-detail" hidden aria-label="About this keycap set"><button class="set-close" aria-label="Close keycap details">${icon('x')}</button><h2>GMK CYL Rubrehose</h2><a href="https://oblotzky.industries/products/gmk-cyl-rubrehose" target="_blank" rel="noreferrer">View set ${icon('arrow-up-right')}</a></aside></div><section id="story" class="story" hidden aria-label="Portfolio content"></section></main>`;

const input=document.querySelector('#destination'),story=document.querySelector('#story'),feedback=document.querySelector('#travel-feedback');
const scene=mountScene(document.querySelector('#key-scene'),{onKey:key=>handleKey(key)});
function openDestination(raw){if(app.inert)return;const word=raw.trim().toLowerCase(),id=word==='me'?'josh':word;if(id==='home'||id==='escape'){location.hash='home';return}if(!Object.hasOwn(destinations,id)){window.dispatchEvent(new CustomEvent('spellkey-reaction',{detail:'shrugging'}));feedback.textContent='Try work, projects, me, or keyboards.';input.setAttribute('aria-invalid','true');return}input.removeAttribute('aria-invalid');location.hash=id;}
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
// Keep opening responsive; returning home gets a slower, layered release.
const sectionTiming={duration:180,easing:'cubic-bezier(.16,1,.3,1)'};
const sectionNav=document.querySelector('.spell-nav');
// Only the desktop layout is a sheet; mobile keeps its normal page navigation.
let outsidePress=false;
function outsideSheet(target){
 return !app.inert&&!story.hidden&&matchMedia('(min-width:801px)').matches
  &&!target.closest('#story,.spell-nav,dialog');
}
document.addEventListener('pointerdown',event=>{outsidePress=event.button===0&&outsideSheet(event.target);});
document.addEventListener('pointercancel',()=>{outsidePress=false;});
document.addEventListener('click',event=>{
 const dismiss=outsidePress&&event.detail>0&&outsideSheet(event.target);
 outsidePress=false;
 if(dismiss)openDestination('home');
});
let navigationVersion=0,sectionAnimations=[],hasShown=false;
const anchors=[document.querySelector('#key-scene'),...document.querySelectorAll('[data-go]')];
function stopSectionAnimations(){sectionAnimations.forEach(a=>a.cancel());sectionAnimations=[];}
function sectionAnimate(el,frames,options){const a=el.animate(frames,{fill:'both',...options});sectionAnimations.push(a);return a;}
async function show(){
 const version=++navigationVersion,id=location.hash.slice(1),active=Object.hasOwn(destinations,id);
 const animate=hasShown&&!motionPreference.matches,wasVisiting=!story.hidden;
 const desktopSheet=matchMedia('(min-width:801px)').matches;
 const returning=desktopSheet&&wasVisiting&&!active;
 const switching=animate&&desktopSheet&&wasVisiting&&active;
 window.dispatchEvent(new Event('section-transition-start'));
 hasShown=true;
 const currentOpacity=getComputedStyle(story).opacity;
 const previousHeight=story.getBoundingClientRect().height;
 // Keep the real outgoing nodes in their original layout until they disappear.
 const previousContent=[...story.children].filter(el=>!el.matches('.back,dialog')).map(el=>({el,opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform}));
 const sceneStyle=getComputedStyle(anchors[0]);
 const previousScene={filter:sceneStyle.filter,opacity:sceneStyle.opacity};
 const previousRects=anchors.map(el=>el.getBoundingClientRect());
 stopSectionAnimations();
 story.style.removeProperty('height');
 if(switching||(animate&&wasVisiting&&!active))story.style.height=`${previousHeight}px`;
 document.querySelectorAll('[data-go]').forEach(b=>{if(b.dataset.go===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 input.value='';matchWords();
 document.title=active?`${id[0].toUpperCase()+id.slice(1)} — Joshua Semana`:'Joshua Semana';
 if(switching){
  story.inert=true;
  const exits=previousContent.map(({el,opacity,transform})=>sectionAnimate(el,[{opacity,transform},{opacity:0,transform:'translateY(-4px)'}],{duration:120,easing:'cubic-bezier(.4,0,1,1)'}));
  await Promise.allSettled(exits.map(animation=>animation.finished));
  if(version!==navigationVersion)return;
 }
 // Fade the old content before replacing it; rapid navigation invalidates earlier work.
 if(animate&&wasVisiting&&!switching){
  story.inert=true;
  const exitFrames=[{opacity:currentOpacity,transform:'translateY(0)'},{opacity:0,transform:active?'translateY(-5px)':'translateY(8px)'}];
  const exitTiming={duration:returning?140:60,easing:'cubic-bezier(.4,0,1,1)'};
  const exit=sectionAnimate(story,exitFrames,exitTiming);
  if(returning)sectionAnimate(sectionNav,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(8px)'}],exitTiming);
  await exit.finished.catch(()=>{});if(version!==navigationVersion)return;
 }
 stopSectionAnimations();
 story.style.removeProperty('height');
 document.body.classList.toggle('visiting',active);
 for (const section of ['work','projects','keyboards']) document.body.classList.toggle(`viewing-${section}`,active && id===section);
 story.hidden=!active;story.inert=false;
 story.innerHTML=active?`<a class="back" href="#home" aria-label="Back to the keyboard" aria-keyshortcuts="Escape" title="Back to the keyboard · press Escape">${icon('arrow-left')}Back<kbd class="section-key">Esc</kbd></a>${destinations[id]}`:'';
 initPortraitInk(story);
 initGreetingNote(story);
 initKeyboardGallery(story);
 story.scrollTop=0;
 window.scrollTo({top:0,behavior:'instant'});
 window.dispatchEvent(new Event('section-layout'));
 feedback.textContent=active?'Press Escape to return, or choose another section.':'Type a name, or choose a word. Keys 1–4 open sections.';
 if(switching){
  const nextHeight=story.getBoundingClientRect().height;
  const shrinking=nextHeight<previousHeight;
  const resizeFrames=[{height:`${previousHeight}px`},{height:`${nextHeight}px`}];
  const resizeTiming={duration:300,easing:shrinking?'cubic-bezier(.4,0,.2,1)':'cubic-bezier(.22,1,.36,1)'};
  sectionAnimate(story,resizeFrames,resizeTiming);

 }
 if(animate&&!switching){
  // Read every destination rectangle before animation writes force another layout.
  const nextRects=anchors.map(el=>el.getBoundingClientRect());
  const nextSceneStyle=getComputedStyle(anchors[0]);
  const nextScene={filter:nextSceneStyle.filter,opacity:nextSceneStyle.opacity};
  anchors.forEach((el,i)=>{
   // The desktop tabs enter with their sheet, rather than flying across its header.
   if(desktopSheet&&active&&i>0)return;
   const delta=layoutDelta(previousRects[i],nextRects[i]);if(!delta)return;
   const frames=i===0?[{transform:`translate(${delta.x}px,${delta.y}px) scale(${delta.sx},${delta.sy})`},{transform:'none'}]:[{translate:`${delta.x}px ${delta.y}px`},{translate:'0px 0px'}];
   if(desktopSheet&&i===0){
    Object.assign(frames[0],previousScene);
    Object.assign(frames[1],nextScene);
   }
   if(returning){
    if(i>0){
     frames[0].opacity=0;
     frames[1].opacity=1;
    }
    // Reveal the keyboard first; the labels follow and settle without a bounce.
    sectionAnimate(el,frames,{duration:i===0?280:220,delay:i===0?0:60,easing:'cubic-bezier(.22,1,.36,1)'});
   }else sectionAnimate(el,frames,sectionTiming);
  });
 }
 if(active){
  const heading=story.querySelector('h1');heading.tabIndex=-1;heading.focus({preventScroll:true});
  if(animate){
   const frames=[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}];
   // Animate the surface itself so its background and contents arrive together.
   if(switching){
    [...story.children].filter(el=>!el.matches('.back,dialog')).forEach(el=>sectionAnimate(el,[{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:200,delay:40,easing:'cubic-bezier(.16,1,.3,1)'}));
   }else sectionAnimate(story,frames,sectionTiming);
   if(desktopSheet&&!wasVisiting)sectionAnimate(sectionNav,frames,sectionTiming);
  }
 }else if(wasVisiting){document.querySelector('.spellkey-button').focus({preventScroll:true});}
 Promise.allSettled(sectionAnimations.map(a=>a.finished)).then(()=>{if(version===navigationVersion){stopSectionAnimations();window.dispatchEvent(new Event('section-transition-end'));}});
}
motionPreference.addEventListener('change',()=>{if(motionPreference.matches){stopSectionAnimations();show();}});
function clearTyping(){input.value='';input.removeAttribute('aria-invalid');matchWords();}
function handleKey(key){
 if(app.inert)return;
 scene.press(key);
 const destination=shortcutDestination(key,location.hash.slice(1));
 if(destination){clearTyping();location.hash=destination;return;}
 if(key==='Escape'){clearTyping();location.hash='home';input.blur();return;}
 if(key==='Enter'){if(completeWord(input.value))openDestination(input.value);return;}
 if(key==='Backspace'){input.value=input.value.slice(0,-1);matchWords();return;}
 if(key.length===1){input.value=wordPrefix(input.value+key);input.removeAttribute('aria-invalid');matchWords();}
}
document.querySelector('#travel-form').onsubmit=e=>{e.preventDefault();handleKey('Enter')};
input.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();handleKey('Escape')}else scene.press(e.key)});
function attend(button){const i=[...document.querySelectorAll('[data-go]')].indexOf(button);document.querySelector('.spellkey-button').style.setProperty('--look',button?`${2+i*2}px`:'0px');}
function matchWords(){
 document.querySelector('.type-line').classList.toggle('has-value',!!input.value);
 const typed=input.value.trim().toLowerCase(),buttons=[...document.querySelectorAll('[data-word]')];
 const match=typed?buttons.find(b=>b.dataset.word.startsWith(typed)):null;
 if(typed)window.dispatchEvent(new CustomEvent('spellkey-reaction',{detail:match?'thinking':'shrugging'}));
 const selected=match||buttons.find(b=>b.dataset.word===input.dataset.suggestion)||buttons[0];
 buttons.forEach(b=>{
  b.classList.toggle('matching',b===match);
  b.classList.toggle('complete',b===match&&completeWord(typed));
  const label=b.getAttribute('aria-label'),text=b.querySelector('.word-idle');
  text.replaceChildren();
  if(b!==selected){text.textContent=label;return;}
  const offset=b===match?Math.min(typed.length,label.length):0;
  const caret=document.createElement('i');caret.className='destination-caret';caret.setAttribute('aria-hidden','true');
  const progress=document.createElement('strong');progress.className='typed-letters';progress.textContent=label.slice(0,offset);
  text.append(progress,caret,document.createTextNode(label.slice(offset)));
  if(b===match&&completeWord(typed)){const cue=document.createElement('small');cue.className='enter-cue';cue.innerHTML=icon('corner-down-left');cue.setAttribute('aria-hidden','true');text.append(cue);}
 });
 feedback.textContent=completeWord(typed)?`${match.getAttribute('aria-label')} ready. Press Enter to open.`:typed?`Typing ${match.getAttribute('aria-label')}.`:'Type a name, or choose a word.';
 attend(match);
}
window.addEventListener('spellkey-suggestion',matchWords);
input.addEventListener('input',()=>{input.value=wordPrefix(input.value);matchWords();input.removeAttribute('aria-invalid');});
document.querySelectorAll('[data-go]').forEach(b=>{b.onclick=()=>openDestination(location.hash.slice(1)===b.dataset.go?'home':b.dataset.go);b.onpointerenter=b.onfocus=()=>attend(b);b.onpointerleave=b.onblur=()=>attend(document.querySelector('[data-word].matching'));});
window.addEventListener('keydown',e=>{
 if(app.inert)return;
 if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;
 if(e.key==='Escape'){e.preventDefault();handleKey('Escape');return;}
 if(e.target.closest('input,textarea,select')||e.target.isContentEditable)return;
 // Tab-focused links/buttons retain native activation when no word is being typed.
 if(e.target.closest('button,a')&&['Enter',' '].includes(e.key)&&!input.value)return;
 if(e.key.length===1||['Enter','Backspace'].includes(e.key)){e.preventDefault();handleKey(e.key);}
});
window.addEventListener('hashchange',show);show();


initPerformer();
initNameplate(document.querySelector('.identity'),app);
initMagneticNavigation(document.querySelector('.spell-nav'));


// Escape remains a key. Pointer curiosity opens a small, traversable preview.
const setHint=document.querySelector('.set-hint'),setDetail=document.querySelector('#set-detail');
setHint.innerHTML='About this set';
let revealTimer,hideTimer,cueTimer;
const atHome=()=>!app.inert&&!document.body.classList.contains('visiting');
function closeSetDetail(){clearTimeout(revealTimer);clearTimeout(hideTimer);clearTimeout(cueTimer);setDetail.hidden=true;setHint.setAttribute('aria-expanded','false');scene.hintSet(false);}
function revealSet(){if(!atHome()||document.hidden)return;setDetail.hidden=false;setHint.setAttribute('aria-expanded','true');}
function deferClose(){clearTimeout(revealTimer);clearTimeout(hideTimer);hideTimer=setTimeout(()=>{if(!setDetail.matches(':hover')&&!setDetail.contains(document.activeElement))closeSetDetail();},450);}
window.addEventListener('keyboard-set-preview',e=>{
 if(!atHome())return;
 const {active,x,y}=e.detail;
 clearTimeout(revealTimer);clearTimeout(hideTimer);
 if(!active){deferClose();return;}
 if(!setDetail.hidden)return;
 const stage=document.querySelector('.board-stage').getBoundingClientRect();
 const frame=document.querySelector('.keyboard-render').getBoundingClientRect();
 const left=Math.max(12,Math.min(frame.left-stage.left+x-35,stage.width-250));
 setDetail.style.left=left+'px';setDetail.style.top=(frame.top-stage.top+y+18)+'px';
 revealTimer=setTimeout(()=>{scene.hintSet(true);revealSet();},300);
});
setDetail.addEventListener('pointerenter',()=>clearTimeout(hideTimer));
setDetail.addEventListener('pointerleave',deferClose);
setDetail.addEventListener('focusin',()=>clearTimeout(hideTimer));
setDetail.addEventListener('focusout',e=>{if(!setDetail.contains(e.relatedTarget))deferClose();});
setHint.addEventListener('click',()=>{if(!setDetail.hidden){closeSetDetail();return;}setDetail.style.left='';setDetail.style.top='';revealSet();setDetail.querySelector('a').focus();});
setDetail.querySelector('button').addEventListener('click',()=>{closeSetDetail();setHint.focus();});
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeSetDetail();},true);
window.addEventListener('keyboard-set-dismiss',closeSetDetail);
window.addEventListener('hashchange',closeSetDetail);
window.addEventListener('blur',()=>{if(!document.hasFocus())closeSetDetail();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)closeSetDetail();});
let sectionMoving=false;
function syncSetIdle(){scene.idleSet(atHome()&&!document.hidden&&!sectionMoving);}
window.addEventListener('section-transition-start',()=>{sectionMoving=true;syncSetIdle();});
window.addEventListener('section-transition-end',()=>{sectionMoving=false;syncSetIdle();});
window.addEventListener('keyboard-loader-complete',syncSetIdle);
window.addEventListener('keyboard-set-cue',syncSetIdle);
document.addEventListener('visibilitychange',syncSetIdle);
