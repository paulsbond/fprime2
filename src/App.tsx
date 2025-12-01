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
  const [colors, setColors] = useLocalStorage<{ [z: number]: string }>(
    "colors",
    {},
  );

  const selected = elements.filter((e) => colors.hasOwnProperty(e.z));

  return (
    <StrictMode>
      <div className="m-auto flex min-h-svh max-w-2xl flex-col items-center justify-center gap-4 p-4 font-sans text-gray-900 dark:text-gray-100">
        <ThemeButton />
        <EnergyInput energy={energy} setEnergy={setEnergy} />
        {selected.length > 0 && (
          <Table
            energy={energy}
            selected={selected}
            colors={colors}
            setColors={setColors}
          />
        )}
        {selected.length < 5 && (
          <Search colors={colors} setColors={setColors} />
        )}
        {selected.length > 0 && <Chart energy={energy} colors={colors} />}
        <Description />
      </div>
    </StrictMode>
  );
}

const root = document.getElementById("root")!;
createRoot(root).render(<App />);
