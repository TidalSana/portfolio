// Lucide icons (ISC). See assets/icons/lucide-LICENSE.
const paths={
 'arrow-up-right': '<path d="M7 7h10v10" /> <path d="M7 17 17 7" />',
 'arrow-left': '<path d="m12 19-7-7 7-7" /> <path d="M19 12H5" />',
 'corner-down-left': '<path d="M20 4v7a4 4 0 0 1-4 4H4" /> <path d="m9 10-5 5 5 5" />',
 'x': '<path d="M18 6 6 18" /> <path d="m6 6 12 12" />'
};

// Decorative icons inherit the label and color of their surrounding control.
export function icon(name){
 if(!Object.hasOwn(paths,name)) throw new Error(`Unknown icon: ${name}`);
 return `<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}
