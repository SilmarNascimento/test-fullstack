import { z } from "zod"

export const formUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "endereço de email inválido" }),
  cpf: z.string(),
  telephone: z.string().length(11),
  status: z.enum(["Ativo", "Inativo", "Aguardando ativação", "Desativado"])
});

export const editUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email({ message: "endereço de email inválido" }),
  cpf: z.string(),
  telephone: z.string().length(11),
  status: z.enum(["Ativo", "Inativo", "Aguardando ativação", "Desativado"])
});