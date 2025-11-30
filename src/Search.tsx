import { useState } from "react";
import { elements } from "./Element";

const defaultColors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"];

export function Search(props: {
  colors: { [z: number]: string };
  setColors: (colors: { [z: number]: string }) => void;
}) {
  const [value, setValue] = useState("");

  const notSelected = elements.filter((e) => !props.colors.hasOwnProperty(e.z));

  function handleChange(newValue: string) {
    const element = notSelected.find((x) => x.label === newValue);
    if (element) {
      const usedColors = Object.values(props.colors);
      const color = defaultColors.find((c) => !usedColors.includes(c))!;
      props.setColors({ ...props.colors, [element.z]: color });
      setValue("");
    } else {
      setValue(newValue);
    }
  }

  return (
    <>
      <datalist id="elements">
        {notSelected.map((element) => {
          return <option value={element.label}></option>;
        })}
      </datalist>
      <label className="flex items-center gap-2">
        <span className="material-symbols-outlined">search</span>
        <input
          value={value}
          list="elements"
          placeholder={value ? "" : "Add element"}
          onChange={(e) => handleChange(e.target.value)}
          className="w-56"
        />
      </label>
    </>
  );
}
