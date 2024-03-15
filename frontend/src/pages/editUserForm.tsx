import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../components/ui/selectForm"
import { Check, Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

const editUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email({ message: "endereço de email inválido" }),
  cpf: z.string(),
  telephone: z.string().length(11),
  status: z.enum(["ATIVO", "INATIVO", "AGUARDANDO_ATIVACAO", "DESATIVADO"])
})

type EditUserSchema = z.infer<typeof editUserSchema>

interface userFormProps {
  tag: string
}

export function EditUserForm({ tag }: userFormProps) {
  const queryClient = useQueryClient();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
  })

  const { data: userFoundResponse } = useQuery<EditUserSchema>({
    queryKey: ['get-users', userId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`)
      const data = await response.json()

      return data
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  })

  const editUser = useMutation({
    mutationFn: async ({
      id,
      name,
      email,
      cpf,
      telephone,
      status
    }: EditUserSchema) => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify({
            name,
            email,
            cpf,
            telephone,
            status: ""
          }),
      })

      if (response.status === 200) {
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

  async function handleEditSubject(data: EditUserSchema) {
    console.log(data);
    await editUser.mutateAsync(data)
  }

  function handleGoBack() {
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit(handleEditSubject)} className="w-full space-y-6">
      <div className="space-y-2">
        <input 
          {...register('name')}
          id="name" 
          placeholder={userFoundResponse?.name}
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
          placeholder={userFoundResponse?.email}
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
          placeholder={userFoundResponse?.cpf}
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
          id="telephone" 
          placeholder={userFoundResponse?.telephone}
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
          prevStatus={userFoundResponse?.status}
          aria-label="Page"
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
          {...register("status")}
        />
        <SelectContent>
          <SelectItem value="Ativo">Ativo</SelectItem>
          <SelectItem value="Inativo">Inativo</SelectItem>
          <SelectItem value="Aguardando Ativação">Aguardando Ativação</SelectItem>
          <SelectItem value="Desativado">Desativado</SelectItem>
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