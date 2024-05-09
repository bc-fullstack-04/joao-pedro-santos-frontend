interface Props {
  children: React.ReactNode;
  type: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input2({children, type, id, onChange}: Props) {
  return (
    <>
      <label htmlFor={id} className="text-sm font-normal">{children}</label>
      <input type={type} onChange={onChange} name={id} id={id} className="bg-zinc-100 p-2 rounded-md ring-1 ring-zinc-900/20 mb-3"/>
    </>
  )
}