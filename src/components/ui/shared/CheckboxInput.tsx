// CheckboxInput.tsx
import React from "react";
import {  UseFormRegister } from "react-hook-form";

interface CheckboxInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errorMessage?: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  name,
  register,
  errorMessage,
}) => {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register(name)}
          className="form-checkbox text-purple-600 checked:bg-black"
        />
        <span className="text-black">{label}</span>
      </label>
      {errorMessage && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default CheckboxInput;
