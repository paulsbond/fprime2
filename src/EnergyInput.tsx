import { useEffect, useRef, useState } from "react";

const hc = 12398.4197386209;

function NumberInput(props: {
  label: string;
  value: string;
  step: number;
  unit?: string;
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
          className="w-50 rounded-md border border-gray-400 bg-gray-100 px-2 py-1"
        />
        <span className="inline-block w-5 px-2">{props.unit}</span>
      </label>
    </>
  );
}

function SelectInput() {
  return (
    <>
      <label>
        <span className="px-2">Source</span>
        <select className="w-50 rounded-md border border-gray-400 bg-gray-100 px-2 py-1">
          <option value={undefined}>Custom</option>
          <option value={8048}>Cu-K&alpha;1</option>
          <option value={8028}>Cu-K&alpha;2</option>
          </select>
        <span className="inline-block w-5 px-2"></span>
      </label>
    </>
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
  const localUpdate = useRef(false);

  useEffect(() => {
    setEText(energy.toString());
    if (localUpdate.current) {
      // change originated here; avoid clobbering user's in-progress wavelength text
      localUpdate.current = false;
    } else {
      setWText((hc / energy).toFixed(4));
    }
  }, [energy]);

  function handleWavelengthTextChange(newText: string) {
    setWText(newText);
    const w = parseFloat(newText);
    if (Number.isFinite(w) && w > 0) {
      const e = Math.round(hc / w);
      if (e > 0) {
        localUpdate.current = true;
        setEnergy(e);
        setEText(e.toString());
      }
    }
  }

  function handleEnergyTextChange(newText: string) {
    setEText(newText);
    const e = parseFloat(newText);
    if (Number.isFinite(e) && e > 0) {
      localUpdate.current = true;
      setEnergy(e);
      setWText((hc / e).toFixed(4));
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <NumberInput
        label="Wavelength"
        value={wText}
        step={0.0001}
        unit="Å"
        onChange={handleWavelengthTextChange}
      />
      <NumberInput
        label="Energy"
        value={eText}
        step={1}
        unit="eV"
        onChange={handleEnergyTextChange}
      />
      <SelectInput />
    </div>
  );
}
