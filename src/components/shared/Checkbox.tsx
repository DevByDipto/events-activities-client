import React from 'react'
import { Check } from 'lucide-react'

interface CheckboxProps {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
  className?: string
}

export function Checkbox({
  label,
  checked,
  onChange,
  id,
  className = '',
}: CheckboxProps) {
  // যদি id না দেওয়া হয় তাহলে label থেকে auto generate করা হবে
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-center gap-2 cursor-pointer ${className}`}
    >
      <div className="relative">
        {/* screen-reader only input */}
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        {/* custom checkbox UI */}
        <div
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center
            transition-all duration-200
            ${checked ? 'bg-primary border-primary' : 'bg-background border-input hover:border-primary'}
          `}
        >
          {checked && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>
      </div>
      {/* optional label */}
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  )
}
