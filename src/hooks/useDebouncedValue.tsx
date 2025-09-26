import { debounce } from "es-toolkit";
import { useCallback, useState } from "react";

export function useDebouncedValue<T>(defaultValue: T, delay: number) {
  const [value, _setValue] = useState(defaultValue);
  const [debouncedValue, _setDebouncedValue] = useState(defaultValue);
  const setDebouncedValue = debounce(_setDebouncedValue, delay);

  const setValue = useCallback((value: T) => {
    _setValue(value);
    setDebouncedValue(value);
  }, []);

  return [value, debouncedValue, setValue] as const;
}
