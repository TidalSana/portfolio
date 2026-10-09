export function initPortraitInk(root) {
  const photo = root.querySelector('.me-portrait');
  if (!photo) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'portrait-ink';
  button.setAttribute('aria-label', 'Play with the portrait ink');
  button.setAttribute('aria-pressed', 'false');
  photo.replaceWith(button);
  button.append(photo);
  const wash = document.createElement('span');
  wash.className = 'portrait-ink-wash';
  wash.setAttribute('aria-hidden', 'true');
  const print = photo.cloneNode();
  print.removeAttribute('class');
  print.alt = '';
  wash.append(print);
  const drop = document.createElement('span');
  drop.className = 'portrait-ink-drop';
  drop.setAttribute('aria-hidden', 'true');
  button.append(wash, drop);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let hovering = false, pinned = false, frame = 0, x = 50, y = 50, tx = 50, ty = 50, radius = 0, previous = 0;
  function animate(time) {
    frame = 0;
    if (!button.isConnected) return;
    const step = Math.min((time - (previous || time - 16)) / 16.67, 3);
    previous = time;
    const active = hovering || pinned;
    const ease = reduced.matches ? 1 : 1 - Math.pow(.83, step);
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    radius += ((active ? 88 : 0) - radius) * (reduced.matches ? 1 : 1 - Math.pow(.94, step));
    button.style.setProperty('--ink-x', `${x}%`);
    button.style.setProperty('--ink-y', `${y}%`);
    button.style.setProperty('--ink-r', `${radius}%`);
    if (Math.abs(radius - (active ? 88 : 0)) > .1 || Math.abs(tx-x) + Math.abs(ty-y) > .1) frame = requestAnimationFrame(animate);
  }
  function refresh() {
    button.classList.toggle('ink-active', hovering || pinned);
    button.classList.toggle('ink-hovering', hovering);
    button.setAttribute('aria-pressed', String(pinned));
    if (!frame) { previous = 0; frame = requestAnimationFrame(animate); }
  }
  function follow(event) {
    if (event.pointerType !== 'mouse') return;
    const rect = button.getBoundingClientRect();
    tx = Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100));
    ty = Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100));
    button.style.setProperty('--cursor-x', `${tx}%`);
    button.style.setProperty('--cursor-y', `${ty}%`);
    refresh();
  }
  button.addEventListener('pointerenter', event => { if(event.pointerType === 'mouse'){ hovering = true; follow(event); } });
  button.addEventListener('pointermove', follow);
  button.addEventListener('pointerleave', () => { hovering = false; refresh(); });
  button.addEventListener('click', () => { pinned = !pinned; refresh(); });
  button.addEventListener('blur', () => { pinned = false; refresh(); });
  button.addEventListener('keydown', event => { if(event.key === 'Escape'){ pinned = hovering = false; refresh(); } });
}
