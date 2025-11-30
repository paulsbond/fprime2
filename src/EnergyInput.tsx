import { useEffect, useRef, useState } from "react";

const hc = 12398.4197386209;

function NumberInput(props: {
  label: string;
  value: string;
  step: number;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <label>
        <span className="px-2">{props.label}</span>
        <input
          type="number"
          value={props.value}
          step={props.step}
          min={0}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </label>
    </>
  );
}

function SelectInput(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="px-2">Source</span>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option value="">Custom</option>
        <option value="22163">Ag-K&alpha;1</option>
        <option value="21990">Ag-K&alpha;2</option>
        <option value="24942">Ag-K&beta;1</option>
        <option value="8048">Cu-K&alpha;1</option>
        <option value="8028">Cu-K&alpha;2</option>
        <option value="8905">Cu-K&beta;1</option>
        <option value="17479">Mo-K&alpha;1</option>
        <option value="17374">Mo-K&alpha;2</option>
        <option value="19608">Mo-K&beta;1</option>
      </select>
    </label>
  );
}

export function EnergyInput({
  energy,
  setEnergy,
}: {
  energy: number;
  setEnergy: (energy: number) => void;
}) {
  const [wText, setWText] = useState((hc / energy).toFixed(4));
  const [eText, setEText] = useState(energy.toString());
  const [source, setSource] = useState("");
  const localUpdate = useRef(false);

  useEffect(() => {
    if (localUpdate.current) {
      localUpdate.current = false;
    } else {
      setWText((hc / energy).toFixed(4));
      setEText(energy.toString());
      setSource("");
    }
  }, [energy]);

  function handleWavelengthTextChange(newText: string) {
    setWText(newText);
    setSource("");
    if (newText === "") setEText("");
    else {
      const w = parseFloat(newText);
      if (Number.isFinite(w) && w > 0) {
        const e = Math.round(hc / w);
        localUpdate.current = true;
        setEnergy(e);
        setEText(e.toString());
      }
    }
  }

  function handleEnergyTextChange(newText: string) {
    setEText(newText);
    setSource("");
    if (newText === "") setWText("");
    else {
      const e = parseFloat(newText);
      if (Number.isFinite(e) && e > 0) {
        localUpdate.current = true;
        setEnergy(e);
        setWText((hc / e).toFixed(4));
      }
    }
  }

  function handleSourceChange(newValue: string) {
    setSource(newValue);
    if (newValue === "") return;
    const e = parseInt(newValue);
    localUpdate.current = true;
    setEnergy(e);
    setEText(e.toString());
    setWText((hc / e).toFixed(4));
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <NumberInput
        label="Wavelength / Å"
        value={wText}
        step={0.0001}
        onChange={handleWavelengthTextChange}
      />
      <NumberInput
        label="Energy / eV"
        value={eText}
        step={1}
        onChange={handleEnergyTextChange}
      />
      <SelectInput value={source} onChange={handleSourceChange} />
    </div>
  );
}
