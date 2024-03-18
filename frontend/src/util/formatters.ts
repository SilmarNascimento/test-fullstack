export function cpfFormatter(cpf: string | undefined): string {
  if (!cpf) {
    return "";
  }	
  cpf = cpf.replace(/[^\d]+/g,'');	
  const firstTriple = cpf.substring(0, 3);
  const secondTriple = cpf.substring(3, 6);
  const thirdTriple = cpf.substring(6, 9);
  const lastDigits = cpf.substring(9, 11);
  return `${firstTriple}.${secondTriple}.${thirdTriple}-${lastDigits}`;
}

export function telephoneFormatter(telephone: string | undefined): string {
  if (!telephone) {
    return "";
  }	
  telephone = telephone.replace(/[^\d]+/g,'');
  const ddd = telephone.substring(0, 2);
  const firstPart = telephone.substring(2, 7);
  const secondPart = telephone.substring(7, 11);
  return `(${ddd}) ${firstPart}-${secondPart}`;
}