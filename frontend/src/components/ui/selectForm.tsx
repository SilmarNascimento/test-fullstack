import { useFormContext } from 'react-hook-form';
import { ChangeEvent } from 'react';

interface SelectProps {
  defaultValue?: string;
}

export function Select ({ defaultValue }: SelectProps) {
  const { register, setValue } = useFormContext();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue("status", event.target.value);
  };

  return (
    <select
      {...register("status")}
      defaultValue={defaultValue ?? "Status"}
      onChange={handleChange}
      className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
    >
      <option value="Ativo">Ativo</option>
      <option value="Inativo">Inativo</option>
      <option value="Aguardando ativação">Aguardando ativação</option>
      <option value="Desativado">Desativado</option>
    </select>
  );
}
