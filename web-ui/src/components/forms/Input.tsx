import React from 'react';

export interface InputProps {
  label: string;
  smallLabel?: string
  passProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({ label, smallLabel, ...props }) => {
  return (
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          {label}
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" {...props.passProps}></input>
        {
          smallLabel && <p className="text-grey-dark text-xs italic">{smallLabel}</p>
        }
      </div>
    </div>
  )
}
