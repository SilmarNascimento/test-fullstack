import { CreateUserForm } from "../components/createUser/createUserForm";
import { Header } from "../components/header";

export function CreateUser() {
  return (
    <>
      <Header />
      <div className="flex flex-col">
        <span>Novo Usuário</span>
        <span>Informe os campos a seguir para criar um novo usuário</span>
      </div>
      <CreateUserForm />
    </>
  )
}