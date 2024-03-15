import { User } from "lucide-react";

export function Header() {
  return (
    <div className="flex align-middle">
      <User className="size-10"/>
      <h1 className="bold">Painel de clientes</h1>
    </div>
  )
}