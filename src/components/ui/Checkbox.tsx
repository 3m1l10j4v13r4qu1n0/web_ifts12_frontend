import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode;
}

/** Checkbox con área táctil de 44px. */
function Checkbox({ children, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-texto"
    >
      <input
        id={id}
        type="checkbox"
        className="h-5 w-5 shrink-0 rounded-sm border-borde text-acento-600 focus:ring-2 focus:ring-acento-600"
        {...props}
      />
      {children}
    </label>
  );
}

export default Checkbox;
