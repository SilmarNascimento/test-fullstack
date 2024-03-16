import { z } from "zod"
import { validateCpf } from "../createUser/createUserSchema";

export const formUserSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }),
  email: z.string().email({ message: "endereço de email inválido" }),
  cpf: z.string()
    .length(11, { message: "Número de CPF inválido"})
    .refine(validateCpf, { message: "Número de CPF inválido"}),
  telephone: z.string().length(11, { message: "Número de telefone inválido"}),
  status: z.enum(["Ativo", "Inativo", "Aguardando ativação", "Desativado"])
});

export const editUserSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: "Nome é obrigatório" }),
  email: z.string().email({ message: "endereço de email inválido" }),
  cpf: z.string()
    .length(11, { message: "Número de CPF inválido"})
    .refine(validateCpf, { message: "Número de CPF inválido"}),
  telephone: z.string().length(11, { message: "Número de telefone inválido"}),
  status: z.enum(["Ativo", "Inativo", "Aguardando ativação", "Desativado"])
});
