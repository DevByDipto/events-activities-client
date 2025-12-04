import React, { useEffect, useState, useRef } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  label?: string
  placeholder?: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
}

export function Dropdown({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  error,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-2.5 rounded-lg border bg-background text-left
            flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all duration-200
            ${error ? 'border-destructive' : 'border-input'}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={
              selectedOption ? 'text-foreground' : 'text-muted-foreground'
            }
          >
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            <li
              onClick={() => {
                onChange('')
                setIsOpen(false)
              }}
              className={`
                px-4 py-2.5 cursor-pointer flex items-center justify-between
                hover:bg-accent transition-colors
                ${!value ? 'bg-accent' : ''}
              `}
              role="option"
              aria-selected={!value}
            >
              <span className="text-muted-foreground">{placeholder}</span>
              {!value && <Check className="w-4 h-4 text-primary" />}
            </li>

            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`
                  px-4 py-2.5 cursor-pointer flex items-center justify-between
                  hover:bg-accent transition-colors
                  ${value === option.value ? 'bg-accent' : ''}
                `}
                role="option"
                aria-selected={value === option.value}
              >
                <span className="text-foreground">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
