"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  name?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Select({
  id,
  name,
  options,
  placeholder = "—",
  value: controlledValue,
  onChange,
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const selected = options.find((o) => o.value === value);

  const setValue = useCallback(
    (v: string) => {
      if (controlledValue === undefined) setInternalValue(v);
      onChange?.(v);
    },
    [controlledValue, onChange],
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (open && focusedIndex >= 0 && listboxRef.current) {
      const items = listboxRef.current.children;
      if (items[focusedIndex]) {
        (items[focusedIndex] as HTMLElement).scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [focusedIndex, open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    const totalItems = options.length + 1; // +1 for placeholder

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIndex(
            value ? options.findIndex((o) => o.value === value) + 1 : 0,
          );
        } else {
          if (focusedIndex === 0) {
            setValue("");
          } else if (focusedIndex > 0) {
            setValue(options[focusedIndex - 1].value);
          }
          setOpen(false);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIndex(totalItems - 1);
        } else {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  function selectOption(optionValue: string, index: number) {
    setValue(optionValue);
    setFocusedIndex(index);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Hidden native input for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* Trigger button */}
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={id ? `${id}-listbox` : undefined}
        className="input-dark flex w-full items-center justify-between gap-2 text-left"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span className={selected ? "text-white" : "text-zinc-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          ref={listboxRef}
          id={id ? `${id}-listbox` : undefined}
          role="listbox"
          className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-white/[0.08] bg-surface-elevated p-1 shadow-2xl backdrop-blur-xl animate-[fade-in_0.15s_ease-out]"
        >
          {/* Placeholder option */}
          <li
            role="option"
            aria-selected={!value}
            className={`flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${
              focusedIndex === 0
                ? "bg-white/[0.08] text-white"
                : !value
                  ? "text-zinc-400"
                  : "text-zinc-500 hover:bg-white/[0.04]"
            }`}
            onClick={() => selectOption("", 0)}
            onMouseEnter={() => setFocusedIndex(0)}
          >
            {placeholder}
          </li>

          {options.map((option, i) => {
            const idx = i + 1;
            const isSelected = option.value === value;
            const isFocused = focusedIndex === idx;

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isFocused
                    ? "bg-white/[0.08] text-white"
                    : isSelected
                      ? "text-primary-light"
                      : "text-zinc-300 hover:bg-white/[0.04]"
                }`}
                onClick={() => selectOption(option.value, idx)}
                onMouseEnter={() => setFocusedIndex(idx)}
              >
                {option.label}
                {isSelected && (
                  <svg
                    className="h-4 w-4 text-primary-light"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
