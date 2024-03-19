import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { SearchX } from "lucide-react"

export function NotFoundPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="h-40 w flex flex-col items-center justify-center">
        <SearchX className="size-32"/>
        Página não encontrada
      </h1>
      <Link to={"/"}>
        <Button>
          Lista de Usuários
        </Button>
      </Link>
    </div>
  )
}