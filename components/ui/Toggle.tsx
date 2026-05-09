import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors focus-visible"
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <div
        className={`
          relative w-12 h-6 rounded-full transition-colors duration-200
          ${checked ? 'bg-blue-600' : 'bg-gray-300'}
        `}
      >
        <div
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
            transition-transform duration-200
            ${checked ? 'transform translate-x-6' : ''}
          `}
        />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
