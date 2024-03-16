import { CreateUserForm } from "../components/createUser/createUserForm";
import { Header } from "../components/header";

export function CreateUser() {
  return (
    <div className="max-w-[80%] min-w-96 m-auto py-[5%]">
      <Header />
      <div className="flex flex-col my-8">
        <span className="font-medium text-gray-600 text-lg">
          Novo Usuário
        </span>
        <span className="font-normal text-gray-600 text-lg">
          Informe os campos a seguir para criar um novo usuário
        </span>
      </div>
      <CreateUserForm />
    </div>
  )
}