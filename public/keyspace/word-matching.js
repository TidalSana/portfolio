export const destinationWords=['work','projects','me','keyboards'];
// Keep only the longest trailing sequence that can still become a destination.
const maxLength=Math.max(...destinationWords.map(word=>word.length));
export function wordPrefix(raw){
 const value=raw.toLowerCase().slice(-maxLength);
 for(let i=0;i<value.length;i++){
  const suffix=value.slice(i);
  if(destinationWords.some(word=>word.startsWith(suffix)))return suffix;
 }
 return '';
}
export function completeWord(value){return destinationWords.includes(value);}
