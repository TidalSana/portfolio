import {performer,initPerformer} from './spellkey-performer.js';
import {mountScene} from './render-adapter.js?v=travel';
import {destinations} from './destinations.js';
const app=document.querySelector('#app');
const stops=[['work','Work','work'],['projects','Projects','projects'],['josh','Me','me'],['keyboards','Keyboards','keyboards']];
app.innerHTML=`<a class="skip" href="#destination">Skip to navigation</a><header><div class="header-identity">${performer}<a class="identity" href="#home" aria-label="Joshua Semana, home"><span>Joshua Semana</span></a></div></header><main id="content" class="travel"><section class="destination-bar" aria-label="Explore the portfolio"><form id="travel-form"><label for="destination">What would you like to explore?</label><div class="type-line"><input id="destination" name="destination" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder=" " aria-describedby="travel-feedback"><span class="typing-suggestion" aria-hidden="true"><span class="suggested-word">work</span></span><button type="submit" aria-label="Go to destination">↵</button></div></form><p id="travel-feedback" role="status">Type a name + Enter, or choose a word.</p></section><div class="board-stage"><div id="key-scene"></div><nav class="spell-nav" aria-label="Destinations">${stops.map(([id,label,word])=>`<button type="button" aria-label="${label}" data-go="${id}" data-word="${word}"><span><em class="word-idle">${label}</em></span></button>`).join('')}</nav></div><section id="story" class="story" hidden aria-label="Portfolio content"></section></main>`;

const input=document.querySelector('#destination'),story=document.querySelector('#story'),feedback=document.querySelector('#travel-feedback');
const scene=mountScene(document.querySelector('#key-scene'),{onKey:key=>handleKey(key)});
function openDestination(raw){const word=raw.trim().toLowerCase(),id=word==='me'?'josh':word;if(id==='home'||id==='escape'){location.hash='home';return}if(!Object.hasOwn(destinations,id)){feedback.textContent='Try work, projects, me, or keyboards.';input.setAttribute('aria-invalid','true');return}input.removeAttribute('aria-invalid');scene.press('Enter');location.hash=id;}
function show(){const id=location.hash.slice(1);const active=Object.hasOwn(destinations,id);document.body.classList.toggle('visiting',active);story.hidden=!active;story.innerHTML=active?`<a class="back" href="#home">← Back to the keyboard <span>Esc</span></a>${destinations[id]}`:'';document.querySelectorAll('[data-go]').forEach(b=>{if(b.dataset.go===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});input.value='';matchWords();feedback.textContent=active?'Type another destination, or press Escape to return.':'Type a name + Enter, or choose a word.';document.title=active?`${id[0].toUpperCase()+id.slice(1)} — Joshua Semana`:'Joshua Semana';if(active){const heading=story.querySelector('h1');heading.tabIndex=-1;heading.focus({preventScroll:true});}}
function handleKey(key){scene.press(key);if(key==='Escape'){location.hash='home';input.blur();return}if(key==='Enter'){openDestination(input.value);return}if(key==='Backspace'){input.value=input.value.slice(0,-1);matchWords();return}if(key.length===1&&/[a-z ]/i.test(key)){input.value+=key.toLowerCase();matchWords();feedback.textContent='Press Enter to go.';}}
document.querySelector('#travel-form').onsubmit=e=>{e.preventDefault();openDestination(input.value)};
input.addEventListener('keydown',e=>{scene.press(e.key);if(e.key==='Escape'){e.preventDefault();location.hash='home';input.blur()}});
function attend(button){const i=[...document.querySelectorAll('[data-go]')].indexOf(button);document.querySelector('.spellkey-button').style.setProperty('--look',button?`${2+i*2}px`:'0px');}
function matchWords(){
 document.querySelector('.type-line').classList.toggle('has-value',!!input.value);
 const typed=input.value.trim().toLowerCase(),buttons=[...document.querySelectorAll('[data-word]')];
 const match=typed?buttons.find(b=>b.dataset.word.startsWith(typed)||b.dataset.go.startsWith(typed)):null;
 const selected=match||buttons.find(b=>b.dataset.word===input.dataset.suggestion)||buttons[0];
 buttons.forEach(b=>{
  b.classList.toggle('matching',b===match);
  const label=b.getAttribute('aria-label'),text=b.querySelector('.word-idle');
  text.replaceChildren();
  if(b!==selected){text.textContent=label;return;}
  const offset=b===match?Math.min(typed.length,label.length):0;
  const caret=document.createElement('i');caret.className='destination-caret';caret.setAttribute('aria-hidden','true');
  text.append(document.createTextNode(label.slice(0,offset)),caret,document.createTextNode(label.slice(offset)));
 });
 attend(match);
}
window.addEventListener('spellkey-suggestion',matchWords);
input.addEventListener('input',()=>{matchWords();input.removeAttribute('aria-invalid');feedback.textContent='Press Enter to go.'});
document.querySelectorAll('[data-go]').forEach(b=>{b.onclick=()=>openDestination(b.dataset.go);b.onpointerenter=b.onfocus=()=>attend(b);b.onpointerleave=b.onblur=()=>attend(document.querySelector('[data-word].matching'));});
window.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();location.hash='home';input.blur();return}if(e.ctrlKey||e.metaKey||e.altKey||e.repeat||e.target.closest('input,textarea,select,button,a')||e.target.isContentEditable)return;if(e.key.length===1||['Enter','Escape','Backspace'].includes(e.key)){e.preventDefault();handleKey(e.key)}});
window.addEventListener('hashchange',show);show();


initPerformer();
