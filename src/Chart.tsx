import Plot from "react-plotly.js";
import { fprimes } from "./Calculate";

const energies: number[] = [];
for (let e = 0; e <= 25000; e += 25) energies.push(e);

export function Chart(props: {
  energy: number;
  colors: { [z: number]: string };
}) {
  const data = [];
  for (const [z, color] of Object.entries(props.colors)) {
    const [fp, fpp] = fprimes(parseInt(z), energies);
    data.push({
      x: energies,
      y: fp,
      mode: "lines",
      marker: { color: color },
    });
    data.push({
      x: energies,
      y: fpp,
      mode: "lines",
      marker: { color: color },
    });
  }
  return <Plot className="aspect-video w-full" data={data} />;
}
