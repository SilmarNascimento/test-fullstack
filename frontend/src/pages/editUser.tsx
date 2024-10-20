import { EditUserForm } from "../components/editUser/editUserForm";
import { Header } from "../components/header";
import { TopHeader } from "../components/topHeader";

export function EditUser() {
  return (
    <>
      <div className="max-w-[80%] min-w-96 m-auto pt-[3%] pb-[2%]">
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
    </>
  )
}