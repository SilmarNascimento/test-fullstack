export type User =  {
  id: string
  name: string
  email: string
  cpf: string
  telephone: string
  status: "ATIVO" | "INATIVO" | "AGUARDANDO_ATIVACAO" | "DESATIVADO"; 
}