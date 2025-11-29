import "material-symbols/outlined.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { Chart } from "./Chart";
import { DarkContext } from "./Context";
import { elements } from "./Element";
import { useLocalStorage } from "./Hooks";
import { Table } from "./Table";
import { ThemeButton } from "./ThemeButton";

function Energies() {
  return (
    <div className="flex flex-col">
      <label>
        <span>Wavelength / Å</span>
        <input type="number" step="0.0001" />
      </label>
      <label>
        <span>Energy / eV</span>
        <input type="number" />
      </label>
    </div>
  );
}

function Description() {
  return (
    <p>
      Calculates anomalous scattering factors (f' and f") using the{" "}
      <a href="https://doi.org/10.1107/S0567739481000600">Cromer-Liberman</a>{" "}
      algorithm with corrections from{" "}
      <a href="https://doi.org/10.1107/S0108767389010718">Kissel and Pratt</a>.
      Uses the implementation in{" "}
      <a href="https://gemmi.readthedocs.io/en/latest/hkl.html#anomalous">
        Gemmi
      </a>{" "}
      compiled to WebAssembly using{" "}
      <a href="https://emscripten.org">Emscripten</a>.
    </p>
  );
}

function Search() {
  return (
    <>
      <datalist id="elements">
        {elements.map((element) => {
          return <option value={element.label}></option>;
        })}
      </datalist>
      <label>
        <span className="material-symbols-outlined">search</span>
        <input list="elements" placeholder="Add element" />
      </label>
    </>
  );
}

const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
  const [dark, setDark] = useLocalStorage("dark", prefersDark());
  const [energy, setEnergy] = useLocalStorage("energy", 12398);
  const [selected, setSelected] = useLocalStorage<number[]>("seleted", []);

  const filtered = elements.filter((e) => selected.includes(e.z));

  let search = "";
  let wavelength = 1;
  const colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"];
  const hc = 12398.4197386209;

  return (
    <StrictMode>
      <DarkContext value={dark}>
        <div className="flex flex-col items-center gap-4 p-4 text-gray-900">
          <ThemeButton setDark={setDark} />
          <Energies />
          <Table elements={filtered} />
          <Search />
          <Chart />
          <Description />
        </div>
      </DarkContext>
    </StrictMode>
  );
}

const root = document.getElementById("root")!;
createRoot(root).render(<App />);
