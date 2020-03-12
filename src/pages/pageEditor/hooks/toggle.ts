import React from 'react';

export function useToggle(initValue ?: boolean): [boolean, () => void] {
  const [value, setValue] = React.useState<boolean>(initValue || false)
  const toggle = () => setValue(value)
  return [value, toggle]
}