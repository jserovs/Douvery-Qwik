export function randomNum() {
  return Math.floor(Math.random() * 6) + 1;
}

export function replaceSpacesWithHyphens({str}:any) {
  return str.replace(/\s+/g, '-');
}