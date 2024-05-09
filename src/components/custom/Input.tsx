interface Props {
  children: React.ReactNode;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input2({children, type, onChange}: Props) {
  return (
    <>
      <label htmlFor="email" className="text-sm font-normal">{children}</label>
      <input type={type} onChange={onChange} name="email" id="email" className="bg-zinc-100 p-2 rounded-md ring-1 ring-zinc-900/20 mb-3"/>
    </>
  )
}