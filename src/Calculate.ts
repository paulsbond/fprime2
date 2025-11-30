declare const Module: any;

export function fprime(z: number, energy: number): [number, number] {
  const result = Module.fprime(z, energy);
  return [result.fp, result.fpp];
}
