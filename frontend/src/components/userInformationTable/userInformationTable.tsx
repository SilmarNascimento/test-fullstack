import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"
import { User } from "../../types/user";
import { StatusResponse } from "./userInformationSchema";

interface userTableProps {
  userInformation: User[] | undefined
}

export function UserInformationTable( { userInformation } : userTableProps) {
  const navigate = useNavigate();

  function handleCreateUser() {
    navigate("/create/users")
  }

  function handleEditUser(userId: string) {
    navigate(`/edit/users/${userId}`);
  }

  function cpfFormatter(cpf: string): string {
    return cpf;
  }

  function telephoneFormatter(telephone: string): string {
    return telephone;
  }

  function statusFormatter(status: string) {
    const statusResponse: StatusResponse = {
      "Ativo": (
        <div className="flex flex-row gap-3 justify-center items-center">
          <div className="size-4 bg-green-500 border rounded-full border-zinc-100" />
          <span>Ativo</span>
        </div>
      ),
      "Inativo": (
        <div className="flex flex-row gap-3 justify-center items-center">
          <div className="size-4 bg-red-600 border rounded-full border-zinc-100" />
          <span>Inativo</span>
        </div>
      ),
      "Aguardando ativação": (
        <div className="flex flex-row gap-3 justify-center items-center">
          <div className="size-4 bg-yellow-400 border rounded-full border-zinc-100" />
          <span>Aguardando ativação</span>
        </div>
      ),
      "Desativado": (
        <div className="flex flex-row gap-3 justify-center items-center">
          <div className="size-4 bg-zinc-400 border rounded-full border-zinc-100" />
          <span>Desativado</span>
        </div>
      )
    } 
    return statusResponse[status];
  }

  return (
    <>
      <div className="flex justify-between items-center m-2">
        <div className="flex flex-col gap-2">
          <span className="font-medium text-gray-600 text-lg">
            Listagem de usuários
          </span>
          <span className="font-normal text-gray-600 text-lg">
            Escolha um cliente para visualizar os detalhes
          </span>
        </div>
        <Button
          variant="primary"
          className="w-32 h-10 flex flex-row justify-center text-sm"
          onClick={handleCreateUser}
        >
          <span>Novo Cliente</span>
        </Button>
      </div>
      <Table>
        <TableBody>
          {userInformation?.map((user: User) => {
            return (
              <TableRow key={user.id} className="border border-zinc-400/50 flex flex-row my-4">
                <TableCell className="flex flex-1 flex-col gap-0.5">
                    <span className="font-medium text-gray-600 text-lg">
                      {user.name}
                    </span>
                    <span className="font-normal text-gray-600 text-lg">
                      {user.email}
                    </span>
                </TableCell>
                <TableCell className="flex flex-1 flex-col justify-center items-center gap-0.5">
                    <span className="font-medium text-gray-600 text-base">
                      {cpfFormatter(user.cpf)}
                    </span>
                    <span className="font-normal text-gray-600 text-base">
                      {telephoneFormatter(user.telephone)}
                    </span>
                </TableCell>
                <TableCell className="text-zinc-300 flex-1 flex justify-center items-center">
                    <span className="font-normal text-gray-600 text-base">
                      {statusFormatter(user.status)}
                    </span>
                </TableCell>
                <TableCell className="flex flex-1 justify-center items-center">
                  <Button
                    size="icon"
                    className="w-32 h-10 flex flex-row justify-center text-sm"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <span>Editar</span>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}