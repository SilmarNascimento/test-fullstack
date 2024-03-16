import { EditUserForm } from "../components/editUser/editUserForm";
import { Header } from "../components/header";

export function EditUser() {
  return (
    <div className="max-w-[80%] min-w-96 m-auto py-[5%]">
      <Header />
      <div className="flex flex-col my-8">
        <span className="font-medium text-gray-600 text-lg">
          Editar Usuário
        </span>
        <span className="font-normal text-gray-600 text-lg">
          Altere os campos a seguir para editar o usuário
        </span>
      </div>
      <EditUserForm />
    </div>
  )
}