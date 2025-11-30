import { useEffect } from "react";
import { useLocalStorage } from "./Hooks";
import { IconButton } from "./IconButton";

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
    <IconButton
      icon={dark ? "light_mode" : "dark_mode"}
      onClick={() => setDark((prev) => !prev)}
      aria_label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="self-end"
    />
  );
}
