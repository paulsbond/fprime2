import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialState: T,
): [T, Dispatch<SetStateAction<T>>] {
  const item = localStorage.getItem(key);
  const [state, setState] = useState(item ? JSON.parse(item) : initialState);
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [state]);
  return [state, setState];
}
