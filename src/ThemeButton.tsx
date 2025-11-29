import { useContext } from "react";
import { DarkContext } from "./Context";

export function ThemeButton(props: { setDark: (dark: boolean) => void }) {
  const dark = useContext(DarkContext);
  return (
    <button className="self-end" onClick={() => props.setDark(!dark)}>
      <span className="material-symbols-outlined">
        {dark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
