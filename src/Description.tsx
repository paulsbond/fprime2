function Link({ href, text }: { href: string; text: string }) {
  return (
    <a href={href} className="text-sky-600 underline hover:text-sky-800">
      {text}
    </a>
  );
}

export function Description() {
  return (
    <p>
      Calculates anomalous scattering factors (f' and f") using the{" "}
      <Link href="https://doi.org/10.1107/S0567739481000600" text="Cromer-Liberman" />{" "}
      algorithm with corrections from{" "}
      <Link href="https://doi.org/10.1107/S0108767389010718" text="Kissel and Pratt" />.
      Uses the implementation in{" "}
      <Link href="https://gemmi.readthedocs.io/en/latest/hkl.html#anomalous" text="Gemmi" />
      {" "}
      compiled to WebAssembly using{" "}
      <Link href="https://emscripten.org" text="Emscripten" />.
    </p>
  );
}
