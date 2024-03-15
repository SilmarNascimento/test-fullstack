import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../components/ui/selectForm"
import { Check, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "endereço de email inválido" }),
  cpf: z.string(),
  telephone: z.string().length(11),
  status: z.enum(["ATIVO", "INATIVO", "AGUARDANDO_ATIVACAO", "DESATIVADO"])
})

type CreateUserSchema = z.infer<typeof createUserSchema>

interface userFormProps {
  tag: string
}

export function CreateUserForm({ tag }: userFormProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  })

  const createUser = useMutation({
    mutationFn: async ({
      name,
      email,
      cpf,
      telephone,
      status
    }: CreateUserSchema) => {
      try {
        console.log(status);
        
        const response = await fetch('http://localhost:8080/api/users',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            cpf,
            telephone,
            status: ""
          }),
      })

      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ['get-users'],
        })
      }

      if (response.status === 400) {
        const errorMessage = await response.text();
        console.log("Error: ", errorMessage);
      }
      
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  })

  async function handleCreateUser(data: CreateUserSchema) {
    console.log(data);
    await createUser.mutateAsync(data);
  }

  function handleGoBack() {
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit(handleCreateUser)} className="w-full space-y-6">
      <div className="space-y-2">
        <input 
          {...register('name')}
          id="name" 
          placeholder="Nome"
          type="text" 
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
        />
        {formState.errors?.name && (
          <p className="text-sm text-red-400">{formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <input 
          {...register('email')}
          id="email" 
          placeholder="E-mail"
          type="text" 
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
        />
        {formState.errors?.name && (
          <p className="text-sm text-red-400">{formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <input 
          {...register('cpf')}
          id="cpf" 
          placeholder="CPF"
          type="text" 
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
        />
        {formState.errors?.name && (
          <p className="text-sm text-red-400">{formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <input 
          {...register('telephone')}
          id="name" 
          placeholder="Telefone"
          type="text" 
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
        />
        {formState.errors?.name && (
          <p className="text-sm text-red-400">{formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
      <Select>
        <SelectTrigger
          aria-label="Page"
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
          {...register("status")}
        />
        <SelectContent>
          <SelectItem value="ATIVO">Ativo</SelectItem>
          <SelectItem value="INATIVO">Inativo</SelectItem>
          <SelectItem value="AGUARDANDO_ATIVACAO">Aguardando Ativação</SelectItem>
          <SelectItem value="DESATIVADO">Desativado</SelectItem>
        </SelectContent>
      </Select>
      {formState.errors?.name && <p className="text-sm text-red-400">{formState.errors.name.message}</p>}
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          disabled={formState.isSubmitting}
          className="bg-teal-400 text-teal-950"
          type="submit"
        >
          {formState.isSubmitting ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
          { tag }
        </Button>
        <Button onClick={handleGoBack}>
          <span>Voltar</span>
        </Button>
      </div>
    </form>
  )
}