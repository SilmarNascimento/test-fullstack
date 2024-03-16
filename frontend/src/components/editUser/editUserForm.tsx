import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "../ui/button"
import { Select } from "../ui/selectForm"
import { Check, Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { editUserSchema, formUserSchema } from "./editUserSchema"
import { useEffect, useState } from "react"

type EditUserSchema = z.infer<typeof editUserSchema>;
type FormUserSchema = z.infer<typeof formUserSchema>;

export function EditUserForm() {
  const queryClient = useQueryClient();
  const [hasChanged, setHaChanged] = useState(false);
  const { userId } = useParams<{ userId: string }>() ?? "";
  const navigate = useNavigate();

  const formMethods = useForm<FormUserSchema>({
    resolver: zodResolver(formUserSchema),
  })
  const { register, handleSubmit, formState, watch } = formMethods;

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
            status
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

  async function handleEditUser(data: FormUserSchema) {
    const id = userId ?? "";
    await editUser.mutateAsync({
      id,
      ...data
    });
    navigate("/");
  }

  function handleGoBack() {
    navigate("/");
  }

  useEffect(() => {
    function hasChangedValues(): boolean {
      const updatedFormValues = watch();  

      if (userFoundResponse) {    
        const keys = Object.keys(updatedFormValues) as (keyof FormUserSchema)[];
        for (let index = 0; index < keys.length; index ++) {
          if (updatedFormValues[keys[index]] !== userFoundResponse[keys[index]]) {
            return true;
          }
        }
      }

      return false;
    }

    setHaChanged(hasChangedValues());
  }, [formState, hasChanged, userFoundResponse, watch])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleEditUser)} className="w-full space-y-3">
        <div className="space-y-2">
          <input 
            {...register('name')}
            id="name" 
            defaultValue={userFoundResponse?.name}
            type="text" 
            className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
          />
          <p className={`text-sm ${formState.errors?.name ? 'text-red-400' : 'text-transparent'}`}>
            {formState.errors?.name ? formState.errors.name.message : '\u00A0'}
          </p>
        </div>

        <div className="space-y-2">
          <input 
            {...register('email')}
            id="email" 
            defaultValue={userFoundResponse?.email}
            type="text" 
            className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
          />
          <p className={`text-sm ${formState.errors?.email ? 'text-red-400' : 'text-transparent'}`}>
            {formState.errors?.email ? formState.errors.email.message : '\u00A0'}
          </p>
        </div>

        <div className="space-y-2">
          <input 
            {...register('cpf')}
            id="cpf" 
            defaultValue={userFoundResponse?.cpf}
            type="text" 
            className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
          />
          <p className={`text-sm ${formState.errors?.cpf ? 'text-red-400' : 'text-transparent'}`}>
            {formState.errors?.cpf ? formState.errors.cpf.message : '\u00A0'}
          </p>
        </div>

        <div className="space-y-2">
          <input 
            {...register('telephone')}
            id="telephone" 
            defaultValue={userFoundResponse?.telephone}
            type="text" 
            className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-50/50 w-72 text-sm"
          />
          <p className={`text-sm ${formState.errors?.telephone ? 'text-red-400' : 'text-transparent'}`}>
            {formState.errors?.telephone ? formState.errors.telephone.message : '\u00A0'}
          </p>
        </div>

        <div className="space-y-2">
        <Select defaultValue={userFoundResponse?.status} />      
        <p className={`text-sm ${formState.errors?.status ? 'text-red-400' : 'text-transparent'}`}>
          {formState.errors?.status ? formState.errors.status.message : '\u00A0'}
        </p>
        </div>

        <div className="flex items-center justify-start gap-8">
          <Button
            disabled={formState.isSubmitting  || !hasChanged}
            variant="primary"
            type="submit"
            className="w-32 flex flex-row justify-center gap-3 text-sm"
          >
            {formState.isSubmitting ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
            <span>Salvar</span>
          </Button>
          <Button
            onClick={handleGoBack}
            className="w-32 flex flex-row justify-center gap-3 text-sm"
          >
            <span>Voltar</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}