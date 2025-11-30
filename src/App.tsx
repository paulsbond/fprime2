import "material-symbols/outlined.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { Chart } from "./Chart";
import { Description } from "./Description";
import { elements } from "./Element";
import { EnergyInput } from "./EnergyInput";
import { useLocalStorage } from "./Hooks";
import { Search } from "./Search";
import { Table } from "./Table";
import { ThemeButton } from "./ThemeButton";

function App() {
  const [energy, setEnergy] = useLocalStorage("energy", 13531);
  const [selected, setSelected] = useLocalStorage<number[]>("selected", []);
  const [colors, setColors] = useLocalStorage("colors", [
    "#3366cc",
    "#dc3912",
    "#ff9900",
    "#109618",
    "#990099",
  ]);

  const filtered = elements.filter((e) => selected.includes(e.z));

  return (
    <StrictMode>
      <div className="m-auto flex min-h-svh max-w-2xl flex-col items-center justify-center gap-4 p-4 font-sans text-gray-900 dark:text-gray-100">
        <ThemeButton />
        <EnergyInput energy={energy} setEnergy={setEnergy} />
        {filtered.length > 0 && (
          <Table
            elements={filtered}
            colors={colors}
            selected={selected}
            setColors={setColors}
            setSelected={setSelected}
          />
        )}
        {filtered.length < 5 && (
          <Search
            colors={colors}
            selected={selected}
            setColors={setColors}
            setSelected={setSelected}
          />
        )}
        {filtered.length > 0 && <Chart />}
        <Description />
      </div>
    </StrictMode>
  );
}

const root = document.getElementById("root")!;
createRoot(root).render(<App />);
