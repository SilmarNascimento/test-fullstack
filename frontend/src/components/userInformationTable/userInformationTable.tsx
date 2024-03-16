import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"
import { User } from "../../types/user";

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

  return (
    <>
      <div className="flex justify-between m-2">
        <div className="flex flex-col gap-2">
          <span>Listagem de usuários</span>
          <span>Escolha um cliente para visualizar os detalhes</span>
        </div>
        <Button onClick={handleCreateUser}>
          <span>Novo Cliente</span>
        </Button>
      </div>
      <Table>
        <TableBody>
          {userInformation?.map((user: User) => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{user.cpf}</span>
                    <span className="font-medium">{user.telephone}</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300">
                  <div>
                    <span>{user.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    className="w-32 flex flex-row justify-center gap-3 text-sm"
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