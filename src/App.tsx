import "material-symbols/outlined.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { Chart } from "./Chart";
import { DarkContext } from "./Context";
import { Description } from "./Description";
import { elements } from "./Element";
import { EnergyInput } from "./EnergyInput";
import { useLocalStorage } from "./Hooks";
import { Table } from "./Table";
import { ThemeButton } from "./ThemeButton";

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
  const [energy, setEnergy] = useLocalStorage("energy", 13531);
  const [selected, setSelected] = useLocalStorage<number[]>("selected", []);

  const filtered = elements.filter((e) => selected.includes(e.z));

  let search = "";
  const colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"];

  return (
    <StrictMode>
      <DarkContext value={dark}>
        <div className="m-auto flex min-h-svh max-w-2xl flex-col items-center justify-center gap-4 p-4 text-gray-900">
          <ThemeButton setDark={setDark} />
          <EnergyInput energy={energy} setEnergy={setEnergy} />
          {filtered.length > 0 && <Table elements={filtered} />}
          <Search />
          {filtered.length > 0 && <Chart />}
          <Description />
        </div>
      </DarkContext>
    </StrictMode>
  );
}

const root = document.getElementById("root")!;
createRoot(root).render(<App />);
