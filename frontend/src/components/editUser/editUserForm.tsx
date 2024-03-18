import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "../ui/button"
import { Select } from "../ui/selectForm"
import { Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { editUserSchema, formUserSchema } from "./editUserSchema"
import { useEffect, useState } from "react"
import { Bounce, toast } from "react-toastify"
import { cpfFormatter, telephoneFormatter } from "../../util/formatters"

type EditUserSchema = z.infer<typeof editUserSchema>;
type FormUserSchema = z.infer<typeof formUserSchema>;

export function EditUserForm() {
  const queryClient = useQueryClient();
  const [hasChanged, setHasChanged] = useState(false);
  const { userId } = useParams<{ userId: string }>() ?? "";
  const navigate = useNavigate();

  const formMethods = useForm<FormUserSchema>({
    resolver: zodResolver(formUserSchema),
  })
  const { register, handleSubmit, formState, setValue, watch } = formMethods;

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
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          name,
          email,
          cpf: cpf.replace(/[^\d]+/g,''),
          telephone: telephone.replace(/[^\d]+/g,''),
          status
        }),
      })

      if (response.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ['get-users'],
        }),
        toast.success('Dados alterados com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      if (response.status === 400) {
        const errorMessage = await response.text();
        toast.warn( errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  })

  const editUserFn = async (data: FormUserSchema) => {
    const id = userId ?? "";
    const response = await editUser.mutateAsync({
      id,
      ...data
    });

    return response;
  }

  async function handleEditUser(data: FormUserSchema) {
    toast.promise(
      editUserFn(data),
      {
        pending: 'Atualizando informações...',
        error: "Falha ao atualizar dados."
      }
  );
    navigate("/");
  }

  function handleGoBack() {
    navigate("/");
  }

  useEffect(() => {
    if (userFoundResponse) {
      setValue('name', userFoundResponse.name);
      setValue('email', userFoundResponse.email);
      setValue('cpf', cpfFormatter(userFoundResponse.cpf));
      setValue('telephone', telephoneFormatter(userFoundResponse.telephone));
      setValue('status', userFoundResponse.status);
    }
  }, [userFoundResponse, setValue]);

  useEffect(() => {
    function hasChangedValues(): boolean {
      const updatedFormValues = watch();  

      updatedFormValues.cpf = updatedFormValues.cpf.replace(/[^\d]+/g,'');
      updatedFormValues.telephone = updatedFormValues.telephone.replace(/[^\d]+/g,'');

      if (userFoundResponse) {    
        const keys = Object.keys(updatedFormValues) as (keyof FormUserSchema)[];
        for (let index = 0; index < keys.length; index ++) {
          const inputName = keys[index];
          const updatedValue = updatedFormValues[inputName];
          const originalValue = userFoundResponse[inputName];

          if (updatedValue === undefined || originalValue === undefined || updatedValue !== originalValue) {
            return true;
          }
        }
      }

      return false;
    }

    setHasChanged(hasChangedValues());
  }, [formState, hasChanged, userFoundResponse, watch])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleEditUser)} className="w-full space-y-3">
        <div className="space-y-2">
          <input 
            {...register('name')}
            id="name"
            name="name"
            placeholder="Nome"
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
            name="email"
            placeholder="E-mail"
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
            name="cpf"
            placeholder="CPF"
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
            name="telephone"
            placeholder="Telefone"
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

        <div className="flex items-center justify-start gap-8 pt-10">
          <Button
            disabled={formState.isSubmitting  || !hasChanged}
            variant="primary"
            type="submit"
            className="w-32 flex flex-row justify-center gap-3 text-sm"
          >
            {formState.isSubmitting ? <Loader2 className="size-3 animate-spin" /> : <span>Salvar</span>}
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