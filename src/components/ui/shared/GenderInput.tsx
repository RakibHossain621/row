// GenderInput.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface GenderInputProps {
  label: string;
  name: string;
  options: Option[];
  register: UseFormRegister<any>;
  errorMessage?: string;
}

const GenderInput: React.FC<GenderInputProps> = ({
  label,
  name,
  options,
  register,
  errorMessage,
}) => {
  return (
    <div>
      <div className="flex gap-8 items-center mt-4 mb-4">
        <label className="block text-gray-700 font-semibold">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                value={option.value}
                {...register(name)}
                className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-black checked:border-transparent focus:outline-none"
              />
              <span className="text-black">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      {errorMessage && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default GenderInput;
