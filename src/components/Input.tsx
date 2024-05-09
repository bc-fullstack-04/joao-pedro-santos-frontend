import React from 'react';

interface Props {
  children: React.ReactNode;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  style?: string;
}

export default function Input({ children, type, required, style, onChange }: Props) {
  return (
    <>
      <label
        className={`${style} flex flex-col w-full text-sm font-normal text-zinc-400 mb-1`}
        htmlFor=""
      >
        {children}:
        <input
          type={type}
          onChange={onChange}
          required={required}
          className="w-full ring-1 ring-zinc-400 h-8 text-zinc-500 font-semibold rounded-sm hover:ring-blue-400"
        />
      </label>
    </>
  );
}
