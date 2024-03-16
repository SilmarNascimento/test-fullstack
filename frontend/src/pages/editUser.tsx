import { EditUserForm } from "../components/editUser/editUserForm";
import { Header } from "../components/header";

export function EditUser() {
  return (
    <>
      <Header />
      <div className="flex flex-col">
        <span>Editar Usuário</span>
        <span>Altere os campos a seguir para editar o usuário</span>
      </div>
      <EditUserForm />
    </>
  )
}