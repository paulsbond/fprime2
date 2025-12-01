declare const Module: any;

export function fprime(z: number, energy: number): [number, number] {
  const fprime = Module.fprime(z, energy);
  return [fprime.fp, fprime.fpp];
}

export function fprimes(z: number, energies: number[]): [number[], number[]] {
  const energiesVector = new Module.VectorDouble();
  energies.forEach((e) => energiesVector.push_back(e));
  const fprimes = Module.fprimes(z, energiesVector);
  const fp: number[] = [];
  const fpp: number[] = [];
  for (let i = 0; i < fprimes.size(); i++) {
    const fprime = fprimes.get(i);
    fp.push(fprime.fp);
    fpp.push(fprime.fpp);
  }
  return [fp, fpp];
}
