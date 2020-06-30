export function truncate(str: string) {
  if (str.length > 80) {
    return str.slice(0, 80) + "...";
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

export const url = "https://employeezapi.herokuapp.com";
// "https://employeezapi.herokuapp.com"
// "http://localhost:8080"
