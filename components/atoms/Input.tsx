import React from 'react';

export interface InputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className = '',
  onKeyPress,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-mist">
          {label}
          {required && <span className="text-sky ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        required={required}
        disabled={disabled}
        className={`input-field w-full ${error ? 'border-red-400 focus:ring-red-400' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input; 