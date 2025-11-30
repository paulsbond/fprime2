import { useState } from "react";
import { elements } from "./Element";

export function Search(props: {
  colors: string[];
  selected: number[];
  setColors: (colors: string[]) => void;
  setSelected: (selected: number[]) => void;
}) {
  const [value, setValue] = useState("");

  const filtered = elements.filter((e) => !props.selected.includes(e.z));

  function handleChange(newValue: string) {
    const element = filtered.find((x) => x.label === newValue);
    if (element) {
      element.color = props.colors.shift();
      props.setColors([...props.colors]);
      props.setSelected([...props.selected, element.z]);
      setValue("");
    } else {
      setValue(newValue);
    }
  }

  return (
    <>
      <datalist id="elements">
        {filtered.map((element) => {
          return <option value={element.label}></option>;
        })}
      </datalist>
      <label className="flex items-center gap-2">
        <span className="material-symbols-outlined">search</span>
        <input
          value={value}
          list="elements"
          placeholder="Add element"
          onChange={(e) => handleChange(e.target.value)}
          className="w-56"
        />
      </label>
    </>
  );
}
