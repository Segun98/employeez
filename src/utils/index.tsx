export function truncate(str: string) {
  if (str.length > 10) {
    return str.slice(0, 10) + "...";
  } else {
    return str;
  }
}

export function dash(str: string) {
  const trimmed = str.trim();
  const dashed = trimmed.split(" ").join("-");
  return dashed.toLowerCase();
}

export function Commas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let urls: string[] = [
  "https://apiemployeez.vercel.app",
  "http://localhost:8080",
];
export const url = urls[1];
// "https://employeezapi.herokuapp.com"
