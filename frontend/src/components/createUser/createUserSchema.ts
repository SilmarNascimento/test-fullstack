import { z } from "zod";

export function validateCpf(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	

  if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999") {
      return false;
    }

    let add = 0;	
    for (let index = 0; index < 9; index ++) {
      add += parseInt(cpf.charAt(index)) * (10 - index);
    }
    let verificationNumber01 = 11 - (add % 11);	
    if (verificationNumber01 == 10 || verificationNumber01 == 11) {
      verificationNumber01 = 0;
    }			
    if (verificationNumber01 != parseInt(cpf.charAt(9))) {
      return false;
    }		
  
    add = 0;	
    for (let index = 0; index < 10; index ++) {
      add += parseInt(cpf.charAt(index)) * (11 - index);
    }	
    let verificationNumber02 = 11 - (add % 11);	
    if (verificationNumber02 == 10 || verificationNumber02 == 11){
      verificationNumber02 = 0;
    }
    if (verificationNumber02 != parseInt(cpf.charAt(10))){
      return false;
    }
    
    return true;
}

export function validateTelephone(telephone: string): boolean {
  telephone = telephone.replace(/[^\d]+/g,'');
  if (telephone.length !== 11) {
    return false;
  }
  return true;
}
		

export const createUserSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "endereço de email inválido" }),
  cpf: z.string()
    .refine(validateCpf, { message: "Número de CPF inválido"}),
  telephone: z.string()
    .refine(validateTelephone, { message: "Número de telefone inválido"}),
  status: z.enum(["Ativo", "Inativo", "Aguardando ativação", "Desativado"])
});
