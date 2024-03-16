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
      <option
        value="Ativo"
        className='text-zinc-800 hover:bg-gray-200'
      >
        Ativo
      </option>
      <option
        value="Inativo"
        className='text-zinc-800'
      >
        Inativo
      </option>
      <option
        value="Aguardando ativação"
        className='text-zinc-800'
      >
        Aguardando ativação
      </option>
      <option
        value="Desativado"
        className='text-zinc-800'
      >
        Desativado
      </option>
    </select>
  );
}