import {shortcutDestination,sectionKey,layoutDelta} from './section-navigation.js';
import {wordPrefix,completeWord} from './word-matching.js';
import {performer,initPerformer} from './spellkey-performer.js?v=one-eye-motion2';
import {mountScene} from './render-adapter.js?v=no-cable';
import {destinations} from './destinations.js?v=me-location';
const app=document.querySelector('#app');
const stops=[['work','Work','work'],['projects','Projects','projects'],['josh','Me','me'],['keyboards','Keyboards','keyboards']];
app.innerHTML=`<a class="skip" href="#spell-navigation">Skip to navigation</a><header><div class="header-identity">${performer}<a class="identity" href="#home" aria-label="Joshua Semana, home"><span>Joshua Semana</span></a></div></header><main id="content" class="travel"><section class="destination-bar" aria-label="Explore the portfolio"><form id="travel-form"><label for="destination">What would you like to explore?</label><div class="type-line"><input id="destination" name="destination" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder=" " aria-describedby="travel-feedback"><span class="typing-suggestion" aria-hidden="true"><span class="suggested-word">work</span></span><button type="submit" aria-label="Go to destination">↵</button></div></form><p id="travel-feedback" role="status">Type a name + Enter, or choose a word.</p></section><div class="board-stage"><div id="key-scene"></div><nav id="spell-navigation" tabindex="-1" class="spell-nav" aria-label="Destinations">${stops.map(([id,label,word])=>`<button type="button" aria-label="${label}" data-go="${id}" data-word="${word}" aria-keyshortcuts="${sectionKey(id)}"><span><em class="word-idle">${label}</em><kbd class="section-key" aria-hidden="true">${sectionKey(id)}</kbd></span></button>`).join('')}</nav><button class="set-hint" aria-expanded="false" aria-controls="set-detail">GMK Rubrehose <span aria-hidden="true">+</span></button><aside id="set-detail" class="set-detail" hidden aria-label="About this keycap set"><button class="set-close" aria-label="Close keycap details">×</button><h2>GMK CYL Rubrehose</h2><a href="https://oblotzky.industries/products/gmk-cyl-rubrehose" target="_blank" rel="noreferrer">View set ↗</a></aside></div><section id="story" class="story" hidden aria-label="Portfolio content"></section></main>`;

