import { useEffect } from "react";
import { useLocalStorage } from "./Hooks";

const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export function ThemeButton() {
  const [dark, setDark] = useLocalStorage("dark", prefersDark());

  useEffect(() => {
    const element = document.documentElement;
    if (dark) element.classList.add("dark");
    else element.classList.remove("dark");
  }, [dark]);

  return (
    <button
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="cursor-pointer self-end"
      onClick={() => setDark((prev) => !prev)}
    >
      <span aria-hidden="true" className="material-symbols-outlined">
        {dark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
