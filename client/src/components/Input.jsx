import { useState } from "react";

export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  className,
  placeholder,
  icon,
  error,
}) {
  const [isErrorShow, setIsErrorShow] = useState(false);

  return (
    <div>
      <label htmlFor="email" className="sr-only">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
          onBlur={() => setIsErrorShow(true)}
          onFocus={() => setIsErrorShow(false)}
        />
        {icon}
      </div>

      {error && isErrorShow && value && (
        <div
          class="p-4 my-4  text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
