import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "endereço de email inválido" }),
  cpf: z.string(),
  telephone: z.string().length(11),
  status: z.enum(["Ativo", "Inativo", "Aguardando ativação", "Desativado"])
});
