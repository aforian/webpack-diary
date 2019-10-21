export function triangleArea(w, h) {
  return w*h/2;
}

export function rectArea(w, h = w) {
  return w*h;
}

export default {
  triangleArea,
  rectArea,
}