const input=document.querySelector('#destination'),story=document.querySelector('#story'),feedback=document.querySelector('#travel-feedback');
const scene=mountScene(document.querySelector('#key-scene'),{onKey:key=>handleKey(key)});
function openDestination(raw){const word=raw.trim().toLowerCase(),id=word==='me'?'josh':word;if(id==='home'||id==='escape'){location.hash='home';return}if(!Object.hasOwn(destinations,id)){window.dispatchEvent(new CustomEvent('spellkey-reaction',{detail:'shrugging'}));feedback.textContent='Try work, projects, me, or keyboards.';input.setAttribute('aria-invalid','true');return}input.removeAttribute('aria-invalid');scene.press('Enter');location.hash=id;}
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let navigationVersion=0,sectionAnimations=[],hasShown=false;
const anchors=[document.querySelector('#key-scene'),...document.querySelectorAll('[data-go]')];
function stopSectionAnimations(){sectionAnimations.forEach(a=>a.cancel());sectionAnimations=[];}
function sectionAnimate(el,frames,options){const a=el.animate(frames,{fill:'both',...options});sectionAnimations.push(a);return a;}
async function show(){
 const version=++navigationVersion,id=location.hash.slice(1),active=Object.hasOwn(destinations,id);
 const animate=hasShown&&!motionPreference.matches,wasVisiting=!story.hidden;
 hasShown=true;
 const currentOpacity=getComputedStyle(story).opacity;
 const previousRects=anchors.map(el=>el.getBoundingClientRect());
 stopSectionAnimations();
 document.querySelectorAll('[data-go]').forEach(b=>{if(b.dataset.go===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 input.value='';matchWords();
 document.title=active?`${id[0].toUpperCase()+id.slice(1)} — Joshua Semana`:'Joshua Semana';
 // Fade the old content before replacing it; rapid navigation invalidates earlier work.
 if(animate&&wasVisiting){
  story.inert=true;
  const exit=sectionAnimate(story,[{opacity:currentOpacity,transform:'translateY(0)'},{opacity:0,transform:'translateY(-5px)'}],{duration:100,easing:'ease-out'});
  await exit.finished.catch(()=>{});if(version!==navigationVersion)return;
 }
 stopSectionAnimations();
 document.body.classList.toggle('visiting',active);
 story.hidden=!active;story.inert=false;
 story.innerHTML=active?`<a class="back" href="#home" aria-label="Back to the keyboard" aria-keyshortcuts="${sectionKey(id)}" title="Back to the keyboard · press ${sectionKey(id)}"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M7 3 2 8l5 5M2 8h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>Back<kbd class="section-key">${sectionKey(id)}</kbd></a>${destinations[id]}`:'';
 story.scrollTop=0;
 window.scrollTo({top:0,behavior:'instant'});
 window.dispatchEvent(new Event('section-layout'));
 feedback.textContent=active?`Press ${sectionKey(id)} to return, or choose another section.`:'Type a name, or choose a word. Keys 1–4 open sections.';
 if(animate){
  anchors.forEach((el,i)=>{
   const delta=layoutDelta(previousRects[i],el.getBoundingClientRect());if(!delta)return;
   const frames=i===0?[{transform:`translate(${delta.x}px,${delta.y}px) scale(${delta.sx},${delta.sy})`},{transform:'none'}]:[{translate:`${delta.x}px ${delta.y}px`},{translate:'0px 0px'}];
   sectionAnimate(el,frames,{duration:360,easing:'cubic-bezier(.16,1,.3,1)'});
  });
 }
 if(active){
  const heading=story.querySelector('h1');heading.tabIndex=-1;heading.focus({preventScroll:true});
  if(animate){
   const elements=[...story.children];
   elements.forEach((el,i)=>sectionAnimate(el,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,delay:Math.min(i*24,96),easing:'cubic-bezier(.16,1,.3,1)'}));

  }
 }else if(wasVisiting){document.querySelector('.spellkey-button').focus({preventScroll:true});}
 Promise.allSettled(sectionAnimations.map(a=>a.finished)).then(()=>{if(version===navigationVersion)stopSectionAnimations();});
}
motionPreference.addEventListener('change',()=>{if(motionPreference.matches){stopSectionAnimations();show();}});
function clearTyping(){input.value='';input.removeAttribute('aria-invalid');matchWords();}
function handleKey(key){
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
  if(b===match&&completeWord(typed)){const cue=document.createElement('small');cue.className='enter-cue';cue.textContent='↵';cue.setAttribute('aria-hidden','true');text.append(cue);}
 });
 feedback.textContent=completeWord(typed)?`${match.getAttribute('aria-label')} ready. Press Enter to open.`:typed?`Typing ${match.getAttribute('aria-label')}.`:'Type a name, or choose a word.';
 attend(match);
}
window.addEventListener('spellkey-suggestion',matchWords);
input.addEventListener('input',()=>{input.value=wordPrefix(input.value);matchWords();input.removeAttribute('aria-invalid');});
document.querySelectorAll('[data-go]').forEach(b=>{b.onclick=()=>openDestination(location.hash.slice(1)===b.dataset.go?'home':b.dataset.go);b.onpointerenter=b.onfocus=()=>attend(b);b.onpointerleave=b.onblur=()=>attend(document.querySelector('[data-word].matching'));});
window.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;
 if(e.key==='Escape'){e.preventDefault();handleKey('Escape');return;}
 if(e.target.closest('input,textarea,select')||e.target.isContentEditable)return;
 // Tab-focused links/buttons retain native activation when no word is being typed.
 if(e.target.closest('button,a')&&['Enter',' '].includes(e.key)&&!input.value)return;
 if(e.key.length===1||['Enter','Backspace'].includes(e.key)){e.preventDefault();handleKey(e.key);}
});
window.addEventListener('hashchange',show);show();


initPerformer();


// Escape remains a key. Pointer curiosity opens a small, traversable preview.
const setHint=document.querySelector('.set-hint'),setDetail=document.querySelector('#set-detail');
setHint.innerHTML='About this set';
let revealTimer,hideTimer,cueTimer;
const atHome=()=>!document.body.classList.contains('visiting');
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
function syncSetIdle(){scene.idleSet(atHome()&&!document.hidden);}
window.addEventListener('keyboard-set-cue',syncSetIdle);
window.addEventListener('hashchange',syncSetIdle);
document.addEventListener('visibilitychange',syncSetIdle);
